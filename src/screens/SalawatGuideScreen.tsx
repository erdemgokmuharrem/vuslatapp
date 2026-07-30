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
  salawatCategories, 
  getSalawatByCategory, 
  getRandomSalawat,
  Salawat,
  SalawatCategory 
} from '../data/salawatData';

type SalawatGuideScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SalawatGuideScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<SalawatGuideScreenNavigationProp>();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('basic');
  const [selectedSalawat, setSelectedSalawat] = useState<Salawat | null>(null);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSalawat = getSalawatByCategory(selectedCategory);

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSalawat(null);
  };

  const handleSalawatPress = (salawat: Salawat) => {
    setSelectedSalawat(salawat);
  };

  const handleRandomSalawat = () => {
    const randomSalawat = getRandomSalawat();
    setSelectedSalawat(randomSalawat);
    setSelectedCategory(randomSalawat.category);
  };

  const handleShare = async (salawat: Salawat) => {
    try {
      const shareText = `🌙 ${salawat.nameTr}\n\n${salawat.arabic}\n\n${salawat.transliterationTr}\n\n${salawat.translationTr}\n\n📖 Faydası: ${salawat.benefitsTr}\n\n#ZmatikApp`;
      
      await Share.share({
        message: shareText,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const handlePlayAudio = async (salawat: Salawat) => {
    if (!salawat.audioUrl) {
      Alert.alert('Bilgi', 'Bu salavat için ses dosyası henüz mevcut değil.');
      return;
    }

    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: salawat.audioUrl },
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

  const renderCategoryCard = (category: SalawatCategory) => (
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

  const renderSalawatItem = (salawat: Salawat) => (
    <TouchableOpacity
      key={salawat.id}
      style={[
        styles.salawatItem,
        { 
          backgroundColor: theme.cardBackgroundColor,
          borderColor: selectedSalawat?.id === salawat.id ? theme.primaryColor : 'transparent',
          borderWidth: selectedSalawat?.id === salawat.id ? 2 : 0
        }
      ]}
      onPress={() => handleSalawatPress(salawat)}
    >
      <View style={styles.salawatHeader}>
        <Text style={[styles.salawatTitle, { color: theme.textColor }]}>
          {salawat.nameTr}
        </Text>
        <View style={styles.salawatActions}>
          <TouchableOpacity 
            onPress={() => handlePlayAudio(salawat)}
            style={styles.actionButton}
          >
            <Ionicons name="play-circle-outline" size={24} color={theme.primaryColor} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleShare(salawat)}
            style={styles.actionButton}
          >
            <Ionicons name="share-outline" size={20} color={theme.primaryColor} />
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={[styles.salawatBenefit, { color: theme.textColor + '80' }]}>
        📖 {salawat.benefitsTr}
      </Text>
      
      {salawat.source && (
        <Text style={[styles.salawatSource, { color: theme.primaryColor }]}>
          📚 {salawat.source}
        </Text>
      )}
    </TouchableOpacity>
  );

  const renderSalawatDetail = (salawat: Salawat) => (
    <View style={[styles.salawatDetail, { backgroundColor: theme.cardBackgroundColor }]}>
      <View style={styles.detailHeader}>
        <Text style={[styles.detailTitle, { color: theme.textColor }]}>
          {salawat.nameTr}
        </Text>
        <TouchableOpacity 
          onPress={() => setSelectedSalawat(null)}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={24} color={theme.textColor} />
        </TouchableOpacity>
      </View>

      {/* Arabic Text */}
      <Text style={[styles.arabicText, { color: theme.primaryColor }]}>
        {salawat.arabic}
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
          {salawat.transliterationTr}
        </Text>
      )}

      {/* Turkish Translation */}
      <Text style={[styles.translationText, { color: theme.textColor }]}>
        {salawat.translationTr}
      </Text>

      {/* Benefits */}
      <View style={styles.benefitsContainer}>
        <Text style={[styles.benefitsLabel, { color: theme.textColor + '80' }]}>
          📖 Faydası:
        </Text>
        <Text style={[styles.benefitsText, { color: theme.textColor }]}>
          {salawat.benefitsTr}
        </Text>
      </View>

      {/* Source */}
      {salawat.source && (
        <View style={styles.sourceContainer}>
          <Ionicons name="book-outline" size={16} color={theme.primaryColor} />
          <Text style={[styles.sourceText, { color: theme.primaryColor }]}>
            {salawat.source}
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.detailActions}>
        <TouchableOpacity 
          style={[styles.detailActionButton, { backgroundColor: theme.primaryColor }]}
          onPress={() => handlePlayAudio(salawat)}
        >
          <Ionicons name="play" size={20} color="white" />
          <Text style={styles.detailActionText}>Dinle</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.detailActionButton, { backgroundColor: theme.primaryColor + '20' }]}
          onPress={() => handleShare(salawat)}
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
            Salavatlar
          </Text>
          <TouchableOpacity 
            onPress={handleRandomSalawat}
            style={styles.randomButton}
          >
            <Ionicons name="shuffle-outline" size={28} color={theme.primaryColor} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {selectedSalawat ? (
            renderSalawatDetail(selectedSalawat)
          ) : (
            <>
              {/* Categories */}
              <View style={styles.categoriesContainer}>
                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                  Kategoriler
                </Text>
                {salawatCategories.map(renderCategoryCard)}
              </View>

              {/* Salawat List */}
              <View style={styles.salawatContainer}>
                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                  {salawatCategories.find(cat => cat.id === selectedCategory)?.nameTr}
                </Text>
                {currentSalawat.map(renderSalawatItem)}
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
  randomButton: {
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
  salawatContainer: {
    marginBottom: 24,
  },
  salawatItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  salawatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  salawatTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  salawatActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  salawatBenefit: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  salawatSource: {
    fontSize: 12,
    fontWeight: '500',
  },
  salawatDetail: {
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
    alignItems: 'center',
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
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
  benefitsContainer: {
    marginBottom: 16,
  },
  benefitsLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  benefitsText: {
    fontSize: 14,
    lineHeight: 20,
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

export default SalawatGuideScreen;
