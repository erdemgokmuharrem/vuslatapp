// Prophets History with detailed information starting with Prophet Muhammad (PBUH)
export interface Prophet {
  id: string;
  name: string;
  nameTr: string;
  nameArabic: string;
  title: string;
  titleTr: string;
  period: string;
  periodTr: string;
  location: string;
  locationTr: string;
  biography: string;
  biographyTr: string;
  keyEvents: string[];
  keyEventsTr: string[];
  teachings: string[];
  teachingsTr: string[];
  miracles: string[];
  miraclesTr: string[];
  legacy: string;
  legacyTr: string;
  imageUrl?: string;
  category: 'major' | 'important' | 'mentioned';
  order: number;
}

// Detailed Prophets collection starting with Prophet Muhammad (PBUH)
export const prophetsHistory: Prophet[] = [
  {
    id: 'muhammad',
    name: 'Muhammad',
    nameTr: 'Muhammed',
    nameArabic: 'مُحَمَّد',
    title: 'The Final Messenger (PBUH)',
    titleTr: 'Son Peygamber (s.a.v)',
    period: '570-632 CE',
    periodTr: '570-632 M.S.',
    location: 'Mecca and Medina, Arabian Peninsula',
    locationTr: 'Mekke ve Medine, Arap Yarımadası',
    biography: 'Muhammad (PBUH) was born in Mecca in 570 CE. He was known for his honesty and trustworthiness even before his prophethood. At age 40, he received his first revelation from Angel Gabriel in the cave of Hira. He spent 13 years preaching in Mecca, then migrated to Medina where he established the first Islamic state.',
    biographyTr: 'Muhammed (s.a.v) 570 yılında Mekke\'de doğdu. Peygamberliğinden önce bile dürüstlüğü ve güvenilirliği ile tanınırdı. 40 yaşında Hira mağarasında Cebrail\'den ilk vahyi aldı. 13 yıl Mekke\'de davet etti, sonra Medine\'ye hicret ederek ilk İslam devletini kurdu.',
    keyEvents: [
      'Birth in Mecca (570 CE)',
      'First revelation in Cave Hira (610 CE)',
      'Migration to Medina - Hijra (622 CE)',
      'Battle of Badr (624 CE)',
      'Conquest of Mecca (630 CE)',
      'Farewell Pilgrimage (632 CE)',
      'Passing away in Medina (632 CE)'
    ],
    keyEventsTr: [
      'Mekke\'de doğum (570)',
      'Hira mağarasında ilk vahiy (610)',
      'Medine\'ye hicret (622)',
      'Bedir Savaşı (624)',
      'Mekke\'nin fethi (630)',
      'Veda haccı (632)',
      'Medine\'de vefat (632)'
    ],
    teachings: [
      'Worship of One God (Tawhid)',
      'Five daily prayers',
      'Charity and social justice',
      'Honesty in all dealings',
      'Kindness to orphans and poor',
      'Rights of women and minorities',
      'Environmental stewardship'
    ],
    teachingsTr: [
      'Tek Allah\'a ibadet (Tevhid)',
      'Günde beş vakit namaz',
      'Sadaka ve sosyal adalet',
      'Her işte dürüstlük',
      'Yetim ve fakirlere şefkat',
      'Kadın ve azınlık hakları',
      'Çevre koruma sorumluluğu'
    ],
    miracles: [
      'The Holy Quran - linguistic miracle',
      'Night Journey (Isra and Miraj)',
      'Splitting of the moon',
      'Water flowing from fingers',
      'Multiplication of food',
      'Healing of the sick',
      'Prophecies that came true'
    ],
    miraclesTr: [
      'Kutsal Kuran - dil mucizesi',
      'Miraç (İsra ve Miraç)',
      'Ayın yarılması',
      'Parmaklarından su akması',
      'Yemeğin çoğalması',
      'Hastaları iyileştirme',
      'Gerçekleşen kehanetler'
    ],
    legacy: 'Prophet Muhammad (PBUH) left the greatest legacy in human history. Islam became the fastest-growing religion, the Quran remains unchanged, and his teachings continue to guide over 1.8 billion Muslims worldwide. His character and conduct serve as the perfect example for humanity.',
    legacyTr: 'Peygamber Muhammed (s.a.v) insanlık tarihinin en büyük mirasını bıraktı. İslam en hızlı yayılan din oldu, Kuran değişmeden kaldı ve öğretileri dünya çapında 1.8 milyardan fazla Müslümana rehberlik etmeye devam ediyor. Karakteri ve davranışları insanlık için mükemmel örnektir.',
    category: 'major',
    order: 1
  },
  {
    id: 'isa',
    name: 'Jesus (Isa)',
    nameTr: 'İsa',
    nameArabic: 'عِيسَى',
    title: 'The Messiah',
    titleTr: 'Mesih',
    period: '4 BCE - 30 CE (approx)',
    periodTr: 'M.Ö. 4 - M.S. 30 (yaklaşık)',
    location: 'Palestine',
    locationTr: 'Filistin',
    biography: 'Jesus (Isa) was born miraculously to Virgin Mary (Maryam) without a father. He was given the Gospel (Injil) and performed many miracles. He preached to the Children of Israel, calling them to worship Allah alone and follow the straight path.',
    biographyTr: 'İsa (a.s) Meryem Ana\'ya babasız olarak mucizevi şekilde doğdu. Kendisine İncil verildi ve birçok mucize gösterdi. İsrailoğullarına davet etti, onları yalnız Allah\'a ibadet etmeye ve doğru yola çağırdı.',
    keyEvents: [
      'Miraculous birth to Virgin Mary',
      'Speaking as an infant in the cradle',
      'Receiving the Gospel (Injil)',
      'Performing miracles',
      'Calling people to monotheism',
      'Ascension to heaven'
    ],
    keyEventsTr: [
      'Meryem Ana\'ya mucizevi doğum',
      'Beşikte konuşma',
      'İncil\'i alma',
      'Mucizeler gösterme',
      'İnsanları tevhide çağırma',
      'Göğe yükselme'
    ],
    teachings: [
      'Worship of Allah alone',
      'Love and compassion',
      'Helping the poor and needy',
      'Forgiveness and mercy',
      'Following divine guidance'
    ],
    teachingsTr: [
      'Yalnız Allah\'a ibadet',
      'Sevgi ve şefkat',
      'Fakir ve muhtaçlara yardım',
      'Bağışlama ve merhamet',
      'İlahi rehberliği takip etme'
    ],
    miracles: [
      'Speaking as a newborn',
      'Healing the blind and lepers',
      'Bringing the dead back to life',
      'Creating birds from clay',
      'Knowing what people ate and stored'
    ],
    miraclesTr: [
      'Yeni doğan olarak konuşma',
      'Körleri ve cüzamlıları iyileştirme',
      'Ölüleri diriltme',
      'Çamurdan kuş yaratma',
      'İnsanların ne yediğini ve sakladığını bilme'
    ],
    legacy: 'Jesus (Isa) is highly revered in Islam as one of the greatest prophets. His message of love, compassion, and monotheism continues to inspire millions. Muslims believe he will return before the Day of Judgment.',
    legacyTr: 'İsa (a.s) İslam\'da en büyük peygamberlerden biri olarak çok saygı görür. Sevgi, şefkat ve tevhid mesajı milyonlarca insana ilham vermeye devam ediyor. Müslümanlar onun kıyamet gününden önce döneceğine inanır.',
    category: 'major',
    order: 2
  },
  {
    id: 'musa',
    name: 'Moses (Musa)',
    nameTr: 'Musa',
    nameArabic: 'مُوسَى',
    title: 'The Speaker with Allah',
    titleTr: 'Kelimullah',
    period: '1393-1273 BCE (approx)',
    periodTr: 'M.Ö. 1393-1273 (yaklaşık)',
    location: 'Egypt and Sinai Peninsula',
    locationTr: 'Mısır ve Sina Yarımadası',
    biography: 'Moses (Musa) was born during the oppression of Israelites in Egypt. He was raised in Pharaoh\'s palace but fled after killing an Egyptian. Allah called him at Mount Sinai and gave him the Torah. He led the Israelites out of Egypt and received the Ten Commandments.',
    biographyTr: 'Musa (a.s) Mısır\'da İsrailoğullarının zulüm gördüğü dönemde doğdu. Firavun\'un sarayında büyüdü ama bir Mısırlıyı öldürdükten sonra kaçtı. Allah onu Sina Dağı\'nda çağırdı ve Tevrat\'ı verdi. İsrailoğullarını Mısır\'dan çıkardı ve On Emir\'i aldı.',
    keyEvents: [
      'Birth during Israelite oppression',
      'Raised in Pharaoh\'s palace',
      'Fleeing Egypt after killing Egyptian',
      'Calling by Allah at Mount Sinai',
      'Confronting Pharaoh with miracles',
      'Exodus from Egypt',
      'Receiving the Torah and Ten Commandments',
      'Wandering in the desert for 40 years'
    ],
    keyEventsTr: [
      'İsrailoğullarının zulmü sırasında doğum',
      'Firavun\'un sarayında büyüme',
      'Mısırlıyı öldürdükten sonra Mısır\'dan kaçış',
      'Sina Dağı\'nda Allah\'ın çağrısı',
      'Mucizelerle Firavun\'a karşı çıkma',
      'Mısır\'dan çıkış',
      'Tevrat ve On Emir\'i alma',
      '40 yıl çölde dolaşma'
    ],
    teachings: [
      'Monotheism and worship of Allah alone',
      'The Ten Commandments',
      'Justice and law',
      'Liberation from oppression',
      'Following divine guidance'
    ],
    teachingsTr: [
      'Tevhid ve yalnız Allah\'a ibadet',
      'On Emir',
      'Adalet ve hukuk',
      'Zulümden kurtuluş',
      'İlahi rehberliği takip etme'
    ],
    miracles: [
      'Staff turning into a serpent',
      'Hand glowing white',
      'Parting of the Red Sea',
      'Water from the rock',
      'Manna and quail from heaven',
      'Speaking directly with Allah'
    ],
    miraclesTr: [
      'Asanın yılana dönüşmesi',
      'Elin beyaz parlaması',
      'Kızıldeniz\'in yarılması',
      'Kayadan su çıkarma',
      'Gökten kudret helvasıı ve bıldırcın',
      'Allah ile doğrudan konuşma'
    ],
    legacy: 'Moses (Musa) is one of the most important prophets in Islam. He established the foundation of monotheistic law and justice. His struggle against oppression and his direct communication with Allah make him a central figure in Islamic history.',
    legacyTr: 'Musa (a.s) İslam\'da en önemli peygamberlerden biridir. Tevhidi hukuk ve adaletin temelini attı. Zulme karşı mücadelesi ve Allah ile doğrudan iletişimi onu İslam tarihinde merkezi bir figür yapar.',
    category: 'major',
    order: 3
  },
  {
    id: 'ibrahim',
    name: 'Abraham (Ibrahim)',
    nameTr: 'İbrahim',
    nameArabic: 'إِبْرَاهِيم',
    title: 'Friend of Allah (Khalilullah)',
    titleTr: 'Halilullah (Allah\'ın Dostu)',
    period: '2150-1975 BCE (approx)',
    periodTr: 'M.Ö. 2150-1975 (yaklaşık)',
    location: 'Mesopotamia, Palestine, Egypt',
    locationTr: 'Mezopotamya, Filistin, Mısır',
    biography: 'Abraham (Ibrahim) was born in Ur, Mesopotamia. He rejected idol worship from a young age and called people to worship Allah alone. He migrated to different lands spreading the message of monotheism. He is considered the father of monotheistic faiths.',
    biographyTr: 'İbrahim (a.s) Mezopotamya\'nın Ur şehrinde doğdu. Genç yaştan itibaren put tapıcılığını reddetti ve insanları yalnız Allah\'a ibadet etmeye çağırdı. Tevhid mesajını yayarak farklı topraklara göç etti. Tevhidi dinlerin babası kabul edilir.',
    keyEvents: [
      'Birth in Ur, Mesopotamia',
      'Rejecting idol worship',
      'Breaking the idols',
      'Being thrown into fire by Nimrod',
      'Migration to Palestine',
      'Building the Kaaba with Ishmael',
      'Sacrifice of Ishmael (prevented by Allah)',
      'Receiving the title "Friend of Allah"'
    ],
    keyEventsTr: [
      'Mezopotamya\'nın Ur şehrinde doğum',
      'Put tapıcılığını reddetme',
      'Putları kırma',
      'Nemrut tarafından ateşe atılma',
      'Filistin\'e göç',
      'İsmail ile Kabe\'yi inşa etme',
      'İsmail\'i kurban etme (Allah tarafından engellendi)',
      '"Allah\'ın Dostu" unvanını alma'
    ],
    teachings: [
      'Pure monotheism (Tawhid)',
      'Rejection of idol worship',
      'Complete submission to Allah',
      'Hospitality and generosity',
      'Trust in Allah\'s wisdom'
    ],
    teachingsTr: [
      'Saf tevhid',
      'Put tapıcılığını reddetme',
      'Allah\'a tam teslimiyet',
      'Misafirperverlik ve cömertlik',
      'Allah\'ın hikmetine güven'
    ],
    miracles: [
      'Fire becoming cool and safe',
      'Angels visiting as guests',
      'Well of Zamzam appearing',
      'Building the Kaaba',
      'Prophetic dreams'
    ],
    miraclesTr: [
      'Ateşin serin ve güvenli olması',
      'Meleklerin misafir olarak gelmesi',
      'Zemzem kuyusunun çıkması',
      'Kabe\'nin inşası',
      'Peygamberlik rüyaları'
    ],
    legacy: 'Abraham (Ibrahim) is revered as the father of monotheism. His legacy includes the establishment of pilgrimage to Mecca, the building of the Kaaba, and being the ancestor of many prophets including Muhammad (PBUH). His example of complete submission to Allah continues to inspire believers.',
    legacyTr: 'İbrahim (a.s) tevhidin babası olarak saygı görür. Mirası Mekke haccının kurulması, Kabe\'nin inşası ve Muhammed (s.a.v) dahil birçok peygamberin atası olmasını içerir. Allah\'a tam teslimiyet örneği müminlere ilham vermeye devam ediyor.',
    category: 'major',
    order: 4
  }
];

// Helper functions
export const getProphetById = (id: string): Prophet | undefined => {
  return prophetsHistory.find(prophet => prophet.id === id);
};

export const getAllProphets = (): Prophet[] => {
  return prophetsHistory.sort((a, b) => a.order - b.order);
};

export const getProphetsByCategory = (category: 'major' | 'important' | 'mentioned'): Prophet[] => {
  return prophetsHistory.filter(prophet => prophet.category === category);
};

export const searchProphets = (query: string): Prophet[] => {
  const lowercaseQuery = query.toLowerCase();
  return prophetsHistory.filter(prophet => 
    prophet.nameTr.toLowerCase().includes(lowercaseQuery) ||
    prophet.name.toLowerCase().includes(lowercaseQuery) ||
    prophet.titleTr.toLowerCase().includes(lowercaseQuery) ||
    prophet.biographyTr.toLowerCase().includes(lowercaseQuery)
  );
};
