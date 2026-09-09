import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeType, themes } from '../styles/theme';
import logger from '../utils/logger';

const persistTheme = (theme: ThemeType) => {
  AsyncStorage.setItem('theme', theme).catch((error) =>
    logger.error('Error saving theme:', error)
  );
};

interface ThemeState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  getThemeObject: () => typeof themes.light;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'light',
  setTheme: (theme) => {
    persistTheme(theme);
    set({ theme });
  },
  toggleTheme: () => set((state) => {
    const theme: ThemeType = state.theme === 'light' ? 'dark' : 'light';
    persistTheme(theme);
    return { theme };
  }),
  getThemeObject: () => themes[get().theme],
}));
