import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import AppLogo from '../components/common/AppLogo';

import { RootStackParamList } from '../navigation/types';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';

type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AuthScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const { isAuthenticated } = useAuthStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  useEffect(() => {
    // If user is already authenticated, navigate to Main
    if (isAuthenticated) {
      navigation.navigate('Main', { screen: 'More' });
    }
  }, [isAuthenticated]);
  
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textColor }]}>{t('welcome')}</Text>
      </View>
      
      <View style={styles.logoContainer}>
        <AppLogo size={120} />
        <Text style={[styles.tagline, { color: theme.textColor }]}>
          {t('app_tagline')}
        </Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.signInButton, { backgroundColor: theme.primaryColor }]}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.signInButtonText}>{t('auth_sign_in')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.signUpButton, { borderColor: theme.primaryColor }]}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={[styles.signUpButtonText, { color: theme.primaryColor }]}>
            {t('auth_sign_up')}
          </Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate('Main', { screen: 'More' })}
      >
        <Text style={[styles.skipButtonText, { color: theme.textColor + '99' }]}>
          {t('auth_continue_without_account')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 40,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  buttonsContainer: {
    paddingHorizontal: 32,
    paddingBottom: 24,
  },
  signInButton: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpButton: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 16,
  },
  skipButtonText: {
    fontSize: 14,
  },
});

export default AuthScreen;
