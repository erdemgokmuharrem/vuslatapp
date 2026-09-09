import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import IslamicBackground from '../components/common/IslamicBackground';

import { RootStackParamList } from '../navigation/types';
import { useThemeStore } from '../store/useThemeStore';
import { useLanguageStore, Language } from '../store/useLanguageStore';
import { useFontSizeStore, FONT_SCALES, FontScale } from '../store/useFontSizeStore';
import { themes, ThemeType } from '../styles/theme';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LANGUAGES: { code: Language; native: string; flag: string }[] = [
  { code: 'tr', native: 'Türkçe',   flag: '🇹🇷' },
  { code: 'en', native: 'English',  flag: '🇬🇧' },
  { code: 'de', native: 'Deutsch',  flag: '🇩🇪' },
  { code: 'ru', native: 'Русский',  flag: '🇷🇺' },
  { code: 'fr', native: 'Français', flag: '🇫🇷' },
];

export const SettingsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { getThemeObject, theme, setTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const { fontScale, setFontScale } = useFontSizeStore();
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const themeObj = getThemeObject();

  const handleLanguageChange = useCallback(async (newLanguage: Language) => {
    if (isChangingLanguage || newLanguage === language) return;
    setIsChangingLanguage(true);
    try {
      await setLanguage(newLanguage);
      Alert.alert(t('success') || 'Başarılı', t('language_changed_success') || 'Dil başarıyla değiştirildi', [{ text: t('ok') || 'Tamam' }]);
    } catch {
      Alert.alert(t('error') || 'Hata', t('language_change_error') || 'Dil değiştirilemedi');
    } finally {
      setIsChangingLanguage(false);
    }
  }, [isChangingLanguage, language, setLanguage, t]);

  const handleThemeChange = useCallback(async (newTheme: ThemeType) => {
    if (newTheme === theme) return;
    try {
      await setTheme(newTheme);
      Alert.alert(t('success') || 'Başarılı', t('theme_changed_success') || 'Tema başarıyla değiştirildi', [{ text: t('ok') || 'Tamam' }]);
    } catch {
      Alert.alert(t('error') || 'Hata', t('theme_change_error') || 'Tema değiştirilemedi');
    }
  }, [theme, setTheme, t]);

  const handleGoBack = useCallback(() => {
    try { navigation.goBack(); } catch { navigation.navigate('Main' as never); }
  }, [navigation]);

  const s = (key: string, fallback: string) => t(key) || fallback;

  return (
    <IslamicBackground>
      <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton} disabled={isChangingLanguage}>
            <Ionicons name="arrow-back" size={28} color={themeObj.primaryColor} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: themeObj.textColor }]}>{s('settings_title', 'Ayarlar')}</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

          {/* Language */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeObj.textColor }]}>{s('settings_language', 'Dil')}</Text>
            <View style={styles.languageGrid}>
              {LANGUAGES.map((lang) => {
                const isActive = language === lang.code;
                return (
                  <TouchableOpacity
                    key={lang.code}
                    style={[styles.languageCard, { backgroundColor: themeObj.cardBackgroundColor }, isActive && { borderColor: themeObj.primaryColor, borderWidth: 2 }]}
                    onPress={() => handleLanguageChange(lang.code)}
                    disabled={isChangingLanguage}
                  >
                    <Text style={styles.languageFlag}>{lang.flag}</Text>
                    <Text style={[styles.languageNative, { color: themeObj.textColor }]}>{lang.native}</Text>
                    {isActive && <Ionicons name="checkmark-circle" size={16} color={themeObj.primaryColor} style={styles.langCheck} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Font Size */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeObj.textColor }]}>{s('settings_font_size', 'Yazı Boyutu')}</Text>
            <View style={styles.fontScaleRow}>
              {FONT_SCALES.map(({ value, labelKey }) => {
                const isActive = fontScale === value;
                return (
                  <TouchableOpacity
                    key={value}
                    style={[styles.fontScaleButton, { backgroundColor: isActive ? themeObj.primaryColor : themeObj.cardBackgroundColor }]}
                    onPress={() => setFontScale(value as FontScale)}
                  >
                    <Text style={[styles.fontScaleA, { color: isActive ? 'white' : themeObj.textColor, fontSize: 12 * value }]}>A</Text>
                    <Text style={[styles.fontScaleLabel, { color: isActive ? 'white' : themeObj.textColor + '99' }]}>{t(labelKey)}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Theme */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeObj.textColor }]}>{s('settings_theme', 'Tema')}</Text>
            <View style={styles.themeGrid}>
              {Object.entries(themes).map(([themeId, themeData]) => (
                <TouchableOpacity
                  key={themeId}
                  style={[styles.themeCard, { backgroundColor: themeData.cardBackgroundColor }, theme === themeId && { borderColor: themeObj.primaryColor, borderWidth: 3 }]}
                  onPress={() => handleThemeChange(themeId as ThemeType)}
                >
                  <View style={styles.themePreview}>
                    <View style={[styles.themeColorBar, { backgroundColor: themeData.primaryColor }]} />
                    <View style={[styles.themeColorBar, { backgroundColor: themeData.secondaryColor }]} />
                    <View style={[styles.themeColorBar, { backgroundColor: themeData.accentColor }]} />
                  </View>
                  <Text style={[styles.themeName, { color: themeData.textColor }]}>{themeData.name}</Text>
                  {theme === themeId && <Ionicons name="checkmark-circle" size={20} color={themeObj.primaryColor} style={styles.themeCheck} />}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* About */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeObj.textColor }]}>{s('settings_about', 'Hakkında')}</Text>
            <View style={[styles.settingItem, { backgroundColor: themeObj.cardBackgroundColor }]}>
              <Ionicons name="information-circle" size={24} color={themeObj.primaryColor} />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: themeObj.textColor }]}>{s('app_name', 'Vuslat')}</Text>
                <Text style={[styles.settingSubtitle, { color: themeObj.textColor + '80' }]}>{s('app_tagline', 'İslami Uygulama')}</Text>
              </View>
            </View>
            <View style={[styles.settingItem, { backgroundColor: themeObj.cardBackgroundColor }]}>
              <Ionicons name="code-slash" size={24} color={themeObj.primaryColor} />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: themeObj.textColor }]}>{s('version', 'Sürüm')}</Text>
                <Text style={[styles.settingSubtitle, { color: themeObj.textColor + '80' }]}>1.0.0</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </IslamicBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 20 },
  backButton: { padding: 8 },
  title: { fontSize: 24, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  content: { flex: 1, paddingHorizontal: 16 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  languageGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  languageCard: { width: '30%', paddingVertical: 14, paddingHorizontal: 8, borderRadius: 12, alignItems: 'center', position: 'relative', borderWidth: 1, borderColor: 'transparent', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  languageFlag: { fontSize: 24, marginBottom: 4 },
  languageNative: { fontSize: 13, fontWeight: '600', textAlign: 'center' },
  langCheck: { position: 'absolute', top: 4, right: 4 },
  fontScaleRow: { flexDirection: 'row', gap: 10 },
  fontScaleButton: { flex: 1, paddingVertical: 16, borderRadius: 12, alignItems: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  fontScaleA: { fontWeight: 'bold', marginBottom: 4 },
  fontScaleLabel: { fontSize: 10, textAlign: 'center' },
  themeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  themeCard: { width: '48%', padding: 12, borderRadius: 12, alignItems: 'center', position: 'relative', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  themePreview: { flexDirection: 'row', marginBottom: 8, borderRadius: 6, overflow: 'hidden' },
  themeColorBar: { width: 20, height: 20, marginHorizontal: 1 },
  themeName: { fontSize: 12, fontWeight: '600', textAlign: 'center' },
  themeCheck: { position: 'absolute', top: 4, right: 4 },
  settingItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12, gap: 12 },
  settingTextContainer: { flex: 1 },
  settingTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  settingSubtitle: { fontSize: 14, lineHeight: 20 },
});

export default SettingsScreen;
