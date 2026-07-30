import { StyleSheet } from 'react-native';

// Global style constants for consistency
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const FONT_WEIGHTS = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const ICON_SIZES = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 48,
};

// Minimum tap area for accessibility
export const MIN_TAP_AREA = 44;

// Global styles that can be reused across components
export const globalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  
  // Padding
  paddingXS: { padding: SPACING.xs },
  paddingSM: { padding: SPACING.sm },
  paddingMD: { padding: SPACING.md },
  paddingLG: { padding: SPACING.lg },
  paddingXL: { padding: SPACING.xl },
  
  // Margin
  marginXS: { margin: SPACING.xs },
  marginSM: { margin: SPACING.sm },
  marginMD: { margin: SPACING.md },
  marginLG: { margin: SPACING.lg },
  marginXL: { margin: SPACING.xl },
  
  // Typography
  textXS: { fontSize: FONT_SIZES.xs },
  textSM: { fontSize: FONT_SIZES.sm },
  textMD: { fontSize: FONT_SIZES.md },
  textLG: { fontSize: FONT_SIZES.lg },
  textXL: { fontSize: FONT_SIZES.xl },
  textXXL: { fontSize: FONT_SIZES.xxl },
  
  textNormal: { fontWeight: FONT_WEIGHTS.normal },
  textMedium: { fontWeight: FONT_WEIGHTS.medium },
  textSemibold: { fontWeight: FONT_WEIGHTS.semibold },
  textBold: { fontWeight: FONT_WEIGHTS.bold },
  
  textCenter: { textAlign: 'center' },
  textLeft: { textAlign: 'left' },
  textRight: { textAlign: 'right' },
  
  // Common button styles
  button: {
    minHeight: MIN_TAP_AREA,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  buttonLarge: {
    minHeight: MIN_TAP_AREA + 8,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  
  // Card styles
  card: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  
  // Shadow styles
  shadowSM: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  
  shadowMD: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  shadowLG: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default globalStyles;
