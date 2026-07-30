import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { useHatimStore } from '../store/useHatimStore';
import { useThemeStore } from '../store/useThemeStore';
import { globalStyles, SPACING, BORDER_RADIUS } from '../styles/globalStyles';

type HatimTrackerScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HatimTrackerScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<HatimTrackerScreenNavigationProp>();
  const {
    currentSession,
    completedSessions,
    stats,
    startNewHatim,
    completeCurrentHatim,
    resetCurrentHatim,
    getProgressPercentage,
    getDailyProgress,
    getTimeRemaining,
    isOnTrack,
  } = useHatimStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();

  const [showNewHatimModal, setShowNewHatimModal] = useState(false);
  const [targetDays, setTargetDays] = useState('30');

  const progressPercentage = getProgressPercentage();
  const dailyProgress = getDailyProgress();
  const timeRemaining = getTimeRemaining();
  const onTrack = isOnTrack();

  const handleStartNewHatim = useCallback(() => {
    const days = parseInt(targetDays);
    if (isNaN(days) || days < 1 || days > 365) {
      Alert.alert('Hata', 'Lütfen 1-365 arasında geçerli bir gün sayısı girin.');
      return;
    }

    if (currentSession && !currentSession.completed) {
      Alert.alert(
        'Mevcut Hatim',
        'Devam eden bir hatim var. Yeni hatim başlatmak için mevcut hatimi sıfırlamak ister misiniz?',
        [
          { text: 'İptal', style: 'cancel' },
          {
            text: 'Sıfırla ve Başlat',
            style: 'destructive',
            onPress: () => {
              resetCurrentHatim();
              startNewHatim(days);
              setShowNewHatimModal(false);
            },
          },
        ]
      );
    } else {
      startNewHatim(days);
      setShowNewHatimModal(false);
    }
  }, [targetDays, currentSession, startNewHatim, resetCurrentHatim]);

  const handleCompleteHatim = useCallback(() => {
    Alert.alert(
      'Hatim Tamamlandı',
      'Hatimi tamamladığınızı onaylıyor musunuz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Tamamla',
          style: 'default',
          onPress: completeCurrentHatim,
        },
      ]
    );
  }, [completeCurrentHatim]);

  const renderProgressCard = () => (
    <View style={[styles.card, { backgroundColor: theme.cardBackgroundColor }]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: theme.textColor }]}>
          Mevcut Hatim
        </Text>
        {currentSession && (
          <TouchableOpacity
            onPress={() => navigation.navigate('QuranReader', { surahId: 1 })}
            style={[styles.readButton, { backgroundColor: theme.primaryColor }]}
          >
            <Text style={styles.readButtonText}>Oku</Text>
          </TouchableOpacity>
        )}
      </View>

      {currentSession ? (
        <>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: theme.borderColor }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: theme.primaryColor,
                    width: `${progressPercentage}%`,
                  },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: theme.textColor }]}>
              %{Math.round(progressPercentage)} tamamlandı
            </Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primaryColor }]}>
                {Math.round(progressPercentage)}%
              </Text>
              <Text style={[styles.statLabel, { color: theme.textColor }]}>
                İlerleme
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: onTrack ? theme.primaryColor : theme.accentColor }]}>
                {timeRemaining}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textColor }]}>
                Kalan Gün
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: onTrack ? theme.primaryColor : '#EF4444' }]}>
                {dailyProgress > 0 ? '+' : ''}{Math.round(dailyProgress)}%
              </Text>
              <Text style={[styles.statLabel, { color: theme.textColor }]}>
                Hedef Farkı
              </Text>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={handleCompleteHatim}
              style={[styles.actionButton, { backgroundColor: theme.primaryColor }]}
            >
              <Ionicons name="checkmark-circle" size={20} color="white" />
              <Text style={styles.actionButtonText}>Tamamla</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Alert.alert(
                'Hatimi Sıfırla',
                'Mevcut hatimi sıfırlamak istediğinizden emin misiniz?',
                [
                  { text: 'İptal', style: 'cancel' },
                  { text: 'Sıfırla', style: 'destructive', onPress: resetCurrentHatim },
                ]
              )}
              style={[styles.actionButton, { backgroundColor: '#EF4444' }]}
            >
              <Ionicons name="refresh" size={20} color="white" />
              <Text style={styles.actionButtonText}>Sıfırla</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.noSessionContainer}>
          <Ionicons name="book-outline" size={64} color={theme.textColor + '40'} />
          <Text style={[styles.noSessionText, { color: theme.textColor }]}>
            Aktif hatim bulunmuyor
          </Text>
          <TouchableOpacity
            onPress={() => setShowNewHatimModal(true)}
            style={[styles.startButton, { backgroundColor: theme.primaryColor }]}
          >
            <Text style={styles.startButtonText}>Yeni Hatim Başlat</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderStatsCard = () => (
    <View style={[styles.card, { backgroundColor: theme.cardBackgroundColor }]}>
      <Text style={[styles.cardTitle, { color: theme.textColor }]}>
        İstatistikler
      </Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statGridItem}>
          <Text style={[styles.statGridValue, { color: theme.primaryColor }]}>
            {stats.totalCompleted}
          </Text>
          <Text style={[styles.statGridLabel, { color: theme.textColor }]}>
            Tamamlanan
          </Text>
        </View>
        <View style={styles.statGridItem}>
          <Text style={[styles.statGridValue, { color: theme.primaryColor }]}>
            {stats.currentStreak}
          </Text>
          <Text style={[styles.statGridLabel, { color: theme.textColor }]}>
            Mevcut Seri
          </Text>
        </View>
        <View style={styles.statGridItem}>
          <Text style={[styles.statGridValue, { color: theme.primaryColor }]}>
            {stats.longestStreak}
          </Text>
          <Text style={[styles.statGridLabel, { color: theme.textColor }]}>
            En Uzun Seri
          </Text>
        </View>
        <View style={styles.statGridItem}>
          <Text style={[styles.statGridValue, { color: theme.primaryColor }]}>
            {Math.round(stats.averageCompletionDays)}
          </Text>
          <Text style={[styles.statGridLabel, { color: theme.textColor }]}>
            Ortalama Gün
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.primaryColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.textColor }]}>
          Hatim Takibi
        </Text>
        <TouchableOpacity onPress={() => setShowNewHatimModal(true)}>
          <Ionicons name="add" size={24} color={theme.primaryColor} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderProgressCard()}
        {renderStatsCard()}
      </ScrollView>

      {/* New Hatim Modal */}
      <Modal
        visible={showNewHatimModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNewHatimModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackgroundColor }]}>
            <Text style={[styles.modalTitle, { color: theme.textColor }]}>
              Yeni Hatim Başlat
            </Text>
            
            <Text style={[styles.modalLabel, { color: theme.textColor }]}>
              Hedef gün sayısı:
            </Text>
            <TextInput
              style={[
                styles.modalInput,
                {
                  backgroundColor: theme.backgroundColor,
                  color: theme.textColor,
                  borderColor: theme.borderColor,
                },
              ]}
              value={targetDays}
              onChangeText={setTargetDays}
              keyboardType="numeric"
              placeholder="30"
              placeholderTextColor={theme.textColor + '60'}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setShowNewHatimModal(false)}
                style={[styles.modalButton, { backgroundColor: theme.borderColor }]}
              >
                <Text style={[styles.modalButtonText, { color: theme.textColor }]}>
                  İptal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleStartNewHatim}
                style={[styles.modalButton, { backgroundColor: theme.primaryColor }]}
              >
                <Text style={styles.modalButtonText}>Başlat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: 50,
    paddingBottom: SPACING.md,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  card: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  readButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  readButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: SPACING.md,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
  noSessionContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  noSessionText: {
    fontSize: 16,
    marginVertical: SPACING.md,
  },
  startButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  startButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statGridItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  statGridValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  statGridLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: SPACING.sm,
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: 16,
    marginBottom: SPACING.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 0.48,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default HatimTrackerScreen;
