import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';

// Layar ini ditunda sesuai instruksi pengembang sampai callback
export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center p-6">
      <Text className="text-xl font-bold text-stone-900 mb-2">Masuk ke KawanLokal</Text>
      <Text className="text-xs text-stone-500 text-center mb-6">
        Fitur autentikasi ditunda sementara (bypassed).
      </Text>
      <Button
        title="Lanjut ke Beranda"
        onPress={() => router.replace('/(tabs)/home')}
      />
    </SafeAreaView>
  );
}
