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

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const { resetPassword, isLoading, error, clearError } = useAuthStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  
  useEffect(() => {
    // Show error alert if there's an error
    if (error) {
      Alert.alert(t('error'), error, [
        { text: t('ok'), onPress: clearError }
      ]);
    }
  }, [error]);
  
  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert(t('error'), t('email_required'));
      return;
    }
    
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (error) {
      // Error is handled by the store
    }
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
        <Text style={[styles.title, { color: theme.textColor }]}>{t('forgot_password')}</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.formContainer}>
        {resetSent ? (
          <View style={styles.successContainer}>
            <Ionicons name="mail-outline" size={64} color={theme.primaryColor} />
            <Text style={[styles.successTitle, { color: theme.textColor }]}>
              {t('reset_email_sent')}
            </Text>
            <Text style={[styles.successText, { color: theme.textColor + '99' }]}>
              {t('reset_email_instructions')}
            </Text>
            <TouchableOpacity
              style={[styles.backToSignInButton, { backgroundColor: theme.primaryColor }]}
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text style={styles.backToSignInButtonText}>{t('back_to_sign_in')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={[styles.instructions, { color: theme.textColor }]}>
              {t('reset_password_instructions')}
            </Text>
            
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
            
            <TouchableOpacity
              style={[styles.resetButton, { backgroundColor: theme.primaryColor }]}
              onPress={handleResetPassword}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.resetButtonText}>{t('reset_password')}</Text>
              )}
            </TouchableOpacity>
          </>
        )}
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
  instructions: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 24,
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
  resetButton: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  successText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  backToSignInButton: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  backToSignInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;
