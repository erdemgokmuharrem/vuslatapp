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
import { useThemeStore } from '../store/useThemeStore';
import CustomHeader from '../components/common/CustomHeader';
import IslamicBackground from '../components/common/IslamicBackground';

// Güzel dualar
const beautifulDuas = [
    {
        id: 1,
        category: 'Sabah Akşam Duaları',
        duas: [
            {
                title: 'Seyyidül İstiğfar',
                arabic: 'اَللّهُمَّ أَنْتَ رَبِّي لاَ إِلهَ إِلاَّ أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ',
                transliteration: 'Allahümme ente Rabbi la ilahe illa ente halakteni ve ene abdüke ve ene ala ahdike ve vadike mesteta\'tü euzü bike min şerri ma sana\'tü ebuu leke bi ni\'metike aleyye ve ebuu bi zenbi fağfirli fe innehu la yağfiruz-zunube illa ente',
                meaning: 'Allah\'ım! Sen benim Rabbimsin. Senden başka ilah yoktur. Sen beni yarattın. Ben senin kulunum ve gücümün yettiğince senin ahdin ve vaadin üzereyim. Yaptıklarımın şerrinden sana sığınırım. Senin bana verdiğin nimetleri itiraf ediyor, günahlarımı da itiraf ediyorum. Beni bağışla. Çünkü günahları ancak sen bağışlarsın.',
                virtue: 'Bu duayı akşamleyin okuyan ve o gece ölen cennete girer. Sabahleyin okuyan ve o gün ölen de cennete girer.',
            },
        ],
    },
    {
        id: 2,
        category: 'Koruma Duaları',
        duas: [
            {
                title: 'Ayetel Kürsi',
                arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ',
                transliteration: 'Allahu la ilahe illa huvel hayyul kayyum. La te\'huzuhu sinetun ve la nevm. Lehu ma fis-semavati ve ma fil-ard...',
                meaning: 'Allah, kendisinden başka hiçbir ilah olmayandır. Diridir, kayyumdur. O\'nu ne bir uyuklama tutabilir, ne de bir uyku. Göklerdeki her şey, yerdeki her şey O\'nundur...',
                virtue: 'Her namazdan sonra ve yatmadan önce okuyan, Allah\'ın koruması altına girer.',
            },
        ],
    },
    {
        id: 3,
        category: 'Sıkıntı Anları İçin',
        duas: [
            {
                title: 'Hz. Yunus\'un Duası',
                arabic: 'لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
                transliteration: 'La ilahe illa ente subhaneke inni küntü minez-zalimin',
                meaning: 'Senden başka ilah yoktur. Seni tenzih ederim. Şüphesiz ben zalimlerden oldum.',
                virtue: 'Hz. Yunus\'un balığın karnındayken okuduğu bu duayı herhangi bir sıkıntı anında okuyan Müslümana Allah mutlaka cevap verir.',
            },
            {
                title: 'Sıkıntı Duası',
                arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ',
                transliteration: 'Allahümme inni euzü bike minel-hemmi vel-hazen ve euzü bike minel-aczi vel-kesel ve euzü bike minel-cübni vel-buhli ve euzü bike min ğalebetid-deyni ve kahrir-rical',
                meaning: 'Allah\'ım! Kederden ve hüzünden sana sığınırım. Acizlikten ve tembellikten sana sığınırım. Korkaklıktan ve cimrilikten sana sığınırım. Borç altında ezilmekten ve insanların kahrından sana sığınırım.',
            },
        ],
    },
    {
        id: 4,
        category: 'Rızık ve Bereket',
        duas: [
            {
                title: 'Rızık Duası',
                arabic: 'اللَّهُمَّ اكْفِنِي بِحَلالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
                transliteration: 'Allahümmekfini bi halalike an haramike ve ağnini bi fadlike ammen sivake',
                meaning: 'Allah\'ım! Beni helalinle haramından koru ve fazlınla senden başkasına muhtaç etme.',
                virtue: 'Bu duayı okuyan kimseye Allah, ummadığı yerden rızık verir.',
            },
        ],
    },
    {
        id: 5,
        category: 'Yolculuk Duaları',
        duas: [
            {
                title: 'Yolculuk Duası',
                arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
                transliteration: 'Subhanellezi sehhara lena haza ve ma künna lehu mukriniyn ve inna ila Rabbina lemunkalibun',
                meaning: 'Bunu bizim hizmetimize veren Allah eksikliklerden uzaktır. Yoksa biz bunu (kendi gücümüzle) elde edemezdik. Şüphesiz biz Rabbimize döneceğiz.',
                virtue: 'Herhangi bir vasıtaya bindiğinde bu dua okunur.',
            },
        ],
    },
];

export const BeautifulDuasScreen = () => {
    const navigation = useNavigation();
    const { getThemeObject } = useThemeStore();
    const theme = getThemeObject();
    const [expandedDua, setExpandedDua] = useState<string | null>(null);

    const toggleExpand = (duaTitle: string) => {
        setExpandedDua(expandedDua === duaTitle ? null : duaTitle);
    };

    return (
        <IslamicBackground>
            <View style={[styles.container, { backgroundColor: 'transparent' }]}>
                <CustomHeader
                    title="Güzel Dualar"
                    showBackButton
                    subtitle="Seçilmiş dualar"
                    transparent
                />

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={[styles.intro, { color: theme.textColor }]}>
                        Peygamber Efendimiz'den (s.a.v.) ve Kur'an-ı Kerim'den seçilmiş güzel dualar.
                    </Text>

                    {beautifulDuas.map((category) => (
                        <View key={category.id} style={styles.categoryContainer}>
                            <View style={[styles.categoryHeader, { backgroundColor: theme.primaryColor }]}>
                                <Text style={styles.categoryTitle}>{category.category}</Text>
                            </View>

                            <View style={[styles.duasContainer, { backgroundColor: theme.cardBackgroundColor }]}>
                                {category.duas.map((dua) => (
                                    <TouchableOpacity
                                        key={dua.title}
                                        style={styles.duaItem}
                                        onPress={() => toggleExpand(dua.title)}
                                        activeOpacity={0.7}
                                    >
                                        <View style={styles.duaHeader}>
                                            <Text style={[styles.duaTitle, { color: theme.textColor }]}>
                                                {dua.title}
                                            </Text>
                                            <Ionicons
                                                name={expandedDua === dua.title ? 'chevron-up' : 'chevron-down'}
                                                size={20}
                                                color={theme.textColor + '60'}
                                            />
                                        </View>

                                        {expandedDua === dua.title && (
                                            <View style={styles.duaContent}>
                                                <Text style={[styles.arabicText, { color: theme.primaryColor }]}>
                                                    {dua.arabic}
                                                </Text>

                                                {dua.transliteration && (
                                                    <Text style={[styles.transliteration, { color: theme.textColor + '80' }]}>
                                                        {dua.transliteration}
                                                    </Text>
                                                )}

                                                <Text style={[styles.meaning, { color: theme.textColor }]}>
                                                    <Text style={{ fontWeight: '600' }}>Anlamı: </Text>
                                                    {dua.meaning}
                                                </Text>

                                                {dua.virtue && (
                                                    <View style={[styles.virtueContainer, { backgroundColor: theme.primaryColor + '10' }]}>
                                                        <Ionicons name="star" size={16} color={theme.primaryColor} />
                                                        <Text style={[styles.virtue, { color: theme.textColor }]}>
                                                            {dua.virtue}
                                                        </Text>
                                                    </View>
                                                )}
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
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
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 20,
        textAlign: 'center',
    },
    categoryContainer: {
        marginBottom: 20,
    },
    categoryHeader: {
        padding: 14,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    categoryTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    duasContainer: {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        overflow: 'hidden',
    },
    duaItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    duaHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    duaTitle: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    duaContent: {
        marginTop: 12,
    },
    arabicText: {
        fontSize: 20,
        lineHeight: 34,
        textAlign: 'right',
        fontWeight: '500',
        marginBottom: 12,
    },
    transliteration: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 12,
        lineHeight: 22,
    },
    meaning: {
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 12,
    },
    virtueContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 12,
        borderRadius: 8,
    },
    virtue: {
        fontSize: 13,
        marginLeft: 8,
        flex: 1,
        lineHeight: 20,
    },
});

export default BeautifulDuasScreen;
