import React, { useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import { List } from 'lucide-react-native';
import { useClaims } from '../../hooks/useClaims';
import { COLORS } from '../../constants';
import { formatCurrency } from '../../utils/currency.utils';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { Claim, RootStackParamList } from '../../types';
import { Header } from '../../components/common/Header';
import { EmptyState } from '../../components/common/EmptyState';
import Animated, { FadeIn } from 'react-native-reanimated';

type Props = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'ClaimsHistoryList'
  >;
  route: RouteProp<RootStackParamList, 'ClaimsHistoryList'>;
};

export const ClaimsHistoryListScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { claimant } = route.params;
  const { claims: allClaims } = useClaims();

  const filteredClaims = useMemo(() => {
    if (claimant === 'All Claims') return allClaims;
    return allClaims.filter(c => c.claimant === claimant);
  }, [allClaims, claimant]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />

      <Header title="Claims History" onBack={handleGoBack} />

      <View style={styles.content} >
        <Animated.View entering={FadeIn.delay(100)} style={styles.tableCard}>
          {filteredClaims.length > 0 ? (
            <>
              <FlatList
                data={filteredClaims}
                ListHeaderComponent={<View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderText, styles.typeColumn]}>
                    Type
                  </Text>
                  <Text style={[styles.tableHeaderText, styles.dateColumn]}>
                    Date
                  </Text>
                  <Text style={[styles.tableHeaderText, styles.amountColumn]}>
                    Receipt
                  </Text>
                </View>}
                renderItem={({ item, index }: { item: Claim, index: number }) => <Animated.View
                  entering={FadeIn.delay(100 + index * 50)}
                  key={item.id}
                  style={[
                    styles.tableRow,
                    index !== filteredClaims.length - 1 &&
                    styles.tableRowBorder,
                  ]}
                >
                  <View style={styles.typeColumn}>
                    <Text style={styles.claimType}>{item.type}</Text>
                  </View>
                  <View style={styles.dateColumn}>
                    <Text style={styles.claimDate}>{item.date}</Text>
                  </View>
                  <View style={styles.amountColumn}>
                    <Text style={styles.claimAmount}>
                      {formatCurrency(item.amount)}
                    </Text>
                  </View>
                </Animated.View>
                } />

            </>
          ) : (
            <EmptyState
              icon={<List size={48} color={COLORS.gray[300]} />}
              title="No Claims Found"
              description={
                claimant === 'All Claims'
                  ? "You haven't submitted any claims yet."
                  : `No claims found for ${claimant}.`
              }
            />
          )}
        </Animated.View>
        {filteredClaims.length > 0 && <Animated.Text entering={FadeIn.delay(100)} style={styles.disclaimer}>
          *Amount payable subject to final approval by the insurer
        </Animated.Text>}
      </View>
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
    padding: 20,
  },
  tableCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray[100],
    padding: 12,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray[700],
  },
  tableRow: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  tableRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  typeColumn: {
    flex: 1.5,
  },
  dateColumn: {
    flex: 1.5,
  },
  amountColumn: {
    flex: 1,
  },
  claimType: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray[900],
  },
  claimDate: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray[600],
  },
  claimAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray[900],
  },
  disclaimer: {
    fontSize: 12,
    color: COLORS.gray[500],
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
