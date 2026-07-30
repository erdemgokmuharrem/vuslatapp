import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { RootStackParamList } from './types';
import { TabNavigator } from './TabNavigator';
import TasbihStatsScreen from '../screens/TasbihStatsScreen';
import PrayerSettingsScreen from '../screens/PrayerSettingsScreen';
import QuranReaderScreen from '../screens/QuranReaderScreen';
import { DuaDetailScreen } from '../screens/DuaDetailScreen';
import DuaCategoryScreen from '../screens/DuaCategoryScreen';
import WorshipCounterScreen from '../screens/WorshipCounterScreen';
import RemindersScreen from '../screens/RemindersScreen';
import AddReminderScreen from '../screens/AddReminderScreen';
import FeedScreen from '../screens/FeedScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AuthScreen from '../screens/AuthScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ProfileScreen from '../screens/ProfileScreen';
import QiblaScreen from '../screens/QiblaScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HatimTrackerScreen from '../screens/HatimTrackerScreen';
import { GuideScreen } from '../screens/GuideScreen';
import { GuideDetailScreen } from '../screens/GuideDetailScreen';
import { NearbyMosquesScreen } from '../screens/NearbyMosquesScreen';
import { NearbyTombsScreen } from '../screens/NearbyTombsScreen';
import DailyAyahScreen from '../screens/DailyAyahScreen';
import DailyHadithScreen from '../screens/DailyHadithScreen';
import SalawatGuideScreen from '../screens/SalawatGuideScreen';
import PrayerTurkishScreen from '../screens/PrayerTurkishScreen';
import AsmaUlHusnaScreen from '../screens/AsmaUlHusnaScreen';
import FortyHadithScreen from '../screens/FortyHadithScreen';
import WuduGuideScreen from '../screens/WuduGuideScreen';
import ThirtyTwoFardScreen from '../screens/ThirtyTwoFardScreen';
import ProphetsHistoryScreen from '../screens/ProphetsHistoryScreen';
import BeautifulDuasScreen from '../screens/BeautifulDuasScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="TasbihStats"
        component={TasbihStatsScreen}
      />
      <Stack.Screen
        name="PrayerSettings"
        component={PrayerSettingsScreen}
      />
      <Stack.Screen
        name="QuranReader"
        component={QuranReaderScreen}
      />
      <Stack.Screen
        name="DuaDetail"
        component={DuaDetailScreen}
      />
      <Stack.Screen
        name="DuaCategory"
        component={DuaCategoryScreen}
      />
      <Stack.Screen
        name="WorshipCounter"
        component={WorshipCounterScreen}
      />
      <Stack.Screen
        name="Reminders"
        component={RemindersScreen}
      />
      <Stack.Screen
        name="AddReminder"
        component={AddReminderScreen}
      />
      <Stack.Screen
        name="AyahHadithFeed"
        component={FeedScreen}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
      />
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="Qibla"
        component={QiblaScreen}
      />
      <Stack.Screen
        name="HatimTracker"
        component={HatimTrackerScreen}
      />
      <Stack.Screen
        name="Guide"
        component={GuideScreen}
      />
      <Stack.Screen
        name="GuideDetail"
        component={GuideDetailScreen}
      />
      <Stack.Screen
        name="NearbyMosques"
        component={NearbyMosquesScreen}
      />
      <Stack.Screen
        name="NearbyTombs"
        component={NearbyTombsScreen}
      />
      <Stack.Screen
        name="DailyAyah"
        component={DailyAyahScreen}
      />
      <Stack.Screen
        name="DailyHadith"
        component={DailyHadithScreen}
      />
      <Stack.Screen
        name="SalawatGuide"
        component={SalawatGuideScreen}
      />
      <Stack.Screen
        name="PrayerTurkish"
        component={PrayerTurkishScreen}
      />
      <Stack.Screen
        name="AsmaUlHusna"
        component={AsmaUlHusnaScreen}
      />
      <Stack.Screen
        name="BeautifulNames"
        component={AsmaUlHusnaScreen}
      />
      <Stack.Screen
        name="FortyHadith"
        component={FortyHadithScreen}
      />
      <Stack.Screen
        name="WuduGuide"
        component={WuduGuideScreen}
      />
      <Stack.Screen
        name="ThirtyTwoFard"
        component={ThirtyTwoFardScreen}
      />
      <Stack.Screen
        name="ProphetsHistory"
        component={ProphetsHistoryScreen}
      />
      <Stack.Screen
        name="BeautifulDuas"
        component={BeautifulDuasScreen}
      />
    </Stack.Navigator>
  );
};
