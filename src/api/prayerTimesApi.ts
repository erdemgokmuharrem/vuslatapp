import { Platform } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types for prayer times data
export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  date: string;
}

export interface PrayerTimesResponse {
  code: number;
  status: string;
  data: {
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
    };
    date: {
      readable: string;
      timestamp: string;
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string };
        month: { number: number; en: string };
        year: string;
      };
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string; ar: string };
        month: { number: number; en: string; ar: string };
        year: string;
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
        params: { [key: string]: number };
      };
      latitudeAdjustmentMethod: string;
      midnightMode: string;
      school: string;
      offset: { [key: string]: number };
    };
  }[];
}

export interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

// Default calculation method (1 = MWL)
const DEFAULT_METHOD = 1;

// Cache keys
const PRAYER_TIMES_CACHE_KEY = 'prayer_times_cache';
const LOCATION_CACHE_KEY = 'location_cache';

/**
 * Get user's current location
 */
export const getCurrentLocation = async (): Promise<LocationData | null> => {
  try {
    // Check if we have cached location data
    const cachedLocationData = await AsyncStorage.getItem(LOCATION_CACHE_KEY);
    if (cachedLocationData) {
      return JSON.parse(cachedLocationData);
    }

    // Request location permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return null;
    }

    // Get current location
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // Get location name (reverse geocoding)
    const [geocode] = await Location.reverseGeocodeAsync({ latitude, longitude });
    
    const locationData: LocationData = {
      latitude,
      longitude,
      city: geocode?.city || undefined,
      country: geocode?.country || undefined,
    };

    // Cache location data
    await AsyncStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(locationData));
    
    return locationData;
  } catch (error) {
    console.error('Error getting location:', error);
    return null;
  }
};

/**
 * Fetch prayer times from the API
 */
export const fetchPrayerTimes = async (
  date: Date = new Date(),
  location?: LocationData,
  method: number = DEFAULT_METHOD
): Promise<PrayerTimes | null> => {
  try {
    // Get location if not provided
    const locationData = location || await getCurrentLocation();
    if (!locationData) {
      throw new Error('Location data is required');
    }

    const { latitude, longitude } = locationData;
    
    // Format date for API
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // Check cache first
    const cacheKey = `${PRAYER_TIMES_CACHE_KEY}_${year}_${month}_${day}_${latitude.toFixed(2)}_${longitude.toFixed(2)}_${method}`;
    const cachedData = await AsyncStorage.getItem(cacheKey);
    
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    
    // Fetch from API if not cached
    const url = `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=${method}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.code === 200 && data.status === 'OK') {
      const timings = data.data.timings;
      
      const prayerTimes: PrayerTimes = {
        fajr: timings.Fajr,
        sunrise: timings.Sunrise,
        dhuhr: timings.Dhuhr,
        asr: timings.Asr,
        maghrib: timings.Maghrib,
        isha: timings.Isha,
        date: data.data.date.readable,
      };
      
      // Cache the data
      await AsyncStorage.setItem(cacheKey, JSON.stringify(prayerTimes));
      
      return prayerTimes;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return null;
  }
};

/**
 * Get the next prayer time
 */
export const getNextPrayer = (prayerTimes: PrayerTimes): { name: string; time: string } | null => {
  if (!prayerTimes) return null;
  
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  
  // Convert prayer times to minutes since midnight for comparison
  const prayers = [
    { name: 'fajr', time: prayerTimes.fajr },
    { name: 'sunrise', time: prayerTimes.sunrise },
    { name: 'dhuhr', time: prayerTimes.dhuhr },
    { name: 'asr', time: prayerTimes.asr },
    { name: 'maghrib', time: prayerTimes.maghrib },
    { name: 'isha', time: prayerTimes.isha },
  ];
  
  // Convert current time to minutes since midnight
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;
  
  // Find the next prayer
  for (const prayer of prayers) {
    const [prayerHours, prayerMinutes] = prayer.time.split(':').map(Number);
    const prayerTimeInMinutes = prayerHours * 60 + prayerMinutes;
    
    if (prayerTimeInMinutes > currentTimeInMinutes) {
      return prayer;
    }
  }
  
  // If all prayers for today have passed, return the first prayer for tomorrow
  return { name: 'fajr', time: prayerTimes.fajr };
};

/**
 * Calculate time remaining until next prayer
 */
export const getTimeUntilNextPrayer = (nextPrayer: { name: string; time: string }): string => {
  if (!nextPrayer) return '';
  
  const now = new Date();
  const [hours, minutes] = nextPrayer.time.split(':').map(Number);
  
  const prayerTime = new Date();
  prayerTime.setHours(hours, minutes, 0, 0);
  
  // If prayer time is earlier than current time, it's for tomorrow
  if (prayerTime < now) {
    prayerTime.setDate(prayerTime.getDate() + 1);
  }
  
  // Calculate difference in milliseconds
  const diffMs = prayerTime.getTime() - now.getTime();
  
  // Convert to hours and minutes
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${diffHours}h ${diffMinutes}m`;
};
