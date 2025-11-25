import { NextRequest, NextResponse } from "next/server";
import { callZaiVision } from "@/lib/ai/llmClient";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "File tidak ditemukan" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const contentType = (file as Blob).type || "image/png";
    const dataUrl = `data:${contentType};base64,${base64}`;

    const prompt = `
      Kamu adalah asisten OCR untuk teks Bahasa Indonesia, khususnya teks sastra/buku.

      Tugasmu:
      - Ekstrak seluruh teks yang ada di gambar.
      - Rapikan pemenggalan kata dan baris (gabungkan jika putus di tengah).
      - Perbaiki huruf yang keliru jika jelas konteksnya.
      - Pertahankan paragraf dan gaya bahasa sedekat mungkin dengan teks asli.
      - JANGAN menambah komentar, penjelasan, atau label apa pun.
      - Hanya kembalikan teks bersih saja.
    `;

    // const text = await callZaiVision({
    //   messages: [
    //     {
    //       role: "user",
    //       content: [
    //         { type: "input_image", image_url: imageDataUrl },
    //         { type: "text", text: prompt },
    //       ],
    //     },
    //   ],
    //   temperature: 0.2,
    //   maxTokens: 2048,
    // });

    const visionText = await callZaiVision({
      imageDataUrl: dataUrl,
      prompt,
      temperature: 0, // biar bener2 "baca", bukan ngarang
      maxTokens: 2048,
    });

    return NextResponse.json({ text: visionText.trim() });
  } catch (error: unknown) {
    console.error("OCR vision error:", error);
    const message =
      error instanceof Error
        ? error.message
        : String(error ?? "Gagal memproses OCR via AI");
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
