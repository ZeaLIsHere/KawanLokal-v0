import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';

export default function OrdersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-stone-50" edges={['top']}>
      <View className="px-5 py-3 bg-white border-b border-stone-200">
        <Text className="text-xl font-bold text-stone-900">Pesanan Saya</Text>
        <Text className="text-xs text-stone-500">Tiket dan riwayat transaksi pengalaman lokal</Text>
      </View>

      <View className="flex-1 items-center justify-center p-8">
        <View className="w-16 h-16 rounded-full bg-stone-200 items-center justify-center mb-4">
          <Ionicons name="receipt-outline" size={32} color="#78716C" />
        </View>
        <Text className="text-base font-bold text-stone-900 text-center">
          Belum Ada Pesanan
        </Text>
        <Text className="text-xs text-stone-500 text-center mt-1 mb-6">
          Pesan tiket acara budaya atau pemandu lokal untuk melihat tiket digital Anda di sini.
        </Text>
        <Button
          title="Mulai Eksplorasi"
          variant="primary"
          onPress={() => router.push('/(tabs)/home')}
        />
      </View>
    </SafeAreaView>
  );
}
