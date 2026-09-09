import React, { useState } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useThemeStore } from '../../store/useThemeStore';

// Geliştirme sırasında Google'ın test reklamları, yayında gerçek reklam birimleri
// kullanılır. Test dışı ID'lerin simülatörde gösterilmesi politika ihlali sayılır.
const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : Platform.OS === 'ios'
    ? 'ca-app-pub-3014229693565455/6804977849' // Kendi iOS Banner ID'niz
    : 'ca-app-pub-3014229693565455/4783495333'; // Kendi Android Banner ID'niz

export const AdBanner = () => {
  const [error, setError] = useState(false);
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();

  // Reklam yüklenmezse boşluk kaplamaması için null dönüyoruz
  if (error) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true, // GDPR/Kişisel veri kurallarına uyum
        }}
        onAdFailedToLoad={(err) => {
          console.log('Ad failed to load: ', err);
          setError(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 4,
  },
});

export default AdBanner;
