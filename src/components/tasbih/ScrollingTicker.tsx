import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useThemeStore } from '../../store/useThemeStore';

// Sample data - in a real app, this would come from an API or local database
const sampleAyahs = [
  {
    id: '1',
    text: 'Indeed, Allah is with the patient.',
    source: 'Quran 2:153',
    tag: 'patience'
  },
  {
    id: '2',
    text: 'And whoever relies upon Allah - then He is sufficient for him.',
    source: 'Quran 65:3',
    tag: 'trust'
  },
  {
    id: '3',
    text: 'So remember Me; I will remember you.',
    source: 'Quran 2:152',
    tag: 'remembrance'
  }
];

const sampleHadiths = [
  {
    id: '1',
    text: 'The best of you are those who learn the Quran and teach it.',
    source: 'Sahih al-Bukhari 5027',
    tag: 'knowledge'
  },
  {
    id: '2',
    text: 'The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.',
    source: 'Sahih al-Bukhari 6114',
    tag: 'self-control'
  },
  {
    id: '3',
    text: 'Whoever believes in Allah and the Last Day, let him speak good or remain silent.',
    source: 'Sahih al-Bukhari 6018',
    tag: 'speech'
  }
];

const { width } = Dimensions.get('window');

interface ScrollingTickerProps {
  onPress?: () => void;
}

export const ScrollingTicker: React.FC<ScrollingTickerProps> = ({ onPress }) => {
  const { t } = useTranslation();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  const [currentItem, setCurrentItem] = useState<'ayah' | 'hadith'>('ayah');
  const [itemIndex, setItemIndex] = useState(0);
  
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  const items = currentItem === 'ayah' ? sampleAyahs : sampleHadiths;
  const item = items[itemIndex];
  
  useEffect(() => {
    // Change item every 10 seconds
    const interval = setInterval(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Change item
        if (itemIndex < items.length - 1) {
          setItemIndex(itemIndex + 1);
        } else {
          // Switch between ayah and hadith
          setCurrentItem(currentItem === 'ayah' ? 'hadith' : 'ayah');
          setItemIndex(0);
        }
        
        // Reset scroll position
        scrollAnim.setValue(0);
        
        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 10000);
    
    return () => clearInterval(interval);
  }, [itemIndex, currentItem, items.length]);
  
  useEffect(() => {
    // Scroll animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scrollAnim, {
          toValue: -width,
          duration: 15000,
          useNativeDriver: true,
        }),
        Animated.timing(scrollAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [itemIndex, currentItem]);
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: theme.cardBackgroundColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: theme.primaryColor }]}>
          {currentItem === 'ayah' ? t('feed_ayah') : t('feed_hadith')}
        </Text>
        <View style={[styles.tag, { backgroundColor: theme.primaryColor }]}>
          <Text style={styles.tagText}>#{item.tag}</Text>
        </View>
      </View>
      
      <View style={styles.tickerContainer}>
        <Animated.View 
          style={[
            styles.tickerContent,
            { 
              transform: [{ translateX: scrollAnim }],
              opacity: fadeAnim,
            }
          ]}
        >
          <Text style={[styles.tickerText, { color: theme.textColor }]}>
            {item.text}
          </Text>
        </Animated.View>
      </View>
      
      <Text style={[styles.source, { color: theme.secondaryColor }]}>
        {item.source}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  tickerContainer: {
    height: 60,
    overflow: 'hidden',
  },
  tickerContent: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 2, // Make it wider than the screen
  },
  tickerText: {
    fontSize: 16,
    lineHeight: 24,
  },
  source: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'right',
    fontStyle: 'italic',
  },
});

export default ScrollingTicker;
