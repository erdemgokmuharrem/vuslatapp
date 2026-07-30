// Types for Daily Worship data
export interface WorshipItem {
  id: string;
  name: string;
  nameTr?: string;
  description: string;
  descriptionTr?: string;
  category: 'morning' | 'evening' | 'daily' | 'weekly' | 'monthly';
  arabic?: string;
  transliteration?: string;
  translation?: string;
  translationTr?: string;
  reference?: string;
  count?: number;
  isRequired?: boolean;
  isSunnah?: boolean;
  reward?: string;
  rewardTr?: string;
}

export interface WorshipCategory {
  id: string;
  name: string;
  nameTr: string;
  description: string;
  descriptionTr: string;
  icon: string;
}

// Worship categories
export const worshipCategories: WorshipCategory[] = [
  {
    id: 'morning',
    name: 'Morning Azkar',
    nameTr: 'Sabah Zikirleri',
    description: 'Remembrances to recite in the morning',
    descriptionTr: 'Sabah okunacak zikir ve dualar',
    icon: 'sunny-outline',
  },
  {
    id: 'evening',
    name: 'Evening Azkar',
    nameTr: 'Akşam Zikirleri',
    description: 'Remembrances to recite in the evening',
    descriptionTr: 'Akşam okunacak zikir ve dualar',
    icon: 'moon-outline',
  },
  {
    id: 'daily',
    name: 'Daily Worship',
    nameTr: 'Günlük İbadetler',
    description: 'Daily acts of worship',
    descriptionTr: 'Her gün yapılacak ibadetler',
    icon: 'calendar-outline',
  },
  {
    id: 'weekly',
    name: 'Weekly Practices',
    nameTr: 'Haftalık İbadetler',
    description: 'Recommended weekly acts of worship',
    descriptionTr: 'Haftada bir yapılması tavsiye edilen ibadetler',
    icon: 'time-outline',
  },
  {
    id: 'monthly',
    name: 'Monthly Goals',
    nameTr: 'Aylık Hedefler',
    description: 'Monthly spiritual goals',
    descriptionTr: 'Aylık manevi hedefler',
    icon: 'trophy-outline',
  },
];

// Morning Azkar
export const morningAzkar: WorshipItem[] = [
  {
    id: 'morning_ayat_kursi',
    name: 'Ayat al-Kursi',
    nameTr: 'Ayetel Kürsi',
    description: 'Recite Ayat al-Kursi after Fajr',
    descriptionTr: 'Sabah namazından sonra Ayetel Kürsi oku',
    category: 'morning',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...',
    transliteration: 'Allahu la ilaha illa huwal hayyul qayyum...',
    translation: 'Allah - there is no deity except Him...',
    translationTr: 'Allah, O\'ndan başka ilah yoktur...',
    reference: 'Quran 2:255',
    count: 1,
    isRequired: false,
    isSunnah: true,
    reward: 'Protection throughout the day',
    rewardTr: 'Gün boyu korunma'
  },
  {
    id: 'morning_2',
    name: 'Surah Al-Ikhlas, Al-Falaq, An-Nas',
    description: 'Recite the last three surahs of the Quran three times each',
    category: 'morning',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَٰهِ النَّاسِ، مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ',
    reference: 'Sahih Al-Bukhari 5017',
    count: 3,
    isSunnah: true,
  },
  {
    id: 'morning_3',
    name: 'Morning Dua',
    description: 'Dua for protection throughout the day',
    category: 'morning',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    transliteration: 'Asbahna wa asbahal mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la shareeka lah...',
    translation: 'We have reached the morning and at this very time all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone, without any partner...',
    reference: 'Muslim 2723',
    count: 1,
    isSunnah: true,
  },
];

// Evening Azkar
export const eveningAzkar: WorshipItem[] = [
  {
    id: 'evening_1',
    name: 'Ayatul Kursi',
    description: 'Recite Ayatul Kursi once in the evening',
    category: 'evening',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    transliteration: 'Allahu la ilaha illa huwal haiyul qaiyum...',
    translation: 'Allah! There is no god but He - the Living, The Self-subsisting, Eternal...',
    reference: 'Quran 2:255',
    count: 1,
    isSunnah: true,
  },
  {
    id: 'evening_2',
    name: 'Surah Al-Ikhlas, Al-Falaq, An-Nas',
    description: 'Recite the last three surahs of the Quran three times each',
    category: 'evening',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَٰهِ النَّاسِ، مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ',
    reference: 'Sahih Al-Bukhari 5017',
    count: 3,
    isSunnah: true,
  },
  {
    id: 'evening_3',
    name: 'Evening Dua',
    description: 'Dua for protection throughout the night',
    category: 'evening',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    transliteration: 'Amsayna wa amsal mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la shareeka lah...',
    translation: 'We have reached the evening and at this very time all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone, without any partner...',
    reference: 'Muslim 2723',
    count: 1,
    isSunnah: true,
  },
];

// Daily worship items
export const dailyWorship: WorshipItem[] = [
  {
    id: 'daily_1',
    name: 'Fajr Prayer',
    description: 'Morning prayer before sunrise',
    category: 'daily',
    isRequired: true,
  },
  {
    id: 'daily_2',
    name: 'Dhuhr Prayer',
    description: 'Noon prayer',
    category: 'daily',
    isRequired: true,
  },
  {
    id: 'daily_3',
    name: 'Asr Prayer',
    description: 'Afternoon prayer',
    category: 'daily',
    isRequired: true,
  },
  {
    id: 'daily_4',
    name: 'Maghrib Prayer',
    description: 'Sunset prayer',
    category: 'daily',
    isRequired: true,
  },
  {
    id: 'daily_5',
    name: 'Isha Prayer',
    description: 'Night prayer',
    category: 'daily',
    isRequired: true,
  },
  {
    id: 'daily_6',
    name: 'Quran Reading',
    description: 'Read at least one page of Quran daily',
    category: 'daily',
    isSunnah: true,
  },
  {
    id: 'daily_7',
    name: 'Dhikr',
    description: 'Remember Allah throughout the day',
    category: 'daily',
    isSunnah: true,
  },
];

// Weekly worship items
export const weeklyWorship: WorshipItem[] = [
  {
    id: 'weekly_1',
    name: 'Friday Prayer',
    description: 'Congregational prayer on Friday',
    category: 'weekly',
    isRequired: true,
  },
  {
    id: 'weekly_2',
    name: 'Surah Al-Kahf',
    description: 'Read Surah Al-Kahf on Friday',
    category: 'weekly',
    isSunnah: true,
  },
  {
    id: 'weekly_3',
    name: 'Monday & Thursday Fasting',
    description: 'Voluntary fasting on Mondays and Thursdays',
    category: 'weekly',
    isSunnah: true,
  },
];

// Monthly worship items
export const monthlyWorship: WorshipItem[] = [
  {
    id: 'monthly_1',
    name: 'Ayyam al-Bid Fasting',
    description: 'Fasting on the 13th, 14th, and 15th of the lunar month',
    category: 'monthly',
    isSunnah: true,
  },
];

// Get all worship items
export const getAllWorshipItems = (): WorshipItem[] => {
  return [
    ...morningAzkar,
    ...eveningAzkar,
    ...dailyWorship,
    ...weeklyWorship,
    ...monthlyWorship,
  ];
};

// Get worship items by category
export const getWorshipItemsByCategory = (category: string): WorshipItem[] => {
  switch (category) {
    case 'morning':
      return morningAzkar;
    case 'evening':
      return eveningAzkar;
    case 'daily':
      return dailyWorship;
    case 'weekly':
      return weeklyWorship;
    case 'monthly':
      return monthlyWorship;
    default:
      return [];
  }
};

// Get worship item by ID
export const getWorshipItemById = (id: string): WorshipItem | undefined => {
  return getAllWorshipItems().find(item => item.id === id);
};
