import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { useQuranStore } from '../store/useQuranStore';
import { useThemeStore } from '../store/useThemeStore';
import { Surah } from '../data/quranData';
import { safeKeyExtractor } from '../utils/keyGenerator';
import { getLocalizedSurahName } from '../data/turkishSurahNames';
import CustomHeader from '../components/common/CustomHeader';
import IslamicBackground from '../components/common/IslamicBackground';

type SurahListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SurahListScreen = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<SurahListScreenNavigationProp>();
  const { surahs, fetchAllSurahs, isLoading, error } = useQuranStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);

  useEffect(() => {
    fetchAllSurahs();
  }, []);

  useEffect(() => {
    if (surahs.length > 0) {
      filterSurahs();
    }
  }, [surahs, searchQuery]);

  const filterSurahs = () => {
    if (!searchQuery.trim()) {
      setFilteredSurahs(surahs);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = surahs.filter(
      surah => {
        const localName = getLocalizedSurahName(surah.id, i18n.language, surah.englishName).toLowerCase();
        return localName.includes(query) ||
          surah.englishName.toLowerCase().includes(query) ||
          surah.englishNameTranslation.toLowerCase().includes(query) ||
          surah.id.toString().includes(query);
      }
    );

    setFilteredSurahs(filtered);
  };

  const handleSurahPress = (surahId: number) => {
    navigation.navigate('QuranReader', { surahId });
  };

  // Header aksiyonları
  const headerActions = [
    { icon: 'bookmark-outline' as const, onPress: () => navigation.navigate('HatimTracker') },
  ];

  const renderSurahItem = ({ item }: { item: Surah }) => {
    const revelationTypeLabel = item.revelationType === 'Meccan' ? t('revelation_meccan') : t('revelation_medinan');
    const localName = getLocalizedSurahName(item.id, i18n.language, item.englishName);

    return (
      <TouchableOpacity
        style={[styles.surahItem, { backgroundColor: theme.cardBackgroundColor }]}
        onPress={() => handleSurahPress(item.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.surahNumber, { backgroundColor: theme.primaryColor }]}>
          <Text style={styles.surahNumberText}>{item.id}</Text>
        </View>

        <View style={styles.surahInfo}>
          <Text style={[styles.surahName, { color: theme.textColor }]}>{localName}</Text>
          <Text style={[styles.surahTranslation, { color: theme.textColor + '80' }]}>
            {item.englishNameTranslation}
          </Text>
          <View style={styles.surahDetails}>
            <View style={[styles.revelationBadge, { backgroundColor: theme.primaryColor + '20' }]}>
              <Text style={[styles.revelationText, { color: theme.primaryColor }]}>
                {revelationTypeLabel}
              </Text>
            </View>
            <Text style={[styles.ayahCount, { color: theme.textColor + '60' }]}>
              {t('verses_count', { count: item.numberOfAyahs })}
            </Text>
          </View>
        </View>

        <View style={styles.arabicContainer}>
          <Text style={[styles.arabicName, { color: theme.primaryColor }]}>{item.name}</Text>
          <Ionicons name="play-circle-outline" size={24} color={theme.primaryColor + '60'} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <IslamicBackground>
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        <CustomHeader
          title={t('tab_quran')}
          rightActions={headerActions}
          transparent
        />

        {/* Arama kutusu */}
        <View style={[styles.searchContainer, { backgroundColor: theme.cardBackgroundColor }]}>
          <Ionicons name="search" size={20} color={theme.textColor + '60'} />
          <TextInput
            style={[styles.searchInput, { color: theme.textColor }]}
            placeholder={t('search')}
            placeholderTextColor={theme.textColor + '60'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={theme.textColor + '60'} />
            </TouchableOpacity>
          )}
        </View>

        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={theme.primaryColor} />
            <Text style={[styles.loadingText, { color: theme.textColor + '80' }]}>
              {t('loading')}
            </Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={48} color={theme.textColor + '60'} />
            <Text style={[styles.errorText, { color: theme.textColor }]}>{error}</Text>
            <TouchableOpacity
              style={[styles.retryButton, { backgroundColor: theme.primaryColor }]}
              onPress={fetchAllSurahs}
            >
              <Text style={styles.retryButtonText}>{t('retry')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredSurahs}
            renderItem={renderSurahItem}
            keyExtractor={(item, index) => safeKeyExtractor(item, index, 'surah')}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            initialNumToRender={15}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews={true}
          />
        )}
      </View>
    </IslamicBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  surahItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  surahNumber: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  surahNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  surahInfo: {
    flex: 1,
  },
  surahName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 2,
  },
  surahTranslation: {
    fontSize: 13,
    marginBottom: 6,
  },
  surahDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  revelationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 8,
  },
  revelationText: {
    fontSize: 11,
    fontWeight: '600',
  },
  ayahCount: {
    fontSize: 12,
  },
  arabicContainer: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  arabicName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 16,
    marginVertical: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  retryButton: {
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SurahListScreen;
