import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { RootStackParamList } from '../navigation/types';
import { useThemeStore } from '../store/useThemeStore';
import { useFontSizeStore } from '../store/useFontSizeStore';
import CustomHeader from '../components/common/CustomHeader';
import IslamicBackground from '../components/common/IslamicBackground';

type GuideScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface GuideItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: keyof typeof Ionicons.glyphMap;
  screen: keyof RootStackParamList;
  color: string;
}

export const GuideScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<GuideScreenNavigationProp>();
  const { getThemeObject } = useThemeStore();
  const { scaledSize } = useFontSizeStore();
  const theme = getThemeObject();

  const guideItems: GuideItem[] = [
    {
      id: 'salawat',
      titleKey: 'salawat_guide',
      descriptionKey: 'salawat_guide_desc',
      icon: 'heart',
      screen: 'SalawatGuide',
      color: '#E91E63',
    },
    {
      id: 'asma_ul_husna',
      titleKey: 'asma_ul_husna',
      descriptionKey: 'asma_ul_husna_subtitle',
      icon: 'star',
      screen: 'AsmaUlHusna',
      color: '#9C27B0',
    },
    {
      id: 'forty_hadith',
      titleKey: 'forty_hadith',
      descriptionKey: 'forty_hadith_subtitle',
      icon: 'document-text',
      screen: 'FortyHadith',
      color: '#673AB7',
    },
    {
      id: 'prayer_turkish',
      titleKey: 'prayer_turkish',
      descriptionKey: 'prayer_turkish_desc',
      icon: 'book',
      screen: 'PrayerTurkish',
      color: '#2196F3',
    },
    {
      id: 'wudu_guide',
      titleKey: 'wudu_guide',
      descriptionKey: 'wudu_guide_subtitle',
      icon: 'water',
      screen: 'WuduGuide',
      color: '#00BCD4',
    },
    {
      id: 'thirty_two_fard',
      titleKey: 'thirty_two_fard',
      descriptionKey: 'thirty_two_fard_subtitle',
      icon: 'list',
      screen: 'ThirtyTwoFard',
      color: '#009688',
    },
    {
      id: 'prophets_history',
      titleKey: 'prophets_history',
      descriptionKey: 'prophets_history_subtitle',
      icon: 'time',
      screen: 'ProphetsHistory',
      color: '#4CAF50',
    },
    {
      id: 'beautiful_duas',
      titleKey: 'beautiful_duas',
      descriptionKey: 'beautiful_duas_subtitle',
      icon: 'flower',
      screen: 'BeautifulDuas',
      color: '#FF9800',
    },
    {
      id: 'nearby_mosques',
      titleKey: 'nearby_mosques',
      descriptionKey: 'nearby_mosques_desc',
      icon: 'business',
      screen: 'NearbyMosques',
      color: '#795548',
    },
    {
      id: 'nearby_tombs',
      titleKey: 'nearby_tombs',
      descriptionKey: 'nearby_tombs_desc',
      icon: 'home',
      screen: 'NearbyTombs',
      color: '#607D8B',
    },
  ];

  const handleItemPress = (item: GuideItem) => {
    navigation.navigate(item.screen as any);
  };

  const renderGuideItem = (item: GuideItem) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.guideItem, { backgroundColor: theme.cardBackgroundColor }]}
      onPress={() => handleItemPress(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.itemIcon, { backgroundColor: item.color + '20' }]}>
        <Ionicons
          name={item.icon}
          size={28}
          color={item.color}
        />
      </View>
      <View style={styles.itemContent}>
        <Text style={[styles.itemTitle, { color: theme.textColor, fontSize: scaledSize(17) }]}>
          {t(item.titleKey)}
        </Text>
        <Text style={[styles.itemDescription, { color: theme.textColor + '80', fontSize: scaledSize(14) }]}>
          {t(item.descriptionKey)}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={theme.textColor + '40'}
      />
    </TouchableOpacity>
  );

  return (
    <IslamicBackground>
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        <CustomHeader
          title={t('guide_title')}
          showBackButton
          subtitle={t('guide_subtitle')}
          transparent
        />

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.itemsContainer}>
            {guideItems.map(renderGuideItem)}
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>
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
  itemsContainer: {
    paddingTop: 8,
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  itemIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDescription: {
    lineHeight: 20,
  },
});

export default GuideScreen;
