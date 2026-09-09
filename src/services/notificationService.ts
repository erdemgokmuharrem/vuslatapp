import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import logger from '../utils/logger';

// Import the required types for notifications
const { SchedulableTriggerInputTypes } = Notifications;

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Bildirim iznini ister ve Android bildirim kanallarını kurar.
 *
 * Uygulama yalnızca cihaz üzerinde planlanan (local) bildirimler kullanır;
 * uzak push gönderen bir sunucu yoktur. Bu yüzden Expo push token'ı
 * alınmaz - bu çağrı bir EAS projectId gerektirir ve gerçek cihazda
 * hata fırlatırdı.
 */
export const registerForPushNotificationsAsync = async (): Promise<boolean> => {
  try {
    // Android kanalları izinden bağımsız olarak tanımlanmalı.
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });

      await Notifications.setNotificationChannelAsync('prayer-times', {
        name: 'Prayer Times',
        description: 'Notifications for prayer times',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#4CAF50',
      });

      await Notifications.setNotificationChannelAsync('quran-reminders', {
        name: 'Quran Reminders',
        description: 'Reminders to read Quran',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#2196F3',
      });

      await Notifications.setNotificationChannelAsync('daily-ayah', {
        name: 'Daily Ayah',
        description: 'Daily Ayah and Hadith notifications',
        importance: Notifications.AndroidImportance.DEFAULT,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#9C27B0',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      logger.log('Notification permission was not granted');
      return false;
    }

    return true;
  } catch (error) {
    logger.error('Error setting up notifications:', error);
    return false;
  }
};

// Schedule a one-time notification
export const scheduleOneTimeNotification = async (
  title: string,
  body: string,
  trigger: Date,
  data: any = {}
): Promise<string> => {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: {
      type: SchedulableTriggerInputTypes.DATE,
      date: trigger,
    },
  });
};

// Schedule a daily notification
export const scheduleDailyNotification = async (
  title: string,
  body: string,
  hour: number,
  minute: number,
  data: any = {}
): Promise<string> => {
  // Create a date object for today at the specified hour and minute
  const now = new Date();
  const scheduledTime = new Date(now);
  scheduledTime.setHours(hour, minute, 0, 0);
  
  // If the time has already passed today, schedule for tomorrow
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }
  
  return await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: {
      type: SchedulableTriggerInputTypes.DATE,
      date: scheduledTime,
    },
  });
};

// Cancel a scheduled notification
export const cancelNotification = async (notificationId: string): Promise<void> => {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
};

// Cancel all scheduled notifications
export const cancelAllNotifications = async (): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

// Get all scheduled notifications
export const getAllScheduledNotifications = async (): Promise<Notifications.NotificationRequest[]> => {
  return await Notifications.getAllScheduledNotificationsAsync();
};

// Add a notification listener
export const addNotificationListener = (
  listener: (notification: Notifications.Notification) => void
): Notifications.Subscription => {
  return Notifications.addNotificationReceivedListener(listener);
};

// Add a notification response listener
export const addNotificationResponseListener = (
  listener: (response: Notifications.NotificationResponse) => void
): Notifications.Subscription => {
  return Notifications.addNotificationResponseReceivedListener(listener);
};

// Remove a notification listener
export const removeNotificationListener = (subscription: Notifications.Subscription): void => {
  subscription.remove();
};
