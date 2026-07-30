import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

interface TasbihStats {
  daily: number;
  weekly: number;
  monthly: number;
  total: number;
  lastUpdated: string;
}

interface TasbihState {
  count: number;
  goal: number | null;
  vibrationEnabled: boolean;
  soundEnabled: boolean;
  stats: TasbihStats;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setGoal: (goal: number | null) => void;
  toggleVibration: () => void;
  toggleSound: () => void;
  updateStats: () => void;
}

export const useTasbihStore = create<TasbihState>()(
  persist(
    (set, get) => ({
      count: 0,
      goal: null,
      vibrationEnabled: true,
      soundEnabled: false,
      stats: {
        daily: 0,
        weekly: 0,
        monthly: 0,
        total: 0,
        lastUpdated: new Date().toISOString(),
      },
      increment: () => {
        set((state) => ({ count: state.count + 1 }));
        get().updateStats();
      },
      decrement: () => {
        set((state) => ({ count: Math.max(0, state.count - 1) }));
      },
      reset: () => {
        set({ count: 0 });
      },
      setGoal: (goal) => {
        set({ goal });
      },
      toggleVibration: () => {
        set((state) => ({ vibrationEnabled: !state.vibrationEnabled }));
      },
      toggleSound: () => {
        set((state) => ({ soundEnabled: !state.soundEnabled }));
      },
      updateStats: () => {
        const now = new Date();
        const lastUpdated = new Date(get().stats.lastUpdated);
        
        // Check if we need to reset daily/weekly/monthly counts
        const isNewDay = now.getDate() !== lastUpdated.getDate() || 
                         now.getMonth() !== lastUpdated.getMonth() ||
                         now.getFullYear() !== lastUpdated.getFullYear();
        
        const isNewWeek = Math.floor(now.getTime() / (7 * 24 * 60 * 60 * 1000)) !==
                          Math.floor(lastUpdated.getTime() / (7 * 24 * 60 * 60 * 1000));
        
        const isNewMonth = now.getMonth() !== lastUpdated.getMonth() ||
                           now.getFullYear() !== lastUpdated.getFullYear();
        
        set((state) => ({
          stats: {
            daily: isNewDay ? 1 : state.stats.daily + 1,
            weekly: isNewWeek ? 1 : state.stats.weekly + 1,
            monthly: isNewMonth ? 1 : state.stats.monthly + 1,
            total: state.stats.total + 1,
            lastUpdated: now.toISOString(),
          }
        }));
      },
    }),
    {
      name: 'tasbih-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
