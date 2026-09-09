// Beautiful Duas collection with comprehensive Turkish translations
export interface BeautifulDua {
  id: string;
  name: string;
  nameTr: string;
  arabic: string;
  transliteration: string;
  transliterationTr: string;
  translation: string;
  translationTr: string;
  category: 'daily' | 'protection' | 'forgiveness' | 'guidance' | 'health' | 'gratitude' | 'special';
  categoryTr: string;
  occasion: string;
  occasionTr: string;
  benefits: string;
  benefitsTr: string;
  source?: string;
  audioUrl?: string;
}

export interface BeautifulDuaCategory {
  id: string;
  name: string;
  nameTr: string;
  description: string;
  descriptionTr: string;
  icon: string;
}

// Beautiful Dua categories
export const beautifulDuaCategories: BeautifulDuaCategory[] = [
  {
    id: 'daily',
    name: 'Daily Duas',
    nameTr: 'Günlük Dualar',
    description: 'Duas for everyday situations',
    descriptionTr: 'Günlük durumlar için dualar',
    icon: 'sunny-outline'
  },
  {
    id: 'protection',
    name: 'Protection Duas',
    nameTr: 'Korunma Duaları',
    description: 'Duas for seeking Allah\'s protection',
    descriptionTr: 'Allah\'ın korumasını dilemek için dualar',
    icon: 'shield-outline'
  },
  {
    id: 'forgiveness',
    name: 'Forgiveness Duas',
    nameTr: 'Bağışlanma Duaları',
    description: 'Duas for seeking forgiveness',
    descriptionTr: 'Bağışlanma dilemek için dualar',
    icon: 'heart-outline'
  },
  {
    id: 'guidance',
    name: 'Guidance Duas',
    nameTr: 'Hidayet Duaları',
    description: 'Duas for seeking guidance',
    descriptionTr: 'Hidayet dilemek için dualar',
    icon: 'compass-outline'
  },
  {
    id: 'health',
    name: 'Health Duas',
    nameTr: 'Sağlık Duaları',
    description: 'Duas for health and healing',
    descriptionTr: 'Sağlık ve şifa için dualar',
    icon: 'medical-outline'
  },
  {
    id: 'gratitude',
    name: 'Gratitude Duas',
    nameTr: 'Şükür Duaları',
    description: 'Duas for expressing gratitude',
    descriptionTr: 'Şükür ifadesi için dualar',
    icon: 'star-outline'
  },
  {
    id: 'special',
    name: 'Special Occasions',
    nameTr: 'Özel Durumlar',
    description: 'Duas for special occasions',
    descriptionTr: 'Özel durumlar için dualar',
    icon: 'gift-outline'
  }
];

// Comprehensive Beautiful Duas collection
export const beautifulDuas: BeautifulDua[] = [
  // Daily Duas
  {
    id: 'daily_morning',
    name: 'Morning Dua',
    nameTr: 'Sabah Duası',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: 'Asbahna wa asbahal mulku lillahi walhamdu lillahi la ilaha illallahu wahdahu la sharika lah',
    transliterationTr: 'Esbahna ve esbahal mülkü lillahi vel hamdü lillahi la ilahe illallahu vahdehü la şerike leh',
    translation: 'We have reached the morning and with it the dominion belongs to Allah, and praise is to Allah. There is no god but Allah alone, with no partner.',
    translationTr: 'Sabaha eriştik ve mülk Allah\'ındır, hamd Allah\'adır. Allah\'tan başka ilah yoktur, tektir, ortağı yoktur.',
    category: 'daily',
    categoryTr: 'Günlük Dualar',
    occasion: 'Upon waking up in the morning',
    occasionTr: 'Sabah uyandığında',
    benefits: 'Starts the day with remembrance of Allah',
    benefitsTr: 'Güne Allah\'ı anarak başlar',
    source: 'Abu Dawud'
  },
  {
    id: 'daily_evening',
    name: 'Evening Dua',
    nameTr: 'Akşam Duası',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: 'Amsayna wa amsal mulku lillahi walhamdu lillahi la ilaha illallahu wahdahu la sharika lah',
    transliterationTr: 'Emseyna ve emsel mülkü lillahi vel hamdü lillahi la ilahe illallahu vahdehü la şerike leh',
    translation: 'We have reached the evening and with it the dominion belongs to Allah, and praise is to Allah. There is no god but Allah alone, with no partner.',
    translationTr: 'Akşama eriştik ve mülk Allah\'ındır, hamd Allah\'adır. Allah\'tan başka ilah yoktur, tektir, ortağı yoktur.',
    category: 'daily',
    categoryTr: 'Günlük Dualar',
    occasion: 'In the evening',
    occasionTr: 'Akşam vakti',
    benefits: 'Ends the day with gratitude to Allah',
    benefitsTr: 'Güne Allah\'a şükürle son verir',
    source: 'Abu Dawud'
  },
  {
    id: 'daily_eating',
    name: 'Before Eating',
    nameTr: 'Yemek Öncesi',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillah',
    transliterationTr: 'Bismillah',
    translation: 'In the name of Allah',
    translationTr: 'Allah\'ın adıyla',
    category: 'daily',
    categoryTr: 'Günlük Dualar',
    occasion: 'Before eating',
    occasionTr: 'Yemek yemeden önce',
    benefits: 'Seeks Allah\'s blessing on the food',
    benefitsTr: 'Yemeğe Allah\'ın bereket vermesini diler',
    source: 'Sahih Muslim'
  },

  // Protection Duas
  {
    id: 'protection_general',
    name: 'General Protection',
    nameTr: 'Genel Korunma',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration: 'A\'udhu bikalimatillahit tammati min sharri ma khalaq',
    transliterationTr: 'Eûzü bikalimatillahit tammati min şerri ma halak',
    translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created',
    translationTr: 'Allah\'ın mükemmel kelimelerinden, yarattığı şeylerin şerrinden sığınırım',
    category: 'protection',
    categoryTr: 'Korunma Duaları',
    occasion: 'For general protection',
    occasionTr: 'Genel korunma için',
    benefits: 'Protects from all kinds of harm',
    benefitsTr: 'Her türlü zarardan korur',
    source: 'Sahih Muslim'
  },
  {
    id: 'protection_travel',
    name: 'Travel Protection',
    nameTr: 'Yolculuk Korunması',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    transliteration: 'Subhanallazi sakhkhara lana haza wa ma kunna lahu muqrinin wa inna ila rabbina lamunqalibun',
    transliterationTr: 'Sübhanellezi sahhara lena haza ve ma künna lehü mukrinin ve inna ila rabbina lemünkalibun',
    translation: 'Glory to Him who has subjected this to us, and we could never have it [by our efforts]. And indeed we, to our Lord, will [surely] return.',
    translationTr: 'Bunu bize boyun eğdiren Allah\'ı tenzih ederim. Biz buna güç yetiremezdik. Şüphesiz biz Rabbimize döneceğiz.',
    category: 'protection',
    categoryTr: 'Korunma Duaları',
    occasion: 'When starting a journey',
    occasionTr: 'Yolculuğa başlarken',
    benefits: 'Ensures safe travel',
    benefitsTr: 'Güvenli yolculuk sağlar',
    source: 'Quran 43:13-14'
  },

  // Forgiveness Duas
  {
    id: 'forgiveness_sayyid',
    name: 'Master of Istighfar',
    nameTr: 'Seyyidül İstiğfar',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ',
    transliteration: 'Allahumma anta rabbi la ilaha illa anta khalaqtani wa ana abduka wa ana ala ahdika wa wa\'dika mastata\'t',
    transliterationTr: 'Allahümme ente rabbi la ilahe illa ente halakteni ve ene abdüke ve ene ala ahdike ve va\'dike mestate\'t',
    translation: 'O Allah, You are my Lord, there is no god but You. You created me and I am Your servant, and I am faithful to my covenant and promise to You as much as I can.',
    translationTr: 'Allah\'ım, Sen benim Rabbimsin, Senden başka ilah yoktur. Sen beni yarattın, ben Senin kulunum ve gücüm yettiğince ahdime ve sözüme sadığım.',
    category: 'forgiveness',
    categoryTr: 'Bağışlanma Duaları',
    occasion: 'Daily, especially in the morning',
    occasionTr: 'Günlük, özellikle sabahları',
    benefits: 'Most comprehensive prayer for forgiveness',
    benefitsTr: 'Bağışlanma için en kapsamlı dua',
    source: 'Sahih Bukhari'
  },

  // Guidance Duas
  {
    id: 'guidance_istikhara',
    name: 'Istikhara Dua',
    nameTr: 'İstihaре Duası',
    arabic: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ',
    transliteration: 'Allahumma inni astakhiruka bi\'ilmika wa astaqdiruka biqudratik',
    transliterationTr: 'Allahümme inni estahirüke bi ilmike ve estakdirüke bi kudretike',
    translation: 'O Allah, I seek guidance from Your knowledge, and Power from Your Might',
    translationTr: 'Allah\'ım, Senin ilminle hayır dilerim, kudretinle güç dilerim',
    category: 'guidance',
    categoryTr: 'Hidayet Duaları',
    occasion: 'When making important decisions',
    occasionTr: 'Önemli kararlar verirken',
    benefits: 'Seeks Allah\'s guidance in decision making',
    benefitsTr: 'Karar vermede Allah\'ın rehberliğini diler',
    source: 'Sahih Bukhari'
  },

  // Health Duas
  {
    id: 'health_general',
    name: 'General Health',
    nameTr: 'Genel Sağlık',
    arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي اللَّهُمَّ عَافِنِي فِي سَمْعِي اللَّهُمَّ عَافِنِي فِي بَصَرِي',
    transliteration: 'Allahumma afini fi badani, allahumma afini fi sam\'i, allahumma afini fi basari',
    transliterationTr: 'Allahümme afini fi bedeni, allahümme afini fi sem\'i, allahümme afini fi basari',
    translation: 'O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight.',
    translationTr: 'Allah\'ım, bedenimde sağlık ver. Allah\'ım, kulağımda sağlık ver. Allah\'ım, gözümde sağlık ver.',
    category: 'health',
    categoryTr: 'Sağlık Duaları',
    occasion: 'Daily health prayer',
    occasionTr: 'Günlük sağlık duası',
    benefits: 'Seeks complete physical health',
    benefitsTr: 'Tam fiziksel sağlık diler',
    source: 'Abu Dawud'
  },

  // Gratitude Duas
  {
    id: 'gratitude_general',
    name: 'General Gratitude',
    nameTr: 'Genel Şükür',
    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    transliteration: 'Alhamdu lillahi rabbil alamin',
    transliterationTr: 'Elhamdü lillahi rabbil alemin',
    translation: 'All praise is due to Allah, Lord of the worlds',
    translationTr: 'Hamd, alemlerin Rabbi Allah\'a mahsustur',
    category: 'gratitude',
    categoryTr: 'Şükür Duaları',
    occasion: 'Anytime for expressing gratitude',
    occasionTr: 'Şükür ifadesi için her zaman',
    benefits: 'Expresses gratitude to Allah',
    benefitsTr: 'Allah\'a şükür ifade eder',
    source: 'Quran 1:2'
  },

  // Special Occasions
  {
    id: 'special_rain',
    name: 'Prayer for Rain',
    nameTr: 'Yağmur Duası',
    arabic: 'اللَّهُمَّ أَغِثْنَا اللَّهُمَّ أَغِثْنَا اللَّهُمَّ أَغِثْنَا',
    transliteration: 'Allahumma aghithna, allahumma aghithna, allahumma aghithna',
    transliterationTr: 'Allahümme agisna, allahümme agisna, allahümme agisna',
    translation: 'O Allah, send us rain. O Allah, send us rain. O Allah, send us rain.',
    translationTr: 'Allah\'ım, bize yağmur gönder. Allah\'ım, bize yağmur gönder. Allah\'ım, bize yağmur gönder.',
    category: 'special',
    categoryTr: 'Özel Durumlar',
    occasion: 'During drought or need for rain',
    occasionTr: 'Kuraklık zamanında veya yağmur ihtiyacında',
    benefits: 'Seeks Allah\'s mercy through rain',
    benefitsTr: 'Yağmur yoluyla Allah\'ın rahmetini diler',
    source: 'Sahih Bukhari'
  }
];

// Helper functions
export const getBeautifulDuasByCategory = (categoryId: string): BeautifulDua[] => {
  return beautifulDuas.filter(dua => dua.category === categoryId);
};

export const getBeautifulDuaById = (id: string): BeautifulDua | undefined => {
  return beautifulDuas.find(dua => dua.id === id);
};

export const getAllBeautifulDuas = (): BeautifulDua[] => {
  return beautifulDuas;
};

export const searchBeautifulDuas = (query: string): BeautifulDua[] => {
  const lowercaseQuery = query.toLowerCase();
  return beautifulDuas.filter(dua => 
    dua.nameTr.toLowerCase().includes(lowercaseQuery) ||
    dua.name.toLowerCase().includes(lowercaseQuery) ||
    dua.translationTr.toLowerCase().includes(lowercaseQuery) ||
    dua.categoryTr.toLowerCase().includes(lowercaseQuery) ||
    dua.occasionTr.toLowerCase().includes(lowercaseQuery)
  );
};

export const getRandomBeautifulDua = (): BeautifulDua => {
  const randomIndex = Math.floor(Math.random() * beautifulDuas.length);
  return beautifulDuas[randomIndex];
};
