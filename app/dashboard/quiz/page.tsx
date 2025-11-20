export default function QuizPage() {
  return (
    <div className="flex flex-col h-full justify-center text-center space-y-4 p-4">
      <div>
        <span className="px-4 py-1.5 rounded-full bg-[#F0F2F8] text-[#1E293B] text-sm font-medium">
          Quiz
        </span>
        <h2 className="mt-4 text-3xl font-semibold text-[#1E293B]">
          Tantangan Literasi
        </h2>
      </div>
      <p className="text-[#6B7280] max-w-lg mx-auto">
        Bagian Quiz akan menghadirkan pertanyaan pilihan ganda dan teka-teki
        seputar sastra. Fitur ini sedang disiapkan, nantikan segera!
      </p>
    </div>
  );
}
