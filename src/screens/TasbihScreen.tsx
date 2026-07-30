import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Dimensions, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import IslamicBackground from '../components/common/IslamicBackground';
import CustomHeader from '../components/common/CustomHeader';

import { RootStackParamList } from '../navigation/types';
import { useTasbihStore } from '../store/useTasbihStore';
import { useThemeStore } from '../store/useThemeStore';
import { useFontSizeStore } from '../store/useFontSizeStore';
import GoalInputModal from '../components/tasbih/GoalInputModal';
import AdBanner from '../components/common/AdBanner';

type TasbihScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');
const COUNTER_SIZE = width * 0.72;

export const TasbihScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<TasbihScreenNavigationProp>();
  const { count, goal, vibrationEnabled, soundEnabled, increment, decrement, reset, toggleVibration, toggleSound } = useTasbihStore();
  const { getThemeObject } = useThemeStore();
  const { scaledSize } = useFontSizeStore();
  const theme = getThemeObject();

  const [goalInputVisible, setGoalInputVisible] = useState(false);

  const handleIncrement = () => {
    increment();
    if (vibrationEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (goal && count + 1 === goal) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      decrement();
      if (vibrationEnabled) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  };

  const handleReset = () => {
    reset();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  };

  const handleGoalSubmit = (newGoal: number | null) => {
    useTasbihStore.getState().setGoal(newGoal);
    setGoalInputVisible(false);
  };

  const progressPercentage = goal ? Math.min((count / goal) * 100, 100) : 0;

  return (
    <IslamicBackground>
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        <CustomHeader
          title={t('tasbih_title')}
          rightActions={[
            { icon: 'stats-chart-outline', onPress: () => navigation.navigate('TasbihStats') },
          ]}
          transparent
        />

        {/* Hedef ilerleme çubuğu */}
        {goal && (
          <View style={styles.goalContainer}>
            <Text style={[styles.goalText, { color: theme.textColor, fontSize: scaledSize(16) }]}>
              {count} / {goal} ({progressPercentage.toFixed(0)}%)
            </Text>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${progressPercentage}%`, backgroundColor: theme.primaryColor }
                ]}
              />
            </View>
          </View>
        )}

        {/* Ana sayım butonu */}
        <TouchableOpacity
          style={[
            styles.counterButton,
            {
              width: COUNTER_SIZE,
              height: COUNTER_SIZE,
              backgroundColor: theme.cardBackgroundColor,
              borderColor: theme.primaryColor,
            }
          ]}
          onPress={handleIncrement}
          activeOpacity={0.75}
        >
          <View style={styles.counterInnerContainer}>
            <Text style={[styles.counterText, { color: theme.primaryColor, fontSize: scaledSize(80) }]}>{count}</Text>
            <Text style={[styles.counterSubText, { color: theme.textColor + '80', fontSize: scaledSize(15) }]}>
              {t('tasbih_tap_to_count')}
            </Text>
          </View>
        </TouchableOpacity>

        {/* +1 / -1 / Sıfırla / Hedef butonları */}
        <View style={styles.controlsRow}>
          {/* Geri al (-1) */}
          <TouchableOpacity
            style={[styles.secondaryButton, { backgroundColor: theme.cardBackgroundColor, borderColor: theme.primaryColor + '60' }]}
            onPress={handleDecrement}
            activeOpacity={0.8}
          >
            <Ionicons name="remove" size={22} color={theme.primaryColor} />
            <Text style={[styles.secondaryButtonText, { color: theme.primaryColor, fontSize: scaledSize(13) }]}>-1</Text>
          </TouchableOpacity>

          {/* Sıfırla */}
          <TouchableOpacity
            style={[styles.resetButton, { backgroundColor: theme.secondaryColor }]}
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <Ionicons name="refresh" size={20} color="white" />
            <Text style={[styles.resetButtonText, { fontSize: scaledSize(14) }]}>{t('tasbih_reset')}</Text>
          </TouchableOpacity>

          {/* Hedef belirle */}
          <TouchableOpacity
            style={[styles.secondaryButton, { backgroundColor: theme.primaryColor + '15', borderColor: theme.primaryColor + '60' }]}
            onPress={() => setGoalInputVisible(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="flag-outline" size={20} color={theme.primaryColor} />
            <Text style={[styles.secondaryButtonText, { color: theme.primaryColor, fontSize: scaledSize(13) }]}>
              {t('tasbih_custom_goal')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Titreşim & Ses ayarları */}
        <View style={[styles.settingsContainer, { backgroundColor: theme.cardBackgroundColor }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="phone-portrait-outline" size={20} color={theme.primaryColor} />
              <Text style={[styles.settingText, { color: theme.textColor, fontSize: scaledSize(15) }]}>
                {t('tasbih_vibration')}
              </Text>
            </View>
            <Switch
              value={vibrationEnabled}
              onValueChange={toggleVibration}
              trackColor={{ false: '#767577', true: theme.primaryColor }}
              thumbColor="#f4f3f4"
            />
          </View>

          <View style={[styles.settingRow, styles.settingRowLast]}>
            <View style={styles.settingLeft}>
              <Ionicons name="volume-medium-outline" size={20} color={theme.primaryColor} />
              <Text style={[styles.settingText, { color: theme.textColor, fontSize: scaledSize(15) }]}>
                {t('tasbih_sound')}
              </Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={toggleSound}
              trackColor={{ false: '#767577', true: theme.primaryColor }}
              thumbColor="#f4f3f4"
            />
          </View>
        </View>

        <GoalInputModal
          visible={goalInputVisible}
          currentGoal={goal}
          onClose={() => setGoalInputVisible(false)}
          onSubmit={handleGoalSubmit}
        />
        <AdBanner />
      </View>
    </IslamicBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  goalContainer: {
    width: '100%',
    marginBottom: 12,
    alignItems: 'center',
  },
  goalText: {
    marginBottom: 6,
    fontWeight: '600',
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  counterButton: {
    borderRadius: COUNTER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 18,
    borderWidth: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  counterInnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontWeight: 'bold',
  },
  counterSubText: {
    marginTop: 8,
    fontWeight: '500',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
    width: '100%',
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    gap: 4,
  },
  secondaryButtonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  resetButton: {
    flex: 1.2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 16,
    gap: 4,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  settingsContainer: {
    width: '100%',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 'auto',
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.15)',
  },
  settingRowLast: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingText: {
    fontWeight: '500',
  },
});

export default TasbihScreen;
