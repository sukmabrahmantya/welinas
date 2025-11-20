export type MateriKey = "prosa" | "puisi" | "cerpen";

export type MateriSastra = {
  id: MateriKey;
  title: string;
  maknaUmum: string;
  contoh: string[];
  sejarahTerbentuk: string;
  kegunaan: string[];
};

export const MATERI_SASTRA: MateriSastra[] = [
  {
    id: "prosa",
    title: "Prosa",
    maknaUmum:
      "Prosa adalah bentuk karya sastra yang menggunakan bahasa sehari-hari dan disusun dalam bentuk paragraf, tidak terikat oleh rima, irama, atau jumlah baris tertentu. Prosa cenderung fokus pada kejelasan alur, pengembangan tokoh, dan penyampaian gagasan secara langsung sehingga mudah diikuti pembaca. Dalam prosa, penulis lebih leluasa menjelaskan latar, konflik, maupun dialog secara rinci tanpa batasan bentuk yang ketat.",
    contoh: [
      "Novel yang mengisahkan perjalanan hidup seorang tokoh dari masa kecil hingga dewasa, lengkap dengan konflik batin dan sosial yang ia hadapi.",
      "Cerita realis tentang kehidupan keluarga di kota besar yang berjuang menjaga keharmonisan di tengah tekanan pekerjaan dan ekonomi.",
      "Esai yang berisi renungan penulis mengenai perubahan sosial di lingkungan sekitarnya, ditulis dengan gaya naratif dan argumentatif.",
      "Biografi tokoh penting yang menceritakan perjalanan karier, nilai hidup, dan keputusan-keputusan besar yang pernah diambil.",
      "Catatan perjalanan (travelogue) yang menggambarkan suasana tempat baru, budaya lokal, dan pengalaman personal penulis.",
    ],
    sejarahTerbentuk:
      "Prosa berkembang seiring dengan kebutuhan manusia untuk mendokumentasikan peristiwa, pengetahuan, dan pengalaman secara sistematis. Pada masa awal, kisah-kisah diceritakan secara lisan dalam bentuk legenda dan dongeng, kemudian baru dituliskan ketika tradisi tulis-menulis mulai mapan. Di Indonesia, prosa modern mulai menguat pada masa Balai Pustaka, saat cerita-cerita berbahasa Melayu dan Indonesia mulai diterbitkan secara luas. Tokoh-tokoh sastra seperti Marah Rusli, Nur Sutan Iskandar, dan angkatan-angkatan berikutnya berperan besar memperkaya bentuk dan tema prosa Indonesia, dari cerita romantis, realis, hingga kritik sosial.",
    kegunaan: [
      "Sebagai media untuk menyampaikan cerita yang kompleks dan berlapis, baik tentang kehidupan individu, keluarga, maupun masyarakat.",
      "Membantu pembaca memahami realitas sosial, budaya, dan psikologis melalui sudut pandang tokoh-tokoh fiktif maupun nyata.",
      "Menjadi sarana refleksi dan introspeksi, karena pembaca sering kali menemukan diri mereka dalam konflik dan pengalaman tokoh.",
      "Digunakan dalam pendidikan untuk melatih kemampuan membaca pemahaman, menganalisis alur, tokoh, konflik, dan nilai moral.",
      "Sebagai wadah bagi penulis untuk mengeksplorasi ide-ide baru, kritik, dan pandangan terhadap dunia dalam bentuk narasi yang menarik.",
    ],
  },
  {
    id: "puisi",
    title: "Puisi",
    maknaUmum:
      "Puisi adalah bentuk karya sastra yang mengekspresikan gagasan, perasaan, dan pengalaman batin secara padat dan sugestif melalui pilihan kata yang cermat. Puisi sering memanfaatkan majas, simbol, rima, dan irama untuk menghadirkan suasana tertentu dan membangkitkan imajinasi pembaca. Satu bait puisi bisa memuat makna yang luas, sehingga pembaca diajak untuk merenung, menafsirkan, dan merasakan, bukan sekadar memahami secara literal.",
    contoh: [
      "Puisi liris yang mengungkapkan kerinduan atau kesepian dengan bahasa yang lembut dan penuh metafora.",
      "Puisi protes sosial yang menyoroti ketidakadilan, kemiskinan, atau kerusakan lingkungan dengan nada tegas dan tajam.",
      "Puisi religius atau spiritual yang merefleksikan hubungan manusia dengan Tuhan, alam, atau dirinya sendiri.",
      "Puisi kontemporer berbentuk bebas tanpa rima yang jelas, tetapi kuat dalam citraan dan permainan bunyi.",
      "Syair atau mantra tradisional yang biasa dibacakan dalam upacara adat dan mengandung nilai-nilai budaya lokal.",
    ],
    sejarahTerbentuk:
      "Puisi merupakan salah satu bentuk sastra tertua yang lahir dari tradisi lisan, nyanyian, dan doa. Pada masa ketika tulisan belum dikenal luas, puisi digunakan untuk menyimpan pengetahuan, mitos, dan ajaran moral karena bentuknya yang berirama memudahkan untuk diingat. Dalam sastra Indonesia, tradisi puisi terlihat pada pantun, syair, gurindam, dan bentuk-bentuk puisi lama lainnya yang berkembang di berbagai daerah. Memasuki abad ke-20, muncul puisi modern dengan bahasa yang lebih bebas dan tema yang lebih personal, diikuti oleh puisi kontemporer yang sering bereksperimen dengan bentuk, tipografi, dan cara penyampaian. Perkembangan ini menunjukkan bahwa puisi terus beradaptasi dengan zaman, namun tetap mempertahankan fungsinya sebagai wadah ekspresi terdalam manusia.",
    kegunaan: [
      "Menjadi media untuk menyalurkan emosi dan pengalaman batin yang sulit diungkapkan lewat bahasa biasa, seperti cinta, duka, dan kerinduan.",
      "Mengasah kepekaan bahasa dan imajinasi, baik bagi penulis maupun pembaca, melalui metafora, simbol, dan permainan bunyi.",
      "Digunakan dalam pendidikan dan kegiatan seni untuk melatih apresiasi sastra, keberanian tampil, serta kemampuan menginterpretasi teks.",
      "Menjadi bagian penting dari tradisi budaya dan ritual, misalnya dalam nyanyian daerah, doa, atau upacara adat.",
      "Berfungsi sebagai sarana kritik sosial dan refleksi kolektif, ketika penyair menyuarakan suara kelompok yang terpinggirkan atau kondisi zaman.",
    ],
  },
  {
    id: "cerpen",
    title: "Cerpen",
    maknaUmum:
      "Cerpen (cerita pendek) adalah karya prosa fiksi yang relatif singkat dan fokus pada satu peristiwa utama atau satu konflik inti. Cerpen biasanya memiliki jumlah tokoh yang terbatas, ruang waktu yang sempit, dan dapat dibaca sekali duduk. Kekuatan cerpen terletak pada kemampuannya menghadirkan momen yang padat dan berkesan, sering kali berakhir dengan twist, refleksi, atau kesan yang menggantung namun kuat.",
    contoh: [
      "Cerpen tentang seorang anak yang untuk pertama kalinya berani mengambil keputusan penting bagi dirinya sendiri.",
      "Cerpen realis yang memotret kehidupan warung kecil di pinggir jalan dan interaksi para pelanggannya setiap hari.",
      "Cerpen fantasi yang berlatar dunia imajinatif, tetapi konflik utamanya tetap berkaitan dengan rasa takut, keberanian, atau persahabatan.",
      "Cerpen dengan sudut pandang orang pertama yang mengisahkan satu kejadian traumatis yang mengubah cara tokoh memandang hidup.",
      "Cerpen humor yang menggambarkan kejadian sehari-hari dengan sudut pandang unik dan punchline tak terduga di bagian akhir.",
    ],
    sejarahTerbentuk:
      "Cerpen berkembang seiring munculnya media massa seperti majalah, surat kabar, dan kemudian platform digital yang membutuhkan bacaan singkat namun menarik. Di Eropa dan Amerika, tradisi cerpen menguat pada abad ke-19 dan ke-20, sementara di Indonesia cerpen mulai populer pada masa majalah sastra dan rubrik budaya di surat kabar. Banyak sastrawan Indonesia yang dikenal pertama kali melalui cerpen-cerpen mereka sebelum menulis novel. Seiring waktu, cerpen menjadi wadah eksplorasi tema yang beragam, mulai dari kehidupan desa, urban, politik, hingga isu-isu identitas dan keberagaman.",
    kegunaan: [
      "Memberikan pengalaman membaca yang cepat namun tetap meninggalkan kesan mendalam, cocok untuk pembaca dengan waktu terbatas.",
      "Menjadi media yang efektif bagi penulis untuk bereksperimen dengan gaya, sudut pandang, dan teknik bercerita tanpa komitmen panjang seperti novel.",
      "Digunakan dalam pembelajaran sastra untuk melatih siswa memahami struktur cerita, konflik, penokohan, dan amanat dalam teks yang tidak terlalu panjang.",
      "Mendorong pembaca merenungkan kembali pengalaman pribadi, karena sering kali konflik cerpen dekat dengan kehidupan sehari-hari.",
      "Sebagai sarana dokumentasi sosial dan budaya, ketika cerpen merekam cara hidup, bahasa, serta kebiasaan masyarakat pada periode tertentu.",
    ],
  },
];
