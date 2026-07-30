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

// Peygamberler listesi
const prophets = [
    {
        id: 1,
        name: 'Hz. Adem (a.s.)',
        arabicName: 'آدم',
        title: 'İlk insan ve ilk peygamber',
        story: 'Hz. Adem, Allah\'ın topraktan yarattığı ilk insandır. Cennette Hz. Havva ile birlikte yaşarken, şeytanın aldatmasıyla yasak ağacın meyvesinden yediler ve dünyaya gönderildiler. Tevbe ettiler ve Allah onları affetti. Hz. Adem, insanlığın atası ve ilk peygamberdir.',
        lessons: ['Tevbe kapısı her zaman açıktır', 'Şeytanın aldatmalarından sakınmak gerekir'],
    },
    {
        id: 2,
        name: 'Hz. Nuh (a.s.)',
        arabicName: 'نوح',
        title: 'Tufan peygamberi',
        story: 'Hz. Nuh, kavmini 950 yıl boyunca Allah\'a imana davet etti. Ancak sadece az sayıda kişi iman etti. Allah\'ın emriyle büyük bir gemi inşa etti. Büyük tufan geldiğinde, iman edenler ve her hayvandan birer çift gemiye bindi. Tufandan sonra dünyada yeni bir hayat başladı.',
        lessons: ['Sabır ve sebat', 'Allah\'a güvenmek'],
    },
    {
        id: 3,
        name: 'Hz. İbrahim (a.s.)',
        arabicName: 'إبراهيم',
        title: 'Halilullah - Allah\'ın dostu',
        story: 'Hz. İbrahim, putlara tapan bir toplumda büyüdü. Tek Allah\'a inanarak put yapıcısı babasına ve kavmine karşı çıktı. Nemrut tarafından ateşe atıldı ancak Allah ateşi ona karşı serin ve selamet kıldı. Kabe\'yi oğlu Hz. İsmail ile birlikte inşa etti.',
        lessons: ['Tevhid inancı', 'Allah için fedakarlık'],
    },
    {
        id: 4,
        name: 'Hz. İsmail (a.s.)',
        arabicName: 'إسماعيل',
        title: 'Kurban edilmekten kurtulan',
        story: 'Hz. İbrahim\'in oğlu Hz. İsmail, babasının rüyasında gördüğü emre boyun eğerek kurban olmayı kabul etti. Allah, Hz. İsmail\'in yerine bir koç göndererek onu kurtardı. Bu olay Kurban Bayramı\'nın kökenini oluşturur. Kabe\'nin inşasında babasına yardım etti.',
        lessons: ['Allah\'a teslimiyet', 'Sadakat'],
    },
    {
        id: 5,
        name: 'Hz. Yakub (a.s.)',
        arabicName: 'يعقوب',
        title: 'İsrail (Allah\'ın kulu)',
        story: 'Hz. İshak\'ın oğlu ve Hz. Yusuf\'un babasıdır. 12 oğlu vardı ve bunlardan İsrailoğulları geldi. Oğlu Yusuf\'un kayboluşu üzerine çok üzüldü ve ağlamaktan gözleri görmez oldu. Yıllar sonra Yusuf\'la kavuşunca gözleri tekrar açıldı.',
        lessons: ['Sabır', 'Allah\'a tevekkül'],
    },
    {
        id: 6,
        name: 'Hz. Yusuf (a.s.)',
        arabicName: 'يوسف',
        title: 'En güzel kıssa',
        story: 'Hz. Yakub\'un en çok sevdiği oğlu olan Yusuf, kardeşleri tarafından kuyuya atıldı. Mısır\'a köle olarak satıldı, sonra iftiraya uğrayıp hapse girdi. Rüya yorumlama yeteneğiyle kralın rüyasını yorumladı ve Mısır\'ın hazinedarı oldu. Sonunda ailesiyle kavuştu.',
        lessons: ['Sabır', 'İffet', 'Affetmek'],
    },
    {
        id: 7,
        name: 'Hz. Musa (a.s.)',
        arabicName: 'موسى',
        title: 'Kelimullah - Allah ile konuşan',
        story: 'Hz. Musa, Firavun\'un sarayında büyüdü. Allah onu peygamber olarak seçti ve İsrailoğullarını Mısır\'dan çıkardı. Denizi yararak kavmini kurtardı. Tur Dağı\'nda Allah ile konuştu ve Tevrat\'ı aldı. 40 yıl çölde kavmiyle yaşadı.',
        lessons: ['Zulme karşı durmak', 'Allah\'a güvenmek'],
    },
    {
        id: 8,
        name: 'Hz. Davud (a.s.)',
        arabicName: 'داود',
        title: 'Zebur\'un sahibi',
        story: 'Hz. Davud, genç yaşta dev savaşçı Calut\'u yendi. Hem peygamber hem de kral oldu. Demiri elleriyle şekillendirme mucizesi verildi. Zebur kitabı ona indirildi. Güzel sesiyle Allah\'ı zikredirdi, dağlar ve kuşlar ona eşlik ederdi.',
        lessons: ['Cesaret', 'Şükür'],
    },
    {
        id: 9,
        name: 'Hz. Süleyman (a.s.)',
        arabicName: 'سليمان',
        title: 'Cinlere ve hayvanlara hükmeden',
        story: 'Hz. Davud\'un oğlu Süleyman, benzersiz bir saltanat sahibiydi. Kuşların, karıncaların ve cinlerin dilini anlardı. Cinler ona hizmet ederdi. Sebe Melikesi Belkıs\'ı imana davet etti. Kudüs\'te muhteşem bir mabet inşa etti.',
        lessons: ['İlim', 'Adaletli yönetim'],
    },
    {
        id: 10,
        name: 'Hz. İsa (a.s.)',
        arabicName: 'عيسى',
        title: 'Ruhullah - Allah\'ın ruhu',
        story: 'Hz. İsa, babasız olarak Hz. Meryem\'den dünyaya geldi. Beşikte iken konuştu. Ölüleri diriltmek, körleri ve cüzzamlıları iyileştirmek gibi mucizeler gösterdi. İncil ona indirildi. Çarmıha gerilmeden Allah katına yükseltildi.',
        lessons: ['Tevazu', 'Merhamet'],
    },
    {
        id: 11,
        name: 'Hz. Muhammed (s.a.v.)',
        arabicName: 'محمد',
        title: 'Son Peygamber - Habibullah',
        story: 'Hz. Muhammed (s.a.v.), 570 yılında Mekke\'de doğdu. 40 yaşında peygamberlik verildi. 23 yıl boyunca Kur\'an-ı Kerim ona indirildi. Mekke\'den Medine\'ye hicret etti. İslam\'ı tüm Arabistan\'a yaydı. 632 yılında Medine\'de vefat etti.',
        lessons: ['Güzel ahlak', 'Merhamet', 'Adalet', 'Sabır'],
    },
];

export const ProphetsHistoryScreen = () => {
    const navigation = useNavigation();
    const { getThemeObject } = useThemeStore();
    const theme = getThemeObject();
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <IslamicBackground>
            <View style={[styles.container, { backgroundColor: 'transparent' }]}>
                <CustomHeader
                    title="Peygamberler Tarihi"
                    showBackButton
                    subtitle="25 Peygamber"
                    transparent
                />

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={[styles.intro, { color: theme.textColor }]}>
                        Kur'an-ı Kerim'de 25 peygamberin ismi geçmektedir. Her biri insanlığa hidayet
                        yolunu göstermek için gönderilmiştir.
                    </Text>

                    {prophets.map((prophet) => (
                        <TouchableOpacity
                            key={prophet.id}
                            style={[styles.prophetCard, { backgroundColor: theme.cardBackgroundColor }]}
                            onPress={() => toggleExpand(prophet.id)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.prophetHeader}>
                                <View style={[styles.prophetNumber, { backgroundColor: theme.primaryColor }]}>
                                    <Text style={styles.prophetNumberText}>{prophet.id}</Text>
                                </View>
                                <View style={styles.prophetInfo}>
                                    <Text style={[styles.prophetName, { color: theme.textColor }]}>
                                        {prophet.name}
                                    </Text>
                                    <Text style={[styles.prophetTitle, { color: theme.textColor + '80' }]}>
                                        {prophet.title}
                                    </Text>
                                </View>
                                <Text style={[styles.arabicName, { color: theme.primaryColor }]}>
                                    {prophet.arabicName}
                                </Text>
                            </View>

                            {expandedId === prophet.id && (
                                <View style={styles.expandedContent}>
                                    <Text style={[styles.storyTitle, { color: theme.primaryColor }]}>
                                        Kıssası
                                    </Text>
                                    <Text style={[styles.story, { color: theme.textColor }]}>
                                        {prophet.story}
                                    </Text>

                                    <Text style={[styles.lessonsTitle, { color: theme.primaryColor }]}>
                                        Çıkarılacak Dersler
                                    </Text>
                                    {prophet.lessons.map((lesson, index) => (
                                        <View key={index} style={styles.lessonItem}>
                                            <Ionicons name="checkmark-circle" size={18} color={theme.primaryColor} />
                                            <Text style={[styles.lessonText, { color: theme.textColor }]}>
                                                {lesson}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            )}

                            <View style={styles.expandIndicator}>
                                <Ionicons
                                    name={expandedId === prophet.id ? 'chevron-up' : 'chevron-down'}
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
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 20,
        textAlign: 'center',
    },
    prophetCard: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    prophetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    prophetNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    prophetNumberText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    prophetInfo: {
        flex: 1,
    },
    prophetName: {
        fontSize: 16,
        fontWeight: '600',
    },
    prophetTitle: {
        fontSize: 13,
        marginTop: 2,
    },
    arabicName: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    expandedContent: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
    },
    storyTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 8,
    },
    story: {
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 16,
    },
    lessonsTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 8,
    },
    lessonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    lessonText: {
        fontSize: 14,
        marginLeft: 8,
    },
    expandIndicator: {
        alignItems: 'center',
        marginTop: 8,
    },
});

export default ProphetsHistoryScreen;
