import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import { useThemeStore } from '../store/useThemeStore';
import IslamicBackground from '../components/common/IslamicBackground';

const { width } = Dimensions.get('window');
const COMPASS_SIZE = width * 0.7;

export const QiblaScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();

  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [magnetometerData, setMagnetometerData] = useState<number>(0);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Kabe koordinatları
  const KAABA_LAT = 21.4225;
  const KAABA_LNG = 39.8262;

  useEffect(() => {
    requestLocationPermission();
    startMagnetometer();

    return () => {
      Magnetometer.removeAllListeners();
    };
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError(t('location_permission_denied'));
        setIsLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      calculateQiblaDirection(currentLocation.coords.latitude, currentLocation.coords.longitude);
      setIsLoading(false);
    } catch (err) {
      setError(t('location_error'));
      setIsLoading(false);
    }
  };

  const calculateQiblaDirection = (userLat: number, userLng: number) => {
    const toRadians = (deg: number) => (deg * Math.PI) / 180;
    const toDegrees = (rad: number) => (rad * 180) / Math.PI;

    const dLng = toRadians(KAABA_LNG - userLng);
    const lat1 = toRadians(userLat);
    const lat2 = toRadians(KAABA_LAT);

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    let bearing = toDegrees(Math.atan2(y, x));
    bearing = (bearing + 360) % 360;

    setQiblaDirection(bearing);
  };

  const startMagnetometer = () => {
    Magnetometer.setUpdateInterval(100);
    Magnetometer.addListener((data) => {
      const { x, y } = data;
      let angle = Math.atan2(y, x) * (180 / Math.PI);
      angle = (angle + 360) % 360;
      setMagnetometerData(angle);
    });
  };

  const getRotation = () => {
    return qiblaDirection - magnetometerData;
  };

  if (isLoading) {
    return (
      <IslamicBackground>
        <SafeAreaView style={[styles.centerContainer, { backgroundColor: 'transparent' }]}>
          <ActivityIndicator size="large" color={theme.primaryColor} />
          <Text style={[styles.loadingText, { color: theme.textColor }]}>
            {t('qibla_loading')}
          </Text>
        </SafeAreaView>
      </IslamicBackground>
    );
  }

  if (error) {
    return (
      <IslamicBackground>
        <SafeAreaView style={[styles.centerContainer, { backgroundColor: 'transparent' }]}>
          <Text style={[styles.errorText, { color: theme.textColor }]}>{error}</Text>
        </SafeAreaView>
      </IslamicBackground>
    );
  }

  return (
    <IslamicBackground>
      <SafeAreaView style={[styles.mainContainer, { backgroundColor: 'transparent' }]}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={28} color={theme.primaryColor} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={[styles.title, { color: theme.textColor }]}>{t('qibla_direction')}</Text>
            {location && (
              <Text style={[styles.locationText, { color: theme.textColor + '99' }]}>
                {t('qibla_your_location')}: {location.coords.latitude.toFixed(2)}°, {location.coords.longitude.toFixed(2)}°
              </Text>
            )}
          </View>
        </View>

        <View style={styles.compassContainer}>
          {/* Compass Background */}
          <View
            style={[
              styles.compassCircle,
              {
                width: COMPASS_SIZE,
                height: COMPASS_SIZE,
                borderRadius: COMPASS_SIZE / 2,
                backgroundColor: theme.cardBackgroundColor,
                borderColor: theme.primaryColor,
              },
            ]}
          >
            {/* Direction Labels */}
            <Text style={[styles.directionLabel, styles.north, { color: theme.primaryColor }]}>N</Text>
            <Text style={[styles.directionLabel, styles.east, { color: theme.textColor }]}>E</Text>
            <Text style={[styles.directionLabel, styles.south, { color: theme.textColor }]}>S</Text>
            <Text style={[styles.directionLabel, styles.west, { color: theme.textColor }]}>W</Text>

            {/* Qibla Arrow */}
            <View
              style={[
                styles.arrow,
                {
                  transform: [{ rotate: `${getRotation()}deg` }],
                },
              ]}
            >
              <View style={[styles.arrowHead, { borderBottomColor: theme.accentColor }]} />
              <View style={[styles.arrowBody, { backgroundColor: theme.accentColor }]} />
            </View>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.infoText, { color: theme.textColor }]}>
            {t('qibla_angle')}: {qiblaDirection.toFixed(1)}°
          </Text>
          <Text style={[styles.instructionText, { color: theme.textColor + '99' }]}>
            {t('qibla_instruction')}
          </Text>
        </View>
      </SafeAreaView>
    </IslamicBackground>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
  },
  header: {
    marginTop: 50,
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    textAlign: 'center',
  },
  compassContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compassCircle: {
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  directionLabel: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
  },
  north: {
    top: 20,
  },
  east: {
    right: 20,
  },
  south: {
    bottom: 20,
  },
  west: {
    left: 20,
  },
  arrow: {
    position: 'absolute',
    alignItems: 'center',
  },
  arrowHead: {
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 40,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  arrowBody: {
    width: 8,
    height: 100,
    marginTop: -10,
  },
  infoContainer: {
    marginTop: 32,
    marginBottom: 24,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default QiblaScreen;
