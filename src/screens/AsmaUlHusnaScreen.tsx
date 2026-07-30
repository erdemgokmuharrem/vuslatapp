import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../store/useThemeStore';
import { useFontSizeStore } from '../store/useFontSizeStore';
import { useLanguageStore } from '../store/useLanguageStore';
import CustomHeader from '../components/common/CustomHeader';
import IslamicBackground from '../components/common/IslamicBackground';

const { width } = Dimensions.get('window');

// Allah'ın 99 güzel ismi — Türkçe ve İngilizce anlamlarıyla
const beautifulNames = [
  { arabic: 'الله', turkish: 'Allah', english: 'The Only God', meaning: 'Tek ve gerçek ilah', meaning_en: 'The Only Deity, the One true God' },
  { arabic: 'الرَّحْمَنُ', turkish: 'Er-Rahman', english: 'Ar-Rahman', meaning: 'Çok merhametli, dünyada bütün yaratıklara merhamet eden', meaning_en: 'The Most Compassionate, merciful to all creation in this world' },
  { arabic: 'الرَّحِيمُ', turkish: 'Er-Rahim', english: 'Ar-Raheem', meaning: 'Çok merhametli, ahirette müminlere merhamet eden', meaning_en: 'The Most Merciful, especially to believers in the Hereafter' },
  { arabic: 'الْمَلِكُ', turkish: 'El-Melik', english: 'Al-Malik', meaning: 'Mülkün gerçek sahibi, kainatın mutlak hükümdarı', meaning_en: 'The Sovereign, the absolute ruler of the universe' },
  { arabic: 'الْقُدُّوسُ', turkish: 'El-Kuddüs', english: 'Al-Quddus', meaning: 'Her türlü eksiklikten uzak, en temiz', meaning_en: 'The Pure, free from all imperfections' },
  { arabic: 'السَّلَامُ', turkish: 'Es-Selam', english: 'As-Salam', meaning: 'Esenlik, güvenlik ve barış kaynağı', meaning_en: 'The Source of Peace and Safety' },
  { arabic: 'الْمُؤْمِنُ', turkish: 'El-Mümin', english: 'Al-Mu\'min', meaning: 'Güven veren, iman bahşeden', meaning_en: 'The Granter of Security, the Faithful' },
  { arabic: 'الْمُهَيْمِنُ', turkish: 'El-Müheymin', english: 'Al-Muhaymin', meaning: 'Görüp gözeten, koruyan', meaning_en: 'The Guardian, the Overseer' },
  { arabic: 'الْعَزِيزُ', turkish: 'El-Aziz', english: 'Al-Aziz', meaning: 'Çok güçlü, üstün, yenilmez', meaning_en: 'The Almighty, the Invincible' },
  { arabic: 'الْجَبَّارُ', turkish: 'El-Cebbar', english: 'Al-Jabbar', meaning: 'İradesini her şeye uygulayan, onaran', meaning_en: 'The Compeller, the Restorer' },
  { arabic: 'الْمُتَكَبِّرُ', turkish: 'El-Mütekebbir', english: 'Al-Mutakabbir', meaning: 'Büyüklükte eşsiz, azamet sahibi', meaning_en: 'The Supremely Great, the Majestic' },
  { arabic: 'الْخَالِقُ', turkish: 'El-Halik', english: 'Al-Khaliq', meaning: 'Yaratan, yoktan var eden', meaning_en: 'The Creator, who creates from nothing' },
  { arabic: 'الْبَارِئُ', turkish: 'El-Bari', english: 'Al-Bari\'', meaning: 'Kusursuzca yaratan', meaning_en: 'The Originator, who creates perfectly' },
  { arabic: 'الْمُصَوِّرُ', turkish: 'El-Musavvir', english: 'Al-Musawwir', meaning: 'Şekil veren, suret veren', meaning_en: 'The Fashioner, who gives form and shape' },
  { arabic: 'الْغَفَّارُ', turkish: 'El-Gaffar', english: 'Al-Ghaffar', meaning: 'Çok bağışlayan', meaning_en: 'The Ever-Forgiving' },
  { arabic: 'الْقَهَّارُ', turkish: 'El-Kahhar', english: 'Al-Qahhar', meaning: 'Kahredici, mutlak galip', meaning_en: 'The Subduer, the Dominant' },
  { arabic: 'الْوَهَّابُ', turkish: 'El-Vehhab', english: 'Al-Wahhab', meaning: 'Karşılıksız bağışlayan', meaning_en: 'The Bestower, the Giver of gifts without return' },
  { arabic: 'الرَّزَّاقُ', turkish: 'Er-Rezzak', english: 'Ar-Razzaq', meaning: 'Rızık veren, rızık kaynağı', meaning_en: 'The Provider, the Sustainer' },
  { arabic: 'الْفَتَّاحُ', turkish: 'El-Fettah', english: 'Al-Fattah', meaning: 'Her şeyi açan, fetheden', meaning_en: 'The Opener, the Revealer' },
  { arabic: 'اَلْعَلِيمُ', turkish: 'El-Alim', english: 'Al-\'Alim', meaning: 'Her şeyi bilen', meaning_en: 'The All-Knowing, the Omniscient' },
  { arabic: 'الْقَابِضُ', turkish: 'El-Kabid', english: 'Al-Qabid', meaning: 'Rızkı daraltan, sıkan', meaning_en: 'The Withholder, the Restrainer' },
  { arabic: 'الْبَاسِطُ', turkish: 'El-Basit', english: 'Al-Basit', meaning: 'Rızkı genişleten, açan', meaning_en: 'The Extender, the Expander' },
  { arabic: 'الْخَافِضُ', turkish: 'El-Hafid', english: 'Al-Khafid', meaning: 'Alçaltan, indiren', meaning_en: 'The Abaser, who humbles' },
  { arabic: 'الرَّافِعُ', turkish: 'Er-Rafi', english: 'Ar-Rafi\'', meaning: 'Yükselten, değer veren', meaning_en: 'The Exalter, who raises up' },
  { arabic: 'الْمُعِزُّ', turkish: 'El-Muiz', english: 'Al-Mu\'izz', meaning: 'İzzet veren, yücelten', meaning_en: 'The Honorer, who gives honor' },
  { arabic: 'المُذِلُّ', turkish: 'El-Müzill', english: 'Al-Mudhill', meaning: 'Zillete düşüren, alçaltan', meaning_en: 'The Humiliator, who brings low' },
  { arabic: 'السَّمِيعُ', turkish: 'Es-Semi', english: 'As-Sami\'', meaning: 'Her şeyi işiten', meaning_en: 'The All-Hearing, the Listener' },
  { arabic: 'الْبَصِيرُ', turkish: 'El-Basir', english: 'Al-Basir', meaning: 'Her şeyi gören', meaning_en: 'The All-Seeing, the Beholder' },
  { arabic: 'الْحَكَمُ', turkish: 'El-Hakem', english: 'Al-Hakam', meaning: 'Hüküm veren, hakim', meaning_en: 'The Judge, the Arbitrator' },
  { arabic: 'الْعَدْلُ', turkish: 'El-Adl', english: 'Al-\'Adl', meaning: 'Adaletli, adil', meaning_en: 'The Just, the Equitable' },
  { arabic: 'اللَّطِيفُ', turkish: 'El-Latif', english: 'Al-Latif', meaning: 'Lütuf sahibi, ince, nazik', meaning_en: 'The Subtle, the Gracious' },
  { arabic: 'الْخَبِيرُ', turkish: 'El-Habir', english: 'Al-Khabir', meaning: 'Her şeyden haberdar', meaning_en: 'The Aware, the All-Knowing' },
  { arabic: 'الْحَلِيمُ', turkish: 'El-Halim', english: 'Al-Halim', meaning: 'Yumuşak huylu, cezalandırmada acele etmeyen', meaning_en: 'The Forbearing, not hasty in punishment' },
  { arabic: 'الْعَظِيمُ', turkish: 'El-Azim', english: 'Al-\'Azim', meaning: 'Çok büyük, sonsuz azamet sahibi', meaning_en: 'The Magnificent, of infinite greatness' },
  { arabic: 'الْغَفُورُ', turkish: 'El-Gafur', english: 'Al-Ghafur', meaning: 'Çok bağışlayan', meaning_en: 'The Most Forgiving, abundant in forgiveness' },
  { arabic: 'الشَّكُورُ', turkish: 'Eş-Şekur', english: 'Ash-Shakur', meaning: 'Şükreden, karşılık veren', meaning_en: 'The Appreciative, who rewards good deeds' },
  { arabic: 'الْعَلِيُّ', turkish: 'El-Aliyy', english: 'Al-\'Ali', meaning: 'Yüce, şanı yüce', meaning_en: 'The Most High, the Exalted' },
  { arabic: 'الْكَبِيرُ', turkish: 'El-Kebir', english: 'Al-Kabir', meaning: 'Büyük, ulu', meaning_en: 'The Most Great' },
  { arabic: 'الْحَفِيظُ', turkish: 'El-Hafiz', english: 'Al-Hafiz', meaning: 'Koruyan, muhafaza eden', meaning_en: 'The Preserver, the Guardian' },
  { arabic: 'المُقيِتُ', turkish: 'El-Mukit', english: 'Al-Muqit', meaning: 'Rızık veren, güç veren', meaning_en: 'The Sustainer, the Nourisher' },
  { arabic: 'الْحسِيبُ', turkish: 'El-Hasib', english: 'Al-Hasib', meaning: 'Hesap gören', meaning_en: 'The Reckoner, the Accountant' },
  { arabic: 'الْجَلِيلُ', turkish: 'El-Celil', english: 'Al-Jalil', meaning: 'Celal sahibi, ulu', meaning_en: 'The Majestic, the Sublime' },
  { arabic: 'الْكَرِيمُ', turkish: 'El-Kerim', english: 'Al-Karim', meaning: 'Cömert, ikram sahibi', meaning_en: 'The Generous, the Noble' },
  { arabic: 'الرَّقِيبُ', turkish: 'Er-Rakib', english: 'Ar-Raqib', meaning: 'Gözetleyici', meaning_en: 'The Watchful, the Observer' },
  { arabic: 'الْمُجِيبُ', turkish: 'El-Mücib', english: 'Al-Mujib', meaning: 'Duaları kabul eden', meaning_en: 'The Responsive, the Answerer of prayers' },
  { arabic: 'الْوَاسِعُ', turkish: 'El-Vasi', english: 'Al-Wasi\'', meaning: 'Geniş, kuşatan', meaning_en: 'The All-Encompassing, the Vast' },
  { arabic: 'الْحَكِيمُ', turkish: 'El-Hakim', english: 'Al-Hakim', meaning: 'Hikmet sahibi', meaning_en: 'The Wise, the All-Wise' },
  { arabic: 'الْوَدُودُ', turkish: 'El-Vedud', english: 'Al-Wadud', meaning: 'Çok seven, sevilen', meaning_en: 'The Loving, the Affectionate' },
  { arabic: 'الْمَجِيدُ', turkish: 'El-Mecid', english: 'Al-Majid', meaning: 'Şerefli, yüce', meaning_en: 'The Glorious, the Magnificent' },
  { arabic: 'الْبَاعِثُ', turkish: 'El-Bais', english: 'Al-Ba\'ith', meaning: 'Öldükten sonra dirilten', meaning_en: 'The Resurrector, who raises the dead' },
  { arabic: 'الشَّهِيدُ', turkish: 'Eş-Şehid', english: 'Ash-Shahid', meaning: 'Her şeye şahit olan', meaning_en: 'The Witness, present everywhere' },
  { arabic: 'الْحَقُّ', turkish: 'El-Hakk', english: 'Al-Haqq', meaning: 'Gerçek, hak', meaning_en: 'The Truth, the Real' },
  { arabic: 'الْوَكِيلُ', turkish: 'El-Vekil', english: 'Al-Wakil', meaning: 'Güvenilen vekil', meaning_en: 'The Trustee, the Disposer of Affairs' },
  { arabic: 'الْقَوِيُّ', turkish: 'El-Kaviyy', english: 'Al-Qawiyy', meaning: 'Güçlü, kuvvetli', meaning_en: 'The Strong, the Powerful' },
  { arabic: 'الْمَتِينُ', turkish: 'El-Metin', english: 'Al-Matin', meaning: 'Sağlam, güçlü', meaning_en: 'The Firm, the Steadfast' },
  { arabic: 'الْوَلِيُّ', turkish: 'El-Veliyy', english: 'Al-Wali', meaning: 'Dost, yardımcı', meaning_en: 'The Protecting Friend, the Helper' },
  { arabic: 'الْحَمِيدُ', turkish: 'El-Hamid', english: 'Al-Hamid', meaning: 'Övülen, övülmeye layık', meaning_en: 'The Praiseworthy, the Laudable' },
  { arabic: 'الْمُحْصِي', turkish: 'El-Muhsi', english: 'Al-Muhsi', meaning: 'Her şeyi sayan', meaning_en: 'The Reckoner, who counts all things' },
  { arabic: 'الْمُبْدِئُ', turkish: 'El-Mübdi', english: 'Al-Mubdi\'', meaning: 'İlk başlatan, yaratan', meaning_en: 'The Originator, who initiates creation' },
  { arabic: 'الْمُعِيدُ', turkish: 'El-Muid', english: 'Al-Mu\'id', meaning: 'Tekrar yaratan', meaning_en: 'The Restorer, who recreates' },
  { arabic: 'الْمُحْيِي', turkish: 'El-Muhyi', english: 'Al-Muhyi', meaning: 'Hayat veren', meaning_en: 'The Giver of Life' },
  { arabic: 'اَلْمُمِيتُ', turkish: 'El-Mümit', english: 'Al-Mumit', meaning: 'Öldüren', meaning_en: 'The Taker of Life, the Destroyer' },
  { arabic: 'الْحَيُّ', turkish: 'El-Hayy', english: 'Al-Hayy', meaning: 'Diri, ölümsüz', meaning_en: 'The Ever-Living, the Immortal' },
  { arabic: 'الْقَيُّومُ', turkish: 'El-Kayyum', english: 'Al-Qayyum', meaning: 'Kendi kendine kaim', meaning_en: 'The Self-Sustaining, the Eternal' },
  { arabic: 'الْوَاجِدُ', turkish: 'El-Vacid', english: 'Al-Wajid', meaning: 'Bulan, zengin', meaning_en: 'The Perceiver, the Finder' },
  { arabic: 'الْمَاجِدُ', turkish: 'El-Macid', english: 'Al-Majid', meaning: 'Şanlı, şerefli', meaning_en: 'The Illustrious, the Glorious' },
  { arabic: 'الْوَاحِدُ', turkish: 'El-Vahid', english: 'Al-Wahid', meaning: 'Bir, tek', meaning_en: 'The One, the Unique' },
  { arabic: 'اَلصَّمَدُ', turkish: 'Es-Samed', english: 'As-Samad', meaning: 'Hiçbir şeye muhtaç olmayan', meaning_en: 'The Eternal, the Absolute, needing nothing' },
  { arabic: 'الْقَادِرُ', turkish: 'El-Kadir', english: 'Al-Qadir', meaning: 'Güç yetiren, kudret sahibi', meaning_en: 'The Capable, the Powerful' },
  { arabic: 'الْمُقْتَدِرُ', turkish: 'El-Muktedir', english: 'Al-Muqtadir', meaning: 'Her şeyi yapabilen', meaning_en: 'The Omnipotent, All-Determining' },
  { arabic: 'الْمُقَدِّمُ', turkish: 'El-Mukaddim', english: 'Al-Muqaddim', meaning: 'Öne çıkaran, öne alan', meaning_en: 'The Expediter, who brings forward' },
  { arabic: 'الْمُؤَخِّرُ', turkish: 'El-Muahhir', english: 'Al-Mu\'akhkhir', meaning: 'Arkaya bırakan, erteleyen', meaning_en: 'The Delayer, who puts back' },
  { arabic: 'الأَوَّلُ', turkish: 'El-Evvel', english: 'Al-Awwal', meaning: 'İlk, başlangıcı olmayan', meaning_en: 'The First, with no beginning' },
  { arabic: 'الآخِرُ', turkish: 'El-Ahir', english: 'Al-Akhir', meaning: 'Son, sonu olmayan', meaning_en: 'The Last, with no end' },
  { arabic: 'الظَّاهِرُ', turkish: 'Ez-Zahir', english: 'Az-Zahir', meaning: 'Görünen, açık', meaning_en: 'The Manifest, the Apparent' },
  { arabic: 'الْبَاطِنُ', turkish: 'El-Batın', english: 'Al-Batin', meaning: 'Gizli, iç yüzü bilen', meaning_en: 'The Hidden, the Inner' },
  { arabic: 'الْوَالِي', turkish: 'El-Vali', english: 'Al-Wali', meaning: 'İdare eden, sahip', meaning_en: 'The Governor, the Ruler' },
  { arabic: 'الْمُتَعَالِي', turkish: 'El-Müteali', english: 'Al-Muta\'ali', meaning: 'Yüce, aşkın', meaning_en: 'The Most Exalted, the Transcendent' },
  { arabic: 'الْبَرُّ', turkish: 'El-Berr', english: 'Al-Barr', meaning: 'İyilik eden, lütufkar', meaning_en: 'The Source of Goodness, the Benign' },
  { arabic: 'التَّوَّابُ', turkish: 'Et-Tevvab', english: 'At-Tawwab', meaning: 'Tövbeleri kabul eden', meaning_en: 'The Acceptor of Repentance' },
  { arabic: 'الْمُنْتَقِمُ', turkish: 'El-Müntekim', english: 'Al-Muntaqim', meaning: 'İntikam alan', meaning_en: 'The Avenger, the Retaliator' },
  { arabic: 'اَلْعَفُوُّ', turkish: 'El-Afüv', english: 'Al-\'Afu', meaning: 'Affeden, bağışlayan', meaning_en: 'The Pardoner, the Effacer' },
  { arabic: 'الرَّؤُوفُ', turkish: 'Er-Rauf', english: 'Ar-Ra\'uf', meaning: 'Çok şefkatli', meaning_en: 'The Compassionate, the Kind' },
  { arabic: 'مَالِكُ الْمُلْكِ', turkish: 'Malik-ül Mülk', english: 'Malik ul-Mulk', meaning: 'Mülkün sahibi', meaning_en: 'The Owner of All Sovereignty' },
  { arabic: 'ذُوالْجَلاَلِ وَالإكْرَامِ', turkish: 'Zülcelali vel İkram', english: 'Dhul-Jalal wal-Ikram', meaning: 'Azamet ve ikram sahibi', meaning_en: 'The Lord of Majesty and Bounty' },
  { arabic: 'الْمُقْسِطُ', turkish: 'El-Muksit', english: 'Al-Muqsit', meaning: 'Adaletli davranan', meaning_en: 'The Equitable, the Just' },
  { arabic: 'الْجَامِعُ', turkish: 'El-Cami', english: 'Al-Jami\'', meaning: 'Toplayan, birleştiren', meaning_en: 'The Gatherer, the Uniter' },
  { arabic: 'الْغَنِيُّ', turkish: 'El-Ganiyy', english: 'Al-Ghani', meaning: 'Zengin, muhtaç olmayan', meaning_en: 'The Self-Sufficient, the Rich' },
  { arabic: 'الْمُغْنِي', turkish: 'El-Mugni', english: 'Al-Mughni', meaning: 'Zenginlik veren', meaning_en: 'The Enricher, the Emancipator' },
  { arabic: 'اَلْمَانِعُ', turkish: 'El-Mani', english: 'Al-Mani\'', meaning: 'Engelleyen, men eden', meaning_en: 'The Preventer, the Withholder' },
  { arabic: 'الضَّارَّ', turkish: 'Ed-Darr', english: 'Ad-Darr', meaning: 'Zarar veren', meaning_en: 'The Distresser, the Harmer' },
  { arabic: 'النَّافِعُ', turkish: 'En-Nafi', english: 'An-Nafi\'', meaning: 'Fayda veren', meaning_en: 'The Benefiter, the Propitious' },
  { arabic: 'النُّورُ', turkish: 'En-Nur', english: 'An-Nur', meaning: 'Nur, ışık', meaning_en: 'The Light, the Illuminator' },
  { arabic: 'الْهَادِي', turkish: 'El-Hadi', english: 'Al-Hadi', meaning: 'Hidayet veren, yol gösteren', meaning_en: 'The Guide, the Director' },
  { arabic: 'الْبَدِيعُ', turkish: 'El-Bedi', english: 'Al-Badi\'', meaning: 'Eşsiz yaratan', meaning_en: 'The Originator, the Incomparable' },
  { arabic: 'اَلْبَاقِي', turkish: 'El-Baki', english: 'Al-Baqi', meaning: 'Sonsuz, kalıcı', meaning_en: 'The Everlasting, the Eternal' },
  { arabic: 'الْوَارِثُ', turkish: 'El-Varis', english: 'Al-Warith', meaning: 'Her şeyin gerçek varisi', meaning_en: 'The Inheritor, the Heir of all' },
  { arabic: 'الرَّشِيدُ', turkish: 'Er-Reşid', english: 'Ar-Rashid', meaning: 'Doğru yolu gösteren', meaning_en: 'The Guide to the Right Path' },
  { arabic: 'الصَّبُورُ', turkish: 'Es-Sabur', english: 'As-Sabur', meaning: 'Çok sabırlı', meaning_en: 'The Patient, the Forbearing' },
];

export const AsmaUlHusnaScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { getThemeObject } = useThemeStore();
  const { scaledSize } = useFontSizeStore();
  const { language } = useLanguageStore();
  const theme = getThemeObject();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getMeaning = (name: typeof beautifulNames[0]) => {
    if (language === 'tr') return name.meaning;
    return name.meaning_en;
  };

  return (
    <IslamicBackground>
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        <CustomHeader
          title={t('asma_ul_husna')}
          showBackButton
          subtitle={t('asma_ul_husna_subtitle')}
          transparent
        />

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.intro, { color: theme.textColor, fontSize: scaledSize(15) }]}>
            {t('asma_ul_husna_intro')}
          </Text>

          <View style={styles.grid}>
            {beautifulNames.map((name, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.nameCard,
                  { backgroundColor: theme.cardBackgroundColor },
                  expandedIndex === index && styles.nameCardExpanded
                ]}
                onPress={() => toggleExpand(index)}
                activeOpacity={0.7}
              >
                <View style={styles.nameHeader}>
                  <Text style={[styles.nameNumber, { color: theme.primaryColor, fontSize: scaledSize(12) }]}>
                    {index + 1}
                  </Text>
                  <Text style={[styles.arabicName, { color: theme.primaryColor, fontSize: scaledSize(22) }]}>
                    {name.arabic}
                  </Text>
                </View>
                <Text style={[styles.turkishName, { color: theme.textColor, fontSize: scaledSize(14) }]}>
                  {name.turkish}
                </Text>
                {language !== 'tr' && (
                  <Text style={[styles.englishName, { color: theme.textColor + '80', fontSize: scaledSize(13) }]}>
                    {name.english}
                  </Text>
                )}
                {expandedIndex === index && (
                  <View style={[styles.meaningContainer, { backgroundColor: theme.primaryColor + '10' }]}>
                    <Text style={[styles.meaning, { color: theme.textColor + 'CC', fontSize: scaledSize(13) }]}>
                      {getMeaning(name)}
                    </Text>
                  </View>
                )}
                {expandedIndex !== index && (
                  <Ionicons
                    name="chevron-down"
                    size={14}
                    color={theme.textColor + '40'}
                    style={styles.chevron}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </View>
    </IslamicBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  intro: {
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nameCard: {
    width: (width - 44) / 2,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nameCardExpanded: {
    width: '100%',
  },
  nameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  nameNumber: {
    fontWeight: '600',
  },
  arabicName: {
    fontWeight: 'bold',
  },
  turkishName: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  englishName: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 2,
  },
  meaningContainer: {
    marginTop: 8,
    padding: 8,
    borderRadius: 8,
  },
  meaning: {
    lineHeight: 18,
    textAlign: 'center',
  },
  chevron: {
    alignSelf: 'center',
    marginTop: 4,
  },
});

export default AsmaUlHusnaScreen;
