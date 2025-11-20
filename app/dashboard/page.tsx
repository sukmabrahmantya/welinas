"use client";

import { Button } from "@/components/Button";
import { PUISI } from "@/data/puisi";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  ImageUp,
  UploadCloud,
  ChevronsDown,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const menus = ["Quiz", "History", "Sastra"];

export default function DashboardPage() {
  const [poemIndex, setPoemIndex] = useState(0);
  const [cameraMenuOpen, setCameraMenuOpen] = useState(false);
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
    <div className="min-h-screen bg-[#F5F3F0] flex flex-col">
      <header className="bg-[#1E293B] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/brand.png"
              alt="Logo Welinas"
              width={32}
              height={32}
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
            />
            <p className="font-semibold text-lg sm:text-2xl leading-tight text-brand-gold">
              Welinas.
            </p>
          </div>

          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#D9B15F] text-[#1E293B] flex items-center justify-center font-semibold text-sm sm:text-base">
            U
          </div>
        </div>
      </header>

      <main className="flex-1 w-full flex">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-1">
          <div className="grid gap-6 h-auto lg:h-full lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
            <aside className="flex flex-col space-y-2 h-full">
              {menus.map((menu) => (
                <Button
                  key={menu}
                  className="w-full rounded-2xl py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-sm transition cursor-pointer"
                >
                  {menu}
                </Button>
              ))}

              <div className="overflow-hidden rounded-3xl shadow-lg border border-primary/20 mt-4 sm:mt-auto bg-brand-gold/5">
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

            <section className="bg-white rounded-2xl sm:rounded-[28px] lg:rounded-[32px] shadow-2xl border border-[#E4E4ED] p-6 sm:p-8 lg:p-12 flex flex-col gap-4 sm:gap-6 h-full">
              <div className="flex flex-col gap-3 flex-row items-center justify-between">
                <span className="self-start px-4 py-1.5 rounded-full bg-[#F0F2F8] text-[#1E293B] text-xs sm:text-sm font-medium">
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

              <article className="flex-1 flex flex-col text-center space-y-3 sm:space-y-4">
                <div>
                  <h2 className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-[#1E293B]">
                    {poem.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6B7280] italic mt-1 sm:mt-2">
                    (karya {poem.author})
                  </p>
                </div>

                <div className="relative mt-3 sm:mt-4 flex-1">
                  <div
                    ref={scrollRef}
                    onScroll={handlePoemScroll}
                    className="flex-1 space-y-2 text-base sm:text-lg lg:text-xl leading-relaxed font-[var(--literary-font)] max-h-58 overflow-y-auto pr-2"
                  >
                    {poem.lines.map((line, index) => (
                      <p key={line + index}>{line}</p>
                    ))}
                  </div>

                  {showScrollHint && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center md:bottom-2 md:justify-end md:pr-10">
                      <div className="rounded-full shadow-2xl border border-[#D4D4D8] bg-brand-gold/5 animate-bounce p-2">
                        <ChevronsDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#111827] opacity-50" />
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </section>
          </div>
        </div>
      </main>

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col items-end gap-3">
        {cameraMenuOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-[#D4D4D8] p-4 w-52 sm:w-56 space-y-3 menu-fade">
            <button className="w-full flex items-center gap-3 rounded-xl border border-[#D4D4D8] px-3 sm:px-4 py-2.5 sm:py-3 text-left text-[#1E293B] hover:bg-[#F5F3F0] transition">
              <UploadCloud className="h-5 w-5 text-[#1BA5A5]" />
              <span className="text-sm font-medium">Upload Image</span>
            </button>
            <button className="w-full flex items-center gap-3 rounded-xl border border-[#D4D4D8] px-3 sm:px-4 py-2.5 sm:py-3 text-left text-[#1E293B] hover:bg-[#F5F3F0] transition">
              <ImageUp className="h-5 w-5 text-[#F97362]" />
              <span className="text-sm font-medium">Ambil Gambar</span>
            </button>
          </div>
        )}

        <button
          onClick={() => setCameraMenuOpen((prev) => !prev)}
          className={`h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#1E293B] text-white flex items-center justify-center shadow-xl border-4 border-[#D9B15F] transition-transform duration-300 hover:scale-105 cursor-pointer ${
            cameraMenuOpen ? "camera-pop" : ""
          }`}
          aria-label="Buka kamera"
        >
          <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <style jsx>{`
        @keyframes camera-pop {
          0% {
            transform: scale(0.9);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes menu-fade {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .camera-pop {
          animation: camera-pop 0.4s ease;
        }

        .menu-fade {
          animation: menu-fade 0.35s ease-out;
        }
      `}</style>
    </div>
  );
}
