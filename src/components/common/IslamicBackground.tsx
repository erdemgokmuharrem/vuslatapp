import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useThemeStore } from '../../store/useThemeStore';
import { isDarkTheme } from '../../styles/theme';

interface IslamicBackgroundProps {
  children: React.ReactNode;
}

const { width, height } = Dimensions.get('window');

// Açık temalarda kullanılan nane yeşili zemin ve yeşil süslemeler.
const LIGHT_SURFACE = '#E8F5E8';

const IslamicBackground: React.FC<IslamicBackgroundProps> = ({ children }) => {
  const { theme, getThemeObject } = useThemeStore();
  const themeObj = getThemeObject();
  const dark = isDarkTheme(theme);

  // Koyu temalarda zemin ve süsleme renkleri temadan alınır; aksi halde
  // uygulamanın nane yeşili görünümü korunur.
  const surface = dark ? themeObj.backgroundColor : LIGHT_SURFACE;
  const decorFill = dark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(27, 94, 32, 0.15)';
  const decorBorder = dark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(27, 94, 32, 0.25)';
  const decorAccent = dark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(27, 94, 32, 0.3)';
  const cornerColor = dark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(46, 125, 50, 0.1)';

  return (
    <View style={styles.container}>
      <View style={[styles.background, { backgroundColor: surface }]} />

      {/* Islamic Crescent Moon in the center background */}
      <View style={styles.crescentContainer}>
        <View style={[styles.crescentOuter, { backgroundColor: decorFill, borderColor: decorBorder }]}>
          <View style={[styles.crescentInner, { backgroundColor: surface }]} />
        </View>
        {/* Small star */}
        <View style={[styles.star, { backgroundColor: decorAccent }]} />
      </View>

      {/* Decorative corner elements */}
      <View style={[styles.cornerTopLeft, { borderColor: cornerColor }]} />
      <View style={[styles.cornerBottomRight, { borderColor: cornerColor }]} />

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  crescentContainer: {
    position: 'absolute',
    top: height * 0.3,
    left: width * 0.5 - 80,
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crescentOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
  },
  crescentInner: {
    position: 'absolute',
    top: 12,
    left: 30,
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  star: {
    position: 'absolute',
    top: -15,
    right: 15,
    width: 16,
    height: 16,
    transform: [{ rotate: '45deg' }],
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 80,
    left: 20,
    width: 30,
    height: 30,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderTopLeftRadius: 15,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 30,
    height: 30,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: 15,
  },
});

export default IslamicBackground;
