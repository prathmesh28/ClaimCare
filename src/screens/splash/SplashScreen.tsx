import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ShieldCheck } from 'lucide-react-native';
import { useAuth } from '../../hooks/useAuth';
import { COLORS } from '../../constants';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    const initializeApp = async () => {
      await new Promise(resolve => setTimeout(() => resolve(true), 500));
      const isAuthenticated = await checkAuth();

      if (isAuthenticated) {
        navigation.replace('Dashboard');
      } else {
        navigation.replace('Login');
      }
    };

    initializeApp();
  }, [checkAuth, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <ShieldCheck size={60} color={COLORS.white} />
      </View>
      <Text style={styles.title}>ClaimCare</Text>
      <ActivityIndicator
        size="large"
        color={COLORS.white}
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  loader: {
    marginTop: 32,
  },
});
