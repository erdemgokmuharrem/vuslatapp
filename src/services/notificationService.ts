import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
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

// Request permissions
export const registerForPushNotificationsAsync = async (): Promise<string | null> => {
  let token = null;
  
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      logger.log('Failed to get push token for push notification!');
      return null;
    }
    
    // Get Expo push token
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    logger.log('Must use physical device for Push Notifications');
  }

  // Set up notification channels for Android
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
    
    Notifications.setNotificationChannelAsync('prayer-times', {
      name: 'Prayer Times',
      description: 'Notifications for prayer times',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#4CAF50',
    });
    
    Notifications.setNotificationChannelAsync('quran-reminders', {
      name: 'Quran Reminders',
      description: 'Reminders to read Quran',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#2196F3',
    });
    
    Notifications.setNotificationChannelAsync('daily-ayah', {
      name: 'Daily Ayah',
      description: 'Daily Ayah and Hadith notifications',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#9C27B0',
    });
  }

  return token;
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
