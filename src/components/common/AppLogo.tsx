import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../store/useThemeStore';

interface AppLogoProps {
  size?: number;
  showText?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({ size = 60, showText = true }) => {
  const { t } = useTranslation();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  return (
    <View style={styles.container}>
      <View style={[
        styles.logoContainer, 
        { 
          width: size, 
          height: size, 
          backgroundColor: theme.primaryColor,
          borderRadius: size / 2
        }
      ]}>
        <View style={styles.crescentContainer}>
          <View style={[styles.crescentOuter, { width: size * 0.6, height: size * 0.6 }]}>
            {/* Hilalin oyuğu, dış dairenin rengiyle aynı olmalı; aksi halde
                hilal yerine düz bir daire görünür. */}
            <View
              style={[
                styles.crescentInner,
                { width: size * 0.45, height: size * 0.45, backgroundColor: theme.primaryColor },
              ]}
            />
          </View>
          <Ionicons name="star" size={size * 0.2} color="#FFD700" style={styles.star} />
        </View>
      </View>
      
      {showText && (
        <Text style={[styles.appName, { color: theme.primaryColor, fontSize: size / 3 }]}>
          {t('app_name')}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  crescentContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  crescentOuter: {
    borderRadius: 1000,
    backgroundColor: 'white',
    position: 'relative',
    overflow: 'hidden',
  },
  crescentInner: {
    borderRadius: 1000,
    position: 'absolute',
    top: '10%',
    right: '-15%',
  },
  star: {
    position: 'absolute',
    top: '15%',
    right: '25%',
  },
  appName: {
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default AppLogo;
