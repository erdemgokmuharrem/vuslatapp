import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Initialize the default language for the app
 */
export const initializeLanguage = async (): Promise<void> => {
  try {
    // Check if language is already set
    const currentLanguage = await AsyncStorage.getItem('user-language');
    
    // If no language is set, set Turkish as default
    if (!currentLanguage) {
      await AsyncStorage.setItem('user-language', 'tr');
      console.log('Default language set to Turkish');
    }
  } catch (error) {
    console.error('Error initializing language:', error);
  }
};
