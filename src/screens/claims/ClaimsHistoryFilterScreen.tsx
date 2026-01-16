import React, { useState, memo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { COLORS, CLAIMANTS } from '../../constants';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button';
import { InfoBox } from '../../components/common/InfoBox';
import { Card } from '../../components/common/Card';
import { Select } from '../../components/common/Select';
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated';

type Props = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'ClaimsHistoryFilter'
  >;
};

export const ClaimsHistoryFilterScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedClaimant, setSelectedClaimant] = useState('All Claims');

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleViewHistory = useCallback(
    (claimant: string) => {
      navigation.navigate('ClaimsHistoryList', { claimant });
    },
    [navigation],
  );

  const handleViewSelectedHistory = useCallback(() => {
    handleViewHistory(selectedClaimant);
  }, [handleViewHistory, selectedClaimant]);

  const handleClaimantChange = useCallback((value: string) => {
    setSelectedClaimant(value);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />

      <Header title="Claims History" onBack={handleGoBack} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInLeft.delay(100)} >
          <InfoBox
            type="info"
            message="Select a family member to view their claims history."
          />
        </Animated.View>
        <Animated.View entering={FadeInLeft.delay(200)} >
          <Select
            label={'Select Claimant'}
            value={selectedClaimant || 'Select Claimant'}
            options={CLAIMANTS}
            onChange={handleClaimantChange}
          />
        </Animated.View>
        <Animated.View entering={FadeInLeft.delay(300)} >
          <Button
            title="View Claims History"
            onPress={handleViewSelectedHistory}
          />
        </Animated.View>
        <View style={styles.spacer} />
        <Animated.View
          entering={FadeIn.delay(400)}
        >
          <Card>
            <Text style={styles.sectionTitle}>Quick Access</Text>

            {CLAIMANTS.map((claimant, index) => (
              <Animated.View entering={FadeIn.delay(500 + index * 50)} >
                <QuickAccessItem
                  key={claimant}
                  claimant={claimant}
                  onPress={handleViewHistory}
                />
              </Animated.View>
            ))}
          </Card>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const QuickAccessItem = memo(
  ({
    claimant,
    onPress,
  }: {
    claimant: string;
    onPress: (c: string) => void;
  }) => {
    const handlePress = useCallback(() => onPress(claimant), [onPress, claimant]);
    return (
      <Button
        title={`${claimant.split(' ')[0]} ${claimant.split(' ')[1]} Claims`}
        variant="outline"
        onPress={handlePress}
        icon={<ChevronRight size={20} color={COLORS.primary} />}
        style={styles.quickAccessItem}
      />
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
  spacer: {
    height: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray[900],
    marginBottom: 16,
  },
  quickAccessItem: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});
