import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';
import { useTranslation } from 'react-i18next';
import CustomHeader from '../components/common/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

import { usePrayerTimesStore } from '../store/usePrayerTimesStore';
import { useThemeStore } from '../store/useThemeStore';

// Calculation methods
const CALCULATION_METHODS = [
  { id: 1, name: 'Muslim World League' },
  { id: 2, name: 'Islamic Society of North America (ISNA)' },
  { id: 3, name: 'Egyptian General Authority of Survey' },
  { id: 4, name: 'Umm Al-Qura University, Makkah' },
  { id: 5, name: 'University of Islamic Sciences, Karachi' },
  { id: 7, name: 'Institute of Geophysics, University of Tehran' },
  { id: 8, name: 'Gulf Region' },
  { id: 9, name: 'Kuwait' },
  { id: 10, name: 'Qatar' },
  { id: 11, name: 'Majlis Ugama Islam Singapura, Singapore' },
  { id: 12, name: 'Union Organization Islamic de France' },
  { id: 13, name: 'Diyanet İşleri Başkanlığı, Turkey' },
  { id: 14, name: 'Spiritual Administration of Muslims of Russia' },
];

export const PrayerSettingsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { calculationMethod, setCalculationMethod, location, fetchPrayerTimesForToday } = usePrayerTimesStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  const [isRefreshingLocation, setIsRefreshingLocation] = useState(false);
  
  const handleMethodSelect = (methodId: number) => {
    setCalculationMethod(methodId);
  };
  
  const handleRefreshLocation = async () => {
    setIsRefreshingLocation(true);
    
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to get accurate prayer times.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      // Fetch prayer times which will also update location
      await fetchPrayerTimesForToday();
      
      Alert.alert(
        'Success',
        'Location updated successfully',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to update location',
        [{ text: 'OK' }]
      );
    } finally {
      setIsRefreshingLocation(false);
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <CustomHeader title={t('prayer_calculation_method')} />
      
      <ScrollView style={styles.content}>
        <View style={[styles.sectionCard, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{t('prayer_location')}</Text>
          
          {location ? (
            <Text style={[styles.locationText, { color: theme.textColor }]}>
              {location.city || 'Unknown'}{location.country ? `, ${location.country}` : ''}
            </Text>
          ) : (
            <Text style={[styles.locationText, { color: theme.textColor }]}>
              Location not available
            </Text>
          )}
          
          <TouchableOpacity 
            style={[styles.refreshButton, { backgroundColor: theme.primaryColor }]}
            onPress={handleRefreshLocation}
            disabled={isRefreshingLocation}
          >
            <Text style={styles.refreshButtonText}>
              {isRefreshingLocation ? t('loading') : t('refresh')}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.sectionCard, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{t('prayer_calculation_method')}</Text>
          
          {CALCULATION_METHODS.map((method, index) => (
            <TouchableOpacity
              key={`method_${method.id}_${index}`}
              style={[
                styles.methodItem,
                calculationMethod === method.id && { backgroundColor: theme.primaryColor + '30' }
              ]}
              onPress={() => handleMethodSelect(method.id)}
            >
              <Text 
                style={[
                  styles.methodName, 
                  { 
                    color: calculationMethod === method.id ? theme.primaryColor : theme.textColor,
                    fontWeight: calculationMethod === method.id ? 'bold' : 'normal',
                  }
                ]}
              >
                {method.name}
              </Text>
              
              {calculationMethod === method.id && (
                <View style={[styles.selectedIndicator, { backgroundColor: theme.primaryColor }]} />
              )}
            </TouchableOpacity>
          ))}
        </View>
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
  sectionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 16,
  },
  refreshButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  methodName: {
    fontSize: 16,
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default PrayerSettingsScreen;
