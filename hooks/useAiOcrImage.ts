"use client";

import { useMutation } from "@tanstack/react-query";

export type AiOcrResponse = {
  text: string;
};

async function aiOcrRequest(file: File): Promise<AiOcrResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/ai/ocr-image", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`AI OCR failed: ${res.status} ${res.statusText} ${text}`);
  }

  return res.json();
}

export function useAiOcrImage() {
  return useMutation({
    mutationFn: (file: File) => aiOcrRequest(file),
  });
}
