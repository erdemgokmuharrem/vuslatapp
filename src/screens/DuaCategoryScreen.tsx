import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { useDuaStore } from '../store/useDuaStore';
import { useThemeStore } from '../store/useThemeStore';
import { safeKeyExtractor } from '../utils/keyGenerator';
import { duaCategories, getDuasByCategory } from '../data/duaData';

type DuaCategoryScreenRouteProp = RouteProp<RootStackParamList, 'DuaCategory'>;
type DuaCategoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const DuaCategoryScreen = () => {
  const { t } = useTranslation();
  const route = useRoute<DuaCategoryScreenRouteProp>();
  const navigation = useNavigation<DuaCategoryScreenNavigationProp>();
  const { 
    currentDua, 
    isPlaying,
    playDua,
    pauseDua,
    resumeDua
  } = useDuaStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  const { categoryId } = route.params;
  const category = duaCategories.find(cat => cat.id === categoryId);
  const duas = getDuasByCategory(categoryId);
  
  const handleDuaPress = (duaId: string) => {
    navigation.navigate('DuaDetail', { duaId });
  };
  
  const handlePlayPause = (duaId: string) => {
    if (currentDua && currentDua.id === duaId && isPlaying) {
      pauseDua();
    } else {
      // Always use playDua instead of resumeDua for reliability
      playDua(duaId);
    }
  };
  
  const renderDuaItem = ({ item }: { item: { id: string; name: string; arabic: string } }) => {
    const isCurrentlyPlaying = currentDua && currentDua.id === item.id && isPlaying;
    
    return (
      <TouchableOpacity
        style={[styles.duaItem, { backgroundColor: theme.cardBackgroundColor }]}
        onPress={() => handleDuaPress(item.id)}
      >
        <View style={styles.duaInfo}>
          <Text style={[styles.duaName, { color: theme.textColor }]}>{item.name}</Text>
          <Text style={[styles.duaArabic, { color: theme.primaryColor }]}>{item.arabic}</Text>
        </View>
        
        <TouchableOpacity
          style={[styles.playButton, { backgroundColor: theme.primaryColor }]}
          onPress={() => handlePlayPause(item.id)}
        >
          <Ionicons 
            name={isCurrentlyPlaying ? "pause" : "play"} 
            size={20} 
            color="white" 
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.primaryColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.textColor }]}>
          {category?.name || t('category')}
        </Text>
        <View style={{ width: 24 }} />
      </View>
      
      {category && (
        <View style={styles.categoryInfo}>
          <Text style={[styles.categoryDescription, { color: theme.textColor + '99' }]}>
            {category.description}
          </Text>
          <Text style={[styles.categoryCount, { color: theme.primaryColor }]}>
            {duas.length} {t('items')}
          </Text>
        </View>
      )}
      
      {duas.length > 0 ? (
        <FlatList
          data={duas}
          renderItem={renderDuaItem}
          keyExtractor={(item, index) => safeKeyExtractor(item, index, 'dua')}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="book-outline" size={64} color={theme.textColor + '40'} />
          <Text style={[styles.emptyText, { color: theme.textColor + '80' }]}>
            {t('no_duas_in_category')}
          </Text>
        </View>
      )}
      
      {currentDua && (
        <TouchableOpacity
          style={[styles.miniPlayer, { backgroundColor: theme.primaryColor }]}
          onPress={() => handleDuaPress(currentDua.id)}
        >
          <View style={styles.miniPlayerInfo}>
            <Text style={styles.miniPlayerTitle} numberOfLines={1}>
              {currentDua.name}
            </Text>
          </View>
          
          <TouchableOpacity
            style={styles.miniPlayerButton}
            onPress={() => handlePlayPause(currentDua.id)}
          >
            <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
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
  categoryInfo: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryDescription: {
    fontSize: 16,
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  duaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  duaInfo: {
    flex: 1,
  },
  duaName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  duaArabic: {
    fontSize: 18,
    fontWeight: '500',
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
  miniPlayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  miniPlayerInfo: {
    flex: 1,
  },
  miniPlayerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  miniPlayerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DuaCategoryScreen;
