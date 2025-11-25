import { NextRequest, NextResponse } from "next/server";
import { callAiChat } from "@/lib/ai/llmClient";

export const runtime = "nodejs";

type OcrCleanBody = {
  rawText?: string;
};

type OcrCleanResult = {
  cleanedText: string;
};

export async function POST(req: NextRequest) {
  try {
    const { rawText } = (await req.json()) as OcrCleanBody;

    if (!rawText || typeof rawText !== "string") {
      return NextResponse.json(
        { error: "Field 'rawText' wajib diisi." },
        { status: 400 }
      );
    }

    const prompt = `
      Kamu adalah asisten yang tugasnya membersihkan teks Bahasa Indonesia dari hasil OCR (Optical Character Recognition) buku/novel.

      Fokus utamamu:
      - Memperbaiki teks yang TERLIHAT seperti hasil scan halaman buku/novel.
      - Menggabungkan baris-baris yang seharusnya menyatu dalam satu kalimat atau paragraf.
      - Memperbaiki kata yang terpotong di awal/akhir baris, misalnya:
        - "edia sosial" → "di media sosial"
        - "anya perihal kabarmu." → "Bertanya perihal kabarmu."
        - "mat tidur" → "selamat tidur"
        - "en kamu" → "kangen kamu"
      - Memperbaiki huruf yang salah deteksi, pemenggalan kata, dan spasi yang keliru.
      - Memperbaiki kapitalisasi di awal kalimat dan setelah tanda titik.
      - Menata ulang baris menjadi kalimat dan paragraf yang wajar dibaca.

      Aturan penting:
      - Pertahankan makna, suasana, dan gaya bahasa sedekat mungkin dengan teks asli.
      - Jangan meringkas, menambah adegan, atau mengubah isi cerita.
      - Gunakan ejaan Bahasa Indonesia yang baku (EBI) sebisa mungkin, tanpa menghilangkan nuansa puitis/novel.
      - Pertahankan pemisahan paragraf yang wajar: baris kosong di antara paragraf boleh dipertahankan atau diperbaiki seperlunya.
      - Jika sebuah baris dimulai dengan potongan kata yang jelas tidak utuh (misalnya "edia", "anya", "mat", "ah", "ya"), gunakan konteks kalimat sebelumnya untuk menebak kata utuh yang paling wajar, lalu tuliskan kata lengkapnya.
      - JANGAN menambahkan komentar, catatan, atau penjelasan apa pun.
      - HANYA kembalikan teks yang sudah diperbaiki, siap dibaca, tanpa pembuka/penutup tambahan.

      Berikut teks mentah (hasil OCR) yang perlu kamu perbaiki:

      """${rawText}"""
    `;

    const cleaned = await callAiChat<string>({
      messages: [
        {
          role: "system",
          content:
            "Kamu adalah asisten yang hanya mengembalikan teks hasil perbaikan OCR, tanpa penjelasan tambahan.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      responseFormat: "text",
      temperature: 0.2, // agak deterministik
      maxTokens: 2048,
    });

    const result: OcrCleanResult = {
      cleanedText: cleaned.trim(),
    };

    return NextResponse.json(result);
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("OCR clean error:", err);
    return NextResponse.json(
      { error: "Gagal membersihkan teks OCR." },
      { status: 500 }
    );
  }
}
