import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';

type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SignInScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const { signIn, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    // If user is already authenticated, navigate to Main
    if (isAuthenticated) {
      navigation.navigate('Main', { screen: 'More' });
    }
  }, [isAuthenticated]);
  
  useEffect(() => {
    // Show error alert if there's an error
    if (error) {
      Alert.alert(t('error'), error, [
        { text: t('ok'), onPress: clearError }
      ]);
    }
  }, [error]);
  
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert(t('error'), t('fill_all_fields'));
      return;
    }
    
    await signIn(email, password);
  };
  
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
  
  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.primaryColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.textColor }]}>{t('auth_sign_in')}</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.textColor }]}>{t('auth_email')}</Text>
          <TextInput
            style={[styles.input, { color: theme.textColor, borderColor: theme.textColor + '30' }]}
            value={email}
            onChangeText={setEmail}
            placeholder={t('email_placeholder')}
            placeholderTextColor={theme.textColor + '80'}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.textColor }]}>{t('auth_password')}</Text>
          <View style={[styles.passwordContainer, { borderColor: theme.textColor + '30' }]}>
            <TextInput
              style={[styles.passwordInput, { color: theme.textColor }]}
              value={password}
              onChangeText={setPassword}
              placeholder={t('password_placeholder')}
              placeholderTextColor={theme.textColor + '80'}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color={theme.textColor + '80'}
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={handleForgotPassword}
        >
          <Text style={[styles.forgotPasswordText, { color: theme.primaryColor }]}>
            {t('auth_forgot_password')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.signInButton, { backgroundColor: theme.primaryColor }]}
          onPress={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.signInButtonText}>{t('auth_sign_in')}</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.signUpContainer}>
          <Text style={[styles.signUpText, { color: theme.textColor }]}>
            {t('auth_no_account')}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.signUpLink, { color: theme.primaryColor }]}>
              {t('auth_sign_up')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  eyeButton: {
    padding: 4,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  signInButton: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    marginRight: 4,
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SignInScreen;
