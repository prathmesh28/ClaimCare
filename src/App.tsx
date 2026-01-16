import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { SplashScreen } from './screens/splash/SplashScreen';
import { LoginScreen } from './screens/auth/LoginScreen';
import type { RootStackParamList } from './types';
import { ClaimsHistoryFilterScreen } from './screens/claims/ClaimsHistoryFilterScreen';
import { SubmitClaimScreen } from './screens/claims/SubmitClaimScreen';
import { ClaimCreatedScreen } from './screens/claims/ClaimCreatedScreen';
import { ClaimsHistoryListScreen } from './screens/claims/ClaimsHistoryListScreen';
import { ToastContainer } from './components/common/ToastContainer';
import { DashboardScreen } from './screens/dashboard/DashboardScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainApp: React.FC = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: 'none',
            }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="SubmitClaim" component={SubmitClaimScreen} />
            <Stack.Screen
              name="ClaimsHistoryFilter"
              component={ClaimsHistoryFilterScreen}
            />
            <Stack.Screen name="ClaimCreated" component={ClaimCreatedScreen} />
            <Stack.Screen
              name="ClaimsHistoryList"
              component={ClaimsHistoryListScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <ToastContainer />
      </ToastProvider>
    </AuthProvider>
  );
};

export default MainApp;
