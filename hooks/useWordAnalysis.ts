"use client";

import { useQuery } from "@tanstack/react-query";
import type { WordAnalysis } from "@/types/wordAnalysis";

type FetchWordAnalysisParams = {
  word: string;
  language?: "id" | "en";
};

async function fetchWordAnalysis({
  word,
  language = "id",
}: FetchWordAnalysisParams): Promise<WordAnalysis> {
  const res = await fetch("/api/ai/word-analysis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word, language }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Word analysis failed: ${res.status} ${res.statusText} ${text}`
    );
  }

  return res.json();
}

type UseWordAnalysisOptions = {
  selectedWord: string | null;
  language?: "id" | "en";
};

export function useWordAnalysis({
  selectedWord,
  language = "id",
}: UseWordAnalysisOptions) {
  const normalizedWord =
    selectedWord
      ?.trim()
      .toLowerCase()
      .replace(/[.,!?“”'"‘’]/g, "") ?? "";

  return useQuery({
    queryKey: ["word-analysis", normalizedWord, language],
    enabled: normalizedWord.length > 0,
    queryFn: () =>
      fetchWordAnalysis({
        word: normalizedWord,
        language,
      }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    retry: (failureCount, error) => {
      const message =
        error instanceof Error ? error.message : String(error ?? "");

      if (message.includes("429") || message.toLowerCase().includes("rate")) {
        return false;
      }

      return failureCount < 1;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
