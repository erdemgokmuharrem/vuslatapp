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
import { getDailyAyah, getRandomAyah, DailyAyah } from '../data/dailyAyahData';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const DailyAyahScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  const { scaledSize } = useFontSizeStore();

  const [currentAyah, setCurrentAyah] = useState<DailyAyah | null>(null);
  const [showTransliteration, setShowTransliteration] = useState(true);

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    setCurrentAyah(getDailyAyah(dayOfYear));
  }, []);

  const handleShare = async () => {
    if (!currentAyah) return;
    try {
      await Share.share({
        message: `🌙 ${t('daily_ayah_title')}\n\n${currentAyah.arabic}\n\n${currentAyah.turkish}\n\n📖 ${currentAyah.surah} ${currentAyah.ayahNumber}\n\n#VuslatApp`,
      });
    } catch {}
  };

  if (!currentAyah) {
    return (
      <IslamicBackground>
        <SafeAreaView style={styles.container}>
          <View style={styles.centered}>
            <Text style={[{ color: theme.textColor, fontSize: scaledSize(16) }]}>{t('loading_ayah')}</Text>
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
            {t('daily_ayah_title')}
          </Text>
          <TouchableOpacity onPress={handleShare} style={styles.iconBtn}>
            <Ionicons name="share-outline" size={28} color={theme.primaryColor} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={[styles.card, { backgroundColor: theme.cardBackgroundColor }]}>
            <View style={[styles.themeBadge, { backgroundColor: theme.primaryColor + '20' }]}>
              <Text style={[styles.themeText, { color: theme.primaryColor, fontSize: scaledSize(12) }]}>
                {currentAyah.theme}
              </Text>
            </View>

            <Text style={[styles.arabic, { color: theme.primaryColor, fontSize: scaledSize(24), lineHeight: scaledSize(24) * 1.65 }]}>
              {currentAyah.arabic}
            </Text>

            <TouchableOpacity style={styles.toggleRow} onPress={() => setShowTransliteration(!showTransliteration)}>
              <Text style={[{ color: theme.textColor + '80', fontSize: scaledSize(14), marginRight: 4 }]}>
                {showTransliteration ? t('transliteration_hide') : t('transliteration_show')}
              </Text>
              <Ionicons name={showTransliteration ? 'chevron-up' : 'chevron-down'} size={16} color={theme.textColor + '80'} />
            </TouchableOpacity>

            {showTransliteration && (
              <Text style={[styles.transliteration, { color: theme.textColor + '99', fontSize: scaledSize(15), lineHeight: scaledSize(15) * 1.6 }]}>
                {currentAyah.transliteration}
              </Text>
            )}

            <Text style={[styles.turkish, { color: theme.textColor, fontSize: scaledSize(17), lineHeight: scaledSize(17) * 1.65 }]}>
              {currentAyah.turkish}
            </Text>

            <Text style={[styles.english, { color: theme.textColor + '80', fontSize: scaledSize(15), lineHeight: scaledSize(15) * 1.6 }]}>
              {currentAyah.english}
            </Text>

            <View style={[styles.sourceBlock, { borderTopColor: theme.textColor + '20' }]}>
              <Ionicons name="book-outline" size={16} color={theme.primaryColor} />
              <Text style={[{ color: theme.primaryColor, fontWeight: '600', marginLeft: 8, fontSize: scaledSize(14) }]}>
                {currentAyah.surah} — {currentAyah.ayahNumber}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.randomBtn, { backgroundColor: theme.primaryColor }]}
            onPress={() => setCurrentAyah(getRandomAyah())}
          >
            <Ionicons name="shuffle-outline" size={24} color="white" />
            <Text style={[styles.randomBtnText, { fontSize: scaledSize(16) }]}>{t('random_ayah')}</Text>
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
  themeBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 16 },
  themeText: { fontWeight: '600' },
  arabic: { textAlign: 'right', fontWeight: '500', marginBottom: 16 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8, marginBottom: 8 },
  transliteration: { fontStyle: 'italic', textAlign: 'center', marginBottom: 16 },
  turkish: { fontWeight: '500', marginBottom: 12 },
  english: { marginBottom: 16 },
  sourceBlock: { flexDirection: 'row', alignItems: 'center', paddingTop: 16, borderTopWidth: 1 },
  randomBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 12, gap: 8, marginTop: 8 },
  randomBtnText: { color: 'white', fontWeight: '600' },
});

export default DailyAyahScreen;
