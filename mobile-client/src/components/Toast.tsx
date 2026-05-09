import React, { useEffect, useState, useCallback } from 'react';
import { Animated, StyleSheet, Text, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(-100));

  const hide = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  }, [fadeAnim, translateY, onClose]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        speed: 12,
        bounciness: 8,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      hide();
    }, 4000);

    return () => clearTimeout(timer);
  }, [fadeAnim, translateY, hide]);


  const colors = {
    success: '#10B981',
    error: '#EF4444',
    info: '#3B82F6',
  };

  const icons = {
    success: 'checkmark-circle',
    error: 'alert-circle',
    info: 'information-circle',
  } as const;

  return (
    <Animated.View 
      style={[
        styles.container, 
        { opacity: fadeAnim, transform: [{ translateY }] }
      ]}
    >
      <View style={[styles.content, { borderLeftColor: colors[type] }]}>
        <Ionicons name={icons[type]} size={24} color={colors[type]} />
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(31, 41, 55, 0.95)',
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    gap: 12,
  },
  text: {
    color: '#F9FAFB',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});
