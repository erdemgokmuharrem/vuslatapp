import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import CustomHeader from '../components/common/CustomHeader';

import { useTasbihStore } from '../store/useTasbihStore';
import { useThemeStore } from '../store/useThemeStore';

export const TasbihStatsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { stats } = useTasbihStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  const lastUpdated = new Date(stats.lastUpdated);
  const formattedDate = `${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}`;
  
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <CustomHeader title={t('tasbih_stats')} />
      
      <ScrollView style={styles.content}>
        <Text style={[styles.lastUpdated, { color: theme.textColor }]}>
          {t('last_updated')}: {formattedDate}
        </Text>
        
        <View style={[styles.statCard, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.statTitle, { color: theme.textColor }]}>{t('tasbih_daily')}</Text>
          <Text style={[styles.statValue, { color: theme.primaryColor }]}>{stats.daily}</Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.statTitle, { color: theme.textColor }]}>{t('tasbih_weekly')}</Text>
          <Text style={[styles.statValue, { color: theme.primaryColor }]}>{stats.weekly}</Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.statTitle, { color: theme.textColor }]}>{t('tasbih_monthly')}</Text>
          <Text style={[styles.statValue, { color: theme.primaryColor }]}>{stats.monthly}</Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.statTitle, { color: theme.textColor }]}>{t('tasbih_total')}</Text>
          <Text style={[styles.statValue, { color: theme.primaryColor }]}>{stats.total}</Text>
        </View>
        
        {/* We could add charts or graphs here in the future */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  lastUpdated: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  statCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TasbihStatsScreen;
