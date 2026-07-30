// Types for Feed data
export interface FeedItem {
  id: string;
  type: 'ayah' | 'hadith';
  content: string;
  translation: string;
  source: string;
  reference: string;
  tags: string[];
  date: string; // ISO string format
}

// Sample Ayahs for feed
export const ayahs: FeedItem[] = [
  {
    id: 'ayah-1',
    type: 'ayah',
    content: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    translation: 'Şüphesiz güçlükle beraber bir kolaylık vardır.',
    source: 'Kuran-ı Kerim',
    reference: 'İnşirah Suresi 94:6',
    tags: ['kolaylık', 'zorluk', 'sabır'],
    date: '2023-01-01T00:00:00.000Z',
  },
  {
    id: 'ayah-2',
    type: 'ayah',
    content: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
    translation: 'Gerçekten güçlükle beraber bir kolaylık vardır.',
    source: 'Kuran-ı Kerim',
    reference: 'İnşirah Suresi 94:5',
    tags: ['kolaylık', 'zorluk', 'sabır'],
    date: '2023-01-02T00:00:00.000Z',
  },
  {
    id: 'ayah-3',
    type: 'ayah',
    content: 'وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ',
    translation: 'Gevşemeyin, üzülmeyin. Eğer gerçek mü\'minler iseniz, en üstün olan sizsiniz.',
    source: 'Kuran-ı Kerim',
    reference: 'Âl-i İmran Suresi 3:139',
    tags: ['güç', 'iman', 'üzüntü'],
    date: '2023-01-03T00:00:00.000Z',
  },
  {
    id: 'ayah-4',
    type: 'ayah',
    content: 'إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ',
    translation: 'Mü\'minler ancak kardeştirler.',
    source: 'Kuran-ı Kerim',
    reference: 'Hucurat Suresi 49:10',
    tags: ['kardeşlik', 'iman', 'birlik'],
    date: '2023-01-04T00:00:00.000Z',
  },
  {
    id: 'ayah-5',
    type: 'ayah',
    content: 'وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ',
    translation: 'Sabret. Senin sabrın ancak Allah\'ın yardımıyladır.',
    source: 'Kuran-ı Kerim',
    reference: 'Nahl Suresi 16:127',
    tags: ['sabır', 'iman', 'güç'],
    date: '2023-01-05T00:00:00.000Z',
  },
];

// Sample Hadiths for feed
export const hadiths: FeedItem[] = [
  {
    id: 'hadith-1',
    type: 'hadith',
    content: 'إنما الأعمال بالنيات وإنما لكل امرئ ما نوى',
    translation: 'Ameller niyetlere göredir ve herkes için niyet ettiği şey vardır.',
    source: 'Buhari',
    reference: 'Kitap 1, Hadis 1',
    tags: ['niyet', 'amel', 'ibadet'],
    date: '2023-01-06T00:00:00.000Z',
  },
  {
    id: 'hadith-2',
    type: 'hadith',
    content: 'الدين النصيحة',
    translation: 'Din nasihattir.',
    source: 'Müslim',
    reference: 'Kitap 1, Hadis 82',
    tags: ['samimiyet', 'nasihat', 'din'],
    date: '2023-01-07T00:00:00.000Z',
  },
  {
    id: 'hadith-3',
    type: 'hadith',
    content: 'من حسن إسلام المرء تركه ما لا يعنيه',
    translation: 'Kişinin İslam\'ının güzelliğinden biri, kendisini ilgilendirmeyen şeyleri terk etmesidir.',
    source: 'Tirmizi',
    reference: 'Kitap 34, Hadis 2317',
    tags: ['kemal', 'islam', 'ahlak'],
    date: '2023-01-08T00:00:00.000Z',
  },
  {
    id: 'hadith-4',
    type: 'hadith',
    content: 'لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه',
    translation: 'Sizden biriniz, kardeşi için kendi nefsine istediğini istemedikçe gerçek mü\'min olamaz.',
    source: 'Buhari',
    reference: 'Kitap 2, Hadis 6',
    tags: ['iman', 'kardeşlik', 'sevgi'],
    date: '2023-01-09T00:00:00.000Z',
  },
  {
    id: 'hadith-5',
    type: 'hadith',
    content: 'الكلمة الطيبة صدقة',
    translation: 'Güzel söz sadakadır.',
    source: 'Buhari',
    reference: 'Kitap 73, Hadis 56',
    tags: ['sadaka', 'iyilik', 'konuşma'],
    date: '2023-01-10T00:00:00.000Z',
  },
];

// All feed items combined
export const allFeedItems: FeedItem[] = [...ayahs, ...hadiths].sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

// Get all unique tags
export const getAllTags = (): string[] => {
  const tagsSet = new Set<string>();
  
  allFeedItems.forEach(item => {
    item.tags.forEach(tag => {
      tagsSet.add(tag);
    });
  });
  
  return Array.from(tagsSet).sort();
};

// Filter feed items by tag
export const filterByTag = (tag: string): FeedItem[] => {
  return allFeedItems.filter(item => item.tags.includes(tag));
};

// Filter feed items by type
export const filterByType = (type: 'ayah' | 'hadith'): FeedItem[] => {
  return allFeedItems.filter(item => item.type === type);
};

// Get feed item by ID
export const getFeedItemById = (id: string): FeedItem | undefined => {
  return allFeedItems.find(item => item.id === id);
};

// Get random feed item
export const getRandomFeedItem = (): FeedItem => {
  const randomIndex = Math.floor(Math.random() * allFeedItems.length);
  return allFeedItems[randomIndex];
};
