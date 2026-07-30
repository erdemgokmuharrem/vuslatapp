import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FontScale = 1 | 1.2 | 1.4 | 1.6 | 1.8;

export const FONT_SCALES: { value: FontScale; labelKey: string }[] = [
  { value: 1,   labelKey: 'font_size_normal' },
  { value: 1.2, labelKey: 'font_size_large' },
  { value: 1.4, labelKey: 'font_size_xlarge' },
  { value: 1.6, labelKey: 'font_size_xxlarge' },
];

interface FontSizeState {
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
  scaledSize: (base: number) => number;
}

export const useFontSizeStore = create<FontSizeState>()(
  persist(
    (set, get) => ({
      fontScale: 1,
      setFontScale: (scale) => set({ fontScale: scale }),
      scaledSize: (base: number) => Math.round(base * get().fontScale),
    }),
    {
      name: 'font-size-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
