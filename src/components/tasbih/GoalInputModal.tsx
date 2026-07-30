import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { useThemeStore } from '../../store/useThemeStore';

interface GoalInputModalProps {
  visible: boolean;
  currentGoal: number | null;
  onClose: () => void;
  onSubmit: (goal: number | null) => void;
}

export const GoalInputModal: React.FC<GoalInputModalProps> = ({
  visible,
  currentGoal,
  onClose,
  onSubmit
}) => {
  const { t } = useTranslation();
  const { getThemeObject } = useThemeStore();
  const theme = getThemeObject();
  
  const [goalInput, setGoalInput] = useState(currentGoal?.toString() || '');
  
  const handleSubmit = () => {
    const parsedGoal = parseInt(goalInput, 10);
    if (!isNaN(parsedGoal) && parsedGoal > 0) {
      onSubmit(parsedGoal);
    } else if (goalInput === '') {
      onSubmit(null); // Clear goal if input is empty
    } else {
      // Invalid input, reset to current goal
      setGoalInput(currentGoal?.toString() || '');
      onClose();
    }
  };
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackgroundColor }]}>
            <Text style={[styles.modalTitle, { color: theme.textColor }]}>
              {t('tasbih_set_goal')}
            </Text>
            
            <TextInput
              style={[
                styles.input,
                { 
                  color: theme.textColor,
                  borderColor: theme.borderColor,
                  backgroundColor: theme.backgroundColor
                }
              ]}
              value={goalInput}
              onChangeText={setGoalInput}
              keyboardType="number-pad"
              placeholder={t('tasbih_custom_goal')}
              placeholderTextColor="#9CA3AF"
              autoFocus
            />
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton, { borderColor: theme.borderColor }]}
                onPress={onClose}
              >
                <Text style={[styles.buttonText, { color: theme.textColor }]}>
                  {t('cancel')}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.saveButton, { backgroundColor: theme.primaryColor }]}
                onPress={handleSubmit}
              >
                <Text style={[styles.buttonText, styles.saveButtonText]}>
                  {t('save')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  saveButton: {
    borderWidth: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: 'white',
  },
});

export default GoalInputModal;
