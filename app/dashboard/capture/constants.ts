export type Topic = {
  key: string;
  label: string;
  description: string;
};

export type Detail = {
  key: string;
  label: string;
  description: string;
};

export type ActivePanel =
  | { type: "topic"; key: string }
  | { type: "detail"; key: string };

export const LEFT_TOPICS: Topic[] = [
  {
    key: "origin",
    label: "Asal Usul",
    description:
      "Kata ini berakar dari bahasa Melayu klasik yang sering muncul dalam sastra lisan. Penggunaannya menyiratkan puitika alam yang sejak lama hidup di Nusantara.",
  },
  {
    key: "function",
    label: "Fungsi & Kelas Kata",
    description:
      "Kelas kata adjektiva yang digunakan untuk menekankan keadaan atau atmosfer. Dalam konteks puisi, berfungsi sebagai penguat suasana dan ritme.",
  },
  {
    key: "usage",
    label: "Penggunaan dalam Konteks",
    description:
      "Sering hadir dalam karya tematik hujan, kerinduan, atau ketabahan. Penggunaan modernnya merambah narasi prosa maupun lirik lagu.",
  },
  {
    key: "examples",
    label: "Contoh Kalimat",
    description:
      "“Hujan Juni menyimpan rahasia di setiap rintik.” / “Ia menunggu seperti hujan bulan Juni: tabah tapi sunyi.”",
  },
];

export const RIGHT_DETAILS: Detail[] = [
  {
    key: "meaning",
    label: "Makna",
    description: "Gambaran ketabahan dan kesunyian yang melembutkan suasana.",
  },
  {
    key: "summary",
    label: "Penjelasan Singkat",
    description:
      "Ungkapan yang mempersonifikasikan hujan sebagai entitas yang sabar dan penuh rahasia.",
  },
  {
    key: "spelling",
    label: "Eja Kata",
    description: "hu·jan bu·lan ju·ni",
  },
  {
    key: "synonym",
    label: "Sinonim / Antonim",
    description: "Sinonim: rintik abadi · Antonim: panas kemarau",
  },
];

export function formatEjaKata(ejaKata?: string | null): string {
  if (!ejaKata) return "";

  return ejaKata
    .split("·")
    .map((part) => part.trim())
    .join("  •  ");
}
