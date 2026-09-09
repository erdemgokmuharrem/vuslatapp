import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Tasbih: undefined;
  Prayer: undefined;
  Quran: undefined;
  Dua: undefined;
  More: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<TabParamList>;
  Settings: undefined;
  ThemeSelector: undefined;
  LanguageSelector: undefined;
  QuranReader: { surahId: number; ayahNumber?: number };
  SurahList: undefined;
  DuaDetail: { duaId: string };
  DuaCategory: { categoryId: string };
  WorshipCounter: { itemId: string };
  TasbihStats: undefined;
  TasbihSettings: undefined;
  PrayerSettings: undefined;
  Reminders: undefined;
  AddReminder: undefined;
  AyahHadithFeed: { filter?: string };
  Favorites: undefined;
  Profile: undefined;
  Qibla: undefined;
  HatimTracker: undefined;
  Guide: undefined;
  GuideDetail: { guideId: string; title: string };
  SalawatGuide: undefined;
  FridaySermons: undefined;
  HajjUmrahGuide: undefined;
  PrayerTurkish: undefined;
  BeautifulNames: undefined;
  AsmaUlHusna: undefined;
  FortyHadith: undefined;
  WuduGuide: undefined;
  ThirtyTwoFard: undefined;
  NearbyMosques: undefined;
  NearbyTombs: undefined;
  ProphetsHistory: undefined;
  BeautifulDuas: undefined;
  DailyAyah: undefined;
  DailyHadith: undefined;
};
