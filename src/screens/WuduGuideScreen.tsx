import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../store/useThemeStore';
import CustomHeader from '../components/common/CustomHeader';
import IslamicBackground from '../components/common/IslamicBackground';

// Abdest adımları
const wuduSteps = [
    {
        id: 1,
        title: 'Niyet',
        description: 'Abdest almaya niyet edilir. Kalben Allah rızası için abdest almaya niyet etmek yeterlidir.',
        arabic: 'نَوَيْتُ الْوُضُوءَ',
        transliteration: 'Neveytül vudua',
    },
    {
        id: 2,
        title: 'Elleri Yıkama',
        description: 'Eller bileklere kadar üç kez yıkanır. Parmak araları iyice temizlenir.',
        isRequired: true,
    },
    {
        id: 3,
        title: 'Ağız Çalkalama (Mazmaza)',
        description: 'Ağız üç kez su ile çalkalanır. Su ağzın her tarafına ulaştırılır.',
        isSunnah: true,
    },
    {
        id: 4,
        title: 'Burun Temizleme (İstinşak)',
        description: 'Burun üç kez su ile temizlenir. Sol el ile burun silinir.',
        isSunnah: true,
    },
    {
        id: 5,
        title: 'Yüz Yıkama',
        description: 'Yüz üç kez yıkanır. Alından çene altına, kulaktan kulağa kadar tüm yüz ıslatılır.',
        isRequired: true,
    },
    {
        id: 6,
        title: 'Kolları Yıkama',
        description: 'Sağ ve sol kollar dirseklere kadar üç kez yıkanır.',
        isRequired: true,
    },
    {
        id: 7,
        title: 'Başı Meshetme',
        description: 'Islak ellerle başın üzeri mesh edilir. Eller alndan enşeye doğru çekilir.',
        isRequired: true,
    },
    {
        id: 8,
        title: 'Kulakları Meshetme',
        description: 'İşaret parmakları kulak içine, başparmaklar kulak arkasına konularak mesh edilir.',
        isSunnah: true,
    },
    {
        id: 9,
        title: 'Boynu Meshetme',
        description: 'Islak ellerin arkasıyla boyun mesh edilir.',
        isSunnah: true,
    },
    {
        id: 10,
        title: 'Ayakları Yıkama',
        description: 'Sağ ve sol ayaklar topuklara kadar üç kez yıkanır. Parmak araları temizlenir.',
        isRequired: true,
    },
];

// Abdesti bozan durumlar
const wuduBreakers = [
    'Küçük veya büyük abdest bozmak',
    'Yellenmek',
    'Uyumak',
    'Bayılmak',
    'Sarhoş olmak',
    'Kahkaha ile gülmek (namazda)',
    'Ağız dolusu kusmak',
    'Vücuttan kan veya irin çıkması',
];

// Abdestin farzları
const wuduFards = [
    'Yüzü yıkamak',
    'Kolları dirseklerle birlikte yıkamak',
    'Başın dörtte birini meshetmek',
    'Ayakları topuklarla birlikte yıkamak',
];

export const WuduGuideScreen = () => {
    const navigation = useNavigation();
    const { getThemeObject } = useThemeStore();
    const theme = getThemeObject();
    const [activeTab, setActiveTab] = useState<'steps' | 'fards' | 'breakers'>('steps');

    return (
        <IslamicBackground>
            <View style={[styles.container, { backgroundColor: 'transparent' }]}>
                <CustomHeader
                    title="Abdest Nasıl Alınır"
                    showBackButton
                    subtitle="Adım adım rehber"
                    transparent
                />

                {/* Tab seçimi */}
                <View style={[styles.tabContainer, { backgroundColor: theme.cardBackgroundColor }]}>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 'steps' && { backgroundColor: theme.primaryColor }
                        ]}
                        onPress={() => setActiveTab('steps')}
                    >
                        <Text style={[
                            styles.tabButtonText,
                            { color: activeTab === 'steps' ? 'white' : theme.textColor }
                        ]}>
                            Adımlar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 'fards' && { backgroundColor: theme.primaryColor }
                        ]}
                        onPress={() => setActiveTab('fards')}
                    >
                        <Text style={[
                            styles.tabButtonText,
                            { color: activeTab === 'fards' ? 'white' : theme.textColor }
                        ]}>
                            Farzlar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 'breakers' && { backgroundColor: theme.primaryColor }
                        ]}
                        onPress={() => setActiveTab('breakers')}
                    >
                        <Text style={[
                            styles.tabButtonText,
                            { color: activeTab === 'breakers' ? 'white' : theme.textColor }
                        ]}>
                            Bozanlar
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    {activeTab === 'steps' && (
                        <>
                            <Text style={[styles.intro, { color: theme.textColor }]}>
                                Abdest, namaz kılmak, Kur'an okumak ve diğer ibadetler için gerekli temizlik ibadetidir.
                            </Text>

                            {wuduSteps.map((step) => (
                                <View
                                    key={step.id}
                                    style={[styles.stepCard, { backgroundColor: theme.cardBackgroundColor }]}
                                >
                                    <View style={styles.stepHeader}>
                                        <View style={[styles.stepNumber, { backgroundColor: theme.primaryColor }]}>
                                            <Text style={styles.stepNumberText}>{step.id}</Text>
                                        </View>
                                        <Text style={[styles.stepTitle, { color: theme.textColor }]}>
                                            {step.title}
                                        </Text>
                                        {step.isRequired && (
                                            <View style={[styles.badge, { backgroundColor: theme.primaryColor }]}>
                                                <Text style={styles.badgeText}>Farz</Text>
                                            </View>
                                        )}
                                        {step.isSunnah && (
                                            <View style={[styles.badge, { backgroundColor: theme.secondaryColor }]}>
                                                <Text style={styles.badgeText}>Sünnet</Text>
                                            </View>
                                        )}
                                    </View>

                                    <Text style={[styles.stepDescription, { color: theme.textColor + '99' }]}>
                                        {step.description}
                                    </Text>

                                    {step.arabic && (
                                        <View style={[styles.duaContainer, { backgroundColor: theme.primaryColor + '10' }]}>
                                            <Text style={[styles.arabicText, { color: theme.primaryColor }]}>
                                                {step.arabic}
                                            </Text>
                                            <Text style={[styles.transliteration, { color: theme.textColor + '80' }]}>
                                                {step.transliteration}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            ))}
                        </>
                    )}

                    {activeTab === 'fards' && (
                        <>
                            <Text style={[styles.intro, { color: theme.textColor }]}>
                                Abdestin geçerli olması için yapılması zorunlu olan dört farz vardır.
                            </Text>

                            {wuduFards.map((fard, index) => (
                                <View
                                    key={index}
                                    style={[styles.listItem, { backgroundColor: theme.cardBackgroundColor }]}
                                >
                                    <View style={[styles.listNumber, { backgroundColor: theme.primaryColor }]}>
                                        <Text style={styles.listNumberText}>{index + 1}</Text>
                                    </View>
                                    <Text style={[styles.listText, { color: theme.textColor }]}>
                                        {fard}
                                    </Text>
                                </View>
                            ))}
                        </>
                    )}

                    {activeTab === 'breakers' && (
                        <>
                            <Text style={[styles.intro, { color: theme.textColor }]}>
                                Aşağıdaki durumlar abdesti bozar ve yeniden abdest alınması gerekir.
                            </Text>

                            {wuduBreakers.map((breaker, index) => (
                                <View
                                    key={index}
                                    style={[styles.listItem, { backgroundColor: theme.cardBackgroundColor }]}
                                >
                                    <Ionicons name="close-circle" size={24} color="#E53935" style={styles.breakerIcon} />
                                    <Text style={[styles.listText, { color: theme.textColor }]}>
                                        {breaker}
                                    </Text>
                                </View>
                            ))}
                        </>
                    )}

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
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 12,
        padding: 4,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    tabButtonText: {
        fontSize: 14,
        fontWeight: '600',
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
    stepCard: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    stepHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    stepNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    stepNumberText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '600',
    },
    stepDescription: {
        fontSize: 14,
        lineHeight: 20,
    },
    duaContainer: {
        marginTop: 12,
        padding: 12,
        borderRadius: 8,
    },
    arabicText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500',
    },
    transliteration: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 4,
        fontStyle: 'italic',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    listNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    listNumberText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    listText: {
        fontSize: 15,
        flex: 1,
        lineHeight: 22,
    },
    breakerIcon: {
        marginRight: 12,
    },
});

export default WuduGuideScreen;
