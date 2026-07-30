import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Share
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { useFeedStore } from '../store/useFeedStore';
import { useThemeStore } from '../store/useThemeStore';
import { safeKeyExtractor } from '../utils/keyGenerator';
import { FeedItem } from '../data/feedData';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const FavoritesScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const { getFavorites, toggleFavorite } = useFeedStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  const favorites = getFavorites();
  
  const handleShare = async (item: FeedItem) => {
    try {
      await Share.share({
        message: `${item.content}\n\n${item.translation}\n\n${item.reference}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  const handleRemoveFavorite = (id: string) => {
    toggleFavorite(id);
  };
  
  const renderFavoriteItem = ({ item }: { item: FeedItem }) => {
    return (
      <View style={[styles.favoriteItem, { backgroundColor: theme.cardBackgroundColor }]}>
        <View style={styles.favoriteItemHeader}>
          <View style={styles.favoriteItemType}>
            <View 
              style={[
                styles.typeIndicator, 
                { 
                  backgroundColor: item.type === 'ayah' 
                    ? theme.primaryColor 
                    : theme.secondaryColor 
                }
              ]} 
            />
            <Text style={[styles.typeText, { color: theme.textColor + '99' }]}>
              {item.type === 'ayah' ? t('ayah') : t('hadith')}
            </Text>
          </View>
          
          <View style={styles.favoriteItemActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleRemoveFavorite(item.id)}
            >
              <Ionicons name="heart" size={22} color={theme.primaryColor} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleShare(item)}
            >
              <Ionicons name="share-social-outline" size={22} color={theme.textColor + '99'} />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={[styles.arabicText, { color: theme.primaryColor }]}>
          {item.content}
        </Text>
        
        <Text style={[styles.translationText, { color: theme.textColor }]}>
          {item.translation}
        </Text>
        
        <Text style={[styles.referenceText, { color: theme.textColor + '99' }]}>
          {item.reference}
        </Text>
      </View>
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.primaryColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.textColor }]}>{t('favorites')}</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item, index) => safeKeyExtractor(item, index, 'favorite')}
        contentContainerStyle={styles.favoritesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={64} color={theme.textColor + '40'} />
            <Text style={[styles.emptyText, { color: theme.textColor + '80' }]}>
              {t('no_favorites')}
            </Text>
            <TouchableOpacity
              style={[styles.browseButton, { backgroundColor: theme.primaryColor }]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.browseButtonText}>{t('browse_feed')}</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
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
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  favoritesList: {
    padding: 16,
  },
  favoriteItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  favoriteItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  favoriteItemType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  favoriteItemActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 4,
    marginLeft: 12,
  },
  arabicText: {
    fontSize: 22,
    lineHeight: 36,
    textAlign: 'right',
    fontWeight: '500',
    marginBottom: 16,
  },
  translationText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  referenceText: {
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    marginVertical: 16,
  },
  browseButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  browseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FavoritesScreen;
