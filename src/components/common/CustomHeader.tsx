import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '../../store/useThemeStore';
import { useTranslation } from 'react-i18next';

interface HeaderAction {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    badge?: number;
}

interface CustomHeaderProps {
    title: string;
    showBackButton?: boolean;
    onBackPress?: () => void;
    rightActions?: HeaderAction[];
    transparent?: boolean;
    centerTitle?: boolean;
    subtitle?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
    title,
    showBackButton,
    onBackPress,
    rightActions = [],
    transparent = false,
    centerTitle = false,
    subtitle,
}) => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    // Yığına (stack) itilmiş ekranlarda geri butonu varsayılan olarak görünür;
    // sekme kök ekranlarında geri gidilecek yer olmadığı için görünmez.
    // Açıkça verilen showBackButton her zaman önceliklidir.
    const canPop = useNavigationState((state) => state.type === 'stack' && state.index > 0);
    const shouldShowBack = showBackButton ?? canPop;
    const { getThemeObject } = useThemeStore();
    const theme = getThemeObject();
    const insets = useSafeAreaInsets();

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    const statusBarHeight = Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight || 0;

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: statusBarHeight + 8,
                    backgroundColor: transparent ? 'transparent' : theme.cardBackgroundColor,
                },
            ]}
        >
            <View style={styles.content}>
                {/* Left Section - Back Button */}
                <View style={styles.leftSection}>
                    {shouldShowBack && (
                        <TouchableOpacity
                            style={[styles.backButton, { backgroundColor: theme.primaryColor + '15' }]}
                            onPress={handleBackPress}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            accessibilityRole="button"
                            accessibilityLabel={t('back')}
                        >
                            <Ionicons name="chevron-back" size={24} color={theme.primaryColor} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Center Section - Title */}
                <View style={[styles.centerSection, centerTitle && styles.centerSectionCentered]}>
                    <Text
                        style={[
                            styles.title,
                            { color: theme.textColor },
                            centerTitle && styles.centeredTitle,
                        ]}
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                    {subtitle && (
                        <Text style={[styles.subtitle, { color: theme.textColor + '80' }]} numberOfLines={1}>
                            {subtitle}
                        </Text>
                    )}
                </View>

                {/* Right Section - Actions */}
                <View style={styles.rightSection}>
                    {rightActions.map((action, index) => (
                        <TouchableOpacity
                            key={`action-${index}`}
                            style={[styles.actionButton, { backgroundColor: theme.primaryColor + '15' }]}
                            onPress={action.onPress}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons name={action.icon} size={22} color={theme.primaryColor} />
                            {action.badge !== undefined && action.badge > 0 && (
                                <View style={[styles.badge, { backgroundColor: theme.primaryColor }]}>
                                    <Text style={styles.badgeText}>
                                        {action.badge > 99 ? '99+' : action.badge}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 44,
    },
    leftSection: {
        minWidth: 44,
        alignItems: 'flex-start',
    },
    centerSection: {
        flex: 1,
        paddingHorizontal: 8,
    },
    centerSectionCentered: {
        alignItems: 'center',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        minWidth: 44,
        gap: 8,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    centeredTitle: {
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        marginTop: 2,
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default CustomHeader;
