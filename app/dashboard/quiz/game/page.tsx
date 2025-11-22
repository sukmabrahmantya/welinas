"use client";

import Link from "next/link";
import { Target, Zap } from "lucide-react";

import { QUIZ_MATERIALS } from "@/data/quiz";
import TrueFocus from "@/components/TrueFocus";

export default function QuizGameListPage() {
  return (
    <div className="min-h-screen bg-[#F5F3F0] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#6B7280]">
            Mode Game · Shooting
          </p>
          <TrueFocus
            sentence="Pilih Arena Tantangan"
            manualMode={false}
            blurAmount={3}
            borderColor="black"
            animationDuration={2}
            pauseBetweenAnimations={1}
          />
          <p className="text-[#475569] max-w-3xl mx-auto">
            Setiap materi memiliki 50 soal acak lintas level. Jawab cepat,
            kumpulkan poin, dan jaga HP agar tidak habis.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {QUIZ_MATERIALS.map((material) => (
            <Link
              key={material.id}
              href={`/dashboard/quiz/game/${material.id}`}
              className="group rounded-3xl border border-[#E4E4ED] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-[#1E293B]/10 p-3 text-[#1E293B]">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#94A3B8]">
                    #{material.id}
                  </p>
                  <h2 className="text-2xl font-semibold text-[#1E293B]">
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
              <div className="mt-6 inline-flex items-center gap-2 text-[#1BA5A5] font-semibold">
                <Zap className="h-4 w-4" />
                Masuk Arena
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
