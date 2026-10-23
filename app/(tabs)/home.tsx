import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

// Foto budaya & lanskap Danau Toba
const PARAPAT_FESTIVAL_IMG =
  'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=600&q=80';

const SAMOSIR_CULTURE_IMG =
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80';

const USER_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

// 4 Layanan Lokal sesuai PRD: event_ticket, guide, workshop, homestay
const LOCAL_CATEGORIES = [
  { id: 'event_ticket', label: 'Tiket Acara', icon: 'ticket-confirmation-outline', isMCI: true },
  { id: 'guide', label: 'Pemandu', icon: 'badge-account-horizontal-outline', isMCI: true },
  { id: 'workshop', label: 'Workshop', icon: 'palette-outline', isMCI: true },
  { id: 'homestay', label: 'Homestay', icon: 'home-outline', isMCI: false },
] as const;

export default function HomeScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('event_ticket');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCategoryPress = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setActiveCategory(id);
    if (id === 'homestay') {
      router.push('/homestays');
    } else {
      router.push('/(tabs)/explore');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top']}>
      {/* TopAppBar Bersih bergaya Stitch */}
      <View className="flex-row justify-between items-center w-full px-4 py-2.5 bg-surface-card border-b border-card-border/70 z-20">
        {/* Leading Menu/Settings Icon */}
        <Pressable
          accessibilityLabel="Buka pengaturan"
          onPress={() => router.push('/settings')}
          className="w-10 h-10 items-center justify-center rounded-xl active:bg-stone-100 active:opacity-80"
        >
          <Ionicons name="menu" size={24} color="#505f76" />
        </Pressable>

        {/* Brand Logo KawanLokal */}
        <View className="flex-row items-center gap-1.5">
          <View className="w-7 h-7 rounded-lg bg-ulos-red items-center justify-center shadow-sm">
            <Ionicons name="sparkles" size={16} color="#FFFFFF" />
          </View>
          <Text className="text-xl font-bold text-on-surface tracking-tight">
            Kawan<Text className="text-ulos-red">Lokal</Text>
          </Text>
        </View>

        {/* Trailing Avatar dengan Indikator Status */}
        <Pressable
          accessibilityLabel="Profil Pengguna"
          onPress={() => router.push('/profile')}
          className="relative w-10 h-10 rounded-full border border-card-border p-0.5 active:opacity-80"
        >
          <Image
            source={{ uri: USER_AVATAR }}
            className="w-full h-full rounded-full"
            resizeMode="cover"
          />
          <View className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-surface-card" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4"
        contentContainerStyle={{ paddingBottom: 36 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting & Header Prompt Toba */}
        <View className="mb-4">
          <View className="flex-row items-center gap-1.5">
            <Text className="text-sm font-semibold text-secondary">Horas, Kawan Lokal!</Text>
            <Text className="text-base">👋</Text>
          </View>
          <Text className="text-2xl font-bold text-on-surface tracking-tight leading-snug mt-1">
            Ingin menjelajah kegiatan{'\n'}apa di Danau Toba?
          </Text>
        </View>

        {/* Search Input Module */}
        <View className="mb-5">
          <Pressable
            onPress={() => router.push('/calendar')}
            className="relative flex-row items-center w-full bg-surface-card rounded-2xl border border-input-border shadow-sm px-3.5 h-12"
          >
            <Ionicons name="search" size={20} color="#737686" />
            <TextInput
              placeholder="Cari upacara adat, pemandu, ulos..."
              placeholderTextColor="#737686"
              editable={false}
              className="flex-1 ml-2.5 text-sm font-medium text-on-surface"
            />
            <View className="px-2 py-1 bg-stone-100 rounded-lg">
              <Text className="text-[11px] font-bold text-stone-500">WIB</Text>
            </View>
          </Pressable>
        </View>

        {/* Kategori Cepat Layanan Lokal (PRD F3) */}
        <View className="flex-row justify-between mb-6">
          {LOCAL_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <Pressable
                key={cat.id}
                onPress={() => handleCategoryPress(cat.id)}
                className="items-center active:opacity-80"
              >
                <View
                  className={`w-14 h-14 rounded-2xl items-center justify-center shadow-sm border ${
                    isSelected
                      ? 'bg-ulos-red border-ulos-red'
                      : 'bg-surface-card border-card-border'
                  }`}
                >
                  {cat.isMCI ? (
                    <MaterialCommunityIcons
                      name={cat.icon as any}
                      size={24}
                      color={isSelected ? '#FFFFFF' : '#505f76'}
                    />
                  ) : (
                    <Ionicons
                      name={cat.icon as any}
                      size={24}
                      color={isSelected ? '#FFFFFF' : '#505f76'}
                    />
                  )}
                </View>
                <Text
                  className={`mt-2 text-xs font-semibold ${
                    isSelected ? 'text-ulos-red' : 'text-on-surface'
                  }`}
                >
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Acara Budaya Terdekat (PRD F2) */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <View>
              <Text className="text-lg font-bold text-on-surface">
                Acara Budaya Terdekat
              </Text>
              <Text className="text-xs text-secondary mt-0.5">
                Jadwal terverifikasi kurator budaya Toba
              </Text>
            </View>
            <Pressable
              onPress={() => router.push('/destinations')}
              className="active:opacity-70"
            >
              <Text className="text-xs font-bold text-ulos-red">Lihat Semua</Text>
            </Pressable>
          </View>

          {/* 2-Column Responsive Card Grid */}
          <View className="flex-row gap-3">
            {/* Card 1: Pesta Danau Toba */}
            <Pressable
              onPress={() => router.push('/calendar')}
              className="flex-1 bg-surface-card rounded-2xl border border-card-border overflow-hidden shadow-sm active:opacity-90"
            >
              <View className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden">
                <Image
                  source={{ uri: PARAPAT_FESTIVAL_IMG }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute top-2 left-2 bg-ulos-red/90 px-2 py-0.5 rounded-full">
                  <Text className="text-[10px] font-bold text-white">Festival</Text>
                </View>
                <Pressable
                  accessibilityLabel="Simpan acara"
                  onPress={() => toggleFavorite('pesta-toba')}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 items-center justify-center shadow-sm active:opacity-80"
                >
                  <Ionicons
                    name={favorites['pesta-toba'] ? 'heart' : 'heart-outline'}
                    size={15}
                    color={favorites['pesta-toba'] ? '#991B1B' : '#505f76'}
                  />
                </Pressable>
              </View>

              <View className="p-3">
                <Text numberOfLines={1} className="text-sm font-bold text-on-surface leading-tight">
                  Pesta Danau Toba
                </Text>
                <Text className="text-[11px] text-secondary mt-0.5">Parapat, Simalungun</Text>
                
                <View className="flex-row items-center mt-1.5 gap-1">
                  <Ionicons name="time-outline" size={13} color="#D97706" />
                  <Text className="text-[11px] font-semibold text-stone-700">10.00 WIB</Text>
                </View>

                <View className="mt-3 pt-2 border-t border-card-border flex-row items-center justify-between">
                  <Text className="text-[10px] text-secondary">Tiket Masuk</Text>
                  <Text className="text-xs font-bold text-ulos-red">Rp 50.000</Text>
                </View>
              </View>
            </Pressable>

            {/* Card 2: Upacara Mangongkal Holi */}
            <Pressable
              onPress={() => router.push('/calendar')}
              className="flex-1 bg-surface-card rounded-2xl border border-card-border overflow-hidden shadow-sm active:opacity-90"
            >
              <View className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden">
                <Image
                  source={{ uri: SAMOSIR_CULTURE_IMG }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute top-2 left-2 bg-stone-900/80 px-2 py-0.5 rounded-full">
                  <Text className="text-[10px] font-bold text-white">Adat Terbuka</Text>
                </View>
                <Pressable
                  accessibilityLabel="Simpan acara"
                  onPress={() => toggleFavorite('mangongkal-holi')}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 items-center justify-center shadow-sm active:opacity-80"
                >
                  <Ionicons
                    name={favorites['mangongkal-holi'] ? 'heart' : 'heart-outline'}
                    size={15}
                    color={favorites['mangongkal-holi'] ? '#991B1B' : '#505f76'}
                  />
                </Pressable>
              </View>

              <View className="p-3">
                <Text numberOfLines={1} className="text-sm font-bold text-on-surface leading-tight">
                  Mangongkal Holi
                </Text>
                <Text className="text-[11px] text-secondary mt-0.5">Tomok, Samosir</Text>

                <View className="flex-row items-center mt-1.5 gap-1">
                  <Ionicons name="time-outline" size={13} color="#D97706" />
                  <Text className="text-[11px] font-semibold text-stone-700">09.00 WIB</Text>
                </View>

                <View className="mt-3 pt-2 border-t border-card-border flex-row items-center justify-between">
                  <Text className="text-[10px] text-secondary">Status</Text>
                  <Text className="text-xs font-bold text-emerald-700">Terbuka</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Promo / Sorotan Budaya Lokal */}
        <View className="bg-gradient-to-r from-red-50 via-stone-50 to-white border border-red-100 rounded-2xl p-4 shadow-sm flex-row items-center justify-between overflow-hidden relative">
          <View className="space-y-1 flex-1 pr-2 z-10">
            <View className="self-start px-2.5 py-0.5 rounded-full bg-red-100">
              <Text className="text-ulos-red text-[10px] font-bold tracking-wide">
                PENGALAMAN OTENTIK
              </Text>
            </View>
            <Text className="text-base font-bold text-on-surface leading-tight mt-1">
              Tur Budaya Desa Tomok{'\n'}
              <Text className="text-xs font-medium text-secondary">
                Bersama Pemandu Lokal Berlisensi
              </Text>
            </Text>
            <Pressable
              onPress={() => router.push('/booking/new')}
              className="mt-2 flex-row items-center gap-1 active:opacity-70"
            >
              <Text className="text-xs font-bold text-ulos-red">Pesan Layanan</Text>
              <Ionicons name="arrow-forward" size={14} color="#991B1B" />
            </Pressable>
          </View>

          {/* Banner Graphic Toba */}
          <View className="w-16 h-16 bg-red-100/80 rounded-2xl items-center justify-center">
            <MaterialIcons
              name="explore"
              size={34}
              color="#991B1B"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
