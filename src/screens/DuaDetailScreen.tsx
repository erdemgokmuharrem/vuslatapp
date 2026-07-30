import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { useThemeStore } from '../store/useThemeStore';
import { useDuaStore } from '../store/useDuaStore';
import { useAudioStore } from '../store/useAudioStore';
import { getDuaById } from '../data/duaData';
import CustomHeader from '../components/common/CustomHeader';
import IslamicBackground from '../components/common/IslamicBackground';

type DuaDetailScreenRouteProp = RouteProp<RootStackParamList, 'DuaDetail'>;
type DuaDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const DuaDetailScreen = () => {
  const { t } = useTranslation();
  const route = useRoute<DuaDetailScreenRouteProp>();
  const navigation = useNavigation<DuaDetailScreenNavigationProp>();
  const { getThemeObject } = useThemeStore();
  const { toggleFavorite, isFavorite } = useDuaStore();
  const { playAudio, isPlaying, currentAudio, pauseAudio, resumeAudio } = useAudioStore();
  const theme = getThemeObject();

  const { duaId } = route.params;
  const dua = getDuaById(duaId);

  const handlePlayPause = async () => {
    if (!dua || !dua.audioUrl) return;

    const isCurrentlyPlaying = currentAudio?.id === dua.id && isPlaying;

    if (isCurrentlyPlaying) {
      await pauseAudio();
    } else if (currentAudio?.id === dua.id && !isPlaying) {
      await resumeAudio();
    } else {
      await playAudio({
        id: dua.id,
        title: dua.nameTr || dua.name,
        subtitle: dua.category,
        audioUrl: dua.audioUrl,
        type: 'dua',
      });
    }
  };

  const isCurrentlyPlaying = dua && currentAudio?.id === dua.id && isPlaying;

  if (!dua) {
    return (
      <IslamicBackground>
        <View style={[styles.container, { backgroundColor: 'transparent' }]}>
          <CustomHeader
            title={t('dua_detail') || 'Dua Detayı'}
            showBackButton
            transparent
          />
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={64} color={theme.textColor + '40'} />
            <Text style={[styles.errorText, { color: theme.textColor }]}>
              {t('dua_not_found') || 'Dua bulunamadı'}
            </Text>
          </View>
        </View>
      </IslamicBackground>
    );
  }

  const isFav = isFavorite(dua.id);

  return (
    <IslamicBackground>
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        <CustomHeader
          title={dua.nameTr || dua.name}
          showBackButton
          rightActions={[
            {
              icon: isFav ? 'heart' : 'heart-outline',
              onPress: () => toggleFavorite(dua.id)
            },
          ]}
          transparent
        />

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Category Badge */}
          <View style={[styles.categoryBadge, { backgroundColor: theme.primaryColor + '20' }]}>
            <Text style={[styles.categoryText, { color: theme.primaryColor }]}>
              {dua.category}
            </Text>
          </View>

          {/* Arabic Text */}
          {dua.arabic && (
            <View style={[styles.section, { backgroundColor: theme.cardBackgroundColor }]}>
              <Text style={[styles.sectionLabel, { color: theme.textColor + '60' }]}>
                Arapça
              </Text>
              <Text style={[styles.arabicText, { color: theme.primaryColor }]}>
                {dua.arabic}
              </Text>
            </View>
          )}

          {/* Transliteration - Latin Okunuş */}
          {(dua.transliterationTr || dua.transliteration) && (
            <View style={[styles.section, { backgroundColor: theme.cardBackgroundColor }]}>
              <Text style={[styles.sectionLabel, { color: theme.textColor + '60' }]}>
                Okunuşu
              </Text>
              <Text style={[styles.transliterationText, { color: theme.textColor }]}>
                {dua.transliterationTr || dua.transliteration}
              </Text>
            </View>
          )}

          {/* Translation - Meal */}
          {(dua.translationTr || dua.translation) && (
            <View style={[styles.section, { backgroundColor: theme.cardBackgroundColor }]}>
              <Text style={[styles.sectionLabel, { color: theme.textColor + '60' }]}>
                Meali
              </Text>
              <Text style={[styles.translationText, { color: theme.textColor }]}>
                {dua.translationTr || dua.translation}
              </Text>
            </View>
          )}

          {/* Reference */}
          {dua.reference && (
            <View style={styles.referenceContainer}>
              <Ionicons name="book-outline" size={16} color={theme.textColor + '60'} />
              <Text style={[styles.referenceText, { color: theme.textColor + '60' }]}>
                Kaynak: {dua.reference}
              </Text>
            </View>
          )}

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Bottom Actions */}
        <View style={[styles.bottomActions, { backgroundColor: theme.cardBackgroundColor }]}>
          {/* Share Button */}
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={24} color={theme.textColor + '80'} />
            <Text style={[styles.actionLabel, { color: theme.textColor + '60' }]}>Paylaş</Text>
          </TouchableOpacity>

          {/* Play Button - Only if has audio */}
          {dua.audioUrl && (
            <TouchableOpacity
              style={[styles.playMainButton, { backgroundColor: theme.primaryColor }]}
              onPress={handlePlayPause}
            >
              <Ionicons
                name={isCurrentlyPlaying ? "pause" : "play"}
                size={32}
                color="white"
              />
            </TouchableOpacity>
          )}

          {/* Copy Button */}
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="copy-outline" size={24} color={theme.textColor + '80'} />
            <Text style={[styles.actionLabel, { color: theme.textColor + '60' }]}>Kopyala</Text>
          </TouchableOpacity>
        </View>
      </View>
    </IslamicBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingTop: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  section: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  arabicText: {
    fontSize: 24,
    lineHeight: 44,
    textAlign: 'right',
    fontWeight: '500',
  },
  transliterationText: {
    fontSize: 17,
    lineHeight: 28,
    fontStyle: 'italic',
  },
  translationText: {
    fontSize: 16,
    lineHeight: 26,
  },
  referenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  referenceText: {
    fontSize: 13,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    paddingBottom: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  actionLabel: {
    fontSize: 11,
    marginTop: 4,
  },
  playMainButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default DuaDetailScreen;
