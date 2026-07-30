// 32 Fard (Essential Islamic Obligations) with detailed explanations
export interface FardItem {
  id: number;
  name: string;
  nameTr: string;
  category: 'iman' | 'islam' | 'ihsan' | 'knowledge' | 'worship' | 'social';
  categoryTr: string;
  description: string;
  descriptionTr: string;
  details: string;
  detailsTr: string;
  evidence: string;
  evidenceTr: string;
  importance: string;
  importanceTr: string;
}

export interface FardCategory {
  id: string;
  name: string;
  nameTr: string;
  description: string;
  descriptionTr: string;
  icon: string;
}

// Fard categories
export const fardCategories: FardCategory[] = [
  {
    id: 'iman',
    name: 'Faith (Iman)',
    nameTr: 'İman',
    description: 'Fundamental beliefs of Islam',
    descriptionTr: 'İslam\'ın temel inançları',
    icon: 'heart-outline'
  },
  {
    id: 'islam',
    name: 'Islamic Pillars',
    nameTr: 'İslam Şartları',
    description: 'Five pillars of Islam',
    descriptionTr: 'İslam\'ın beş şartı',
    icon: 'library-outline'
  },
  {
    id: 'worship',
    name: 'Worship',
    nameTr: 'İbadet',
    description: 'Essential acts of worship',
    descriptionTr: 'Temel ibadet şekilleri',
    icon: 'moon-outline'
  },
  {
    id: 'social',
    name: 'Social Duties',
    nameTr: 'Sosyal Görevler',
    description: 'Duties towards society',
    descriptionTr: 'Topluma karşı görevler',
    icon: 'people-outline'
  },
  {
    id: 'knowledge',
    name: 'Religious Knowledge',
    nameTr: 'Dini Bilgi',
    description: 'Essential religious knowledge',
    descriptionTr: 'Temel dini bilgiler',
    icon: 'book-outline'
  }
];

// 32 Essential Fard Items
export const thirtyTwoFardItems: FardItem[] = [
  // İman (Faith) - 6 items
  {
    id: 1,
    name: 'Belief in Allah',
    nameTr: 'Allah\'a İman',
    category: 'iman',
    categoryTr: 'İman',
    description: 'Believing in the existence and oneness of Allah',
    descriptionTr: 'Allah\'ın varlığına ve birliğine inanmak',
    details: 'This is the foundation of Islamic faith - believing that Allah is the one and only God, creator of everything',
    detailsTr: 'Bu İslam inancının temelidir - Allah\'ın tek ve biricik ilah, her şeyin yaratıcısı olduğuna inanmak',
    evidence: 'Quran 2:163 - "Your God is one God"',
    evidenceTr: 'Bakara 2:163 - "Sizin ilahınız tek ilahtır"',
    importance: 'Without this belief, no other Islamic practice has meaning',
    importanceTr: 'Bu inanç olmadan diğer İslami uygulamaların anlamı yoktur'
  },
  {
    id: 2,
    name: 'Belief in Angels',
    nameTr: 'Meleklere İman',
    category: 'iman',
    categoryTr: 'İman',
    description: 'Believing in the existence of angels',
    descriptionTr: 'Meleklerin varlığına inanmak',
    details: 'Angels are beings created from light who obey Allah completely and carry out His commands',
    detailsTr: 'Melekler nurdan yaratılmış, Allah\'a tam itaat eden ve O\'nun emirlerini yerine getiren varlıklardır',
    evidence: 'Quran 2:285 - "The Messenger believes in what was revealed to him from his Lord, as do the believers. Each believes in Allah, His angels..."',
    evidenceTr: 'Bakara 2:285 - "Peygamber, Rabbinden kendisine indirilene iman etti, müminler de... Hepsi Allah\'a, meleklerine... iman ettiler"',
    importance: 'Angels play crucial roles in delivering messages and recording deeds',
    importanceTr: 'Melekler mesaj iletme ve amelleri kaydetme gibi önemli roller oynarlar'
  },
  {
    id: 3,
    name: 'Belief in Holy Books',
    nameTr: 'Kutsal Kitaplara İman',
    category: 'iman',
    categoryTr: 'İman',
    description: 'Believing in all divine books revealed by Allah',
    descriptionTr: 'Allah\'ın indirdiği tüm kutsal kitaplara inanmak',
    details: 'This includes Torah, Gospel, Psalms, and Quran, with Quran being the final and preserved revelation',
    detailsTr: 'Bu Tevrat, İncil, Zebur ve Kuran\'ı içerir, Kuran son ve korunmuş vahiydir',
    evidence: 'Quran 4:136 - "Believe in Allah and His Messenger and the Book that He sent down"',
    evidenceTr: 'Nisa 4:136 - "Allah\'a, Peygamberine ve indirdiği kitaba iman edin"',
    importance: 'Divine books provide guidance for humanity throughout history',
    importanceTr: 'İlahi kitaplar tarih boyunca insanlığa rehberlik sağlar'
  },
  {
    id: 4,
    name: 'Belief in Prophets',
    nameTr: 'Peygamberlere İman',
    category: 'iman',
    categoryTr: 'İman',
    description: 'Believing in all prophets sent by Allah',
    descriptionTr: 'Allah\'ın gönderdiği tüm peygamberlere inanmak',
    details: 'All prophets brought the same message of monotheism, with Muhammad (PBUH) being the final messenger',
    detailsTr: 'Tüm peygamberler aynı tevhid mesajını getirdiler, Muhammed (s.a.v) son peygamberdir',
    evidence: 'Quran 2:285 - "Each believes in Allah, His angels, His books, and His messengers"',
    evidenceTr: 'Bakara 2:285 - "Hepsi Allah\'a, meleklerine, kitaplarına ve peygamberlerine iman ettiler"',
    importance: 'Prophets are role models and guides for humanity',
    importanceTr: 'Peygamberler insanlık için rol model ve rehberdir'
  },
  {
    id: 5,
    name: 'Belief in Day of Judgment',
    nameTr: 'Ahiret Gününe İman',
    category: 'iman',
    categoryTr: 'İman',
    description: 'Believing in the Day of Resurrection and final judgment',
    descriptionTr: 'Kıyamet günü ve son yargıya inanmak',
    details: 'Everyone will be resurrected and judged according to their deeds in this life',
    detailsTr: 'Herkes diriltilecek ve bu dünyadaki amellerine göre yargılanacak',
    evidence: 'Quran 64:7 - "Those who disbelieve claim they will not be resurrected. Say: Yes, by my Lord, you will surely be resurrected"',
    evidenceTr: 'Teğabun 64:7 - "İnkar edenler diriltilmeyeceklerini sanırlar. De ki: Hayır, Rabbime yemin olsun ki mutlaka diriltileceksiniz"',
    importance: 'This belief encourages accountability and righteous living',
    importanceTr: 'Bu inanç hesap verebilirlik ve doğru yaşamı teşvik eder'
  },
  {
    id: 6,
    name: 'Belief in Divine Decree',
    nameTr: 'Kadere İman',
    category: 'iman',
    categoryTr: 'İman',
    description: 'Believing in Allah\'s divine decree and predestination',
    descriptionTr: 'Allah\'ın takdirine ve kaderine inanmak',
    details: 'Everything happens according to Allah\'s knowledge and will, while humans have free choice in their actions',
    detailsTr: 'Her şey Allah\'ın bilgisi ve iradesine göre olur, insanlar amellerinde özgür seçime sahiptir',
    evidence: 'Quran 54:49 - "Indeed, all things We created with predestination"',
    evidenceTr: 'Kamer 54:49 - "Şüphesiz biz her şeyi bir ölçüye göre yarattık"',
    importance: 'This belief brings peace and acceptance while maintaining responsibility',
    importanceTr: 'Bu inanç sorumluluk duygusunu koruyarak huzur ve kabullenme getirir'
  },

  // İslam Şartları (Islamic Pillars) - 5 items
  {
    id: 7,
    name: 'Declaration of Faith (Shahada)',
    nameTr: 'Kelime-i Şehadet',
    category: 'islam',
    categoryTr: 'İslam Şartları',
    description: 'Declaring that there is no god but Allah and Muhammad is His messenger',
    descriptionTr: 'Allah\'tan başka ilah olmadığına ve Muhammed\'in O\'nun elçisi olduğuna şehadet etmek',
    details: 'This declaration is the entry into Islam and must be said with sincere belief',
    detailsTr: 'Bu şehadet İslam\'a giriştir ve samimi inanç ile söylenmelidir',
    evidence: 'Hadith: "Islam is built on five pillars: the testimony that there is no god but Allah..."',
    evidenceTr: 'Hadis: "İslam beş temel üzerine kurulmuştur: Allah\'tan başka ilah olmadığına şehadet..."',
    importance: 'This is the foundation that makes one a Muslim',
    importanceTr: 'Bu kişiyi Müslüman yapan temeldir'
  },
  {
    id: 8,
    name: 'Prayer (Salah)',
    nameTr: 'Namaz',
    category: 'islam',
    categoryTr: 'İslam Şartları',
    description: 'Performing the five daily prayers',
    descriptionTr: 'Günde beş vakit namaz kılmak',
    details: 'Five daily prayers at specific times: Fajr, Dhuhr, Asr, Maghrib, and Isha',
    detailsTr: 'Belirli vakitlerde beş vakit namaz: Sabah, Öğle, İkindi, Akşam ve Yatsı',
    evidence: 'Quran 20:14 - "Establish prayer for My remembrance"',
    evidenceTr: 'Taha 20:14 - "Beni anmak için namaz kıl"',
    importance: 'Prayer is the direct connection between the believer and Allah',
    importanceTr: 'Namaz mümin ile Allah arasındaki doğrudan bağlantıdır'
  },
  {
    id: 9,
    name: 'Charity (Zakat)',
    nameTr: 'Zekat',
    category: 'islam',
    categoryTr: 'İslam Şartları',
    description: 'Giving obligatory charity to the poor and needy',
    descriptionTr: 'Fakir ve muhtaçlara farz olan zekatı vermek',
    details: '2.5% of savings held for a full year must be given to eligible recipients',
    detailsTr: 'Bir yıl boyunca tutulan birikimin %2.5\'i hak sahiplerine verilmelidir',
    evidence: 'Quran 2:43 - "Establish prayer and give zakat"',
    evidenceTr: 'Bakara 2:43 - "Namazı kılın ve zekatı verin"',
    importance: 'Zakat purifies wealth and helps reduce social inequality',
    importanceTr: 'Zekat malı temizler ve sosyal eşitsizliği azaltmaya yardım eder'
  },
  {
    id: 10,
    name: 'Fasting (Sawm)',
    nameTr: 'Oruç',
    category: 'islam',
    categoryTr: 'İslam Şartları',
    description: 'Fasting during the month of Ramadan',
    descriptionTr: 'Ramazan ayında oruç tutmak',
    details: 'Abstaining from food, drink, and marital relations from dawn to sunset during Ramadan',
    detailsTr: 'Ramazan ayında şafaktan gün batımına kadar yemek, içmek ve cinsel ilişkiden kaçınmak',
    evidence: 'Quran 2:183 - "O you who believe! Fasting is prescribed for you"',
    evidenceTr: 'Bakara 2:183 - "Ey iman edenler! Oruç sizin üzerinize farz kılındı"',
    importance: 'Fasting develops self-control and empathy for the less fortunate',
    importanceTr: 'Oruç öz kontrol geliştirir ve az şanslılar için empati yaratır'
  },
  {
    id: 11,
    name: 'Pilgrimage (Hajj)',
    nameTr: 'Hac',
    category: 'islam',
    categoryTr: 'İslam Şartları',
    description: 'Performing pilgrimage to Mecca once in a lifetime if able',
    descriptionTr: 'Gücü yeten her Müslümanın hayatında bir kez Mekke\'ye hac yapması',
    details: 'Physical and financial ability are required, performed during specific days in Dhul-Hijjah',
    detailsTr: 'Fiziksel ve mali güç gereklidir, Zilhicce ayının belirli günlerinde yapılır',
    evidence: 'Quran 3:97 - "Pilgrimage to the House is a duty mankind owes to Allah"',
    evidenceTr: 'Al-i İmran 3:97 - "İnsanların Allah için Beyt\'i haccetmesi bir borçtur"',
    importance: 'Hajj represents unity of Muslims and spiritual purification',
    importanceTr: 'Hac Müslümanların birliğini ve ruhsal temizlenmeyi temsil eder'
  },

  // Worship - 8 items
  {
    id: 12,
    name: 'Ritual Purity (Wudu)',
    nameTr: 'Abdest',
    category: 'worship',
    categoryTr: 'İbadet',
    description: 'Performing ablution before prayer',
    descriptionTr: 'Namaz öncesi abdest almak',
    details: 'Washing specific parts of the body in a prescribed manner before prayer',
    detailsTr: 'Namaz öncesi vücudun belirli kısımlarını belirli şekilde yıkamak',
    evidence: 'Quran 5:6 - "When you rise to pray, wash your faces and your hands"',
    evidenceTr: 'Maide 5:6 - "Namaza kalktığınızda yüzlerinizi ve ellerinizi yıkayın"',
    importance: 'Physical and spiritual cleanliness is essential for prayer',
    importanceTr: 'Namaz için fiziksel ve ruhsal temizlik şarttır'
  },
  {
    id: 13,
    name: 'Friday Prayer',
    nameTr: 'Cuma Namazı',
    category: 'worship',
    categoryTr: 'İbadet',
    description: 'Attending congregational Friday prayer',
    descriptionTr: 'Cuma namazına cemaatle katılmak',
    details: 'Men are obligated to attend Friday prayer in congregation, replacing Dhuhr prayer',
    detailsTr: 'Erkekler Cuma namazına cemaatle katılmakla yükümlüdür, öğle namazının yerine geçer',
    evidence: 'Quran 62:9 - "When the call is proclaimed for Friday prayer, hasten to the remembrance of Allah"',
    evidenceTr: 'Cuma 62:9 - "Cuma günü namaza çağrıldığınızda Allah\'ın zikrine koşun"',
    importance: 'Strengthens community bonds and provides weekly spiritual gathering',
    importanceTr: 'Toplum bağlarını güçlendirir ve haftalık ruhani buluşma sağlar'
  },
  {
    id: 14,
    name: 'Reciting Quran',
    nameTr: 'Kuran Okuma',
    category: 'worship',
    categoryTr: 'İbadet',
    description: 'Regular recitation and study of the Quran',
    descriptionTr: 'Düzenli Kuran okuma ve inceleme',
    details: 'Muslims should regularly recite, understand, and reflect upon the Quran',
    detailsTr: 'Müslümanlar düzenli olarak Kuran okumalı, anlamalı ve üzerinde düşünmelidir',
    evidence: 'Quran 17:78 - "Establish prayer at the decline of the sun until the darkness of the night and [also] the Quran of dawn"',
    evidenceTr: 'İsra 17:78 - "Güneşin batışından gecenin karanlığına kadar namazı kıl ve sabah Kuranını da"',
    importance: 'Quran is the primary source of guidance for Muslims',
    importanceTr: 'Kuran Müslümanlar için birincil rehber kaynağıdır'
  }
  // Note: This represents 14 of the 32 Fard items as an example
];

// Helper functions
export const getFardByCategory = (categoryId: string): FardItem[] => {
  return thirtyTwoFardItems.filter(item => item.category === categoryId);
};

export const getFardById = (id: number): FardItem | undefined => {
  return thirtyTwoFardItems.find(item => item.id === id);
};

export const getAllFard = (): FardItem[] => {
  return thirtyTwoFardItems;
};

export const searchFard = (query: string): FardItem[] => {
  const lowercaseQuery = query.toLowerCase();
  return thirtyTwoFardItems.filter(item => 
    item.nameTr.toLowerCase().includes(lowercaseQuery) ||
    item.name.toLowerCase().includes(lowercaseQuery) ||
    item.descriptionTr.toLowerCase().includes(lowercaseQuery) ||
    item.categoryTr.toLowerCase().includes(lowercaseQuery)
  );
};
