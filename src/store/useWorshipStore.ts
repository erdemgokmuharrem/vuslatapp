import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { WorshipItem, getAllWorshipItems } from '../data/worshipData';

interface CompletedItem {
  id: string;
  date: string; // ISO string format
  count: number;
}

interface WorshipState {
  completedItems: CompletedItem[];
  dailyStreak: number;
  lastCompletedDate: string | null;
  
  // Actions
  markItemCompleted: (itemId: string, count?: number) => void;
  markItemIncomplete: (itemId: string) => void;
  isItemCompleted: (itemId: string) => boolean;
  getCompletedCount: (itemId: string) => number;
  getCompletionPercentageByCategory: (category: string) => number;
  getTodayCompletionPercentage: () => number;
  updateStreak: () => void;
  resetCompletedItems: () => void;
}

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDateString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Helper function to check if two dates are consecutive
const areConsecutiveDates = (date1: string, date2: string): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  // Reset time to compare just the dates
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  
  // Calculate difference in days
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays === 1;
};

export const useWorshipStore = create<WorshipState>()(
  persist(
    (set, get) => ({
      completedItems: [],
      dailyStreak: 0,
      lastCompletedDate: null,
      
      markItemCompleted: (itemId: string, count: number = 1) => {
        const today = getTodayDateString();
        
        set((state) => {
          // Check if item is already completed today
          const existingIndex = state.completedItems.findIndex(
            item => item.id === itemId && item.date === today
          );
          
          if (existingIndex !== -1) {
            // Update existing item
            const updatedItems = [...state.completedItems];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              count,
            };
            
            return {
              completedItems: updatedItems,
              lastCompletedDate: today,
            };
          } else {
            // Add new completed item
            return {
              completedItems: [
                ...state.completedItems,
                { id: itemId, date: today, count }
              ],
              lastCompletedDate: today,
            };
          }
        });
        
        // Update streak
        get().updateStreak();
      },
      
      markItemIncomplete: (itemId: string) => {
        const today = getTodayDateString();
        
        set((state) => ({
          completedItems: state.completedItems.filter(
            item => !(item.id === itemId && item.date === today)
          ),
        }));
        
        // Update streak
        get().updateStreak();
      },
      
      isItemCompleted: (itemId: string) => {
        const today = getTodayDateString();
        return get().completedItems.some(
          item => item.id === itemId && item.date === today
        );
      },
      
      getCompletedCount: (itemId: string) => {
        const today = getTodayDateString();
        const item = get().completedItems.find(
          item => item.id === itemId && item.date === today
        );
        
        return item ? item.count : 0;
      },
      
      getCompletionPercentageByCategory: (category: string) => {
        const today = getTodayDateString();
        
        // Get all items in the category
        const allItems = getAllWorshipItems().filter(item => item.category === category);
        if (allItems.length === 0) return 0;
        
        // Count completed items in the category
        const completedCount = get().completedItems.filter(
          item => {
            const worshipItem = getAllWorshipItems().find(wi => wi.id === item.id);
            return item.date === today && worshipItem && worshipItem.category === category;
          }
        ).length;
        
        return (completedCount / allItems.length) * 100;
      },
      
      getTodayCompletionPercentage: () => {
        const today = getTodayDateString();
        
        // Get all required and sunnah items
        const allItems = getAllWorshipItems().filter(
          item => item.isRequired || item.isSunnah
        );
        
        if (allItems.length === 0) return 0;
        
        // Count completed items
        const completedCount = get().completedItems.filter(
          item => item.date === today
        ).length;
        
        return (completedCount / allItems.length) * 100;
      },
      
      updateStreak: () => {
        const today = getTodayDateString();
        const { lastCompletedDate, dailyStreak } = get();
        
        // If this is the first completion
        if (!lastCompletedDate) {
          set({ dailyStreak: 1 });
          return;
        }
        
        // If already completed today, no change in streak
        if (lastCompletedDate === today) {
          return;
        }
        
        // If yesterday was completed, increment streak
        if (areConsecutiveDates(lastCompletedDate, today)) {
          set({ dailyStreak: dailyStreak + 1 });
        } else {
          // Reset streak if not consecutive
          set({ dailyStreak: 1 });
        }
      },
      
      resetCompletedItems: () => {
        set({ completedItems: [] });
      },
    }),
    {
      name: 'worship-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
