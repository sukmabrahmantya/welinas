export type MateriKey =
  | "prosa"
  | "puisi"
  | "cerpen"
  | "kata-baku"
  | "tanda-baca-dasar"
  | "kalimat-efektif"
  | "gagasan-utama-paragraf";

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
  {
    id: "kata-baku",
    title: "Kata Baku",
    maknaUmum:
      "Kata baku adalah bentuk kata yang penulisannya sesuai dengan kaidah yang ditetapkan dalam Ejaan Bahasa Indonesia (EBI) dan Kamus Besar Bahasa Indonesia (KBBI). Kata baku digunakan dalam situasi resmi atau formal, seperti karya tulis ilmiah, surat dinas, artikel berita, dan naskah pidato. Penggunaan kata baku membantu menyamakan pemahaman, menghindari salah tafsir, serta menjaga wibawa dan kerapian bahasa tulis maupun lisan.",
    contoh: [
      "Menulis “aktif” (baku) alih-alih “aktip” (tidak baku) dalam laporan sekolah.",
      "Menggunakan kata “risiko” (baku), bukan “resiko” dalam artikel ilmiah.",
      "Menulis “praktik” (bentuk nomina) dan “praktis” (bentuk adjektiva) sesuai fungsi kalimat.",
      "Memilih kata “analisis” (baku) daripada “analisa” saat menulis makalah.",
      "Menulis “izin” (baku) dalam surat resmi, bukan “ijin”.",
    ],
    sejarahTerbentuk:
      "Konsep kata baku muncul seiring kebutuhan standarisasi bahasa Indonesia agar dapat digunakan secara konsisten di berbagai daerah dan bidang. Sejak Sumpah Pemuda 1928 dan lahirnya bahasa Indonesia sebagai bahasa persatuan, pemerintah dan para ahli bahasa mulai menyusun pedoman ejaan dan kamus resmi. Perkembangan ini berlanjut hingga lahirnya EYD, kemudian EBI, serta pembaruan KBBI secara berkala. Melalui proses tersebut, bentuk baku kata-kata Indonesia disepakati dan disosialisasikan lewat pendidikan, media, dan dokumen resmi.",
    kegunaan: [
      "Menjaga konsistensi dan kejelasan bahasa dalam teks formal seperti laporan, makalah, surat dinas, dan peraturan.",
      "Mencegah salah pengertian karena perbedaan penulisan atau pengucapan kata yang tidak seragam.",
      "Membantu peserta didik dan penulis memahami kaidah bahasa Indonesia yang baik dan benar.",
      "Menjadi acuan dalam pembuatan soal ujian, buku pelajaran, dan materi ajar bahasa Indonesia.",
      "Mendukung citra profesional dan kredibel dalam komunikasi tertulis maupun lisan yang bersifat resmi.",
    ],
  },
  {
    id: "tanda-baca-dasar",
    title: "Tanda Baca Dasar",
    maknaUmum:
      "Tanda baca dasar adalah simbol-simbol dalam tulisan yang digunakan untuk memperjelas struktur kalimat, menunjukkan jeda, menghubungkan ide, dan menandai emosi atau tekanan tertentu. Contoh tanda baca dasar meliputi titik, koma, tanda tanya, tanda seru, titik dua, dan titik koma. Penggunaan tanda baca yang tepat membuat kalimat lebih mudah dipahami, mengurangi ambiguitas, dan membantu pembaca menangkap maksud penulis secara lebih akurat.",
    contoh: [
      "Menggunakan titik (.) untuk mengakhiri kalimat pernyataan, misalnya: “Ia pulang lebih awal hari ini.”",
      "Memakai koma (,) untuk memisahkan unsur sejenis, misalnya: “Dia membeli buku, pensil, dan penghapus.”",
      "Memakai tanda tanya (?) di akhir kalimat tanya, misalnya: “Apakah kamu sudah mengerjakan tugas?”",
      "Menggunakan tanda seru (!) untuk menegaskan perasaan kuat, misalnya: “Hati-hati di jalan!”",
      "Memakai titik dua (:) sebelum rincian, misalnya: “Bahan yang dibutuhkan: gula, garam, dan tepung.”",
    ],
    sejarahTerbentuk:
      "Sistem tanda baca berkembang dari tradisi penulisan Latin dan berbagai bahasa Eropa yang kemudian diadaptasi ke dalam bahasa Indonesia. Pada awalnya, teks-teks lama sering ditulis tanpa tanda baca yang jelas sehingga sulit dipahami. Seiring berkembangnya dunia cetak dan pendidikan modern, standar tanda baca mulai dirumuskan dan diatur dalam pedoman ejaan. Dalam bahasa Indonesia, ketentuan penggunaan tanda baca tercantum dalam Ejaan Bahasa Indonesia dan terus diperbarui sesuai dengan kebutuhan komunikasi masa kini.",
    kegunaan: [
      "Membantu pembaca memahami struktur kalimat, seperti awalan dan akhiran klausa, daftar, dan dialog.",
      "Mengurangi ambiguitas makna yang bisa muncul jika kalimat terlalu panjang atau tanpa jeda yang jelas.",
      "Memberi nuansa ekspresif, seperti rasa heran, marah, atau gembira melalui tanda seru dan tanda tanya.",
      "Memudahkan penulis menyusun kalimat yang efektif dan enak dibaca, terutama dalam teks panjang.",
      "Menjadi dasar penting dalam penilaian keterampilan menulis, baik di sekolah maupun dalam dunia profesional.",
    ],
  },
  {
    id: "kalimat-efektif",
    title: "Kalimat Efektif",
    maknaUmum:
      "Kalimat efektif adalah kalimat yang mampu menyampaikan gagasan secara jelas, tepat, dan mudah dipahami oleh pembaca atau pendengar. Ciri-ciri kalimat efektif antara lain memiliki struktur yang jelas, tidak bertele-tele, menggunakan diksi yang tepat, dan tidak mengandung ambiguitas. Kalimat efektif juga memerhatikan kesepadanan unsur subjek-predikat-objek, kehematan, serta kelogisan hubungan antarunsur kalimat.",
    contoh: [
      "“Siswa-siswa kelas IX mengikuti ujian akhir dengan tertib.” (padat dan jelas).",
      "“Petugas kebersihan membersihkan halaman sekolah setiap pagi.” (subjek dan predikat jelas).",
      "“Karena hujan deras, pertandingan sepak bola ditunda.” (hubungan sebab-akibat logis).",
      "“Kami mengucapkan terima kasih atas kerja sama Anda.” (hemat dan sopan).",
      "“Pimpinan meminta laporan itu dikumpulkan besok pagi.” (tidak berbelit-belit).",
    ],
    sejarahTerbentuk:
      "Konsep kalimat efektif mulai ditekankan dalam pengajaran bahasa seiring berkembangnya kebutuhan komunikasi yang jelas dan efisien, terutama di dunia pendidikan, pemerintahan, dan media. Dalam tradisi tata bahasa Indonesia modern, kalimat efektif dikaitkan dengan pemahaman struktur dasar S-P-O-K, pilihan kata sesuai konteks, serta kepekaan terhadap logika bahasa. Berbagai buku pedoman bahasa dan modul pembelajaran menekankan pentingnya menulis kalimat efektif sebagai keterampilan dasar yang harus dimiliki setiap penutur bahasa Indonesia.",
    kegunaan: [
      "Memudahkan pembaca atau pendengar menangkap informasi tanpa salah paham atau menebak-nebak maksud penulis.",
      "Meningkatkan kualitas tulisan ilmiah, laporan, surat, dan teks formal lainnya sehingga tampak profesional.",
      "Membantu siswa melatih keterampilan menulis yang terstruktur dan fokus pada gagasan utama.",
      "Menghemat waktu dan ruang karena pesan dapat disampaikan dengan kalimat yang singkat namun padat makna.",
      "Mendukung komunikasi publik seperti pengumuman, peraturan, dan instruksi agar lebih efektif dan efisien.",
    ],
  },
  {
    id: "gagasan-utama-paragraf",
    title: "Gagasan Utama Paragraf",
    maknaUmum:
      "Gagasan utama paragraf adalah ide pokok atau inti pembahasan yang menjadi dasar seluruh kalimat dalam paragraf. Gagasan utama biasanya dinyatakan dalam kalimat utama (kalimat topik), sedangkan kalimat lainnya berfungsi sebagai penjelas, contoh, atau rincian pendukung. Dengan mengenali gagasan utama, pembaca dapat memahami fokus pembicaraan paragraf tanpa harus menghafal semua detail.",
    contoh: [
      "Paragraf yang diawali kalimat: “Perpustakaan sekolah memiliki peran penting dalam menunjang proses belajar siswa.” diikuti kalimat penjelas tentang fungsi dan manfaat perpustakaan.",
      "Paragraf yang kalimat utamanya berada di akhir, misalnya: setelah beberapa kalimat contoh, ditutup dengan kalimat: “Oleh karena itu, pola hidup sehat harus dibiasakan sejak dini.”",
      "Paragraf yang menempatkan gagasan utama di awal, lalu diikuti contoh kegiatan menjaga kebersihan lingkungan.",
      "Paragraf yang menonjolkan satu ide, misalnya pentingnya membaca, sementara kalimat lain menguraikan alasan dan manfaat.",
      "Paragraf dengan kalimat utama: “Teknologi digital mengubah cara kita berkomunikasi.” lalu dijelaskan lewat contoh media sosial dan aplikasi pesan.",
    ],
    sejarahTerbentuk:
      "Pengajaran tentang gagasan utama paragraf berkembang seiring fokus pendidikan pada keterampilan membaca pemahaman. Dalam analisis wacana dan kajian teks, paragraf dipandang sebagai unit yang memuat satu ide sentral yang dirinci oleh kalimat-kalimat lain. Konsep ini diadaptasi ke dalam kurikulum bahasa Indonesia agar siswa dapat memahami struktur teks eksposisi, narasi, argumentasi, dan deskripsi dengan lebih terarah. Seiring berkembangnya literasi informasi, kemampuan menemukan gagasan utama menjadi semakin penting dalam menyaring informasi yang melimpah.",
    kegunaan: [
      "Membantu pembaca menangkap inti informasi dari sebuah paragraf atau teks dengan cepat.",
      "Menjadi dasar dalam menyusun rangkuman atau ringkasan suatu bacaan secara tepat dan tidak melebar.",
      "Melatih siswa berpikir terstruktur saat menulis, karena setiap paragraf dituntut fokus pada satu ide utama.",
      "Memudahkan guru dan penulis materi ajar menyusun bacaan yang jelas alurnya dan terukur tingkat kesulitannya.",
      "Meningkatkan kemampuan kritis pembaca dalam membedakan ide utama dan ide pendukung saat menganalisis teks.",
    ],
  },
];
