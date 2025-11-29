"use client";

import Link from "next/link";
import { BookOpenCheck, Gamepad2 } from "lucide-react";

const modes = [
  {
    slug: "belajar",
    title: "Mode Belajar",
    description:
      "Pelajari materi dengan ritme santai. Pilih level, isi jawaban secara manual, dan cek pemahamanmu.",
    icon: BookOpenCheck,
    href: "/dashboard/quiz/belajar",
  },
  {
    slug: "game",
    title: "Mode Game · Shooting",
    description:
      "Mainkan Shooting Game dengan HP dan skor. Soal acak dan tempo cepat akan menguji fokusmu.",
    icon: Gamepad2,
    href: "/dashboard/quiz/game",
  },
];

export default function QuizHomePage() {
  return (
    <div className="flex h-full flex-col gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full lg:h-[calc(100vh-4rem)]">
      <div className="space-y-3 text-center">
        <p className="inline-flex items-center justify-center rounded-full bg-[#F3E2B8] border border-brand-gold/50 px-4 py-1 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#6B7280]">
          Welinas Quiz Center
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#1E293B]">
          Pilih Mode Latihanmu
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280] max-w-3xl mx-auto">
          Pilih Mode Belajar untuk mendalami materi per level atau coba Mode
          Game bertempo cepat dengan HP dan skor.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const content = (
            <div
              className="
                h-full rounded-2xl sm:rounded-[28px]
                border border-[#E2D4BB]
                p-8 shadow-sm
                bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(247,234,208,0.96))]
                transition
                hover:-translate-y-1
                hover:shadow-xl
                hover:border-brand-gold
              "
            >
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-brand-gold/20 p-4 text-[#1E293B] border border-brand-gold/40">
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-[#1E293B]">
                    {mode.title}
                  </h2>
                  <p className="text-sm text-[#6B7280]">#{mode.slug}</p>
                </div>
              </div>
              <p className="mt-6 text-[#475569] leading-relaxed">
                {mode.description}
              </p>
              <span className="mt-8 inline-flex items-center text-brand-gold font-semibold">
                Mulai sekarang →
              </span>
            </div>
          );

          return (
            <Link key={mode.slug} href={mode.href} className="block h-full">
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
