"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";

import { MATERI_SASTRA } from "@/data/materi";

export default function SastraPage() {
  const [query, setQuery] = useState("");

  const filteredMateri = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return MATERI_SASTRA;

    return MATERI_SASTRA.filter(
      ({ id, title }) =>
        id.toLowerCase().includes(term) || title.toLowerCase().includes(term)
    );
  }, [query]);

  return (
    <div className="flex h-full flex-col gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-widest text-[#6B7280]">
          Ruang Sastra Welinas
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#1E293B]">
          Jelajahi Prosa, Puisi, & Cerpen
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280] max-w-3xl">
          Temukan penjelasan singkat, makna umum, sejarah, dan kegunaan setiap
          bentuk sastra. Mulai dari dasar, pelan-pelan, tapi tetap menyenangkan
          untuk dipelajari.
        </p>
      </div>

      <label className="relative block">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94A3B8]" />
        <input
          type="search"
          placeholder="Cari materi berdasarkan judul"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-2xl border border-[#D4D4D8] bg-white/80 py-3 pl-12 pr-4 text-base text-[#111827] placeholder:text-[#94A3B8] focus:border-[#1BA5A5] focus:ring-2 focus:ring-[#1BA5A5]/20 outline-none transition"
        />
      </label>

      <div className="grid gap-4 grid-cols-1">
        {filteredMateri.length === 0 ? (
          <div className="col-span-full w-full rounded-3xl border border-dashed border-[#D4D4D8] bg-white/80 p-8 text-center text-[#6B7280]">
            Tidak ada data yang sesuai.
          </div>
        ) : (
          filteredMateri.map((materi) => (
            <Link
              key={materi.id}
              href={`/dashboard/sastra/${materi.id}`}
              className="group rounded-3xl border border-[#E4E4ED] bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="px-3 py-1.5 rounded-full bg-brand-gold/30 text-[10px] font-semibold uppercase tracking-wide text-primary">
                    #{materi.id}
                  </span>
                  <h3 className="text-2xl font-semibold text-[#1E293B] mt-1">
                    {materi.title}
                  </h3>
                </div>
                <div className="rounded-full border border-[#E4E4ED] p-2 text-[#1E293B] transition group-hover:bg-[#1E293B] group-hover:text-white">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#475569] line-clamp-1">
                {materi.maknaUmum}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
