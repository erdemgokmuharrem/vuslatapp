import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,
  ScrollView, Switch, RefreshControl
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import IslamicBackground from '../components/common/IslamicBackground';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/types';
import { usePrayerTimesStore } from '../store/usePrayerTimesStore';
import { useThemeStore } from '../store/useThemeStore';
import { toHijri, getDaysToRamadan, formatHijriDate, getUpcomingReligiousDays, UpcomingDay } from '../utils/hijriCalendar';
import { Modal, FlatList } from 'react-native';

type PrayerTimesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const PrayerTimesScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<PrayerTimesScreenNavigationProp>();
  const {
    prayerTimes, location, nextPrayer, timeUntilNextPrayer, autoSilentMode,
    notificationsEnabled, toggleNotifications,
    isLoading, error, fetchPrayerTimesForToday, toggleAutoSilentMode, updateNextPrayer
  } = usePrayerTimesStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();

  const [refreshing, setRefreshing] = useState(false);
  const [showReligiousModal, setShowReligiousModal] = useState(false);
  const [upcomingDays, setUpcomingDays] = useState<UpcomingDay[]>([]);

  // Hijri & Ramadan state
  const hijriToday = toHijri(new Date());
  const { daysLeft, inRamadan } = getDaysToRamadan();

  useEffect(() => {
    fetchPrayerTimesForToday();
    const intervalId = setInterval(() => { updateNextPrayer(); }, 60000);
    setUpcomingDays(getUpcomingReligiousDays());
    return () => clearInterval(intervalId);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPrayerTimesForToday();
    setRefreshing(false);
  };

  const formatTime = (time: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const isNextPrayer = (prayerName: string) => nextPrayer?.name === prayerName;

  return (
    <IslamicBackground>
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.textColor }]}>{t('prayer_times_title')}</Text>
          <TouchableOpacity
            style={[styles.qiblaButton, { backgroundColor: theme.primaryColor }]}
            onPress={() => navigation.navigate('Qibla')}
          >
            <Text style={styles.qiblaButtonText}>{t('qibla_direction')}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}
              colors={[theme.primaryColor]} tintColor={theme.primaryColor}
            />
          }
        >
          {/* ── Hijri Date & Ramadan Card ── */}
          <TouchableOpacity 
            style={[styles.hijriCard, { backgroundColor: theme.cardBackgroundColor }]}
            onPress={() => setShowReligiousModal(true)}
          >
            <View style={styles.hijriLeft}>
              <Ionicons name="moon-outline" size={20} color={theme.primaryColor} />
              <View style={{ marginLeft: 8 }}>
                <Text style={[styles.hijriLabel, { color: theme.textColor + '99' }]}>{t('hijri_date')}</Text>
                <Text style={[styles.hijriValue, { color: theme.textColor }]}>{formatHijriDate(hijriToday)}</Text>
                <Text style={[styles.hijriArabic, { color: theme.primaryColor }]}>{hijriToday.monthNameAr}</Text>
              </View>
            </View>
            <View style={[styles.divider, { backgroundColor: theme.borderColor || theme.textColor + '20' }]} />
            <View style={styles.ramadanRight}>
              <Ionicons name="star-outline" size={20} color={theme.primaryColor} />
              {inRamadan ? (
                <Text style={[styles.ramadanActive, { color: theme.primaryColor }]}>{t('ramadan_active')}</Text>
              ) : (
                <>
                  <Text style={[styles.ramadanDays, { color: theme.textColor }]}>{daysLeft}</Text>
                  <Text style={[styles.ramadanLabel, { color: theme.textColor + '99' }]}>{t('days_to_ramadan')}</Text>
                </>
              )}
            </View>
          </TouchableOpacity>

          {isLoading && !refreshing ? (
            <ActivityIndicator size="large" color={theme.primaryColor} style={styles.loader} />
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={[styles.errorText, { color: theme.textColor }]}>{error}</Text>
              <TouchableOpacity style={[styles.retryButton, { backgroundColor: theme.primaryColor }]} onPress={fetchPrayerTimesForToday}>
                <Text style={styles.retryButtonText}>{t('retry')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {location && (
                <View style={styles.locationContainer}>
                  <Ionicons name="location-outline" size={16} color={theme.textColor + '80'} />
                  <Text style={[styles.locationText, { color: theme.textColor + '80' }]}>
                    {' '}{location.city || ''}{location.country ? `, ${location.country}` : ''}
                  </Text>
                </View>
              )}

              {nextPrayer && (
                <View style={[styles.nextPrayerCard, { backgroundColor: theme.primaryColor }]}>
                  <Text style={styles.nextPrayerLabel}>{t('prayer_next')}</Text>
                  <Text style={styles.nextPrayerName}>{t(`prayer_${nextPrayer.name}`)}</Text>
                  <Text style={styles.nextPrayerTime}>{formatTime(nextPrayer.time)}</Text>
                  <View style={styles.countdownContainer}>
                    <Text style={styles.countdownLabel}>{t('prayer_time_until')}</Text>
                    <Text style={styles.countdownTime}>{timeUntilNextPrayer}</Text>
                  </View>
                </View>
              )}

              {prayerTimes && (
                <View style={styles.prayerTimesContainer}>
                  {['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'].map(name => (
                    <PrayerTimeRow
                      key={name} name={name}
                      time={prayerTimes[name as keyof typeof prayerTimes]}
                      isNext={isNextPrayer(name)} theme={theme} t={t}
                    />
                  ))}
                </View>
              )}

              <View style={[styles.settingCard, { backgroundColor: theme.cardBackgroundColor, marginBottom: 8 }]}>
                <Text style={[styles.settingLabel, { color: theme.textColor }]}>{t('prayer_auto_silent')}</Text>
                <Switch
                  value={autoSilentMode} onValueChange={toggleAutoSilentMode}
                  trackColor={{ false: '#767577', true: theme.primaryColor }} thumbColor="#f4f3f4"
                />
              </View>

              <View style={[styles.settingCard, { backgroundColor: theme.cardBackgroundColor, marginTop: 0 }]}>
                <Text style={[styles.settingLabel, { color: theme.textColor }]}>{t('prayer_notifications_10m', 'Vakte 10 Dk Kala Bildir')}</Text>
                <Switch
                  value={notificationsEnabled} onValueChange={toggleNotifications}
                  trackColor={{ false: '#767577', true: theme.primaryColor }} thumbColor="#f4f3f4"
                />
              </View>

              <TouchableOpacity
                style={[styles.settingsButton, { backgroundColor: theme.secondaryColor }]}
                onPress={() => navigation.navigate('PrayerSettings')}
              >
                <Text style={styles.settingsButtonText}>{t('settings_title')}</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
        
        {/* Religious Days Modal */}
        <Modal visible={showReligiousModal} transparent animationType="slide" onRequestClose={() => setShowReligiousModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.cardBackgroundColor }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.textColor }]}>{t('religious_days', 'Dini Günler')}</Text>
                <TouchableOpacity onPress={() => setShowReligiousModal(false)}>
                  <Ionicons name="close" size={24} color={theme.textColor} />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={upcomingDays}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                  <View style={[styles.religiousDayItem, { backgroundColor: theme.cardBackgroundColor, borderColor: theme.textColor + '20' }]}>
                    <View style={styles.religiousDayLeft}>
                      <Text style={[styles.religiousDayName, { color: theme.primaryColor }]}>
                        {t(item.key)}
                      </Text>
                      <Text style={[styles.religiousDayDates, { color: theme.textColor + '99' }]}>
                        {item.gregorianDate.toLocaleDateString()} • {item.hijriString}
                      </Text>
                    </View>
                    <View style={styles.religiousDayRight}>
                      {item.daysLeft === 0 ? (
                         <Text style={[styles.religiousDayCount, { color: theme.primaryColor }]}>{t('today', 'Bugün')}</Text>
                      ) : (
                         <Text style={[styles.religiousDayCount, { color: theme.textColor }]}>{item.daysLeft} {t('days', 'gün')}</Text>
                      )}
                    </View>
                  </View>
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </Modal>

      </View>
    </IslamicBackground>
  );
};

interface PrayerTimeRowProps {
  name: string; time: string; isNext: boolean; theme: any; t: (key: string) => string;
}

const PrayerTimeRow: React.FC<PrayerTimeRowProps> = ({ name, time, isNext, theme, t }) => {
  const formatTime = (time: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };
  return (
    <View style={[styles.prayerTimeRow, {
      backgroundColor: isNext ? theme.primaryColor + '30' : theme.cardBackgroundColor,
      borderLeftColor: isNext ? theme.primaryColor : 'transparent',
    }]}>
      <Text style={[styles.prayerName, { color: isNext ? theme.primaryColor : theme.textColor, fontWeight: isNext ? 'bold' : 'normal' }]}>
        {t(`prayer_${name}`)}
      </Text>
      <Text style={[styles.prayerTime, { color: isNext ? theme.primaryColor : theme.textColor, fontWeight: isNext ? 'bold' : 'normal' }]}>
        {formatTime(time)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  qiblaButton: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  qiblaButtonText: { color: 'white', fontWeight: '600', fontSize: 13 },
  content: { flex: 1, paddingHorizontal: 16 },
  // Hijri card
  hijriCard: {
    flexDirection: 'row', borderRadius: 14, padding: 14, marginBottom: 14,
    alignItems: 'center', elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4,
  },
  hijriLeft: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  hijriLabel: { fontSize: 11, marginBottom: 2 },
  hijriValue: { fontSize: 14, fontWeight: '600' },
  hijriArabic: { fontSize: 13, fontWeight: '500', marginTop: 1 },
  divider: { width: 1, height: 50, marginHorizontal: 12 },
  ramadanRight: { flex: 1, alignItems: 'center' },
  ramadanDays: { fontSize: 28, fontWeight: 'bold', lineHeight: 32 },
  ramadanLabel: { fontSize: 11, textAlign: 'center' },
  ramadanActive: { fontSize: 13, fontWeight: '700', textAlign: 'center', marginTop: 4 },
  // Prayer
  loader: { marginTop: 32 },
  errorContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 32 },
  errorText: { fontSize: 16, marginBottom: 16, textAlign: 'center' },
  retryButton: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  retryButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  locationContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  locationText: { fontSize: 14 },
  nextPrayerCard: { borderRadius: 14, padding: 16, marginBottom: 14, alignItems: 'center' },
  nextPrayerLabel: { color: 'white', fontSize: 13, fontWeight: '600', marginBottom: 4 },
  nextPrayerName: { color: 'white', fontSize: 26, fontWeight: 'bold', marginBottom: 4 },
  nextPrayerTime: { color: 'white', fontSize: 20, marginBottom: 14 },
  countdownContainer: { flexDirection: 'row', alignItems: 'center' },
  countdownLabel: { color: 'white', fontSize: 13, marginRight: 8 },
  countdownTime: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  prayerTimesContainer: { marginBottom: 14 },
  prayerTimeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 16, marginVertical: 4, borderRadius: 10, borderLeftWidth: 4 },
  prayerName: { fontSize: 16 },
  prayerTime: { fontSize: 16 },
  settingCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 10, marginVertical: 8 },
  settingLabel: { fontSize: 16 },
  settingsButton: { paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginVertical: 16 },
  settingsButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  religiousDayItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  religiousDayLeft: { flex: 1 },
  religiousDayName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  religiousDayDates: { fontSize: 13 },
  religiousDayRight: { alignItems: 'flex-end', marginLeft: 16 },
  religiousDayCount: { fontSize: 15, fontWeight: 'bold' }
});

export default PrayerTimesScreen;
