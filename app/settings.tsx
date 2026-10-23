import React from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';

export default function SettingsScreen() {
  const router = useRouter();

  const handleRoleSwitch = (role: string) => {
    Alert.alert('Ganti Peran Aktif', `Peran dialihkan ke: ${role}`);
  };

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
        <Text className="text-base font-bold text-stone-900">Pengaturan</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 p-5">
        {/* Akun */}
        <Card className="mb-4">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-full bg-ulos-red items-center justify-center">
              <Text className="text-white font-bold text-lg">KL</Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-stone-900">Wisatawan KawanLokal</Text>
              <Text className="text-xs text-stone-500">Akun Wisatawan Aktif</Text>
            </View>
            <Badge label="Traveler" variant="ulos" />
          </View>
        </Card>

        {/* Peran Pengguna */}
        <Text className="text-xs font-bold uppercase text-stone-500 mb-2 px-1">
          Akses Peran & Dasbor
        </Text>
        <Card className="mb-4 p-0 overflow-hidden divide-y divide-stone-100">
          <Pressable
            onPress={() => handleRoleSwitch('Traveler')}
            className="flex-row items-center justify-between p-4 active:bg-stone-50"
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="person-outline" size={20} color="#991B1B" />
              <Text className="text-sm font-semibold text-stone-800">Mode Wisatawan (Traveler)</Text>
            </View>
            <Ionicons name="checkmark-circle" size={18} color="#991B1B" />
          </Pressable>

          <Pressable
            onPress={() => handleRoleSwitch('Provider')}
            className="flex-row items-center justify-between p-4 active:bg-stone-50"
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="briefcase-outline" size={20} color="#1C1917" />
              <Text className="text-sm font-semibold text-stone-800">Dasbor Penyedia (Provider)</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#A8A29E" />
          </Pressable>

          <Pressable
            onPress={() => handleRoleSwitch('Admin')}
            className="flex-row items-center justify-between p-4 active:bg-stone-50"
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="shield-checkmark-outline" size={20} color="#1C1917" />
              <Text className="text-sm font-semibold text-stone-800">Panel Kurator (Admin)</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#A8A29E" />
          </Pressable>
        </Card>

        {/* Preferensi */}
        <Text className="text-xs font-bold uppercase text-stone-500 mb-2 px-1">
          Preferensi Aplikasi
        </Text>
        <Card className="mb-6 p-0 overflow-hidden divide-y divide-stone-100">
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center gap-3">
              <Ionicons name="language-outline" size={20} color="#1C1917" />
              <Text className="text-sm font-semibold text-stone-800">Bahasa</Text>
            </View>
            <Text className="text-xs font-bold text-stone-600">Bahasa Indonesia</Text>
          </View>
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center gap-3">
              <Ionicons name="time-outline" size={20} color="#1C1917" />
              <Text className="text-sm font-semibold text-stone-800">Zona Waktu Kalender</Text>
            </View>
            <Text className="text-xs font-bold text-stone-600">WIB (Asia/Jakarta)</Text>
          </View>
        </Card>

        {/* Info Aplikasi */}
        <View className="items-center py-4">
          <Text className="text-xs font-semibold text-stone-500">KawanLokal v1.0.0</Text>
          <Text className="text-[10px] text-stone-400 mt-1">Kawasan Pariwisata Budaya Danau Toba</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
