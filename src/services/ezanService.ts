import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import logger from '../utils/logger';

interface PrayerTime {
  name: string;
  displayName: string;
  time: string;
}

interface SilentModeSettings {
  enabled: boolean;
  duration: number; // in minutes
  mode: 'silent' | 'vibrate';
}

class EzanService {
  private currentSound: Audio.Sound | null = null;
  private silentModeTimer: NodeJS.Timeout | null = null;

  async initializeEzanService() {
    try {
      // Request notification permissions
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        logger.error('Notification permission not granted');
        return;
      }

      // Configure notifications
      await Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });

      // Listen for notification responses
      Notifications.addNotificationResponseReceivedListener(this.handleNotificationResponse.bind(this));

      logger.log('Ezan service initialized');
    } catch (error) {
      logger.error('Error initializing ezan service:', error);
    }
  }

  private async handleNotificationResponse(response: Notifications.NotificationResponse) {
    const { notification } = response;
    const prayerName = notification.request.content.data?.prayerName as string;
    
    if (prayerName) {
      await this.playEzan(prayerName);
      await this.askForSilentMode(prayerName);
    }
  }

  private async askForSilentMode(prayerName: string) {
    try {
      // Check if user has already set preference
      const silentModeSettings = await this.getSilentModeSettings();
      
      if (silentModeSettings.enabled) {
        await this.enableSilentMode(silentModeSettings);
        return;
      }

      // Ask user for permission
      Alert.alert(
        'Sessiz Mod',
        `${prayerName} namazı için telefonu 20 dakika boyunca sessize almak ister misiniz?`,
        [
          {
            text: 'Hayır',
            style: 'cancel',
            onPress: () => {
              this.saveSilentModeSettings({ enabled: false, duration: 20, mode: 'silent' });
            }
          },
          {
            text: 'Sessize Al',
            onPress: () => {
              this.saveSilentModeSettings({ enabled: true, duration: 20, mode: 'silent' });
              this.enableSilentMode({ enabled: true, duration: 20, mode: 'silent' });
            }
          },
          {
            text: 'Titreşime Al',
            onPress: () => {
              this.saveSilentModeSettings({ enabled: true, duration: 20, mode: 'vibrate' });
              this.enableSilentMode({ enabled: true, duration: 20, mode: 'vibrate' });
            }
          }
        ],
        { cancelable: false }
      );
    } catch (error) {
      logger.error('Error asking for silent mode:', error);
    }
  }

  private async enableSilentMode(settings: SilentModeSettings) {
    try {
      logger.log(`Silent mode enabled: ${settings.mode} for ${settings.duration} minutes`);

      // Show notification to user
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Sessiz Mod Aktif',
          body: `Telefon ${settings.duration} dakika boyunca ${settings.mode === 'silent' ? 'sessiz' : 'titreşim'} modunda`,
        },
        trigger: null,
      });

      // Set timer to restore normal mode
      if (this.silentModeTimer) {
        clearTimeout(this.silentModeTimer);
      }

      this.silentModeTimer = setTimeout(async () => {
        await this.restoreNormalMode();
      }, settings.duration * 60 * 1000);
    } catch (error) {
      logger.error('Error enabling silent mode:', error);
    }
  }

  private async restoreNormalMode() {
    try {
      logger.log('Restoring normal ringer mode');
      
      // Show notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Normal Mod',
          body: 'Telefon normal ses moduna döndürüldü',
        },
        trigger: null,
      });

      this.silentModeTimer = null;
    } catch (error) {
      logger.error('Error restoring normal mode:', error);
    }
  }

  private async getSilentModeSettings(): Promise<SilentModeSettings> {
    try {
      const settings = await AsyncStorage.getItem('silentModeSettings');
      if (settings) {
        return JSON.parse(settings);
      }
      return { enabled: false, duration: 20, mode: 'silent' };
    } catch (error) {
      logger.error('Error getting silent mode settings:', error);
      return { enabled: false, duration: 20, mode: 'silent' };
    }
  }

  private async saveSilentModeSettings(settings: SilentModeSettings) {
    try {
      await AsyncStorage.setItem('silentModeSettings', JSON.stringify(settings));
    } catch (error) {
      logger.error('Error saving silent mode settings:', error);
    }
  }

  async playEzan(prayerName: string) {
    try {
      // Stop any currently playing sound
      if (this.currentSound) {
        await this.currentSound.stopAsync();
        await this.currentSound.unloadAsync();
        this.currentSound = null;
      }

      // For now, using a placeholder URL - replace with actual ezan audio
      const ezanUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      
      const { sound } = await Audio.Sound.createAsync(
        { uri: ezanUrl },
        { shouldPlay: true, volume: 1.0 }
      );

      this.currentSound = sound;
      
      // Play the ezan
      await sound.playAsync();
      
      logger.log(`Playing ezan for ${prayerName}`);
    } catch (error) {
      logger.error('Error playing ezan:', error);
    }
  }

  async stopEzan() {
    try {
      if (this.currentSound) {
        await this.currentSound.stopAsync();
        await this.currentSound.unloadAsync();
        this.currentSound = null;
        logger.log('Ezan stopped');
      }
    } catch (error) {
      logger.error('Error stopping ezan:', error);
    }
  }

  async scheduleEzanNotifications(prayerTimes: PrayerTime[]) {
    try {
      // Cancel existing notifications
      await Notifications.cancelAllScheduledNotificationsAsync();

      for (const prayer of prayerTimes) {
        // Calculate time until prayer
        const now = new Date();
        const [hours, minutes] = prayer.time.split(':').map(Number);
        const prayerTime = new Date();
        prayerTime.setHours(hours, minutes, 0, 0);

        // If prayer time has passed today, schedule for tomorrow
        if (prayerTime <= now) {
          prayerTime.setDate(prayerTime.getDate() + 1);
        }

        const secondsFromNow = Math.floor((prayerTime.getTime() - now.getTime()) / 1000);

        // Schedule notification
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `${prayer.displayName} Ezanı`,
            body: `${prayer.displayName} namazı vakti geldi`,
            sound: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
            data: { prayerName: prayer.displayName },
          },
          trigger: { 
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: secondsFromNow 
          },
        });
      }

      logger.log('Ezan notifications scheduled');
    } catch (error) {
      logger.error('Error scheduling ezan notifications:', error);
    }
  }

  // Cleanup method
  cleanup() {
    if (this.silentModeTimer) {
      clearTimeout(this.silentModeTimer);
      this.silentModeTimer = null;
    }
    
    if (this.currentSound) {
      this.currentSound.unloadAsync();
      this.currentSound = null;
    }
  }
}

export const ezanService = new EzanService();
