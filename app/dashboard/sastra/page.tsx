export default function SastraPage() {
  return (
    <div className="flex flex-col h-full justify-center text-center space-y-4 p-4">
      <div>
        <span className="px-4 py-1.5 rounded-full bg-[#F0F2F8] text-[#1E293B] text-sm font-medium">
          Sastra
        </span>
        <h2 className="mt-4 text-3xl font-semibold text-[#1E293B]">
          Kurasi Karya
        </h2>
      </div>
      <p className="text-[#6B7280] max-w-lg mx-auto">
        Halaman Sastra akan berisi puisi, prosa, dan artikel pilihan tim kurator
        Welinas. Konten penuh segera hadir agar kamu bisa mulai membaca lebih
        banyak karya.
      </p>
    </div>
  );
}
