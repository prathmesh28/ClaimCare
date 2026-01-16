import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  StatusBar,
  Pressable,
} from 'react-native';
import { FileText, History, LogOut, ShieldCheck } from 'lucide-react-native';
import { useAuth } from '../../hooks/useAuth';
import { COLORS } from '../../constants';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Animated, { FadeInLeft } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
};

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { logout, user } = useAuth();

  const performLogout = useCallback(() => {
    logout();
    navigation.replace('Login');
  }, [logout, navigation]);

  const handleLogout = useCallback(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: performLogout,
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  }, [performLogout]);

  const navigateToSubmitClaim = useCallback(() => {
    navigation.navigate('SubmitClaim');
  }, [navigation]);

  const navigateToHistory = useCallback(() => {
    navigation.navigate('ClaimsHistoryFilter');
  }, [navigation]);

  const insets = useSafeAreaInsets();
  const headerStyle = useMemo(() => ([
    styles.header,
    { paddingTop: insets.top + 16 }
  ]), [insets.top]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />

      <View style={headerStyle}>
        <View style={styles.headerLeft}>
          <ShieldCheck size={20} color={COLORS.white} />
          <Text style={styles.headerTxt}>Home</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={COLORS.white} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <View style={styles.nameCompo}>
            <Text style={styles.name}>Hi {user?.firstName}!</Text>
          </View>
          <View style={styles.quickActions}>
            <AnimatedPressable
              style={styles.actionCard}
              onPress={navigateToSubmitClaim}
              entering={FadeInLeft}
            >
              <FileText size={36} color={COLORS.white} />
              <Text style={styles.actionText}>Submit Claim</Text>
            </AnimatedPressable>

            <AnimatedPressable
              style={styles.actionCard}
              onPress={navigateToHistory}
              entering={FadeInLeft}
            >
              <History size={36} color={COLORS.white} />
              <Text style={styles.actionText}>Claims History</Text>
            </AnimatedPressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTxt: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  logoutText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    padding: 20,
  },
  name: {
    color: COLORS.black,
    // fontWeight: '600',
    fontSize: 24,
  },
  nameCompo: {
    paddingBottom: 20,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  actionCard: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.white,
  },
});
