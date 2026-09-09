// Salawat (Blessings upon Prophet) data with Turkish translations
export interface Salawat {
  id: string;
  name: string;
  nameTr: string;
  arabic: string;
  transliteration: string;
  transliterationTr: string;
  translation: string;
  translationTr: string;
  benefits: string;
  benefitsTr: string;
  source?: string;
  category: 'basic' | 'special' | 'blessed_times' | 'comprehensive';
  audioUrl?: string;
}

export interface SalawatCategory {
  id: string;
  name: string;
  nameTr: string;
  description: string;
  descriptionTr: string;
  icon: string;
}

// Salawat categories
export const salawatCategories: SalawatCategory[] = [
  {
    id: 'basic',
    name: 'Basic Salawat',
    nameTr: 'Temel Salavat',
    description: 'Essential blessings upon the Prophet',
    descriptionTr: 'Peygamber Efendimize temel salavat',
    icon: 'star-outline'
  },
  {
    id: 'special',
    name: 'Special Occasions',
    nameTr: 'Özel Durumlar',
    description: 'Salawat for special times and needs',
    descriptionTr: 'Özel zamanlar ve ihtiyaçlar için salavat',
    icon: 'gift-outline'
  },
  {
    id: 'blessed_times',
    name: 'Blessed Times',
    nameTr: 'Mübarek Zamanlar',
    description: 'Salawat for blessed days and nights',
    descriptionTr: 'Mübarek gün ve geceler için salavat',
    icon: 'moon-outline'
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive',
    nameTr: 'Kapsamlı Salavat',
    description: 'Detailed and comprehensive salawat',
    descriptionTr: 'Detaylı ve kapsamlı salavat',
    icon: 'book-outline'
  }
];

// Comprehensive Salawat collection
export const salawatCollection: Salawat[] = [
  // Basic Salawat
  {
    id: 'basic_salawat_1',
    name: 'Simple Salawat',
    nameTr: 'Basit Salavat',
    arabic: 'صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ',
    transliteration: 'Sallallahu alayhi wa sallam',
    transliterationTr: 'Sallallahu aleyhi ve sellem',
    translation: 'May Allah bless him and grant him peace',
    translationTr: 'Allah ona salat ve selam etsin',
    benefits: 'Basic form of sending blessings',
    benefitsTr: 'Salavat getirmenin temel şekli',
    category: 'basic'
  },
  {
    id: 'basic_salawat_2',
    name: 'Salawat with Family',
    nameTr: 'Ailesi ile Salavat',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    transliteration: 'Allahumma salli ala Muhammadin wa ala ali Muhammad',
    transliterationTr: 'Allahümme salli ala Muhammedin ve ala ali Muhammed',
    translation: 'O Allah, send blessings upon Muhammad and upon the family of Muhammad',
    translationTr: 'Allah\'ım, Muhammed\'e ve Muhammed\'in ailesine salat et',
    benefits: 'Includes blessings for Prophet\'s family',
    benefitsTr: 'Peygamber\'in ailesi için de dua içerir',
    source: 'Sahih Bukhari',
    category: 'basic'
  },
  {
    id: 'basic_salawat_3',
    name: 'Complete Salawat',
    nameTr: 'Tam Salavat',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    transliteration: 'Allahumma salli ala Muhammadin wa ala ali Muhammadin kama sallayta ala Ibrahima wa ala ali Ibrahima innaka Hamidun Majid',
    transliterationTr: 'Allahümme salli ala Muhammedin ve ala ali Muhammed, kema salleyte ala İbrahime ve ala ali İbrahim, inneke Hamidün Mecid',
    translation: 'O Allah, send blessings upon Muhammad and his family as You sent blessings upon Ibrahim and his family. Indeed, You are Praiseworthy and Glorious',
    translationTr: 'Allah\'ım, Muhammed\'e ve ailesine, İbrahim\'e ve ailesine salat ettiğin gibi salat et. Şüphesiz Sen övgüye layık ve yücesin',
    benefits: 'Complete form taught by Prophet (PBUH)',
    benefitsTr: 'Peygamber Efendimizin öğrettiği tam şekil',
    source: 'Sahih Bukhari, Sahih Muslim',
    category: 'basic'
  },

  // Special Occasions
  {
    id: 'special_salawat_1',
    name: 'Salawat for Difficulties',
    nameTr: 'Sıkıntı için Salavat',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ النَّبِيِّ الْأُمِّيِّ وَعَلَى آلِهِ وَسَلِّمْ تَسْلِيمًا',
    transliteration: 'Allahumma salli ala Muhammadin an-nabiyyi al-ummiyyi wa ala alihi wa sallim taslima',
    transliterationTr: 'Allahümme salli ala Muhammedin en-nebiyyil ümmiyyi ve ala alihi ve sellim teslimen',
    translation: 'O Allah, send blessings upon Muhammad, the unlettered Prophet, and upon his family, and grant them peace completely',
    translationTr: 'Allah\'ım, ümmi Peygamber Muhammed\'e ve ailesine salat et ve tam bir selam ver',
    benefits: 'Helps in times of difficulty and distress',
    benefitsTr: 'Sıkıntı ve darlık zamanlarında yardımcı olur',
    source: 'Ibn Majah',
    category: 'special'
  },
  {
    id: 'special_salawat_2',
    name: 'Salawat for Forgiveness',
    nameTr: 'Bağışlanma için Salavat',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ عَبْدِكَ وَرَسُولِكَ النَّبِيِّ الْأُمِّيِّ',
    transliteration: 'Allahumma salli ala Muhammadin abdika wa rasulika an-nabiyyi al-ummiyy',
    transliterationTr: 'Allahümme salli ala Muhammed abdike ve resulike en-nebiyyil ümmiyy',
    translation: 'O Allah, send blessings upon Muhammad, Your servant and messenger, the unlettered Prophet',
    translationTr: 'Allah\'ım, kulun ve elçin olan ümmi Peygamber Muhammed\'e salat et',
    benefits: 'Seeking forgiveness through Prophet\'s intercession',
    benefitsTr: 'Peygamber\'in şefaati ile bağışlanma dileği',
    category: 'special'
  },

  // Blessed Times
  {
    id: 'blessed_salawat_1',
    name: 'Friday Salawat',
    nameTr: 'Cuma Salavat',
    arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ',
    transliteration: 'Allahumma salli wa sallim wa barik ala sayyidina Muhammad',
    transliterationTr: 'Allahümme salli ve sellim ve barik ala seyyidina Muhammed',
    translation: 'O Allah, send blessings, peace, and benedictions upon our master Muhammad',
    translationTr: 'Allah\'ım, efendimiz Muhammed\'e salat, selam ve bereket ver',
    benefits: 'Special virtue when recited on Friday',
    benefitsTr: 'Cuma günü okunduğunda özel fazilet',
    category: 'blessed_times'
  },
  {
    id: 'blessed_salawat_2',
    name: 'Night of Power Salawat',
    nameTr: 'Kadir Gecesi Salavat',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ فِي الْأَوَّلِينَ وَصَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ فِي الْآخِرِينَ',
    transliteration: 'Allahumma salli ala Muhammadin wa ala ali Muhammadin fil awwalin wa salli ala Muhammadin wa ala ali Muhammadin fil akhirin',
    transliterationTr: 'Allahümme salli ala Muhammedin ve ala ali Muhammed fil evvelin ve salli ala Muhammedin ve ala ali Muhammed fil ahirin',
    translation: 'O Allah, send blessings upon Muhammad and his family among the first ones, and send blessings upon Muhammad and his family among the last ones',
    translationTr: 'Allah\'ım, Muhammed\'e ve ailesine evvelkilerde salat et ve Muhammed\'e ve ailesine ahiretkilerde salat et',
    benefits: 'Especially beneficial during Laylat al-Qadr',
    benefitsTr: 'Kadir Gecesi\'nde özellikle faydalı',
    category: 'blessed_times'
  },

  // Comprehensive Salawat
  {
    id: 'comprehensive_salawat_1',
    name: 'Salawat Nariyya',
    nameTr: 'Salavat-ı Nariye',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ الَّذِي تَنْحَلُّ بِهِ الْعُقَدُ وَتَنْفَرِجُ بِهِ الْكُرَبُ وَتُقْضَى بِهِ الْحَوَائِجُ وَتُنَالُ بِهِ الرَّغَائِبُ وَحُسْنُ الْخَوَاتِيمِ وَيُسْتَسْقَى الْغَمَامُ بِوَجْهِهِ الْكَرِيمِ وَعَلَى آلِهِ وَصَحْبِهِ فِي كُلِّ لَمْحَةٍ وَنَفَسٍ بِعَدَدِ كُلِّ مَعْلُومٍ لَكَ',
    transliteration: 'Allahumma salli ala sayyidina Muhammadin allazi tanhallu bihil uqad wa tanfarju bihil kurab wa tuqda bihil hawaaij wa tunaalu bihir raghaaib wa husn al-khawaatim wa yustasqal ghamaamu bi wajhihil karim wa ala aalihi wa sahbihi fi kulli lamhatin wa nafasin bi adadi kulli maloomin lak',
    transliterationTr: 'Allahümme salli ala seyyidina Muhammedin ellezi tenhallu bihil ukad ve tenfericu bihil küreb ve tukda bihil havaaic ve tunaalu bihir regaaib ve hüsnül havatim ve yüsteskal gamaamu bi vechihil kerim ve ala alihi ve sahbihi fi külli lemhatin ve nefesin bi adedi külli ma\'lumin lek',
    translation: 'O Allah, send blessings upon our master Muhammad, through whom difficulties are resolved, sorrows are relieved, needs are fulfilled, desires are attained, good endings are reached, and rain is sought through his noble face, and upon his family and companions, in every glance and breath, by the number of everything known to You',
    translationTr: 'Allah\'ım, efendimiz Muhammed\'e salat et ki, onun sayesinde düğümler çözülür, sıkıntılar giderilir, ihtiyaçlar karşılanır, istekler elde edilir, güzel sonlar nasip olur ve onun mübarek yüzü vesilesiyle yağmur istenir. Ailesine ve ashabına da her an ve nefeste, senin bildiğin her şey sayısınca salat et',
    benefits: 'Powerful salawat for resolving difficulties',
    benefitsTr: 'Sıkıntıları çözmek için güçlü salavat',
    category: 'comprehensive'
  },
  {
    id: 'comprehensive_salawat_2',
    name: 'Salawat Fatih',
    nameTr: 'Salavat-ı Fatih',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ الْفَاتِحِ لِمَا أُغْلِقَ وَالْخَاتِمِ لِمَا سَبَقَ نَاصِرِ الْحَقِّ بِالْحَقِّ وَالْهَادِي إِلَى صِرَاطِكَ الْمُسْتَقِيمِ وَعَلَى آلِهِ حَقَّ قَدْرِهِ وَمِقْدَارِهِ الْعَظِيمِ',
    transliteration: 'Allahumma salli ala sayyidina Muhammadin al-faatihi lima ughliq wal khaatimi lima sabaq naasir al-haqqi bil haqq wal haadi ila siraatikal mustaqim wa ala aalihi haqqa qadrihi wa miqdaarihil azim',
    transliterationTr: 'Allahümme salli ala seyyidina Muhammedin el-fatihi lima uglik vel hatimi lima sebak nasıril hakkı bil hakk vel hadi ila sıratıkel müstakim ve ala alihi hakka kadrihi ve mikdarihil azim',
    translation: 'O Allah, send blessings upon our master Muhammad, the opener of what was closed, the seal of what went before, the helper of truth by truth, the guide to Your straight path, and upon his family according to his worth and his magnificent rank',
    translationTr: 'Allah\'ım, efendimiz Muhammed\'e salat et; o kapalı olanı açan, öncekini mühürleyen, hakkı hakla destekleyen, dosdoğru yoluna hidayet eden ve ailesine onun değeri ve büyük makamı hakkıyla salat et',
    benefits: 'Opens doors of mercy and blessings',
    benefitsTr: 'Rahmet ve bereket kapılarını açar',
    category: 'comprehensive'
  }
];

// Helper functions
export const getSalawatByCategory = (categoryId: string): Salawat[] => {
  return salawatCollection.filter(salawat => salawat.category === categoryId);
};

export const getSalawatById = (id: string): Salawat | undefined => {
  return salawatCollection.find(salawat => salawat.id === id);
};

export const getAllSalawat = (): Salawat[] => {
  return salawatCollection;
};

export const getRandomSalawat = (): Salawat => {
  const randomIndex = Math.floor(Math.random() * salawatCollection.length);
  return salawatCollection[randomIndex];
};
