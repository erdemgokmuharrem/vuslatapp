import { create } from 'zustand';
import { Audio, AVPlaybackStatus } from 'expo-av';
import logger from '../utils/logger';

export type AudioType = 'quran' | 'dua' | 'surah';

interface AudioItem {
    id: string;
    title: string;
    subtitle?: string;
    audioUrl: string;
    type: AudioType;
}

interface AudioState {
    currentAudio: AudioItem | null;
    sound: Audio.Sound | null;
    isPlaying: boolean;
    isLoading: boolean;
    duration: number;
    position: number;
    error: string | null;

    playAudio: (item: AudioItem) => Promise<void>;
    pauseAudio: () => Promise<void>;
    resumeAudio: () => Promise<void>;
    stopAudio: () => Promise<void>;
    seekTo: (position: number) => Promise<void>;
    setPosition: (position: number) => void;
    setDuration: (duration: number) => void;
    cleanup: () => Promise<void>;
}

// ─── Audio mode initialised once (not per-play call) ─────────────────────────
let audioModeReady = false;
const ensureAudioMode = async () => {
    if (audioModeReady) return;
    await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
    });
    audioModeReady = true;
};

// ─── Generation counter – prevents overlapping loads ─────────────────────────
let playGeneration = 0;

// ─── Background unload – never blocks the caller ─────────────────────────────
const unloadInBackground = (sound: Audio.Sound) => {
    sound.stopAsync()
        .then(() => sound.unloadAsync())
        .catch(() => { /* already unloaded – ignore */ });
};

export const useAudioStore = create<AudioState>((set, get) => ({
    currentAudio: null,
    sound: null,
    isPlaying: false,
    isLoading: false,
    duration: 0,
    position: 0,
    error: null,

    playAudio: async (item: AudioItem) => {
        const myGeneration = ++playGeneration;

        // ① Take stale sound out of state immediately (UI updates at once),
        //    then unload it in the background – no await here.
        const staleSound = get().sound;
        if (staleSound) {
            set({ sound: null, isPlaying: false, position: 0 });
            unloadInBackground(staleSound); // fire-and-forget
        }

        set({ isLoading: true, error: null, currentAudio: item });

        try {
            // ② Audio mode is a one-time setup; subsequent calls are instant.
            await ensureAudioMode();
            if (myGeneration !== playGeneration) return;

            // ③ Load sound with shouldPlay:false so we control the start moment.
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: item.audioUrl },
                { shouldPlay: false, progressUpdateIntervalMillis: 500 },
                (status: AVPlaybackStatus) => {
                    if (myGeneration !== playGeneration) return;
                    if (status.isLoaded) {
                        set({
                            position: status.positionMillis,
                            duration: status.durationMillis || 0,
                            isPlaying: status.isPlaying,
                        });
                        if (status.didJustFinish) {
                            set({ isPlaying: false, position: 0 });
                        }
                    }
                }
            );

            if (myGeneration !== playGeneration) {
                unloadInBackground(newSound);
                return;
            }

            // ④ Register sound in state first, then start playback.
            //    This way the UI already knows about the sound object before audio begins.
            set({ sound: newSound, isLoading: false });
            await newSound.playAsync();

            if (myGeneration !== playGeneration) return;
            set({ isPlaying: true });
            logger.log('Audio started:', item.title);

        } catch (error) {
            if (myGeneration !== playGeneration) return;
            logger.error('Error playing audio:', error);
            set({ isLoading: false, error: 'Ses dosyası yüklenemedi', currentAudio: null });
        }
    },

    pauseAudio: async () => {
        const { sound } = get();
        if (!sound) return;
        // Optimistic UI update – button state flips instantly before async completes
        set({ isPlaying: false });
        try {
            await sound.pauseAsync();
        } catch {
            set({ isPlaying: true }); // revert on error
        }
    },

    resumeAudio: async () => {
        const { sound } = get();
        if (!sound) return;
        set({ isPlaying: true });
        try {
            await sound.playAsync();
        } catch {
            set({ isPlaying: false });
        }
    },

    stopAudio: async () => {
        const { cleanup } = get();
        await cleanup();
    },

    seekTo: async (position: number) => {
        const { sound } = get();
        if (!sound) return;
        set({ position }); // optimistic – scrubber moves immediately
        try {
            await sound.setPositionAsync(position);
        } catch (error) {
            logger.error('Error seeking audio:', error);
        }
    },

    setPosition: (position) => set({ position }),
    setDuration: (duration) => set({ duration }),

    cleanup: async () => {
        playGeneration++; // cancel any in-flight playAudio call
        const { sound } = get();
        // Clear state instantly so UI responds right away
        set({ sound: null, isPlaying: false, position: 0, duration: 0, currentAudio: null, error: null });
        if (sound) unloadInBackground(sound); // don't block cleanup
    },
}));
