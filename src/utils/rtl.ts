import { I18nManager } from 'react-native';

/**
 * RTL (Right-to-Left) utility functions for Arabic text support
 */

// Check if current language is RTL
export const isRTL = () => {
  return I18nManager.isRTL;
};

// Enable RTL layout
export const enableRTL = () => {
  if (!I18nManager.isRTL) {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }
};

// Disable RTL layout
export const disableRTL = () => {
  if (I18nManager.isRTL) {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
  }
};

// Get text alignment based on RTL
export const getTextAlign = (defaultAlign: 'left' | 'right' | 'center' = 'left') => {
  if (defaultAlign === 'center') return 'center';
  return isRTL() ? 'right' : 'left';
};

// Get flex direction for RTL
export const getFlexDirection = (defaultDirection: 'row' | 'row-reverse' = 'row') => {
  if (defaultDirection === 'row-reverse') {
    return isRTL() ? 'row' : 'row-reverse';
  }
  return isRTL() ? 'row-reverse' : 'row';
};

// Get margin/padding for RTL
export const getMarginStart = (value: number) => {
  return isRTL() ? { marginRight: value } : { marginLeft: value };
};

export const getMarginEnd = (value: number) => {
  return isRTL() ? { marginLeft: value } : { marginRight: value };
};

export const getPaddingStart = (value: number) => {
  return isRTL() ? { paddingRight: value } : { paddingLeft: value };
};

export const getPaddingEnd = (value: number) => {
  return isRTL() ? { paddingLeft: value } : { paddingRight: value };
};

// RTL-aware positioning
export const getPosition = (position: 'left' | 'right', value: number) => {
  if (position === 'left') {
    return isRTL() ? { right: value } : { left: value };
  } else {
    return isRTL() ? { left: value } : { right: value };
  }
};

export default {
  isRTL,
  enableRTL,
  disableRTL,
  getTextAlign,
  getFlexDirection,
  getMarginStart,
  getMarginEnd,
  getPaddingStart,
  getPaddingEnd,
  getPosition,
};
