import React, { memo, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Pressable,
} from 'react-native';
import { Calendar } from 'lucide-react-native';
import { useToast } from '../../hooks/useToast';
import { useClaims } from '../../hooks/useClaims';
import { COLORS, CLAIMANTS } from '../../constants';
import { generateClaimId } from '../../utils/claim.utils';
import { formatDate, getTodayString } from '../../utils/date.utils';
import { validateAmount, validateDate } from '../../utils/validation.utils';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, Claim } from '../../types';
import DatePicker from 'react-native-date-picker';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button';
import { InfoBox } from '../../components/common/InfoBox';
import { Select } from '../../components/common/Select';
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SubmitClaim'>;
};

export const SubmitClaimScreen: React.FC<Props> = ({ navigation }) => {
  const [date, setDate] = useState(getTodayString());
  const [claimant, setClaimant] = useState('');
  const [amount, setAmount] = useState('');

  const { showToast } = useToast();
  const { addClaim } = useClaims();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSubmit = () => {
    if (!date || !claimant || !amount) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    if (!validateAmount(amount)) {
      showToast('Please enter a valid amount', 'error');
      return;
    }

    if (!validateDate(date)) {
      showToast('Date cannot be in the future', 'error');
      return;
    }

    const newClaim: Claim = {
      id: generateClaimId(),
      type: 'Reimbursement',
      date: formatDate(date),
      claimant,
      amount: parseFloat(amount),
      status: 'pending',
    };

    addClaim(newClaim);
    showToast('Claim submitted successfully!', 'success');
    navigation.navigate('ClaimCreated', { claimId: newClaim.id });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />

      <Header title="Submit Claim" onBack={handleGoBack} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInLeft.delay(100)} >
          <InfoBox
            type="info"
            message="Please fill in the details below to submit your claim."
          />
        </Animated.View>
        <Animated.View entering={FadeInLeft.delay(150)} >

          <DateCompo setDateFn={setDate} />
        </Animated.View>
        <Animated.View entering={FadeInLeft.delay(200)} >

          <Select
            label={'Claimant'}
            value={claimant || 'Select Claimant'}
            options={CLAIMANTS}
            onChange={setClaimant}
            required={true}
          />
        </Animated.View>
        <Animated.View entering={FadeInLeft.delay(250)} >
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Receipt Amount (RM) <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              keyboardType="decimal-pad"
              maxLength={10}
            />
          </View>
        </Animated.View>


        <Animated.View entering={FadeInLeft.delay(300)} >

          <InfoBox
            type="warning"
            message="Please check details above are correct"
          />
        </Animated.View>
        <Animated.View entering={FadeIn.delay(350)} >


          <Button title="Confirm Details & Submit Claim" onPress={handleSubmit} />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const DateCompo = memo(
  ({ setDateFn }: { setDateFn: (data: string) => void }) => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleCancel = () => setOpen(false);
    const handleConfirm = (selectedDate: Date) => {
      setOpen(false);
      setDate(selectedDate);
      setDateFn(selectedDate.toISOString()); // Assuming setDateFn expects string
    };

    return (
      <View style={styles.formGroup}>
        <Text style={styles.label}>
          Date of Treatment <Text style={styles.required}>*</Text>
        </Text>
        <Pressable style={styles.inputContainer} onPress={handleOpen}>
          <Calendar size={20} color={COLORS.gray[400]} />

          <Text style={styles.dateText}>
            {formatDate(date)}
          </Text>
        </Pressable>
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray[900],
    marginBottom: 8,
  },
  required: {
    color: COLORS.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  dateText: {
    color: COLORS.gray[800],
    fontSize: 16,
    marginLeft: 8,
    paddingVertical: 12,
  },

  amountInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});
