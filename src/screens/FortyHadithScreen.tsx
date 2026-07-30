import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../store/useThemeStore';
import { useFontSizeStore } from '../store/useFontSizeStore';
import { useLanguageStore } from '../store/useLanguageStore';
import CustomHeader from '../components/common/CustomHeader';
import IslamicBackground from '../components/common/IslamicBackground';

// 40 Hadis — Türkçe ve İngilizce metinlerle
const fortyHadiths = [
    {
        id: 1,
        arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ',
        turkish: 'Ameller niyetlere göredir.',
        english: 'Actions are judged by intentions.',
        narrator: 'Ömer b. Hattab (r.a.)',
        narrator_en: 'Umar ibn al-Khattab (RA)',
        source: 'Buhârî, Müslim',
        explanation: 'Her işin değeri, arkasındaki niyete göredir. Allah, insanların kalbindeki niyetlere göre hüküm verir.',
        explanation_en: 'Every deed is judged by its intention. Allah judges people according to the intentions in their hearts.',
    },
    {
        id: 2,
        arabic: 'الدِّينُ النَّصِيحَةُ',
        turkish: 'Din nasihattir.',
        english: 'Religion is sincerity.',
        narrator: 'Temim ed-Dari (r.a.)',
        narrator_en: 'Tamim al-Dari (RA)',
        source: 'Müslim',
        explanation: 'Din, samimi öğüt ve iyilik istemektir. Allah\'a, kitabına, Resulüne, Müslüman idarecilere ve halka karşı içten olmaktır.',
        explanation_en: 'Religion is sincerity — to Allah, His Book, His Messenger, Muslim leaders, and all people.',
    },
    {
        id: 3,
        arabic: 'بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ',
        turkish: 'İslam beş esas üzerine bina edilmiştir.',
        english: 'Islam is built upon five pillars.',
        narrator: 'Abdullah b. Ömer (r.a.)',
        narrator_en: 'Abdullah ibn Umar (RA)',
        source: 'Buhârî, Müslim',
        explanation: 'Kelime-i şehadet, namaz, zekat, oruç ve hacdan oluşan İslam\'ın beş şartı.',
        explanation_en: 'Shahada, prayer, zakat, fasting, and Hajj — the five pillars of Islam.',
    },
    {
        id: 4,
        arabic: 'مَنْ رَأَى مِنْكُمْ مُنْكَرًا فَلْيُغَيِّرْهُ بِيَدِهِ',
        turkish: 'Sizden kim bir kötülük görürse onu eliyle değiştirsin.',
        english: 'Whoever sees a wrong should change it with his hand.',
        narrator: 'Ebu Said el-Hudri (r.a.)',
        narrator_en: 'Abu Sa\'id al-Khudri (RA)',
        source: 'Müslim',
        explanation: 'Kötülüğü elle, dille veya en azından kalple reddetmek gerekir. Kalple reddetmek imanın en zayıf noktasıdır.',
        explanation_en: 'Change wrong with your hand, then with your tongue, and if not, then in your heart — that is the weakest of faith.',
    },
    {
        id: 5,
        arabic: 'لَا ضَرَرَ وَلَا ضِرَارَ',
        turkish: 'Zarar vermek de zarara zararla karşılık vermek de yoktur.',
        english: 'Do not harm others, nor respond to harm with harm.',
        narrator: 'Ebu Said el-Hudri (r.a.)',
        narrator_en: 'Abu Sa\'id al-Khudri (RA)',
        source: 'İbn Mace',
        explanation: 'İslam\'da başkasına zarar vermek ve zararla karşılık vermek yasaktır.',
        explanation_en: 'In Islam, it is forbidden to harm others or to retaliate with harm.',
    },
    {
        id: 6,
        arabic: 'الْحَلَالُ بَيِّنٌ وَالْحَرَامُ بَيِّنٌ',
        turkish: 'Helal bellidir, haram da bellidir.',
        english: 'The lawful is clear and the unlawful is clear.',
        narrator: 'Numan b. Beşir (r.a.)',
        narrator_en: 'Nu\'man ibn Bashir (RA)',
        source: 'Buhârî, Müslim',
        explanation: 'Şüpheli şeylerden kaçınan dinini ve namusunu korumuş olur.',
        explanation_en: 'Whoever avoids doubtful matters has protected his religion and honor.',
    },
    {
        id: 7,
        arabic: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
        turkish: 'Sizden biri kendisi için istediğini kardeşi için de istemedikçe iman etmiş olmaz.',
        english: 'None of you truly believes until he loves for his brother what he loves for himself.',
        narrator: 'Enes b. Malik (r.a.)',
        narrator_en: 'Anas ibn Malik (RA)',
        source: 'Buhârî, Müslim',
        explanation: 'Gerçek iman, kardeşlik bilinci ve fedakarlık içerir.',
        explanation_en: 'True faith requires brotherhood and selflessness.',
    },
    {
        id: 8,
        arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
        turkish: 'Allah\'a ve ahiret gününe iman eden ya hayır söylesin ya sussun.',
        english: 'Whoever believes in Allah and the Last Day, let him speak good or remain silent.',
        narrator: 'Ebu Hureyre (r.a.)',
        narrator_en: 'Abu Hurayra (RA)',
        source: 'Buhârî, Müslim',
        explanation: 'Mümin dilini kontrol etmeli, gereksiz ve zararlı konuşmalardan kaçınmalıdır.',
        explanation_en: 'A believer should guard their tongue and avoid unnecessary or harmful speech.',
    },
    {
        id: 9,
        arabic: 'لَا تَغْضَبْ',
        turkish: 'Kızma!',
        english: 'Do not become angry.',
        narrator: 'Ebu Hureyre (r.a.)',
        narrator_en: 'Abu Hurayra (RA)',
        source: 'Buhârî',
        explanation: 'Öfkeyi kontrol etmek imanın ve olgunluğun göstergesidir.',
        explanation_en: 'Controlling anger is a sign of faith and maturity.',
    },
    {
        id: 10,
        arabic: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ',
        turkish: 'Müslüman, dilinden ve elinden diğer Müslümanların güvende olduğu kimsedir.',
        english: 'A Muslim is one from whose tongue and hand other Muslims are safe.',
        narrator: 'Abdullah b. Amr (r.a.)',
        narrator_en: 'Abdullah ibn Amr (RA)',
        source: 'Buhârî, Müslim',
        explanation: 'Gerçek Müslümanlık, başkalarına zarar vermemektir.',
        explanation_en: 'True Islam means not harming others.',
    },
];

export const FortyHadithScreen = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const { getThemeObject } = useThemeStore();
    const { scaledSize } = useFontSizeStore();
    const { language } = useLanguageStore();
    const theme = getThemeObject();
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const getHadithText = (hadith: typeof fortyHadiths[0]) => {
        return language === 'tr' ? hadith.turkish : hadith.english;
    };

    const getExplanationText = (hadith: typeof fortyHadiths[0]) => {
        return language === 'tr' ? hadith.explanation : hadith.explanation_en;
    };

    const getNarratorText = (hadith: typeof fortyHadiths[0]) => {
        return language === 'tr' ? hadith.narrator : hadith.narrator_en;
    };

    return (
        <IslamicBackground>
            <View style={[styles.container, { backgroundColor: 'transparent' }]}>
                <CustomHeader
                    title={t('forty_hadith')}
                    showBackButton
                    subtitle={t('forty_hadith_subtitle')}
                    transparent
                />

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={[styles.intro, { color: theme.textColor, fontSize: scaledSize(15) }]}>
                        {t('forty_hadith_intro')}
                    </Text>

                    {fortyHadiths.map((hadith) => (
                        <TouchableOpacity
                            key={hadith.id}
                            style={[styles.hadithCard, { backgroundColor: theme.cardBackgroundColor }]}
                            onPress={() => toggleExpand(hadith.id)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.hadithHeader}>
                                <View style={[styles.hadithNumber, { backgroundColor: theme.primaryColor }]}>
                                    <Text style={[styles.hadithNumberText, { fontSize: scaledSize(14) }]}>{hadith.id}</Text>
                                </View>
                                <Text style={[styles.source, { color: theme.textColor + '80', fontSize: scaledSize(12) }]}>
                                    {hadith.source}
                                </Text>
                            </View>

                            <Text style={[styles.arabicText, { color: theme.primaryColor, fontSize: scaledSize(20), lineHeight: scaledSize(20) * 1.6 }]}>
                                {hadith.arabic}
                            </Text>

                            <Text style={[styles.hadithText, { color: theme.textColor, fontSize: scaledSize(16), lineHeight: scaledSize(16) * 1.5 }]}>
                                {getHadithText(hadith)}
                            </Text>

                            <Text style={[styles.narrator, { color: theme.textColor + '80', fontSize: scaledSize(13) }]}>
                                {t('narrator_short')}: {getNarratorText(hadith)}
                            </Text>

                            {expandedId === hadith.id && (
                                <View style={[styles.explanationContainer, { backgroundColor: theme.primaryColor + '10' }]}>
                                    <Text style={[styles.explanationTitle, { color: theme.primaryColor, fontSize: scaledSize(14) }]}>
                                        {t('explanation_label')}
                                    </Text>
                                    <Text style={[styles.explanation, { color: theme.textColor, fontSize: scaledSize(14), lineHeight: scaledSize(14) * 1.5 }]}>
                                        {getExplanationText(hadith)}
                                    </Text>
                                </View>
                            )}

                            <View style={styles.expandIndicator}>
                                <Ionicons
                                    name={expandedId === hadith.id ? 'chevron-up' : 'chevron-down'}
                                    size={20}
                                    color={theme.textColor + '60'}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}

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
    hadithCard: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    hadithHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    hadithNumber: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    hadithNumberText: {
        color: 'white',
        fontWeight: 'bold',
    },
    source: {
        fontStyle: 'italic',
    },
    arabicText: {
        textAlign: 'right',
        fontWeight: '500',
        marginBottom: 12,
    },
    hadithText: {
        fontWeight: '600',
        marginBottom: 8,
    },
    narrator: {
        fontStyle: 'italic',
    },
    explanationContainer: {
        marginTop: 12,
        padding: 12,
        borderRadius: 8,
    },
    explanationTitle: {
        fontWeight: '600',
        marginBottom: 6,
    },
    explanation: {
    },
    expandIndicator: {
        alignItems: 'center',
        marginTop: 8,
    },
});

export default FortyHadithScreen;
