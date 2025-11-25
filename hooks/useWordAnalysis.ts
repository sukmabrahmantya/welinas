"use client";

import { useQuery } from "@tanstack/react-query";
import type { WordAnalysis } from "@/types/wordAnalysis";

async function fetchWordAnalysis(word: string): Promise<WordAnalysis> {
  const res = await fetch("/api/ai/word-analysis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Word analysis failed: ${res.status} ${res.statusText} ${text}`
    );
  }

  return res.json();
}

export function useWordAnalysis(selectedWord: string | null) {
  return useQuery({
    queryKey: ["word-analysis", selectedWord],
    queryFn: () => fetchWordAnalysis(selectedWord as string),
    enabled: !!selectedWord,
    staleTime: 1000 * 60 * 5, // 5 menit
    retry: (failureCount, error) => {
      const message =
        error instanceof Error ? error.message : String(error ?? "");

      // Kalau 429 atau rate limit -> JANGAN retry
      if (message.includes("429") || message.toLowerCase().includes("rate")) {
        return false;
      }

      // Selain itu, boleh retry sekali dua kali (misalnya network putus sebentar)
      return failureCount < 1; // maks 1x retry
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
