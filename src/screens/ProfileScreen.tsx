import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { user, isLoading, error, clearError, updateProfile, signOut } = useAuthStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    // Show error alert if there's an error
    if (error) {
      Alert.alert(t('error'), error, [
        { text: t('ok'), onPress: clearError }
      ]);
    }
  }, [error]);
  
  const handleUpdateProfile = async () => {
    if (!displayName.trim()) {
      Alert.alert(t('error'), t('name_required'));
      return;
    }
    
    await updateProfile(displayName, user?.photoURL || null);
    setIsEditing(false);
  };
  
  const handleSignOut = async () => {
    Alert.alert(
      t('sign_out'),
      t('sign_out_confirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('sign_out'), 
          style: 'destructive',
          onPress: async () => {
            await signOut();
            navigation.replace('Auth');
          }
        }
      ]
    );
  };
  
  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme.primaryColor} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.textColor }]}>{t('profile')}</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <View style={styles.notSignedInContainer}>
          <Ionicons name="person-outline" size={64} color={theme.textColor + '40'} />
          <Text style={[styles.notSignedInText, { color: theme.textColor }]}>
            {t('not_signed_in')}
          </Text>
          <TouchableOpacity
            style={[styles.signInButton, { backgroundColor: theme.primaryColor }]}
            onPress={() => navigation.navigate('Auth')}
          >
            <Text style={styles.signInButtonText}>{t('sign_in')}</Text>
          </TouchableOpacity>
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
        <Text style={[styles.title, { color: theme.textColor }]}>{t('profile')}</Text>
        {isEditing ? (
          <TouchableOpacity onPress={handleUpdateProfile} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color={theme.primaryColor} />
            ) : (
              <Text style={[styles.saveButton, { color: theme.primaryColor }]}>{t('save')}</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Ionicons name="create-outline" size={24} color={theme.primaryColor} />
          </TouchableOpacity>
        )}
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.profileImageContainer}>
          {user.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
          ) : (
            <View 
              style={[
                styles.profileImagePlaceholder, 
                { backgroundColor: theme.primaryColor + '30' }
              ]}
            >
              <Text 
                style={[
                  styles.profileImagePlaceholderText, 
                  { color: theme.primaryColor }
                ]}
              >
                {displayName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.infoSection}>
          <Text style={[styles.infoLabel, { color: theme.textColor + '99' }]}>
            {t('display_name')}
          </Text>
          {isEditing ? (
            <TextInput
              style={[
                styles.infoInput, 
                { 
                  color: theme.textColor,
                  borderColor: theme.textColor + '30',
                  backgroundColor: theme.cardBackgroundColor,
                }
              ]}
              value={displayName}
              onChangeText={setDisplayName}
              placeholder={t('name_placeholder')}
              placeholderTextColor={theme.textColor + '80'}
            />
          ) : (
            <Text style={[styles.infoValue, { color: theme.textColor }]}>
              {user.displayName || t('no_name')}
            </Text>
          )}
        </View>
        
        <View style={styles.infoSection}>
          <Text style={[styles.infoLabel, { color: theme.textColor + '99' }]}>
            {t('email')}
          </Text>
          <Text style={[styles.infoValue, { color: theme.textColor }]}>
            {user.email}
          </Text>
        </View>
        
        <TouchableOpacity
          style={[styles.signOutButton, { borderColor: theme.primaryColor }]}
          onPress={handleSignOut}
        >
          <Text style={[styles.signOutButtonText, { color: theme.primaryColor }]}>
            {t('sign_out')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImagePlaceholderText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 24,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  infoInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  signOutButton: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginTop: 16,
  },
  signOutButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  notSignedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  notSignedInText: {
    fontSize: 16,
    marginVertical: 16,
    textAlign: 'center',
  },
  signInButton: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    marginTop: 16,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
