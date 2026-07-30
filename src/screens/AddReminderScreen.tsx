import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { RootStackParamList } from '../navigation/types';
import { useReminderStore, Reminder } from '../store/useReminderStore';
import { useThemeStore } from '../store/useThemeStore';

type AddReminderScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AddReminderScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<AddReminderScreenNavigationProp>();
  const { addReminder } = useReminderStore();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  // Form state
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [type, setType] = useState<Reminder['type']>('custom');
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [days, setDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]); // All days selected by default
  const [enabled, setEnabled] = useState(true);
  
  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };
  
  const toggleDay = (day: number) => {
    if (days.includes(day)) {
      // Remove day if already selected
      setDays(days.filter(d => d !== day));
    } else {
      // Add day if not selected
      setDays([...days, day].sort());
    }
  };
  
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };
  
  const handleSave = async () => {
    // Validate form
    if (!title.trim()) {
      Alert.alert(t('error'), t('title_required'));
      return;
    }
    
    if (days.length === 0) {
      Alert.alert(t('error'), t('select_days'));
      return;
    }
    
    // Format time as HH:MM
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    try {
      // Add reminder
      await addReminder({
        title,
        body,
        type,
        time: timeString,
        days,
        enabled,
      });
      
      // Navigate back
      navigation.goBack();
    } catch (error) {
      Alert.alert(t('error'), t('failed_to_add_reminder'));
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.primaryColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.textColor }]}>{t('add_reminder')}</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={[styles.saveButton, { color: theme.primaryColor }]}>{t('save')}</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.formGroup, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.label, { color: theme.textColor }]}>{t('title')}</Text>
          <TextInput
            style={[styles.input, { color: theme.textColor, borderColor: theme.textColor + '30' }]}
            value={title}
            onChangeText={setTitle}
            placeholder={t('reminder_title_placeholder')}
            placeholderTextColor={theme.textColor + '80'}
          />
        </View>
        
        <View style={[styles.formGroup, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.label, { color: theme.textColor }]}>{t('message')}</Text>
          <TextInput
            style={[
              styles.textArea, 
              { color: theme.textColor, borderColor: theme.textColor + '30' }
            ]}
            value={body}
            onChangeText={setBody}
            placeholder={t('reminder_message_placeholder')}
            placeholderTextColor={theme.textColor + '80'}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
        
        <View style={[styles.formGroup, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.label, { color: theme.textColor }]}>{t('type')}</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.typeContainer}
          >
            <TypeOption
              label={t('prayer')}
              value="prayer"
              icon="moon-outline"
              selected={type === 'prayer'}
              onSelect={() => setType('prayer')}
              theme={theme}
            />
            <TypeOption
              label={t('quran')}
              value="quran"
              icon="book-outline"
              selected={type === 'quran'}
              onSelect={() => setType('quran')}
              theme={theme}
            />
            <TypeOption
              label={t('dua')}
              value="dua"
              icon="hand-right-outline"
              selected={type === 'dua'}
              onSelect={() => setType('dua')}
              theme={theme}
            />
            <TypeOption
              label={t('ayah')}
              value="ayah"
              icon="bookmark-outline"
              selected={type === 'ayah'}
              onSelect={() => setType('ayah')}
              theme={theme}
            />
            <TypeOption
              label={t('hadith')}
              value="hadith"
              icon="document-text-outline"
              selected={type === 'hadith'}
              onSelect={() => setType('hadith')}
              theme={theme}
            />
            <TypeOption
              label={t('custom')}
              value="custom"
              icon="notifications-outline"
              selected={type === 'custom'}
              onSelect={() => setType('custom')}
              theme={theme}
            />
          </ScrollView>
        </View>
        
        <View style={[styles.formGroup, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.label, { color: theme.textColor }]}>{t('time')}</Text>
          <TouchableOpacity
            style={[styles.timeButton, { borderColor: theme.textColor + '30' }]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={[styles.timeText, { color: theme.textColor }]}>
              {formatTime(time)}
            </Text>
            <Ionicons name="time-outline" size={24} color={theme.primaryColor} />
          </TouchableOpacity>
          
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>
        
        <View style={[styles.formGroup, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.label, { color: theme.textColor }]}>{t('days')}</Text>
          <View style={styles.daysContainer}>
            <DayOption
              label="S"
              value={0}
              selected={days.includes(0)}
              onToggle={() => toggleDay(0)}
              theme={theme}
            />
            <DayOption
              label="M"
              value={1}
              selected={days.includes(1)}
              onToggle={() => toggleDay(1)}
              theme={theme}
            />
            <DayOption
              label="T"
              value={2}
              selected={days.includes(2)}
              onToggle={() => toggleDay(2)}
              theme={theme}
            />
            <DayOption
              label="W"
              value={3}
              selected={days.includes(3)}
              onToggle={() => toggleDay(3)}
              theme={theme}
            />
            <DayOption
              label="T"
              value={4}
              selected={days.includes(4)}
              onToggle={() => toggleDay(4)}
              theme={theme}
            />
            <DayOption
              label="F"
              value={5}
              selected={days.includes(5)}
              onToggle={() => toggleDay(5)}
              theme={theme}
            />
            <DayOption
              label="S"
              value={6}
              selected={days.includes(6)}
              onToggle={() => toggleDay(6)}
              theme={theme}
            />
          </View>
        </View>
        
        <View style={[styles.formGroup, { backgroundColor: theme.cardBackgroundColor }]}>
          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, { color: theme.textColor }]}>
              {t('enabled')}
            </Text>
            <Switch
              value={enabled}
              onValueChange={setEnabled}
              trackColor={{ false: '#767577', true: theme.primaryColor }}
              thumbColor="#f4f3f4"
            />
          </View>
        </View>
        
        <TouchableOpacity
          style={[styles.saveButtonLarge, { backgroundColor: theme.primaryColor }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>{t('save_reminder')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Type option component
interface TypeOptionProps {
  label: string;
  value: string;
  icon: string;
  selected: boolean;
  onSelect: () => void;
  theme: any;
}

const TypeOption: React.FC<TypeOptionProps> = ({ 
  label, 
  icon, 
  selected, 
  onSelect,
  theme
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.typeOption,
        { 
          backgroundColor: selected ? theme.primaryColor : theme.cardBackgroundColor,
          borderColor: selected ? 'transparent' : theme.textColor + '30',
        }
      ]}
      onPress={onSelect}
    >
      <Ionicons 
        name={icon as any} 
        size={24} 
        color={selected ? 'white' : theme.textColor} 
      />
      <Text 
        style={[
          styles.typeLabel, 
          { color: selected ? 'white' : theme.textColor }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// Day option component
interface DayOptionProps {
  label: string;
  value: number;
  selected: boolean;
  onToggle: () => void;
  theme: any;
}

const DayOption: React.FC<DayOptionProps> = ({ 
  label, 
  selected, 
  onToggle,
  theme
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.dayOption,
        { 
          backgroundColor: selected ? theme.primaryColor : 'transparent',
          borderColor: selected ? 'transparent' : theme.textColor + '30',
        }
      ]}
      onPress={onToggle}
    >
      <Text 
        style={[
          styles.dayLabel, 
          { color: selected ? 'white' : theme.textColor }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  textArea: {
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    fontSize: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  typeOption: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    width: 90,
  },
  typeLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  timeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  timeText: {
    fontSize: 16,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  dayOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonLarge: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddReminderScreen;
