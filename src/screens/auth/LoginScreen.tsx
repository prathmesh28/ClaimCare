import React, { memo, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  TextInputProps,
  Pressable,
} from 'react-native';
import { Eye, EyeClosed, ShieldCheck } from 'lucide-react-native';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { COLORS } from '../../constants';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { showToast } = useToast();

  const handleLogin = async () => {
    if (!username || !password) {
      showToast('Please enter username and password', 'error');
      return;
    }

    try {
      await login(username, password);
      showToast('Login successful!', 'success');
      navigation.replace('Dashboard');
    } catch (error) {
      showToast('Invalid credentials.', 'error');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar
          barStyle={'dark-content'}
          translucent={true}
          backgroundColor={COLORS.white}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <ShieldCheck size={50} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>ClaimCare</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username"
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>

            <PasswordCompo
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
              onSubmitEditing={handleLogin}
            />
            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.demoText}>Demo: emilys / emilyspass</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const PasswordCompo = memo((props: TextInputProps) => {
  const [pass, setPass] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setPass(prev => !prev);
  }, []);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Password</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={!pass}
          autoCapitalize={'none'}
          {...props}
        />
        <Pressable
          style={styles.eyeButton}
          onPress={togglePasswordVisibility}
        >
          {pass ? (
            <Eye color={COLORS.gray[600]} />
          ) : (
            <EyeClosed color={COLORS.gray[600]} />
          )}
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue[50],
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 28,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray[500],
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    backgroundColor: COLORS.blue[50],
    borderRadius: 16,
    padding: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray[700],
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: COLORS.white,
    paddingLeft: 12,
    color: COLORS.black,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: COLORS.gray[400],
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  demoText: {
    textAlign: 'center',
    color: COLORS.gray[500],
    fontSize: 12,
    marginTop: 16,
  },
  eyeButton: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'center',
  },
});
