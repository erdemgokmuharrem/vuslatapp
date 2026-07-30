// Daily Ayah (Verse) data for 60+ meaningful verses
export interface DailyAyah {
  id: number;
  arabic: string;
  transliteration: string;
  turkish: string;
  english: string;
  surah: string;
  surahNumber: number;
  ayahNumber: number;
  theme: string;
}

export const dailyAyahs: DailyAyah[] = [
  {
    id: 1,
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
    transliteration: "Wa man yattaqillaha yaj'al lahu makhrajan",
    turkish: "Kim Allah'tan korkarsa, Allah ona bir çıkış yolu yaratır.",
    english: "And whoever fears Allah - He will make for him a way out.",
    surah: "At-Talaq",
    surahNumber: 65,
    ayahNumber: 2,
    theme: "Takva ve Kurtuluş"
  },
  {
    id: 2,
    arabic: "وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
    transliteration: "Wa yarzuqhu min haythu la yahtasib",
    turkish: "Ve onu hiç ummadığı yerden rızıklandırır.",
    english: "And will provide for him from where he does not expect.",
    surah: "At-Talaq",
    surahNumber: 65,
    ayahNumber: 3,
    theme: "Rızık ve Tevekkül"
  },
  {
    id: 3,
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    transliteration: "Wa man yatawakkal 'alallahi fahuwa hasbuh",
    turkish: "Kim Allah'a tevekkül ederse, O ona yeter.",
    english: "And whoever relies upon Allah - then He is sufficient for him.",
    surah: "At-Talaq",
    surahNumber: 65,
    ayahNumber: 3,
    theme: "Tevekkül"
  },
  {
    id: 4,
    arabic: "إِنَّ اللَّهَ بَالِغُ أَمْرِهِ",
    transliteration: "Innallaha baligu amrih",
    turkish: "Şüphesiz Allah, işini mutlaka başarır.",
    english: "Indeed, Allah will accomplish His purpose.",
    surah: "At-Talaq",
    surahNumber: 65,
    ayahNumber: 3,
    theme: "Allah'ın Kudreti"
  },
  {
    id: 5,
    arabic: "وَبَشِّرِ الصَّابِرِينَ",
    transliteration: "Wa bashshir as-sabirin",
    turkish: "Sabırlı olanlara müjde ver.",
    english: "And give good tidings to the patient.",
    surah: "Al-Baqarah",
    surahNumber: 2,
    ayahNumber: 155,
    theme: "Sabır"
  },
  {
    id: 6,
    arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
    transliteration: "Wasta'inu bis-sabri was-salah",
    turkish: "Sabır ve namazla yardım isteyin.",
    english: "And seek help through patience and prayer.",
    surah: "Al-Baqarah",
    surahNumber: 2,
    ayahNumber: 45,
    theme: "Sabır ve Namaz"
  },
  {
    id: 7,
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
    transliteration: "Fazkuruni azkurkum",
    turkish: "Beni anın ki ben de sizi anayım.",
    english: "So remember Me; I will remember you.",
    surah: "Al-Baqarah",
    surahNumber: 2,
    ayahNumber: 152,
    theme: "Zikir"
  },
  {
    id: 8,
    arabic: "وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
    transliteration: "Washkuru li wa la takfurun",
    turkish: "Bana şükredin ve nankörlük etmeyin.",
    english: "And be grateful to Me and do not deny Me.",
    surah: "Al-Baqarah",
    surahNumber: 2,
    ayahNumber: 152,
    theme: "Şükür"
  },
  {
    id: 9,
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    transliteration: "Inna ma'al usri yusra",
    turkish: "Şüphesiz zorlukla beraber kolaylık vardır.",
    english: "Indeed, with hardship comes ease.",
    surah: "Ash-Sharh",
    surahNumber: 94,
    ayahNumber: 6,
    theme: "Umut ve Kolaylık"
  },
  {
    id: 10,
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    transliteration: "Fa inna ma'al usri yusra",
    turkish: "Evet, zorlukla beraber mutlaka kolaylık vardır.",
    english: "Indeed, with hardship comes ease.",
    surah: "Ash-Sharh",
    surahNumber: 94,
    ayahNumber: 5,
    theme: "Umut ve Kolaylık"
  }
];

export const getDailyAyah = (dayOfYear: number): DailyAyah => {
  const index = (dayOfYear - 1) % dailyAyahs.length;
  return dailyAyahs[index];
};

export const getRandomAyah = (): DailyAyah => {
  const randomIndex = Math.floor(Math.random() * dailyAyahs.length);
  return dailyAyahs[randomIndex];
};
