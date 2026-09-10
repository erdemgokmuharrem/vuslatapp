import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Share,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import IslamicBackground from '../components/common/IslamicBackground';
import AdBanner from '../components/common/AdBanner';

import { RootStackParamList } from '../navigation/types';
import { useFeedStore } from '../store/useFeedStore';
import { useThemeStore } from '../store/useThemeStore';
import { safeKeyExtractor } from '../utils/keyGenerator';
import { FeedItem, getAllTags } from '../data/feedData';

type FeedScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const FeedScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const { 
    currentFilter, 
    currentType, 
    setFilter, 
    setType, 
    getFilteredFeed,
    toggleFavorite,
    isFavorite
  } = useFeedStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  
  useEffect(() => {
    // Get all tags
    setTags(getAllTags());
    
    // Get filtered feed items
    setFeedItems(getFilteredFeed());
  }, [currentFilter, currentType]);
  
  const handleShare = async (item: FeedItem) => {
    try {
      await Share.share({
        message: `${item.content}\n\n${item.translation}\n\n${item.reference}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  const handleFavoriteToggle = (id: string) => {
    toggleFavorite(id);
  };
  
  const handleFilterSelect = (tag: string | null) => {
    setFilter(tag);
  };
  
  const handleTypeSelect = (type: 'all' | 'ayah' | 'hadith') => {
    setType(type);
  };
  
  const renderFeedItem = ({ item }: { item: FeedItem }) => {
    const isFav = isFavorite(item.id);
    
    return (
      <View style={[styles.feedItem, { backgroundColor: theme.cardBackgroundColor }]}>
        <View style={styles.feedItemHeader}>
          <View style={styles.feedItemType}>
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
          
          <View style={styles.feedItemActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleFavoriteToggle(item.id)}
            >
              <Ionicons 
                name={isFav ? 'heart' : 'heart-outline'} 
                size={22} 
                color={isFav ? theme.primaryColor : theme.textColor + '99'} 
              />
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
        
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <TouchableOpacity 
              key={`tag_${tag}_${index}`} 
              style={[
                styles.tagChip,
                { 
                  backgroundColor: currentFilter === tag 
                    ? theme.primaryColor 
                    : theme.primaryColor + '20'
                }
              ]}
              onPress={() => handleFilterSelect(tag)}
            >
              <Text 
                style={[
                  styles.tagText, 
                  { 
                    color: currentFilter === tag 
                      ? 'white' 
                      : theme.primaryColor 
                  }
                ]}
              >
                #{tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  
  return (
    <IslamicBackground>
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
          accessibilityLabel={t('back')}
        >
          <Ionicons name="chevron-back" size={24} color={theme.primaryColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.textColor }]}>{t('feed')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <Ionicons name="heart" size={24} color={theme.primaryColor} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          <TouchableOpacity
            style={[
              styles.filterChip,
              { 
                backgroundColor: currentFilter === null 
                  ? theme.primaryColor 
                  : theme.cardBackgroundColor
              }
            ]}
            onPress={() => handleFilterSelect(null)}
          >
            <Text 
              style={[
                styles.filterText, 
                { 
                  color: currentFilter === null 
                    ? 'white' 
                    : theme.textColor 
                }
              ]}
            >
              {t('all_tags')}
            </Text>
          </TouchableOpacity>
          
          {tags.map((tag, index) => (
            <TouchableOpacity
              key={`filter_${tag}_${index}`}
              style={[
                styles.filterChip,
                { 
                  backgroundColor: currentFilter === tag 
                    ? theme.primaryColor 
                    : theme.cardBackgroundColor
                }
              ]}
              onPress={() => handleFilterSelect(tag)}
            >
              <Text 
                style={[
                  styles.filterText, 
                  { 
                    color: currentFilter === tag 
                      ? 'white' 
                      : theme.textColor 
                  }
                ]}
              >
                #{tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.typeFilterContainer}>
        <TouchableOpacity
          style={[
            styles.typeFilterButton,
            { 
              backgroundColor: currentType === 'all' 
                ? theme.primaryColor 
                : 'transparent',
              borderColor: theme.primaryColor,
            }
          ]}
          onPress={() => handleTypeSelect('all')}
        >
          <Text 
            style={[
              styles.typeFilterText, 
              { 
                color: currentType === 'all' 
                  ? 'white' 
                  : theme.primaryColor 
              }
            ]}
          >
            {t('all')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.typeFilterButton,
            { 
              backgroundColor: currentType === 'ayah' 
                ? theme.primaryColor 
                : 'transparent',
              borderColor: theme.primaryColor,
            }
          ]}
          onPress={() => handleTypeSelect('ayah')}
        >
          <Text 
            style={[
              styles.typeFilterText, 
              { 
                color: currentType === 'ayah' 
                  ? 'white' 
                  : theme.primaryColor 
              }
            ]}
          >
            {t('ayahs')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.typeFilterButton,
            { 
              backgroundColor: currentType === 'hadith' 
                ? theme.primaryColor 
                : 'transparent',
              borderColor: theme.primaryColor,
            }
          ]}
          onPress={() => handleTypeSelect('hadith')}
        >
          <Text 
            style={[
              styles.typeFilterText, 
              { 
                color: currentType === 'hadith' 
                  ? 'white' 
                  : theme.primaryColor 
              }
            ]}
          >
            {t('hadiths')}
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={feedItems}
        renderItem={renderFeedItem}
        keyExtractor={(item, index) => safeKeyExtractor(item, index, 'feed')}
        contentContainerStyle={styles.feedList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color={theme.textColor + '40'} />
            <Text style={[styles.emptyText, { color: theme.textColor + '80' }]}>
              {t('no_items_found')}
            </Text>
          </View>
        }
      />
      <AdBanner />
      </View>
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
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterContainer: {
    paddingVertical: 8,
  },
  filterScroll: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  typeFilterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  typeFilterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
  },
  typeFilterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  feedList: {
    padding: 16,
    paddingTop: 8,
  },
  feedItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  feedItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  feedItemType: {
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
  feedItemActions: {
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
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
});

export default FeedScreen;
