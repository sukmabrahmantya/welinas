"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Pencil,
  Search,
  Star,
  Trash2,
  UploadCloud,
} from "lucide-react";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  useDeleteFavorite,
  useFavorites,
  useUpdateFavorite,
} from "@/hooks/useFavorites";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/Input";
import { WordAnalysisModal } from "@/app/dashboard/capture/WordAnalysisModal";
import { LEFT_TOPICS, RIGHT_DETAILS } from "@/app/dashboard/capture/constants";
import { useWordAnalysisModal } from "@/hooks/useWordAnalysisModal";

export default function HistoryPage() {
  const { data: currentUser } = useCurrentUser();
  const {
    selectedWord,
    isModalOpen,
    openModal,
    closeModal,
    activePanel,
    setActivePanel,
    isWordLoading,
    wordError,
    panelContent,
  } = useWordAnalysisModal();
  const userId = currentUser?.id ?? null;

  const { data: favorites = [], isLoading } = useFavorites(userId);
  const updateFavorite = useUpdateFavorite();
  const deleteFavorite = useDeleteFavorite();

  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const hasItems = useMemo(() => favorites.length > 0, [favorites]);
  const filteredFavorites = useMemo(() => {
    if (!searchTerm.trim()) return favorites;
    return favorites.filter((fav) =>
      fav.word.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [favorites, searchTerm]);

  const handleEdit = (favoriteId: string) => {
    const item = favorites.find((fav) => fav.id === favoriteId);
    if (!item) return;
    setEditTarget(item.id);
    setEditValue(item.word);
    setError(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget || !userId) return;
    deleteFavorite.mutate({ id: deleteTarget, userId });
    setDeleteTarget(null);
  };

  const handleOpenDetail = (word: string) => {
    openModal(word);
  };

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!editTarget || !userId || !editValue.trim()) {
      setError("Kata tidak boleh kosong.");
      return;
    }
    updateFavorite.mutate(
      {
        id: editTarget,
        word: editValue.trim(),
        userId,
      },
      {
        onSuccess: () => {
          setEditTarget(null);
          setEditValue("");
        },
      }
    );
  };

  return (
    <div className="flex h-full flex-col gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
      <div className="space-y-3">
        <p className="inline-flex items-center justify-center rounded-full bg-[#F3E2B8] border border-brand-gold/50 px-4 py-1 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#6B7280]">
          Favorit Kata Welinas
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#1E293B]">
          Kata yang Kamu Simpan
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280] max-w-3xl">
          Simpan kata, frasa, atau peribahasa favorit hasil dari Upload atau
          Kamera. Daftar di bawah ini membantu kamu menelusuri ulang kata yang
          pernah penting bagimu.
        </p>
      </div>

      <label className="relative block">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94A3B8]" />
        <input
          type="search"
          placeholder="Cari Kata Favorit"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-full rounded-2xl border border-[#E2D4BB] bg-[#FDF5E7]/90 py-3 pl-12 pr-4 text-base text-[#111827] placeholder:text-[#94A3B8] focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25 outline-none transition"
        />
      </label>

      <div className="grid gap-4 grid-cols-1">
        {!isLoading && !hasItems ? (
          <div className="col-span-full w-full rounded-2xl sm:rounded-[28px] border border-dashed border-[#E2D4BB] bg-[#FDF5E7]/80 p-8 text-center text-[#6B7280]">
            Belum ada kata favorit yang tersimpan. Simpan kata dari analisis
            kata untuk muncul di sini.
          </div>
        ) : (
          filteredFavorites.map((item, index) => {
            const sourceLabel =
              new Date(item.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }) ?? "OCR";

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleOpenDetail(item.word)}
                className="group relative w-full rounded-2xl sm:rounded-[28px] border border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(247,234,208,0.95))] p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:border-brand-gold cursor-pointer overflow-hidden"
              >
                <div className="pointer-events-none absolute bottom-[-20%] right-[-5%]">
                  <Star className="h-24 w-24 sm:h-32 sm:w-32 text-brand-gold/10" />
                </div>

                <div className="relative flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold/16 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#1E293B] border border-brand-gold/40">
                      Disimpan {sourceLabel}
                    </span>
                    <h3 className="text-2xl font-semibold text-[#1E293B] mt-1">
                      {item.word}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(item.id);
                      }}
                      className="rounded-full border border-[#FDE68A] p-2 text-[#B45309] hover:bg-[#FFFBEB] transition"
                      title="Edit kata favorit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTarget(item.id);
                      }}
                      className="rounded-full border border-[#F97362]/40 p-2 text-[#F97362] hover:bg-[#FFF1ED] transition"
                      title="Hapus kata ini"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl sm:rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.98),_rgba(253,245,231,0.98))] shadow-2xl border border-[#E2D4BB] p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-full bg-[#FEF2F2] p-2 text-[#dc2626]">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-[#111827]">
                  Hapus kata ini?
                </h2>
                <p className="text-sm text-[#6B7280]">
                  Kata{" "}
                  <span className="font-semibold">
                    “{favorites.find((fav) => fav.id === deleteTarget)?.word}”
                  </span>{" "}
                  akan dihapus dari daftar favoritmu.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleteTarget(null)}>
                Batal
              </Button>
              <Button
                onClick={handleDelete}
                className="bg-[#dc2626] hover:bg-[#b91c1c]"
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}

      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <form
            onSubmit={handleEditSubmit}
            className="w-full max-w-md rounded-2xl sm:rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.98),_rgba(253,245,231,0.98))] shadow-2xl border border-[#E2D4BB] p-6 sm:p-8 space-y-6"

            // className="w-full max-w-md rounded-2xl sm:rounded-[28px] bg-white shadow-2xl border border-[#E2D4BB] p-6 sm:p-8 space-y-4"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]">
                Edit Kata Favorit
              </p>
              <h2 className="text-xl font-semibold text-[#1E293B] mt-1">
                Ubah kata yang kamu simpan
              </h2>
            </div>

            <Input
              label="Kata"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              required
            />

            {error && (
              <p className="text-sm text-[#F97362] bg-[#FEE2E2] border border-[#FCA5A5] rounded-xl px-4 py-2">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditTarget(null);
                  setEditValue("");
                  setError(null);
                }}
              >
                Batal
              </Button>
              <Button type="submit" className="bg-[#1E293B] text-white">
                Simpan
              </Button>
            </div>
          </form>
        </div>
      )}

      {isModalOpen && selectedWord && (
        <WordAnalysisModal
          selectedWord={selectedWord}
          onClose={closeModal}
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          isWordLoading={isWordLoading}
          wordError={wordError}
          panelContent={panelContent}
          leftTopics={LEFT_TOPICS}
          rightDetails={RIGHT_DETAILS}
          // Favorites tidak bisa ditambah dari history, hanya view
        />
      )}
    </div>
  );
}
