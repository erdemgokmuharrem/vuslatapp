import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SectionList,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { useDuaStore } from '../store/useDuaStore';
import { useThemeStore } from '../store/useThemeStore';
import { useAudioStore } from '../store/useAudioStore';
import { useTasbihStore } from '../store/useTasbihStore';
import { safeKeyExtractor } from '../utils/keyGenerator';
import { duaCategories, popularDuas, popularSurahs, getDuaById, Dua } from '../data/duaData';
import { zikrData, zikrCategories, ZikrItem } from '../data/zikrData';
import CustomHeader from '../components/common/CustomHeader';
import IslamicBackground from '../components/common/IslamicBackground';

type DuaLibraryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const DuaLibraryScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<DuaLibraryScreenNavigationProp>();
  const {
    favorites,
    recentlyPlayed,
    toggleFavorite,
    addToRecentlyPlayed
  } = useDuaStore();
  const { playAudio, isPlaying, currentAudio, pauseAudio, resumeAudio } = useAudioStore();
  const { setGoal } = useTasbihStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();

  const [mainTab, setMainTab] = useState<'dualar' | 'zikirler'>('dualar');
  const [activeTab, setActiveTab] = useState<'popular' | 'categories' | 'favorites'>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZikr, setSelectedZikr] = useState<ZikrItem | null>(null);

  // Sadece Dualar kısmında gösterilen Zikir Önerileri (Quick Zikrs)
  const suggestedZikrs = [
    { id: 'subhanallah', name: 'Sübhanallah', count: 33, arabic: 'سُبْحَانَ اللَّهِ' },
    { id: 'alhamdulillah', name: 'Elhamdülillah', count: 33, arabic: 'الْحَمْدُ لِلَّهِ' },
    { id: 'allahuakbar', name: 'Allahu Ekber', count: 33, arabic: 'اللَّهُ أَكْبَرُ' },
    { id: 'estagfirullah', name: 'Estağfirullah', count: 100, arabic: 'أَسْتَغْفِرُ اللَّهَ' },
    { id: 'lailahaillallah', name: 'La ilahe illallah', count: 100, arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ' },
  ];

  const handleDuaPress = (duaId: string) => {
    navigation.navigate('DuaDetail', { duaId });
  };

  const handlePlayPause = async (dua: Dua) => {
    const isCurrentlyPlaying = currentAudio?.id === dua.id && isPlaying;

    if (isCurrentlyPlaying) {
      await pauseAudio();
    } else if (currentAudio?.id === dua.id && !isPlaying) {
      await resumeAudio();
    } else {
      // Check if audio URL exists
      if (!dua.audioUrl) {
        // No audio, just go to detail
        handleDuaPress(dua.id);
        return;
      }

      // Play with global audio store
      await playAudio({
        id: dua.id,
        title: dua.nameTr || dua.name,
        subtitle: dua.category,
        audioUrl: dua.audioUrl,
        type: 'dua',
      });

      addToRecentlyPlayed(dua.id);
    }
  };

  const renderDuaItem = ({ item }: { item: Dua }) => {
    const isCurrentlyPlaying = currentAudio?.id === item.id && isPlaying;
    const isCurrent = currentAudio?.id === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.duaItem,
          { backgroundColor: theme.cardBackgroundColor },
          isCurrent && { borderLeftWidth: 3, borderLeftColor: theme.primaryColor }
        ]}
        onPress={() => handleDuaPress(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.duaContent}>
          <View style={styles.duaInfo}>
            <Text style={[styles.duaName, { color: theme.textColor }]}>
              {item.nameTr || item.name}
            </Text>

            {/* Türkçe Okunuş göster */}
            {(item.transliterationTr || item.transliteration) && (
              <Text
                style={[styles.duaTransliteration, { color: theme.primaryColor }]}
                numberOfLines={2}
              >
                {item.transliterationTr || item.transliteration}
              </Text>
            )}

            {/* Kısa açıklama */}
            <Text
              style={[styles.duaTranslation, { color: theme.textColor + '70' }]}
              numberOfLines={1}
            >
              {item.translationTr || item.translation}
            </Text>
          </View>

          <View style={styles.duaActions}>
            {/* Favorite button */}
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(item.id)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={favorites.includes(item.id) ? "heart" : "heart-outline"}
                size={20}
                color={favorites.includes(item.id) ? '#E91E63' : theme.textColor + '60'}
              />
            </TouchableOpacity>

            {/* Play button - only show if has audio */}
            {item.audioUrl && (
              <TouchableOpacity
                style={[styles.playButton, { backgroundColor: theme.primaryColor }]}
                onPress={() => handlePlayPause(item)}
              >
                <Ionicons
                  name={isCurrentlyPlaying ? "pause" : "play"}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategoryItem = ({ item }: { item: typeof duaCategories[0] }) => (
    <TouchableOpacity
      style={[styles.categoryItem, { backgroundColor: theme.cardBackgroundColor }]}
      onPress={() => navigation.navigate('DuaCategory', { categoryId: item.id })}
      activeOpacity={0.7}
    >
      <View style={[styles.categoryIcon, { backgroundColor: theme.primaryColor + '20' }]}>
        <Ionicons name="book-outline" size={24} color={theme.primaryColor} />
      </View>
      <View style={styles.categoryInfo}>
        <Text style={[styles.categoryName, { color: theme.textColor }]}>{item.name}</Text>
        <Text style={[styles.categoryDescription, { color: theme.textColor + '80' }]}>
          {item.description}
        </Text>
        <Text style={[styles.categoryCount, { color: theme.primaryColor }]}>
          {item.count} {t('items')}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.textColor + '40'} />
    </TouchableOpacity>
  );

  const renderFavoriteItem = ({ item }: { item: string }) => {
    const dua = getDuaById(item);
    if (!dua) return null;
    return renderDuaItem({ item: dua });
  };

  const handleZikrPress = (zikr: ZikrItem) => {
    setSelectedZikr(zikr);
  };

  const handleStartZikr = (zikr: ZikrItem) => {
    setSelectedZikr(null);
    setGoal(zikr.recommendedCount);
    useTasbihStore.getState().reset();
    navigation.navigate('Main' as any, { screen: 'Tasbih' });
  };

  const filteredZikrs = React.useMemo(() => {
    if (!searchQuery) return zikrData;
    const lowerQuery = searchQuery.toLowerCase();
    return zikrData.filter(
      (z) =>
        z.name.toLowerCase().includes(lowerQuery) ||
        z.meaning.toLowerCase().includes(lowerQuery) ||
        z.category.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  const zikrSections = React.useMemo(() => {
    const sections = zikrCategories.map(cat => ({
      title: cat.name,
      data: filteredZikrs.filter(z => z.category === cat.id)
    })).filter(sec => sec.data.length > 0);
    return sections;
  }, [filteredZikrs]);

  const renderZikrItem = ({ item }: { item: ZikrItem }) => {
    return (
      <TouchableOpacity
        style={[styles.duaItem, { backgroundColor: theme.cardBackgroundColor }]}
        onPress={() => handleZikrPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.duaContent}>
          <View style={styles.duaInfo}>
            <Text style={[styles.duaName, { color: theme.textColor }]}>
              {item.name}
            </Text>

            <Text
              style={[styles.duaTransliteration, { color: theme.primaryColor }]}
              numberOfLines={1}
            >
              {item.transliteration}
            </Text>

            <Text
              style={[styles.duaTranslation, { color: theme.textColor + '70' }]}
              numberOfLines={1}
            >
              {item.meaning}
            </Text>
          </View>

          <View style={[styles.duaActions, { alignSelf: 'center' }]}>
            <View style={[styles.countBadge, { backgroundColor: theme.primaryColor + '20' }]}>
              <Text style={{ color: theme.primaryColor, fontWeight: 'bold', fontSize: 13 }}>{item.recommendedCount}</Text>
              <Text style={{ color: theme.primaryColor + '90', fontSize: 10 }}>kez</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textColor + '40'} style={{ marginLeft: 4 }} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /* ─── Zikir Detay Modalı ─────────────────────────────── */
  const renderZikrModal = () => {
    if (!selectedZikr) return null;
    return (
      <Modal
        visible={!!selectedZikr}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedZikr(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedZikr(null)}
        >
          {/* İçeriğe tıklanınca kapanmasın */}
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.zikrModalCard, { backgroundColor: theme.cardBackgroundColor }]}
          >
            {/* Üst çizgi */}
            <View style={[styles.modalHandle, { backgroundColor: theme.textColor + '30' }]} />

            {/* Kapat butonu */}
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setSelectedZikr(null)}
            >
              <Ionicons name="close-circle" size={26} color={theme.textColor + '60'} />
            </TouchableOpacity>

            {/* Kategori etiketi */}
            <View style={[styles.modalCategoryBadge, { backgroundColor: theme.primaryColor + '18' }]}>
              <Text style={[styles.modalCategoryText, { color: theme.primaryColor }]}>
                {zikrCategories.find(c => c.id === selectedZikr.category)?.name || ''}
              </Text>
            </View>

            {/* Başlık */}
            <Text style={[styles.modalTitle, { color: theme.textColor }]}>
              {selectedZikr.name}
            </Text>

            {/* Arapça */}
            <View style={[styles.modalArabicBox, { backgroundColor: theme.primaryColor + '10', borderColor: theme.primaryColor + '30' }]}>
              <Text style={[styles.modalArabic, { color: theme.primaryColor }]}>
                {selectedZikr.arabic}
              </Text>
            </View>

            {/* Okunuş */}
            <View style={[styles.modalRow, { borderBottomColor: theme.textColor + '15' }]}>
              <Text style={[styles.modalRowLabel, { color: theme.textColor + '60' }]}>Okunuş</Text>
              <Text style={[styles.modalRowValue, { color: theme.textColor }]}>{selectedZikr.transliteration}</Text>
            </View>

            {/* Anlam */}
            <View style={[styles.modalRow, { borderBottomColor: theme.textColor + '15' }]}>
              <Text style={[styles.modalRowLabel, { color: theme.textColor + '60' }]}>Anlamı</Text>
              <Text style={[styles.modalRowValue, { color: theme.textColor }]}>{selectedZikr.meaning}</Text>
            </View>

            {/* Öneri */}
            <View style={[styles.modalRow, { borderBottomColor: 'transparent' }]}>
              <Text style={[styles.modalRowLabel, { color: theme.textColor + '60' }]}>Önerilen</Text>
              <Text style={[styles.modalRowValue, { color: theme.primaryColor, fontWeight: 'bold' }]}>
                {selectedZikr.recommendedCount} kez
              </Text>
            </View>

            {/* Zikri Çek Butonu */}
            <TouchableOpacity
              style={[styles.startZikrBtn, { backgroundColor: theme.primaryColor }]}
              onPress={() => handleStartZikr(selectedZikr)}
              activeOpacity={0.85}
            >
              <Ionicons name="radio-button-on" size={22} color="white" style={{ marginRight: 10 }} />
              <Text style={styles.startZikrBtnText}>Zikri Çek</Text>
              <Text style={[styles.startZikrCount, { backgroundColor: 'rgba(255,255,255,0.25)' }]}>
                {selectedZikr.recommendedCount}×
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <IslamicBackground>
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        <CustomHeader
          title={t('dua_title')}
          transparent
        />

        {/* Global Segmented Control for Dualar & Zikirler */}
        <View style={styles.mainTabContainer}>
          <TouchableOpacity
            style={[
              styles.mainTabButton, 
              { borderColor: theme.primaryColor },
              mainTab === 'dualar' && { backgroundColor: theme.primaryColor }
            ]}
            onPress={() => setMainTab('dualar')}
          >
            <Text style={[
              styles.mainTabText, 
              mainTab === 'dualar' ? { color: 'white' } : { color: theme.primaryColor }
            ]}>
              {t('duas_tab', 'Dualar')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.mainTabButton, 
              { borderColor: theme.primaryColor },
              mainTab === 'zikirler' && { backgroundColor: theme.primaryColor }
            ]}
            onPress={() => setMainTab('zikirler')}
          >
            <Text style={[
              styles.mainTabText, 
              mainTab === 'zikirler' ? { color: 'white' } : { color: theme.primaryColor }
            ]}>
              {t('zikr_tab', 'Zikirler')}
            </Text>
          </TouchableOpacity>
        </View>

        {mainTab === 'dualar' ? (
          <>
            {/* Daily Zikr Suggestions */}
            <View style={styles.recentSection}>
              <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                {t('daily_zikr_suggestions', 'Günün Zikir Önerileri')}
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.recentList}
              >
                {suggestedZikrs.map((zikr, index) => (
                  <TouchableOpacity
                    key={`zikr_${zikr.id}`}
                    style={[styles.recentItem, { backgroundColor: theme.cardBackgroundColor, paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'column', alignItems: 'flex-start' }]}
                    onPress={() => {
                        setGoal(zikr.count);
                        useTasbihStore.getState().reset();
                        navigation.navigate('Main' as any, { screen: 'Tasbih' });
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={[{ color: theme.primaryColor, fontSize: 18, marginBottom: 4, fontWeight: 'bold' }]} numberOfLines={1}>
                      {zikr.arabic}
                    </Text>
                    <Text style={[{ color: theme.textColor, fontWeight: '600', fontSize: 14 }]} numberOfLines={1}>
                      {zikr.name}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                      <Ionicons name="repeat" size={14} color={theme.textColor + '80'} style={{ marginRight: 4 }} />
                      <Text style={{ fontSize: 12, color: theme.textColor + '80' }}>
                        {zikr.count} {t('times', 'Tekrar')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Recently Played Section */}
            {recentlyPlayed.length > 0 && (
              <View style={styles.recentSection}>
                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                  {t('recently_played')}
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.recentList}
                >
                  {recentlyPlayed.slice(0, 5).map((duaId, index) => {
                    const dua = getDuaById(duaId);
                    if (!dua) return null;
                    const isCurrentlyPlaying = currentAudio?.id === duaId && isPlaying;

                    return (
                      <TouchableOpacity
                        key={`recent_${duaId}_${index}`}
                        style={[styles.recentItem, { backgroundColor: theme.cardBackgroundColor }]}
                        onPress={() => handleDuaPress(duaId)}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.recentName, { color: theme.textColor }]} numberOfLines={1}>
                          {dua.nameTr || dua.name}
                        </Text>
                        {dua.audioUrl && (
                          <TouchableOpacity
                            style={[styles.recentPlayButton, { backgroundColor: theme.primaryColor }]}
                            onPress={() => handlePlayPause(dua)}
                          >
                            <Ionicons
                              name={isCurrentlyPlaying ? "pause" : "play"}
                              size={14}
                              color="white"
                            />
                          </TouchableOpacity>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            {/* Tab Bar */}
        <View style={[styles.tabBar, { borderBottomColor: theme.textColor + '20' }]}>
          {['popular', 'categories', 'favorites'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && { borderBottomColor: theme.primaryColor, borderBottomWidth: 2 }
              ]}
              onPress={() => setActiveTab(tab as any)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === tab ? theme.primaryColor : theme.textColor + '60' }
                ]}
              >
                {t(tab === 'popular' ? 'popular_duas' : tab === 'categories' ? 'categories' : 'favorites')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

            {/* Content dualar */}
            <View style={styles.content}>
              {activeTab === 'popular' && (
                <FlatList
                  data={[...popularDuas, ...popularSurahs]}
                  renderItem={renderDuaItem}
                  keyExtractor={(item, index) => safeKeyExtractor(item, index, 'dua')}
                  contentContainerStyle={styles.listContent}
                  showsVerticalScrollIndicator={false}
                  initialNumToRender={10}
                  maxToRenderPerBatch={10}
                  windowSize={5}
                />
              )}

              {activeTab === 'categories' && (
                <FlatList
                  data={duaCategories}
                  renderItem={renderCategoryItem}
                  keyExtractor={(item, index) => safeKeyExtractor(item, index, 'category')}
                  contentContainerStyle={styles.listContent}
                  showsVerticalScrollIndicator={false}
                />
              )}

              {activeTab === 'favorites' && (
                favorites.length > 0 ? (
                  <FlatList
                    data={favorites}
                    renderItem={renderFavoriteItem}
                    keyExtractor={(item, index) => safeKeyExtractor({ id: item }, index, 'favorite')}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                  />
                ) : (
                  <View style={styles.emptyContainer}>
                    <Ionicons name="heart-outline" size={64} color={theme.textColor + '30'} />
                    <Text style={[styles.emptyText, { color: theme.textColor + '60' }]}>
                      {t('no_favorites')}
                    </Text>
                    <Text style={[styles.emptySubtext, { color: theme.textColor + '40' }]}>
                      Favori dualarınızı eklemek için kalp ikonuna dokunun
                    </Text>
                  </View>
                )
              )}
            </View>
          </>
        ) : (
          /* Zikirler Bölümü */
          <View style={styles.content}>
            <View style={[styles.searchContainer, { backgroundColor: theme.cardBackgroundColor }]}>
              <Ionicons name="search" size={20} color={theme.textColor + '60'} style={{ marginRight: 8 }} />
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

            <SectionList
              sections={zikrSections}
              renderItem={renderZikrItem}
              renderSectionHeader={({ section: { title } }) => (
                <View style={[styles.sectionHeader, { backgroundColor: theme.backgroundColor }]}>
                  <Text style={[styles.sectionHeaderText, { color: theme.primaryColor }]}>{title}</Text>
                </View>
              )}
              keyExtractor={(item, index) => safeKeyExtractor(item, index, 'zikr')}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              stickySectionHeadersEnabled={true}
            />
          </View>
        )}
      </View>
      {renderZikrModal()}
    </IslamicBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recentSection: {
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  recentList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  recentItem: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginRight: 10,
  },
  recentName: {
    fontSize: 13,
    fontWeight: '500',
    maxWidth: 100,
  },
  recentPlayButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginHorizontal: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 100,
  },
  duaItem: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  duaContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duaInfo: {
    flex: 1,
  },
  duaName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  duaTransliteration: {
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 4,
    lineHeight: 18,
  },
  duaTranslation: {
    fontSize: 12,
    lineHeight: 16,
  },
  duaActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 12,
  },
  favoriteButton: {
    padding: 6,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 13,
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  mainTabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  mainTabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTabText: {
    fontSize: 15,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 14,
    height: 46,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    height: '100%',
  },
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  countBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  zikrModalCard: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 36,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  modalCategoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  modalCategoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalArabicBox: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  modalArabic: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 46,
    letterSpacing: 1,
  },
  modalRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  modalRowLabel: {
    fontSize: 13,
    fontWeight: '600',
    width: 72,
    paddingTop: 1,
  },
  modalRowValue: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  startZikrBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 18,
  },
  startZikrBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  startZikrCount: {
    marginLeft: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default DuaLibraryScreen;
