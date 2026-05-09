import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import { ThemeProvider as CustomThemeProvider, useTheme } from '../src/context/ThemeContext';

const queryClient = new QueryClient();

function RootLayoutContent() {
  const { isDark } = useTheme();

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="expert/[id]" options={{ title: 'Expert Details', presentation: 'modal' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen immediately since we aren't loading fonts
    SplashScreen.hideAsync();

    // Wake up the Render backend
    const apiURL = process.env.EXPO_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    fetch(`${apiURL}/health`)
      .catch(() => {/* Ignore errors */});
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        <RootLayoutContent />
      </CustomThemeProvider>
    </QueryClientProvider>
  );
}

