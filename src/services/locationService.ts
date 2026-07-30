import * as Location from 'expo-location';
import logger from '../utils/logger';

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

export interface PlaceOfWorship {
  id: string;
  name: string;
  type: 'mosque' | 'tomb';
  coordinates: LocationCoords;
  address: string;
  distance?: number;
  description?: string;
  phone?: string;
  website?: string;
}

class LocationService {
  private currentLocation: LocationCoords | null = null;

  async requestLocationPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      logger.error('Error requesting location permission:', error);
      return false;
    }
  }

  async getCurrentLocation(): Promise<LocationCoords | null> {
    try {
      const hasPermission = await this.requestLocationPermission();
      if (!hasPermission) {
        logger.error('Location permission denied');
        return null;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      this.currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      return this.currentLocation;
    } catch (error) {
      logger.error('Error getting current location:', error);
      return null;
    }
  }

  calculateDistance(coord1: LocationCoords, coord2: LocationCoords): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(coord2.latitude - coord1.latitude);
    const dLon = this.toRadians(coord2.longitude - coord1.longitude);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(coord1.latitude)) * 
      Math.cos(this.toRadians(coord2.latitude)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Sample data - In production, this would come from a real API
  private getSampleMosques(): PlaceOfWorship[] {
    return [
      {
        id: 'mosque_1',
        name: 'Sultanahmet Camii',
        type: 'mosque',
        coordinates: { latitude: 41.0055, longitude: 28.9769 },
        address: 'Sultanahmet, Atmeydanı Cd. No:7, 34122 Fatih/İstanbul',
        description: 'Mimar Sinan\'ın eseri olan tarihi cami',
        phone: '+90 212 458 44 68'
      },
      {
        id: 'mosque_2',
        name: 'Süleymaniye Camii',
        type: 'mosque',
        coordinates: { latitude: 41.0166, longitude: 28.9644 },
        address: 'Süleymaniye, Prof. Sıddık Sami Onar Cd. No:1, 34116 Fatih/İstanbul',
        description: 'Osmunun en büyük camilerinden biri',
        phone: '+90 212 514 56 60'
      },
      {
        id: 'mosque_3',
        name: 'Fatih Camii',
        type: 'mosque',
        coordinates: { latitude: 41.0196, longitude: 28.9497 },
        address: 'Fatih, Fevzi Paşa Cd., 34093 Fatih/İstanbul',
        description: 'Fatih Sultan Mehmet tarafından yaptırılan cami'
      }
    ];
  }

  private getSampleTombs(): PlaceOfWorship[] {
    return [
      {
        id: 'tomb_1',
        name: 'Eyüp Sultan Türbesi',
        type: 'tomb',
        coordinates: { latitude: 41.0474, longitude: 28.9358 },
        address: 'Eyüpsultan, Camii Kebir Cd., 34050 Eyüpsultan/İstanbul',
        description: 'Hz. Peygamber\'in sahabesi Ebu Eyyub el-Ensari\'nin türbesi'
      },
      {
        id: 'tomb_2',
        name: 'Aziz Mahmud Hüdayi Türbesi',
        type: 'tomb',
        coordinates: { latitude: 41.0370, longitude: 29.0611 },
        address: 'Üsküdar, Simkeşhane Cd., 34664 Üsküdar/İstanbul',
        description: 'Büyük mutasavvıf Aziz Mahmud Hüdayi\'nin türbesi'
      },
      {
        id: 'tomb_3',
        name: 'Telli Baba Türbesi',
        type: 'tomb',
        coordinates: { latitude: 41.0138, longitude: 28.9497 },
        address: 'Fatih, Draman Cd., 34134 Fatih/İstanbul',
        description: 'Osmanlı dönemi velilerinden Telli Baba\'nın türbesi'
      }
    ];
  }

  async getNearbyMosques(userLocation?: LocationCoords): Promise<PlaceOfWorship[]> {
    try {
      const location = userLocation || await this.getCurrentLocation();
      if (!location) {
        return this.getSampleMosques();
      }

      const mosques = this.getSampleMosques();
      
      // Calculate distances and sort by proximity
      const mosquesWithDistance = mosques.map(mosque => ({
        ...mosque,
        distance: this.calculateDistance(location, mosque.coordinates)
      }));

      return mosquesWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } catch (error) {
      logger.error('Error getting nearby mosques:', error);
      return this.getSampleMosques();
    }
  }

  async getNearbyTombs(userLocation?: LocationCoords): Promise<PlaceOfWorship[]> {
    try {
      const location = userLocation || await this.getCurrentLocation();
      if (!location) {
        return this.getSampleTombs();
      }

      const tombs = this.getSampleTombs();
      
      // Calculate distances and sort by proximity
      const tombsWithDistance = tombs.map(tomb => ({
        ...tomb,
        distance: this.calculateDistance(location, tomb.coordinates)
      }));

      return tombsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } catch (error) {
      logger.error('Error getting nearby tombs:', error);
      return this.getSampleTombs();
    }
  }

  openInMaps(coordinates: LocationCoords, name: string) {
    const url = `https://maps.apple.com/?q=${name}&ll=${coordinates.latitude},${coordinates.longitude}`;
    return url;
  }
}

export const locationService = new LocationService();
