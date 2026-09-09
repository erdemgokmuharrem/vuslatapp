// Prayer Duas (Namaz Duaları) with comprehensive Turkish translations
export interface PrayerDua {
  id: string;
  name: string;
  nameTr: string;
  arabic: string;
  transliteration: string;
  transliterationTr: string;
  translation: string;
  translationTr: string;
  category: 'opening' | 'ruku' | 'sujud' | 'sitting' | 'closing' | 'sunnah';
  position: string;
  positionTr: string;
  when: string;
  whenTr: string;
  source?: string;
  isRequired: boolean;
  audioUrl?: string;
}

export interface PrayerDuaCategory {
  id: string;
  name: string;
  nameTr: string;
  description: string;
  descriptionTr: string;
  icon: string;
}

// Prayer Dua categories
export const prayerDuaCategories: PrayerDuaCategory[] = [
  {
    id: 'opening',
    name: 'Opening Duas',
    nameTr: 'Açılış Duaları',
    description: 'Duas recited at the beginning of prayer',
    descriptionTr: 'Namazın başında okunan dualar',
    icon: 'play-circle-outline'
  },
  {
    id: 'ruku',
    name: 'Ruku Duas',
    nameTr: 'Rükû Duaları',
    description: 'Duas recited during bowing (Ruku)',
    descriptionTr: 'Rükû sırasında okunan dualar',
    icon: 'arrow-down-circle-outline'
  },
  {
    id: 'sujud',
    name: 'Sujud Duas',
    nameTr: 'Secde Duaları',
    description: 'Duas recited during prostration (Sujud)',
    descriptionTr: 'Secde sırasında okunan dualar',
    icon: 'arrow-down-outline'
  },
  {
    id: 'sitting',
    name: 'Sitting Duas',
    nameTr: 'Oturuş Duaları',
    description: 'Duas recited while sitting (Tashahhud)',
    descriptionTr: 'Oturuş sırasında okunan dualar (Teşehhüd)',
    icon: 'pause-circle-outline'
  },
  {
    id: 'closing',
    name: 'Closing Duas',
    nameTr: 'Kapanış Duaları',
    description: 'Duas recited at the end of prayer',
    descriptionTr: 'Namazın sonunda okunan dualar',
    icon: 'checkmark-circle-outline'
  },
  {
    id: 'sunnah',
    name: 'Sunnah Duas',
    nameTr: 'Sünnet Dualar',
    description: 'Additional recommended duas',
    descriptionTr: 'Ek tavsiye edilen dualar',
    icon: 'star-outline'
  }
];

// Comprehensive Prayer Duas collection
export const prayerDuas: PrayerDua[] = [
  // Opening Duas
  {
    id: 'opening_takbir',
    name: 'Opening Takbir',
    nameTr: 'Açılış Tekbiri',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    transliterationTr: 'Allahu Ekber',
    translation: 'Allah is the Greatest',
    translationTr: 'Allah en büyüktür',
    category: 'opening',
    position: 'Standing',
    positionTr: 'Ayakta',
    when: 'At the very beginning of prayer',
    whenTr: 'Namazın en başında',
    source: 'Quran & Sunnah',
    isRequired: true
  },
  {
    id: 'opening_iftitah',
    name: 'Iftitah Dua',
    nameTr: 'İftitah Duası',
    arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ',
    transliteration: 'Subhanakallahuma wa bihamdika wa tabarakasmuka wa ta\'ala jadduka wa la ilaha ghayruk',
    transliterationTr: 'Sübhânekellahümme ve bihamdike ve tebarekesmüke ve teâlâ ceddüke ve lâ ilâhe gayrük',
    translation: 'Glory be to You, O Allah, and praise be to You. Blessed is Your Name and exalted is Your Majesty. There is no god but You.',
    translationTr: 'Allah\'ım! Sen her türlü eksiklikten uzaksın. Sana hamd olsun. Senin ismin mübarektir. Senin şanın yücedir. Senden başka ilah yoktur.',
    category: 'opening',
    position: 'Standing',
    positionTr: 'Ayakta',
    when: 'After opening Takbir, before Fatiha',
    whenTr: 'Açılış tekbirinden sonra, Fatiha\'dan önce',
    source: 'Abu Dawud, Tirmidhi',
    isRequired: false
  },
  {
    id: 'opening_auzu',
    name: 'Seeking Refuge',
    nameTr: 'İstiaze',
    arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    transliteration: 'A\'udhu billahi min ash-shaytani\'r-rajim',
    transliterationTr: 'Eûzü billâhi mineş-şeytânir-racîm',
    translation: 'I seek refuge in Allah from Satan, the accursed',
    translationTr: 'Kovulmuş şeytandan Allah\'a sığınırım',
    category: 'opening',
    position: 'Standing',
    positionTr: 'Ayakta',
    when: 'Before reciting Fatiha',
    whenTr: 'Fatiha okumadan önce',
    source: 'Quran 16:98',
    isRequired: true
  },
  {
    id: 'opening_bismillah',
    name: 'Bismillah',
    nameTr: 'Besmele',
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
    transliteration: 'Bismillahi\'r-rahmani\'r-rahim',
    transliterationTr: 'Bismillâhir-rahmânir-rahîm',
    translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
    translationTr: 'Rahman ve Rahim olan Allah\'ın adıyla',
    category: 'opening',
    position: 'Standing',
    positionTr: 'Ayakta',
    when: 'Before reciting Fatiha',
    whenTr: 'Fatiha okumadan önce',
    source: 'Quran 1:1',
    isRequired: true
  },

  // Ruku Duas
  {
    id: 'ruku_tasbih',
    name: 'Ruku Tasbih',
    nameTr: 'Rükû Tesbihi',
    arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
    transliteration: 'Subhana rabbiyal azim',
    transliterationTr: 'Sübhâne rabbiyel azîm',
    translation: 'Glory be to my Lord, the Most Great',
    translationTr: 'Yüce Rabbim her türlü eksiklikten uzaktır',
    category: 'ruku',
    position: 'Bowing (Ruku)',
    positionTr: 'Rükû',
    when: 'During Ruku position',
    whenTr: 'Rükû pozisyonunda',
    source: 'Sahih Muslim',
    isRequired: true
  },
  {
    id: 'ruku_extended',
    name: 'Extended Ruku Dua',
    nameTr: 'Uzun Rükû Duası',
    arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ',
    transliteration: 'Subhana rabbiyal azimi wa bihamdih',
    transliterationTr: 'Sübhâne rabbiyel azîmi ve bihamdih',
    translation: 'Glory be to my Lord, the Most Great, and praise be to Him',
    translationTr: 'Yüce Rabbim her türlü eksiklikten uzaktır ve O\'na hamd olsun',
    category: 'ruku',
    position: 'Bowing (Ruku)',
    positionTr: 'Rükû',
    when: 'During Ruku position (optional addition)',
    whenTr: 'Rükû pozisyonunda (isteğe bağlı ekleme)',
    source: 'Abu Dawud',
    isRequired: false
  },
  {
    id: 'ruku_rising',
    name: 'Rising from Ruku',
    nameTr: 'Rükûdan Kalkış',
    arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ',
    transliteration: 'Sami\'allahu liman hamidah',
    transliterationTr: 'Semiallâhu limen hamideh',
    translation: 'Allah hears whoever praises Him',
    translationTr: 'Allah, kendisine hamd edeni işitir',
    category: 'ruku',
    position: 'Rising from Ruku',
    positionTr: 'Rükûdan kalkarken',
    when: 'While rising from Ruku',
    whenTr: 'Rükûdan kalkarken',
    source: 'Sahih Bukhari',
    isRequired: true
  },

  // Sujud Duas
  {
    id: 'sujud_tasbih',
    name: 'Sujud Tasbih',
    nameTr: 'Secde Tesbihi',
    arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
    transliteration: 'Subhana rabbiyal a\'la',
    transliterationTr: 'Sübhâne rabbiyel a\'lâ',
    translation: 'Glory be to my Lord, the Most High',
    translationTr: 'En yüce Rabbim her türlü eksiklikten uzaktır',
    category: 'sujud',
    position: 'Prostration (Sujud)',
    positionTr: 'Secde',
    when: 'During Sujud position',
    whenTr: 'Secde pozisyonunda',
    source: 'Sahih Muslim',
    isRequired: true
  },
  {
    id: 'sujud_dua',
    name: 'Sujud Dua',
    nameTr: 'Secde Duası',
    arabic: 'اللَّهُمَّ لَكَ سَجَدْتُ وَبِكَ آمَنْتُ وَلَكَ أَسْلَمْتُ',
    transliteration: 'Allahumma laka sajadtu wa bika amantu wa laka aslamtu',
    transliterationTr: 'Allahümme leke secedtü ve bike âmentü ve leke eslemtü',
    translation: 'O Allah, to You I prostrate, in You I believe, and to You I submit',
    translationTr: 'Allah\'ım, sana secde ettim, sana iman ettim ve sana teslim oldum',
    category: 'sujud',
    position: 'Prostration (Sujud)',
    positionTr: 'Secde',
    when: 'During Sujud (optional)',
    whenTr: 'Secde sırasında (isteğe bağlı)',
    source: 'Sahih Muslim',
    isRequired: false
  },

  // Sitting Duas (Tashahhud)
  {
    id: 'tashahhud_first',
    name: 'First Tashahhud',
    nameTr: 'İlk Teşehhüd',
    arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration: 'At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu alayka ayyuhan-nabiyyu wa rahmatullahi wa barakatuh. As-salamu alayna wa ala ibadillahis-salihin. Ashhadu an la ilaha illallah wa ashhadu anna Muhammadan abduhu wa rasuluh',
    transliterationTr: 'Et-tahiyyâtü lillâhi ves-salavâtü vet-tayyibât. Es-selâmü aleyke eyyühen-nebiyyü ve rahmetullâhi ve berakâtüh. Es-selâmü aleynâ ve alâ ibâdillâhis-sâlihîn. Eşhedü en lâ ilâhe illallâh ve eşhedü enne Muhammeden abdühû ve rasûlüh',
    translation: 'All greetings, prayers and pure words are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and messenger',
    translationTr: 'Bütün selam, dua ve güzel sözler Allah\'a mahsustur. Ey Peygamber! Sana, Allah\'ın rahmeti ve bereketleri ile birlikte selam olsun. Bize ve Allah\'ın salih kullarına selam olsun. Şahitlik ederim ki Allah\'tan başka ilah yoktur ve şahitlik ederim ki Muhammed O\'nun kulu ve elçisidir',
    category: 'sitting',
    position: 'Sitting (First Tashahhud)',
    positionTr: 'Oturuş (İlk Teşehhüd)',
    when: 'In the first sitting of 3 or 4 rakat prayers',
    whenTr: '3 veya 4 rekatlı namazların ilk oturuşunda',
    source: 'Sahih Bukhari, Sahih Muslim',
    isRequired: true
  },

  // Closing Duas
  {
    id: 'closing_salawat',
    name: 'Closing Salawat',
    nameTr: 'Kapanış Salavat',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    transliteration: 'Allahumma salli ala Muhammadin wa ala ali Muhammadin kama sallayta ala Ibrahima wa ala ali Ibrahima innaka hamidun majid',
    transliterationTr: 'Allahümme salli alâ Muhammed ve alâ âli Muhammed kemâ salleyte alâ İbrâhîm ve alâ âli İbrâhîm inneke hamîdün mecîd',
    translation: 'O Allah, send blessings upon Muhammad and the family of Muhammad as You sent blessings upon Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious',
    translationTr: 'Allah\'ım! Muhammed\'e ve Muhammed\'in ailesine, İbrahim\'e ve İbrahim\'in ailesine rahmet ettiğin gibi rahmet et. Şüphesiz Sen övgüye layık ve yücesin',
    category: 'closing',
    position: 'Sitting (Final Tashahhud)',
    positionTr: 'Oturuş (Son Teşehhüd)',
    when: 'In the final sitting before Salam',
    whenTr: 'Selamdan önceki son oturuşta',
    source: 'Sahih Bukhari, Sahih Muslim',
    isRequired: true
  },
  {
    id: 'closing_dua',
    name: 'Final Dua',
    nameTr: 'Son Dua',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: 'Rabbana atina fi\'d-dunya hasanatan wa fi\'l-akhirati hasanatan wa qina \'adhab an-nar',
    transliterationTr: 'Rabbenâ âtinâ fid-dünyâ haseneten ve fil-âhireti haseneten ve kinâ azâben-nâr',
    translation: 'Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire',
    translationTr: 'Rabbimiz! Bize dünyada iyilik ver, ahirette de iyilik ver ve bizi cehennem azabından koru',
    category: 'closing',
    position: 'Sitting (Final Tashahhud)',
    positionTr: 'Oturuş (Son Teşehhüd)',
    when: 'Before final Salam',
    whenTr: 'Son selamdan önce',
    source: 'Quran 2:201',
    isRequired: false
  },
  {
    id: 'closing_salam',
    name: 'Final Salam',
    nameTr: 'Son Selam',
    arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
    transliteration: 'As-salamu alaykum wa rahmatullah',
    transliterationTr: 'Es-selâmü aleykum ve rahmetullâh',
    translation: 'Peace be upon you and the mercy of Allah',
    translationTr: 'Size selam ve Allah\'ın rahmeti olsun',
    category: 'closing',
    position: 'Sitting, turning head right then left',
    positionTr: 'Oturarak, başı sağa sonra sola çevirme',
    when: 'At the very end of prayer',
    whenTr: 'Namazın en sonunda',
    source: 'Sahih Muslim',
    isRequired: true
  }
];

// Helper functions
export const getPrayerDuasByCategory = (categoryId: string): PrayerDua[] => {
  return prayerDuas.filter(dua => dua.category === categoryId);
};

export const getPrayerDuaById = (id: string): PrayerDua | undefined => {
  return prayerDuas.find(dua => dua.id === id);
};

export const getRequiredPrayerDuas = (): PrayerDua[] => {
  return prayerDuas.filter(dua => dua.isRequired);
};

export const getSunnahPrayerDuas = (): PrayerDua[] => {
  return prayerDuas.filter(dua => !dua.isRequired);
};

export const getAllPrayerDuas = (): PrayerDua[] => {
  return prayerDuas;
};
