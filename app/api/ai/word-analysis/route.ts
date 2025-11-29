import { NextRequest, NextResponse } from "next/server";
import type { WordAnalysis } from "@/types/wordAnalysis";
import { callOpenAiChat } from "@/lib/ai/llmClient";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { word, language = "id" } = (await req.json()) as {
      word?: string;
      language?: "id" | "en";
    };

    if (!word || typeof word !== "string") {
      return NextResponse.json(
        { error: "Field 'word' wajib diisi." },
        { status: 400 }
      );
    }

    const prompt = `
      Kamu adalah asisten linguistik bahasa Indonesia untuk platform literasi digital bernama Welinas.

      Analisis kata/frasa berikut secara ringkas, jelas, dan akurat.
      Kata: "${word}"

      Bahasa: ${
        language === "id"
          ? "Bahasa Indonesia"
          : "English (tapi JAWAB tetap dalam Bahasa Indonesia)"
      }

      Kembalikan HASIL dalam format JSON PENUH **tanpa penjelasan tambahan** dengan struktur persis seperti ini:

      {
        "asalUsul": "asal usul kata, sejarah singkat, dari bahasa apa, dan bagaimana berkembang (3–6 kalimat)",
        "fungsiDanKelasKata": "jelaskan kelas kata (verba, nomina, adjektiva, dsb.) dan fungsi umum kata ini dalam kalimat (2–4 kalimat)",
        "penggunaanDalamKonteks": "jelaskan konteks umum penggunaan kata ini: formal/tidak formal, sastra/sehari-hari, nuansa emosional, dsb. (3–5 kalimat)",
        "contohKalimat": [
          "contoh kalimat 1 menggunakan kata tersebut dalam konteks yang natural",
          "contoh kalimat 2",
          "contoh kalimat 3"
        ],
        "makna": "makna inti/utama kata dalam 1–2 kalimat",
        "penjelasanSingkat": "ringkasan 2–3 kalimat yang mengikat makna dan nuansa penggunaan kata",
        "ejaKata": "tuliskan ejaan suku kata jika relevan, misalnya: hu·jan bu·lan ju·ni",
        "sinonim": [
          "sinonim 1 (jika ada)",
          "sinonim 2"
        ],
        "antonim": [
          "antonim 1 (jika ada)",
          "antonim 2"
        ]
      }

      Pastikan:
      - Semua nilai berupa string (kecuali array).
      - Semua teks dalam Bahasa Indonesia.
      - Jika tidak ada sinonim/antonim yang tepat, gunakan array kosong [].
    `;

    const data = await callOpenAiChat<WordAnalysis>({
      messages: [
        {
          role: "system",
          content:
            "Kamu adalah asisten linguistik bahasa Indonesia untuk platform belajar bernama Welinas. Jawab dengan rapi, akurat, dan dalam Bahasa Indonesia.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      responseFormat: "json_object",
      temperature: 0.3,
      maxTokens: 1024,
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("Word analysis error:", err);

    return NextResponse.json(
      { error: "Gagal menganalisis kata dengan OpenAI." },
      { status: 500 }
    );
  }
}
