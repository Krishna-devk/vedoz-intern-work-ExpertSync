import { Tabs } from 'expo-router';
import React, { useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/context/ThemeContext';

export default function TabLayout() {
  const { isDark } = useTheme();

  const colors = useMemo(() => ({
    background: isDark ? '#111827' : '#FFFFFF',
    border: isDark ? '#1F2937' : '#E2E8F0',
    active: '#3B82F6',
    inactive: isDark ? '#94A3B8' : '#64748B',
  }), [isDark]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.active,
        tabBarInactiveTintColor: colors.inactive,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          height: 90,
          paddingBottom: 10,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginBottom: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Experts',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="people-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'My Bookings',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="calendar-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
