"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Topic = {
  key: string;
  label: string;
};

type Detail = {
  key: string;
  label: string;
};

type ActivePanel =
  | { type: "topic"; key: string }
  | { type: "detail"; key: string };

type PanelContent =
  | {
      title: string;
      description: string;
      items?: undefined;
    }
  | {
      title: string;
      description?: string;
      items: string[];
    }
  | null;

type Props = {
  selectedWord: string;
  onClose: () => void;

  activePanel: ActivePanel;
  setActivePanel: (panel: ActivePanel) => void;

  isWordLoading: boolean;
  wordError: unknown;
  panelContent: PanelContent;

  leftTopics: Topic[];
  rightDetails: Detail[];
};

export function WordAnalysisModal({
  selectedWord,
  onClose,
  activePanel,
  setActivePanel,
  isWordLoading,
  wordError,
  panelContent,
  leftTopics,
  rightDetails,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  // animate in
  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // animate out lalu panggil onClose dari parent
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200); // durasi harus sama dengan duration-200
  };

  const hasError = !!wordError;

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-[#0f172a]/70 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-200",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      onClick={handleClose}
    >
      <div
        className={cn(
          "w-full max-w-4xl h-[80vh] max-h-[80vh] rounded-2xl sm:rounded-[28px] p-8 shadow-2xl flex flex-col gap-6 overflow-hidden transform transition-all duration-200 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(247,234,208,0.96))] shadow-2xl border border-[#E2D4BB]",
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-3">
            <p className="inline-flex items-center justify-center rounded-full bg-[#F3E2B8] border border-brand-gold/50 px-4 py-1 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#6B7280]">
              Penjelasan terkait
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-[#1E293B]">
              {selectedWord}
            </h1>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 text-[#6B7280] hover:bg-white/60 transition cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 min-h-0">
          <div className="grid h-full items-stretch gap-6 lg:grid-cols-[200px_minmax(0,1fr)_200px]">
            <div className="h-full flex flex-col gap-3">
              {leftTopics.map((topic) => (
                <button
                  key={topic.key}
                  onClick={() =>
                    setActivePanel({ type: "topic", key: topic.key })
                  }
                  disabled={isWordLoading}
                  className={`relative flex items-center justify-between w-full h-full rounded-2xl border p-4 text-md font-semibold text-left cursor-pointer shadow-sm transition hover:translate-y-1 hover:shadow-xl ${
                    activePanel.type === "topic" &&
                    activePanel.key === topic.key
                      ? "bg-[radial-gradient(circle_at_right,_rgba(255,252,245,0.98),_rgba(247,234,208,0.98))] border-brand-gold"
                      : "border-transparent bg-brand-gold/5 hover:border-brand-gold"
                  }`}
                >
                  {topic.label}
                  {activePanel.type === "topic" &&
                    activePanel.key === topic.key && (
                      <div className="bg-white p-1 rounded-full border border-brand-gold pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 transition">
                        <ChevronRight className="h-4 w-4 text-brand-gold drop-shadow-sm" />
                      </div>
                    )}
                </button>
              ))}
            </div>

            <div className="h-full overflow-hidden">
              <div className="h-full max-h-full overflow-y-auto rounded-2xl sm:rounded-[28px] border border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(243,232,217,0.96))] p-6 space-y-3 shadow-sm">
                {isWordLoading && (
                  <div className="h-full flex flex-col items-center justify-center gap-3 text-[#6B7280]">
                    <Loader2 className="h-5 w-5 animate-spin text-[#1BA5A5]" />
                    <p className="text-sm font-medium">
                      Menganalisis kata “{selectedWord}”…
                    </p>
                    <p className="text-xs text-center">
                      AI sedang meracik kata yang kamu minta. Tunggu sebentar ya
                      ✨
                    </p>
                  </div>
                )}

                {!isWordLoading && hasError && (
                  <div className="text-sm text-[#F97362]">
                    Gagal memuat analisis kata. Coba lagi nanti.
                  </div>
                )}

                {!isWordLoading && !hasError && panelContent && (
                  <>
                    <p className="text-lg uppercase tracking-widest text-primary font-bold">
                      {panelContent.title}
                    </p>
                    {panelContent.items ? (
                      <ul className="mt-2 space-y-2 list-disc list-inside text-base leading-relaxed text-[#475569]">
                        {panelContent.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-base leading-relaxed text-[#475569] whitespace-pre-line">
                        {panelContent.description}
                      </p>
                    )}
                  </>
                )}

                {!isWordLoading && !hasError && !panelContent && (
                  <p className="text-sm text-[#6B7280]">
                    Pilih kategori di sisi kiri atau kanan untuk melihat
                    penjelasan.
                  </p>
                )}
              </div>
            </div>

            <div className="h-full flex flex-col justify-between gap-3">
              {rightDetails.map((detail) => (
                <button
                  key={detail.key}
                  onClick={() =>
                    setActivePanel({ type: "detail", key: detail.key })
                  }
                  disabled={isWordLoading}
                  className={`relative flex items-center justify-between w-full h-full rounded-2xl border p-4 text-md font-semibold text-left cursor-pointer shadow-sm transition hover:translate-y-1 hover:shadow-xl ${
                    activePanel.type === "detail" &&
                    activePanel.key === detail.key
                      ? "bg-[radial-gradient(circle_at_right,_rgba(255,252,245,0.98),_rgba(247,234,208,0.98))] border-brand-gold"
                      : "border-transparent bg-brand-gold/5 hover:border-brand-gold"
                  }`}
                >
                  {detail.label}
                  {activePanel.type === "detail" &&
                    activePanel.key === detail.key && (
                      <div className="bg-white p-1 rounded-full border border-brand-gold pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 transition">
                        <ChevronRight className="h-4 w-4 text-brand-gold drop-shadow-sm scale-x-[-1]" />
                      </div>
                    )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
