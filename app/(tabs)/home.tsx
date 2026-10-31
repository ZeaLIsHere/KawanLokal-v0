import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppIcon } from '@/components/AppIcon';
import { SvgIconName } from '@/constants/svgIcons';
import { PHOTO_COVERS } from '@/constants/localPhotos';

const STORAGE_AVATAR_KEY = '@user_profile_avatar';

// 4 Layanan Lokal sesuai PRD: event_ticket, guide, workshop, homestay
const LOCAL_CATEGORIES: { id: string; label: string; iconName: SvgIconName }[] = [
  { id: 'event_ticket', label: 'Tiket Acara', iconName: 'ticket' },
  { id: 'guide', label: 'Pemandu', iconName: 'profile' },
  { id: 'workshop', label: 'Workshop', iconName: 'suitcase' },
  { id: 'homestay', label: 'Homestay', iconName: 'hotel' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('event_ticket');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [avatarUri, setAvatarUri] = useState<string>('');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_AVATAR_KEY)
      .then((stored) => {
        if (stored) setAvatarUri(stored);
      })
      .catch(() => {});
  }, []);

  const toggleFavorite = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCategoryPress = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setActiveCategory(id);
    switch (id) {
      case 'event_ticket':
        router.push('/tickets');
        break;
      case 'guide':
        router.push('/guides');
        break;
      case 'workshop':
        router.push('/workshops');
        break;
      case 'homestay':
        router.push('/homestays');
        break;
      default:
        router.push('/(tabs)/explore');
        break;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      {/* TopAppBar Glassmorphic */}
      <View className="flex-row justify-between items-center w-full px-5 py-3 bg-white/75 border-b border-border/50 z-20">
        {/* Leading Settings Icon Glass */}
        <Pressable
          accessibilityLabel="Buka pengaturan"
          onPress={() => router.push('/settings')}
          className="w-11 h-11 items-center justify-center rounded-full bg-white/70 border border-white/80 shadow-sm active:opacity-75"
        >
          <AppIcon name="menu" size={20} color="#23201E" />
        </Pressable>

        {/* Brand Logo KawanLokal */}
        <View className="items-center">
          <Text className="font-raleway text-xl font-medium text-on-surface tracking-wide">
            Kawan<Text className="text-primary font-semibold">Lokal</Text>
          </Text>
        </View>

        {/* Trailing Avatar dengan Halo Ring */}
        <Pressable
          accessibilityLabel="Profil Pengguna"
          onPress={() => router.push('/profile')}
          className="relative w-11 h-11 rounded-full border-2 border-primary/20 p-0.5 active:opacity-80 items-center justify-center bg-surface-tonal"
        >
          <Image
            source={avatarUri ? { uri: avatarUri } : PHOTO_COVERS.desaTomok}
            className="w-full h-full rounded-full"
            resizeMode="cover"
          />
          <View className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-surface" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 px-5 pt-5"
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting & Header Prompt Toba */}
        <View className="mb-5">
          <Text className="text-[11px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant mb-1">
            HORAS, KAWAN LOKAL
          </Text>
          <Text className="font-raleway text-3xl font-normal text-on-surface tracking-wide leading-tight">
            Jelajahi keagungan{'\n'}budaya Danau Toba
          </Text>
        </View>

        {/* CTA Kalender Budaya Toba */}
        <View className="mb-6">
          <Pressable
            accessibilityLabel="Eksplorasi Ritus dan Festival Adat"
            accessibilityRole="button"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push('/calendar');
            }}
            className="flex-row items-center justify-between w-full bg-white/85 rounded-2xl border border-white/90 shadow-sm p-4 active:opacity-90"
          >
            <View className="flex-row items-center flex-1 mr-3">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3.5">
                <AppIcon name="calendar" size={20} color="#1D4ED8" />
              </View>
              <View className="flex-1">
                <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-primary">
                  AGENDA BUDAYA TERDEKAT
                </Text>
                <Text className="text-sm font-raleway font-semibold text-on-surface tracking-wide mt-0.5">
                  Eksplorasi Ritus & Festival Adat
                </Text>
              </View>
            </View>
            <View className="flex-row items-center bg-primary px-3.5 py-2 rounded-full shadow-sm">
              <Text className="text-[11px] font-dmsans-bold text-white mr-1.5">Jadwal WIB</Text>
              <AppIcon name="arrow-right" size={12} color="#FFFFFF" />
            </View>
          </Pressable>
        </View>

        {/* Kategori Cepat Layanan Lokal (PRD F3) */}
        <View className="mb-7">
          <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant mb-3">
            LAYANAN UTAMA
          </Text>
          <View className="flex-row justify-between">
            {LOCAL_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <Pressable
                  key={cat.id}
                  onPress={() => handleCategoryPress(cat.id)}
                  className="items-center active:opacity-75"
                >
                  <View
                    className={`w-16 h-16 rounded-2xl items-center justify-center shadow-sm border ${
                      isSelected
                        ? 'bg-blue-50/80 border-primary'
                        : 'bg-white/80 border-white/90'
                    }`}
                  >
                    <AppIcon
                      name={cat.iconName}
                      size={26}
                      color={isSelected ? '#1D4ED8' : '#23201E'}
                    />
                  </View>
                  <Text
                    className={`mt-2 text-[11px] font-dmsans-medium ${
                      isSelected ? 'text-primary font-semibold' : 'text-on-surface'
                    }`}
                  >
                    {cat.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Acara Budaya Terdekat (PRD F2) */}
        <View className="mb-7">
          <View className="flex-row items-end justify-between mb-3.5">
            <View>
              <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant mb-0.5">
                AGENDA RESMI
              </Text>
              <Text className="font-raleway text-xl font-medium text-on-surface tracking-wide">
                Acara Budaya Terdekat
              </Text>
            </View>
            <Pressable
              onPress={() => router.push('/destinations')}
              className="active:opacity-70 pb-0.5"
            >
              <Text className="text-[11px] uppercase tracking-[0.15em] font-dmsans-bold text-primary">
                LIHAT SEMUA
              </Text>
            </Pressable>
          </View>

          {/* 2-Column Responsive Card Grid */}
          <View className="flex-row gap-3.5">
            {/* Card 1: Pesta Danau Toba */}
            <Pressable
              onPress={() => router.push('/calendar')}
              className="flex-1 bg-white/80 rounded-3xl border border-white/80 overflow-hidden shadow-sm active:opacity-90"
            >
              <View className="relative w-full aspect-[4/3] bg-surface-tonal overflow-hidden">
                <Image
                  source={PHOTO_COVERS.parapat}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <Pressable
                  accessibilityLabel="Simpan acara"
                  onPress={() => toggleFavorite('pesta-toba')}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/70 border border-white/60 items-center justify-center shadow-sm active:opacity-80"
                >
                  <Ionicons
                    name={favorites['pesta-toba'] ? 'heart' : 'heart-outline'}
                    size={16}
                    color={favorites['pesta-toba'] ? '#8C4A4A' : '#4A4542'}
                  />
                </Pressable>
              </View>

              <View className="p-3.5">
                <Text numberOfLines={1} className="font-raleway text-base font-medium text-on-surface tracking-wide leading-tight">
                  Pesta Danau Toba
                </Text>
                <Text className="text-[11px] font-dmsans text-on-surface-variant mt-0.5">Parapat, Simalungun</Text>
                
                <View className="flex-row items-center mt-2 gap-1.5">
                  <Ionicons name="time-outline" size={12} color="#8A827A" />
                  <Text className="text-[11px] font-dmsans-medium text-on-surface-strong">10.00 WIB</Text>
                </View>

                <View className="mt-3 pt-2.5 border-t border-border/60 flex-row items-center justify-between">
                  <Text className="text-[10px] uppercase tracking-wider font-dmsans-medium text-on-surface-variant">Tiket</Text>
                  <Text className="text-xs font-dmsans-bold text-primary">Rp 50.000</Text>
                </View>
              </View>
            </Pressable>

            {/* Card 2: Upacara Mangongkal Holi */}
            <Pressable
              onPress={() => router.push('/calendar')}
              className="flex-1 bg-white/80 rounded-3xl border border-white/80 overflow-hidden shadow-sm active:opacity-90"
            >
              <View className="relative w-full aspect-[4/3] bg-surface-tonal overflow-hidden">
                <Image
                  source={PHOTO_COVERS.desaTomok}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <Pressable
                  accessibilityLabel="Simpan acara"
                  onPress={() => toggleFavorite('mangongkal-holi')}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/70 border border-white/60 items-center justify-center shadow-sm active:opacity-80"
                >
                  <Ionicons
                    name={favorites['mangongkal-holi'] ? 'heart' : 'heart-outline'}
                    size={16}
                    color={favorites['mangongkal-holi'] ? '#8C4A4A' : '#4A4542'}
                  />
                </Pressable>
              </View>

              <View className="p-3.5">
                <Text numberOfLines={1} className="font-raleway text-base font-medium text-on-surface tracking-wide leading-tight">
                  Mangongkal Holi
                </Text>
                <Text className="text-[11px] font-dmsans text-on-surface-variant mt-0.5">Tomok, Samosir</Text>

                <View className="flex-row items-center mt-2 gap-1.5">
                  <Ionicons name="time-outline" size={12} color="#8A827A" />
                  <Text className="text-[11px] font-dmsans-medium text-on-surface-strong">09.00 WIB</Text>
                </View>

                <View className="mt-3 pt-2.5 border-t border-border/60 flex-row items-center justify-between">
                  <Text className="text-[10px] uppercase tracking-wider font-dmsans-medium text-on-surface-variant">Status</Text>
                  <Text className="text-xs font-dmsans-bold text-emerald-700">Terbuka</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Promo / Sorotan Budaya Lokal */}
        <View className="bg-surface-tonal border border-border/80 rounded-3xl p-5 shadow-sm flex-row items-center justify-between overflow-hidden relative">
          <View className="space-y-1.5 flex-1 pr-3 z-10">
            <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant">
              PENGALAMAN TERPILIH
            </Text>
            <Text className="font-raleway text-lg font-medium text-on-surface leading-snug">
              Tur Budaya Desa Tomok{'\n'}
              <Text className="text-xs font-dmsans font-normal text-on-surface-variant">
                Bersama Pemandu Adat Berlisensi
              </Text>
            </Text>
            <Pressable
              onPress={() => router.push('/booking/new')}
              className="mt-3 flex-row items-center gap-1.5 active:opacity-75"
            >
              <Text className="text-[11px] uppercase tracking-[0.15em] font-dmsans-bold text-primary">
                PESAN LAYANAN
              </Text>
              <Ionicons name="arrow-forward" size={13} color="#1D4ED8" />
            </Pressable>
          </View>

          {/* Banner Graphic Toba */}
          <View className="w-16 h-16 bg-white/70 rounded-2xl border border-white/80 items-center justify-center">
            <AppIcon name="map" size={32} color="#1D4ED8" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
