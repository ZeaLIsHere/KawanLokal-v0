import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-stone-50" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-3 bg-white border-b border-stone-200">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-stone-100 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={20} color="#1C1917" />
        </Pressable>
        <Text className="text-base font-bold text-stone-900">Profil Saya</Text>
        <View className="w-10" />
      </View>

      <View className="p-5">
        <Card className="items-center py-6 mb-4">
          <View className="w-20 h-20 rounded-full bg-ulos-red items-center justify-center mb-3">
            <Text className="text-white font-extrabold text-2xl">KL</Text>
          </View>
          <Text className="text-lg font-bold text-stone-900">Wisatawan KawanLokal</Text>
          <Text className="text-xs text-stone-500 mb-2">tamu@kawanlokal.id</Text>
          <Badge label="Wisatawan Terdaftar" variant="ulos" />
        </Card>

        <Card className="p-4">
          <Text className="text-xs font-bold text-stone-400 uppercase mb-3">Informasi Akun</Text>
          <View className="flex-row justify-between py-2 border-b border-stone-100">
            <Text className="text-sm text-stone-600">Peran Utama</Text>
            <Text className="text-sm font-semibold text-stone-900">Traveler</Text>
          </View>
          <View className="flex-row justify-between py-2 border-b border-stone-100">
            <Text className="text-sm text-stone-600">Bahasa Utama</Text>
            <Text className="text-sm font-semibold text-stone-900">Indonesia</Text>
          </View>
          <View className="flex-row justify-between py-2">
            <Text className="text-sm text-stone-600">Wilayah Minat</Text>
            <Text className="text-sm font-semibold text-stone-900">Danau Toba (7 Kabupaten)</Text>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}
