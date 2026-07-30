// Daily Verse data for meaningful Quranic verses
export interface DailyVerse {
  id: number;
  surahNumber: number;
  surahName: string;
  surahNameTr: string;
  ayahNumber: number;
  arabic: string;
  transliteration: string;
  turkish: string;
  english: string;
  theme: string;
  revelation: 'Meccan' | 'Medinan';
}

export const dailyVerses: DailyVerse[] = [
  {
    id: 1,
    surahNumber: 2,
    surahName: "Al-Baqarah",
    surahNameTr: "Bakara",
    ayahNumber: 255,
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
    transliteration: "Allahu la ilaha illa huwal hayyul qayyum. La ta'khuzuhu sinatun wa la nawm. Lahu ma fis samawati wa ma fil ard.",
    turkish: "Allah, O'ndan başka ilah yoktur. O diridir, kayyumdur. O'nu ne uyuklama alır, ne de uyku. Göklerde ve yerde ne varsa hepsi O'nundur.",
    english: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.",
    theme: "Allah'ın Sıfatları",
    revelation: "Medinan"
  },
  {
    id: 2,
    surahNumber: 1,
    surahName: "Al-Fatiha",
    surahNameTr: "Fatiha",
    ayahNumber: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    transliteration: "Alhamdu lillahi rabbil alameen",
    turkish: "Hamd, âlemlerin Rabbi Allah'a mahsustur.",
    english: "All praise is due to Allah, Lord of the worlds.",
    theme: "Hamd ve Şükür",
    revelation: "Meccan"
  },
  {
    id: 3,
    surahNumber: 2,
    surahName: "Al-Baqarah",
    surahNameTr: "Bakara",
    ayahNumber: 286,
    arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ",
    transliteration: "La yukallifu Allahu nafsan illa wus'aha. Laha ma kasabat wa 'alayha ma iktasabat.",
    turkish: "Allah hiç kimseyi gücünün yetmeyeceği şeyle yükümlü kılmaz. Herkesin kazandığı iyilik kendi yararına, kötülük de kendi zararınadır.",
    english: "Allah does not charge a soul except [with that within] its capacity. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned.",
    theme: "Allah'ın Adaleti",
    revelation: "Medinan"
  },
  {
    id: 4,
    surahNumber: 3,
    surahName: "Al-Imran",
    surahNameTr: "Al-i İmran",
    ayahNumber: 200,
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا وَرَابِطُوا وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ",
    transliteration: "Ya ayyuhal lazeena amanu isbiru wa sabiru wa rabitu wattaqullaha la'allakum tuflihun",
    turkish: "Ey iman edenler! Sabırlı olun, sabrınızı sürdürün, (düşmana karşı) hazırlıklı bulunun ve Allah'tan sakının ki kurtuluşa erişesiniz.",
    english: "O you who believe! Persevere in patience and constancy; vie in such perseverance; strengthen each other; and fear Allah; that you may prosper.",
    theme: "Sabır ve Takva",
    revelation: "Medinan"
  },
  {
    id: 5,
    surahNumber: 17,
    surahName: "Al-Isra",
    surahNameTr: "İsra",
    ayahNumber: 23,
    arabic: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا",
    transliteration: "Wa qada rabbuka alla ta'budu illa iyyahu wa bil walidayni ihsana",
    turkish: "Rabbin, yalnız O'na kulluk etmenizi ve anne-babanıza iyilik yapmanızı emretti.",
    english: "Your Lord has decreed that you worship none but Him, and be kind to parents.",
    theme: "Anne-Baba Hakkı",
    revelation: "Meccan"
  },
  {
    id: 6,
    surahNumber: 49,
    surahName: "Al-Hujurat",
    surahNameTr: "Hucurat",
    ayahNumber: 13,
    arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا ۚ إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ",
    transliteration: "Ya ayyuhan nasu inna khalaqnakum min zakarin wa unsa wa ja'alnakum shu'uban wa qaba'ila lita'arafu inna akramakum 'indallahi atqakum",
    turkish: "Ey insanlar! Şüphesiz biz sizi bir erkek ve bir dişiden yarattık ve birbirinizi tanımanız için sizi kavimlere ve kabilelere ayırdık. Şüphesiz Allah katında en değerli olanınız en takvalı olanınızdır.",
    english: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another. Indeed, the most noble of you in the sight of Allah is the most righteous of you.",
    theme: "İnsan Kardeşliği",
    revelation: "Medinan"
  },
  {
    id: 7,
    surahNumber: 24,
    surahName: "An-Nur",
    surahNameTr: "Nur",
    ayahNumber: 35,
    arabic: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ ۚ مَثَلُ نُورِهِ كَمِشْكَاةٍ فِيهَا مِصْبَاحٌ",
    transliteration: "Allahu nurus samawati wal ard. Masalu nurihi ka mishkatin fiha misbah",
    turkish: "Allah göklerin ve yerin nurudur. O'nun nurunun misali, içinde kandil bulunan bir kandillik gibidir.",
    english: "Allah is the light of the heavens and the earth. The example of His light is like a niche within which is a lamp.",
    theme: "Allah'ın Nuru",
    revelation: "Medinan"
  },
  {
    id: 8,
    surahNumber: 55,
    surahName: "Ar-Rahman",
    surahNameTr: "Rahman",
    ayahNumber: 13,
    arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
    transliteration: "Fabi ayyi ala'i rabbikuma tukazziban",
    turkish: "O halde Rabbinizin hangi nimetlerini yalanlar sayıyorsunuz?",
    english: "So which of the favors of your Lord would you deny?",
    theme: "Allah'ın Nimetleri",
    revelation: "Meccan"
  },
  {
    id: 9,
    surahNumber: 94,
    surahName: "Ash-Sharh",
    surahNameTr: "İnşirah",
    ayahNumber: 5,
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    transliteration: "Fa inna ma'al 'usri yusra",
    turkish: "Şüphesiz güçlükle beraber kolaylık vardır.",
    english: "For indeed, with hardship [will be] ease.",
    theme: "Umut ve Teselli",
    revelation: "Meccan"
  },
  {
    id: 10,
    surahNumber: 103,
    surahName: "Al-Asr",
    surahNameTr: "Asr",
    ayahNumber: 3,
    arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
    transliteration: "Illal lazeena amanu wa 'amilus salihati wa tawasaw bil haqqi wa tawasaw bis sabr",
    turkish: "Ancak iman edip salih ameller işleyen, birbirlerine hakkı tavsiye eden ve birbirlerine sabrı tavsiye edenler başka.",
    english: "Except for those who believe and do righteous deeds and advise each other to truth and advise each other to patience.",
    theme: "Kurtuluş Yolu",
    revelation: "Meccan"
  },
  {
    id: 11,
    surahNumber: 112,
    surahName: "Al-Ikhlas",
    surahNameTr: "İhlas",
    ayahNumber: 1,
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    transliteration: "Qul huwallahu ahad",
    turkish: "De ki: O Allah birdir.",
    english: "Say, He is Allah, [who is] One.",
    theme: "Tevhid",
    revelation: "Meccan"
  },
  {
    id: 12,
    surahNumber: 36,
    surahName: "Ya-Sin",
    surahNameTr: "Yasin",
    ayahNumber: 82,
    arabic: "إِنَّمَا أَمْرُهُ إِذَا أَرَادَ شَيْئًا أَن يَقُولَ لَهُ كُن فَيَكُونُ",
    transliteration: "Innama amruhu iza arada shay'an an yaqula lahu kun fayakun",
    turkish: "O'nun emri, bir şeyi dilediği zaman, ona sadece 'Ol!' demesidir. O da hemen oluverir.",
    english: "His command is only when He intends a thing that He says to it, 'Be,' and it is.",
    theme: "Allah'ın Kudreti",
    revelation: "Meccan"
  },
  {
    id: 13,
    surahNumber: 67,
    surahName: "Al-Mulk",
    surahNameTr: "Mülk",
    ayahNumber: 2,
    arabic: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا",
    transliteration: "Allazi khalaqal mawta wal hayata liyabluwakum ayyukum ahsanu 'amala",
    turkish: "Hanginizin daha güzel amel işleyeceğini denemek için ölümü ve hayatı yaratan O'dur.",
    english: "Who created death and life to test you [as to] which of you is best in deed.",
    theme: "Hayatın Amacı",
    revelation: "Meccan"
  },
  {
    id: 14,
    surahNumber: 25,
    surahName: "Al-Furqan",
    surahNameTr: "Furkan",
    ayahNumber: 63,
    arabic: "وَعِبَادُ الرَّحْمَٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا وَإِذَا خَاطَبَهُمُ الْجَاهِلُونَ قَالُوا سَلَامًا",
    transliteration: "Wa 'ibadur rahmani allazeena yamshoona 'alal ardi hawnan wa iza khatabahum ul jahiloona qalu salama",
    turkish: "Rahman'ın kulları, yeryüzünde alçakgönüllülükle yürüyen ve cahiller kendileriyle konuştuğu zaman 'Selam' diyenlerdir.",
    english: "And the servants of the Most Merciful are those who walk upon the earth easily, and when the ignorant address them [harshly], they say [words of] peace.",
    theme: "Mümin Ahlakı",
    revelation: "Meccan"
  },
  {
    id: 15,
    surahNumber: 39,
    surahName: "Az-Zumar",
    surahNameTr: "Zümer",
    ayahNumber: 53,
    arabic: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا",
    transliteration: "Qul ya 'ibadiya allazeena asrafu 'ala anfusihim la taqnatu min rahmatillah. Innallaha yaghfirudh dhunuba jamee'a",
    turkish: "De ki: Ey kendi aleyhlerine aşırı giden kullarım! Allah'ın rahmetinden ümit kesmeyin. Şüphesiz Allah bütün günahları bağışlar.",
    english: "Say, O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins.",
    theme: "Allah'ın Mağfireti",
    revelation: "Meccan"
  }
];

export const getDailyVerse = (dayOfYear: number): DailyVerse => {
  const index = (dayOfYear - 1) % dailyVerses.length;
  return dailyVerses[index];
};

export const getRandomVerse = (): DailyVerse => {
  const randomIndex = Math.floor(Math.random() * dailyVerses.length);
  return dailyVerses[randomIndex];
};

export const getVersesByTheme = (theme: string): DailyVerse[] => {
  return dailyVerses.filter(verse => verse.theme === theme);
};

export const getVersesBySurah = (surahNumber: number): DailyVerse[] => {
  return dailyVerses.filter(verse => verse.surahNumber === surahNumber);
};
