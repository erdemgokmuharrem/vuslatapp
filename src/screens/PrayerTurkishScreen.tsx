import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Share,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import IslamicBackground from '../components/common/IslamicBackground';

import { RootStackParamList } from '../navigation/types';
import { useThemeStore } from '../store/useThemeStore';
import { 
  prayerDuaCategories, 
  getPrayerDuasByCategory, 
  getRequiredPrayerDuas,
  getSunnahPrayerDuas,
  PrayerDua,
  PrayerDuaCategory 
} from '../data/prayerDuasData';

type PrayerTurkishScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const PrayerTurkishScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<PrayerTurkishScreenNavigationProp>();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('opening');
  const [selectedDua, setSelectedDua] = useState<PrayerDua | null>(null);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'required' | 'sunnah'>('all');
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const getCurrentDuas = () => {
    let duas = getPrayerDuasByCategory(selectedCategory);
    
    if (filterType === 'required') {
      duas = duas.filter(dua => dua.isRequired);
    } else if (filterType === 'sunnah') {
      duas = duas.filter(dua => !dua.isRequired);
    }
    
    return duas;
  };

  const currentDuas = getCurrentDuas();

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedDua(null);
  };

  const handleDuaPress = (dua: PrayerDua) => {
    setSelectedDua(dua);
  };

  const handleFilterPress = (filter: 'all' | 'required' | 'sunnah') => {
    setFilterType(filter);
    setSelectedDua(null);
  };

  const handleShare = async (dua: PrayerDua) => {
    try {
      const shareText = `🕌 ${dua.nameTr}\n\n${dua.arabic}\n\n${dua.transliterationTr}\n\n${dua.translationTr}\n\n📍 ${dua.positionTr}\n⏰ ${dua.whenTr}\n\n#VuslatApp`;
      
      await Share.share({
        message: shareText,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const handlePlayAudio = async (dua: PrayerDua) => {
    if (!dua.audioUrl) {
      Alert.alert('Bilgi', 'Bu dua için ses dosyası henüz mevcut değil.');
      return;
    }

    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: dua.audioUrl },
        { shouldPlay: true }
      );
      
      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error('Audio error:', error);
      Alert.alert('Hata', 'Ses dosyası oynatılamadı.');
    }
  };

  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          { 
            backgroundColor: filterType === 'all' ? theme.primaryColor : theme.cardBackgroundColor,
          }
        ]}
        onPress={() => handleFilterPress('all')}
      >
        <Text style={[
          styles.filterText,
          { color: filterType === 'all' ? 'white' : theme.textColor }
        ]}>
          Tümü
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.filterButton,
          { 
            backgroundColor: filterType === 'required' ? theme.primaryColor : theme.cardBackgroundColor,
          }
        ]}
        onPress={() => handleFilterPress('required')}
      >
        <Text style={[
          styles.filterText,
          { color: filterType === 'required' ? 'white' : theme.textColor }
        ]}>
          Farz
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.filterButton,
          { 
            backgroundColor: filterType === 'sunnah' ? theme.primaryColor : theme.cardBackgroundColor,
          }
        ]}
        onPress={() => handleFilterPress('sunnah')}
      >
        <Text style={[
          styles.filterText,
          { color: filterType === 'sunnah' ? 'white' : theme.textColor }
        ]}>
          Sünnet
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderCategoryCard = (category: PrayerDuaCategory) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryCard,
        { 
          backgroundColor: theme.cardBackgroundColor,
          borderColor: selectedCategory === category.id ? theme.primaryColor : 'transparent',
          borderWidth: selectedCategory === category.id ? 2 : 0
        }
      ]}
      onPress={() => handleCategoryPress(category.id)}
    >
      <View style={styles.categoryHeader}>
        <Ionicons 
          name={category.icon as any} 
          size={24} 
          color={selectedCategory === category.id ? theme.primaryColor : theme.textColor} 
        />
        <Text style={[
          styles.categoryTitle, 
          { 
            color: selectedCategory === category.id ? theme.primaryColor : theme.textColor,
            fontWeight: selectedCategory === category.id ? 'bold' : 'normal'
          }
        ]}>
          {category.nameTr}
        </Text>
      </View>
      <Text style={[styles.categoryDescription, { color: theme.textColor + '80' }]}>
        {category.descriptionTr}
      </Text>
    </TouchableOpacity>
  );

  const renderDuaItem = (dua: PrayerDua) => (
    <TouchableOpacity
      key={dua.id}
      style={[
        styles.duaItem,
        { 
          backgroundColor: theme.cardBackgroundColor,
          borderColor: selectedDua?.id === dua.id ? theme.primaryColor : 'transparent',
          borderWidth: selectedDua?.id === dua.id ? 2 : 0
        }
      ]}
      onPress={() => handleDuaPress(dua)}
    >
      <View style={styles.duaHeader}>
        <View style={styles.duaTitleContainer}>
          <Text style={[styles.duaTitle, { color: theme.textColor }]}>
            {dua.nameTr}
          </Text>
          {dua.isRequired && (
            <View style={[styles.requiredBadge, { backgroundColor: theme.primaryColor + '20' }]}>
              <Text style={[styles.requiredText, { color: theme.primaryColor }]}>
                Farz
              </Text>
            </View>
          )}
        </View>
        <View style={styles.duaActions}>
          <TouchableOpacity 
            onPress={() => handlePlayAudio(dua)}
            style={styles.actionButton}
          >
            <Ionicons name="play-circle-outline" size={24} color={theme.primaryColor} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleShare(dua)}
            style={styles.actionButton}
          >
            <Ionicons name="share-outline" size={20} color={theme.primaryColor} />
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={[styles.duaPosition, { color: theme.textColor + '80' }]}>
        📍 {dua.positionTr}
      </Text>
      
      <Text style={[styles.duaWhen, { color: theme.textColor + '80' }]}>
        ⏰ {dua.whenTr}
      </Text>
      
      {dua.source && (
        <Text style={[styles.duaSource, { color: theme.primaryColor }]}>
          📚 {dua.source}
        </Text>
      )}
    </TouchableOpacity>
  );

  const renderDuaDetail = (dua: PrayerDua) => (
    <View style={[styles.duaDetail, { backgroundColor: theme.cardBackgroundColor }]}>
      <View style={styles.detailHeader}>
        <View style={styles.detailTitleContainer}>
          <Text style={[styles.detailTitle, { color: theme.textColor }]}>
            {dua.nameTr}
          </Text>
          {dua.isRequired && (
            <View style={[styles.requiredBadge, { backgroundColor: theme.primaryColor + '20' }]}>
              <Text style={[styles.requiredText, { color: theme.primaryColor }]}>
                Farz
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity 
          onPress={() => setSelectedDua(null)}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={24} color={theme.textColor} />
        </TouchableOpacity>
      </View>

      {/* Arabic Text */}
      <Text style={[styles.arabicText, { color: theme.primaryColor }]}>
        {dua.arabic}
      </Text>

      {/* Transliteration Toggle */}
      <TouchableOpacity 
        style={styles.transliterationToggle}
        onPress={() => setShowTransliteration(!showTransliteration)}
      >
        <Text style={[styles.toggleText, { color: theme.textColor + '80' }]}>
          {showTransliteration ? 'Okunuşu Gizle' : 'Okunuşu Göster'}
        </Text>
        <Ionicons 
          name={showTransliteration ? "chevron-up" : "chevron-down"} 
          size={16} 
          color={theme.textColor + '80'} 
        />
      </TouchableOpacity>

      {/* Transliteration */}
      {showTransliteration && (
        <Text style={[styles.transliterationText, { color: theme.textColor + '99' }]}>
          {dua.transliterationTr}
        </Text>
      )}

      {/* Turkish Translation */}
      <Text style={[styles.translationText, { color: theme.textColor }]}>
        {dua.translationTr}
      </Text>

      {/* Position and When */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Ionicons name="body-outline" size={16} color={theme.primaryColor} />
          <Text style={[styles.infoText, { color: theme.textColor }]}>
            {dua.positionTr}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={16} color={theme.primaryColor} />
          <Text style={[styles.infoText, { color: theme.textColor }]}>
            {dua.whenTr}
          </Text>
        </View>
      </View>

      {/* Source */}
      {dua.source && (
        <View style={styles.sourceContainer}>
          <Ionicons name="book-outline" size={16} color={theme.primaryColor} />
          <Text style={[styles.sourceText, { color: theme.primaryColor }]}>
            {dua.source}
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.detailActions}>
        <TouchableOpacity 
          style={[styles.detailActionButton, { backgroundColor: theme.primaryColor }]}
          onPress={() => handlePlayAudio(dua)}
        >
          <Ionicons name="play" size={20} color="white" />
          <Text style={styles.detailActionText}>Dinle</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.detailActionButton, { backgroundColor: theme.primaryColor + '20' }]}
          onPress={() => handleShare(dua)}
        >
          <Ionicons name="share-outline" size={20} color={theme.primaryColor} />
          <Text style={[styles.detailActionText, { color: theme.primaryColor }]}>Paylaş</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <IslamicBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={28} color={theme.primaryColor} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.textColor }]}>
            Namaz Duaları
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {selectedDua ? (
            renderDuaDetail(selectedDua)
          ) : (
            <>
              {/* Filter Buttons */}
              {renderFilterButtons()}

              {/* Categories */}
              <View style={styles.categoriesContainer}>
                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                  Kategoriler
                </Text>
                {prayerDuaCategories.map(renderCategoryCard)}
              </View>

              {/* Duas List */}
              <View style={styles.duasContainer}>
                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                  {prayerDuaCategories.find(cat => cat.id === selectedCategory)?.nameTr}
                  {filterType !== 'all' && ` (${filterType === 'required' ? 'Farz' : 'Sünnet'})`}
                </Text>
                {currentDuas.length > 0 ? (
                  currentDuas.map(renderDuaItem)
                ) : (
                  <Text style={[styles.emptyText, { color: theme.textColor + '80' }]}>
                    Bu kategoride {filterType === 'required' ? 'farz' : 'sünnet'} dua bulunmamaktadır.
                  </Text>
                )}
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </IslamicBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  categoryDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  duasContainer: {
    marginBottom: 24,
  },
  duaItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  duaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  duaTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  duaTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  requiredBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  requiredText: {
    fontSize: 10,
    fontWeight: '600',
  },
  duaActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  duaPosition: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  duaWhen: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  duaSource: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
  duaDetail: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  detailTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  closeButton: {
    padding: 4,
  },
  arabicText: {
    fontSize: 22,
    lineHeight: 36,
    textAlign: 'right',
    fontWeight: '500',
    marginBottom: 16,
  },
  transliterationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginBottom: 8,
  },
  toggleText: {
    fontSize: 14,
    marginRight: 4,
  },
  transliterationText: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
  },
  translationText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 8,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sourceText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  detailActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 0.45,
    justifyContent: 'center',
  },
  detailActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default PrayerTurkishScreen;
