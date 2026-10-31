import '../global.css';
import { useEffect } from 'react';
import { LogBox } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import { queryClient } from '@/lib/queryClient';
import { I18nProvider } from '@/i18n';

// Bisukan peringatan internal library NativeWind & Reanimated pada runtime React Native 0.88
LogBox.ignoreLogs([
  'ImageBackground is deprecated',
  '[Reanimated] Dependencies should only be used on the web',
]);

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
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
            <Stack.Screen name="profile/edit" options={{ presentation: 'card' }} />
          </Stack>
        </SafeAreaProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
