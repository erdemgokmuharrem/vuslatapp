import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Linking,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import IslamicBackground from '../components/common/IslamicBackground';
import MapView, { Marker } from 'react-native-maps';

import { RootStackParamList } from '../navigation/types';
import { useThemeStore } from '../store/useThemeStore';
import { locationService, PlaceOfWorship, LocationCoords } from '../services/locationService';

type NearbyMosquesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const NearbyMosquesScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NearbyMosquesScreenNavigationProp>();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();

  const [mosques, setMosques] = useState<PlaceOfWorship[]>([]);
  const [userLocation, setUserLocation] = useState<LocationCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    loadNearbyMosques();
  }, []);

  const loadNearbyMosques = async () => {
    try {
      setLoading(true);
      const location = await locationService.getCurrentLocation();
      setUserLocation(location);
      
      const nearbyMosques = await locationService.getNearbyMosques(location || undefined);
      setMosques(nearbyMosques);
    } catch (error) {
      Alert.alert('Hata', 'Yakındaki camiler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleCallMosque = (phone?: string) => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    } else {
      Alert.alert('Bilgi', 'Bu cami için telefon numarası bulunmuyor.');
    }
  };

  const handleGetDirections = (mosque: PlaceOfWorship) => {
    const url = locationService.openInMaps(mosque.coordinates, mosque.name);
    Linking.openURL(url);
  };

  const renderMosqueItem = (mosque: PlaceOfWorship) => (
    <View key={mosque.id} style={[styles.mosqueCard, { backgroundColor: theme.cardBackgroundColor }]}>
      <View style={styles.mosqueHeader}>
        <View style={styles.mosqueIcon}>
          <Ionicons name="business" size={24} color={theme.primaryColor} />
        </View>
        <View style={styles.mosqueInfo}>
          <Text style={[styles.mosqueName, { color: theme.textColor }]}>
            {mosque.name}
          </Text>
          {mosque.distance && (
            <Text style={[styles.mosqueDistance, { color: theme.textColor + '80' }]}>
              {mosque.distance.toFixed(1)} km uzaklıkta
            </Text>
          )}
        </View>
      </View>

      <Text style={[styles.mosqueAddress, { color: theme.textColor + '80' }]}>
        {mosque.address}
      </Text>

      {mosque.description && (
        <Text style={[styles.mosqueDescription, { color: theme.textColor }]}>
          {mosque.description}
        </Text>
      )}

      <View style={styles.mosqueActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.primaryColor + '20' }]}
          onPress={() => handleGetDirections(mosque)}
        >
          <Ionicons name="navigate" size={20} color={theme.primaryColor} />
          <Text style={[styles.actionButtonText, { color: theme.primaryColor }]}>
            Yol Tarifi
          </Text>
        </TouchableOpacity>

        {mosque.phone && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.primaryColor + '20' }]}
            onPress={() => handleCallMosque(mosque.phone)}
          >
            <Ionicons name="call" size={20} color={theme.primaryColor} />
            <Text style={[styles.actionButtonText, { color: theme.primaryColor }]}>
              Ara
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <IslamicBackground>
      <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme.primaryColor} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.textColor }]}>
            Yakındaki Camiler
          </Text>
          <TouchableOpacity onPress={() => setShowMap(!showMap)}>
            <Ionicons 
              name={showMap ? "list" : "map"} 
              size={24} 
              color={theme.primaryColor} 
            />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.primaryColor} />
            <Text style={[styles.loadingText, { color: theme.textColor }]}>
              Yakındaki camiler aranıyor...
            </Text>
          </View>
        ) : (
          <>
            {showMap && userLocation ? (
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                >
                  {mosques.map((mosque) => (
                    <Marker
                      key={mosque.id}
                      coordinate={mosque.coordinates}
                      title={mosque.name}
                      description={mosque.address}
                    >
                      <View style={[styles.markerContainer, { backgroundColor: theme.primaryColor }]}>
                        <Ionicons name="business" size={20} color="white" />
                      </View>
                    </Marker>
                  ))}
                </MapView>
              </View>
            ) : (
              <ScrollView 
                style={styles.content}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.infoCard}>
                  <Text style={[styles.infoText, { color: theme.textColor + '80' }]}>
                    {userLocation 
                      ? `${mosques.length} cami bulundu`
                      : 'Konum izni verilmediği için örnek camiler gösteriliyor'
                    }
                  </Text>
                </View>

                {mosques.map(renderMosqueItem)}

                <TouchableOpacity
                  style={[styles.refreshButton, { backgroundColor: theme.primaryColor }]}
                  onPress={loadNearbyMosques}
                >
                  <Ionicons name="refresh" size={20} color="white" />
                  <Text style={styles.refreshButtonText}>
                    Yenile
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </>
        )}
      </SafeAreaView>
    </IslamicBackground>
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
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  infoCard: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
  },
  mosqueCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mosqueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mosqueIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mosqueInfo: {
    flex: 1,
  },
  mosqueName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mosqueDistance: {
    fontSize: 14,
  },
  mosqueAddress: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  mosqueDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  mosqueActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 20,
    gap: 8,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
});
