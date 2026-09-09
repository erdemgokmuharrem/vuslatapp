import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeLanguage } from './src/utils/initLanguage';
import { initializeAds } from './src/services/adsService';
import IslamicBackground from './src/components/common/IslamicBackground';
import GlobalAudioPlayer from './src/components/common/GlobalAudioPlayer';
import ErrorBoundary from './src/components/common/ErrorBoundary';
import logger from './src/utils/logger';

import { RootNavigator } from './src/navigation/RootNavigator';
import i18n from './src/i18n/i18n';
import { useThemeStore } from './src/store/useThemeStore';
import { isDarkTheme } from './src/styles/theme';
import { useLanguageStore } from './src/store/useLanguageStore';

export default function App() {
  const { theme, setTheme, getThemeObject } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const themeObj = getThemeObject();

  // Load saved theme and language on app start
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Initialize language to Turkish if not set
        await initializeLanguage();

        // Kayıtlı tema yoksa varsayılan olarak Islamic Green kullanılır.
        const savedTheme = await AsyncStorage.getItem('theme');
        setTheme((savedTheme as any) || 'islamic-green');

        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage) {
          setLanguage(savedLanguage as any);
        }

        // Language is persisted from useLanguageStore - no force needed
      } catch (error) {
        logger.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  // Reklam SDK'sını başlat (iOS'ta önce izleme izni sorulur).
  useEffect(() => {
    initializeAds();
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer>
            <View style={styles.container}>
              <StatusBar style={isDarkTheme(theme) ? 'light' : 'dark'} />
              <IslamicBackground>
                <RootNavigator />
              </IslamicBackground>
              <GlobalAudioPlayer />
            </View>
          </NavigationContainer>
        </I18nextProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
