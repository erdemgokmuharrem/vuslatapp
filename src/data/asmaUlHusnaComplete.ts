// Complete 99 Beautiful Names of Allah (Asma-ul-Husna)
export interface AsmaUlHusnaName {
  id: number;
  arabic: string;
  transliteration: string;
  transliterationTr: string;
  meaning: string;
  meaningTr: string;
}

export const asmaUlHusnaNames: AsmaUlHusnaName[] = [
  { id: 1, arabic: 'الرَّحْمَنُ', transliteration: 'Ar-Rahman', transliterationTr: 'Er-Rahman', meaning: 'The Most Gracious', meaningTr: 'Rahman' },
  { id: 2, arabic: 'الرَّحِيمُ', transliteration: 'Ar-Rahim', transliterationTr: 'Er-Rahim', meaning: 'The Most Merciful', meaningTr: 'Rahim' },
  { id: 3, arabic: 'الْمَلِكُ', transliteration: 'Al-Malik', transliterationTr: 'El-Melik', meaning: 'The King', meaningTr: 'Malik' },
  { id: 4, arabic: 'الْقُدُّوسُ', transliteration: 'Al-Quddus', transliterationTr: 'El-Kuddus', meaning: 'The Holy', meaningTr: 'Kuddus' },
  { id: 5, arabic: 'السَّلَامُ', transliteration: 'As-Salam', transliterationTr: 'Es-Selam', meaning: 'The Peace', meaningTr: 'Selam' },
  { id: 6, arabic: 'الْمُؤْمِنُ', transliteration: 'Al-Mu\'min', transliterationTr: 'El-Mü\'min', meaning: 'The Faithful', meaningTr: 'Mü\'min' },
  { id: 7, arabic: 'الْمُهَيْمِنُ', transliteration: 'Al-Muhaymin', transliterationTr: 'El-Müheymin', meaning: 'The Guardian', meaningTr: 'Müheymin' },
  { id: 8, arabic: 'الْعَزِيزُ', transliteration: 'Al-\'Aziz', transliterationTr: 'El-Aziz', meaning: 'The Mighty', meaningTr: 'Aziz' },
  { id: 9, arabic: 'الْجَبَّارُ', transliteration: 'Al-Jabbar', transliterationTr: 'El-Cebbar', meaning: 'The Compeller', meaningTr: 'Cebbar' },
  { id: 10, arabic: 'الْمُتَكَبِّرُ', transliteration: 'Al-Mutakabbir', transliterationTr: 'El-Mütekebbir', meaning: 'The Proud', meaningTr: 'Mütekebbir' },
  { id: 11, arabic: 'الْخَالِقُ', transliteration: 'Al-Khaliq', transliterationTr: 'El-Halik', meaning: 'The Creator', meaningTr: 'Halik' },
  { id: 12, arabic: 'الْبَارِئُ', transliteration: 'Al-Bari\'', transliterationTr: 'El-Bari', meaning: 'The Maker', meaningTr: 'Bari' },
  { id: 13, arabic: 'الْمُصَوِّرُ', transliteration: 'Al-Musawwir', transliterationTr: 'El-Musavvir', meaning: 'The Fashioner', meaningTr: 'Musavvir' },
  { id: 14, arabic: 'الْغَفَّارُ', transliteration: 'Al-Ghaffar', transliterationTr: 'El-Gaffar', meaning: 'The Forgiver', meaningTr: 'Gaffar' },
  { id: 15, arabic: 'الْقَهَّارُ', transliteration: 'Al-Qahhar', transliterationTr: 'El-Kahhar', meaning: 'The Subduer', meaningTr: 'Kahhar' },
  { id: 16, arabic: 'الْوَهَّابُ', transliteration: 'Al-Wahhab', transliterationTr: 'El-Vehhab', meaning: 'The Bestower', meaningTr: 'Vehhab' },
  { id: 17, arabic: 'الرَّزَّاقُ', transliteration: 'Ar-Razzaq', transliterationTr: 'Er-Rezzak', meaning: 'The Provider', meaningTr: 'Rezzak' },
  { id: 18, arabic: 'الْفَتَّاحُ', transliteration: 'Al-Fattah', transliterationTr: 'El-Fettah', meaning: 'The Opener', meaningTr: 'Fettah' },
  { id: 19, arabic: 'الْعَلِيمُ', transliteration: 'Al-\'Alim', transliterationTr: 'El-Alim', meaning: 'The All-Knowing', meaningTr: 'Alim' },
  { id: 20, arabic: 'الْقَابِضُ', transliteration: 'Al-Qabid', transliterationTr: 'El-Kabız', meaning: 'The Constrictor', meaningTr: 'Kabız' },
  { id: 21, arabic: 'الْبَاسِطُ', transliteration: 'Al-Basit', transliterationTr: 'El-Basıt', meaning: 'The Expander', meaningTr: 'Basıt' },
  { id: 22, arabic: 'الْخَافِضُ', transliteration: 'Al-Khafid', transliterationTr: 'El-Hafız', meaning: 'The Abaser', meaningTr: 'Hafız' },
  { id: 23, arabic: 'الرَّافِعُ', transliteration: 'Ar-Rafi\'', transliterationTr: 'Er-Rafi', meaning: 'The Exalter', meaningTr: 'Rafi' },
  { id: 24, arabic: 'الْمُعِزُّ', transliteration: 'Al-Mu\'izz', transliterationTr: 'El-Muizz', meaning: 'The Honorer', meaningTr: 'Muizz' },
  { id: 25, arabic: 'الْمُذِلُّ', transliteration: 'Al-Muzill', transliterationTr: 'El-Müzill', meaning: 'The Humiliator', meaningTr: 'Müzill' },
  { id: 26, arabic: 'السَّمِيعُ', transliteration: 'As-Sami\'', transliterationTr: 'Es-Semi', meaning: 'The All-Hearing', meaningTr: 'Semi' },
  { id: 27, arabic: 'الْبَصِيرُ', transliteration: 'Al-Basir', transliterationTr: 'El-Basir', meaning: 'The All-Seeing', meaningTr: 'Basir' },
  { id: 28, arabic: 'الْحَكَمُ', transliteration: 'Al-Hakam', transliterationTr: 'El-Hakem', meaning: 'The Judge', meaningTr: 'Hakem' },
  { id: 29, arabic: 'الْعَدْلُ', transliteration: 'Al-\'Adl', transliterationTr: 'El-Adl', meaning: 'The Just', meaningTr: 'Adl' },
  { id: 30, arabic: 'اللَّطِيفُ', transliteration: 'Al-Latif', transliterationTr: 'El-Latif', meaning: 'The Subtle', meaningTr: 'Latif' },
  { id: 31, arabic: 'الْخَبِيرُ', transliteration: 'Al-Khabir', transliterationTr: 'El-Habir', meaning: 'The Aware', meaningTr: 'Habir' },
  { id: 32, arabic: 'الْحَلِيمُ', transliteration: 'Al-Halim', transliterationTr: 'El-Halim', meaning: 'The Gentle', meaningTr: 'Halim' },
  { id: 33, arabic: 'الْعَظِيمُ', transliteration: 'Al-\'Azim', transliterationTr: 'El-Azim', meaning: 'The Great', meaningTr: 'Azim' },
  { id: 34, arabic: 'الْغَفُورُ', transliteration: 'Al-Ghafur', transliterationTr: 'El-Gafur', meaning: 'The Forgiving', meaningTr: 'Gafur' },
  { id: 35, arabic: 'الشَّكُورُ', transliteration: 'Ash-Shakur', transliterationTr: 'Eş-Şekur', meaning: 'The Appreciative', meaningTr: 'Şekur' },
  { id: 36, arabic: 'الْعَلِيُّ', transliteration: 'Al-\'Ali', transliterationTr: 'El-Ali', meaning: 'The High', meaningTr: 'Ali' },
  { id: 37, arabic: 'الْكَبِيرُ', transliteration: 'Al-Kabir', transliterationTr: 'El-Kebir', meaning: 'The Great', meaningTr: 'Kebir' },
  { id: 38, arabic: 'الْحَفِيظُ', transliteration: 'Al-Hafiz', transliterationTr: 'El-Hafiz', meaning: 'The Preserver', meaningTr: 'Hafiz' },
  { id: 39, arabic: 'الْمُقِيتُ', transliteration: 'Al-Muqit', transliterationTr: 'El-Mukit', meaning: 'The Sustainer', meaningTr: 'Mukit' },
  { id: 40, arabic: 'الْحَسِيبُ', transliteration: 'Al-Hasib', transliterationTr: 'El-Hasib', meaning: 'The Reckoner', meaningTr: 'Hasib' },
  { id: 41, arabic: 'الْجَلِيلُ', transliteration: 'Al-Jalil', transliterationTr: 'El-Celil', meaning: 'The Majestic', meaningTr: 'Celil' },
  { id: 42, arabic: 'الْكَرِيمُ', transliteration: 'Al-Karim', transliterationTr: 'El-Kerim', meaning: 'The Generous', meaningTr: 'Kerim' },
  { id: 43, arabic: 'الرَّقِيبُ', transliteration: 'Ar-Raqib', transliterationTr: 'Er-Rakib', meaning: 'The Watchful', meaningTr: 'Rakib' },
  { id: 44, arabic: 'الْمُجِيبُ', transliteration: 'Al-Mujib', transliterationTr: 'El-Mücib', meaning: 'The Responsive', meaningTr: 'Mücib' },
  { id: 45, arabic: 'الْوَاسِعُ', transliteration: 'Al-Wasi\'', transliterationTr: 'El-Vasi', meaning: 'The All-Embracing', meaningTr: 'Vasi' },
  { id: 46, arabic: 'الْحَكِيمُ', transliteration: 'Al-Hakim', transliterationTr: 'El-Hakim', meaning: 'The Wise', meaningTr: 'Hakim' },
  { id: 47, arabic: 'الْوَدُودُ', transliteration: 'Al-Wadud', transliterationTr: 'El-Vedud', meaning: 'The Loving', meaningTr: 'Vedud' },
  { id: 48, arabic: 'الْمَجِيدُ', transliteration: 'Al-Majid', transliterationTr: 'El-Mecid', meaning: 'The Glorious', meaningTr: 'Mecid' },
  { id: 49, arabic: 'الْبَاعِثُ', transliteration: 'Al-Ba\'ith', transliterationTr: 'El-Bais', meaning: 'The Resurrector', meaningTr: 'Bais' },
  { id: 50, arabic: 'الشَّهِيدُ', transliteration: 'Ash-Shahid', transliterationTr: 'Eş-Şehid', meaning: 'The Witness', meaningTr: 'Şehid' },
  { id: 51, arabic: 'الْحَقُّ', transliteration: 'Al-Haqq', transliterationTr: 'El-Hak', meaning: 'The Truth', meaningTr: 'Hak' },
  { id: 52, arabic: 'الْوَكِيلُ', transliteration: 'Al-Wakil', transliterationTr: 'El-Vekil', meaning: 'The Trustee', meaningTr: 'Vekil' },
  { id: 53, arabic: 'الْقَوِيُّ', transliteration: 'Al-Qawi', transliterationTr: 'El-Kavi', meaning: 'The Strong', meaningTr: 'Kavi' },
  { id: 54, arabic: 'الْمَتِينُ', transliteration: 'Al-Matin', transliterationTr: 'El-Metin', meaning: 'The Firm', meaningTr: 'Metin' },
  { id: 55, arabic: 'الْوَلِيُّ', transliteration: 'Al-Wali', transliterationTr: 'El-Veli', meaning: 'The Friend', meaningTr: 'Veli' },
  { id: 56, arabic: 'الْحَمِيدُ', transliteration: 'Al-Hamid', transliterationTr: 'El-Hamid', meaning: 'The Praiseworthy', meaningTr: 'Hamid' },
  { id: 57, arabic: 'الْمُحْصِي', transliteration: 'Al-Muhsi', transliterationTr: 'El-Muhsi', meaning: 'The Counter', meaningTr: 'Muhsi' },
  { id: 58, arabic: 'الْمُبْدِئُ', transliteration: 'Al-Mubdi\'', transliterationTr: 'El-Mübdi', meaning: 'The Originator', meaningTr: 'Mübdi' },
  { id: 59, arabic: 'الْمُعِيدُ', transliteration: 'Al-Mu\'id', transliterationTr: 'El-Muid', meaning: 'The Restorer', meaningTr: 'Muid' },
  { id: 60, arabic: 'الْمُحْيِي', transliteration: 'Al-Muhyi', transliterationTr: 'El-Muhyi', meaning: 'The Giver of Life', meaningTr: 'Muhyi' },
  { id: 61, arabic: 'الْمُمِيتُ', transliteration: 'Al-Mumit', transliterationTr: 'El-Mümit', meaning: 'The Taker of Life', meaningTr: 'Mümit' },
  { id: 62, arabic: 'الْحَيُّ', transliteration: 'Al-Hayy', transliterationTr: 'El-Hayy', meaning: 'The Living', meaningTr: 'Hayy' },
  { id: 63, arabic: 'الْقَيُّومُ', transliteration: 'Al-Qayyum', transliterationTr: 'El-Kayyum', meaning: 'The Self-Sustaining', meaningTr: 'Kayyum' },
  { id: 64, arabic: 'الْوَاجِدُ', transliteration: 'Al-Wajid', transliterationTr: 'El-Vacid', meaning: 'The Finder', meaningTr: 'Vacid' },
  { id: 65, arabic: 'الْمَاجِدُ', transliteration: 'Al-Majid', transliterationTr: 'El-Macid', meaning: 'The Noble', meaningTr: 'Macid' },
  { id: 66, arabic: 'الْوَاحِدُ', transliteration: 'Al-Wahid', transliterationTr: 'El-Vahid', meaning: 'The One', meaningTr: 'Vahid' },
  { id: 67, arabic: 'الصَّمَدُ', transliteration: 'As-Samad', transliterationTr: 'Es-Samed', meaning: 'The Eternal', meaningTr: 'Samed' },
  { id: 68, arabic: 'الْقَادِرُ', transliteration: 'Al-Qadir', transliterationTr: 'El-Kadir', meaning: 'The Able', meaningTr: 'Kadir' },
  { id: 69, arabic: 'الْمُقْتَدِرُ', transliteration: 'Al-Muqtadir', transliterationTr: 'El-Muktedir', meaning: 'The Powerful', meaningTr: 'Muktedir' },
  { id: 70, arabic: 'الْمُقَدِّمُ', transliteration: 'Al-Muqaddim', transliterationTr: 'El-Mukaddim', meaning: 'The Expediter', meaningTr: 'Mukaddim' },
  { id: 71, arabic: 'الْمُؤَخِّرُ', transliteration: 'Al-Mu\'akhkhir', transliterationTr: 'El-Muahhir', meaning: 'The Delayer', meaningTr: 'Muahhir' },
  { id: 72, arabic: 'الْأَوَّلُ', transliteration: 'Al-Awwal', transliterationTr: 'El-Evvel', meaning: 'The First', meaningTr: 'Evvel' },
  { id: 73, arabic: 'الْآخِرُ', transliteration: 'Al-Akhir', transliterationTr: 'El-Ahir', meaning: 'The Last', meaningTr: 'Ahir' },
  { id: 74, arabic: 'الظَّاهِرُ', transliteration: 'Az-Zahir', transliterationTr: 'Ez-Zahir', meaning: 'The Manifest', meaningTr: 'Zahir' },
  { id: 75, arabic: 'الْبَاطِنُ', transliteration: 'Al-Batin', transliterationTr: 'El-Batın', meaning: 'The Hidden', meaningTr: 'Batın' },
  { id: 76, arabic: 'الْوَالِي', transliteration: 'Al-Wali', transliterationTr: 'El-Vali', meaning: 'The Governor', meaningTr: 'Vali' },
  { id: 77, arabic: 'الْمُتَعَالِي', transliteration: 'Al-Muta\'ali', transliterationTr: 'El-Müteali', meaning: 'The Most High', meaningTr: 'Müteali' },
  { id: 78, arabic: 'الْبَرُّ', transliteration: 'Al-Barr', transliterationTr: 'El-Berr', meaning: 'The Righteous', meaningTr: 'Berr' },
  { id: 79, arabic: 'التَّوَّابُ', transliteration: 'At-Tawwab', transliterationTr: 'Et-Tevvab', meaning: 'The Acceptor of Repentance', meaningTr: 'Tevvab' },
  { id: 80, arabic: 'الْمُنْتَقِمُ', transliteration: 'Al-Muntaqim', transliterationTr: 'El-Müntekim', meaning: 'The Avenger', meaningTr: 'Müntekim' },
  { id: 81, arabic: 'الْعَفُوُّ', transliteration: 'Al-\'Afuww', transliterationTr: 'El-Afüvv', meaning: 'The Pardoner', meaningTr: 'Afüvv' },
  { id: 82, arabic: 'الرَّؤُوفُ', transliteration: 'Ar-Ra\'uf', transliterationTr: 'Er-Rauf', meaning: 'The Compassionate', meaningTr: 'Rauf' },
  { id: 83, arabic: 'مَالِكُ الْمُلْكِ', transliteration: 'Malik-ul-Mulk', transliterationTr: 'Malikül-Mülk', meaning: 'Owner of Sovereignty', meaningTr: 'Malikül-Mülk' },
  { id: 84, arabic: 'ذُو الْجَلَالِ وَالْإِكْرَامِ', transliteration: 'Dhul-Jalali wal-Ikram', transliterationTr: 'Zülcelali vel-İkram', meaning: 'Lord of Majesty and Bounty', meaningTr: 'Zülcelali vel-İkram' },
  { id: 85, arabic: 'الْمُقْسِطُ', transliteration: 'Al-Muqsit', transliterationTr: 'El-Muksit', meaning: 'The Equitable', meaningTr: 'Muksit' },
  { id: 86, arabic: 'الْجَامِعُ', transliteration: 'Al-Jami\'', transliterationTr: 'El-Cami', meaning: 'The Gatherer', meaningTr: 'Cami' },
  { id: 87, arabic: 'الْغَنِيُّ', transliteration: 'Al-Ghani', transliterationTr: 'El-Gani', meaning: 'The Rich', meaningTr: 'Gani' },
  { id: 88, arabic: 'الْمُغْنِي', transliteration: 'Al-Mughni', transliterationTr: 'El-Mugni', meaning: 'The Enricher', meaningTr: 'Mugni' },
  { id: 89, arabic: 'الْمَانِعُ', transliteration: 'Al-Mani\'', transliterationTr: 'El-Mani', meaning: 'The Preventer', meaningTr: 'Mani' },
  { id: 90, arabic: 'الضَّارُّ', transliteration: 'Ad-Darr', transliterationTr: 'Ed-Darr', meaning: 'The Distresser', meaningTr: 'Darr' },
  { id: 91, arabic: 'النَّافِعُ', transliteration: 'An-Nafi\'', transliterationTr: 'En-Nafi', meaning: 'The Benefiter', meaningTr: 'Nafi' },
  { id: 92, arabic: 'النُّورُ', transliteration: 'An-Nur', transliterationTr: 'En-Nur', meaning: 'The Light', meaningTr: 'Nur' },
  { id: 93, arabic: 'الْهَادِي', transliteration: 'Al-Hadi', transliterationTr: 'El-Hadi', meaning: 'The Guide', meaningTr: 'Hadi' },
  { id: 94, arabic: 'الْبَدِيعُ', transliteration: 'Al-Badi\'', transliterationTr: 'El-Bedi', meaning: 'The Incomparable', meaningTr: 'Bedi' },
  { id: 95, arabic: 'الْبَاقِي', transliteration: 'Al-Baqi', transliterationTr: 'El-Baki', meaning: 'The Everlasting', meaningTr: 'Baki' },
  { id: 96, arabic: 'الْوَارِثُ', transliteration: 'Al-Warith', transliterationTr: 'El-Varis', meaning: 'The Inheritor', meaningTr: 'Varis' },
  { id: 97, arabic: 'الرَّشِيدُ', transliteration: 'Ar-Rashid', transliterationTr: 'Er-Reşid', meaning: 'The Guide to Right Path', meaningTr: 'Reşid' },
  { id: 98, arabic: 'الصَّبُورُ', transliteration: 'As-Sabur', transliterationTr: 'Es-Sabur', meaning: 'The Patient', meaningTr: 'Sabur' },
  { id: 99, arabic: 'اللَّهُ', transliteration: 'Allah', transliterationTr: 'Allah', meaning: 'The Greatest Name', meaningTr: 'Allah' }
];

export const getAsmaUlHusnaById = (id: number): AsmaUlHusnaName | undefined => {
  return asmaUlHusnaNames.find(name => name.id === id);
};

export const getRandomAsmaUlHusna = (): AsmaUlHusnaName => {
  const randomIndex = Math.floor(Math.random() * asmaUlHusnaNames.length);
  return asmaUlHusnaNames[randomIndex];
};

export const searchAsmaUlHusna = (query: string): AsmaUlHusnaName[] => {
  const lowercaseQuery = query.toLowerCase();
  return asmaUlHusnaNames.filter(name => 
    name.arabic.includes(query) ||
    name.transliteration.toLowerCase().includes(lowercaseQuery) ||
    name.transliterationTr.toLowerCase().includes(lowercaseQuery) ||
    name.meaningTr.toLowerCase().includes(lowercaseQuery) ||
    name.meaning.toLowerCase().includes(lowercaseQuery)
  );
};
