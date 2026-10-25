import '../global.css';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { queryClient } from '@/lib/queryClient';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="destinations" options={{ presentation: 'card' }} />
          <Stack.Screen name="homestays" options={{ presentation: 'card' }} />
          <Stack.Screen name="tickets" options={{ presentation: 'card' }} />
          <Stack.Screen name="guides" options={{ presentation: 'card' }} />
          <Stack.Screen name="workshops" options={{ presentation: 'card' }} />
          <Stack.Screen name="booking/new" options={{ presentation: 'card' }} />
          <Stack.Screen name="booking/[id]" options={{ presentation: 'card' }} />
          <Stack.Screen name="payment" options={{ presentation: 'card' }} />
          <Stack.Screen name="ticket/[id]" options={{ presentation: 'card' }} />
          <Stack.Screen name="ticket/detail" options={{ presentation: 'card' }} />
          <Stack.Screen name="event/[id]" options={{ presentation: 'card' }} />
          <Stack.Screen name="event/detail" options={{ presentation: 'card' }} />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="calendar" options={{ presentation: 'card' }} />
          <Stack.Screen name="settings" options={{ presentation: 'card' }} />
          <Stack.Screen name="profile/index" options={{ presentation: 'card' }} />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
