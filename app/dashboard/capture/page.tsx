"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Sparkles, UploadCloud, X } from "lucide-react";
import { useOcrClean } from "@/hooks/useOcrClean";
import { useWordAnalysis } from "@/hooks/useWordAnalysis";
import { useAiOcrImage } from "@/hooks/useAiOcrImage";
import { WordAnalysisModal } from "./WordAnalysisModal";

const LEFT_TOPICS = [
  {
    key: "origin",
    label: "Asal Usul",
    description:
      "Kata ini berakar dari bahasa Melayu klasik yang sering muncul dalam sastra lisan. Penggunaannya menyiratkan puitika alam yang sejak lama hidup di Nusantara.",
  },
  {
    key: "function",
    label: "Fungsi & Kelas Kata",
    description:
      "Kelas kata adjektiva yang digunakan untuk menekankan keadaan atau atmosfer. Dalam konteks puisi, berfungsi sebagai penguat suasana dan ritme.",
  },
  {
    key: "usage",
    label: "Penggunaan dalam Konteks",
    description:
      "Sering hadir dalam karya tematik hujan, kerinduan, atau ketabahan. Penggunaan modernnya merambah narasi prosa maupun lirik lagu.",
  },
  {
    key: "examples",
    label: "Contoh Kalimat",
    description:
      "“Hujan Juni menyimpan rahasia di setiap rintik.” / “Ia menunggu seperti hujan bulan Juni: tabah tapi sunyi.”",
  },
];

const RIGHT_DETAILS = [
  {
    key: "meaning",
    label: "Makna",
    description: "Gambaran ketabahan dan kesunyian yang melembutkan suasana.",
  },
  {
    key: "summary",
    label: "Penjelasan Singkat",
    description:
      "Ungkapan yang mempersonifikasikan hujan sebagai entitas yang sabar dan penuh rahasia.",
  },
  {
    key: "spelling",
    label: "Eja Kata",
    description: "hu·jan bu·lan ju·ni",
  },
  {
    key: "synonym",
    label: "Sinonim / Antonim",
    description: "Sinonim: rintik abadi · Antonim: panas kemarau",
  },
];

function formatEjaKata(ejaKata?: string | null): string {
  if (!ejaKata) return "";

  return ejaKata
    .split("·")
    .map((part) => part.trim())
    .join("  •  "); // ⬅️ dua spasi kiri-kanan
}

type ActivePanel =
  | { type: "topic"; key: string }
  | { type: "detail"; key: string };

export default function CapturePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrText, setOcrText] = useState<string | null>(null);
  const [cleanedText, setCleanedText] = useState<string | null>(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrError, setOcrError] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<ActivePanel>({
    type: "topic",
    key: LEFT_TOPICS[0].key,
  });
  const [ocrEngine, setOcrEngine] = useState<"tesseract" | "ai">("tesseract");

  const {
    mutateAsync: cleanOcrText,
    isPending: isCleaning,
    error: cleanError,
  } = useOcrClean();

  const {
    data: wordAnalysis,
    isLoading: isWordLoading,
    error: wordError,
  } = useWordAnalysis(selectedWord);

  const {
    mutateAsync: runAiOcrMutation,
    isPending: isAiOcrPending,
    error: aiOcrError,
  } = useAiOcrImage();

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const preprocessImage = async (file: File): Promise<Blob> => {
    const bitmap = await createImageBitmap(file);

    // scale up kalau terlalu kecil
    const minHeight = 1000; // boleh kamu tweak
    const scale = bitmap.height < minHeight ? minHeight / bitmap.height : 1;

    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(bitmap.width * scale);
    canvas.height = Math.floor(bitmap.height * scale);

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context unavailable");

    // sedikit tingkatkan kontras & brightness
    ctx.filter = "contrast(1.2) brightness(1.05)";
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    // opsional: convert ke grayscale tanpa threshold
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      data[i] = data[i + 1] = data[i + 2] = gray;
    }
    ctx.putImageData(imageData, 0, 0);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Failed to preprocess image"));
          resolve(blob);
        },
        "image/png",
        1
      );
    });
  };

  const runTesseractOcr = async (file: File) => {
    setIsProcessing(true);
    setOcrText(null);
    setCleanedText(null);
    setOcrError(null);
    setOcrProgress(0);

    try {
      const { default: Tesseract } = await import("tesseract.js");
      const processedBlob = await preprocessImage(file);
      // const result = await Tesseract.recognize(file, "ind+eng", {
      const options = {
        logger: (message: { status?: string; progress?: number }) => {
          if (message.status === "recognizing text") {
            setOcrProgress(message.progress ?? 0);
          }
        },
        // paksa mode blok teks kolom tunggal
        tessedit_pageseg_mode: (
          Tesseract as unknown as { PSM?: { SINGLE_COLUMN?: number } }
        ).PSM?.SINGLE_COLUMN,
        user_defined_dpi: "300",
        preserve_interword_spaces: "1",
      } as Parameters<typeof Tesseract.recognize>[2];

      const result = await Tesseract.recognize(processedBlob, "ind", options);

      const extracted = result.data.text?.trim();
      if (!extracted) {
        setOcrError("Kami tidak menemukan teks pada gambar ini.");
        setOcrText(null);
        setCleanedText(null);
        return;
      }

      setOcrText(extracted);
      setIsProcessing(false);

      try {
        const { cleanedText } = await cleanOcrText(extracted);
        setCleanedText(cleanedText || extracted);
      } catch (err) {
        console.error("Clean OCR error:", err);
        // fallback: pakai raw
        setCleanedText(extracted);
      }
    } catch (error) {
      console.error("OCR error:", error);
      setOcrError(
        "Terjadi kendala saat membaca teks. Pastikan koneksi dan format gambar sesuai."
      );
      setOcrText(null);
      setCleanedText(null);
    } finally {
      setIsProcessing(false);
      setOcrProgress(0);
    }
  };

  const runAiOcr = async (file: File) => {
    setIsProcessing(true);
    setOcrText(null);
    setCleanedText(null);
    setOcrError(null);
    setOcrProgress(0); // progress manual, karena AI nggak kirim progress

    try {
      // 🔥 panggil API AI OCR via React Query hook
      const { text } = await runAiOcrMutation(file);

      if (!text?.trim()) {
        setOcrError("AI tidak menemukan teks pada gambar ini.");
        setOcrText(null);
        setCleanedText(null);
        return;
      }

      setOcrText(text.trim());

      try {
        const { cleanedText } = await cleanOcrText(text.trim());
        setCleanedText(cleanedText || text.trim());
      } catch (err) {
        console.error("Clean OCR error:", err);
        setCleanedText(text.trim());
      }
    } catch (error) {
      console.error("AI OCR error:", error);
      setOcrError(
        aiOcrError instanceof Error
          ? aiOcrError.message
          : "Terjadi kendala saat membaca teks dengan AI."
      );
      setOcrText(null);
      setCleanedText(null);
    } finally {
      setIsProcessing(false);
      setOcrProgress(0);
    }
  };

  const handleFiles = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);

      if (ocrEngine === "ai") {
        void runAiOcr(file);
      } else {
        runTesseractOcr(file);
      }
    };
    reader.onerror = () => {
      setPreviewUrl(null);
      setOcrError("Gagal membaca file. Coba ulangi.");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleWordClick = (word: string) => {
    const cleaned = word.replace(/[.,!?“”'"‘’]/g, "");
    setSelectedWord(cleaned);
    setActivePanel({ type: "topic", key: "origin" });
  };

  const displayText = cleanedText ?? ocrText;

  const wordsByLine = useMemo(() => {
    if (!displayText) return [];
    return displayText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => line.split(/\s+/));
  }, [displayText]);

  const panelContent = useMemo(() => {
    if (isWordLoading || !selectedWord) return null;

    if (!wordAnalysis) {
      if (activePanel.type === "topic") {
        const topic = LEFT_TOPICS.find((item) => item.key === activePanel.key);
        if (topic) {
          return { title: topic.label, description: topic.description };
        }
      } else {
        const detail = RIGHT_DETAILS.find(
          (item) => item.key === activePanel.key
        );
        if (detail) {
          return { title: detail.label, description: detail.description };
        }
      }
      return null;
    }

    // gunakan hasil AI
    if (activePanel.type === "topic") {
      switch (activePanel.key) {
        case "origin":
          return {
            title: "Asal Usul",
            description: wordAnalysis.asalUsul,
          };
        case "function":
          return {
            title: "Fungsi & Kelas Kata",
            description: wordAnalysis.fungsiDanKelasKata,
          };
        case "usage":
          return {
            title: "Penggunaan dalam Konteks",
            description: wordAnalysis.penggunaanDalamKonteks,
          };
        case "examples":
          return {
            title: "Contoh Kalimat",
            items: wordAnalysis.contohKalimat,
          };
      }
    } else {
      switch (activePanel.key) {
        case "meaning":
          return {
            title: "Makna",
            description: wordAnalysis.makna,
          };
        case "summary":
          return {
            title: "Penjelasan Singkat",
            description: wordAnalysis.penjelasanSingkat,
          };
        case "spelling":
          return {
            title: "Eja Kata",
            description: formatEjaKata(wordAnalysis.ejaKata),
          };
        case "synonym":
          return {
            title: "Sinonim / Antonim",
            items: [
              wordAnalysis.sinonim?.length
                ? `Sinonim: ${wordAnalysis.sinonim.join(", ")}`
                : null,
              wordAnalysis.antonim?.length
                ? `Antonim: ${wordAnalysis.antonim.join(", ")}`
                : null,
            ].filter(Boolean) as string[],
          };
      }
    }

    return null;
  }, [activePanel, wordAnalysis, isWordLoading, selectedWord]);

  return (
    <div className="flex h-full flex-col gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full ">
      <div className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-widest text-[#6B7280]">
          OCR Studio
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#1E293B]">
          Ubah Gambar Menjadi Teks Sastra
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280] max-w-3xl mx-auto">
          Unggah gambar atau tarik ke area di bawah. Kami akan mengekstrak teks
          dan menampilkannya agar setiap kata bisa kamu telusuri lebih dalam.
        </p>
      </div>

      <div className="flex-1 min-h-0">
        <div className="w-full h-auto lg:h-[calc(100vh-9rem-10rem)] overflow-visible lg:overflow-hidden">
          <div className="flex h-full flex-col gap-4 lg:flex-row lg:gap-6">
            <section className="rounded-3xl border border-[#E4E4ED] p-8 shadow-sm bg-white space-y-6 lg:w-[40%] lg:self-start lg:max-h-full lg:overflow-y-auto">
              {/* <div className="flex items-center gap-3 text-sm text-[#475569] mb-2">
                <span className="font-semibold">Mode OCR:</span>
                <button
                  type="button"
                  onClick={() => setOcrEngine("tesseract")}
                  className={`px-3 py-1 rounded-full border text-xs font-medium ${
                    ocrEngine === "tesseract"
                      ? "bg-[#1E293B] text-white border-[#1E293B]"
                      : "bg-white text-[#1E293B] border-[#D4D4D8]"
                  }`}
                >
                  Tesseract (lokal)
                </button>
                <button
                  type="button"
                  onClick={() => setOcrEngine("ai")}
                  className={`px-3 py-1 rounded-full border text-xs font-medium ${
                    ocrEngine === "ai"
                      ? "bg-[#1BA5A5] text-white border-[#1BA5A5]"
                      : "bg-white text-[#1E293B] border-[#D4D4D8]"
                  }`}
                >
                  AI (z.ai)
                </button>
              </div> */}

              {!previewUrl ? (
                <div
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={(event) => {
                    event.preventDefault();
                    setIsDragging(false);
                  }}
                  onDrop={handleDrop}
                  className={`rounded-3xl border-2 border-dashed px-6 py-10 text-center transition ${
                    isDragging
                      ? "border-[#1BA5A5] bg-[#ECFEFF]"
                      : "border-[#D4D4D8] bg-[#F8FAFC]"
                  }`}
                >
                  <div className="flex flex-col items-center gap-4">
                    <UploadCloud className="h-10 w-10 text-[#1BA5A5]" />
                    <div>
                      <p className="text-lg font-semibold text-[#1E293B]">
                        Tarik & Letakkan file atau
                      </p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[#1BA5A5] font-semibold hover:text-[#128080] cursor-pointer"
                      >
                        pilih dari perangkatmu
                      </button>
                    </div>
                    <div>
                      <p className="text-sm text-[#94A3B8]">
                        Format yang didukung: JPG, PNG, HEIC
                      </p>
                      <p className="text-sm text-[#94A3B8]">(maks. 10MB)</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => handleFiles(event.target.files)}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 ">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-[#1E293B]">
                      Pratinjau Gambar
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl(null);
                        setOcrText(null);
                        setCleanedText(null);
                        setOcrError(null);
                      }}
                      className="text-[#F97362] hover:underline text-sm cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                  <div className="relative overflow-hidden rounded-xl border border-[#E4E4ED] bg-[#0f172a]/60">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain bg-black/40"
                    />
                  </div>
                </div>
              )}

              {/* {previewUrl && (
     )} */}
            </section>

            <section className="relative rounded-3xl border border-[#E4E4ED] p-8 shadow-sm bg-white space-y-6 flex-1 lg:w-[60%] overflow-y-auto">
              {!ocrText && !isProcessing && !ocrError && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-[#6B7280]">
                  <Sparkles className="h-10 w-10 text-[#1BA5A5]" />
                  <p className="text-lg font-semibold text-[#1E293B]">
                    Teks hasil OCR akan muncul di sini
                  </p>
                  <p className="max-w-sm">
                    Setelah proses selesai, setiap kata dapat kamu klik untuk
                    menampilkan panel penjelasan linguistik.
                  </p>
                </div>
              )}

              {isProcessing && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 text-[#1E293B]">
                  <Loader2 className="h-8 w-8 animate-spin text-[#1BA5A5]" />
                  <p className="text-sm font-medium">
                    {ocrEngine === "ai"
                      ? "Mengenali teks dengan AI…"
                      : "Mengenali teks …"}
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    {Math.round(ocrProgress * 100)}%
                  </p>
                </div>
              )}

              {!isProcessing && isCleaning && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 text-[#1E293B]">
                  <Loader2 className="h-8 w-8 animate-spin text-[#1BA5A5]" />
                  <p className="text-sm font-medium">Merapikan hasil OCR…</p>
                  <p className="text-xs text-[#6B7280]">
                    Memperbaiki kata, baris yang terpotong, dan kapitalisasi.
                  </p>
                </div>
              )}

              {ocrError && !isProcessing && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-[#F97362]">
                  <p className="text-lg font-semibold">Oops!</p>
                  <p className="text-sm text-[#6B7280] max-w-sm">{ocrError}</p>
                </div>
              )}

              {displayText && !isProcessing && !isCleaning && (
                <div>
                  {wordsByLine.map((line, lineIndex) => (
                    <p
                      key={`line-${lineIndex}`}
                      className="text-md text-[#111827] leading-8 m-0 mb-4 last:mb-0"
                    >
                      {line.map((word, wordIndex) => (
                        <span key={`${lineIndex}-${wordIndex}`}>
                          <button
                            type="button"
                            onClick={() => handleWordClick(word)}
                            className="inline-flex items-center  hover:bg-primary hover:text-white transition text-[#1E293B] cursor-pointer"
                          >
                            {word}
                          </button>{" "}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {selectedWord && (
        <WordAnalysisModal
          selectedWord={selectedWord}
          onClose={() => setSelectedWord(null)}
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          isWordLoading={isWordLoading}
          wordError={wordError}
          panelContent={panelContent}
          leftTopics={LEFT_TOPICS}
          rightDetails={RIGHT_DETAILS}
        />
      )}
    </div>
  );
}
