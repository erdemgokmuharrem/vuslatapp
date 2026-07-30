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

type NearbyTombsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const NearbyTombsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NearbyTombsScreenNavigationProp>();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();

  const [tombs, setTombs] = useState<PlaceOfWorship[]>([]);
  const [userLocation, setUserLocation] = useState<LocationCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    loadNearbyTombs();
  }, []);

  const loadNearbyTombs = async () => {
    try {
      setLoading(true);
      const location = await locationService.getCurrentLocation();
      setUserLocation(location);
      
      const nearbyTombs = await locationService.getNearbyTombs(location || undefined);
      setTombs(nearbyTombs);
    } catch (error) {
      Alert.alert('Hata', 'Yakındaki türbeler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetDirections = (tomb: PlaceOfWorship) => {
    const url = locationService.openInMaps(tomb.coordinates, tomb.name);
    Linking.openURL(url);
  };

  const renderTombItem = (tomb: PlaceOfWorship) => (
    <View key={tomb.id} style={[styles.tombCard, { backgroundColor: theme.cardBackgroundColor }]}>
      <View style={styles.tombHeader}>
        <View style={styles.tombIcon}>
          <Ionicons name="home" size={24} color={theme.primaryColor} />
        </View>
        <View style={styles.tombInfo}>
          <Text style={[styles.tombName, { color: theme.textColor }]}>
            {tomb.name}
          </Text>
          {tomb.distance && (
            <Text style={[styles.tombDistance, { color: theme.textColor + '80' }]}>
              {tomb.distance.toFixed(1)} km uzaklıkta
            </Text>
          )}
        </View>
      </View>

      <Text style={[styles.tombAddress, { color: theme.textColor + '80' }]}>
        {tomb.address}
      </Text>

      {tomb.description && (
        <Text style={[styles.tombDescription, { color: theme.textColor }]}>
          {tomb.description}
        </Text>
      )}

      <View style={styles.tombActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.primaryColor + '20' }]}
          onPress={() => handleGetDirections(tomb)}
        >
          <Ionicons name="navigate" size={20} color={theme.primaryColor} />
          <Text style={[styles.actionButtonText, { color: theme.primaryColor }]}>
            Yol Tarifi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.primaryColor + '20' }]}
          onPress={() => Alert.alert('Ziyaret Duası', 'السَّلَامُ عَلَيْكُمْ دَارَ قَوْمٍ مُؤْمِنِينَ\n\nEsselâmü aleyküm dâra kavmin mü\'minîn')}
        >
          <Ionicons name="flower" size={20} color={theme.primaryColor} />
          <Text style={[styles.actionButtonText, { color: theme.primaryColor }]}>
            Dua
          </Text>
        </TouchableOpacity>
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
            Yakındaki Türbeler
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
              Yakındaki türbeler aranıyor...
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
                  {tombs.map((tomb) => (
                    <Marker
                      key={tomb.id}
                      coordinate={tomb.coordinates}
                      title={tomb.name}
                      description={tomb.address}
                    >
                      <View style={[styles.markerContainer, { backgroundColor: theme.primaryColor }]}>
                        <Ionicons name="home" size={20} color="white" />
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
                      ? `${tombs.length} türbe bulundu`
                      : 'Konum izni verilmediği için örnek türbeler gösteriliyor'
                    }
                  </Text>
                </View>

                <View style={[styles.visitCard, { backgroundColor: theme.cardBackgroundColor }]}>
                  <Text style={[styles.visitTitle, { color: theme.primaryColor }]}>
                    Türbe Ziyareti Adabı
                  </Text>
                  <Text style={[styles.visitText, { color: theme.textColor }]}>
                    • Temiz ve saygılı bir şekilde ziyaret edin{'\n'}
                    • Sessizce dua edin{'\n'}
                    • Büyüklerimizi rahmetle anın{'\n'}
                    • Ziyaret duasını okuyun
                  </Text>
                </View>

                {tombs.map(renderTombItem)}

                <TouchableOpacity
                  style={[styles.refreshButton, { backgroundColor: theme.primaryColor }]}
                  onPress={loadNearbyTombs}
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
  visitCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  visitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  visitText: {
    fontSize: 14,
    lineHeight: 20,
  },
  tombCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tombHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tombIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tombInfo: {
    flex: 1,
  },
  tombName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tombDistance: {
    fontSize: 14,
  },
  tombAddress: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  tombDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  tombActions: {
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
