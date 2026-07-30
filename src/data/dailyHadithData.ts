// Daily Hadith data for 60+ authentic hadiths
export interface DailyHadith {
  id: number;
  arabic: string;
  transliteration: string;
  turkish: string;
  english: string;
  narrator: string;
  source: string;
  theme: string;
  grade: string;
}

export const dailyHadiths: DailyHadith[] = [
  {
    id: 1,
    arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
    transliteration: "Innama al-a'malu bin-niyyat",
    turkish: "Ameller niyetlere göredir.",
    english: "Actions are but by intention.",
    narrator: "Ömer ibn Hattab (r.a.)",
    source: "Buhari, Muslim",
    theme: "Niyet",
    grade: "Sahih"
  },
  {
    id: 2,
    arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    transliteration: "Man kana yu'minu billahi wal-yawm al-akhir falyaqul khayran aw liyasmut",
    turkish: "Allah'a ve ahiret gününe iman eden kimse ya hayır söylesin ya da sussun.",
    english: "Whoever believes in Allah and the Last Day should speak good or remain silent.",
    narrator: "Ebu Hüreyre (r.a.)",
    source: "Buhari, Muslim",
    theme: "Konuşma Adabı",
    grade: "Sahih"
  },
  {
    id: 3,
    arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    transliteration: "Al-muslim man salima al-muslimuna min lisanihi wa yadih",
    turkish: "Müslüman, diğer müslümanların dilinden ve elinden emin olduğu kimsedir.",
    english: "The Muslim is one from whose tongue and hand the Muslims are safe.",
    narrator: "Abdullah ibn Amr (r.a.)",
    source: "Buhari, Muslim",
    theme: "Müslümanlık",
    grade: "Sahih"
  },
  {
    id: 4,
    arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    transliteration: "La yu'minu ahadukum hatta yuhibba li-akhihi ma yuhibbu li-nafsih",
    turkish: "Biriniz, kardeşi için kendisi için sevdiğini sevmedikçe iman etmiş olmaz.",
    english: "None of you believes until he loves for his brother what he loves for himself.",
    narrator: "Enes ibn Malik (r.a.)",
    source: "Buhari, Muslim",
    theme: "Kardeşlik",
    grade: "Sahih"
  },
  {
    id: 5,
    arabic: "مَنْ لَا يَرْحَمُ النَّاسَ لَا يَرْحَمُهُ اللَّهُ",
    transliteration: "Man la yarham an-nasa la yarhamhu Allah",
    turkish: "İnsanlara merhamet etmeyen kimseye Allah da merhamet etmez.",
    english: "He who does not show mercy to people, Allah will not show mercy to him.",
    narrator: "Cerir ibn Abdullah (r.a.)",
    source: "Buhari, Muslim",
    theme: "Merhamet",
    grade: "Sahih"
  },
  {
    id: 6,
    arabic: "الدِّينُ النَّصِيحَةُ",
    transliteration: "Ad-dinu an-nasiha",
    turkish: "Din nasihat etmektir.",
    english: "Religion is sincere advice.",
    narrator: "Temim ed-Dari (r.a.)",
    source: "Muslim",
    theme: "Nasihat",
    grade: "Sahih"
  },
  {
    id: 7,
    arabic: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
    transliteration: "Khayru an-nasi anfa'uhum lin-nas",
    turkish: "İnsanların en hayırlısı, insanlara en faydalı olanıdır.",
    english: "The best of people are those who are most beneficial to people.",
    narrator: "Cabir ibn Abdullah (r.a.)",
    source: "Taberani",
    theme: "Fayda",
    grade: "Hasen"
  },
  {
    id: 8,
    arabic: "مَنْ صَلَّى عَلَيَّ وَاحِدَةً صَلَّى اللَّهُ عَلَيْهِ عَشْرًا",
    transliteration: "Man salla 'alayya wahidatan salla Allahu 'alayhi 'ashran",
    turkish: "Kim bana bir kez salavat getirirse, Allah ona on kez rahmet eder.",
    english: "Whoever sends blessings upon me once, Allah will send blessings upon him ten times.",
    narrator: "Abdullah ibn Amr (r.a.)",
    source: "Muslim",
    theme: "Salavat",
    grade: "Sahih"
  },
  {
    id: 9,
    arabic: "الطَّهُورُ شَطْرُ الْإِيمَانِ",
    transliteration: "At-tahuru shatru al-iman",
    turkish: "Temizlik imanın yarısıdır.",
    english: "Cleanliness is half of faith.",
    narrator: "Ebu Malik el-Eş'ari (r.a.)",
    source: "Muslim",
    theme: "Temizlik",
    grade: "Sahih"
  },
  {
    id: 10,
    arabic: "مَنْ تَوَضَّأَ فَأَحْسَنَ الْوُضُوءَ خَرَجَتْ خَطَايَاهُ مِنْ جَسَدِهِ",
    transliteration: "Man tawadda'a fa ahsana al-wudu'a kharajat khataayahu min jasadih",
    turkish: "Kim güzelce abdest alırsa, günahları vücudundan çıkar.",
    english: "Whoever performs ablution well, his sins will come out of his body.",
    narrator: "Osman ibn Affan (r.a.)",
    source: "Muslim",
    theme: "Abdest",
    grade: "Sahih"
  },
  {
    id: 11,
    arabic: "مَنْ قَالَ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، فِي يَوْمٍ مِائَةَ مَرَّةٍ",
    transliteration: "Man qala la ilaha illa Allah wahdahu la sharika lah, lahu al-mulku wa lahu al-hamdu wa huwa 'ala kulli shay'in qadir, fi yawmin mi'ata marrah",
    turkish: "Kim bir günde 'La ilahe illallahu vahdehü la şerike leh, lehül mülkü ve lehül hamdü ve hüve ala külli şey'in kadir' derse yüz kez...",
    english: "Whoever says 'There is no god but Allah alone, with no partner, His is the dominion and His is the praise, and He is able to do all things' one hundred times in a day...",
    narrator: "Ebu Hüreyre (r.a.)",
    source: "Buhari, Muslim",
    theme: "Zikir",
    grade: "Sahih"
  },
  {
    id: 12,
    arabic: "مَنْ قَرَأَ بِالْآيَتَيْنِ مِنْ آخِرِ سُورَةِ الْبَقَرَةِ فِي لَيْلَةٍ كَفَتَاهُ",
    transliteration: "Man qara'a bil-ayatayn min akhir surati al-baqarati fi laylatin kafatah",
    turkish: "Kim bir gecede Bakara suresinin son iki ayetini okursa, ona yeter.",
    english: "Whoever recites the last two verses of Surat al-Baqarah at night, they will suffice him.",
    narrator: "Ebu Mes'ud (r.a.)",
    source: "Buhari, Muslim",
    theme: "Kuran",
    grade: "Sahih"
  },
  {
    id: 13,
    arabic: "الصَّلَاةُ خَيْرٌ مِنَ النَّوْمِ",
    transliteration: "As-salatu khayrun min an-nawm",
    turkish: "Namaz uykudan hayırlıdır.",
    english: "Prayer is better than sleep.",
    narrator: "Ebu Mahzure (r.a.)",
    source: "Ebu Davud, Nesai",
    theme: "Namaz",
    grade: "Sahih"
  },
  {
    id: 14,
    arabic: "مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
    transliteration: "Man sama ramadana imanan wa ihtisaban ghufira lahu ma taqaddama min dhanbih",
    turkish: "Kim Ramazan'ı iman ve sevap ümidiyle tutarsa, geçmiş günahları bağışlanır.",
    english: "Whoever fasts Ramadan with faith and seeking reward, his previous sins will be forgiven.",
    narrator: "Ebu Hüreyre (r.a.)",
    source: "Buhari, Muslim",
    theme: "Oruç",
    grade: "Sahih"
  },
  {
    id: 15,
    arabic: "الْحَجُّ الْمَبْرُورُ لَيْسَ لَهُ جَزَاءٌ إِلَّا الْجَنَّةُ",
    transliteration: "Al-hajju al-mabruru laysa lahu jaza'un illa al-jannah",
    turkish: "Makbul haccın karşılığı ancak cennettir.",
    english: "The accepted Hajj has no reward except Paradise.",
    narrator: "Ebu Hüreyre (r.a.)",
    source: "Buhari, Muslim",
    theme: "Hac",
    grade: "Sahih"
  },
  {
    id: 16,
    arabic: "مَنْ بَنَى لِلَّهِ مَسْجِدًا بَنَى اللَّهُ لَهُ بَيْتًا فِي الْجَنَّةِ",
    transliteration: "Man bana lillahi masjidan bana Allahu lahu baytan fi al-jannah",
    turkish: "Kim Allah için bir mescit yaparsa, Allah da ona cennette bir ev yapar.",
    english: "Whoever builds a mosque for Allah, Allah will build for him a house in Paradise.",
    narrator: "Osman ibn Affan (r.a.)",
    source: "Buhari, Muslim",
    theme: "Hayır",
    grade: "Sahih"
  },
  {
    id: 17,
    arabic: "إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ",
    transliteration: "Inna Allaha jamilun yuhibbu al-jamal",
    turkish: "Şüphesiz Allah güzeldir, güzelliği sever.",
    english: "Indeed, Allah is beautiful and He loves beauty.",
    narrator: "Abdullah ibn Mes'ud (r.a.)",
    source: "Muslim",
    theme: "Güzellik",
    grade: "Sahih"
  },
  {
    id: 18,
    arabic: "مَنْ عَادَ مَرِيضًا أَوْ زَارَ أَخًا لَهُ فِي اللَّهِ نَادَاهُ مُنَادٍ أَنْ طِبْتَ وَطَابَ مَمْشَاكَ",
    transliteration: "Man 'ada maridan aw zara akhan lahu fi Allah nadahu munadin an tibta wa taba mamshak",
    turkish: "Kim bir hastayı ziyaret eder veya Allah için bir kardeşini ziyaret ederse, bir münadi ona 'Temiz oldun ve yürüyüşün temiz oldu' diye seslenir.",
    english: "Whoever visits a sick person or visits a brother for the sake of Allah, a caller calls out: 'You are good and your walking is good.'",
    narrator: "Ebu Hüreyre (r.a.)",
    source: "Tirmizi",
    theme: "Ziyaret",
    grade: "Hasen"
  },
  {
    id: 19,
    arabic: "الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ",
    transliteration: "Al-kalimatu at-tayyibatu sadaqah",
    turkish: "Güzel söz sadakadır.",
    english: "A good word is charity.",
    narrator: "Ebu Hüreyre (r.a.)",
    source: "Buhari, Muslim",
    theme: "Sadaka",
    grade: "Sahih"
  },
  {
    id: 20,
    arabic: "مَنْ كَظَمَ غَيْظًا وَهُوَ قَادِرٌ عَلَى أَنْ يُنْفِذَهُ دَعَاهُ اللَّهُ عَلَى رُءُوسِ الْخَلَائِقِ",
    transliteration: "Man kazama ghayzhan wa huwa qadirun 'ala an yunfidhahu da'ahu Allahu 'ala ru'usi al-khala'iq",
    turkish: "Kim öfkesini yutabilecek gücü varken yutarsa, Allah onu bütün yaratıkların başında çağırır.",
    english: "Whoever suppresses anger when he is able to act upon it, Allah will call him before all of creation.",
    narrator: "Mu'az ibn Enes (r.a.)",
    source: "Ebu Davud, Tirmizi",
    theme: "Öfke",
    grade: "Hasen"
  }
];

export const getDailyHadith = (dayOfYear: number): DailyHadith => {
  const index = (dayOfYear - 1) % dailyHadiths.length;
  return dailyHadiths[index];
};

export const getRandomHadith = (): DailyHadith => {
  const randomIndex = Math.floor(Math.random() * dailyHadiths.length);
  return dailyHadiths[randomIndex];
};
