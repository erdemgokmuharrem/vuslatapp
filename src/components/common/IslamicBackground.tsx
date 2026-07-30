import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

interface IslamicBackgroundProps {
  children: React.ReactNode;
}

const { width, height } = Dimensions.get('window');

const IslamicBackground: React.FC<IslamicBackgroundProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.background} />
      
      {/* Islamic Crescent Moon in the center background */}
      <View style={styles.crescentContainer}>
        <View style={styles.crescentOuter}>
          <View style={styles.crescentInner} />
        </View>
        {/* Small star */}
        <View style={styles.star} />
      </View>

      {/* Decorative corner elements */}
      <View style={styles.cornerTopLeft} />
      <View style={styles.cornerBottomRight} />

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
    backgroundColor: '#E8F5E8',
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
    backgroundColor: 'rgba(27, 94, 32, 0.15)',    // Darker green
    borderWidth: 2,
    borderColor: 'rgba(27, 94, 32, 0.25)',       // Darker green border
  },
  crescentInner: {
    position: 'absolute',
    top: 12,
    left: 30,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E8F5E8',
  },
  star: {
    position: 'absolute',
    top: -15,
    right: 15,
    width: 16,
    height: 16,
    backgroundColor: 'rgba(27, 94, 32, 0.3)',    // Darker green star
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
    borderColor: 'rgba(46, 125, 50, 0.1)',
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
    borderColor: 'rgba(46, 125, 50, 0.1)',
    borderBottomRightRadius: 15,
  },
});

export default IslamicBackground;
