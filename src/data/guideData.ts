// Guide content data for Islamic Guide sections

export interface GuideContent {
  id: string;
  title: string;
  content: string;
  sections?: GuideSection[];
}

export interface GuideSection {
  title: string;
  content: string;
  arabic?: string;
  transliteration?: string;
}

export const guideData: { [key: string]: GuideContent } = {
  salawat: {
    id: 'salawat',
    title: 'Salavatlar',
    content: 'Peygamber Efendimize (s.a.v.) salavat ve selam getirmek, müminlerin en güzel amellerinden biridir.',
    sections: [
      {
        title: 'Salavat-ı Şerife',
        content: 'En meşhur salavat',
        arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
        transliteration: 'Allâhümme salli alâ Muhammed ve alâ âli Muhammed kemâ salleyte alâ İbrâhîm ve alâ âli İbrâhîm inneke hamîdün mecîd'
      },
      {
        title: 'Salavat-ı Tüncina',
        content: 'Kurtuluş salavatı',
        arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلَاةً تُنْجِينَا بِهَا مِنْ جَمِيعِ الْأَهْوَالِ وَالْآفَاتِ',
        transliteration: 'Allâhümme salli alâ seyyidinâ Muhammed salâten tuncînâ bihâ min cemî\'il-ehvâli vel-âfât'
      },
      {
        title: 'Salavat-ı Nâriye',
        content: 'Nur salavatı',
        arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ النُّورِ الذَّاتِي وَالسِّرِّ السَّارِي فِي سَائِرِ الْأَسْمَاءِ وَالصِّفَاتِ',
        transliteration: 'Allâhümme salli alâ seyyidinâ Muhammedin-nûril-zâtî ves-sirris-sârî fî sâ\'iril-esmâ\'i ves-sıfât'
      }
    ]
  },

  friday_sermons: {
    id: 'friday_sermons',
    title: 'Cuma Hutbeleri',
    content: 'Cuma namazının önemi ve hutbe metinleri',
    sections: [
      {
        title: 'Cuma Namazının Önemi',
        content: 'Cuma namazı, müslümanların haftada bir kez bir araya gelerek cemaat halinde kıldıkları önemli bir ibadettir. Kuran-ı Kerim\'de "Ey iman edenler! Cuma günü namaz için çağrı yapıldığında, Allah\'ı anmaya koşun ve alışverişi bırakın" (Cuma, 9) buyurulmaktadır.'
      },
      {
        title: 'Cuma Günü Adabı',
        content: 'Cuma günü gusül abdesti almak, temiz elbise giymek, güzel koku sürünmek, erken camiye gitmek ve hutbeyi dinlemek sünnetlerdendir.'
      },
      {
        title: 'Cuma Duası',
        content: 'Cuma günü kabul olan dua vakitleri vardır. Özellikle ikindi ile akşam arasındaki vakit dua için mübarek zamandır.',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        transliteration: 'Rabbenâ âtinâ fid-dünyâ hasenetin ve fil-âhireti hasenetin ve kinâ azâben-nâr'
      }
    ]
  },

  hajj_umrah_guide: {
    id: 'hajj_umrah_guide',
    title: 'Hac ve Umre Rehberi',
    content: 'Hac ve umre ibadetlerinin nasıl yapılacağına dair detaylı rehber',
    sections: [
      {
        title: 'Hac Nedir?',
        content: 'Hac, İslam\'ın beş şartından biridir. Gücü yeten her müslümanın ömründe bir kez yapması farzdır. Zilhicce ayının 8-12. günleri arasında yapılır.'
      },
      {
        title: 'Umre Nedir?',
        content: 'Umre, yılın her zamanında yapılabilen küçük hac olarak bilinir. Mekke\'de Kabe\'yi tavaf etmek ve Safa ile Merve tepeleri arasında sa\'y yapmaktan oluşur.'
      },
      {
        title: 'İhram',
        content: 'Hac ve umre için özel giysi olan ihramı giymek ve niyetini yapmak gerekir.',
        arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ',
        transliteration: 'Lebbeyk Allâhümme lebbeyk, lebbeyk lâ şerîke leke lebbeyk'
      },
      {
        title: 'Tavaf',
        content: 'Kabe\'yi yedi kez saat yönünün tersine doğru dönmek tavaf olarak adlandırılır.'
      },
      {
        title: 'Sa\'y',
        content: 'Safa ile Merve tepeleri arasında yedi kez gidip gelmek sa\'y ibadetidir.'
      }
    ]
  },

  prayer_turkish: {
    id: 'prayer_turkish',
    title: 'Namazın Türkçesi',
    content: 'Namaz dualarının Türkçe mealleri',
    sections: [
      {
        title: 'Fatiha Suresi',
        content: 'Namazın temel duası',
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ الرَّحْمَٰنِ الرَّحِيمِ مَالِكِ يَوْمِ الدِّينِ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        transliteration: 'Bismillâhir-rahmânir-rahîm. Elhamdü lillâhi rabbil-âlemîn. Er-rahmânir-rahîm. Mâliki yevmid-dîn. İyyâke na\'büdü ve iyyâke nesta\'în. İhdinessırâtal-müstakîm. Sırâtallezîne en\'amte aleyhim ğayril-mağdûbi aleyhim ve lâd-dâllîn.'
      },
      {
        title: 'Rüku Duası',
        content: 'Rükuda okunan dua',
        arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
        transliteration: 'Sübhâne rabbiyel-azîm (Yüce Rabbimi tenzih ederim)'
      },
      {
        title: 'Secde Duası',
        content: 'Secdede okunan dua',
        arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
        transliteration: 'Sübhâne rabbiyel-a\'lâ (En yüce Rabbimi tenzih ederim)'
      },
      {
        title: 'Teşehhüd',
        content: 'Oturuşta okunan dua',
        arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
        transliteration: 'Ettehiyyâtü lillâhi vessalevâtü vettayyibât. Esselâmü aleyke eyyühen-nebiyyü ve rahmetullâhi ve berakâtüh.'
      }
    ]
  },

  beautiful_names: {
    id: 'beautiful_names',
    title: 'Esma-ül Hüsna',
    content: 'Allah\'ın 99 güzel ismi',
    sections: [
      {
        title: 'İlk 10 İsim',
        content: 'Allah\'ın güzel isimlerinden ilk 10 tanesi',
        arabic: '1. الله (Allah) 2. الرحمن (Er-Rahman) 3. الرحيم (Er-Rahim) 4. الملك (El-Melik) 5. القدوس (El-Kuddus) 6. السلام (Es-Selam) 7. المؤمن (El-Mümin) 8. المهيمن (El-Müheymin) 9. العزيز (El-Aziz) 10. الجبار (El-Cebbar)'
      },
      {
        title: 'İkinci 10 İsim',
        content: '11-20 arası güzel isimler',
        arabic: '11. المتكبر (El-Mütekebbir) 12. الخالق (El-Halik) 13. البارئ (El-Bari) 14. المصور (El-Musavvir) 15. الغفار (El-Gaffar) 16. القهار (El-Kahhar) 17. الوهاب (El-Vehhab) 18. الرزاق (Er-Rezzak) 19. الفتاح (El-Fettah) 20. العليم (El-Alim)'
      }
    ]
  },

  forty_hadith: {
    id: 'forty_hadith',
    title: '40 Hadis',
    content: 'İmam Nevevi\'nin seçtiği 40 hadis-i şerif',
    sections: [
      {
        title: '1. Hadis - Niyet',
        content: 'Amellerin niyetlere göre olduğunu bildiren hadis',
        arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
        transliteration: 'İnnemel-a\'mâlü bin-niyyât ve innemâ likülli mri\'in mâ nevâ'
      },
      {
        title: '2. Hadis - İslam, İman ve İhsan',
        content: 'Cebrail\'in (a.s.) Peygamber\'e (s.a.v.) sorduğu sorular',
        arabic: 'الْإِسْلَامُ أَنْ تَشْهَدَ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ',
        transliteration: 'El-İslâmü en teşhede en lâ ilâhe illallâh ve enne Muhammeden rasûlullâh'
      },
      {
        title: '3. Hadis - İslam\'ın Temelleri',
        content: 'İslam\'ın beş temel şartı',
        arabic: 'بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ شَهَادَةِ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ',
        transliteration: 'Büniyal-İslâmü alâ hams: şehâdeti en lâ ilâhe illallâh ve enne Muhammeden rasûlullâh'
      }
    ]
  },

  wudu_guide: {
    id: 'wudu_guide',
    title: 'Abdest Nasıl Alınır',
    content: 'Abdest almanın farzları ve sünnetleri',
    sections: [
      {
        title: 'Abdestin Farzları',
        content: '1. Yüzü yıkamak\n2. Elleri dirseklerle birlikte yıkamak\n3. Başın dörtte birini mesh etmek\n4. Ayakları topuklarla birlikte yıkamak'
      },
      {
        title: 'Abdestin Sünnetleri',
        content: '1. Besmele çekmek\n2. Elleri yıkamak\n3. Misvak kullanmak\n4. Ağzı çalkalamak\n5. Burnu temizlemek\n6. Organları üçer kez yıkamak'
      },
      {
        title: 'Abdest Duası',
        content: 'Abdest alırken okunan dua',
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Bismillâhir-rahmânir-rahîm'
      },
      {
        title: 'Abdest Sonrası Dua',
        content: 'Abdest tamamlandıktan sonra okunan dua',
        arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
        transliteration: 'Eşhedü en lâ ilâhe illallâhü vahdehû lâ şerîke leh ve eşhedü enne Muhammeden abdühû ve rasûlüh'
      }
    ]
  },

  thirty_two_fard: {
    id: 'thirty_two_fard',
    title: '32 Farz',
    content: 'İslam dininde farz olan 32 konu',
    sections: [
      {
        title: 'İtikadî Farzlar (6 Adet)',
        content: '1. Allah\'a iman\n2. Meleklere iman\n3. Kitaplara iman\n4. Peygamberlere iman\n5. Ahiret gününe iman\n6. Kadere iman'
      },
      {
        title: 'Amelî Farzlar (26 Adet)',
        content: 'Namaz, oruç, zekât, hac gibi ibadetler ve sosyal hayatla ilgili farzlar'
      }
    ]
  },

  nearby_mosques: {
    id: 'nearby_mosques',
    title: 'Yakındaki Camiler',
    content: 'Konumunuza yakın camileri bulun ve namaz vakitlerini öğrenin',
    sections: [
      {
        title: 'Cami Arama',
        content: 'GPS konumunuzu kullanarak yakındaki camileri bulabilirsiniz. Bu özellik için konum izni gereklidir.'
      },
      {
        title: 'Cami Bilgileri',
        content: 'Her cami için adres, telefon, namaz vakitleri ve özel programlar hakkında bilgi alabilirsiniz.'
      },
      {
        title: 'Yol Tarifi',
        content: 'Seçtiğiniz camiye nasıl gideceğiniz konusunda detaylı yol tarifi alabilirsiniz.'
      }
    ]
  },

  nearby_tombs: {
    id: 'nearby_tombs',
    title: 'Yakındaki Türbeler',
    content: 'Konumunuza yakın türbe ve ziyaret yerleri',
    sections: [
      {
        title: 'Türbe Ziyareti',
        content: 'Türbe ziyareti, büyüklerimizi anmak ve dua etmek için yapılan manevi bir ziyarettir.'
      },
      {
        title: 'Ziyaret Adabı',
        content: 'Türbe ziyaretinde sessizce dua etmek, saygılı davranmak ve temiz olmak önemlidir.'
      },
      {
        title: 'Ziyaret Duası',
        content: 'Türbe ziyaretinde okunan özel dualar',
        arabic: 'السَّلَامُ عَلَيْكُمْ دَارَ قَوْمٍ مُؤْمِنِينَ',
        transliteration: 'Esselâmü aleyküm dâra kavmin mü\'minîn'
      }
    ]
  },

  prophets_history: {
    id: 'prophets_history',
    title: 'Peygamberler Tarihi',
    content: 'Peygamberlerin hayat hikayeleri ve öğütleri',
    sections: [
      {
        title: 'Hz. Adem (a.s.)',
        content: 'İlk insan ve ilk peygamber. Allah tarafından topraktan yaratıldı ve cennette yaşadı.'
      },
      {
        title: 'Hz. Nuh (a.s.)',
        content: 'Büyük tufan ile kavmini uyaran peygamber. Gemisini yaparak müminleri kurtardı.'
      },
      {
        title: 'Hz. İbrahim (a.s.)',
        content: 'Halilullah (Allah\'ın dostu) olarak bilinen peygamber. Tevhid inancının öncüsü.'
      },
      {
        title: 'Hz. Musa (a.s.)',
        content: 'İsrailoğullarına gönderilen peygamber. Tevrat\'ı aldı ve kavmini Firavun\'dan kurtardı.'
      },
      {
        title: 'Hz. İsa (a.s.)',
        content: 'Meryem\'in oğlu, mucizelerle doğan peygamber. İncil\'i getirdi.'
      },
      {
        title: 'Hz. Muhammed (s.a.v.)',
        content: 'Son peygamber ve Kuran\'ın getiricisi. Tüm insanlığa gönderildi.',
        arabic: 'مُحَمَّدٌ رَسُولُ اللَّهِ',
        transliteration: 'Muhammeden rasûlullâh'
      }
    ]
  },

  beautiful_duas: {
    id: 'beautiful_duas',
    title: 'Güzel Dualar',
    content: 'Seçilmiş güzel dualar ve zikir metinleri',
    sections: [
      {
        title: 'Sabah Duası',
        content: 'Güne başlarken okunan dua',
        arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
        transliteration: 'Allâhümme bike asbahnâ ve bike emseynâ ve bike nahyâ ve bike nemûtü ve ileyken-nüşûr'
      },
      {
        title: 'Akşam Duası',
        content: 'Günü bitirirken okunan dua',
        arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ',
        transliteration: 'Allâhümme bike emseynâ ve bike asbahnâ ve bike nahyâ ve bike nemûtü ve ileykel-masîr'
      },
      {
        title: 'Bereket Duası',
        content: 'Rızık ve bereket için dua',
        arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ',
        transliteration: 'Allâhümme bârik lenâ fîmâ razaktanâ ve kinâ azâben-nâr'
      },
      {
        title: 'Şifa Duası',
        content: 'Hastalık zamanında okunan dua',
        arabic: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ وَاشْفِ أَنْتَ الشَّافِي',
        transliteration: 'Allâhümme rabben-nâsi ezhib\'il-be\'se veşfi ente\'ş-şâfî'
      },
      {
        title: 'Seyahat Duası',
        content: 'Yolculuk öncesi okunan dua',
        arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ',
        transliteration: 'Sübhânellezî sahhara lenâ hâzâ ve mâ künnâ lehû mukrinîn'
      }
    ]
  }
};

export const getGuideContent = (guideId: string): GuideContent | null => {
  return guideData[guideId] || null;
};
