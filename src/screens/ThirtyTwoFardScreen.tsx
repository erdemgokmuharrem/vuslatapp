import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../store/useThemeStore';
import CustomHeader from '../components/common/CustomHeader';
import IslamicBackground from '../components/common/IslamicBackground';

// 32 Farz
const thirtyTwoFards = [
    {
        category: 'İmanın Şartları (6 Farz)',
        items: [
            'Allah\'a iman',
            'Meleklere iman',
            'Kitaplara iman',
            'Peygamberlere iman',
            'Ahiret gününe iman',
            'Kadere iman',
        ],
    },
    {
        category: 'İslam\'ın Şartları (5 Farz)',
        items: [
            'Kelime-i şehadet getirmek',
            'Namaz kılmak',
            'Oruç tutmak',
            'Zekat vermek',
            'Hacca gitmek',
        ],
    },
    {
        category: 'Namazın Farzları (12 Farz)',
        subcategories: [
            {
                title: 'Dışındaki Farzlar (Şartlar)',
                items: [
                    'Hadesten taharet (abdest veya gusül)',
                    'Necasetten taharet (bedenin, elbisenin ve namaz yerinin temiz olması)',
                    'Setr-i avret (namaz kılacak kadar örtünmek)',
                    'İstikbal-i kıble (kıbleye yönelmek)',
                    'Vakit (namazı vaktinde kılmak)',
                    'Niyet (hangi namazı kılacağını bilmek)',
                ],
            },
            {
                title: 'İçindeki Farzlar (Rükünler)',
                items: [
                    'İftitah tekbiri (Allahu Ekber diyerek namaza başlamak)',
                    'Kıyam (ayakta durmak)',
                    'Kıraat (Kur\'an okumak)',
                    'Rükû (eğilmek)',
                    'Secde (yere kapanmak)',
                    'Ka\'de-i ahire (son oturuş)',
                ],
            },
        ],
    },
    {
        category: 'Guslün Farzları (3 Farz)',
        items: [
            'Ağzın içini yıkamak (mazmaza)',
            'Burnun içini yıkamak (istinşak)',
            'Bütün vücudu yıkamak',
        ],
    },
    {
        category: 'Teyemmümün Farzları (3 Farz)',
        items: [
            'Niyet etmek',
            'Yüzü meshetmek',
            'İki kolu dirseklere kadar meshetmek',
        ],
    },
    {
        category: 'Abdestin Farzları (4 Farz)',
        items: [
            'Yüzü yıkamak',
            'Kolları dirseklerle birlikte yıkamak',
            'Başın dörtte birini meshetmek',
            'Ayakları topuklarla birlikte yıkamak',
        ],
    },
];

export const ThirtyTwoFardScreen = () => {
    const navigation = useNavigation();
    const { getThemeObject } = useThemeStore();
    const theme = getThemeObject();

    const renderCategoryItems = (items: string[]) => {
        return items.map((item, index) => (
            <View
                key={index}
                style={[styles.item, { backgroundColor: theme.primaryColor + '10' }]}
            >
                <View style={[styles.itemNumber, { backgroundColor: theme.primaryColor }]}>
                    <Text style={styles.itemNumberText}>{index + 1}</Text>
                </View>
                <Text style={[styles.itemText, { color: theme.textColor }]}>
                    {item}
                </Text>
            </View>
        ));
    };

    return (
        <IslamicBackground>
            <View style={[styles.container, { backgroundColor: 'transparent' }]}>
                <CustomHeader
                    title="32 Farz"
                    showBackButton
                    subtitle="İslam'ın temel farzları"
                    transparent
                />

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={[styles.intro, { color: theme.textColor }]}>
                        Her Müslümanın bilmesi gereken 32 temel farz, imanın ve ibadetlerin temelini oluşturur.
                    </Text>

                    {thirtyTwoFards.map((category, categoryIndex) => (
                        <View key={categoryIndex} style={styles.categoryContainer}>
                            <View style={[styles.categoryHeader, { backgroundColor: theme.primaryColor }]}>
                                <Text style={styles.categoryTitle}>{category.category}</Text>
                            </View>

                            {category.items && (
                                <View style={[styles.itemsContainer, { backgroundColor: theme.cardBackgroundColor }]}>
                                    {renderCategoryItems(category.items)}
                                </View>
                            )}

                            {category.subcategories && category.subcategories.map((sub, subIndex) => (
                                <View key={subIndex}>
                                    <View style={[styles.subcategoryHeader, { backgroundColor: theme.secondaryColor }]}>
                                        <Text style={styles.subcategoryTitle}>{sub.title}</Text>
                                    </View>
                                    <View style={[styles.itemsContainer, { backgroundColor: theme.cardBackgroundColor }]}>
                                        {renderCategoryItems(sub.items)}
                                    </View>
                                </View>
                            ))}
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
        textAlign: 'center',
    },
    subcategoryHeader: {
        padding: 10,
    },
    subcategoryTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    itemsContainer: {
        padding: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        marginBottom: 6,
    },
    itemNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    itemNumberText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 11,
    },
    itemText: {
        fontSize: 14,
        flex: 1,
        lineHeight: 20,
    },
});

export default ThirtyTwoFardScreen;
