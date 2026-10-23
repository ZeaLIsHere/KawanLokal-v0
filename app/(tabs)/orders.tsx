import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function OrdersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top']}>
      {/* Header */}
      <View className="px-4 py-3 bg-surface-card border-b border-card-border">
        <Text className="text-xl font-bold text-on-surface">Pesanan & Tiket Saya</Text>
        <Text className="text-xs text-secondary mt-0.5">
          Tiket QR digital dan riwayat transaksi budaya Toba
        </Text>
      </View>

      <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 36 }}>
        {/* Tiket Aktif Contoh (PRD F6) */}
        <View className="bg-surface-card rounded-2xl border border-card-border p-4 shadow-sm mb-4">
          <View className="flex-row items-center justify-between pb-3 border-b border-card-border">
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-8 rounded-lg bg-emerald-50 items-center justify-center">
                <Ionicons name="checkmark-circle" size={18} color="#15803D" />
              </View>
              <View>
                <Text className="text-xs font-bold text-emerald-700">TIKET AKTIF (LUNAS)</Text>
                <Text className="text-[10px] text-secondary">ID: #KL-2026-0891</Text>
              </View>
            </View>
            <View className="px-2.5 py-0.5 rounded-full bg-red-50">
              <Text className="text-xs font-bold text-ulos-red">WIB</Text>
            </View>
          </View>

          <View className="py-3">
            <Text className="text-base font-bold text-on-surface">
              Pesta Danau Toba - Akses Panggung Utama
            </Text>
            <Text className="text-xs text-secondary mt-1">
              Jumat, 2 Nov 2026 • 10.00 WIB • Pantai Bebas Parapat
            </Text>
            <Text className="text-xs text-stone-600 mt-2">
              Peserta: 2 Orang (Tiket Masuk + Souvenir Ulos)
            </Text>
          </View>

          <View className="pt-3 border-t border-dashed border-card-border flex-row items-center justify-between">
            <View>
              <Text className="text-[10px] text-secondary">Total Pembayaran</Text>
              <Text className="text-sm font-bold text-on-surface">Rp 100.000</Text>
            </View>
            <Pressable
              onPress={() => router.push('/calendar')}
              className="px-4 py-2 bg-stone-900 active:bg-stone-800 rounded-xl flex-row items-center gap-1.5"
            >
              <Ionicons name="qr-code-outline" size={16} color="#FFFFFF" />
              <Text className="text-xs font-semibold text-white">Lihat Tiket QR</Text>
            </Pressable>
          </View>
        </View>

        {/* Info Tiket Offline (PRD Non-Fungsional) */}
        <View className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-3.5 flex-row items-start gap-3">
          <Ionicons name="cloud-offline-outline" size={20} color="#004ac6" />
          <View className="flex-1">
            <Text className="text-xs font-bold text-blue-950">Akses Tiket Tanpa Internet</Text>
            <Text className="text-[11px] text-blue-800/80 mt-0.5 leading-relaxed">
              Tiket yang sudah pernah dibuka akan tersimpan otomatis di perangkat dan siap dipindai di pintu masuk acara meski di lokasi minim sinyal.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
