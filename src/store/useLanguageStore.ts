import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n/i18n';
import logger from '../utils/logger';

export type Language = 'en' | 'tr' | 'de' | 'ru' | 'fr';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => Promise<void> | void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'tr',
      setLanguage: async (language) => {
        i18n.changeLanguage(language);
        set({ language });
        try {
          await AsyncStorage.multiSet([
            ['user-language', language],
            ['language', language],
          ]);
        } catch (error) {
          logger.error('Error persisting language selection', error);
        }
      },
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.language) {
          i18n.changeLanguage(state.language);
        }
      },
    }
  )
);
