import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAudioStore } from '../../store/useAudioStore';
import { useThemeStore } from '../../store/useThemeStore';

const { width } = Dimensions.get('window');

const GlobalAudioPlayer: React.FC = () => {
    const {
        currentAudio,
        isPlaying,
        isLoading,
        position,
        duration,
        pauseAudio,
        resumeAudio,
        stopAudio
    } = useAudioStore();
    const { getThemeObject } = useThemeStore();
    const theme = getThemeObject();
    const insets = useSafeAreaInsets();

    const slideAnim = React.useRef(new Animated.Value(100)).current;

    useEffect(() => {
        Animated.spring(slideAnim, {
            toValue: currentAudio ? 0 : 100,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
        }).start();
    }, [currentAudio]);

    if (!currentAudio) return null;

    const formatTime = (millis: number) => {
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progressPercent = duration > 0 ? (position / duration) * 100 : 0;

    const handlePlayPause = () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            resumeAudio();
        }
    };

    const getTypeIcon = () => {
        switch (currentAudio.type) {
            case 'quran':
                return 'book';
            case 'dua':
                return 'heart';
            case 'surah':
                return 'musical-notes';
            default:
                return 'play';
        }
    };

    const getTypeLabel = () => {
        switch (currentAudio.type) {
            case 'quran':
                return 'Kuran';
            case 'dua':
                return 'Dua';
            case 'surah':
                return 'Sure';
            default:
                return '';
        }
    };

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: theme.primaryColor,
                    paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
                    transform: [{ translateY: slideAnim }]
                }
            ]}
        >
            {/* Progress bar */}
            <View style={styles.progressContainer}>
                <View
                    style={[
                        styles.progressBar,
                        { width: `${progressPercent}%`, backgroundColor: 'rgba(255,255,255,0.8)' }
                    ]}
                />
            </View>

            <View style={styles.content}>
                {/* Type indicator */}
                <View style={styles.typeIndicator}>
                    <Ionicons name={getTypeIcon()} size={20} color="white" />
                </View>

                {/* Info */}
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>
                        {currentAudio.title}
                    </Text>
                    <Text style={styles.subtitle} numberOfLines={1}>
                        {currentAudio.subtitle || getTypeLabel()} • {formatTime(position)} / {formatTime(duration)}
                    </Text>
                </View>

                {/* Controls */}
                <View style={styles.controls}>
                    {isLoading ? (
                        <View style={styles.loadingContainer}>
                            <Text style={styles.loadingText}>...</Text>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.playButton}
                            onPress={handlePlayPause}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons
                                name={isPlaying ? 'pause' : 'play'}
                                size={28}
                                color="white"
                            />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={stopAudio}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Ionicons name="close" size={24} color="rgba(255,255,255,0.8)" />
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    progressContainer: {
        height: 3,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    progressBar: {
        height: '100%',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    typeIndicator: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    title: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
    subtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    loadingContainer: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: 'white',
        fontSize: 18,
    },
    playButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GlobalAudioPlayer;
