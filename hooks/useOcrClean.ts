"use client";

import { useMutation } from "@tanstack/react-query";

type OcrCleanResult = {
  cleanedText: string;
};

async function cleanOcrText(rawText: string): Promise<OcrCleanResult> {
  const res = await fetch("/api/ai/ocr-clean", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rawText }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `OCR clean failed: ${res.status} ${res.statusText} ${text}`
    );
  }

  return res.json();
}

export function useOcrClean() {
  return useMutation({
    mutationFn: (rawText: string) => cleanOcrText(rawText),
  });
}
