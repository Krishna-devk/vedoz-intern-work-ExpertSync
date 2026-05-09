import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SkeletonExpertCard = () => {
  const shimmer = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.avatar, { opacity }]} />
      <View style={styles.info}>
        <Animated.View style={[styles.name, { opacity }]} />
        <Animated.View style={[styles.category, { opacity }]} />
        <Animated.View style={[styles.rating, { opacity }]} />
      </View>
      <Animated.View style={[styles.button, { opacity }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#374151',
    marginRight: 16,
  },
  info: {
    flex: 1,
    gap: 8,
  },
  name: {
    height: 16,
    width: '70%',
    backgroundColor: '#374151',
    borderRadius: 4,
  },
  category: {
    height: 12,
    width: '40%',
    backgroundColor: '#374151',
    borderRadius: 4,
  },
  rating: {
    height: 12,
    width: '20%',
    backgroundColor: '#374151',
    borderRadius: 4,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#374151',
  },
});

export default SkeletonExpertCard;
