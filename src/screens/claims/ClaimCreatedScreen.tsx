import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { CheckCircle, History } from 'lucide-react-native';
import { useClaims } from '../../hooks/useClaims';
import { COLORS } from '../../constants';
import { formatCurrency } from '../../utils/currency.utils';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/common/Card';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ClaimCreated'>;
  route: RouteProp<RootStackParamList, 'ClaimCreated'>;
};

export const ClaimCreatedScreen: React.FC<Props> = ({ navigation, route }) => {
  const { claimId } = route.params;
  const { getClaimById } = useClaims();
  const claim = getClaimById(claimId);
  const insets = useSafeAreaInsets();

  const handleGoToDashboard = useCallback(() => {
    navigation.navigate('Dashboard');
  }, [navigation]);

  const handleGoToHistory = useCallback(() => {
    navigation.navigate('ClaimsHistoryFilter');
  }, [navigation]);

  const containerStyle = useMemo(() => ([
    styles.container,
    { paddingTop: insets.top }
  ]), [insets.top]);

  if (!claim) {
    return (
      <View style={containerStyle}>
        <Text>Claim not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />

      <Header title="Claim Created" onBack={handleGoToDashboard} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentStyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.successCard}>
          <CheckCircle size={60} color={COLORS.success} />
          <Animated.Text entering={FadeIn.delay(100)} style={styles.successTitle}>Claim Created Successfully!</Animated.Text>
          <Animated.Text entering={FadeIn.delay(124)} style={styles.claimId}>{claim.id}</Animated.Text>
          <Animated.Text entering={FadeIn.delay(150)} style={styles.successSubtitle}>
            Please proceed to upload your receipt
          </Animated.Text>
        </View>

        {/* <Animated.View entering={FadeIn.delay(150)}> */}
        <Card>
          <Animated.Text entering={FadeIn.delay(200)} style={styles.summaryTitle}>Claim Summary</Animated.Text>

          <Animated.View entering={FadeIn.delay(225)} style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date of Treatment</Text>
            <Text style={styles.summaryValue}>{claim.date}</Text>
          </Animated.View>

          <Animated.View entering={FadeIn.delay(260)} style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Claimant</Text>
            <Text style={styles.summaryValue}>{claim.claimant}</Text>
          </Animated.View>

          <Animated.View entering={FadeIn.delay(300)} style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Receipt Amount</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(claim.amount)}
            </Text>
          </Animated.View>
        </Card>
        {/* </Animated.View> */}
        <View style={styles.buttonContainer}>
          <AnimatedTouchableOpacity
            entering={FadeInUp.delay(350)}
            style={styles.primaryButton}
            onPress={handleGoToHistory}
            activeOpacity={0.8}
          >
            <History size={20} color={COLORS.white} />
            <Text style={styles.primaryButtonText}>Go to Claims History</Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity
            entering={FadeInUp.delay(375)}
            style={styles.secondaryButton}
            onPress={handleGoToDashboard}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
          </AnimatedTouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
  },
  content: {
    flex: 1,
  },
  contentStyle: {
    padding: 20,
  },
  successCard: {
    backgroundColor: '#d1fae5',
    borderRadius: 9,
    padding: 40,
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#065f46',
    marginTop: 20,
    textAlign: 'center',
  },
  claimId: {
    fontSize: 24,
    color: '#047857',
    marginTop: 16,
  },
  successSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#047857',
    marginTop: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.gray[900],
    marginBottom: 20,
  },
  summaryRow: {
    marginBottom: 16,
    backgroundColor: COLORS.gray[100],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.gray[500],
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray[900],
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: 20,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
