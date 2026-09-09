import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '../store/useThemeStore';
import { onColor } from '../styles/theme';

import { TabParamList } from './types';
import TasbihScreen from '../screens/TasbihScreen';
import PrayerTimesScreen from '../screens/PrayerTimesScreen';
import SurahListScreen from '../screens/SurahListScreen';
import DuaLibraryScreen from '../screens/DuaLibraryScreen';
import DailyWorshipScreen from '../screens/DailyWorshipScreen';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  const { t } = useTranslation();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  const insets = useSafeAreaInsets();

  // Sekme çubuğu zemini temanın ana rengi; altın/turuncu gibi parlak
  // tonlarda beyaz yazı okunmuyor, bu yüzden kontrasta göre seçiliyor.
  const tabTint = onColor(theme.primaryColor);

  // Tab bar yüksekliğini hesapla
  const tabBarHeight = 60 + (Platform.OS === 'ios' ? insets.bottom : 8);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: tabTint,
        tabBarInactiveTintColor: tabTint + 'A6',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.primaryColor,
          borderTopColor: theme.primaryColor,
          borderTopWidth: 0,
          paddingTop: 8,
          height: tabBarHeight,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
          marginBottom: Platform.OS === 'ios' ? 0 : 6,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tab.Screen
        name="Tasbih"
        component={TasbihScreen}
        options={{
          title: t('tabbar_tasbih'),
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : undefined}>
              <Ionicons
                name={focused ? "radio-button-on" : "radio-button-off"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Prayer"
        component={PrayerTimesScreen}
        options={{
          title: t('tabbar_prayer'),
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : undefined}>
              <Ionicons
                name={focused ? "time" : "time-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Quran"
        component={SurahListScreen}
        options={{
          title: t('tabbar_quran'),
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : undefined}>
              <Ionicons
                name={focused ? "book" : "book-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Dua"
        component={DuaLibraryScreen}
        options={{
          title: t('tabbar_dua'),
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : undefined}>
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={DailyWorshipScreen}
        options={{
          title: t('tabbar_worship'),
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : undefined}>
              <Ionicons
                name={focused ? "apps" : "apps-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
});
