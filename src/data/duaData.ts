// Types for Dua data
export interface Dua {
  id: string;
  name: string;
  nameTr?: string; // Türkçe isim
  transliteration: string;
  transliterationTr?: string; // Türkçe okunuş
  translation: string;
  translationTr?: string; // Türkçe meal
  arabic: string;
  category: string;
  reference?: string;
  audioUrl?: string;
}

export interface DuaCategory {
  id: string;
  name: string;
  description: string;
  count: number;
}

// Dua categories
export const duaCategories: DuaCategory[] = [
  {
    id: 'morning_evening',
    name: 'Sabah & Akşam',
    description: 'Sabah ve akşam zikirleri',
    count: 15,
  },
  {
    id: 'salah',
    name: 'Namaz Duaları',
    description: 'Namaz ile ilgili dualar',
    count: 12,
  },
  {
    id: 'protection',
    name: 'Korunma Duaları',
    description: 'Korunma için okunacak dualar',
    count: 10,
  },
  {
    id: 'forgiveness',
    name: 'Bağışlanma Duaları',
    description: 'Bağışlanma için okunacak dualar',
    count: 8,
  },
  {
    id: 'daily',
    name: 'Günlük Dualar',
    description: 'Günlük hayatta okunacak dualar',
    count: 20,
  },
  {
    id: 'travel',
    name: 'Seyahat Duaları',
    description: 'Seyahat ile ilgili dualar',
    count: 6,
  },
  {
    id: 'rizq',
    name: 'Rızık ve Bereket',
    description: 'Bolluk, bereket ve helal kazanç duaları',
    count: 2,
  },
];

// Sample duas with comprehensive data
export const duas: Dua[] = [
  // Morning & Evening Duas
  {
    id: 'ayat_kursi',
    name: 'Ayat al-Kursi',
    nameTr: 'Ayetel Kürsi',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    transliteration: 'Allahu la ilaha illa huwal hayyul qayyum. La ta\'khuzuhu sinatun wa la nawm. Lahu ma fis samawati wa ma fil ard. Man zal lazi yashfa\'u \'indahu illa bi iznih. Ya\'lamu ma bayna aydihim wa ma khalfahum. Wa la yuhituna bi shay\'in min \'ilmihi illa bima sha\'a. Wasi\'a kursiyyuhus samawati wal ard. Wa la ya\'uduhu hifzuhuma wa huwal \'aliyyul \'azim.',
    transliterationTr: 'Allahu la ilahe illa hüvel hayyül kayyum. La te\'huzuhu sinetün ve la nevm. Lehu ma fis-semavati ve ma fil-ard. Men zellezi yeşfeu indehu illa bi-iznih. Ya\'lemü ma beyne eydihim ve ma halfahüm. Ve la yuhitune bi şey\'in min ilmihi illa bima şa. Vesia kürsiyyühüs-semavati vel-ard. Ve la yeudühü hifzuhüma ve hüvel aliyyül azim.',
    translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
    translationTr: 'Allah, O\'ndan başka ilah yoktur. O diridir, kayyumdur (her şeyi ayakta tutan). O\'nu ne uyuklama alır, ne de uyku. Göklerde ve yerde ne varsa hepsi O\'nundur. İzni olmaksızın O\'nun katında şefaatte bulunacak kimdir? O, önlerindekini ve arkalarındakini bilir. Onlar ise, O\'nun dilediği kadarından başka, O\'nun ilminden hiçbir şeyi kavrayamazlar. O\'nun kürsüsü bütün gökleri ve yeri kaplamıştır. Onları koruyup gözetmek O\'na güç gelmez. O yücedir, büyüktür.',
    category: 'morning_evening',
    reference: 'Quran 2:255'
  },

  // Sabah Duası
  {
    id: 'morning_dua',
    name: 'Morning Dua',
    nameTr: 'Sabah Duası',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ',
    transliteration: 'Asbahna wa asbahal mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul mulku wa lahul hamdu wa huwa ala kulli shay\'in qadir. Rabbi as\'aluka khayra ma fi hazal yawmi wa khayra ma ba\'dah, wa a\'uzubika min sharri ma fi hazal yawmi wa sharri ma ba\'dah.',
    transliterationTr: 'Asbahna ve asbahal mülkü lillah, vel hamdü lillah, la ilahe illallahu vahdehü la şerike leh, lehül mülkü ve lehül hamdü ve hüve ala külli şey\'in kadir. Rabbi es\'elüke hayre ma fi hazel yevmi ve hayre ma ba\'deh, ve euzü bike min şerri ma fi hazel yevmi ve şerri ma ba\'deh.',
    translation: 'We have reached the morning and at this very time unto Allah belongs all sovereignty. All praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent. My Lord, I ask You for the good of this day and the good of what follows it and I take refuge in You from the evil of this day and the evil of what follows it.',
    translationTr: 'Sabaha erdik ve mülk Allah\'ındır. Hamd Allah\'adır. Allah\'tan başka ilah yoktur, tektir, ortağı yoktur. Mülk O\'nundur, hamd O\'nadır ve O her şeye kadirdir. Rabbim! Bu günün hayırını ve ondan sonra gelecek olanın hayırını senden dilerim. Bu günün şerrinden ve ondan sonra gelecek olanın şerrinden sana sığınırım.',
    category: 'morning_evening',
    reference: 'Abu Dawud 5084'
  },

  // Akşam Duası
  {
    id: 'evening_dua',
    name: 'Evening Dua',
    nameTr: 'Akşam Duası',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا',
    transliteration: 'Amsayna wa amsal mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul mulku wa lahul hamdu wa huwa ala kulli shay\'in qadir. Rabbi as\'aluka khayra ma fi hazihil laylati wa khayra ma ba\'daha, wa a\'uzubika min sharri ma fi hazihil laylati wa sharri ma ba\'daha.',
    transliterationTr: 'Emseyna ve emsel mülkü lillah, vel hamdü lillah, la ilahe illallahu vahdehü la şerike leh, lehül mülkü ve lehül hamdü ve hüve ala külli şey\'in kadir. Rabbi es\'elüke hayre ma fi hazihil leyleti ve hayre ma ba\'deha, ve euzü bike min şerri ma fi hazihil leyleti ve şerri ma ba\'deha.',
    translation: 'We have reached the evening and at this very time unto Allah belongs all sovereignty. All praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent. My Lord, I ask You for the good of this night and the good of what follows it and I take refuge in You from the evil of this night and the evil of what follows it.',
    translationTr: 'Akşama erdik ve mülk Allah\'ındır. Hamd Allah\'adır. Allah\'tan başka ilah yoktur, tektir, ortağı yoktur. Mülk O\'nundur, hamd O\'nadır ve O her şeye kadirdir. Rabbim! Bu gecenin hayırını ve ondan sonra gelecek olanın hayırını senden dilerim. Bu gecenin şerrinden ve ondan sonra gelecek olanın şerrinden sana sığınırım.',
    category: 'morning_evening',
    reference: 'Abu Dawud 5084'
  },

  // Yemek Öncesi Duası
  {
    id: 'before_eating',
    name: 'Before Eating',
    nameTr: 'Yemek Öncesi Duası',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillah',
    transliterationTr: 'Bismillah',
    translation: 'In the name of Allah',
    translationTr: 'Allah\'ın adıyla',
    category: 'daily',
    reference: 'Abu Dawud 3767'
  },

  // Yemek Sonrası Duası
  {
    id: 'after_eating',
    name: 'After Eating',
    nameTr: 'Yemek Sonrası Duası',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    transliteration: 'Alhamdu lillahil lazi at\'amani haza wa razaqanihi min ghayri hawlin minni wa la quwwah',
    transliterationTr: 'Elhamdü lillahillezi et\'ameni haza ve razakanihi min gayri havlin minni ve la kuvveh',
    translation: 'All praise is due to Allah who has fed me this food and provided it for me without any might or power on my part',
    translationTr: 'Beni bu yemekle doyuran ve benden herhangi bir güç ve kuvvet olmaksızın bunu bana rızık olarak veren Allah\'a hamdolsun',
    category: 'daily',
    reference: 'Abu Dawud 4023'
  },

  // Uyku Öncesi Duası
  {
    id: 'before_sleep',
    name: 'Before Sleep',
    nameTr: 'Uyku Öncesi Duası',
    arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
    transliteration: 'Bismika rabbi wada\'tu janbi, wa bika arfa\'uh, fa in amsakta nafsi farhamha, wa in arsaltaha fahfazha bima tahfazu bihi \'ibadakas salihin',
    transliterationTr: 'Bismike rabbi vada\'tü cenbi, ve bike erfe\'uh, fe in emsekte nefsi ferhamha, ve in erseltaha fahfazha bima tahfazu bihi ibadikeş-salihin',
    translation: 'In Your name my Lord, I lie down on my side, and by You I raise it up. If You should take my soul then have mercy upon it, and if You should return my soul then protect it in the manner You do so with Your righteous servants',
    translationTr: 'Rabbim! Senin adınla yanımı yatağa koydum ve yine seninle kaldıracağım. Eğer canımı alırsan ona merhamet et, eğer salıverirsen onu salih kullarını koruduğun şekilde koru',
    category: 'daily',
    reference: 'Bukhari 6320'
  },

  // Seyahat Duası
  {
    id: 'travel_dua',
    name: 'Travel Dua',
    nameTr: 'Seyahat Duası',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    transliteration: 'Subhanal lazi sakhkhara lana haza wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun',
    transliterationTr: 'Sübhanellezi sahhara lena haza ve ma künna lehü mukrinin, ve inna ila rabbina lemünkalibun',
    translation: 'Exalted is He who has subjected this to us, and we could not have [otherwise] subdued it. And indeed we, to our Lord, will [surely] return',
    translationTr: 'Bunu bize boyun eğdiren Allah\'ı tespih ederim. Yoksa biz onu kendimize boyun eğdiremezdik. Şüphesiz biz Rabbimize döneceğiz',
    category: 'travel',
    reference: 'Quran 43:13-14'
  },

  // İstiğfar Duası
  {
    id: 'istighfar',
    name: 'Istighfar',
    nameTr: 'İstiğfar Duası',
    arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullaha\'l-\'azima\'l-lazi la ilaha illa huwa\'l-hayya\'l-qayyuma wa atubu ilayh',
    transliterationTr: 'Estağfirullahel azimellezi la ilahe illa hüvel hayyel kayyume ve etubü ileyh',
    translation: 'I seek forgiveness of Allah the Mighty, Whom there is none worthy of worship except Him, the Living, the Eternal, and I repent unto Him',
    translationTr: 'Kendisinden başka ilah olmayan, diri ve kayyum olan yüce Allah\'tan bağışlanma dilerim ve O\'na tevbe ederim',
    category: 'forgiveness',
    reference: 'Abu Dawud 1517'
  },

  // Namaz Duası - Rükû
  {
    id: 'ruku_dua',
    name: 'Ruku Dua',
    nameTr: 'Rükû Duası',
    arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
    transliteration: 'Subhana rabbiyal azim',
    transliterationTr: 'Sübhane rabbiyel azim',
    translation: 'Exalted is my Lord, the Most Great',
    translationTr: 'Yüce Rabbimi tespih ederim',
    category: 'salah',
    reference: 'Abu Dawud 870'
  },

  // Namaz Duası - Secde
  {
    id: 'sujud_dua',
    name: 'Sujud Dua',
    nameTr: 'Secde Duası',
    arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
    transliteration: 'Subhana rabbiyal a\'la',
    transliterationTr: 'Sübhane rabbiyel a\'la',
    translation: 'Exalted is my Lord, the Most High',
    translationTr: 'En yüce Rabbimi tespih ederim',
    category: 'salah',
    reference: 'Abu Dawud 875'
  },

  // Korunma Duası
  {
    id: 'protection_dua',
    name: 'Protection Dua',
    nameTr: 'Korunma Duası',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration: 'A\'uzu bi kalimatillahit-tammati min sharri ma khalaq',
    transliterationTr: 'Euzü bi kelimatillahit-tammati min şerri ma halak',
    translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created',
    translationTr: 'Allah\'ın mükemmel kelimelerine, yarattığı şeylerin şerrinden sığınırım',
    category: 'protection',
    reference: 'Muslim 2708'
  },
  {
    id: 'dua_before_sleep',
    name: 'Dua Before Sleep',
    nameTr: 'Uyku Öncesi Duası',
    transliteration: 'Bismika Allahumma amootu wa ahya',
    transliterationTr: 'Bismike Allâhümme emûtü ve ahyâ',
    translation: 'In Your name O Allah, I die and I live',
    translationTr: 'Senin adınla ey Allah ölürüm ve yaşarım',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    category: 'daily',
    reference: 'Sahih Al-Bukhari 6324',
  },
  {
    id: 'dua_istikharah',
    name: 'Dua Al-Istikharah',
    nameTr: 'İstihaare Duası',
    transliteration: 'Allahumma inni astakhiruka bi ilmika...',
    transliterationTr: 'Allâhümme innî estahîruke bi ilmike ve esteqdiruke bi kudretike ve es\'eluke min fadlikel azîm...',
    translation: 'O Allah, I seek Your guidance by virtue of Your knowledge...',
    translationTr: 'Allah\'ım! İlminle senden hayır dilerim, kudretinle senden güç dilerim ve büyük fazlından senden isterim...',
    arabic: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ، اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي، ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ، وَاقْدُرْ لِي الْخَيْرَ حَيْثُ كَانَ، ثُمَّ أَرْضِنِي بِهِ',
    category: 'daily',
    reference: 'Sahih Al-Bukhari 1166',
  },
  // Bereket/Rızık Duası 1
  {
    id: 'rizq_dua_1',
    name: 'Dua for Sustenance',
    nameTr: 'Rızık Duası',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ رِزْقًا طَيِّبًا، وَعِلْمًا نَافِعًا، وَعَمَلًا مُتَقَبَّلًا',
    transliteration: 'Allahumma inni as\'aluka rizqan tayyiban, wa ilman nafi\'an, wa amalan mutaqabbalan',
    transliterationTr: 'Allahümme inni es\'elüke rızkan tayyiben, ve ilmen nafi\'an, ve amelen mütekabbelen',
    translation: 'O Allah, I ask You for beneficial knowledge, acceptable deeds, and good provision.',
    translationTr: 'Allah\'ım! Senden helal rızık, faydalı ilim ve kabul edilmiş bir amel dilerim.',
    category: 'rizq',
    reference: 'Ibn Majah 925'
  },
  // Borç/Rızık Duası
  {
    id: 'rizq_dua_2',
    name: 'Dua for Debt',
    nameTr: 'Borçlardan Kurtulma Duası',
    arabic: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
    transliteration: 'Allahummakfini bi halalika \'an haramika, wa aghnini bi fadlika \'amman siwaka',
    transliterationTr: 'Allahümmekfini bi helalike an haramike, ve ağnini bi fadlike ammen sivake',
    translation: 'O Allah, suffice me with Your lawful against Your unlawful, and make me independent of all those besides You.',
    translationTr: 'Allah\'ım! Helalinle beni haramdan koru ve lütfunla beni senden başkasına muhtaç etme.',
    category: 'rizq',
    reference: 'Tirmidhi 3563'
  },
];

// Popular surahs for audio library
export const popularSurahs = [
  {
    id: 'yaseen',
    name: 'Yasin Suresi',
    transliteration: 'Ya-Sin',
    translation: 'Kuranın Kalbi',
    arabic: 'يس',
    category: 'quran',
    reference: 'Kuran 36',
    audioUrl: 'https://server8.mp3quran.net/afs/036.mp3',
  },
  {
    id: 'mulk',
    name: 'Mülk Suresi',
    transliteration: 'Al-Mulk',
    translation: 'Mülkiyet, Hükümranlık',
    arabic: 'الملك',
    category: 'quran',
    reference: 'Kuran 67',
    audioUrl: 'https://server8.mp3quran.net/afs/067.mp3',
  },
  {
    id: 'rahman',
    name: 'Rahman Suresi',
    transliteration: 'Ar-Rahman',
    translation: 'Rahmân',
    arabic: 'الرحمن',
    category: 'quran',
    reference: 'Kuran 55',
    audioUrl: 'https://server8.mp3quran.net/afs/055.mp3',
  },
  {
    id: 'waqiah',
    name: 'Vakıa Suresi',
    transliteration: 'Al-Waqiah',
    translation: 'Vuku Bulacak Olan',
    arabic: 'الواقعة',
    category: 'quran',
    reference: 'Kuran 56',
    audioUrl: 'https://server8.mp3quran.net/afs/056.mp3',
  },
  {
    id: 'kahf',
    name: 'Kehf Suresi',
    transliteration: 'Al-Kahf',
    translation: 'Mağara',
    arabic: 'الكهف',
    category: 'quran',
    reference: 'Kuran 18',
    audioUrl: 'https://server8.mp3quran.net/afs/018.mp3',
  },
];

// Helper functions
export const getDuaById = (id: string): Dua | undefined => {
  return duas.find(dua => dua.id === id);
};

export const getDuasByCategory = (categoryId: string): Dua[] => {
  return duas.filter(dua => dua.category === categoryId);
};

export const getAllDuas = (): Dua[] => {
  return duas;
};

// Alias for backward compatibility
export const popularDuas = duas;
