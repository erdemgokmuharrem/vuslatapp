import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
  FeedItem, 
  allFeedItems, 
  filterByTag, 
  filterByType,
  getFeedItemById,
  getRandomFeedItem
} from '../data/feedData';

interface FeedState {
  feedItems: FeedItem[];
  favorites: string[];
  currentFilter: string | null;
  currentType: 'all' | 'ayah' | 'hadith';
  
  // Actions
  setFilter: (tag: string | null) => void;
  setType: (type: 'all' | 'ayah' | 'hadith') => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  getFavorites: () => FeedItem[];
  getFilteredFeed: () => FeedItem[];
  getRandomItem: () => FeedItem;
  getItemById: (id: string) => FeedItem | undefined;
}

export const useFeedStore = create<FeedState>()(
  persist(
    (set, get) => ({
      feedItems: allFeedItems,
      favorites: [],
      currentFilter: null,
      currentType: 'all',
      
      setFilter: (tag: string | null) => {
        set({ currentFilter: tag });
      },
      
      setType: (type: 'all' | 'ayah' | 'hadith') => {
        set({ currentType: type });
      },
      
      toggleFavorite: (id: string) => {
        set((state) => {
          if (state.favorites.includes(id)) {
            // Remove from favorites
            return {
              favorites: state.favorites.filter(favId => favId !== id)
            };
          } else {
            // Add to favorites
            return {
              favorites: [...state.favorites, id]
            };
          }
        });
      },
      
      isFavorite: (id: string) => {
        return get().favorites.includes(id);
      },
      
      getFavorites: () => {
        const { favorites } = get();
        return allFeedItems.filter(item => favorites.includes(item.id));
      },
      
      getFilteredFeed: () => {
        const { currentFilter, currentType } = get();
        let filtered = [...allFeedItems];
        
        // Filter by type if not 'all'
        if (currentType !== 'all') {
          filtered = filterByType(currentType);
        }
        
        // Filter by tag if a filter is set
        if (currentFilter) {
          filtered = filtered.filter(item => item.tags.includes(currentFilter));
        }
        
        return filtered;
      },
      
      getRandomItem: () => {
        return getRandomFeedItem();
      },
      
      getItemById: (id: string) => {
        return getFeedItemById(id);
      },
    }),
    {
      name: 'feed-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
