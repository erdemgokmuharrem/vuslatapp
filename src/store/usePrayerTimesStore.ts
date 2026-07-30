import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
  PrayerTimes, 
  LocationData, 
  fetchPrayerTimes, 
  getCurrentLocation, 
  getNextPrayer,
  getTimeUntilNextPrayer
} from '../api/prayerTimesApi';
import * as Notifications from 'expo-notifications';
import logger from '../utils/logger';

interface PrayerTimesState {
  prayerTimes: PrayerTimes | null;
  location: LocationData | null;
  calculationMethod: number;
  autoSilentMode: boolean;
  nextPrayer: { name: string; time: string } | null;
  timeUntilNextPrayer: string;
  isLoading: boolean;
  error: string | null;
  notificationsEnabled: boolean;
  scheduledNotifIds: string[];
  
  // Actions
  fetchPrayerTimesForToday: () => Promise<void>;
  fetchPrayerTimesForDate: (date: Date) => Promise<void>;
  setCalculationMethod: (method: number) => void;
  toggleAutoSilentMode: () => void;
  toggleNotifications: () => void;
  updateNextPrayer: () => void;
  schedulePrayerNotifications: () => Promise<void>;
}

export const usePrayerTimesStore = create<PrayerTimesState>()(
  persist(
    (set, get) => ({
      prayerTimes: null,
      location: null,
      calculationMethod: 1, // Default to MWL method
      autoSilentMode: false,
      nextPrayer: null,
      timeUntilNextPrayer: '',
      isLoading: false,
      error: null,
      notificationsEnabled: true,
      scheduledNotifIds: [],
      
      fetchPrayerTimesForToday: async () => {
        set({ isLoading: true, error: null });
        try {
          // Get current location if not available
          let location = get().location;
          if (!location) {
            location = await getCurrentLocation();
            set({ location });
          }
          
          // Fetch prayer times for today
          const prayerTimes = await fetchPrayerTimes(
            new Date(),
            location || undefined,
            get().calculationMethod
          );
          
          if (prayerTimes) {
            set({ prayerTimes });
            get().updateNextPrayer();
            await get().schedulePrayerNotifications();
          } else {
            set({ error: 'Failed to fetch prayer times' });
          }
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      fetchPrayerTimesForDate: async (date: Date) => {
        set({ isLoading: true, error: null });
        try {
          // Get current location if not available
          let location = get().location;
          if (!location) {
            location = await getCurrentLocation();
            set({ location });
          }
          
          // Fetch prayer times for the specified date
          const prayerTimes = await fetchPrayerTimes(
            date,
            location || undefined,
            get().calculationMethod
          );
          
          if (prayerTimes) {
            set({ prayerTimes });
            get().updateNextPrayer();
          } else {
            set({ error: 'Failed to fetch prayer times' });
          }
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      setCalculationMethod: (method: number) => {
        set({ calculationMethod: method });
        // Refetch prayer times with new method
        get().fetchPrayerTimesForToday();
      },
      
      toggleAutoSilentMode: () => {
        set((state) => ({ autoSilentMode: !state.autoSilentMode }));
      },
      
      toggleNotifications: () => {
        const newState = !get().notificationsEnabled;
        set({ notificationsEnabled: newState });
        get().schedulePrayerNotifications();
      },
      
      updateNextPrayer: () => {
        const { prayerTimes } = get();
        if (prayerTimes) {
          const nextPrayer = getNextPrayer(prayerTimes);
          const timeUntilNextPrayer = nextPrayer ? getTimeUntilNextPrayer(nextPrayer) : '';
          set({ nextPrayer, timeUntilNextPrayer });
        }
      },
      
      schedulePrayerNotifications: async () => {
        const { prayerTimes, notificationsEnabled, scheduledNotifIds } = get();
        
        // Cancel previously scheduled notifications
        for (const id of scheduledNotifIds) {
          try {
            await Notifications.cancelScheduledNotificationAsync(id);
          } catch (e) {}
        }
        set({ scheduledNotifIds: [] });
        
        if (!notificationsEnabled || !prayerTimes) return;
        
        // Request permissions
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
          const { status: newStatus } = await Notifications.requestPermissionsAsync();
          if (newStatus !== 'granted') return;
        }

        const prayers = [
          { key: 'fajr', name: 'İmsak' },
          { key: 'sunrise', name: 'Güneş' },
          { key: 'dhuhr', name: 'Öğle' },
          { key: 'asr', name: 'İkindi' },
          { key: 'maghrib', name: 'Akşam' },
          { key: 'isha', name: 'Yatsı' }
        ];

        const newIds: string[] = [];
        const now = new Date();

        for (const p of prayers) {
          const timeStr = prayerTimes[p.key as keyof PrayerTimes] as string;
          if (!timeStr) continue;
          
          const [hours, minutes] = timeStr.split(':').map(Number);
          const prayerDate = new Date();
          prayerDate.setHours(hours, minutes, 0, 0);
          
          // 10 mins before
          const notifyTime = new Date(prayerDate.getTime() - 10 * 60000);
          
          if (notifyTime > now) {
            try {
              const id = await Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Namaz Vakti Yaklaşıyor',
                  body: `${p.name} vaktine 10 dakika kaldı.`,
                  sound: true,
                },
                trigger: {
                  type: Notifications.SchedulableTriggerInputTypes.DATE,
                  date: notifyTime,
                },
              });
              newIds.push(id);
            } catch (err) {
              logger.error(`Error scheduling notification for ${p.key}:`, err);
            }
          }
        }
        
        set({ scheduledNotifIds: newIds });
      },
    }),
    {
      name: 'prayer-times-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
