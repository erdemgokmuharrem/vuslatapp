import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { useThemeStore } from '../store/useThemeStore';
import CustomHeader from '../components/common/CustomHeader';
import IslamicBackground from '../components/common/IslamicBackground';

type DailyWorshipScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

interface QuickAction {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  screen: keyof RootStackParamList;
}

export const DailyWorshipScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<DailyWorshipScreenNavigationProp>();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();

  // Ana menü (Hızlı erişim) butonları
  const quickActions: QuickAction[] = [
    { id: 'guide', title: t('quick_guide'), icon: 'compass', color: '#4CAF50', screen: 'Guide' },
    { id: 'qibla', title: t('quick_qibla'), icon: 'navigate', color: '#2196F3', screen: 'Qibla' },
    { id: 'hatim', title: t('quick_hatim'), icon: 'book', color: '#9C27B0', screen: 'HatimTracker' },
    { id: 'reminders', title: t('quick_reminders'), icon: 'notifications', color: '#FF9800', screen: 'Reminders' },
    { id: 'settings', title: t('quick_settings'), icon: 'settings', color: '#607D8B', screen: 'Settings' },
    { id: 'profile', title: t('quick_profile'), icon: 'person', color: '#E91E63', screen: 'Profile' },
  ];

  const handleActionPress = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen as any);
  };

  const renderActionCard = (action: QuickAction) => (
    <TouchableOpacity
      key={action.id}
      style={[
        styles.actionCard,
        { backgroundColor: theme.cardBackgroundColor }
      ]}
      onPress={() => handleActionPress(action.screen)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: action.color + '20' }]}>
        <Ionicons name={action.icon} size={36} color={action.color} />
      </View>
      <Text style={[styles.actionTitle, { color: theme.textColor }]} numberOfLines={2}>
        {action.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <IslamicBackground>
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        <CustomHeader
          title={t('tab_worship')}
          transparent
        />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.gridContainer}>
            {quickActions.map(renderActionCard)}
          </View>
          
          {/* Alt boşluk */}
          <View style={{ height: 80 }} />
        </ScrollView>
      </View>
    </IslamicBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 24,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 48) / 2, // 2 sütun: sağ/sol 16 padding, ortada 16 boşluk = 48
    aspectRatio: 1.1, // Kareye yakın şık bir dikdörtgen görünüm
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DailyWorshipScreen;
