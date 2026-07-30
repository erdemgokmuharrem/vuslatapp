import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from '../utils/logger';

/**
 * Hatim (Quran completion) tracking store
 * Tracks progress through the entire Quran
 */

interface HatimProgress {
  surahId: number;
  ayahNumber: number;
  completed: boolean;
  completedAt?: string;
}

interface HatimSession {
  id: string;
  startDate: string;
  endDate?: string;
  targetDays: number;
  dailyTarget: number; // pages per day
  progress: HatimProgress[];
  completed: boolean;
  completedAt?: string;
}

interface HatimStats {
  totalCompleted: number;
  currentStreak: number;
  longestStreak: number;
  averageCompletionDays: number;
  lastCompletedDate?: string;
}

interface HatimState {
  currentSession: HatimSession | null;
  completedSessions: HatimSession[];
  stats: HatimStats;
  
  // Actions
  startNewHatim: (targetDays: number) => void;
  updateProgress: (surahId: number, ayahNumber: number) => void;
  markSurahCompleted: (surahId: number) => void;
  completeCurrentHatim: () => void;
  resetCurrentHatim: () => void;
  getProgressPercentage: () => number;
  getDailyProgress: () => number;
  getTimeRemaining: () => number;
  isOnTrack: () => boolean;
}

// Total ayahs in Quran for progress calculation
const TOTAL_AYAHS = 6236;

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Calculate days between dates
const daysBetween = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const useHatimStore = create<HatimState>()(
  persist(
    (set, get) => ({
      currentSession: null,
      completedSessions: [],
      stats: {
        totalCompleted: 0,
        currentStreak: 0,
        longestStreak: 0,
        averageCompletionDays: 0,
      },

      startNewHatim: (targetDays: number) => {
        const newSession: HatimSession = {
          id: generateId(),
          startDate: new Date().toISOString(),
          targetDays,
          dailyTarget: Math.ceil(TOTAL_AYAHS / targetDays),
          progress: [],
          completed: false,
        };

        set({ currentSession: newSession });
        logger.log('New Hatim started:', newSession);
      },

      updateProgress: (surahId: number, ayahNumber: number) => {
        const { currentSession } = get();
        if (!currentSession) return;

        const existingProgress = currentSession.progress.find(p => p.surahId === surahId);
        
        if (existingProgress) {
          // Update existing progress
          existingProgress.ayahNumber = Math.max(existingProgress.ayahNumber, ayahNumber);
        } else {
          // Add new progress
          currentSession.progress.push({
            surahId,
            ayahNumber,
            completed: false,
          });
        }

        set({ currentSession: { ...currentSession } });
      },

      markSurahCompleted: (surahId: number) => {
        const { currentSession } = get();
        if (!currentSession) return;

        const progressIndex = currentSession.progress.findIndex(p => p.surahId === surahId);
        
        if (progressIndex >= 0) {
          currentSession.progress[progressIndex] = {
            ...currentSession.progress[progressIndex],
            completed: true,
            completedAt: new Date().toISOString(),
          };
        } else {
          // Add as completed
          currentSession.progress.push({
            surahId,
            ayahNumber: 0, // Completed entire surah
            completed: true,
            completedAt: new Date().toISOString(),
          });
        }

        // Check if all 114 surahs are completed
        const completedSurahs = currentSession.progress.filter(p => p.completed).length;
        if (completedSurahs === 114) {
          get().completeCurrentHatim();
        } else {
          set({ currentSession: { ...currentSession } });
        }
      },

      completeCurrentHatim: () => {
        const { currentSession, completedSessions, stats } = get();
        if (!currentSession) return;

        const completedSession: HatimSession = {
          ...currentSession,
          completed: true,
          completedAt: new Date().toISOString(),
          endDate: new Date().toISOString(),
        };

        const newCompletedSessions = [...completedSessions, completedSession];
        
        // Update stats
        const completionDays = daysBetween(
          new Date(completedSession.startDate),
          new Date(completedSession.completedAt!)
        );

        const newStats: HatimStats = {
          totalCompleted: stats.totalCompleted + 1,
          currentStreak: stats.currentStreak + 1,
          longestStreak: Math.max(stats.longestStreak, stats.currentStreak + 1),
          averageCompletionDays: newCompletedSessions.length > 0 
            ? newCompletedSessions.reduce((sum, session) => {
                if (session.completed && session.endDate) {
                  return sum + daysBetween(new Date(session.startDate), new Date(session.endDate));
                }
                return sum;
              }, 0) / newCompletedSessions.length
            : 0,
          lastCompletedDate: completedSession.completedAt,
        };

        set({
          currentSession: null,
          completedSessions: newCompletedSessions,
          stats: newStats,
        });

        logger.log('Hatim completed:', completedSession);
      },

      resetCurrentHatim: () => {
        set({ currentSession: null });
      },

      getProgressPercentage: (): number => {
        const { currentSession } = get();
        if (!currentSession) return 0;

        const completedSurahs = currentSession.progress.filter(p => p.completed).length;
        return (completedSurahs / 114) * 100;
      },

      getDailyProgress: (): number => {
        const { currentSession } = get();
        if (!currentSession) return 0;

        const startDate = new Date(currentSession.startDate);
        const today = new Date();
        const daysPassed = daysBetween(startDate, today) + 1;
        
        const expectedProgress = (daysPassed / currentSession.targetDays) * 100;
        const actualProgress = get().getProgressPercentage();
        
        return actualProgress - expectedProgress;
      },

      getTimeRemaining: (): number => {
        const { currentSession } = get();
        if (!currentSession) return 0;

        const startDate = new Date(currentSession.startDate);
        const targetEndDate = new Date(startDate.getTime() + (currentSession.targetDays * 24 * 60 * 60 * 1000));
        const today = new Date();
        
        return Math.max(0, daysBetween(today, targetEndDate));
      },

      isOnTrack: (): boolean => {
        return get().getDailyProgress() >= 0;
      },
    }),
    {
      name: 'hatim-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
