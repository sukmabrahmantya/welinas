"use client";

import Link from "next/link";
import { Target, Zap } from "lucide-react";

import { QUIZ_MATERIALS } from "@/data/quiz";
import TrueFocus from "@/components/TrueFocus";

export default function QuizGameListPage() {
  return (
    <div className="flex h-full flex-col gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
      <div className="flex flex-col gap-3 text-center">
        <span className="inline-flex items-center justify-center rounded-full bg-[#F3E2B8] border border-brand-gold/60 px-4 py-1 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#6B7280] mx-auto">
          Mode Game · Shooting
        </span>

        <TrueFocus
          sentence="Pilih Arena Tantangan"
          manualMode={false}
          blurAmount={3}
          borderColor="#D9B15F"
          animationDuration={2}
          pauseBetweenAnimations={1}
        />

        <p className="text-sm sm:text-base text-[#6B7280] max-w-3xl mx-auto">
          Setiap materi memiliki 50 soal acak lintas level. Jawab cepat,
          kumpulkan poin, dan jaga HP agar tidak habis.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {QUIZ_MATERIALS.map((material) => (
          <Link
            key={material.id}
            href={`/dashboard/quiz/game/${material.id}`}
            className="group rounded-2xl sm:rounded-[28px] border border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,252,245,0.98),_rgba(247,234,208,0.98))] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:border-brand-gold"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-2xl sm:rounded-[28px] bg-[#1E293B]/10 p-3 text-[#1E293B]">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#9CA3AF]">
                  #{material.id}
                </p>
                <h2 className="text-2xl font-semibold text-[#1E293B] mt-1">
                  {material.title}
                </h2>
                <p className="text-sm text-[#6B7280] mt-1">
                  Shooting Game · 5 Level
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#475569]">
              {material.description}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-brand-gold font-semibold">
              <Zap className="h-4 w-4" />
              <span className="relative">
                Masuk Arena
                <span className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-brand-gold/60 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
