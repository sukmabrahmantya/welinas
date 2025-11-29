import { useMemo, useState } from "react";

import {
  LEFT_TOPICS,
  RIGHT_DETAILS,
  formatEjaKata,
  type ActivePanel,
} from "@/app/dashboard/capture/constants";
import { useWordAnalysis } from "./useWordAnalysis";

export function useWordAnalysisModal() {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<ActivePanel>({
    type: "topic",
    key: LEFT_TOPICS[0].key,
  });

  const {
    data: wordAnalysis,
    isLoading: isWordLoading,
    error: wordError,
  } = useWordAnalysis({
    selectedWord,
    language: "id",
  });

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
          (item) => item.key === activePanel.key,
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

  const openModal = (word: string) => {
    const cleaned = word.replace(/[.,!?“”'"‘’]/g, "");
    setSelectedWord(cleaned);
    setActivePanel({ type: "topic", key: LEFT_TOPICS[0].key });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return {
    selectedWord,
    isModalOpen,
    openModal,
    closeModal,
    activePanel,
    setActivePanel,
    isWordLoading,
    wordError,
    panelContent,
  };
}
