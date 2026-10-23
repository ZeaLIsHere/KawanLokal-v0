import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'KawanLokal',
  slug: 'kawanlokal',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  scheme: 'kawanlokal',
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.kawanlokal.app',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#1E1B18',
    },
    package: 'com.kawanlokal.app',
  },
  plugins: [
    'expo-router',
    'expo-font',
    'expo-secure-store',
    [
      'expo-splash-screen',
      {
        image: './assets/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: '#1E1B18',
      },
    ],
  ],
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co',
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key',
    eas: {
      projectId: 'kawanlokal-mvp',
    },
  },
});
