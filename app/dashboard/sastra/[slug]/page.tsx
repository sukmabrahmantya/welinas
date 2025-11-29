import Link from "next/link";
import { notFound } from "next/navigation";

import { SastraDetailContent } from "@/components/dashboard/SastraDetailContent";
import { MATERI_SASTRA } from "@/data/materi";
import { ChevronLeft } from "lucide-react";

type SastraDetailPageProps = {
  params: {
    slug: string;
  };
};

export default function SastraDetailPage({ params }: SastraDetailPageProps) {
  const materi = MATERI_SASTRA.find((item) => item.id === params.slug);

  if (!materi) {
    notFound();
  }

  const sections = [
    {
      key: "makna",
      label: "Makna Umum",
      content: materi.maknaUmum,
    },
    {
      key: "contoh",
      label: `Contoh ${materi.title}`,
      content: materi.contoh,
    },
    {
      key: "sejarah",
      label: `Sejarah Terbentuknya ${materi.title}`,
      content: materi.sejarahTerbentuk,
    },
    {
      key: "kegunaan",
      label: `Kegunaan ${materi.title}`,
      content: materi.kegunaan,
    },
  ];

  return (
    <div className="flex h-full flex-col gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
      <div className="flex flex-col gap-2">
        <Link
          href="/dashboard/sastra"
          className="flex items-center text-sm text-[#D9B15F] hover:text-[#b89245] transition w-fit"
        >
          <ChevronLeft />
          Kembali ke daftar materi
        </Link>
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#1E293B]">
            {materi.title}
          </h1>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <SastraDetailContent sections={sections} />
      </div>
    </div>
  );
}
