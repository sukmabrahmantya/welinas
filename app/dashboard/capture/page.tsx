"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type Webcam from "react-webcam";
import { Loader2, Sparkles, UploadCloud } from "lucide-react";

import { useWordAnalysis } from "@/hooks/useWordAnalysis";
import { useAiOcrImage } from "@/hooks/useAiOcrImage";
import { WordAnalysisModal } from "./WordAnalysisModal";
import { WebcamModal } from "./WebcamModal";
import {
  LEFT_TOPICS,
  RIGHT_DETAILS,
  formatEjaKata,
  type ActivePanel,
} from "./constants";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  useCreateFavorite,
  useDeleteFavorite,
  useFavorites,
} from "@/hooks/useFavorites";

function CapturePageContent() {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");
  const isCameraMode = modeParam === "camera";

  const { data: currentUser } = useCurrentUser();
  const userId = currentUser?.id ?? null;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const webcamRef = useRef<Webcam | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrText, setOcrText] = useState<string | null>(null);
  const [cleanedText, setCleanedText] = useState<string | null>(null);
  const [ocrError, setOcrError] = useState<string | null>(null);

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<ActivePanel>({
    type: "topic",
    key: LEFT_TOPICS[0].key,
  });

  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [pendingCapture, setPendingCapture] = useState<string | null>(null);

  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<
    string | undefined
  >();

  const loadDevices = useCallback(async () => {
    try {
      if (!navigator.mediaDevices?.enumerateDevices) return;
      const mediaDevices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = mediaDevices.filter((d) => d.kind === "videoinput");
      setDevices(videoInputs);

      if (!selectedDeviceId && videoInputs.length > 0) {
        const preferred =
          videoInputs.find((d) => d.label.toLowerCase().includes("usb")) ||
          videoInputs.find(
            (d) => !d.label.toLowerCase().includes("integrated")
          ) ||
          videoInputs[0];

        setSelectedDeviceId(preferred.deviceId);
      }
    } catch (err) {
      console.error("Failed to enumerate devices", err);
    }
  }, [selectedDeviceId]);

  useEffect(() => {
    if (!isCameraModalOpen) return;

    navigator.mediaDevices
      ?.getUserMedia({ video: true })
      .then((stream) => {
        stream.getTracks().forEach((t) => t.stop());
        return loadDevices();
      })
      .catch((err) => {
        console.error("getUserMedia error", err);
        setCameraError(
          "Tidak dapat mengakses kamera. Izinkan akses kamera di browser lalu coba lagi."
        );
      });
  }, [isCameraModalOpen, loadDevices]);

  const videoConstraints = useMemo(
    () =>
      selectedDeviceId
        ? {
            deviceId: { exact: selectedDeviceId },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          }
        : {
            facingMode: "user" as const,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
    [selectedDeviceId]
  );

  const {
    data: wordAnalysis,
    isLoading: isWordLoading,
    error: wordError,
  } = useWordAnalysis({
    selectedWord,
    language: "id",
  });

  const { mutateAsync: runAiOcrMutation, error: aiOcrError } = useAiOcrImage();
  const { data: favorites = [] } = useFavorites(userId);
  const createFavorite = useCreateFavorite();
  const deleteFavorite = useDeleteFavorite();

  const toggleFavoriteFromModal = useCallback(() => {
    if (!userId || !selectedWord) return;

    const existing = favorites.find(
      (fav) => fav.word.toLowerCase() === selectedWord.toLowerCase(),
    );

    if (existing) {
      deleteFavorite.mutate({ id: existing.id, userId });
    } else {
      createFavorite.mutate({ userId, word: selectedWord });
    }
  }, [createFavorite, deleteFavorite, favorites, selectedWord, userId]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    setPreviewUrl(null);
    setOcrText(null);
    setCleanedText(null);
    setOcrError(null);
    setSelectedWord(null);
    setCameraError(null);
    setPendingCapture(null);
  }, [isCameraMode]);

  const runAiOcr = async (file: File) => {
    setIsProcessing(true);
    setOcrText(null);
    setCleanedText(null);
    setOcrError(null);

    try {
      const { text } = await runAiOcrMutation(file);

      if (!text?.trim()) {
        setOcrError("AI tidak menemukan teks pada gambar ini.");
        setOcrText(null);
        setCleanedText(null);
        return;
      }

      const raw = text.trim();
      // langsung pakai hasil AI
      setOcrText(raw);
      setCleanedText(raw);
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
      void runAiOcr(file);
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

  const handleRetake = () => {
    setPreviewUrl(null);
    setOcrText(null);
    setCleanedText(null);
    setOcrError(null);
    setSelectedWord(null);
    setCameraError(null);
    setPendingCapture(null);
  };

  const previewSection = previewUrl ? (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-[#1E293B]">Pratinjau Gambar</p>
        <button
          type="button"
          onClick={handleRetake}
          className="text-[#F97362] hover:underline text-sm cursor-pointer"
        >
          Ganti Gambar
        </button>
      </div>
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={previewUrl}
          alt="Preview"
          width={800}
          height={600}
          className="w-full h-auto object-contain bg-black/40"
        />
      </div>
    </div>
  ) : null;

  const handleUseCapturedPhoto = async () => {
    if (!pendingCapture) return;

    setPreviewUrl(pendingCapture);
    setPendingCapture(null);
    setIsCameraModalOpen(false);

    try {
      const response = await fetch(pendingCapture);
      const blob = await response.blob();
      const file = new File([blob], `capture-${Date.now()}.png`, {
        type: blob.type || "image/png",
      });

      void runAiOcr(file);
    } catch (error) {
      console.error("camera capture error", error);
      setOcrError("Tidak dapat memproses gambar kamera. Coba ulangi.");
    }
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
        <p className="inline-flex items-center justify-center rounded-full bg-[#F3E2B8] border border-brand-gold/50 px-4 py-1 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#6B7280]">
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
            <section className="rounded-2xl sm:rounded-[28px] p-8 shadow-sm bg-white space-y-6 lg:w-[40%] lg:self-start lg:max-h-full lg:overflow-y-auto border border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(247,234,208,0.96))] shadow-sm">
              {isCameraMode ? (
                <>
                  {!previewUrl && (
                    <div className="space-y-4 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setCameraError(null);
                          setPendingCapture(null);
                          setIsCameraModalOpen(true);
                        }}
                        className="w-full rounded-2xl bg-[#1E293B] px-4 py-4 text-sm font-semibold text-white hover:bg-[#162033]"
                      >
                        Buka Kamera
                      </button>
                      <p className="text-xs text-[#6B7280]">
                        Kamera akan terbuka dalam tampilan besar untuk menangkap
                        teks dengan jelas.
                      </p>
                      {cameraError && (
                        <p className="text-sm text-[#F97362]">{cameraError}</p>
                      )}
                    </div>
                  )}
                  {previewSection}
                </>
              ) : previewSection ? (
                previewSection
              ) : (
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
                  className={`rounded-2xl sm:rounded-[28px] border-2 border-dashed px-6 py-10 text-center transition ${
                    isDragging
                      ? "border-brand-gold bg-brand-gold/15"
                      : "border-[#D4D4D8] transparent"
                  }`}
                >
                  <div className="flex flex-col items-center gap-4">
                    <UploadCloud className="h-10 w-10 text-brand-gold" />
                    <div>
                      <p className="text-lg font-semibold text-[#1E293B]">
                        Tarik & Letakkan file atau
                      </p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-brand-gold font-semibold hover:text-brand-gold/80 cursor-pointer"
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
              )}
            </section>

            <section className="relative rounded-2xl sm:rounded-[28px] backdrop-blur-[2px] lg:rounded-[32px] p-8 shadow-sm border border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(243,232,217,0.96))] space-y-6 flex-1 lg:w-[60%] overflow-y-auto">
              {!ocrText && !isProcessing && !ocrError && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-[#6B7280]">
                  <Sparkles className="h-10 w-10 text-brand-gold" />
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
                <div className="absolute inset-0 backdrop-blur-sm flex flex-col items-center justify-center gap-3 text-[#1E293B]">
                  <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
                  <p className="text-sm font-medium">
                    Mengenali teks dengan AI…
                  </p>
                </div>
              )}

              {ocrError && !isProcessing && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-[#F97362]">
                  <p className="text-lg font-semibold">Oops!</p>
                  <p className="text-sm text-[#6B7280] max-w-sm">{ocrError}</p>
                </div>
              )}

              {displayText && !isProcessing && (
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
                            className="inline-flex items-center hover:bg-primary hover:text-white transition text-[#1E293B] cursor-pointer"
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

      <WebcamModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        webcamRef={webcamRef}
        pendingCapture={pendingCapture}
        setPendingCapture={setPendingCapture}
        cameraError={cameraError}
        setCameraError={setCameraError}
        devices={devices}
        selectedDeviceId={selectedDeviceId}
        setSelectedDeviceId={setSelectedDeviceId}
        videoConstraints={videoConstraints}
        onUseCapturedPhoto={handleUseCapturedPhoto}
        loadDevices={loadDevices}
      />

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
          onToggleFavorite={toggleFavoriteFromModal}
          isFavorited={Boolean(
            favorites?.some(
              (fav) => fav.word.toLowerCase() === selectedWord.toLowerCase(),
            ),
          )}
          favoriteLoading={createFavorite.isPending || deleteFavorite.isPending}
        />
      )}
    </div>
  );
}

export default function CapturePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center text-[#6B7280]">
          Memuat studio OCR…
        </div>
      }
    >
      <CapturePageContent />
    </Suspense>
  );
}
