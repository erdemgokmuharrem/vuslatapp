import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ayah, Surah, surahs } from '../data/quranData';
import logger from '../utils/logger';

// Base URL for the Quran API
const API_BASE_URL = 'https://api.alquran.cloud/v1';

// Cache keys
const SURAH_CACHE_KEY = 'quran_surah_cache';
const AYAH_CACHE_KEY = 'quran_ayah_cache';

/**
 * Fetch all surahs from the API
 */
export const fetchSurahs = async (): Promise<Surah[]> => {
  try {
    // Check cache first
    const cachedSurahs = await AsyncStorage.getItem(SURAH_CACHE_KEY);
    if (cachedSurahs) {
      return JSON.parse(cachedSurahs);
    }
    
    // Fetch from API if not cached
    const response = await fetch(`${API_BASE_URL}/surah`);
    const data = await response.json();
    
    if (data.code === 200 && data.status === 'OK') {
      const surahs = data.data;
      
      // Cache the data
      await AsyncStorage.setItem(SURAH_CACHE_KEY, JSON.stringify(surahs));
      
      return surahs;
    }
    
    throw new Error('Failed to fetch surahs');
  } catch (error) {
    logger.error('Error fetching surahs:', error);
    throw error;
  }
};

/**
 * Fetch ayahs for a specific surah
 */
export const fetchAyahsForSurah = async (surahId: number): Promise<Ayah[]> => {
  try {
    // Check cache first
    const cacheKey = `${AYAH_CACHE_KEY}_${surahId}`;
    const cachedAyahs = await AsyncStorage.getItem(cacheKey);
    
    if (cachedAyahs) {
      return JSON.parse(cachedAyahs);
    }
    
    // Fetch from API if not cached
    const response = await fetch(`${API_BASE_URL}/surah/${surahId}`);
    const data = await response.json();
    
    if (data.code === 200 && data.status === 'OK') {
      const ayahs = data.data.ayahs.map((ayah: any) => ({
        number: ayah.number,
        text: ayah.text,
        surah: surahId,
        numberInSurah: ayah.numberInSurah,
        juz: ayah.juz,
        page: ayah.page,
      }));
      
      // Cache the data
      await AsyncStorage.setItem(cacheKey, JSON.stringify(ayahs));
      
      return ayahs;
    }
    
    throw new Error(`Failed to fetch ayahs for surah ${surahId}`);
  } catch (error) {
    logger.error(`Error fetching ayahs for surah ${surahId}:`, error);
    throw error;
  }
};

/**
 * Fetch translation for a specific surah
 */
export const fetchTranslationForSurah = async (
  surahId: number,
  language: string = 'en'
): Promise<any[]> => {
  try {
    // Check cache first
    const cacheKey = `quran_translation_${language}_${surahId}`;
    const cachedTranslation = await AsyncStorage.getItem(cacheKey);
    
    if (cachedTranslation) {
      return JSON.parse(cachedTranslation);
    }
    
    // Determine edition based on language
    let edition = 'en.sahih'; // Default to Sahih International (English)
    if (language === 'tr') {
      edition = 'tr.diyanet'; // Turkish — Diyanet
    } else if (language === 'de') {
      edition = 'de.aburida'; // German — Abu Rida
    } else if (language === 'fr') {
      edition = 'fr.hamidullah'; // French — Hamidullah
    } else if (language === 'ru') {
      edition = 'ru.kuliev'; // Russian — Kuliev
    }
    
    // Fetch from API if not cached
    const response = await fetch(`${API_BASE_URL}/surah/${surahId}/${edition}`);
    const data = await response.json();
    
    if (data.code === 200 && data.status === 'OK') {
      const translations = data.data.ayahs.map((ayah: any) => ({
        number: ayah.number,
        text: ayah.text,
        numberInSurah: ayah.numberInSurah,
      }));
      
      // Cache the data
      await AsyncStorage.setItem(cacheKey, JSON.stringify(translations));
      
      return translations;
    }
    
    throw new Error(`Failed to fetch translation for surah ${surahId}`);
  } catch (error) {
    logger.error(`Error fetching translation for surah ${surahId}:`, error);
    throw error;
  }
};

/**
 * Fetch transliteration (Latin characters) for a specific surah from API
 * Uses alquran.cloud en.transliteration edition which covers all 114 surahs
 */
export const fetchTransliterationForSurah = async (surahId: number): Promise<{ numberInSurah: number; text: string }[]> => {
  try {
    const cacheKey = `quran_transliteration_${surahId}`;
    const cached = await AsyncStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const response = await fetch(`${API_BASE_URL}/surah/${surahId}/en.transliteration`);
    const data = await response.json();

    if (data.code === 200 && data.status === 'OK') {
      const result = data.data.ayahs.map((ayah: any) => ({
        numberInSurah: ayah.numberInSurah,
        text: ayah.text,
      }));
      await AsyncStorage.setItem(cacheKey, JSON.stringify(result));
      return result;
    }

    throw new Error(`Failed to fetch transliteration for surah ${surahId}`);
  } catch (error) {
    logger.error(`Error fetching transliteration for surah ${surahId}:`, error);
    return [];
  }
};

/**
 * Get audio URL for a specific surah and reciter
 */
export const getAudioUrlForSurah = (surahId: number, reciterId: string = 'mishari'): string => {
  // Format surah ID with leading zeros if needed
  const formattedSurahId = surahId.toString().padStart(3, '0');
  
  // Working audio URLs for different reciters
  const audioUrls: Record<string, string> = {
    // Mishary Rashid Al-Afasy
    mishari: `https://download.quranicaudio.com/quran/mishary_rashid_alafasy/${formattedSurahId}.mp3`,
    // Abdul Basit Abdul Samad
    abdulbaset: `https://download.quranicaudio.com/quran/abdul_basit_murattal/${formattedSurahId}.mp3`,
    // Mahmoud Khalil Al-Husary
    husary: `https://download.quranicaudio.com/quran/mahmoud_khalil_al-husary/${formattedSurahId}.mp3`,
    // Muhammad Siddiq Al-Minshawi
    minshawi: `https://download.quranicaudio.com/quran/muhammad_siddiq_al-minshawi/${formattedSurahId}.mp3`,
    // Hani Ar-Rifai
    rifai: `https://download.quranicaudio.com/quran/hani_ar_rifai/${formattedSurahId}.mp3`,
  };
  
  // Return URL for selected reciter or default to Mishary
  return audioUrls[reciterId] || audioUrls.mishari;
};

/**
 * Get audio URL for a specific ayah and reciter
 */
export const getAudioUrlForAyah = (
  surahId: number,
  ayahNumber: number,
  reciterId: string = 'mishari'
): string => {
  // We need to calculate the global ayah number (1 to 6236)
  // because cdn.islamic.network API uses the global ayah number.
  let globalAyahNumber = 0;
  
  for (let i = 0; i < surahId - 1; i++) {
    globalAyahNumber += surahs[i].numberOfAyahs;
  }
  globalAyahNumber += ayahNumber;
  
  // Working ayah audio URLs
  const audioUrls: Record<string, string> = {
    // Mishary Rashid Al-Afasy
    mishari: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${globalAyahNumber}.mp3`,
    // Abdul Basit Abdul Samad
    abdulbaset: `https://cdn.islamic.network/quran/audio/128/ar.abdulsamad/${globalAyahNumber}.mp3`,
    // Mahmoud Khalil Al-Husary
    husary: `https://cdn.islamic.network/quran/audio/128/ar.husary/${globalAyahNumber}.mp3`,
    // Muhammad Siddiq Al-Minshawi
    minshawi: `https://cdn.islamic.network/quran/audio/128/ar.minshawi/${globalAyahNumber}.mp3`,
    // Hani Ar-Rifai
    rifai: `https://cdn.islamic.network/quran/audio/128/ar.rifai/${globalAyahNumber}.mp3`,
  };
  return audioUrls[reciterId] || audioUrls.mishari;
};

/**
 * Save reading progress
 */
export const saveReadingProgress = async (surahId: number, ayahNumber: number): Promise<void> => {
  try {
    const progress = {
      surahId,
      ayahNumber,
      timestamp: new Date().toISOString(),
    };
    
    await AsyncStorage.setItem('quran_reading_progress', JSON.stringify(progress));
  } catch (error) {
    logger.error('Error saving reading progress:', error);
  }
};

/**
 * Get reading progress
 */
export const getReadingProgress = async (): Promise<{ surahId: number; ayahNumber: number } | null> => {
  try {
    const progress = await AsyncStorage.getItem('quran_reading_progress');
    
    if (progress) {
      return JSON.parse(progress);
    }
    
    return null;
  } catch (error) {
    logger.error('Error getting reading progress:', error);
    return null;
  }
};
