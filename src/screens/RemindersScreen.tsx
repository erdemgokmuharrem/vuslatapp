import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Switch,
  Alert,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { formatTimeString, dayShortName } from '../utils/formatTime';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { useReminderStore, Reminder } from '../store/useReminderStore';
import { useThemeStore } from '../store/useThemeStore';
import { safeKeyExtractor } from '../utils/keyGenerator';
import { registerForPushNotificationsAsync } from '../services/notificationService';
import CustomHeader from '../components/common/CustomHeader';

type RemindersScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const RemindersScreen = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<RemindersScreenNavigationProp>();
  const { 
    reminders, 
    toggleReminder,
    deleteReminder
  } = useReminderStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  const [selectedType, setSelectedType] = useState<Reminder['type'] | 'all'>('all');
  
  useEffect(() => {
    // Request notification permissions when the screen loads
    const requestPermissions = async () => {
      const granted = await registerForPushNotificationsAsync();
      if (!granted) {
        Alert.alert(
          t('permissions_required'),
          t('notifications_permission_message'),
          [{ text: t('ok') }]
        );
      }
    };
    
    requestPermissions();
  }, []);
  
  const filteredReminders = selectedType === 'all' 
    ? reminders 
    : reminders.filter(reminder => reminder.type === selectedType);
  
  const handleAddReminder = () => {
    navigation.navigate('AddReminder');
  };
  
  const handleToggleReminder = (id: string) => {
    toggleReminder(id);
  };
  
  const handleDeleteReminder = (id: string) => {
    Alert.alert(
      t('delete_reminder'),
      t('delete_reminder_confirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('delete'), 
          style: 'destructive',
          onPress: () => deleteReminder(id)
        }
      ]
    );
  };
  
  const renderReminderItem = ({ item }: { item: Reminder }) => {
    // Format time for display (HH:MM)
    const formattedTime = formatTimeString(item.time, i18n.language);

    // Format days
    const days = item.days.map((day) => dayShortName(day)).join(', ');
    
    // Get icon based on reminder type
    const getIcon = () => {
      switch (item.type) {
        case 'prayer':
          return 'moon-outline';
        case 'quran':
          return 'book-outline';
        case 'dua':
          return 'hand-right-outline';
        case 'ayah':
          return 'bookmark-outline';
        case 'hadith':
          return 'document-text-outline';
        case 'custom':
        default:
          return 'notifications-outline';
      }
    };
    
    return (
      <View style={[styles.reminderItem, { backgroundColor: theme.cardBackgroundColor }]}>
        <View style={styles.reminderHeader}>
          <View style={[styles.iconContainer, { backgroundColor: theme.primaryColor + '20' }]}>
            <Ionicons name={getIcon()} size={24} color={theme.primaryColor} />
          </View>
          
          <View style={styles.reminderInfo}>
            <Text style={[styles.reminderTitle, { color: theme.textColor }]}>
              {item.title}
            </Text>
            <Text style={[styles.reminderTime, { color: theme.textColor + '99' }]}>
              {formattedTime} • {days}
            </Text>
          </View>
          
          <Switch
            value={item.enabled}
            onValueChange={() => handleToggleReminder(item.id)}
            trackColor={{ false: '#767577', true: theme.primaryColor }}
            thumbColor="#f4f3f4"
          />
        </View>
        
        <Text style={[styles.reminderBody, { color: theme.textColor + 'CC' }]}>
          {item.body}
        </Text>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteReminder(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color={theme.textColor + '99'} />
        </TouchableOpacity>
      </View>
    );
  };
  
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="notifications-off-outline" size={64} color={theme.textColor + '40'} />
      <Text style={[styles.emptyText, { color: theme.textColor + '80' }]}>
        {t('no_reminders')}
      </Text>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.primaryColor }]}
        onPress={handleAddReminder}
      >
        <Text style={styles.addButtonText}>{t('add_reminder')}</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <CustomHeader
        title={t('reminders', 'Hatırlatıcılar')}
        showBackButton
        rightActions={[
          { icon: 'add-circle-outline', onPress: handleAddReminder }
        ]}
        transparent
      />
      
      <View style={styles.filterContainer}>
        <ScrollableFilter
          options={[
            { value: 'all', label: t('all') },
            { value: 'prayer', label: t('prayer') },
            { value: 'quran', label: t('quran') },
            { value: 'dua', label: t('dua') },
            { value: 'ayah', label: t('ayah') },
            { value: 'hadith', label: t('hadith') },
            { value: 'custom', label: t('custom') },
          ]}
          selectedValue={selectedType}
          onSelect={(value) => setSelectedType(value as Reminder['type'] | 'all')}
          theme={theme}
        />
      </View>
      
      <FlatList
        data={filteredReminders}
        renderItem={renderReminderItem}
        keyExtractor={(item, index) => safeKeyExtractor(item, index, 'reminder')}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// Scrollable filter component
interface FilterOption {
  value: string;
  label: string;
}

interface ScrollableFilterProps {
  options: FilterOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  theme: any;
}

const ScrollableFilter: React.FC<ScrollableFilterProps> = ({ 
  options, 
  selectedValue, 
  onSelect,
  theme
}) => {
  return (
    <FlatList
      data={options}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.value}
      contentContainerStyle={styles.filterList}
      renderItem={({ item }) => {
        const isSelected = selectedValue === item.value;
        return (
          <TouchableOpacity
            style={[
              styles.filterItem,
              { 
                backgroundColor: isSelected ? theme.primaryColor : theme.cardBackgroundColor,
              }
            ]}
            onPress={() => onSelect(item.value)}
          >
            <Text 
              style={[
                styles.filterText, 
                { color: isSelected ? 'white' : theme.textColor }
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
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
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterContainer: {
    marginVertical: 8,
  },
  filterList: {
    paddingHorizontal: 16,
  },
  filterItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  reminderItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  reminderTime: {
    fontSize: 14,
  },
  reminderBody: {
    fontSize: 14,
    marginBottom: 8,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    marginVertical: 16,
  },
  addButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RemindersScreen;
