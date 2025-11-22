// /data/quiz.ts

export type GradeLevel = "5_sd" | "6_sd" | "7_smp" | "8_smp";

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[]; // selalu 2 opsi
  correctAnswer: string;
};

export type QuizLevel = {
  level: number; // 1 - 10 (saat ini 1 - 5 terisi)
  questions: QuizQuestion[]; // 10 soal per level
};

export type QuizMaterial = {
  id: string;
  title: string;
  grade: GradeLevel;
  description: string;
  levels: QuizLevel[];
};

export const QUIZ_MATERIALS: QuizMaterial[] = [
  // =========================================================
  // 1. KATA BAKU – KELAS 5 SD
  // =========================================================
  {
    id: "kata-baku",
    title: "Kata Baku",
    grade: "5_sd",
    description:
      "Latihan membedakan penulisan kata baku dan tidak baku dalam bahasa Indonesia.",
    levels: [
      // ----- LEVEL 1 -----
      {
        level: 1,
        questions: [
          {
            id: "kata-baku-l1-q1",
            prompt: "Apa kata baku dari “memerhatikaan”?",
            options: ["Memperhatikan", "Memerhatikan"],
            correctAnswer: "Memerhatikan",
          },
          {
            id: "kata-baku-l1-q2",
            prompt: "Manakah penulisan kata baku yang benar?",
            options: ["Aktifitas", "Aktivitas"],
            correctAnswer: "Aktivitas",
          },
          {
            id: "kata-baku-l1-q3",
            prompt: "Penulisan kata baku untuk “kwalitas” yang tepat adalah ….",
            options: ["Kualitas", "Kwalitas"],
            correctAnswer: "Kualitas",
          },
          {
            id: "kata-baku-l1-q4",
            prompt: "Bentuk baku dari kata “antri” adalah ….",
            options: ["Antre", "Antri"],
            correctAnswer: "Antre",
          },
          {
            id: "kata-baku-l1-q5",
            prompt: "Penulisan kata baku untuk “ijazah” yang tepat adalah ….",
            options: ["Ijazah", "Ijasah"],
            correctAnswer: "Ijazah",
          },
          {
            id: "kata-baku-l1-q6",
            prompt: "Manakah bentuk baku dari “kwalifikasi”?",
            options: ["Kualifikasi", "Kwalifikasi"],
            correctAnswer: "Kualifikasi",
          },
          {
            id: "kata-baku-l1-q7",
            prompt: "Penulisan kata baku untuk “praktek” adalah ….",
            options: ["Praktek", "Praktik"],
            correctAnswer: "Praktik",
          },
          {
            id: "kata-baku-l1-q8",
            prompt: "Bentuk baku dari kata “apotik” adalah ….",
            options: ["Apotik", "Apotek"],
            correctAnswer: "Apotek",
          },
          {
            id: "kata-baku-l1-q9",
            prompt: "Yang merupakan kata baku adalah ….",
            options: ["Resiko", "Risiko"],
            correctAnswer: "Risiko",
          },
          {
            id: "kata-baku-l1-q10",
            prompt: "Penulisan kata baku untuk “kwalitas udara” adalah ….",
            options: ["Kualitas udara", "Kwalitas udara"],
            correctAnswer: "Kualitas udara",
          },
        ],
      },
      // ----- LEVEL 2 -----
      {
        level: 2,
        questions: [
          {
            id: "kata-baku-l2-q1",
            prompt: "Bentuk baku dari kata “sekedar” adalah ….",
            options: ["Sekadar", "Sekedar"],
            correctAnswer: "Sekadar",
          },
          {
            id: "kata-baku-l2-q2",
            prompt: "Penulisan baku dari “hutang” adalah ….",
            options: ["Utang", "Hutang"],
            correctAnswer: "Utang",
          },
          {
            id: "kata-baku-l2-q3",
            prompt: "Manakah kata yang baku?",
            options: ["Fakultas", "Fakulta"],
            correctAnswer: "Fakultas",
          },
          {
            id: "kata-baku-l2-q4",
            prompt: "Penulisan kata baku untuk “loket” adalah ….",
            options: ["Loket", "Loket"],
            correctAnswer: "Loket",
          },
          {
            id: "kata-baku-l2-q5",
            prompt: "Bentuk baku dari kata “ijin” adalah ….",
            options: ["Izin", "Ijin"],
            correctAnswer: "Izin",
          },
          {
            id: "kata-baku-l2-q6",
            prompt: "Penulisan kata baku untuk “assesmen” adalah ….",
            options: ["Asesmen", "Assesmen"],
            correctAnswer: "Asesmen",
          },
          {
            id: "kata-baku-l2-q7",
            prompt:
              "Bentuk baku dari kata “cenderung” yang sering salah tulis adalah ….",
            options: ["Cenderung", "Cendrung"],
            correctAnswer: "Cenderung",
          },
          {
            id: "kata-baku-l2-q8",
            prompt: "Manakah penulisan kata baku yang tepat?",
            options: ["Jemaat", "Jamaat"],
            correctAnswer: "Jemaat",
          },
          {
            id: "kata-baku-l2-q9",
            prompt: "Penulisan kata baku untuk “kwalitet” adalah ….",
            options: ["Kwalitet", "Kualitas"],
            correctAnswer: "Kualitas",
          },
          {
            id: "kata-baku-l2-q10",
            prompt: "Bentuk baku dari kata “cuma-cuma” adalah ….",
            options: ["Cuma-cuma", "Cuma cuma"],
            correctAnswer: "Cuma-cuma",
          },
        ],
      },
      // ----- LEVEL 3 -----
      {
        level: 3,
        questions: [
          {
            id: "kata-baku-l3-q1",
            prompt:
              "Penulisan kata baku untuk “nasihat” yang sering salah adalah ….",
            options: ["Nasehat", "Nasihat"],
            correctAnswer: "Nasihat",
          },
          {
            id: "kata-baku-l3-q2",
            prompt:
              "Bentuk baku dari kata “konsep” yang sering salah tulis adalah ….",
            options: ["Konsep", "Konsepp"],
            correctAnswer: "Konsep",
          },
          {
            id: "kata-baku-l3-q3",
            prompt: "Manakah kata baku yang tepat?",
            options: ["Aktif", "Aktip"],
            correctAnswer: "Aktif",
          },
          {
            id: "kata-baku-l3-q4",
            prompt: "Penulisan baku untuk “resiko kerja” adalah ….",
            options: ["Risiko kerja", "Resiko kerja"],
            correctAnswer: "Risiko kerja",
          },
          {
            id: "kata-baku-l3-q5",
            prompt: "Bentuk baku dari kata “kwintal” adalah ….",
            options: ["Kuintal", "Kwintal"],
            correctAnswer: "Kuintal",
          },
          {
            id: "kata-baku-l3-q6",
            prompt: "Penulisan kata baku untuk “atlit” adalah ….",
            options: ["Atlet", "Atlit"],
            correctAnswer: "Atlet",
          },
          {
            id: "kata-baku-l3-q7",
            prompt: "Manakah penulisan kata baku yang benar?",
            options: ["Frekwensi", "Frekuensi"],
            correctAnswer: "Frekuensi",
          },
          {
            id: "kata-baku-l3-q8",
            prompt: "Bentuk baku dari kata “kwalifikasi akademik” adalah ….",
            options: ["Kualifikasi akademik", "Kwalifikasi akademik"],
            correctAnswer: "Kualifikasi akademik",
          },
          {
            id: "kata-baku-l3-q9",
            prompt: "Penulisan baku untuk “sistim” adalah ….",
            options: ["Sistem", "Sistim"],
            correctAnswer: "Sistem",
          },
          {
            id: "kata-baku-l3-q10",
            prompt: "Manakah kata baku yang tepat?",
            options: ["Analisis", "Analisa"],
            correctAnswer: "Analisis",
          },
        ],
      },
      // ----- LEVEL 4 -----
      {
        level: 4,
        questions: [
          {
            id: "kata-baku-l4-q1",
            prompt: "Bentuk baku dari kata “fasien” adalah ….",
            options: ["Pasien", "Fasien"],
            correctAnswer: "Pasien",
          },
          {
            id: "kata-baku-l4-q2",
            prompt: "Penulisan baku untuk “cenderamata” adalah ….",
            options: ["Cenderamata", "Cenderamata"],
            correctAnswer: "Cenderamata",
          },
          {
            id: "kata-baku-l4-q3",
            prompt: "Manakah penulisan kata baku yang tepat?",
            options: ["Objek", "Obyek"],
            correctAnswer: "Objek",
          },
          {
            id: "kata-baku-l4-q4",
            prompt: "Bentuk baku dari “karir” adalah ….",
            options: ["Karier", "Karir"],
            correctAnswer: "Karier",
          },
          {
            id: "kata-baku-l4-q5",
            prompt: "Penulisan baku untuk “sekertaris” adalah ….",
            options: ["Sekretaris", "Sekertaris"],
            correctAnswer: "Sekretaris",
          },
          {
            id: "kata-baku-l4-q6",
            prompt: "Manakah kata baku yang benar?",
            options: ["Komplit", "Lengkap"],
            correctAnswer: "Lengkap",
          },
          {
            id: "kata-baku-l4-q7",
            prompt: "Penulisan baku untuk “kwalitas udara bersih” adalah ….",
            options: ["Kualitas udara bersih", "Kwalitas udara bersih"],
            correctAnswer: "Kualitas udara bersih",
          },
          {
            id: "kata-baku-l4-q8",
            prompt: "Bentuk baku dari kata “hobby” adalah ….",
            options: ["Hobi", "Hobby"],
            correctAnswer: "Hobi",
          },
          {
            id: "kata-baku-l4-q9",
            prompt: "Manakah kata baku yang tepat?",
            options: ["Atasan langsung", "Atasan lansung"],
            correctAnswer: "Atasan langsung",
          },
          {
            id: "kata-baku-l4-q10",
            prompt: "Penulisan kata baku untuk “kwalitas tidur” adalah ….",
            options: ["Kualitas tidur", "Kwalitas tidur"],
            correctAnswer: "Kualitas tidur",
          },
        ],
      },
      // ----- LEVEL 5 -----
      {
        level: 5,
        questions: [
          {
            id: "kata-baku-l5-q1",
            prompt: "Bentuk baku dari kata “cengkeh” adalah ….",
            options: ["Cengkih", "Cengkeh"],
            correctAnswer: "Cengkih",
          },
          {
            id: "kata-baku-l5-q2",
            prompt: "Manakah penulisan kata baku yang benar?",
            options: ["Subyek", "Subjek"],
            correctAnswer: "Subjek",
          },
          {
            id: "kata-baku-l5-q3",
            prompt: "Penulisan baku untuk “tehnik” adalah ….",
            options: ["Teknik", "Tehnik"],
            correctAnswer: "Teknik",
          },
          {
            id: "kata-baku-l5-q4",
            prompt: "Bentuk baku dari kata “praktek dokter” adalah ….",
            options: ["Praktik dokter", "Praktek dokter"],
            correctAnswer: "Praktik dokter",
          },
          {
            id: "kata-baku-l5-q5",
            prompt: "Manakah kata baku yang tepat?",
            options: ["Silakan", "Silahkan"],
            correctAnswer: "Silakan",
          },
          {
            id: "kata-baku-l5-q6",
            prompt: "Penulisan baku untuk “cendikiawan” adalah ….",
            options: ["Cendekiawan", "Cendikiawan"],
            correctAnswer: "Cendekiawan",
          },
          {
            id: "kata-baku-l5-q7",
            prompt: "Bentuk baku dari kata “kwalifikasi guru” adalah ….",
            options: ["Kualifikasi guru", "Kwalifikasi guru"],
            correctAnswer: "Kualifikasi guru",
          },
          {
            id: "kata-baku-l5-q8",
            prompt: "Manakah kata baku yang benar?",
            options: ["Resmi", "Rasmi"],
            correctAnswer: "Resmi",
          },
          {
            id: "kata-baku-l5-q9",
            prompt: "Penulisan baku untuk “atlit nasional” adalah ….",
            options: ["Atlet nasional", "Atlit nasional"],
            correctAnswer: "Atlet nasional",
          },
          {
            id: "kata-baku-l5-q10",
            prompt: "Bentuk baku dari kata “kwalitas layanan” adalah ….",
            options: ["Kualitas layanan", "Kwalitas layanan"],
            correctAnswer: "Kualitas layanan",
          },
        ],
      },
    ],
  },

  // =========================================================
  // 2. TANDA BACA DASAR – KELAS 6 SD
  // =========================================================
  {
    id: "tanda-baca-dasar",
    title: "Tanda Baca Dasar",
    grade: "6_sd",
    description:
      "Mengenal penggunaan tanda baca seperti titik, koma, tanda tanya, dan tanda seru dalam kalimat sederhana.",
    levels: [
      // ----- LEVEL 1 -----
      {
        level: 1,
        questions: [
          {
            id: "tbd-l1-q1",
            prompt:
              "Kalimat “Di mana rumahmu” seharusnya diakhiri dengan tanda baca ….",
            options: ["Tanda tanya (?)", "Tanda seru (!)"],
            correctAnswer: "Tanda tanya (?)",
          },
          {
            id: "tbd-l1-q2",
            prompt: "Kalimat perintah biasanya diakhiri dengan tanda baca ….",
            options: ["Titik (.)", "Tanda seru (!)"],
            correctAnswer: "Tanda seru (!)",
          },
          {
            id: "tbd-l1-q3",
            prompt:
              "Untuk memisahkan dua klausa dalam satu kalimat, tanda baca yang sering digunakan adalah ….",
            options: ["Koma (,)", "Tanda tanya (?)"],
            correctAnswer: "Koma (,)",
          },
          {
            id: "tbd-l1-q4",
            prompt:
              "Kalimat “Ayo belajar bersama” paling tepat diakhiri dengan ….",
            options: ["Tanda seru (!)", "Tanda tanya (?)"],
            correctAnswer: "Tanda seru (!)",
          },
          {
            id: "tbd-l1-q5",
            prompt:
              "Kalimat berita atau pernyataan umumnya diakhiri dengan tanda ….",
            options: ["Titik (.)", "Tanda seru (!)"],
            correctAnswer: "Titik (.)",
          },
          {
            id: "tbd-l1-q6",
            prompt:
              "Tanda baca yang tepat untuk mengakhiri kalimat “Kamu dari mana” adalah ….",
            options: ["?", "."],
            correctAnswer: "?",
          },
          {
            id: "tbd-l1-q7",
            prompt:
              "Pada kalimat sapaan “Selamat pagi, Ibu.” tanda koma digunakan untuk ….",
            options: [
              "Memisahkan sapaan dengan nama orang",
              "Mengakhiri kalimat",
            ],
            correctAnswer: "Memisahkan sapaan dengan nama orang",
          },
          {
            id: "tbd-l1-q8",
            prompt:
              "Kalimat “Hati-hati di jalan” sebaiknya diakhiri dengan tanda ….",
            options: ["Tanda seru (!)", "Titik (.)"],
            correctAnswer: "Tanda seru (!)",
          },
          {
            id: "tbd-l1-q9",
            prompt:
              "Tanda baca yang tepat setelah kata “Ya” pada kalimat “Ya, saya mengerti” adalah ….",
            options: ["Koma (,)", "Titik (.)"],
            correctAnswer: "Koma (,)",
          },
          {
            id: "tbd-l1-q10",
            prompt:
              "Kalimat tanya “Kapan ulangan matematika” harus diakhiri dengan ….",
            options: ["Tanda tanya (?)", "Titik (.)"],
            correctAnswer: "Tanda tanya (?)",
          },
        ],
      },
      // ----- LEVEL 2 -----
      {
        level: 2,
        questions: [
          {
            id: "tbd-l2-q1",
            prompt:
              "Tanda baca yang digunakan untuk memisahkan unsur dalam daftar adalah ….",
            options: ["Koma (,)", "Tanda seru (!)"],
            correctAnswer: "Koma (,)",
          },
          {
            id: "tbd-l2-q2",
            prompt:
              "Pada kalimat “Ibu membeli apel, jeruk, dan anggur.” tanda koma dipakai untuk ….",
            options: [
              "Memisahkan unsur-unsur dalam sebuah perincian",
              "Mengakhiri kalimat",
            ],
            correctAnswer: "Memisahkan unsur-unsur dalam sebuah perincian",
          },
          {
            id: "tbd-l2-q3",
            prompt:
              "Kalimat seru yang menunjukkan rasa kagum biasanya diakhiri dengan ….",
            options: ["Tanda seru (!)", "Tanda tanya (?)"],
            correctAnswer: "Tanda seru (!)",
          },
          {
            id: "tbd-l2-q4",
            prompt:
              "Tanda baca yang tepat setelah kata “Namun” pada awal kalimat adalah ….",
            options: ["Koma (,)", "Titik dua (:)"],
            correctAnswer: "Koma (,)",
          },
          {
            id: "tbd-l2-q5",
            prompt:
              "Kalimat “Dia tidak datang, karena sakit.” sebaiknya tanda koma ….",
            options: [
              "Dihapus karena tidak perlu",
              "Dibiarkan karena sudah benar",
            ],
            correctAnswer: "Dihapus karena tidak perlu",
          },
          {
            id: "tbd-l2-q6",
            prompt:
              "Tanda baca yang tepat untuk memisahkan antara jam dan menit adalah ….",
            options: ["Titik dua (:)", "Koma (,)"],
            correctAnswer: "Titik dua (:)",
          },
          {
            id: "tbd-l2-q7",
            prompt:
              "Pada kalimat “Dia berkata, ‘Aku akan datang besok.’” tanda petik tunggal digunakan untuk ….",
            options: [
              "Menandai kutipan langsung di dalam kutipan",
              "Menandai judul buku",
            ],
            correctAnswer: "Menandai kutipan langsung di dalam kutipan",
          },
          {
            id: "tbd-l2-q8",
            prompt:
              "Kalimat seru “Betapa indahnya pemandangan ini” sebaiknya menggunakan tanda baca ….",
            options: ["!", "."],
            correctAnswer: "!",
          },
          {
            id: "tbd-l2-q9",
            prompt:
              "Tanda baca yang tepat setelah salam penutup surat adalah ….",
            options: ["Koma (,)", "Titik (.)"],
            correctAnswer: "Koma (,)",
          },
          {
            id: "tbd-l2-q10",
            prompt:
              "Pada kalimat “Andi, Budi, dan Citra belajar bersama.” tanda koma digunakan untuk ….",
            options: [
              "Memisahkan nama orang dalam satu kelompok",
              "Mengakhiri kalimat",
            ],
            correctAnswer: "Memisahkan nama orang dalam satu kelompok",
          },
        ],
      },
      // ----- LEVEL 3 -----
      {
        level: 3,
        questions: [
          {
            id: "tbd-l3-q1",
            prompt:
              "Tanda baca yang dipakai untuk mengakhiri singkatan gelar (misalnya Dr) adalah ….",
            options: ["Titik (.)", "Koma (,)"],
            correctAnswer: "Titik (.)",
          },
          {
            id: "tbd-l3-q2",
            prompt:
              "Pada kalimat “Jakarta, 10 Mei 2025” tanda koma digunakan untuk ….",
            options: [
              "Memisahkan nama tempat dan tanggal",
              "Mengakhiri baris surat",
            ],
            correctAnswer: "Memisahkan nama tempat dan tanggal",
          },
          {
            id: "tbd-l3-q3",
            prompt:
              "Tanda baca yang tepat setelah kata “Yth.” dalam surat resmi adalah ….",
            options: ["Titik (.)", "Koma (,)"],
            correctAnswer: "Titik (.)",
          },
          {
            id: "tbd-l3-q4",
            prompt:
              "Untuk menandai dialog dalam teks percakapan, tanda baca yang digunakan adalah ….",
            options: ['Tanda petik ganda ("")', "Tanda tanya (?)"],
            correctAnswer: 'Tanda petik ganda ("" )',
          },
          {
            id: "tbd-l3-q5",
            prompt:
              "Kalimat “Dia berkata: saya akan belajar sungguh-sungguh.” sebaiknya tanda baca titik dua ….",
            options: [
              "Dihapus karena tidak tepat",
              "Dipertahankan karena sudah benar",
            ],
            correctAnswer: "Dihapus karena tidak tepat",
          },
          {
            id: "tbd-l3-q6",
            prompt:
              "Tanda baca yang tepat setelah “Contoh” pada kalimat penjelasan adalah ….",
            options: ["Titik dua (:)", "Titik (.)"],
            correctAnswer: "Titik dua (:)",
          },
          {
            id: "tbd-l3-q7",
            prompt: "Tanda kurung ( ) digunakan untuk ….",
            options: ["Menjelaskan keterangan tambahan", "Mengakhiri kalimat"],
            correctAnswer: "Menjelaskan keterangan tambahan",
          },
          {
            id: "tbd-l3-q8",
            prompt:
              "Kalimat “Adik menangis, karena terjatuh.” sebaiknya tanda koma ….",
            options: ["Dihapus karena tidak perlu", "Tetap dipertahankan"],
            correctAnswer: "Dihapus karena tidak perlu",
          },
          {
            id: "tbd-l3-q9",
            prompt:
              "Tanda baca yang tepat untuk memisahkan judul buku dan subjudul adalah ….",
            options: ["Titik dua (:)", "Koma (,)"],
            correctAnswer: "Titik dua (:)",
          },
          {
            id: "tbd-l3-q10",
            prompt: "Kalimat “Wow, indah sekali!” menggunakan tanda baca ….",
            options: ["Tanda seru (!)", "Tanda tanya (?)"],
            correctAnswer: "Tanda seru (!)",
          },
        ],
      },
      // ----- LEVEL 4 -----
      {
        level: 4,
        questions: [
          {
            id: "tbd-l4-q1",
            prompt: "Tanda elipsis (…) digunakan untuk ….",
            options: [
              "Menunjukkan bagian yang dihilangkan",
              "Mengakhiri kalimat berita",
            ],
            correctAnswer: "Menunjukkan bagian yang dihilangkan",
          },
          {
            id: "tbd-l4-q2",
            prompt:
              "Dalam daftar pustaka, tanda baca yang memisahkan nama penulis dan tahun terbit adalah ….",
            options: ["Titik (.)", "Koma (,)"],
            correctAnswer: "Titik (.)",
          },
          {
            id: "tbd-l4-q3",
            prompt:
              "Kalimat “Kakak membeli buku, pensil, penghapus, dan penggaris.” menggunakan tanda koma untuk ….",
            options: [
              "Memisahkan unsur perincian",
              "Memisahkan subjek dan predikat",
            ],
            correctAnswer: "Memisahkan unsur perincian",
          },
          {
            id: "tbd-l4-q4",
            prompt: "Tanda seru (!) tidak tepat digunakan pada ….",
            options: ["Kalimat berita biasa", "Kalimat ajakan"],
            correctAnswer: "Kalimat berita biasa",
          },
          {
            id: "tbd-l4-q5",
            prompt: "Tanda tanya (?) tidak digunakan pada ….",
            options: ["Kalimat perintah", "Kalimat yang menanyakan sesuatu"],
            correctAnswer: "Kalimat perintah",
          },
          {
            id: "tbd-l4-q6",
            prompt:
              "Pada dialog, tanda baca sebelum tutup tanda petik ketika kalimat tanya adalah ….",
            options: ["Tanda tanya (?)", "Titik (.)"],
            correctAnswer: "Tanda tanya (?)",
          },
          {
            id: "tbd-l4-q7",
            prompt:
              "Kalimat “Ssst, jangan berisik.” menggunakan tanda baca khusus berupa ….",
            options: ["Koma (,)", "Titik (.)"],
            correctAnswer: "Koma (,)",
          },
          {
            id: "tbd-l4-q8",
            prompt: "Tanda petik tunggal sering digunakan untuk ….",
            options: ["Kutipan di dalam kutipan", "Mengakhiri paragraf"],
            correctAnswer: "Kutipan di dalam kutipan",
          },
          {
            id: "tbd-l4-q9",
            prompt:
              "Tanda baca yang memisahkan ribuan pada bilangan (misal 1.000) adalah ….",
            options: ["Titik (.)", "Koma (,)"],
            correctAnswer: "Titik (.)",
          },
          {
            id: "tbd-l4-q10",
            prompt:
              "Penulisan “Jakarta; kota metropolitan” seharusnya menggunakan tanda ….",
            options: ["Titik dua (:)", "Titik koma (;)"],
            correctAnswer: "Titik dua (:)",
          },
        ],
      },
      // ----- LEVEL 5 -----
      {
        level: 5,
        questions: [
          {
            id: "tbd-l5-q1",
            prompt:
              "Dalam dialog, kalimat yang mengiringi ujaran (seperti “kata Ibu”) biasanya diakhiri dengan … sebelum tanda petik penutup.",
            options: ["Koma (,)", "Titik (.)"],
            correctAnswer: "Koma (,)",
          },
          {
            id: "tbd-l5-q2",
            prompt:
              "Kalimat “Ayah berkata, ‘Belajarlah dengan sungguh-sungguh!’” menggunakan tanda seru di dalam ….",
            options: ["Tanda petik", "Tanda kurung"],
            correctAnswer: "Tanda petik",
          },
          {
            id: "tbd-l5-q3",
            prompt:
              "Tanda yang tepat untuk memisahkan jam dan menit pada penulisan waktu (misal pukul 07…30) adalah ….",
            options: ["Titik dua (:)", "Tanda hubung (-)"],
            correctAnswer: "Titik dua (:)",
          },
          {
            id: "tbd-l5-q4",
            prompt:
              "Penulisan singkatan bulan “Januari” yang benar dalam penanggalan adalah ….",
            options: ["Jan.", "Jn."],
            correctAnswer: "Jan.",
          },
          {
            id: "tbd-l5-q5",
            prompt:
              "Tanda baca yang benar setelah “Assalamu’alaikum” pada pesan singkat adalah ….",
            options: ["Koma (,)", "Titik (.)"],
            correctAnswer: "Koma (,)",
          },
          {
            id: "tbd-l5-q6",
            prompt: "Tanda koma tidak digunakan untuk memisahkan ….",
            options: [
              "Subjek dan predikat yang berurutan",
              "Unsur dalam perincian",
            ],
            correctAnswer: "Subjek dan predikat yang berurutan",
          },
          {
            id: "tbd-l5-q7",
            prompt:
              "Penulisan “Dia mengatakan bahwa, ia lelah.” seharusnya tanda koma ….",
            options: ["Dihapus", "Dipertahankan"],
            correctAnswer: "Dihapus",
          },
          {
            id: "tbd-l5-q8",
            prompt:
              "Tanda baca yang tepat untuk menandai judul artikel dalam teks adalah ….",
            options: ['Tanda petik ganda ("" )', "Tanda seru (!)"],
            correctAnswer: 'Tanda petik ganda ("" )',
          },
          {
            id: "tbd-l5-q9",
            prompt: "Tanda titik tidak digunakan setelah ….",
            options: ["Alamat pada kepala surat", "Akhir kalimat berita"],
            correctAnswer: "Alamat pada kepala surat",
          },
          {
            id: "tbd-l5-q10",
            prompt: "Tanda baca pada “Hore, kita juara!” berfungsi untuk ….",
            options: ["Menunjukkan kegembiraan", "Menandai pertanyaan"],
            correctAnswer: "Menunjukkan kegembiraan",
          },
        ],
      },
    ],
  },

  // =========================================================
  // 3. KALIMAT EFEKTIF – KELAS 7 SMP
  // =========================================================
  {
    id: "kalimat-efektif",
    title: "Kalimat Efektif",
    grade: "7_smp",
    description:
      "Melatih kemampuan menyusun kalimat yang jelas, tidak bertele-tele, dan mudah dipahami.",
    levels: [
      // ----- LEVEL 1 -----
      {
        level: 1,
        questions: [
          {
            id: "ke-l1-q1",
            prompt:
              "Manakah kalimat yang lebih efektif untuk menyatakan ajakan?",
            options: [
              "Mari kita bersama-sama untuk pergi ke perpustakaan.",
              "Mari kita pergi ke perpustakaan.",
            ],
            correctAnswer: "Mari kita pergi ke perpustakaan.",
          },
          {
            id: "ke-l1-q2",
            prompt:
              "Kalimat mana yang lebih efektif untuk menyatakan larangan?",
            options: [
              "Tidak dibolehkan untuk kamu membuang sampah sembarangan.",
              "Kamu dilarang membuang sampah sembarangan.",
            ],
            correctAnswer: "Kamu dilarang membuang sampah sembarangan.",
          },
          {
            id: "ke-l1-q3",
            prompt: "Kalimat efektif harus bersifat ….",
            options: ["Jelas dan tidak bertele-tele", "Panjang dan rumit"],
            correctAnswer: "Jelas dan tidak bertele-tele",
          },
          {
            id: "ke-l1-q4",
            prompt:
              "Kalimat “Saya sudah membaca buku itu kemarin” termasuk efektif karena ….",
            options: [
              "Subjek, predikat, dan objeknya jelas",
              "Menggunakan kata yang diulang-ulang",
            ],
            correctAnswer: "Subjek, predikat, dan objeknya jelas",
          },
          {
            id: "ke-l1-q5",
            prompt:
              "Manakah kalimat yang lebih efektif untuk menyampaikan informasi?",
            options: [
              "Di sekolah kami sedang diadakan perlombaan yang diikuti oleh seluruh siswa-siswi yang ada di sekolah kami.",
              "Di sekolah kami diadakan perlombaan yang diikuti seluruh siswa.",
            ],
            correctAnswer:
              "Di sekolah kami diadakan perlombaan yang diikuti seluruh siswa.",
          },
          {
            id: "ke-l1-q6",
            prompt: "Kalimat efektif biasanya memiliki ….",
            options: [
              "Susunan yang logis dan runtut",
              "Banyak kata sambung berulang",
            ],
            correctAnswer: "Susunan yang logis dan runtut",
          },
          {
            id: "ke-l1-q7",
            prompt:
              "Kalimat “Dia adalah seorang siswa yang rajin sekali belajar” dapat dipersingkat menjadi ….",
            options: [
              "Dia adalah siswa yang rajin.",
              "Dia seorang siswa yang rajin sekali belajar.",
            ],
            correctAnswer: "Dia adalah siswa yang rajin.",
          },
          {
            id: "ke-l1-q8",
            prompt: "Kalimat yang tidak efektif biasanya ….",
            options: [
              "Mengandung kata mubazir",
              "Memiliki subjek dan predikat jelas",
            ],
            correctAnswer: "Mengandung kata mubazir",
          },
          {
            id: "ke-l1-q9",
            prompt: "Manakah kalimat yang lebih efektif?",
            options: [
              "Para siswa-siswa diminta untuk berkumpul di aula.",
              "Para siswa diminta berkumpul di aula.",
            ],
            correctAnswer: "Para siswa diminta berkumpul di aula.",
          },
          {
            id: "ke-l1-q10",
            prompt:
              "Kalimat efektif cenderung menggunakan pilihan kata yang ….",
            options: ["Tepat dan sesuai konteks", "Asing dan sulit dimengerti"],
            correctAnswer: "Tepat dan sesuai konteks",
          },
        ],
      },
      // ----- LEVEL 2 -----
      {
        level: 2,
        questions: [
          {
            id: "ke-l2-q1",
            prompt:
              "Kalimat “Dengan adanya kegiatan ini dapat menambah wawasan siswa.” tidak efektif karena ….",
            options: ["Tidak memiliki subjek yang jelas", "Terlalu pendek"],
            correctAnswer: "Tidak memiliki subjek yang jelas",
          },
          {
            id: "ke-l2-q2",
            prompt:
              "Perbaikan kalimat efektif untuk “Dengan mengikuti lomba ini maka kemampuan menulis akan meningkat” adalah ….",
            options: [
              "Dengan mengikuti lomba ini, kemampuan menulis akan meningkat.",
              "Dengan mengikuti lomba ini maka kemampuan menulis akan meningkat.",
            ],
            correctAnswer:
              "Dengan mengikuti lomba ini, kemampuan menulis akan meningkat.",
          },
          {
            id: "ke-l2-q3",
            prompt:
              "Kalimat “Para guru-guru membimbing siswa dengan sabar” tidak efektif karena ….",
            options: ["Subjeknya ganda", "Tidak memiliki predikat"],
            correctAnswer: "Subjeknya ganda",
          },
          {
            id: "ke-l2-q4",
            prompt: "Manakah kalimat efektif berikut?",
            options: [
              "Mereka sedang pada waktu sekarang ini belajar di perpustakaan.",
              "Mereka sedang belajar di perpustakaan.",
            ],
            correctAnswer: "Mereka sedang belajar di perpustakaan.",
          },
          {
            id: "ke-l2-q5",
            prompt: "Kalimat efektif menghindari penggunaan kata ….",
            options: [
              "Yang berulang dan tidak perlu",
              "Yang jelas dan singkat",
            ],
            correctAnswer: "Yang berulang dan tidak perlu",
          },
          {
            id: "ke-l2-q6",
            prompt:
              "Perbaikan kalimat “Kami semua para siswa sangatlah senang sekali.” adalah ….",
            options: [
              "Kami sangat senang.",
              "Kami semua para siswa sangat senang sekali.",
            ],
            correctAnswer: "Kami sangat senang.",
          },
          {
            id: "ke-l2-q7",
            prompt:
              "Kalimat “Dalam rangka untuk meningkatkan kesehatan, maka sekolah mengadakan senam pagi.” tidak efektif karena ….",
            options: [
              "Menggunakan dua kata penghubung yang berlebihan",
              "Tidak ada objek",
            ],
            correctAnswer: "Menggunakan dua kata penghubung yang berlebihan",
          },
          {
            id: "ke-l2-q8",
            prompt: "Manakah kalimat yang efektif?",
            options: [
              "Karena dia sakit maka dia tidak masuk sekolah.",
              "Karena sakit, dia tidak masuk sekolah.",
            ],
            correctAnswer: "Karena sakit, dia tidak masuk sekolah.",
          },
          {
            id: "ke-l2-q9",
            prompt:
              "Kalimat “Buku itu saya beli di toko buku” lebih efektif daripada ….",
            options: [
              "Buku itu telah saya sudah beli di toko buku.",
              "Saya membeli buku itu.",
            ],
            correctAnswer: "Buku itu telah saya sudah beli di toko buku.",
          },
          {
            id: "ke-l2-q10",
            prompt: "Kalimat efektif menempatkan subjek dan predikat secara ….",
            options: ["Jelas dan tidak rancu", "Tersembunyi dan tidak tampak"],
            correctAnswer: "Jelas dan tidak rancu",
          },
        ],
      },
      // ----- LEVEL 3 -----
      {
        level: 3,
        questions: [
          {
            id: "ke-l3-q1",
            prompt:
              "Kalimat “Penting bagi kita untuk bisa menjaga kesehatan tubuh kita” dapat diperbaiki menjadi ….",
            options: [
              "Penting bagi kita menjaga kesehatan tubuh.",
              "Penting sekali bagi kita untuk menjaga kesehatan tubuh kita.",
            ],
            correctAnswer: "Penting bagi kita menjaga kesehatan tubuh.",
          },
          {
            id: "ke-l3-q2",
            prompt:
              "Kalimat “Adik tertawa senyum gembira” tidak efektif karena ….",
            options: [
              "Predikatnya lebih dari satu dan tidak sejajar",
              "Subjeknya berlebihan",
            ],
            correctAnswer: "Predikatnya lebih dari satu dan tidak sejajar",
          },
          {
            id: "ke-l3-q3",
            prompt: "Manakah kalimat efektif berikut?",
            options: [
              "Kami pergi ke museum yang di mana di sana banyak koleksi.",
              "Kami pergi ke museum yang memiliki banyak koleksi.",
            ],
            correctAnswer: "Kami pergi ke museum yang memiliki banyak koleksi.",
          },
          {
            id: "ke-l3-q4",
            prompt:
              "Kalimat “Hal ini adalah merupakan suatu masalah yang penting” terlalu bertele-tele. Perbaikannya adalah ….",
            options: [
              "Hal ini merupakan masalah penting.",
              "Hal ini adalah masalah yang sangat penting sekali.",
            ],
            correctAnswer: "Hal ini merupakan masalah penting.",
          },
          {
            id: "ke-l3-q5",
            prompt:
              "Kalimat efektif menghindari pemakaian kata “yang” secara ….",
            options: ["Berlebihan", "Tepat dan seperlunya"],
            correctAnswer: "Berlebihan",
          },
          {
            id: "ke-l3-q6",
            prompt: "Manakah kalimat yang lebih efektif?",
            options: [
              "Para hadirin sekalian yang saya hormati semuanya.",
              "Hadirin yang saya hormati.",
            ],
            correctAnswer: "Hadirin yang saya hormati.",
          },
          {
            id: "ke-l3-q7",
            prompt:
              "Kalimat “Ia adalah seorang siswa yang pintar dan rajin belajar” bisa dipersingkat menjadi ….",
            options: [
              "Ia siswa yang pintar dan rajin.",
              "Ia adalah seorang siswa yang pintar rajin belajar.",
            ],
            correctAnswer: "Ia siswa yang pintar dan rajin.",
          },
          {
            id: "ke-l3-q8",
            prompt:
              "Ketidakefektifan kalimat “Sekolah kami mengadakan lomba-lomba dalam rangka untuk memeriahkan hari kemerdekaan.” terletak pada ….",
            options: [
              "Pemakaian frasa “dalam rangka untuk”",
              "Subjek yang ganda",
            ],
            correctAnswer: "Pemakaian frasa “dalam rangka untuk”",
          },
          {
            id: "ke-l3-q9",
            prompt: "Manakah kalimat efektif berikut?",
            options: [
              "Untuk bisa supaya lulus ujian, kamu harus belajar sungguh-sungguh.",
              "Untuk lulus ujian, kamu harus belajar sungguh-sungguh.",
            ],
            correctAnswer:
              "Untuk lulus ujian, kamu harus belajar sungguh-sungguh.",
          },
          {
            id: "ke-l3-q10",
            prompt: "Kalimat efektif cenderung menggunakan struktur kalimat ….",
            options: ["SPOK yang jelas", "Tanpa subjek"],
            correctAnswer: "SPOK yang jelas",
          },
        ],
      },
      // ----- LEVEL 4 -----
      {
        level: 4,
        questions: [
          {
            id: "ke-l4-q1",
            prompt:
              "Kalimat “Adik saya yang bernama Dina itu dia pandai menari” tidak efektif karena ….",
            options: ["Subjeknya ganda", "Predikatnya hilang"],
            correctAnswer: "Subjeknya ganda",
          },
          {
            id: "ke-l4-q2",
            prompt:
              "Perbaikan kalimat efektif untuk “Ia sudah mulai memulai belajar sejak tadi” adalah ….",
            options: [
              "Ia sudah mulai belajar sejak tadi.",
              "Ia sudah memulai belajar sejak tadi.",
            ],
            correctAnswer: "Ia sudah mulai belajar sejak tadi.",
          },
          {
            id: "ke-l4-q3",
            prompt:
              "Kalimat “Banyak sekali para tamu-tamu yang hadir” tidak efektif karena ….",
            options: ["Ada pengulangan makna jamak", "Tidak ada objek"],
            correctAnswer: "Ada pengulangan makna jamak",
          },
          {
            id: "ke-l4-q4",
            prompt: "Manakah kalimat efektif berikut?",
            options: [
              "Dia adalah merupakan seorang guru yang baik.",
              "Dia guru yang baik.",
            ],
            correctAnswer: "Dia guru yang baik.",
          },
          {
            id: "ke-l4-q5",
            prompt:
              "Kalimat “Sekolah kami setiap hari Senin selalu mengadakan upacara bendera” lebih efektif jika diubah menjadi ….",
            options: [
              "Sekolah kami mengadakan upacara bendera setiap hari Senin.",
              "Setiap hari Senin sekolah kami selalu mengadakan upacara bendera.",
            ],
            correctAnswer:
              "Sekolah kami mengadakan upacara bendera setiap hari Senin.",
          },
          {
            id: "ke-l4-q6",
            prompt: "Kalimat efektif menghindari ….",
            options: [
              "Pemakaian dua kata yang maknanya sama dalam satu fungsi",
              "Penggunaan kata yang singkat",
            ],
            correctAnswer:
              "Pemakaian dua kata yang maknanya sama dalam satu fungsi",
          },
          {
            id: "ke-l4-q7",
            prompt: "Manakah kalimat yang lebih efektif?",
            options: [
              "Dia pergi ke pasar untuk membeli kebutuhan-kebutuhan sehari-hari.",
              "Dia pergi ke pasar untuk membeli kebutuhan sehari-hari.",
            ],
            correctAnswer:
              "Dia pergi ke pasar untuk membeli kebutuhan sehari-hari.",
          },
          {
            id: "ke-l4-q8",
            prompt:
              "Ketidakefektifan kalimat “Hal tersebut membuat saya menjadi merasa bahagia sekali” terletak pada ….",
            options: [
              "Penggunaan kata “menjadi merasa” dan “sekali” yang berlebihan",
              "Tidak ada subjek",
            ],
            correctAnswer:
              "Penggunaan kata “menjadi merasa” dan “sekali” yang berlebihan",
          },
          {
            id: "ke-l4-q9",
            prompt:
              "Kalimat “Para siswa diwajibkan harus hadir tepat waktu” lebih efektif jika diubah menjadi ….",
            options: [
              "Para siswa diwajibkan hadir tepat waktu.",
              "Para siswa harus diwajibkan hadir tepat waktu.",
            ],
            correctAnswer: "Para siswa diwajibkan hadir tepat waktu.",
          },
          {
            id: "ke-l4-q10",
            prompt:
              "Kalimat efektif biasanya tidak menggunakan kata pengisi seperti ….",
            options: ["“apa namanya”, “gitu”", "“dan”, “atau”"],
            correctAnswer: "“apa namanya”, “gitu”",
          },
        ],
      },
      // ----- LEVEL 5 -----
      {
        level: 5,
        questions: [
          {
            id: "ke-l5-q1",
            prompt:
              "Kalimat “Dalam kesempatan kali ini saya ingin menyampaikan suatu pesan penting” dapat dipadatkan menjadi ….",
            options: [
              "Saya ingin menyampaikan pesan penting.",
              "Dalam kesempatan kali ini saya ingin menyampaikan pesan penting.",
            ],
            correctAnswer: "Saya ingin menyampaikan pesan penting.",
          },
          {
            id: "ke-l5-q2",
            prompt:
              "Kalimat “Kita semua harus bekerja sama bersama-sama untuk menyukseskan acara ini” tidak efektif karena ….",
            options: [
              "Ada pengulangan makna kata “bekerja sama” dan “bersama-sama”",
              "Tidak ada objek",
            ],
            correctAnswer:
              "Ada pengulangan makna kata “bekerja sama” dan “bersama-sama”",
          },
          {
            id: "ke-l5-q3",
            prompt:
              "Perbaikan kalimat “Dia pada saat sekarang ini sedang mengerjakan tugas” adalah ….",
            options: [
              "Dia sedang mengerjakan tugas.",
              "Dia saat ini sedang mengerjakan tugas.",
            ],
            correctAnswer: "Dia sedang mengerjakan tugas.",
          },
          {
            id: "ke-l5-q4",
            prompt:
              "Kalimat “Penelitian ini bertujuan untuk dapat mengetahui pengaruh makanan sehat terhadap kesehatan tubuh” lebih efektif jika diubah menjadi ….",
            options: [
              "Penelitian ini bertujuan mengetahui pengaruh makanan sehat terhadap kesehatan tubuh.",
              "Penelitian ini mempunyai tujuan untuk dapat mengetahui pengaruh makanan sehat terhadap kesehatan tubuh.",
            ],
            correctAnswer:
              "Penelitian ini bertujuan mengetahui pengaruh makanan sehat terhadap kesehatan tubuh.",
          },
          {
            id: "ke-l5-q5",
            prompt: "Kalimat efektif mengutamakan ….",
            options: ["Kejelasan makna", "Panjang kalimat"],
            correctAnswer: "Kejelasan makna",
          },
          {
            id: "ke-l5-q6",
            prompt: "Manakah kalimat efektif berikut?",
            options: [
              "Dalam rangka untuk mengurangi sampah plastik, sekolah melarang penggunaan botol sekali pakai.",
              "Untuk mengurangi sampah plastik, sekolah melarang penggunaan botol sekali pakai.",
            ],
            correctAnswer:
              "Untuk mengurangi sampah plastik, sekolah melarang penggunaan botol sekali pakai.",
          },
          {
            id: "ke-l5-q7",
            prompt:
              "Kalimat “Siswa diharuskan wajib memakai seragam sekolah” tidak efektif karena ….",
            options: [
              "Ada dua kata dengan makna sama: “diharuskan” dan “wajib”",
              "Tidak memiliki subjek",
            ],
            correctAnswer:
              "Ada dua kata dengan makna sama: “diharuskan” dan “wajib”",
          },
          {
            id: "ke-l5-q8",
            prompt:
              "Perbaikan kalimat “Mereka semua para penonton memberikan tepuk tangan yang meriah sekali” adalah ….",
            options: [
              "Para penonton memberikan tepuk tangan meriah.",
              "Mereka semua para penonton memberikan tepuk tangan meriah.",
            ],
            correctAnswer: "Para penonton memberikan tepuk tangan meriah.",
          },
          {
            id: "ke-l5-q9",
            prompt: "Kalimat efektif cenderung menghindari ….",
            options: [
              "Kata bersinonim yang dipakai bersamaan",
              "Kata hubung yang tepat",
            ],
            correctAnswer: "Kata bersinonim yang dipakai bersamaan",
          },
          {
            id: "ke-l5-q10",
            prompt: "Manakah yang merupakan ciri kalimat efektif?",
            options: [
              "Struktur kalimat sesuai kaidah dan mudah dimengerti",
              "Banyak sisipan kata tidak penting",
            ],
            correctAnswer:
              "Struktur kalimat sesuai kaidah dan mudah dimengerti",
          },
        ],
      },
    ],
  },

  // =========================================================
  // 4. GAGASAN UTAMA PARAGRAF – KELAS 8 SMP
  // =========================================================
  {
    id: "gagasan-utama",
    title: "Gagasan Utama Paragraf",
    grade: "8_smp",
    description:
      "Latihan menemukan gagasan utama dan membedakannya dari gagasan pendukung dalam sebuah paragraf.",
    levels: [
      // ----- LEVEL 1 -----
      {
        level: 1,
        questions: [
          {
            id: "gu-l1-q1",
            prompt: "Gagasan utama dalam paragraf biasanya terdapat pada ….",
            options: ["Kalimat utama", "Kalimat penjelas"],
            correctAnswer: "Kalimat utama",
          },
          {
            id: "gu-l1-q2",
            prompt:
              "Kalimat yang berisi rincian atau contoh dari gagasan utama disebut ….",
            options: ["Kalimat penjelas", "Kalimat utama"],
            correctAnswer: "Kalimat penjelas",
          },
          {
            id: "gu-l1-q3",
            prompt:
              "Paragraf yang gagasan utamanya terletak di awal paragraf disebut paragraf ….",
            options: ["Deduktif", "Induktif"],
            correctAnswer: "Deduktif",
          },
          {
            id: "gu-l1-q4",
            prompt:
              "Paragraf yang gagasan utamanya terletak di akhir paragraf disebut paragraf ….",
            options: ["Induktif", "Deduktif"],
            correctAnswer: "Induktif",
          },
          {
            id: "gu-l1-q5",
            prompt:
              "Untuk menemukan gagasan utama, kita perlu memperhatikan ….",
            options: [
              "Kalimat yang merangkum keseluruhan isi paragraf",
              "Kalimat yang paling panjang",
            ],
            correctAnswer: "Kalimat yang merangkum keseluruhan isi paragraf",
          },
          {
            id: "gu-l1-q6",
            prompt: "Gagasan utama sering disebut juga sebagai ….",
            options: ["Pikiran utama", "Rincian contoh"],
            correctAnswer: "Pikiran utama",
          },
          {
            id: "gu-l1-q7",
            prompt: "Kalimat penjelas dalam paragraf berfungsi untuk ….",
            options: [
              "Menjelaskan dan mendukung gagasan utama",
              "Mengubah topik paragraf",
            ],
            correctAnswer: "Menjelaskan dan mendukung gagasan utama",
          },
          {
            id: "gu-l1-q8",
            prompt:
              "Jika gagasan utama terletak di awal dan di akhir paragraf, paragraf tersebut disebut ….",
            options: ["Campuran", "Deduktif"],
            correctAnswer: "Campuran",
          },
          {
            id: "gu-l1-q9",
            prompt: "Ciri kalimat utama adalah ….",
            options: ["Bersifat umum", "Berisi contoh-contoh rinci"],
            correctAnswer: "Bersifat umum",
          },
          {
            id: "gu-l1-q10",
            prompt: "Kalimat penjelas biasanya berisi ….",
            options: ["Data, contoh, atau rincian", "Topik baru"],
            correctAnswer: "Data, contoh, atau rincian",
          },
        ],
      },
      // ----- LEVEL 2 -----
      {
        level: 2,
        questions: [
          {
            id: "gu-l2-q1",
            prompt:
              "Untuk menemukan gagasan utama, hal pertama yang sebaiknya dilakukan adalah ….",
            options: [
              "Membaca paragraf secara keseluruhan",
              "Mencari kata yang paling sering diulang",
            ],
            correctAnswer: "Membaca paragraf secara keseluruhan",
          },
          {
            id: "gu-l2-q2",
            prompt: "Paragraf deduktif biasanya diawali dengan kalimat ….",
            options: [
              "Yang bersifat umum",
              "Yang berisi contoh terlebih dahulu",
            ],
            correctAnswer: "Yang bersifat umum",
          },
          {
            id: "gu-l2-q3",
            prompt: "Paragraf induktif biasanya diakhiri dengan kalimat ….",
            options: [
              "Yang merangkum isi paragraf",
              "Yang berisi contoh tambahan",
            ],
            correctAnswer: "Yang merangkum isi paragraf",
          },
          {
            id: "gu-l2-q4",
            prompt: "Kalimat utama biasanya tidak diawali dengan kata ….",
            options: ["Contohnya", "Oleh karena itu"],
            correctAnswer: "Contohnya",
          },
          {
            id: "gu-l2-q5",
            prompt:
              "Kalimat “Selain itu, perpustakaan juga menyediakan majalah dan koran.” cenderung merupakan kalimat ….",
            options: ["Penjelas", "Utama"],
            correctAnswer: "Penjelas",
          },
          {
            id: "gu-l2-q6",
            prompt:
              "Kalimat “Perpustakaan sekolah memiliki peran penting dalam meningkatkan minat baca siswa.” kemungkinan besar merupakan ….",
            options: ["Gagasan utama", "Contoh rincian"],
            correctAnswer: "Gagasan utama",
          },
          {
            id: "gu-l2-q7",
            prompt:
              "Kalimat yang diawali dengan frasa “misalnya” biasanya merupakan ….",
            options: ["Kalimat penjelas", "Kalimat utama"],
            correctAnswer: "Kalimat penjelas",
          },
          {
            id: "gu-l2-q8",
            prompt: "Gagasan utama sebaiknya dituliskan dalam bentuk ….",
            options: ["Kalimat singkat dan padat", "Kalimat yang bertele-tele"],
            correctAnswer: "Kalimat singkat dan padat",
          },
          {
            id: "gu-l2-q9",
            prompt:
              "Kalimat yang mengandung kata kunci topik paragraf sering kali merupakan ….",
            options: ["Kalimat utama", "Kalimat penutup"],
            correctAnswer: "Kalimat utama",
          },
          {
            id: "gu-l2-q10",
            prompt:
              "Kalimat penutup paragraf yang mengulang gagasan utama disebut ….",
            options: ["Reiterasi gagasan utama", "Gagasan pendukung"],
            correctAnswer: "Reiterasi gagasan utama",
          },
        ],
      },
      // ----- LEVEL 3 -----
      {
        level: 3,
        questions: [
          {
            id: "gu-l3-q1",
            prompt:
              "Jika semua kalimat dalam paragraf berupa contoh-contoh, maka gagasan utama biasanya terdapat pada ….",
            options: ["Kalimat terakhir", "Kalimat pertama"],
            correctAnswer: "Kalimat terakhir",
          },
          {
            id: "gu-l3-q2",
            prompt:
              "Paragraf yang gagasan utamanya tersirat tetapi dapat disimpulkan dari seluruh isi paragraf disebut paragraf ….",
            options: ["Induktif", "Deduktif"],
            correctAnswer: "Induktif",
          },
          {
            id: "gu-l3-q3",
            prompt:
              "Kalimat “Banyak cara yang dapat kita lakukan untuk menjaga kebersihan lingkungan.” termasuk kalimat ….",
            options: ["Utama", "Penjelas"],
            correctAnswer: "Utama",
          },
          {
            id: "gu-l3-q4",
            prompt:
              "Kalimat “Salah satunya adalah membuang sampah pada tempatnya.” termasuk kalimat ….",
            options: ["Penjelas", "Utama"],
            correctAnswer: "Penjelas",
          },
          {
            id: "gu-l3-q5",
            prompt:
              "Jika kalimat utama terdapat di tengah paragraf, paragraf tersebut termasuk paragraf ….",
            options: ["Campuran", "Induktif"],
            correctAnswer: "Campuran",
          },
          {
            id: "gu-l3-q6",
            prompt: "Kalimat penjelas biasanya menjawab pertanyaan ….",
            options: [
              "Bagaimana, mengapa, atau contoh apa",
              "Siapa penulis teks",
            ],
            correctAnswer: "Bagaimana, mengapa, atau contoh apa",
          },
          {
            id: "gu-l3-q7",
            prompt:
              "Saat mencari gagasan utama, kita perlu mengabaikan kalimat yang hanya berisi ….",
            options: [
              "Rincian angka atau contoh tambahan",
              "Topik utama paragraf",
            ],
            correctAnswer: "Rincian angka atau contoh tambahan",
          },
          {
            id: "gu-l3-q8",
            prompt: "Gagasan utama juga dapat disebut sebagai … paragraf.",
            options: ["Inti", "Penutup"],
            correctAnswer: "Inti",
          },
          {
            id: "gu-l3-q9",
            prompt:
              "Kalimat “Di zaman modern ini, internet memiliki peran besar dalam kehidupan manusia.” kemungkinan besar menjadi ….",
            options: ["Gagasan utama", "Gagasan pendukung"],
            correctAnswer: "Gagasan utama",
          },
          {
            id: "gu-l3-q10",
            prompt: "Kalimat berawalan “Selain itu” biasanya menunjukkan ….",
            options: ["Tambahan penjelas", "Perubahan topik"],
            correctAnswer: "Tambahan penjelas",
          },
        ],
      },
      // ----- LEVEL 4 -----
      {
        level: 4,
        questions: [
          {
            id: "gu-l4-q1",
            prompt:
              "Jika topik paragraf adalah “manfaat membaca”, maka gagasan utama yang tepat adalah ….",
            options: [
              "Membaca memiliki banyak manfaat bagi perkembangan pengetahuan.",
              "Banyak orang tidak suka membaca buku.",
            ],
            correctAnswer:
              "Membaca memiliki banyak manfaat bagi perkembangan pengetahuan.",
          },
          {
            id: "gu-l4-q2",
            prompt:
              "Kalimat yang hanya menyebutkan contoh judul buku biasanya merupakan kalimat ….",
            options: ["Penjelas", "Utama"],
            correctAnswer: "Penjelas",
          },
          {
            id: "gu-l4-q3",
            prompt:
              "Untuk menyimpulkan gagasan utama, kita harus melihat hubungan antara ….",
            options: ["Semua kalimat dalam paragraf", "Judul bacaan saja"],
            correctAnswer: "Semua kalimat dalam paragraf",
          },
          {
            id: "gu-l4-q4",
            prompt:
              "Jika sebuah paragraf berisi langkah-langkah membuat jus, gagasan utama yang tepat adalah ….",
            options: [
              "Cara membuat jus yang segar dan sehat.",
              "Jus adalah minuman manis.",
            ],
            correctAnswer: "Cara membuat jus yang segar dan sehat.",
          },
          {
            id: "gu-l4-q5",
            prompt: "Gagasan utama yang baik tidak boleh terlalu ….",
            options: ["Sempit dan terlalu rinci", "Umum dan jelas"],
            correctAnswer: "Sempit dan terlalu rinci",
          },
          {
            id: "gu-l4-q6",
            prompt:
              "Kalimat “Oleh karena itu, kita harus menjaga kebersihan tangan sebelum makan.” biasanya ….",
            options: ["Menguatkan gagasan utama", "Memperkenalkan topik baru"],
            correctAnswer: "Menguatkan gagasan utama",
          },
          {
            id: "gu-l4-q7",
            prompt:
              "Jika sebuah paragraf diawali dengan definisi, maka definisi tersebut sering kali menjadi ….",
            options: ["Gagasan utama", "Contoh"],
            correctAnswer: "Gagasan utama",
          },
          {
            id: "gu-l4-q8",
            prompt:
              "Kalimat yang mengandung kata kunci “manfaat” ketika paragraf membahas manfaat sesuatu cenderung menjadi ….",
            options: ["Kalimat utama", "Kalimat penjelas"],
            correctAnswer: "Kalimat utama",
          },
          {
            id: "gu-l4-q9",
            prompt: "Gagasan utama membantu pembaca untuk ….",
            options: [
              "Memahami inti informasi paragraf",
              "Mengingat semua angka dan data",
            ],
            correctAnswer: "Memahami inti informasi paragraf",
          },
          {
            id: "gu-l4-q10",
            prompt:
              "Kalimat “Beberapa cara menjaga kesehatan mata adalah mengatur jarak pandang dan mengurangi penggunaan gawai.” merupakan ….",
            options: ["Gagasan utama", "Gagasan pendukung"],
            correctAnswer: "Gagasan utama",
          },
        ],
      },
      // ----- LEVEL 5 -----
      {
        level: 5,
        questions: [
          {
            id: "gu-l5-q1",
            prompt:
              "Jika paragraf menjelaskan berbagai dampak negatif penggunaan plastik, gagasan utama yang paling tepat adalah ….",
            options: [
              "Penggunaan plastik memiliki banyak dampak negatif bagi lingkungan.",
              "Plastik sulit terurai di tanah.",
            ],
            correctAnswer:
              "Penggunaan plastik memiliki banyak dampak negatif bagi lingkungan.",
          },
          {
            id: "gu-l5-q2",
            prompt:
              "Kalimat “Contohnya, sampah plastik dapat menyumbat aliran sungai dan merusak ekosistem laut.” termasuk ….",
            options: ["Kalimat penjelas", "Kalimat utama"],
            correctAnswer: "Kalimat penjelas",
          },
          {
            id: "gu-l5-q3",
            prompt:
              "Saat membaca paragraf panjang, untuk mencari gagasan utama kita sebaiknya ….",
            options: [
              "Mencari kalimat yang menghubungkan semua rincian",
              "Menghafal semua kalimat",
            ],
            correctAnswer: "Mencari kalimat yang menghubungkan semua rincian",
          },
          {
            id: "gu-l5-q4",
            prompt:
              "Gagasan utama yang terlalu luas akan membuat paragraf menjadi ….",
            options: ["Kurang fokus", "Sangat rinci"],
            correctAnswer: "Kurang fokus",
          },
          {
            id: "gu-l5-q5",
            prompt:
              "Jika semua kalimat dalam paragraf mendukung satu ide pokok, paragraf tersebut disebut paragraf yang ….",
            options: ["Padu", "Acak"],
            correctAnswer: "Padu",
          },
          {
            id: "gu-l5-q6",
            prompt:
              "Kalimat “Sebagai kesimpulan, olahraga teratur memberikan banyak manfaat bagi kesehatan tubuh.” berkaitan dengan ….",
            options: ["Gagasan utama", "Gagasan sampingan"],
            correctAnswer: "Gagasan utama",
          },
          {
            id: "gu-l5-q7",
            prompt: "Gagasan utama biasanya tidak berupa ….",
            options: [
              "Angka dan data yang sangat spesifik",
              "Pernyataan umum tentang topik",
            ],
            correctAnswer: "Angka dan data yang sangat spesifik",
          },
          {
            id: "gu-l5-q8",
            prompt:
              "Kalimat “Selain itu, tidur yang cukup juga penting untuk menjaga kesehatan tubuh.” termasuk ….",
            options: ["Kalimat penjelas", "Kalimat utama"],
            correctAnswer: "Kalimat penjelas",
          },
          {
            id: "gu-l5-q9",
            prompt:
              "Gagasan utama sering ditandai oleh kata-kata yang menunjukkan ….",
            options: ["Pokok pembahasan", "Contoh yang sangat rinci"],
            correctAnswer: "Pokok pembahasan",
          },
          {
            id: "gu-l5-q10",
            prompt: "Memahami gagasan utama membantu kita untuk ….",
            options: [
              "Meringkas isi bacaan dengan lebih mudah",
              "Mencatat semua kalimat dalam bacaan",
            ],
            correctAnswer: "Meringkas isi bacaan dengan lebih mudah",
          },
        ],
      },
    ],
  },
];
