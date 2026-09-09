import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { useProfileStore } from '../store/useProfileStore';
import { useThemeStore } from '../store/useThemeStore';
import CustomHeader from '../components/common/CustomHeader';
import IslamicBackground from '../components/common/IslamicBackground';
import AppLogo from '../components/common/AppLogo';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { displayName, setDisplayName } = useProfileStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();

  const [draftName, setDraftName] = useState(displayName);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setDisplayName(draftName);
    setIsEditing(false);
    Keyboard.dismiss();
  };

  const handleCancel = () => {
    setDraftName(displayName);
    setIsEditing(false);
    Keyboard.dismiss();
  };

  const shortcuts: {
    id: string;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    screen: keyof RootStackParamList;
  }[] = [
    { id: 'favorites', label: t('favorites'), icon: 'heart', screen: 'Favorites' },
    { id: 'hatim', label: t('quick_hatim'), icon: 'book', screen: 'HatimTracker' },
    { id: 'reminders', label: t('reminders'), icon: 'notifications', screen: 'Reminders' },
    { id: 'settings', label: t('quick_settings'), icon: 'settings', screen: 'Settings' },
  ];

  return (
    <IslamicBackground>
      <View style={styles.container}>
        <CustomHeader title={t('profile')} transparent />

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoArea}>
            <AppLogo size={96} />
          </View>

          <View style={[styles.card, { backgroundColor: theme.cardBackgroundColor }]}>
            <Text style={[styles.label, { color: theme.textColor + '99' }]}>
              {t('display_name')}
            </Text>

            {isEditing ? (
              <>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: theme.textColor,
                      borderColor: theme.borderColor,
                      backgroundColor: theme.backgroundColor,
                    },
                  ]}
                  value={draftName}
                  onChangeText={setDraftName}
                  placeholder={t('name_placeholder')}
                  placeholderTextColor={theme.textColor + '66'}
                  autoFocus
                  maxLength={40}
                  returnKeyType="done"
                  onSubmitEditing={handleSave}
                />
                <View style={styles.editActions}>
                  <TouchableOpacity
                    style={[styles.secondaryButton, { borderColor: theme.borderColor }]}
                    onPress={handleCancel}
                  >
                    <Text style={[styles.secondaryButtonText, { color: theme.textColor }]}>
                      {t('cancel')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.primaryButton, { backgroundColor: theme.primaryColor }]}
                    onPress={handleSave}
                  >
                    <Text style={styles.primaryButtonText}>{t('save')}</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <TouchableOpacity
                style={styles.nameRow}
                onPress={() => setIsEditing(true)}
                activeOpacity={0.7}
              >
                <Text style={[styles.name, { color: theme.textColor }]} numberOfLines={1}>
                  {displayName || t('no_name')}
                </Text>
                <Ionicons name="pencil" size={18} color={theme.primaryColor} />
              </TouchableOpacity>
            )}
          </View>

          <Text style={[styles.hint, { color: theme.textColor + '80' }]}>
            {t('profile_local_only')}
          </Text>

          <View style={[styles.card, { backgroundColor: theme.cardBackgroundColor }]}>
            {shortcuts.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.shortcutRow,
                  index < shortcuts.length - 1 && {
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: theme.borderColor,
                  },
                ]}
                onPress={() => navigation.navigate(item.screen as any)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.shortcutIcon,
                    { backgroundColor: theme.primaryColor + '18' },
                  ]}
                >
                  <Ionicons name={item.icon} size={20} color={theme.primaryColor} />
                </View>
                <Text style={[styles.shortcutLabel, { color: theme.textColor }]}>
                  {item.label}
                </Text>
                <Ionicons name="chevron-forward" size={18} color={theme.textColor + '55'} />
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 60 }} />
        </ScrollView>
      </View>
    </IslamicBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingTop: 8 },
  logoArea: { alignItems: 'center', marginBottom: 24, marginTop: 8 },
  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: { flex: 1, fontSize: 20, fontWeight: '700', marginRight: 12 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  editActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 },
  secondaryButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 8,
  },
  secondaryButtonText: { fontSize: 15, fontWeight: '600' },
  primaryButton: { paddingHorizontal: 22, paddingVertical: 10, borderRadius: 12 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  hint: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 20,
    marginHorizontal: 4,
  },
  shortcutRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  shortcutIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  shortcutLabel: { flex: 1, fontSize: 16, fontWeight: '500' },
});

export default ProfileScreen;
