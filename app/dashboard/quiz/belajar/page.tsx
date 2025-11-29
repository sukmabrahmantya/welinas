"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GraduationCap, Search } from "lucide-react";

import { QUIZ_MATERIALS } from "@/data/quiz";

export default function QuizBelajarListPage() {
  const [term, setTerm] = useState("");

  const filteredMaterials = useMemo(() => {
    const query = term.trim().toLowerCase();
    if (!query) return QUIZ_MATERIALS;

    return QUIZ_MATERIALS.filter(
      ({ id, title }) =>
        id.toLowerCase().includes(query) || title.toLowerCase().includes(query)
    );
  }, [term]);

  return (
    <div className="flex h-full flex-col gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
      <div className="space-y-3">
        <p className="inline-flex items-center justify-center rounded-full bg-[#F3E2B8] border border-[#D9B15F]/50 px-4 py-1 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#6B7280]">
          Mode Belajar
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#1E293B]">
          Pilih Materi Quiz
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280] max-w-3xl">
          Cari materi sesuai kebutuhanmu. Setiap materi memiliki 5 level dengan
          10 soal yang bisa kamu selesaikan secara bertahap.
        </p>
      </div>

      <label className="relative block">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94A3B8]" />
        <input
          type="search"
          placeholder="Cari berdasarkan judul"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          className="w-full rounded-2xl border border-[#E2D4BB] bg-[#FDF5E7]/90 py-3 pl-12 pr-4 text-base text-[#111827] placeholder:text-[#94A3B8] focus:border-[#D9B15F] focus:ring-2 focus:ring-[#D9B15F]/25 outline-none transition"
        />
      </label>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredMaterials.length === 0 ? (
          <div className="col-span-full rounded-2xl sm:rounded-[28px] border border-dashed border-[#E2D4BB] bg-[#FDF5E7]/85 p-12 text-center text-[#6B7280]">
            Tidak ada materi yang sesuai.
          </div>
        ) : (
          filteredMaterials.map((material) => (
            <Link
              key={material.id}
              href={`/dashboard/quiz/belajar/${material.id}/level/1`}
              className="group rounded-2xl sm:rounded-[28px] border border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,252,245,0.96),_rgba(247,234,208,0.96))] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:border-[#D9B15F]"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-[#D9B15F]/16 text-[#1E293B] p-3">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-[#9CA3AF] uppercase">
                    #{material.id.replace(/-/g, "_")}
                  </p>
                  <h2 className="text-2xl font-semibold text-[#1E293B]">
                    {material.title}
                  </h2>
                  <p className="text-sm text-[#6B7280] mt-1">
                    Tersedia {material.levels.length} level
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#475569]">
                {material.description}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
