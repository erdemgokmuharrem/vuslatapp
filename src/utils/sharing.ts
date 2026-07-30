import { Share, Alert } from 'react-native';
import logger from './logger';

/**
 * Sharing utilities for Ayah, Hadith, and other Islamic content
 */

interface ShareableContent {
  arabic?: string;
  translation?: string;
  transliteration?: string;
  reference?: string;
  type: 'ayah' | 'hadith' | 'dua' | 'general';
}

class SharingManager {
  private static instance: SharingManager;

  static getInstance(): SharingManager {
    if (!SharingManager.instance) {
      SharingManager.instance = new SharingManager();
    }
    return SharingManager.instance;
  }

  // Format content for sharing
  private formatContent(content: ShareableContent): string {
    let formattedText = '';

    // Add Arabic text if available
    if (content.arabic) {
      formattedText += `${content.arabic}\n\n`;
    }

    // Add transliteration if available
    if (content.transliteration) {
      formattedText += `${content.transliteration}\n\n`;
    }

    // Add translation
    if (content.translation) {
      formattedText += `${content.translation}\n\n`;
    }

    // Add reference
    if (content.reference) {
      formattedText += `📖 ${content.reference}\n\n`;
    }

    // Add app signature
    formattedText += '🕌 Zmatik - İslami Uygulama ile paylaşıldı';

    return formattedText;
  }

  // Share Ayah
  async shareAyah(
    arabic: string,
    translation: string,
    surahName: string,
    ayahNumber: number,
    transliteration?: string
  ): Promise<boolean> {
    try {
      const content: ShareableContent = {
        arabic,
        translation,
        transliteration,
        reference: `${surahName}, Ayet ${ayahNumber}`,
        type: 'ayah',
      };

      const message = this.formatContent(content);
      
      const result = await Share.share({
        message,
        title: `${surahName} - Ayet ${ayahNumber}`,
      });

      return result.action === Share.sharedAction;
    } catch (error) {
      logger.error('Error sharing ayah:', error);
      Alert.alert('Hata', 'Paylaşım sırasında bir hata oluştu.');
      return false;
    }
  }

  // Share Hadith
  async shareHadith(
    arabic: string,
    translation: string,
    source: string,
    transliteration?: string
  ): Promise<boolean> {
    try {
      const content: ShareableContent = {
        arabic,
        translation,
        transliteration,
        reference: source,
        type: 'hadith',
      };

      const message = this.formatContent(content);
      
      const result = await Share.share({
        message,
        title: 'Hadis Paylaşımı',
      });

      return result.action === Share.sharedAction;
    } catch (error) {
      logger.error('Error sharing hadith:', error);
      Alert.alert('Hata', 'Paylaşım sırasında bir hata oluştu.');
      return false;
    }
  }

  // Share Dua
  async shareDua(
    arabic: string,
    translation: string,
    duaName: string,
    transliteration?: string
  ): Promise<boolean> {
    try {
      const content: ShareableContent = {
        arabic,
        translation,
        transliteration,
        reference: duaName,
        type: 'dua',
      };

      const message = this.formatContent(content);
      
      const result = await Share.share({
        message,
        title: `${duaName} Duası`,
      });

      return result.action === Share.sharedAction;
    } catch (error) {
      logger.error('Error sharing dua:', error);
      Alert.alert('Hata', 'Paylaşım sırasında bir hata oluştu.');
      return false;
    }
  }

  // Share general content
  async shareContent(
    title: string,
    content: string,
    reference?: string
  ): Promise<boolean> {
    try {
      let message = content;
      
      if (reference) {
        message += `\n\n📖 ${reference}`;
      }
      
      message += '\n\n🕌 Zmatik - İslami Uygulama ile paylaşıldı';
      
      const result = await Share.share({
        message,
        title,
      });

      return result.action === Share.sharedAction;
    } catch (error) {
      logger.error('Error sharing content:', error);
      Alert.alert('Hata', 'Paylaşım sırasında bir hata oluştu.');
      return false;
    }
  }

  // Share app
  async shareApp(): Promise<boolean> {
    try {
      const message = `🕌 Zmatik - İslami Uygulama

Namaz vakitleri, Kuran okuma, tesbih, dua ve daha fazlası için mükemmel bir İslami uygulama!

📱 İndir: [App Store/Google Play Link]`;

      const result = await Share.share({
        message,
        title: 'Zmatik - İslami Uygulama',
      });

      return result.action === Share.sharedAction;
    } catch (error) {
      logger.error('Error sharing app:', error);
      Alert.alert('Hata', 'Paylaşım sırasında bir hata oluştu.');
      return false;
    }
  }

  // Create shareable image text (for future implementation)
  createShareableImageText(content: ShareableContent): string {
    return this.formatContent(content);
  }
}

export const sharingManager = SharingManager.getInstance();
export default sharingManager;
