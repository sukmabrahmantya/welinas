"use client";

import { useMemo, useState } from "react";
import {
  Edit3,
  Trash2,
  X,
  AlertTriangle,
  Camera,
  UploadCloud,
} from "lucide-react";
import { MATERI_SASTRA } from "@/data/materi";

type HistoryItem = (typeof MATERI_SASTRA)[number];

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>(MATERI_SASTRA);
  const [detailItem, setDetailItem] = useState<HistoryItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<HistoryItem | null>(null);

  const hasItems = useMemo(() => items.length > 0, [items]);

  const handleOpenDetail = (item: HistoryItem) => {
    setDetailItem(item);
  };

  const handleCloseDetail = () => {
    setDetailItem(null);
  };

  const handleAskDelete = (item: HistoryItem) => {
    setDeleteTarget(item);
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((it) => it.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="flex h-full flex-col gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
      <div className="space-y-3">
        <p className="inline-flex items-center justify-center rounded-full bg-[#F3E2B8] border border-brand-gold/50 px-4 py-1 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#6B7280]">
          Riwayat Kata Welinas
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#1E293B]">
          Kata yang Pernah Kamu Simpan
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280] max-w-3xl">
          Di sini kamu bisa melihat kembali kata, frasa, atau peribahasa yang
          pernah kamu pilih dari fitur kamera & upload gambar. Nantinya, setiap
          entri akan menyimpan makna umum, contoh penggunaan, dan konteks
          lengkap sehingga mudah kamu kunjungi lagi.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1">
        {!hasItems ? (
          <div className="col-span-full w-full rounded-2xl sm:rounded-[28px] border border-dashed border-[#E2D4BB] bg-[#FDF5E7]/80 p-8 text-center text-[#6B7280]">
            Belum ada riwayat tersimpan.
            <br />
            Simpan kata dari hasil kamera atau upload gambar untuk muncul di
            halaman ini.
          </div>
        ) : (
          items.map((item, index) => {
            const isCamera = index % 2 === 0;
            const sourceLabel = isCamera ? "Kamera" : "Upload Gambar";

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleOpenDetail(item)}
                className="group relative w-full rounded-2xl sm:rounded-[28px] border border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(247,234,208,0.95))] p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:border-brand-gold cursor-pointer overflow-hidden"
              >
                <div className="pointer-events-none absolute bottom-[-25%] right-[2%]">
                  {isCamera ? (
                    <Camera className="h-24 w-24 sm:h-32 sm:w-32 text-brand-gold/10" />
                  ) : (
                    <UploadCloud className="h-24 w-24 sm:h-32 sm:w-32 text-[#1BA5A5]/10" />
                  )}
                </div>

                <div className="relative flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold/16 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#1E293B] border border-brand-gold/40">
                      Disimpan dari {sourceLabel}
                    </span>
                    <h3 className="text-2xl font-semibold text-[#1E293B] mt-1">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-full border border-transparent p-2 text-[#9CA3AF] cursor-not-allowed"
                        title="Fitur edit segera hadir"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAskDelete(item);
                        }}
                        className="rounded-full border border-[#F97362]/40 p-2 text-[#F97362] hover:bg-[#FFF1ED] transition"
                        title="Hapus dari riwayat"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      {detailItem && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl sm:rounded-[28px] border border border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(243,232,217,0.96))] shadow-2xl p-6 sm:p-8 relative">
            <button
              type="button"
              onClick={handleCloseDetail}
              className="absolute right-4 top-4 rounded-full p-2 text-[#6B7280] hover:bg-white/60 transition"
              aria-label="Tutup"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-2 mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]">
                Detail Kata (Coming Soon)
              </p>
              <h2 className="text-2xl font-semibold text-[#1E293B]">
                {detailItem.title}
              </h2>
            </div>

            <div className="rounded-2xl border border-dashed border-[#E2D4BB] bg-[#FDF5E7] px-4 py-6 text-center text-sm text-[#6B7280]">
              Konten detail untuk kata ini akan ditampilkan di sini.
              <br />
              Misalnya: makna umum, contoh kalimat, asal-usul, dan catatan
              tambahan dari hasil analisis OCR.
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleCloseDetail}
                className="rounded-2xl border border-[#D4D4D8] px-4 py-2 text-sm font-medium text-[#1F2937] hover:bg-white/60 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl sm:rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.98),_rgba(253,245,231,0.98))] shadow-2xl border border-[#E2D4BB] p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-full bg-[#FEF2F2] p-2 text-[#DC2626]">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-[#111827]">
                  Hapus dari riwayat?
                </h2>
                <p className="text-sm text-[#6B7280]">
                  Kata{" "}
                  <span className="font-semibold">“{deleteTarget.title}”</span>{" "}
                  akan dihapus dari riwayat tersimpan. Tindakan ini tidak dapat
                  dibatalkan.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="rounded-2xl border border-[#D4D4D8] px-4 py-2 text-sm font-medium text-[#1F2937] hover:bg-white/60 transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-2xl bg-[#DC2626] px-4 py-2 text-sm font-medium text-white hover:bg-[#B91C1C] transition"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
