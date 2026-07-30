import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import IslamicBackground from '../components/common/IslamicBackground';

import { RootStackParamList } from '../navigation/types';
import { useThemeStore } from '../store/useThemeStore';
import { getGuideContent } from '../data/guideData';

type GuideDetailScreenRouteProp = RouteProp<RootStackParamList, 'GuideDetail'>;
type GuideDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const GuideDetailScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<GuideDetailScreenNavigationProp>();
  const route = useRoute<GuideDetailScreenRouteProp>();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();

  const { guideId, title } = route.params;
  const guideContent = getGuideContent(guideId);

  if (!guideContent) {
    return (
      <IslamicBackground>
        <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={theme.primaryColor} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.textColor }]}>
              {title}
            </Text>
            <View style={{ width: 24 }} />
          </View>
          <View style={styles.content}>
            <Text style={[styles.errorText, { color: theme.textColor }]}>
              Bu rehber içeriği henüz hazırlanmamış.
            </Text>
          </View>
        </SafeAreaView>
      </IslamicBackground>
    );
  }

  return (
    <IslamicBackground>
      <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme.primaryColor} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.textColor }]}>
            {guideContent.title}
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Main description */}
          <View style={[styles.contentCard, { backgroundColor: theme.cardBackgroundColor }]}>
            <Text style={[styles.contentText, { color: theme.textColor }]}>
              {guideContent.content}
            </Text>
          </View>

          {/* Sections */}
          {guideContent.sections?.map((section, index) => (
            <View 
              key={index} 
              style={[styles.sectionCard, { backgroundColor: theme.cardBackgroundColor }]}
            >
              <Text style={[styles.sectionTitle, { color: theme.primaryColor }]}>
                {section.title}
              </Text>
              
              <Text style={[styles.sectionContent, { color: theme.textColor }]}>
                {section.content}
              </Text>

              {section.arabic && (
                <View style={styles.arabicContainer}>
                  <Text style={[styles.arabicText, { color: theme.textColor }]}>
                    {section.arabic}
                  </Text>
                </View>
              )}

              {section.transliteration && (
                <View style={styles.transliterationContainer}>
                  <Text style={[styles.transliterationText, { color: theme.textColor + '80' }]}>
                    {section.transliteration}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </IslamicBackground>
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  sectionCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  arabicContainer: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  arabicText: {
    fontSize: 18,
    textAlign: 'right',
    lineHeight: 28,
    fontFamily: 'System',
  },
  transliterationContainer: {
    backgroundColor: 'rgba(76, 175, 80, 0.05)',
    padding: 12,
    borderRadius: 8,
  },
  transliterationText: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
