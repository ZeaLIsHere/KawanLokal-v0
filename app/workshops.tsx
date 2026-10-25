import React, { useState, useMemo } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { AppIcon } from '@/components/AppIcon';
import { TOBA_IMAGES } from '@/constants/images';

interface WorkshopItem {
  id: string;
  title: string;
  studioName: string;
  district: string;
  duration: string;
  included: string;
  pricePerPerson: string;
  rating: number;
  level: string;
  image: string;
}

const SEED_WORKSHOPS: WorkshopItem[] = [
  {
    id: 'w-1',
    title: 'Belajar Menenun Ulos Tradisional (Gedongan)',
    studioName: 'Sanggar Tenun Lumban Suhi-Suhi',
    district: 'Samosir',
    duration: '3 Jam Sesi Praktik',
    included: 'Bahan benang kapas, alat tenun kayu, hasil tenun mini dibawa pulang',
    pricePerPerson: 'Rp 150.000',
    rating: 4.92,
    level: 'Pemula',
    image: TOBA_IMAGES.ulosWeaving,
  },
  {
    id: 'w-2',
    title: 'Seni Ukir Gorga Batak pada Papan Kayu',
    studioName: 'Komunitas Pengrajin Gorga Balige',
    district: 'Toba',
    duration: '2.5 Jam',
    included: 'Pahat ukir kayu, pewarna alami 3 warna khas Batak (merah, putih, hitam)',
    pricePerPerson: 'Rp 175.000',
    rating: 4.88,
    level: 'Semua Tingkat',
    image: TOBA_IMAGES.batakWoodCarving,
  },
  {
    id: 'w-3',
    title: 'Membuat Kuliner Khas Toba: Naniura & Tipatipa',
    studioName: 'Dapur Warisan Opung Parapat',
    district: 'Simalungun',
    duration: '2 Jam Demo & Memasak',
    included: 'Ikan mas segar Danau Toba, bumbu andaliman, sesi santap bersama',
    pricePerPerson: 'Rp 125.000',
    rating: 4.85,
    level: 'Pecinta Kuliner',
    image: TOBA_IMAGES.tobaCulinary,
  },
  {
    id: 'w-4',
    title: 'Kelas Dasar Memainkan Alat Musik Sarune Bolon & Taganing',
    studioName: 'Sanggar Seni Tortor Tomok',
    district: 'Samosir',
    duration: '2 Jam Praktik',
    included: 'Instrumen musik tradisional lengkap dipandu maestro gondang',
    pricePerPerson: 'Rp 135.000',
    rating: 4.95,
    level: 'Pemula',
    image: TOBA_IMAGES.gondangMusic,
  },
];

const FILTER_LEVELS = ['Semua', 'Pemula', 'Semua Tingkat', 'Pecinta Kuliner'];

export default function WorkshopsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Semua');

  const filteredWorkshops = useMemo(() => {
    return SEED_WORKSHOPS.filter((w) => {
      const matchLevel =
        selectedLevel === 'Semua' || w.level === selectedLevel;
      const matchQuery =
        w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.studioName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.district.toLowerCase().includes(searchQuery.toLowerCase());
      return matchLevel && matchQuery;
    });
  }, [searchQuery, selectedLevel]);

  return (
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top']}>
      {/* Top Header */}
      <View className="flex-row items-center justify-between px-4 py-2.5 bg-surface-card border-b border-card-border/60 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center active:bg-stone-100 active:opacity-80"
        >
          <AppIcon name="arrow-left" size={22} />
        </Pressable>

        <Text className="text-lg font-bold text-on-surface tracking-tight">
          Workshop Seni & Budaya
        </Text>

        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1 px-4 pt-3"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View className="mb-3">
          <View className="flex-row items-center w-full bg-surface-card rounded-2xl border border-card-border shadow-sm px-3.5 h-12">
            <AppIcon name="search" size={20} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Cari workshop tenun, ukir gorga, kuliner..."
              placeholderTextColor="#737686"
              className="flex-1 ml-2.5 text-sm font-medium text-on-surface h-full"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')} className="p-1">
                <Ionicons name="close-circle" size={18} color="#737686" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Filter Chips */}
        <View className="mb-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {FILTER_LEVELS.map((chip) => {
              const isSelected = selectedLevel === chip;
              return (
                <Pressable
                  key={chip}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                    setSelectedLevel(chip);
                  }}
                  className={`mr-2 px-4 py-2 rounded-full border shadow-sm active:opacity-80 ${
                    isSelected
                      ? 'bg-ulos-red border-ulos-red'
                      : 'bg-surface-card border-card-border'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      isSelected ? 'text-white' : 'text-on-surface'
                    }`}
                  >
                    {chip}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* List of Workshops */}
        <View className="gap-3.5">
          {filteredWorkshops.map((ws) => (
            <View
              key={ws.id}
              className="bg-surface-card rounded-2xl border border-card-border overflow-hidden shadow-sm"
            >
              <View className="relative w-full h-40 bg-stone-100">
                <Image
                  source={{ uri: ws.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute top-3 left-3 bg-stone-900/70 backdrop-blur-md px-2.5 py-1 rounded-full">
                  <Text className="text-[10px] font-bold text-white tracking-wide">
                    {ws.level}
                  </Text>
                </View>
                <View className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full flex-row items-center gap-1">
                  <AppIcon name="star" size={13} />
                  <Text className="text-xs font-bold text-on-surface">{ws.rating}</Text>
                </View>
              </View>

              <View className="p-4">
                <Text className="text-base font-bold text-on-surface leading-snug">
                  {ws.title}
                </Text>

                <Text className="text-xs text-secondary mt-1">
                  {ws.studioName} • {ws.district}
                </Text>

                <View className="flex-row items-center gap-1.5 mt-2 bg-stone-50 p-2 rounded-xl">
                  <Ionicons name="time-outline" size={14} color="#78716C" />
                  <Text className="text-[11px] font-medium text-stone-700">
                    Durasi: {ws.duration}
                  </Text>
                </View>

                <View className="mt-2">
                  <Text className="text-[11px] text-secondary">
                    Termasuk: <Text className="text-stone-800">{ws.included}</Text>
                  </Text>
                </View>

                <View className="mt-3.5 pt-3 border-t border-card-border flex-row items-center justify-between">
                  <View>
                    <Text className="text-[10px] text-secondary">Biaya / Peserta</Text>
                    <Text className="text-base font-extrabold text-ulos-red">
                      {ws.pricePerPerson}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                      router.push('/booking/new');
                    }}
                    className="px-4 py-2 bg-ulos-red active:bg-ulos-redDark rounded-xl flex-row items-center gap-1.5 shadow-sm active:opacity-90"
                  >
                    <AppIcon name="suitcase" size={16} color="#FFFFFF" />
                    <Text className="text-xs font-bold text-white">Ikuti Kelas</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}

          {filteredWorkshops.length === 0 && (
            <View className="items-center justify-center py-12 px-6">
              <View className="w-14 h-14 rounded-2xl bg-stone-100 items-center justify-center mb-3">
                <AppIcon name="suitcase" size={28} />
              </View>
              <Text className="text-sm font-bold text-on-surface">Tidak ada workshop ditemukan</Text>
              <Text className="text-xs text-secondary text-center mt-1">
                Silakan cari dengan kata kunci lain.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
