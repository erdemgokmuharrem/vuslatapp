import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import logger from '../utils/logger';

// Import the required types for notifications
const { SchedulableTriggerInputTypes } = Notifications;

export interface Reminder {
  id: string;
  title: string;
  body: string;
  type: 'prayer' | 'quran' | 'dua' | 'custom' | 'ayah' | 'hadith';
  time: string; // HH:MM format
  days: number[]; // 0-6, where 0 is Sunday
  enabled: boolean;
  notificationId?: string;
  createdAt: string;
  updatedAt: string;
}

interface ReminderState {
  reminders: Reminder[];
  
  // Actions
  addReminder: (reminder: Omit<Reminder, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateReminder: (id: string, updates: Partial<Reminder>) => Promise<void>;
  deleteReminder: (id: string) => Promise<void>;
  toggleReminder: (id: string) => Promise<void>;
  getReminderById: (id: string) => Reminder | undefined;
  getRemindersByType: (type: Reminder['type']) => Reminder[];
}

// Helper function to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

const scheduleNotification = async (reminder: Reminder): Promise<string> => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      throw new Error('Notification permissions not granted');
    }
  }

  // Cancel existing notification if it exists
  if (reminder.notificationId) {
    await Notifications.cancelScheduledNotificationAsync(reminder.notificationId);
  }
  
  // Parse time
  const [hours, minutes] = reminder.time.split(':').map(Number);
  
  // Create trigger for each selected day
  const triggers = reminder.days.map(day => {
    const trigger = new Date();
    trigger.setHours(hours, minutes, 0);
    
    // Set to next occurrence of the day
    const currentDay = trigger.getDay();
    const daysUntilTarget = (day - currentDay + 7) % 7;
    
    if (daysUntilTarget === 0 && trigger <= new Date()) {
      // If it's today but the time has passed, schedule for next week
      trigger.setDate(trigger.getDate() + 7);
    } else {
      trigger.setDate(trigger.getDate() + daysUntilTarget);
    }
    
    return trigger;
  });
  
  // Schedule notifications for each day
  const notificationIds = await Promise.all(
    triggers.map(trigger => 
      Notifications.scheduleNotificationAsync({
        content: {
          title: reminder.title,
          body: reminder.body,
          data: { reminderId: reminder.id },
        },
        trigger: {
          type: SchedulableTriggerInputTypes.CALENDAR,
          hour: hours,
          minute: minutes,
          weekday: trigger.getDay() + 1, // Expo uses 1-7 for weekdays
          repeats: true,
        },
      })
    )
  );
  
  // Return the first notification ID (we'll use this as a reference)
  return notificationIds[0];
};

// Helper function to cancel a notification
const cancelNotification = async (notificationId?: string): Promise<void> => {
  if (notificationId) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }
};

export const useReminderStore = create<ReminderState>()(
  persist(
    (set, get) => ({
      reminders: [],
      
      addReminder: async (reminderData) => {
        const now = new Date().toISOString();
        const newReminder: Reminder = {
          ...reminderData,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
        };
        
        // Schedule notification if enabled
        if (newReminder.enabled) {
          try {
            const notificationId = await scheduleNotification(newReminder);
            newReminder.notificationId = notificationId;
          } catch (error) {
            logger.error('Failed to schedule notification:', error);
          }
        }
        
        set((state) => ({
          reminders: [...state.reminders, newReminder],
        }));
        
        return newReminder.id;
      },
      
      updateReminder: async (id, updates) => {
        const reminder = get().getReminderById(id);
        if (!reminder) return;
        
        const updatedReminder = {
          ...reminder,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        
        // Handle notification scheduling/cancellation
        if (updatedReminder.enabled) {
          try {
            const notificationId = await scheduleNotification(updatedReminder);
            updatedReminder.notificationId = notificationId;
          } catch (error) {
            logger.error('Failed to schedule notification:', error);
          }
        } else if (reminder.notificationId) {
          try {
            await cancelNotification(reminder.notificationId);
            updatedReminder.notificationId = undefined;
          } catch (error) {
            logger.error('Failed to cancel notification:', error);
          }
        }
        
        set((state) => ({
          reminders: state.reminders.map((r) => (r.id === id ? updatedReminder : r)),
        }));
      },
      
      deleteReminder: async (id) => {
        const reminder = get().getReminderById(id);
        if (!reminder) return;
        
        // Cancel notification if it exists
        if (reminder.notificationId) {
          try {
            await cancelNotification(reminder.notificationId);
          } catch (error) {
            logger.error('Failed to cancel notification:', error);
          }
        }
        
        set((state) => ({
          reminders: state.reminders.filter((r) => r.id !== id),
        }));
      },
      
      toggleReminder: async (id) => {
        const reminder = get().getReminderById(id);
        if (!reminder) return;
        
        await get().updateReminder(id, { enabled: !reminder.enabled });
      },
      
      getReminderById: (id) => {
        return get().reminders.find((r) => r.id === id);
      },
      
      getRemindersByType: (type) => {
        return get().reminders.filter((r) => r.type === type);
      },
    }),
    {
      name: 'reminder-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
