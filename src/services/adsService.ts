import { Platform } from 'react-native';
import mobileAds from 'react-native-google-mobile-ads';
import {
  getTrackingPermissionsAsync,
  requestTrackingPermissionsAsync,
} from 'expo-tracking-transparency';
import logger from '../utils/logger';

let initialized = false;

/**
 * Google Mobile Ads SDK'sını başlatır.
 *
 * iOS'ta önce App Tracking Transparency izni sorulur; app.json içinde
 * NSUserTrackingUsageDescription tanımlı olduğu için bu istem zorunludur.
 *
 * Not: Uygulamada henüz Google UMP (GDPR onay formu) akışı bulunmadığından
 * reklamlar her koşulda kişiselleştirilmemiş olarak istenir; bkz. AdBanner.
 */
export const initializeAds = async (): Promise<void> => {
  if (initialized) return;

  try {
    if (Platform.OS === 'ios') {
      const { status } = await getTrackingPermissionsAsync();
      if (status === 'undetermined') {
        await requestTrackingPermissionsAsync();
      }
    }

    await mobileAds().initialize();
    initialized = true;
  } catch (error) {
    logger.error('Error initializing ads:', error);
  }
};

export default initializeAds;
