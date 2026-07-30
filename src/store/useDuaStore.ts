import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import logger from '../utils/logger';

import { Dua, getDuaById, duaCategories, popularDuas, popularSurahs } from '../data/duaData';

interface DuaState {
  currentDua: Dua | null;
  favorites: string[];
  recentlyPlayed: string[];
  isPlaying: boolean;
  sound: Audio.Sound | null;
  isLoading: boolean;
  error: string | null;
  repeatMode: 'none' | 'single' | 'all';
  playbackPosition: number;
  playbackDuration: number;
  
  // Actions
  setCurrentDua: (duaId: string) => void;
  playDua: (duaId: string) => Promise<void>;
  pauseDua: () => Promise<void>;
  resumeDua: () => Promise<void>;
  stopDua: () => Promise<void>;
  toggleFavorite: (duaId: string) => void;
  isFavorite: (duaId: string) => boolean;
  addToRecentlyPlayed: (duaId: string) => void;
  setRepeatMode: (mode: 'none' | 'single' | 'all') => void;
  updatePlaybackStatus: (position: number, duration: number) => void;
  seekTo: (position: number) => Promise<void>;
}

export const useDuaStore = create<DuaState>()(
  persist(
    (set, get) => ({
      currentDua: null,
      favorites: [],
      recentlyPlayed: [],
      isPlaying: false,
      sound: null,
      isLoading: false,
      error: null,
      repeatMode: 'none',
      playbackPosition: 0,
      playbackDuration: 0,
      
      setCurrentDua: (duaId: string) => {
        const dua = getDuaById(duaId);
        if (dua) {
          set({ currentDua: dua });
        }
      },
      
      playDua: async (duaId: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Stop current sound if playing
          const { sound: currentSound } = get();
          if (currentSound) {
            try {
              if (typeof currentSound.stopAsync === 'function') {
                await currentSound.stopAsync();
              }
              if (typeof currentSound.unloadAsync === 'function') {
                await currentSound.unloadAsync();
              }
            } catch (stopError) {
              logger.error('Error stopping current sound:', stopError);
            }
            set({ sound: null, isPlaying: false });
          }
          
          // Find the dua
          const allDuas = [...popularDuas, ...popularSurahs];
          const dua = allDuas.find(d => d.id === duaId);
          
          if (!dua) {
            logger.error('Dua not found:', duaId);
            set({ isLoading: false, error: 'Dua bulunamadı' });
            return;
          }
          
          // Set as current dua
          set({ currentDua: dua });
          
          // Check if audio URL exists
          if (!dua.audioUrl) {
            logger.warn('No audio URL for dua:', duaId);
            set({ isLoading: false, error: 'Bu dua için ses dosyası bulunmuyor' });
            return;
          }
          
          // Configure audio mode
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
          });
          
          // Load and create sound
          const soundResult = await Audio.Sound.createAsync(
            { uri: dua.audioUrl },
            { shouldPlay: false, isLooping: false },
            (status) => {
              if (status.isLoaded) {
                get().updatePlaybackStatus(
                  status.positionMillis || 0,
                  status.durationMillis || 0
                );
                
                // Handle playback completion
                if (status.didJustFinish) {
                  const { repeatMode } = get();
                  
                  if (repeatMode === 'single') {
                    // Replay the same dua
                    const { sound: currentSound } = get();
                    if (currentSound && typeof currentSound.replayAsync === 'function') {
                      currentSound.replayAsync().catch(error => 
                        logger.error('Error replaying audio:', error)
                      );
                    }
                  } else if (repeatMode === 'all') {
                    // Find next dua to play
                    const allDuas = [...popularDuas, ...popularSurahs];
                    const currentIndex = allDuas.findIndex(d => d.id === duaId);
                    const nextIndex = (currentIndex + 1) % allDuas.length;
                    const nextDua = allDuas[nextIndex];
                    
                    if (nextDua) {
                      get().playDua(nextDua.id);
                    }
                  } else {
                    // No repeat, just stop
                    set({ isPlaying: false, sound: null });
                  }
                }
              }
            }
          );
          
          const newSound = soundResult.sound;
          
          // Validate sound object
          if (!newSound || typeof newSound.playAsync !== 'function') {
            throw new Error('Failed to create valid sound object');
          }
          
          // Start playing
          await newSound.playAsync();
          
          // Add to recently played
          get().addToRecentlyPlayed(duaId);
          
          set({ sound: newSound, isPlaying: true });
        } catch (error) {
          logger.error('Error playing dua:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Ses çalınamadı',
            isPlaying: false,
            sound: null
          });
        } finally {
          set({ isLoading: false });
        }
      },
      
      pauseDua: async () => {
        try {
          const { sound } = get();
          if (sound) {
            await sound.pauseAsync();
            set({ isPlaying: false });
          }
        } catch (error) {
          logger.error('Error pausing audio:', error);
        }
      },
      
      resumeDua: async () => {
        try {
          const { sound, currentDua } = get();
          
          // If no sound object or invalid, restart playback
          if (!sound || typeof sound.getStatusAsync !== 'function') {
            logger.warn('Sound object is null or invalid in resumeDua, restarting playback');
            if (currentDua) {
              return get().playDua(currentDua.id);
            } else {
              set({ isPlaying: false, sound: null });
              return;
            }
          }
          
          try {
            const status = await sound.getStatusAsync();
            if (status.isLoaded && !status.isPlaying) {
              await sound.playAsync();
              set({ isPlaying: true });
            } else if (!status.isLoaded) {
              // Sound not loaded, restart playback
              logger.warn('Sound not loaded in resumeDua, restarting playback');
              if (currentDua) {
                return get().playDua(currentDua.id);
              }
            }
          } catch (statusError) {
            logger.error('Error getting sound status, restarting playback:', statusError);
            // Fallback: restart playback
            if (currentDua) {
              return get().playDua(currentDua.id);
            }
          }
        } catch (error) {
          logger.error('Error resuming audio:', error);
          const { currentDua } = get();
          set({ isPlaying: false, sound: null });
          
          // Try to restart playback as last resort
          if (currentDua) {
            logger.log('Attempting to restart playback after resume error');
            return get().playDua(currentDua.id);
          }
        }
      },
      
      stopDua: async () => {
        try {
          const { sound } = get();
          if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            set({ sound: null, isPlaying: false, playbackPosition: 0 });
          }
        } catch (error) {
          logger.error('Error stopping audio:', error);
        }
      },
      
      toggleFavorite: (duaId: string) => {
        set((state) => {
          if (state.favorites.includes(duaId)) {
            // Remove from favorites
            return {
              favorites: state.favorites.filter(id => id !== duaId)
            };
          } else {
            // Add to favorites
            return {
              favorites: [...state.favorites, duaId]
            };
          }
        });
      },
      
      isFavorite: (duaId: string) => {
        return get().favorites.includes(duaId);
      },
      
      addToRecentlyPlayed: (duaId: string) => {
        set((state) => {
          // Remove if already exists to avoid duplicates
          const filtered = state.recentlyPlayed.filter(id => id !== duaId);
          
          // Add to the beginning of the array
          const updated = [duaId, ...filtered];
          
          // Keep only the last 10 items
          return {
            recentlyPlayed: updated.slice(0, 10)
          };
        });
      },
      
      setRepeatMode: (mode: 'none' | 'single' | 'all') => {
        set({ repeatMode: mode });
      },
      
      updatePlaybackStatus: (position: number, duration: number) => {
        set({ playbackPosition: position, playbackDuration: duration });
      },
      
      seekTo: async (position: number) => {
        try {
          const { sound } = get();
          if (sound) {
            await sound.setPositionAsync(position);
            set({ playbackPosition: position });
          }
        } catch (error) {
          logger.error('Error seeking audio:', error);
        }
      },
    }),
    {
      name: 'dua-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
