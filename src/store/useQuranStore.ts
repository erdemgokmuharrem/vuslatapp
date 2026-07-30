import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ayah, Surah, getSurahById, surahs as localSurahs } from '../data/quranData';
import {
  fetchSurahs,
  fetchAyahsForSurah,
  fetchTranslationForSurah,
  saveReadingProgress,
  getReadingProgress
} from '../api/quranApi';

interface QuranState {
  surahs: Surah[];
  currentSurah: Surah | null;
  ayahs: Ayah[];
  translations: any[];
  currentAyah: number;
  selectedReciter: string;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  showTranslation: boolean;
  bookmarks: { surahId: number; ayahNumber: number }[];
  hatimProgress: { [key: number]: boolean }; // Track completed surahs for Hatim

  // Actions
  fetchAllSurahs: () => Promise<void>;
  fetchAyahsForSurah: (surahId: number) => Promise<void>;
  fetchTranslation: (surahId: number, language: string) => Promise<void>;
  setCurrentSurah: (surahId: number) => void;
  setCurrentAyah: (ayahNumber: number) => void;
  setSelectedReciter: (reciterId: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  toggleTranslation: () => void;
  addBookmark: (surahId: number, ayahNumber: number) => void;
  removeBookmark: (surahId: number, ayahNumber: number) => void;
  isBookmarked: (surahId: number, ayahNumber: number) => boolean;
  markSurahCompleted: (surahId: number) => void;
  resetHatimProgress: () => void;
  getHatimCompletionPercentage: () => number;
  saveProgress: () => void;
  loadProgress: () => Promise<void>;
}

export const useQuranStore = create<QuranState>()(
  persist(
    (set, get) => ({
      surahs: [],
      currentSurah: null,
      ayahs: [],
      translations: [],
      currentAyah: 1,
      selectedReciter: 'mishari',
      isPlaying: false,
      isLoading: false,
      error: null,
      showTranslation: true,
      bookmarks: [],
      hatimProgress: {},

      fetchAllSurahs: async () => {
        set({ isLoading: true, error: null });
        try {
          // Use local data first
          if (localSurahs && localSurahs.length > 0) {
            set({ surahs: localSurahs });
          } else {
            // Fallback to API if local data is not available
            const surahs = await fetchSurahs();
            set({ surahs });
          }
        } catch (error) {
          // If API fails, try to use local data as fallback
          if (localSurahs && localSurahs.length > 0) {
            set({ surahs: localSurahs });
          } else {
            set({ error: error instanceof Error ? error.message : 'Failed to fetch surahs' });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      fetchAyahsForSurah: async (surahId: number) => {
        set({ isLoading: true, error: null });
        try {
          const ayahs = await fetchAyahsForSurah(surahId);
          set({ ayahs });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : `Failed to fetch ayahs for surah ${surahId}` });
        } finally {
          set({ isLoading: false });
        }
      },

      fetchTranslation: async (surahId: number, language: string = 'en') => {
        set({ isLoading: true, error: null });
        try {
          const translations = await fetchTranslationForSurah(surahId, language);
          set({ translations });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : `Failed to fetch translation for surah ${surahId}` });
        } finally {
          set({ isLoading: false });
        }
      },

      setCurrentSurah: (surahId: number) => {
        try {
          console.log('setCurrentSurah called with id:', surahId);

          // Validate surahId
          if (typeof surahId !== 'number' || isNaN(surahId) || surahId < 1 || surahId > 114) {
            console.warn(`Invalid surahId: ${surahId}, defaulting to 1`);
            surahId = 1; // Default to first surah 
          }

          const surah = getSurahById(surahId);
          if (surah) {
            set({ currentSurah: surah, currentAyah: 1 });
            get().fetchAyahsForSurah(surahId);
            if (get().showTranslation) {
              get().fetchTranslation(surahId, 'tr'); // Türkçe çeviri yükle
            }
          } else {
            console.error(`Failed to get surah with id: ${surahId}`);
          }
        } catch (error) {
          console.error('Error in setCurrentSurah:', error);
          // Try to recover by setting to first surah
          const firstSurah = getSurahById(1);
          if (firstSurah) {
            set({ currentSurah: firstSurah, currentAyah: 1 });
            get().fetchAyahsForSurah(1);
          }
        }
      },

      setCurrentAyah: (ayahNumber: number) => {
        set({ currentAyah: ayahNumber });
        // Save reading progress
        const { currentSurah } = get();
        if (currentSurah) {
          saveReadingProgress(currentSurah.id, ayahNumber);
        }
      },

      setSelectedReciter: (reciterId: string) => {
        set({ selectedReciter: reciterId });
      },

      setIsPlaying: (isPlaying: boolean) => {
        set({ isPlaying });
      },

      toggleTranslation: () => {
        const showTranslation = !get().showTranslation;
        set({ showTranslation });

        // Fetch translation if needed
        if (showTranslation && get().currentSurah && get().translations.length === 0) {
          const currentSurah = get().currentSurah;
          if (currentSurah) {
            get().fetchTranslation(currentSurah.id, 'tr'); // Türkçe çeviri yükle
          }
        }
      },

      addBookmark: (surahId: number, ayahNumber: number) => {
        const bookmark = { surahId, ayahNumber };
        set((state) => ({
          bookmarks: [...state.bookmarks, bookmark]
        }));
      },

      removeBookmark: (surahId: number, ayahNumber: number) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter(
            b => !(b.surahId === surahId && b.ayahNumber === ayahNumber)
          )
        }));
      },

      isBookmarked: (surahId: number, ayahNumber: number) => {
        return get().bookmarks.some(
          b => b.surahId === surahId && b.ayahNumber === ayahNumber
        );
      },

      markSurahCompleted: (surahId: number) => {
        set((state) => ({
          hatimProgress: {
            ...state.hatimProgress,
            [surahId]: true
          }
        }));
      },

      resetHatimProgress: () => {
        set({ hatimProgress: {} });
      },

      getHatimCompletionPercentage: () => {
        const completedCount = Object.keys(get().hatimProgress).length;
        const totalSurahs = 114; // Total number of surahs in the Quran
        return (completedCount / totalSurahs) * 100;
      },

      saveProgress: () => {
        const { currentSurah, currentAyah } = get();
        if (currentSurah) {
          saveReadingProgress(currentSurah.id, currentAyah);
        }
      },

      loadProgress: async () => {
        try {
          const progress = await getReadingProgress();
          if (progress) {
            const { surahId, ayahNumber } = progress;
            get().setCurrentSurah(surahId);
            get().setCurrentAyah(ayahNumber);
          }
        } catch (error) {
          console.error('Error loading reading progress:', error);
        }
      },
    }),
    {
      name: 'quran-storage-v2',
      storage: createJSONStorage(() => AsyncStorage),
      migrate: (persistedState: any, version: number) => {
        // Her versiyonda meal gösterimini açık tut
        return { ...persistedState, showTranslation: true };
      },
      version: 2,
    }
  )
);
