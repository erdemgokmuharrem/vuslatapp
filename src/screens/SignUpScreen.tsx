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
  Alert,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SignUpScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const { signUp, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  useEffect(() => {
    // If user is already authenticated, navigate to Main
    if (isAuthenticated) {
      navigation.replace('Main', {} as any);
    }
  }, [isAuthenticated, navigation]);
  
  useEffect(() => {
    // Show error alert if there's an error
    if (error) {
      Alert.alert(t('error'), error, [
        { text: t('ok'), onPress: clearError }
      ]);
    }
  }, [error]);
  
  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert(t('error'), t('fill_all_fields'));
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert(t('error'), t('passwords_dont_match'));
      return;
    }
    
    await signUp(email, password, name);
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
        <Text style={[styles.title, { color: theme.textColor }]}>{t('sign_up')}</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textColor }]}>{t('name')}</Text>
            <TextInput
              style={[styles.input, { color: theme.textColor, borderColor: theme.textColor + '30' }]}
              value={name}
              onChangeText={setName}
              placeholder={t('name_placeholder')}
              placeholderTextColor={theme.textColor + '80'}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textColor }]}>{t('email')}</Text>
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
            <Text style={[styles.label, { color: theme.textColor }]}>{t('password')}</Text>
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
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textColor }]}>{t('confirm_password')}</Text>
            <View style={[styles.passwordContainer, { borderColor: theme.textColor + '30' }]}>
              <TextInput
                style={[styles.passwordInput, { color: theme.textColor }]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder={t('confirm_password_placeholder')}
                placeholderTextColor={theme.textColor + '80'}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color={theme.textColor + '80'}
                />
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity
            style={[styles.signUpButton, { backgroundColor: theme.primaryColor }]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.signUpButtonText}>{t('sign_up')}</Text>
            )}
          </TouchableOpacity>
          
          <View style={styles.signInContainer}>
            <Text style={[styles.signInText, { color: theme.textColor }]}>
              {t('already_have_account')}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={[styles.signInLink, { color: theme.primaryColor }]}>
                {t('sign_in')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 24,
    paddingTop: 16,
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
  signUpButton: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  signInText: {
    fontSize: 14,
    marginRight: 4,
  },
  signInLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SignUpScreen;
