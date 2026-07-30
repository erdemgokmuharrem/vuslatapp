export type ThemeType = 'light' | 'dark' | 'islamic-green' | 'night-blue' | 'golden-mosque' | 'desert-sand' | 'ocean-blue' | 'forest-green' | 'royal-purple' | 'sunset-orange';

export interface Theme {
  id: ThemeType;
  name: string;
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  cardBackgroundColor: string;
  borderColor: string;
}

export const colors = {
  // Primary green palette - Islamic green theme
  primaryGreen: '#2E7D32',      // Main Islamic green
  lightGreen: '#4CAF50',        // Lighter green for highlights
  darkGreen: '#1B5E20',         // Darker green for depth
  veryLightGreen: '#C8E6C9',    // Very light green for backgrounds
  
  // Neutral colors
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  mediumGray: '#E0E0E0',
  darkGray: '#757575',
  black: '#212121',
  
  // Background colors
  backgroundLight: '#FAFAFA',
  backgroundDark: '#1E1E1E',
  cardLight: '#FFFFFF',
  cardDark: '#2D2D2D',
  
  // Status colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Islamic themed colors
  goldAccent: '#FFD700',        // For special highlights
  creamBackground: '#FFF8E1',   // Warm background
  mintAccent: '#E8F5E8',        // Soft mint for cards
  
  // Additional theme colors
  mosqueGold: '#D4AF37',        // Golden mosque theme
  desertSand: '#F4A460',        // Desert sand theme
  oceanBlue: '#006994',         // Ocean blue theme
  forestGreen: '#228B22',       // Forest green theme
  royalPurple: '#663399',       // Royal purple theme
  sunsetOrange: '#FF6347',      // Sunset orange theme
  
  // Complementary colors
  warmCream: '#FFF8DC',
  coolMint: '#F0FFF0',
  deepNavy: '#191970',
  richBrown: '#8B4513',
  lavender: '#E6E6FA',
  peach: '#FFEAA7',
};

export const islamicGreenTheme: Theme = {
  id: 'islamic-green' as ThemeType,
  name: 'Islamic Green',
  primaryColor: colors.primaryGreen,
  secondaryColor: colors.lightGreen,        // Light green for secondary
  accentColor: colors.darkGreen,            // Dark green for accents
  backgroundColor: colors.backgroundLight,
  cardBackgroundColor: colors.cardLight,
  borderColor: colors.mediumGray,
  textColor: colors.black,
};

export const themes: Record<ThemeType, Theme> = {
  'light': {
    id: 'light',
    name: 'Light',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    primaryColor: '#3d8c47',
    secondaryColor: '#4f75b8',
    accentColor: '#efa506',
    cardBackgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
  },
  'dark': {
    id: 'dark',
    name: 'Dark',
    backgroundColor: '#1F2937',
    textColor: '#F9FAFB',
    primaryColor: '#5eaa66',
    secondaryColor: '#7094cb',
    accentColor: '#fcc41d',
    cardBackgroundColor: '#374151',
    borderColor: '#4B5563',
  },
  'islamic-green': islamicGreenTheme,
  'night-blue': {
    id: 'night-blue',
    name: 'Night Blue',
    backgroundColor: '#1c243a',
    textColor: '#F9FAFB',
    primaryColor: '#4f75b8',
    secondaryColor: '#7094cb',
    accentColor: '#fcc41d',
    cardBackgroundColor: '#2a3858',
    borderColor: '#334b7f',
  },
  'golden-mosque': {
    id: 'golden-mosque',
    name: 'Golden Mosque',
    backgroundColor: colors.warmCream,
    textColor: colors.richBrown,
    primaryColor: colors.mosqueGold,
    secondaryColor: colors.goldAccent,
    accentColor: colors.richBrown,
    cardBackgroundColor: colors.white,
    borderColor: colors.mosqueGold + '40',
  },
  'desert-sand': {
    id: 'desert-sand',
    name: 'Desert Sand',
    backgroundColor: colors.peach,
    textColor: colors.richBrown,
    primaryColor: colors.desertSand,
    secondaryColor: colors.sunsetOrange,
    accentColor: colors.mosqueGold,
    cardBackgroundColor: colors.warmCream,
    borderColor: colors.desertSand + '60',
  },
  'ocean-blue': {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    backgroundColor: colors.coolMint,
    textColor: colors.deepNavy,
    primaryColor: colors.oceanBlue,
    secondaryColor: colors.info,
    accentColor: colors.deepNavy,
    cardBackgroundColor: colors.white,
    borderColor: colors.oceanBlue + '40',
  },
  'forest-green': {
    id: 'forest-green',
    name: 'Forest Green',
    backgroundColor: colors.mintAccent,
    textColor: colors.black,
    primaryColor: colors.forestGreen,
    secondaryColor: colors.success,
    accentColor: colors.darkGreen,
    cardBackgroundColor: colors.white,
    borderColor: colors.forestGreen + '40',
  },
  'royal-purple': {
    id: 'royal-purple',
    name: 'Royal Purple',
    backgroundColor: colors.lavender,
    textColor: colors.black,
    primaryColor: colors.royalPurple,
    secondaryColor: colors.goldAccent,
    accentColor: colors.deepNavy,
    cardBackgroundColor: colors.white,
    borderColor: colors.royalPurple + '40',
  },
  'sunset-orange': {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    backgroundColor: colors.peach,
    textColor: colors.richBrown,
    primaryColor: colors.sunsetOrange,
    secondaryColor: colors.warning,
    accentColor: colors.mosqueGold,
    cardBackgroundColor: colors.warmCream,
    borderColor: colors.sunsetOrange + '40',
  },
};
