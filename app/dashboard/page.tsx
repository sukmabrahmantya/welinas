"use client";

import { PUISI } from "@/data/puisi";
import { DASHBOARD_MENUS } from "@/lib/dashboard/menus";
import { ChevronLeft, ChevronRight, ChevronsDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function DashboardPage() {
  const [poemIndex, setPoemIndex] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const poem = PUISI[poemIndex];

  const maxIndex = PUISI.length - 1;
  const canGoPrev = poemIndex > 0;
  const canGoNext = poemIndex < maxIndex;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateHint = () => {
      const isOverflowing = el.scrollHeight > el.clientHeight;
      const threshold = 16;
      const atBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;

      setShowScrollHint(isOverflowing && !atBottom);
    };

    el.scrollTop = 0;
    updateHint();

    window.addEventListener("resize", updateHint);
    return () => window.removeEventListener("resize", updateHint);
  }, [poemIndex]);

  const handlePrev = () => {
    if (!canGoPrev) return;
    setPoemIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!canGoNext) return;
    setPoemIndex((prev) => prev + 1);
  };

  const handlePoemScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const isOverflowing = el.scrollHeight > el.clientHeight;

    if (!isOverflowing) {
      setShowScrollHint(false);
      return;
    }

    const threshold = 16;
    const atBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;

    setShowScrollHint(!atBottom);
  };

  return (
    <div className="flex h-full flex-col gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
      <div className="flex-1 min-h-0">
        <div className="w-full h-auto lg:h-[calc(100vh-4.5rem-5rem)] overflow-visible lg:overflow-hidden">
          <div className="flex h-full flex-col gap-4 lg:flex-row lg:gap-6">
            <aside className="w-full lg:w-72 shrink-0 flex flex-col items-start gap-3">
              {DASHBOARD_MENUS.map((menu) => (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className="
                    w-full rounded-2xl py-4 text-lg font-semibold text-center
                    border border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,252,245,0.98),_rgba(247,234,208,0.98))] p-6 shadow-sm transition hover:translate-y-1 hover:shadow-xl hover:border-[#D9B15F]
                  "
                >
                  {menu.label}
                </Link>
              ))}

              <div className="overflow-hidden rounded-2xl sm:rounded-[28px] shadow-lg border border-brand-gold/35 mt-4 sm:mt-auto bg-brand-gold/5">
                <Image
                  src="/images/character-3.png"
                  alt="Ilustrasi pembaca Welinas"
                  width={540}
                  height={540}
                  className="mx-auto w-full max-w-xs lg:max-w-xl object-contain"
                  priority
                />
              </div>
            </aside>

            <main className="flex-1 border border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(243,232,217,0.96))] rounded-2xl sm:rounded-[28px] backdrop-blur-[2px] lg:rounded-[32px] p-6 sm:p-8 lg:p-12 flex flex-col gap-4 sm:gap-6 min-h-0">
              <div className="flex items-center justify-between shrink-0">
                <span className="self-start px-4 py-1.5 rounded-full bg-[#F3E2B8] text-[#1E293B] text-xs sm:text-sm font-medium border border-brand-gold/50">
                  Puisi minggu ini
                </span>

                <div className="flex items-center gap-2 sm:gap-3 text-[#1E293B]">
                  <button
                    onClick={handlePrev}
                    disabled={!canGoPrev}
                    className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border border-[#D4D4D8] flex items-center justify-center hover:bg-[#F5F3F0] transition disabled:opacity-30"
                    aria-label="Puisi sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canGoNext}
                    className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border border-[#D4D4D8] flex items-center justify-center hover:bg-[#F5F3F0] transition disabled:opacity-30"
                    aria-label="Puisi selanjutnya"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              <article className="flex-1 flex flex-col text-center space-y-3 sm:space-y-4 min-h-0">
                <div className="shrink-0">
                  <h2 className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-[#111827]">
                    {poem.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6B7280] italic mt-1 sm:mt-2">
                    (karya {poem.author})
                  </p>
                </div>

                <div className="relative mt-3 sm:mt-4 flex-1 min-h-0 overflow-hidden">
                  <div
                    ref={scrollRef}
                    onScroll={handlePoemScroll}
                    className="h-full max-h-full overflow-y-auto space-y-2 text-base sm:text-lg lg:text-xl leading-relaxed font-[var(--literary-font)]"
                  >
                    {poem.lines.map((line, index) => (
                      <p key={line + index}>{line}</p>
                    ))}
                  </div>

                  {showScrollHint && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center md:bottom-2 md:justify-end md:pr-10">
                      <div className="rounded-full shadow-2xl border border-[#D4D4D8] bg-brand-gold/15 animate-bounce p-2">
                        <ChevronsDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#111827] opacity-50" />
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
