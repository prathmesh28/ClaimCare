import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { COLORS } from '../../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  rightElement,
}) => {
  const insets = useSafeAreaInsets();

  const headerStyle = useMemo(() => ([
    styles.header,
    { paddingTop: insets.top + 8 }
  ]), [insets.top]);

  return (
    <View style={headerStyle}>
      {onBack ? (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ChevronLeft size={24} color={COLORS.white} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      <Animated.Text entering={FadeIn} style={styles.title}>
        {title}
      </Animated.Text>
      <View style={styles.rightContainer}>
        {rightElement || <View style={styles.placeholder} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    flex: 1,
    textAlign: 'center',
  },
  rightContainer: {
    width: 40,
  },
  placeholder: {
    width: 40,
  },
});
