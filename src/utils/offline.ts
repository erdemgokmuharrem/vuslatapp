import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from './logger';

/**
 * Offline support utilities for caching and data persistence
 */

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry?: number; // in milliseconds
}

class OfflineManager {
  private static instance: OfflineManager;
  private cachePrefix = 'zmatik_cache_';

  static getInstance(): OfflineManager {
    if (!OfflineManager.instance) {
      OfflineManager.instance = new OfflineManager();
    }
    return OfflineManager.instance;
  }

  // Cache data with optional expiry
  async setCache<T>(key: string, data: T, expiryMs?: number): Promise<void> {
    try {
      const cacheItem: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        expiry: expiryMs ? Date.now() + expiryMs : undefined,
      };
      
      await AsyncStorage.setItem(
        `${this.cachePrefix}${key}`,
        JSON.stringify(cacheItem)
      );
    } catch (error) {
      logger.error('Error setting cache:', error);
    }
  }

  // Get cached data if not expired
  async getCache<T>(key: string): Promise<T | null> {
    try {
      const cached = await AsyncStorage.getItem(`${this.cachePrefix}${key}`);
      if (!cached) return null;

      const cacheItem: CacheItem<T> = JSON.parse(cached);
      
      // Check if expired
      if (cacheItem.expiry && Date.now() > cacheItem.expiry) {
        await this.removeCache(key);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      logger.error('Error getting cache:', error);
      return null;
    }
  }

  // Remove cached data
  async removeCache(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(`${this.cachePrefix}${key}`);
    } catch (error) {
      logger.error('Error removing cache:', error);
    }
  }

  // Clear all cache
  async clearAllCache(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(this.cachePrefix));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      logger.error('Error clearing cache:', error);
    }
  }

  // Cache Quran data
  async cacheQuranData(surahId: number, data: any): Promise<void> {
    // Cache for 7 days
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    await this.setCache(`quran_surah_${surahId}`, data, sevenDays);
  }

  async getCachedQuranData(surahId: number): Promise<any> {
    return await this.getCache(`quran_surah_${surahId}`);
  }

  // Cache prayer times
  async cachePrayerTimes(location: string, data: any): Promise<void> {
    // Cache for 1 day
    const oneDay = 24 * 60 * 60 * 1000;
    await this.setCache(`prayer_times_${location}`, data, oneDay);
  }

  async getCachedPrayerTimes(location: string): Promise<any> {
    return await this.getCache(`prayer_times_${location}`);
  }

  // Cache dua data
  async cacheDuaData(categoryId: string, data: any): Promise<void> {
    // Cache for 30 days
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    await this.setCache(`dua_category_${categoryId}`, data, thirtyDays);
  }

  async getCachedDuaData(categoryId: string): Promise<any> {
    return await this.getCache(`dua_category_${categoryId}`);
  }

  // Save user preferences
  async saveUserPreference(key: string, value: any): Promise<void> {
    try {
      await AsyncStorage.setItem(`user_pref_${key}`, JSON.stringify(value));
    } catch (error) {
      logger.error('Error saving user preference:', error);
    }
  }

  async getUserPreference(key: string): Promise<any> {
    try {
      const value = await AsyncStorage.getItem(`user_pref_${key}`);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error('Error getting user preference:', error);
      return null;
    }
  }

  // Check if app is running offline
  isOffline(): boolean {
    // This would typically use NetInfo in a real app
    // For now, we'll assume online
    return false;
  }

  // Get offline fallback data
  async getOfflineFallback(key: string, fallbackData: any): Promise<any> {
    if (this.isOffline()) {
      const cached = await this.getCache(key);
      return cached || fallbackData;
    }
    return null;
  }
}

export const offlineManager = OfflineManager.getInstance();
export default offlineManager;
