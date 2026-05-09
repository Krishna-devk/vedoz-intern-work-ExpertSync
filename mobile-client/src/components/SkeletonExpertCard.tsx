import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const SkeletonExpertCard = () => {
  const shimmer = React.useRef(new Animated.Value(0)).current;
  const { isDark } = useTheme();

  const colors = {
    card: isDark ? '#1F2937' : '#FFFFFF',
    border: isDark ? '#374151' : '#E5E7EB',
    skeleton: isDark ? '#374151' : '#F3F4F6',
  };

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, [shimmer]);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Animated.View style={[styles.avatar, { opacity, backgroundColor: colors.skeleton }]} />
      <View style={styles.info}>
        <Animated.View style={[styles.name, { opacity, backgroundColor: colors.skeleton }]} />
        <Animated.View style={[styles.category, { opacity, backgroundColor: colors.skeleton }]} />
        <Animated.View style={[styles.rating, { opacity, backgroundColor: colors.skeleton }]} />
      </View>
      <Animated.View style={[styles.button, { opacity, backgroundColor: colors.skeleton }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  info: {
    flex: 1,
    gap: 8,
  },
  name: {
    height: 16,
    width: '70%',
    borderRadius: 4,
  },
  category: {
    height: 12,
    width: '40%',
    borderRadius: 4,
  },
  rating: {
    height: 12,
    width: '20%',
    borderRadius: 4,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
});

export default SkeletonExpertCard;
