import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Vibration
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { useWorshipStore } from '../store/useWorshipStore';
import { useThemeStore } from '../store/useThemeStore';
import { getWorshipItemById } from '../data/worshipData';

type WorshipCounterScreenRouteProp = RouteProp<RootStackParamList, 'WorshipCounter'>;
type WorshipCounterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const WorshipCounterScreen = () => {
  const { t } = useTranslation();
  const route = useRoute<WorshipCounterScreenRouteProp>();
  const navigation = useNavigation<WorshipCounterScreenNavigationProp>();
  const { markItemCompleted } = useWorshipStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  const { itemId } = route.params;
  const worshipItem = getWorshipItemById(itemId);
  
  const [count, setCount] = useState(0);
  const targetCount = worshipItem?.count || 1;
  
  const handleIncrement = () => {
    if (count < targetCount) {
      setCount(count + 1);
      Vibration.vibrate(20);
    }
    
    if (count + 1 === targetCount) {
      // Complete when reaching target count
      markItemCompleted(itemId, targetCount);
    }
  };
  
  const handleReset = () => {
    setCount(0);
  };
  
  const handleComplete = () => {
    markItemCompleted(itemId, count);
    navigation.goBack();
  };
  
  const progress = targetCount > 0 ? (count / targetCount) * 100 : 0;
  
  if (!worshipItem) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme.primaryColor} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.textColor }]}>{t('counter')}</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.textColor }]}>
            {t('item_not_found')}
          </Text>
        </View>
      </View>
    );
  }
  
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.primaryColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.textColor }]}>{worshipItem.name}</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.description, { color: theme.textColor + '99' }]}>
          {worshipItem.description}
        </Text>
        
        {worshipItem.arabic && (
          <Text style={[styles.arabicText, { color: theme.primaryColor }]}>
            {worshipItem.arabic}
          </Text>
        )}
        
        <View style={styles.counterContainer}>
          <View style={[styles.progressCircle, { borderColor: theme.primaryColor + '30' }]}>
            <View style={styles.progressTextContainer}>
              <Text style={[styles.countText, { color: theme.primaryColor }]}>
                {count}
              </Text>
              <Text style={[styles.targetText, { color: theme.textColor + '80' }]}>
                / {targetCount}
              </Text>
            </View>
            
            <View 
              style={[
                styles.progressArc,
                { 
                  borderColor: theme.primaryColor,
                  transform: [{ rotate: `${progress * 3.6}deg` }]
                }
              ]} 
            />
          </View>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.resetButton, { borderColor: theme.primaryColor }]}
            onPress={handleReset}
          >
            <Text style={[styles.resetButtonText, { color: theme.primaryColor }]}>
              {t('reset')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.incrementButton, { backgroundColor: theme.primaryColor }]}
            onPress={handleIncrement}
          >
            <Text style={styles.incrementButtonText}>
              {t('increment')}
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={[
            styles.completeButton, 
            { 
              backgroundColor: count > 0 ? theme.secondaryColor : theme.secondaryColor + '50',
            }
          ]}
          onPress={handleComplete}
          disabled={count === 0}
        >
          <Text style={styles.completeButtonText}>
            {t('mark_completed')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  arabicText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 40,
  },
  counterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
  },
  progressCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  progressArc: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 10,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    position: 'absolute',
    top: -10,
    left: -10,
  },
  progressTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  countText: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  targetText: {
    fontSize: 24,
    marginLeft: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  resetButton: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  incrementButton: {
    flex: 2,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  incrementButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  completeButton: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WorshipCounterScreen;
