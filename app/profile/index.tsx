import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const USER_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

export default function ProfileScreen() {
  const router = useRouter();

  const handleEditAvatar = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    Alert.alert('Ubah Foto Profil', 'Fitur unggah foto avatar akan tersedia pada rilis akun mandiri.');
  };

  const handleLogout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    Alert.alert(
      'Keluar Akun',
      'Apakah Anda yakin ingin keluar dari akun tamu KawanLokal?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: () => {
            router.replace('/onboarding');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top', 'bottom']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Curved Gradient Header (Ulos Red Theme) */}
        <View className="bg-ulos-red pt-3 pb-14 px-4 rounded-b-[2.5rem] shadow-md relative overflow-hidden">
          {/* Ambient Decorative Overlay */}
          <View className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <View className="absolute top-1/2 -left-10 w-36 h-36 rounded-full bg-black/10 blur-xl pointer-events-none" />

          {/* Top Action Bar */}
          <View className="flex-row items-center justify-between mb-2">
            <Pressable
              accessibilityLabel="Kembali"
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full items-center justify-center bg-white/15 active:bg-white/25 active:scale-95"
            >
              <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            </Pressable>

            <Text className="text-base font-bold text-white tracking-wide">
              Profil Wisatawan
            </Text>

            <Pressable
              accessibilityLabel="Pengaturan"
              onPress={() => router.push('/settings')}
              className="w-10 h-10 rounded-full items-center justify-center bg-white/15 active:bg-white/25 active:scale-95"
            >
              <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* Avatar & Profile Basic Info */}
          <View className="items-center justify-center pt-1 text-center">
            <View className="relative mb-2.5">
              <View className="w-24 h-24 rounded-full p-1 bg-surface-card shadow-lg ring-4 ring-white/30">
                <Image
                  source={{ uri: USER_AVATAR }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              </View>
              <Pressable
                accessibilityLabel="Ubah Foto"
                onPress={handleEditAvatar}
                className="absolute bottom-0 right-0 w-7 h-7 bg-surface-card rounded-full shadow-md items-center justify-center active:scale-90"
              >
                <Ionicons name="camera" size={14} color="#991B1B" />
              </Pressable>
            </View>

            <Text className="text-xl font-bold text-white tracking-tight">
              Wisatawan KawanLokal
            </Text>
            <Text className="text-xs text-red-100 mt-0.5 font-medium">
              tamu@kawanlokal.id
            </Text>
            <View className="mt-2 px-3 py-0.5 rounded-full bg-white/20">
              <Text className="text-[10px] font-bold text-white uppercase tracking-wider">
                Mode Tamu Terverifikasi
              </Text>
            </View>
          </View>
        </View>

        {/* Overlapping Floating Content Canvas (-mt-7) */}
        <View className="px-4 -mt-7 gap-4 z-10">
          {/* Stats Card (3 Columns with hairline dividers) */}
          <View className="bg-surface-card rounded-2xl border border-card-border shadow-md py-3.5 px-2">
            <View className="flex-row divide-x divide-card-border items-center">
              {/* Acara Budaya */}
              <Pressable
                onPress={() => router.push('/(tabs)/orders')}
                className="flex-1 items-center justify-center py-1 active:opacity-70"
              >
                <View className="w-9 h-9 rounded-full bg-red-50 items-center justify-center mb-1">
                  <Ionicons name="sparkles" size={18} color="#991B1B" />
                </View>
                <Text className="text-base font-extrabold text-on-surface leading-none">
                  4
                </Text>
                <Text className="text-[11px] text-secondary mt-1 font-medium">
                  Acara Diikuti
                </Text>
              </Pressable>

              {/* Acara Tersimpan */}
              <Pressable
                onPress={() => router.push('/calendar')}
                className="flex-1 items-center justify-center py-1 active:opacity-70"
              >
                <View className="w-9 h-9 rounded-full bg-red-50 items-center justify-center mb-1">
                  <Ionicons name="bookmark" size={18} color="#991B1B" />
                </View>
                <Text className="text-base font-extrabold text-on-surface leading-none">
                  8
                </Text>
                <Text className="text-[11px] text-secondary mt-1 font-medium">
                  Tersimpan
                </Text>
              </Pressable>

              {/* Destinasi Toba */}
              <Pressable
                onPress={() => router.push('/destinations')}
                className="flex-1 items-center justify-center py-1 active:opacity-70"
              >
                <View className="w-9 h-9 rounded-full bg-red-50 items-center justify-center mb-1">
                  <Ionicons name="location" size={18} color="#991B1B" />
                </View>
                <Text className="text-base font-extrabold text-on-surface leading-none">
                  7
                </Text>
                <Text className="text-[11px] text-secondary mt-1 font-medium">
                  Kabupaten
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Account Settings & Menu Options Card */}
          <View className="bg-surface-card rounded-2xl border border-card-border shadow-sm overflow-hidden divide-y divide-card-border">
            {/* Pesanan & Tiket Saya */}
            <Pressable
              onPress={() => router.push('/(tabs)/orders')}
              className="flex-row items-center justify-between p-3.5 active:bg-stone-50"
            >
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-xl bg-red-50 items-center justify-center">
                  <Ionicons name="receipt-outline" size={18} color="#991B1B" />
                </View>
                <Text className="text-sm font-semibold text-on-surface">
                  Pesanan & Tiket Digital
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#A8A29E" />
            </Pressable>

            {/* Kalender Budaya Terjadwal */}
            <Pressable
              onPress={() => router.push('/calendar')}
              className="flex-row items-center justify-between p-3.5 active:bg-stone-50"
            >
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-xl bg-red-50 items-center justify-center">
                  <Ionicons name="calendar-outline" size={18} color="#991B1B" />
                </View>
                <Text className="text-sm font-semibold text-on-surface">
                  Kalender Budaya Toba
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#A8A29E" />
            </Pressable>

            {/* Destinasi Wisata */}
            <Pressable
              onPress={() => router.push('/destinations')}
              className="flex-row items-center justify-between p-3.5 active:bg-stone-50"
            >
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-xl bg-stone-100 items-center justify-center">
                  <Ionicons name="compass-outline" size={18} color="#505f76" />
                </View>
                <Text className="text-sm font-semibold text-on-surface">
                  Destinasi Budaya Sekitar Toba
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#A8A29E" />
            </Pressable>

            {/* Homestay & Penginapan */}
            <Pressable
              onPress={() => router.push('/homestays')}
              className="flex-row items-center justify-between p-3.5 active:bg-stone-50"
            >
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-xl bg-stone-100 items-center justify-center">
                  <Ionicons name="home-outline" size={18} color="#505f76" />
                </View>
                <Text className="text-sm font-semibold text-on-surface">
                  Homestay & Sopo Bolon
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#A8A29E" />
            </Pressable>

            {/* Pengaturan Akun & Peran */}
            <Pressable
              onPress={() => router.push('/settings')}
              className="flex-row items-center justify-between p-3.5 active:bg-stone-50"
            >
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-xl bg-stone-100 items-center justify-center">
                  <Ionicons name="settings-outline" size={18} color="#505f76" />
                </View>
                <Text className="text-sm font-semibold text-on-surface">
                  Pengaturan, Peran & Bahasa
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#A8A29E" />
            </Pressable>
          </View>

          {/* Cultural Heritage Trust Banner */}
          <View className="bg-gradient-to-r from-red-50 to-stone-50 border border-red-200/80 rounded-2xl p-3.5 flex-row items-center gap-3 shadow-xs">
            <View className="w-10 h-10 rounded-xl bg-ulos-red items-center justify-center shrink-0 shadow-xs">
              <Ionicons name="shield-checkmark" size={22} color="#FFFFFF" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center gap-1.5">
                <Text className="text-xs font-bold text-on-surface">
                  Pelestari Warisan Adat Toba
                </Text>
                <View className="bg-emerald-100 px-1.5 py-0.2 rounded-full">
                  <Text className="text-[9px] font-bold text-emerald-800">Aktif</Text>
                </View>
              </View>
              <Text className="text-[11px] text-secondary mt-0.5 leading-snug">
                Setiap pemesanan Anda mendukung langsung pengrajin ulos dan tetua adat lokal.
              </Text>
            </View>
          </View>

          {/* Logout Action Row */}
          <View className="items-center pt-2">
            <Pressable
              onPress={handleLogout}
              className="flex-row items-center gap-2 py-2 px-5 rounded-xl active:bg-red-50 transition-all"
            >
              <Ionicons name="log-out-outline" size={18} color="#991B1B" />
              <Text className="text-sm font-bold text-ulos-red">
                Keluar Akun
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
