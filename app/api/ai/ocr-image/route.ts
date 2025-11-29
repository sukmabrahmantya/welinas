import { callOpenAiVision } from "@/lib/ai/llmClient";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type OcrImageResult = {
  text: string;
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "Field 'file' wajib diisi dan harus berupa file gambar." },
        { status: 400 }
      );
    }

    const mimeType = file.type || "image/png";
    if (!mimeType.startsWith("image/")) {
      return NextResponse.json(
        { error: "Hanya file gambar yang diperbolehkan." },
        { status: 400 }
      );
    }

    // 🔹 Blob -> base64 data URL
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64}`;

    const prompt = `
      Kamu adalah asisten OCR untuk aplikasi literasi "Welinas".

      Tugasmu:
      - Membaca teks pada foto halaman buku (Bahasa Indonesia).
      - Kembalikan hanya TEKS yang terbaca, rapi, layak baca.
      - Perbolehkan sedikit perbaikan ejaan & pemenggalan baris, tapi:
        - Jangan meringkas.
        - Jangan menambah kalimat yang tidak ada di gambar.
        - Jangan menambahkan komentar atau penjelasan apa pun.

      Output:
      - Hanya teks final, siap dipakai, tanpa judul tambahan.
    `;

    const rawText = await callOpenAiVision({
      prompt,
      imageDataUrl: dataUrl,
    });

    const cleaned = rawText.trim();
    if (!cleaned) {
      return NextResponse.json(
        {
          error:
            "Model tidak mengembalikan teks apa pun. Pastikan foto halaman buku jelas dan dapat terbaca.",
        },
        { status: 422 }
      );
    }

    const result: OcrImageResult = {
      text: cleaned,
    };

    return NextResponse.json(result);
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("OCR image error:", err);

    return NextResponse.json(
      { error: "Gagal membaca teks dari gambar dengan GPT-4o mini." },
      { status: 500 }
    );
  }
}
