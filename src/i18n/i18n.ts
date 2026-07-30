import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from '../utils/logger';

import en from './locales/en';
import tr from './locales/tr';
import de from './locales/de';
import ru from './locales/ru';
import fr from './locales/fr';

export const resources = {
  en: { translation: en },
  tr: { translation: tr },
  de: { translation: de },
  ru: { translation: ru },
  fr: { translation: fr },
};

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      const language = await AsyncStorage.getItem('user-language');
      if (language) {
        return callback(language);
      }
    } catch (error) {
      logger.error('Error reading language from AsyncStorage:', error);
    }
    return callback('tr'); // Varsayılan dil Türkçe olarak değiştirildi
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem('user-language', lng);
    } catch (error) {
      logger.error('Error saving language to AsyncStorage:', error);
    }
  },
};

i18n
  // @ts-ignore - Type issues with custom language detector
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    // @ts-ignore - compatibilityJSON type issue
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'tr', // Yedek dil de Türkçe olarak değiştirildi
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
