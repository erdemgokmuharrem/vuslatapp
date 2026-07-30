import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import IslamicBackground from '../components/common/IslamicBackground';
import { RootStackParamList } from '../navigation/types';
import { useThemeStore } from '../store/useThemeStore';
import { useFontSizeStore } from '../store/useFontSizeStore';
import { getDailyHadith, getRandomHadith, DailyHadith } from '../data/dailyHadithData';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const DailyHadithScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  const { scaledSize } = useFontSizeStore();

  const [currentHadith, setCurrentHadith] = useState<DailyHadith | null>(null);
  const [showTransliteration, setShowTransliteration] = useState(true);

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    setCurrentHadith(getDailyHadith(dayOfYear));
  }, []);

  const handleShare = async () => {
    if (!currentHadith) return;
    try {
      await Share.share({
        message: `🌙 ${t('daily_hadith_title')}\n\n${currentHadith.arabic}\n\n${currentHadith.turkish}\n\n📖 ${t('narrator_label')}: ${currentHadith.narrator}\n📚 ${t('source_label')}: ${currentHadith.source}\n\n#ZmatikApp`,
      });
    } catch {}
  };

  if (!currentHadith) {
    return (
      <IslamicBackground>
        <SafeAreaView style={styles.container}>
          <View style={styles.centered}>
            <Text style={[{ color: theme.textColor, fontSize: scaledSize(16) }]}>{t('loading_hadith')}</Text>
          </View>
        </SafeAreaView>
      </IslamicBackground>
    );
  }

  return (
    <IslamicBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={28} color={theme.primaryColor} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.textColor, fontSize: scaledSize(20) }]}>
            {t('daily_hadith_title')}
          </Text>
          <TouchableOpacity onPress={handleShare} style={styles.iconBtn}>
            <Ionicons name="share-outline" size={28} color={theme.primaryColor} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={[styles.card, { backgroundColor: theme.cardBackgroundColor }]}>
            <View style={styles.badgeRow}>
              <View style={[styles.badge, { backgroundColor: theme.primaryColor + '20' }]}>
                <Text style={[styles.badgeText, { color: theme.primaryColor }]}>{currentHadith.theme}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: '#4CAF50' + '20' }]}>
                <Text style={[styles.badgeText, { color: '#4CAF50' }]}>{currentHadith.grade}</Text>
              </View>
            </View>

            <Text style={[styles.arabic, { color: theme.primaryColor, fontSize: scaledSize(22), lineHeight: scaledSize(22) * 1.6 }]}>
              {currentHadith.arabic}
            </Text>

            <TouchableOpacity style={styles.toggleRow} onPress={() => setShowTransliteration(!showTransliteration)}>
              <Text style={[{ color: theme.textColor + '80', fontSize: scaledSize(14), marginRight: 4 }]}>
                {showTransliteration ? t('transliteration_hide') : t('transliteration_show')}
              </Text>
              <Ionicons name={showTransliteration ? 'chevron-up' : 'chevron-down'} size={16} color={theme.textColor + '80'} />
            </TouchableOpacity>

            {showTransliteration && (
              <Text style={[styles.transliteration, { color: theme.textColor + '99', fontSize: scaledSize(15), lineHeight: scaledSize(15) * 1.6 }]}>
                {currentHadith.transliteration}
              </Text>
            )}

            <Text style={[styles.turkish, { color: theme.textColor, fontSize: scaledSize(17), lineHeight: scaledSize(17) * 1.65 }]}>
              {currentHadith.turkish}
            </Text>

            <Text style={[styles.english, { color: theme.textColor + '80', fontSize: scaledSize(15), lineHeight: scaledSize(15) * 1.6 }]}>
              {currentHadith.english}
            </Text>

            <View style={styles.sourceBlock}>
              <View style={styles.sourceRow}>
                <Ionicons name="person-outline" size={16} color={theme.primaryColor} />
                <Text style={[{ color: theme.textColor, fontSize: scaledSize(14), marginLeft: 8 }]}>
                  {t('narrator_label')}: {currentHadith.narrator}
                </Text>
              </View>
              <View style={styles.sourceRow}>
                <Ionicons name="book-outline" size={16} color={theme.primaryColor} />
                <Text style={[{ color: theme.textColor + '80', fontSize: scaledSize(14), marginLeft: 8 }]}>
                  {t('source_label')}: {currentHadith.source}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.randomBtn, { backgroundColor: theme.primaryColor }]}
            onPress={() => setCurrentHadith(getRandomHadith())}
          >
            <Ionicons name="shuffle-outline" size={24} color="white" />
            <Text style={[styles.randomBtnText, { fontSize: scaledSize(16) }]}>{t('random_hadith')}</Text>
          </TouchableOpacity>

          <View style={{ height: 32 }} />
        </ScrollView>
      </SafeAreaView>
    </IslamicBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16 },
  iconBtn: { padding: 8 },
  title: { fontWeight: 'bold', flex: 1, textAlign: 'center' },
  content: { flex: 1, paddingHorizontal: 16 },
  card: { padding: 24, borderRadius: 16, marginBottom: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  badgeRow: { flexDirection: 'row', marginBottom: 16 },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  arabic: { textAlign: 'right', fontWeight: '500', marginBottom: 16 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8, marginBottom: 8 },
  transliteration: { fontStyle: 'italic', textAlign: 'center', marginBottom: 16 },
  turkish: { fontWeight: '500', marginBottom: 12 },
  english: { marginBottom: 16 },
  sourceBlock: { paddingTop: 16, borderTopWidth: 1, borderTopColor: '#E0E0E0', gap: 8 },
  sourceRow: { flexDirection: 'row', alignItems: 'center' },
  randomBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 12, gap: 8, marginTop: 8 },
  randomBtnText: { color: 'white', fontWeight: '600' },
});

export default DailyHadithScreen;
