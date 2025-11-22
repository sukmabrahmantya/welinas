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
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
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
          className="w-full rounded-2xl border border-[#D4D4D8] bg-white/80 py-3 pl-12 pr-4 text-base text-[#111827] placeholder:text-[#94A3B8] focus:border-[#1BA5A5] focus:ring-2 focus:ring-[#1BA5A5]/20 outline-none transition"
        />
      </label>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredMaterials.length === 0 ? (
          <div className="col-span-full rounded-3xl border border-dashed border-[#D4D4D8] bg-white/70 p-12 text-center text-[#6B7280]">
            Tidak ada materi yang sesuai.
          </div>
        ) : (
          filteredMaterials.map((material) => (
            <Link
              key={material.id}
              href={`/dashboard/quiz/belajar/${material.id}/level/1`}
              className="group rounded-3xl border border-[#E4E4ED] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-[#1E293B]/10 p-3 text-[#1E293B]">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs tracking-widest text-[#94A3B8]">
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
