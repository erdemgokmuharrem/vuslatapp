import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, Dimensions, Modal, FlatList
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import IslamicBackground from '../components/common/IslamicBackground';
import CustomHeader from '../components/common/CustomHeader';
import { getTurkishSurahName, getLocalizedSurahName } from '../data/turkishSurahNames';

import { RootStackParamList } from '../navigation/types';
import { useQuranStore } from '../store/useQuranStore';
import { useThemeStore } from '../store/useThemeStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { useAudioStore } from '../store/useAudioStore';
import { useFontSizeStore, FONT_SCALES, FontScale } from '../store/useFontSizeStore';
import { getAyahTransliteration } from '../data/transliterationData';
import { getAudioUrlForAyah, getAudioUrlForSurah, fetchTransliterationForSurah } from '../api/quranApi';
import { reciters } from '../data/quranData';
import logger from '../utils/logger';

type QuranReaderScreenRouteProp = RouteProp<RootStackParamList, 'QuranReader'>;
type QuranReaderScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type TranslationLang = 'tr' | 'en' | 'de' | 'fr' | 'ru' | 'none';

const { width } = Dimensions.get('window');

export const QuranReaderScreen = () => {
  const { t } = useTranslation();
  const route = useRoute<QuranReaderScreenRouteProp>();
  const navigation = useNavigation<QuranReaderScreenNavigationProp>();
  const {
    currentSurah, ayahs, translations, currentAyah, selectedReciter,
    isPlaying, showTranslation, isLoading, error,
    setCurrentSurah, setCurrentAyah, setSelectedReciter, setIsPlaying,
    toggleTranslation, addBookmark, removeBookmark, isBookmarked, saveProgress, fetchTranslation,
  } = useQuranStore();
  const { getThemeObject } = useThemeStore();
  const { language } = useLanguageStore();
  const { playAudio, currentAudio, stopAudio: globalStopAudio } = useAudioStore();
  const { fontScale, scaledSize, setFontScale } = useFontSizeStore();
  const theme = getThemeObject();

  const [showReciterModal, setShowReciterModal] = useState(false);
  const [showFontModal, setShowFontModal] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [apiTransliterations, setApiTransliterations] = useState<{ numberInSurah: number; text: string }[]>([]);

  // Varsayılan meal dili: Türkçe veya İngilizce (diğer diller için en fallback)
  const getDefaultTranslLang = (): TranslationLang => {
    if (language === 'tr') return 'tr';
    if (language === 'de') return 'de';
    if (language === 'fr') return 'fr';
    if (language === 'ru') return 'ru';
    return 'en';
  };

  const [translationLang, setTranslationLang] = useState<TranslationLang>(getDefaultTranslLang());
  const [showTranslLangModal, setShowTranslLangModal] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const { surahId = 1, ayahNumber } = route.params || {};

  useEffect(() => {
    setCurrentSurah(surahId);
    if (ayahNumber) setCurrentAyah(ayahNumber);

    // Her sure açıldığında transliterasyon ve Türkçe meali otomatik yükle
    const loadData = async () => {
      // 1. API'den transliterasyon çek (yerel veri eksik sureler için)
      const apiTranslit = await fetchTransliterationForSurah(surahId);
      setApiTransliterations(apiTranslit);

      // 2. Türkçe meali otomatik yükle
      fetchTranslation(surahId, translationLang !== 'none' ? translationLang : 'tr');
    };
    loadData();

    return () => { saveProgress(); };
  }, [surahId]);

  // Fetch translation when language preference changes
  useEffect(() => {
    if (showTranslation && currentSurah && translationLang !== 'none') {
      fetchTranslation(currentSurah.id, translationLang);
    }
  }, [translationLang, showTranslation]);

  useEffect(() => {
    if (scrollViewRef.current && currentAyah > 1) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: (currentAyah - 1) * 200, animated: true });
      }, 500);
    }
  }, [currentAyah, ayahs.length]);

  const playAyahWithGlobalStore = async (ayahNumber: number) => {
    const audioUrl = getAudioUrlForAyah(currentSurah?.id || 1, ayahNumber, selectedReciter);
    const surahName = currentSurah ? getLocalizedSurahName(currentSurah.id, language, currentSurah.englishName) : '';
    await playAudio({
      id: `surah-${currentSurah?.id}-ayah-${ayahNumber}`,
      title: `${surahName} - ${t('quran_surah')} ${ayahNumber}`,
      subtitle: reciters.find(r => r.identifier === selectedReciter)?.name || '',
      audioUrl, type: 'quran',
    });
    setCurrentAyah(ayahNumber);
    setIsPlaying(true);
  };

  const playSurahWithGlobalStore = async () => {
    const audioUrl = getAudioUrlForSurah(currentSurah?.id || 1, selectedReciter);
    const surahName = currentSurah ? getLocalizedSurahName(currentSurah.id, language, currentSurah.englishName) : '';
    await playAudio({
      id: `surah-${currentSurah?.id}-full`,
      title: surahName,
      subtitle: reciters.find(r => r.identifier === selectedReciter)?.name || '',
      audioUrl, type: 'surah',
    });
    setIsPlaying(true);
  };

  const stopAudio = async () => { await globalStopAudio(); setIsPlaying(false); };

  const playNextAyah = () => {
    if (currentSurah && currentAyah < currentSurah.numberOfAyahs) {
      const next = currentAyah + 1;
      setCurrentAyah(next);
      playAyahWithGlobalStore(next);
    }
  };

  const playPreviousAyah = () => {
    if (currentAyah > 1) {
      const prev = currentAyah - 1;
      setCurrentAyah(prev);
      playAyahWithGlobalStore(prev);
    }
  };

  const handleBookmark = () => {
    if (currentSurah) {
      if (isBookmarked(currentSurah.id, currentAyah)) removeBookmark(currentSurah.id, currentAyah);
      else addBookmark(currentSurah.id, currentAyah);
    }
  };

  const getTranslation = (ayahNumber: number) => {
    if (translationLang === 'none' || !showTranslation || translations.length === 0) return null;
    const trans = translations.find(t => t.numberInSurah === ayahNumber);
    return trans ? trans.text : null;
  };

  const getTransliteration = (ayahNumber: number): string => {
    // Önce yerel static veriden bak
    const localTranslit = getAyahTransliteration(currentSurah?.id || 1, ayahNumber);
    if (localTranslit && !localTranslit.startsWith('Ayet ')) {
      return localTranslit;
    }
    // Yoksa API'den çekilen veriyi kullan
    const apiEntry = apiTransliterations.find(a => a.numberInSurah === ayahNumber);
    return apiEntry?.text || '';
  };

  const handleToggleTranslation = () => {
    toggleTranslation();
    if (!showTranslation && currentSurah && translationLang !== 'none') {
      fetchTranslation(currentSurah.id, translationLang);
    }
  };

  const handleTranslLangSelect = (lang: TranslationLang) => {
    setTranslationLang(lang);
    setShowTranslLangModal(false);
    if (currentSurah && lang !== 'none') {
      fetchTranslation(currentSurah.id, lang);
    }
  };

  // Arabic size is bigger; other texts scale uniformly
  const arabicSize = scaledSize(22);
  const translitSize = scaledSize(15);
  const transSize = scaledSize(15);

  return (
    <IslamicBackground>
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        <CustomHeader
          title={currentSurah ? getLocalizedSurahName(currentSurah.id, language, currentSurah.englishName) : ''}
          subtitle={currentSurah?.englishNameTranslation}
          showBackButton
          rightActions={[
            { icon: 'text-outline', onPress: () => setShowFontModal(true) },
            { icon: showTransliteration ? 'text' : 'language', onPress: () => setShowTransliteration(!showTransliteration) },
            { icon: 'person-outline', onPress: () => setShowReciterModal(true) },
          ]}
          transparent
        />

        {isLoading ? (
          <ActivityIndicator size="large" color={theme.primaryColor} style={styles.loader} />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: theme.textColor }]}>{error}</Text>
            <TouchableOpacity style={[styles.retryButton, { backgroundColor: theme.primaryColor }]} onPress={() => setCurrentSurah(surahId)}>
              <Text style={styles.retryButtonText}>{t('retry')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Translation controls */}
            <View style={[styles.controlBar, { backgroundColor: theme.cardBackgroundColor }]}>
              <TouchableOpacity
                style={[styles.controlBtn, showTranslation && { backgroundColor: theme.primaryColor + '20' }]}
                onPress={handleToggleTranslation}
              >
                <Ionicons name="book-outline" size={18} color={showTranslation ? theme.primaryColor : theme.textColor + '80'} />
                <Text style={[styles.controlBtnText, { color: showTranslation ? theme.primaryColor : theme.textColor + '80' }]}>
                  {t('quran_translation')}
                </Text>
              </TouchableOpacity>

              {showTranslation && (
                <TouchableOpacity
                  style={[styles.controlBtn, { backgroundColor: theme.primaryColor + '15' }]}
                  onPress={() => setShowTranslLangModal(true)}
                >
                  <Ionicons name="language-outline" size={18} color={theme.primaryColor} />
                  <Text style={[styles.controlBtnText, { color: theme.primaryColor }]}>
                    {translationLang === 'tr' ? '🇹🇷 TR' : translationLang === 'en' ? '🇬🇧 EN' : translationLang === 'de' ? '🇩🇪 DE' : translationLang === 'fr' ? '🇫🇷 FR' : translationLang === 'ru' ? '🇷🇺 RU' : '—'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <ScrollView ref={scrollViewRef} style={styles.content} showsVerticalScrollIndicator={false}>
              {currentSurah && currentSurah.id !== 9 && (
                <View style={[styles.bismillahContainer, { backgroundColor: theme.cardBackgroundColor }]}>
                  <Text style={[styles.bismillahText, { color: theme.primaryColor, fontSize: arabicSize + 2 }]}>
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </Text>
                </View>
              )}

              {ayahs.map((ayah, index) => (
                <TouchableOpacity
                  key={`${currentSurah?.id || 1}_${ayah.numberInSurah}_${index}`}
                  style={[
                    styles.ayahContainer,
                    { backgroundColor: theme.cardBackgroundColor },
                    currentAyah === ayah.numberInSurah && { borderColor: theme.primaryColor },
                  ]}
                  onPress={() => playAyahWithGlobalStore(ayah.numberInSurah)}
                >
                  <View style={styles.ayahHeader}>
                    <View style={[styles.ayahNumber, { backgroundColor: theme.primaryColor }]}>
                      <Text style={styles.ayahNumberText}>{ayah.numberInSurah}</Text>
                    </View>
                    <TouchableOpacity style={styles.bookmarkButton} onPress={handleBookmark}>
                      <Ionicons
                        name={currentSurah && isBookmarked(currentSurah.id, ayah.numberInSurah) ? 'bookmark' : 'bookmark-outline'}
                        size={24} color={theme.primaryColor}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={[styles.arabicText, { color: theme.textColor, fontSize: arabicSize, lineHeight: arabicSize * 1.6 }]}>
                    {ayah.text}
                  </Text>

                  {showTransliteration && (
                    <View style={[styles.transliterationBox, { backgroundColor: theme.primaryColor + '10' }]}>
                      <Text style={[styles.transliterationText, { color: theme.primaryColor, fontSize: translitSize, lineHeight: translitSize * 1.6 }]}>
                        {getTransliteration(ayah.numberInSurah)}
                      </Text>
                    </View>
                  )}

                  {showTranslation && translationLang !== 'none' && (
                    <Text style={[styles.translationText, { color: theme.textColor + 'CC', fontSize: transSize, lineHeight: transSize * 1.6 }]}>
                      {getTranslation(ayah.numberInSurah)}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Player Bar */}
            <View style={[styles.playerBar, { backgroundColor: theme.cardBackgroundColor }]}>
              <TouchableOpacity style={[styles.playerButton, { backgroundColor: theme.primaryColor + '30' }]} onPress={playPreviousAyah}>
                <Ionicons name="play-skip-back" size={20} color={theme.primaryColor} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.playerButton, { backgroundColor: theme.primaryColor }]} onPress={isPlaying ? stopAudio : playSurahWithGlobalStore}>
                <Ionicons name={isPlaying ? 'stop' : 'play'} size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.playerButton, { backgroundColor: theme.primaryColor + '30' }]} onPress={playNextAyah}>
                <Ionicons name="play-skip-forward" size={20} color={theme.primaryColor} />
              </TouchableOpacity>
              <View style={styles.playerInfo}>
                <Text style={[styles.playerSurahName, { color: theme.textColor }]}>
                  {currentSurah ? getLocalizedSurahName(currentSurah.id, language, currentSurah.englishName) : ''}
                </Text>
                <Text style={[styles.playerReciterName, { color: theme.textColor + '99' }]}>
                  {reciters.find(r => r.identifier === selectedReciter)?.name || ''}
                </Text>
              </View>
            </View>
          </>
        )}

        {/* Reciter Modal */}
        <Modal visible={showReciterModal} transparent animationType="slide" onRequestClose={() => setShowReciterModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.cardBackgroundColor }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.textColor }]}>{t('quran_reciter')}</Text>
                <TouchableOpacity onPress={() => setShowReciterModal(false)}>
                  <Ionicons name="close" size={24} color={theme.textColor} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={reciters}
                keyExtractor={(item) => item.identifier}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.reciterItem, selectedReciter === item.identifier && { backgroundColor: theme.primaryColor + '30' }]}
                    onPress={() => { setSelectedReciter(item.identifier); setShowReciterModal(false); }}
                  >
                    <Text style={[styles.reciterName, { color: selectedReciter === item.identifier ? theme.primaryColor : theme.textColor }]}>
                      {item.name}
                    </Text>
                    {selectedReciter === item.identifier && <Ionicons name="checkmark" size={24} color={theme.primaryColor} />}
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Font Size Modal */}
        <Modal visible={showFontModal} transparent animationType="slide" onRequestClose={() => setShowFontModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.cardBackgroundColor }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.textColor }]}>{t('settings_font_size')}</Text>
                <TouchableOpacity onPress={() => setShowFontModal(false)}>
                  <Ionicons name="close" size={24} color={theme.textColor} />
                </TouchableOpacity>
              </View>
              {FONT_SCALES.map(({ value, labelKey }) => {
                const isActive = fontScale === value;
                return (
                  <TouchableOpacity
                    key={value}
                    style={[styles.reciterItem, isActive && { backgroundColor: theme.primaryColor + '30' }]}
                    onPress={() => { setFontScale(value as FontScale); setShowFontModal(false); }}
                  >
                    <Text style={[{ fontSize: 14 * value, color: isActive ? theme.primaryColor : theme.textColor }]}>
                      {t(labelKey)} — بِسْمِ اللَّه
                    </Text>
                    {isActive && <Ionicons name="checkmark" size={24} color={theme.primaryColor} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Modal>

        {/* Translation Language Modal */}
        <Modal visible={showTranslLangModal} transparent animationType="slide" onRequestClose={() => setShowTranslLangModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.cardBackgroundColor }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.textColor }]}>{t('quran_translation_language')}</Text>
                <TouchableOpacity onPress={() => setShowTranslLangModal(false)}>
                  <Ionicons name="close" size={24} color={theme.textColor} />
                </TouchableOpacity>
              </View>
              {([
                { code: 'tr' as TranslationLang, label: 'Türkçe — Diyanet Meali', flag: '🇹🇷' },
                { code: 'en' as TranslationLang, label: 'English — Sahih International', flag: '🇬🇧' },
                { code: 'de' as TranslationLang, label: 'Deutsch — Abu Rida', flag: '🇩🇪' },
                { code: 'fr' as TranslationLang, label: 'Français — Hamidullah', flag: '🇫🇷' },
                { code: 'ru' as TranslationLang, label: 'Русский — Kuliev', flag: '🇷🇺' },
                { code: 'none' as TranslationLang, label: t('quran_show_translation') + ' ✕', flag: '🚫' },
              ]).map((opt) => (
                <TouchableOpacity
                  key={opt.code}
                  style={[styles.reciterItem, translationLang === opt.code && { backgroundColor: theme.primaryColor + '30' }]}
                  onPress={() => handleTranslLangSelect(opt.code)}
                >
                  <Text style={{ fontSize: 16, marginRight: 8 }}>{opt.flag}</Text>
                  <Text style={[styles.reciterName, { color: translationLang === opt.code ? theme.primaryColor : theme.textColor }]}>
                    {opt.label}
                  </Text>
                  {translationLang === opt.code && <Ionicons name="checkmark" size={24} color={theme.primaryColor} />}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </View>
    </IslamicBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  controlBar: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8, gap: 10 },
  controlBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 6 },
  controlBtnText: { fontSize: 13, fontWeight: '600' },
  content: { flex: 1, padding: 16 },
  bismillahContainer: { padding: 16, borderRadius: 10, alignItems: 'center', marginBottom: 16 },
  bismillahText: { fontWeight: 'bold' },
  ayahContainer: { padding: 16, borderRadius: 10, marginBottom: 14, borderWidth: 2, borderColor: 'transparent' },
  ayahHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  ayahNumber: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  ayahNumberText: { color: 'white', fontWeight: 'bold' },
  bookmarkButton: { padding: 4 },
  arabicText: { textAlign: 'right', fontWeight: '500', marginBottom: 12 },
  transliterationBox: { padding: 8, borderRadius: 8, marginBottom: 10 },
  transliterationText: { fontStyle: 'italic', fontWeight: '500' },
  translationText: { marginTop: 2 },
  playerBar: { flexDirection: 'row', alignItems: 'center', padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  playerButton: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginHorizontal: 4 },
  playerInfo: { flex: 1, marginLeft: 8 },
  playerSurahName: { fontSize: 15, fontWeight: 'bold', marginBottom: 2 },
  playerReciterName: { fontSize: 13 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  errorText: { fontSize: 16, textAlign: 'center', marginBottom: 16 },
  retryButton: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  retryButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16, maxHeight: '70%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  reciterItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 8, borderRadius: 8, marginBottom: 8 },
  reciterName: { fontSize: 16, flex: 1 },
});

export default QuranReaderScreen;
