import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { AppIcon } from '@/components/AppIcon';
import { PHOTO_COVERS } from '@/constants/localPhotos';

interface GuideItem {
  id: string;
  name: string;
  specialty: string;
  district: string;
  languages: string[];
  experienceYears: number;
  pricePerTrip: string;
  rating: number;
  totalTrips: number;
  avatar: ImageSourcePropType;
  verified: boolean;
}

const SEED_GUIDES: GuideItem[] = [
  {
    id: 'g-1',
    name: 'Bona Simanjuntak',
    specialty: 'Sejarah Makam Raja & Adat Batak Samosir',
    district: 'Samosir (Tomok & Simanindo)',
    languages: ['Batak Toba', 'Bahasa Indonesia', 'English'],
    experienceYears: 8,
    pricePerTrip: 'Rp 250.000',
    rating: 4.95,
    totalTrips: 184,
    avatar: PHOTO_COVERS.desaTomok,
    verified: true,
  },
  {
    id: 'g-2',
    name: 'Tiurmaida Sinaga',
    specialty: 'Filosofi Tenun Ulos & Wisata Desa Adat',
    district: 'Samosir (Lumban Suhi-Suhi)',
    languages: ['Batak Toba', 'Bahasa Indonesia'],
    experienceYears: 5,
    pricePerTrip: 'Rp 200.000',
    rating: 4.88,
    totalTrips: 92,
    avatar: PHOTO_COVERS.ulos,
    verified: true,
  },
  {
    id: 'g-3',
    name: 'Jansen Hutapea',
    specialty: 'Trekking Pusuk Buhit & Cerita Asal-Usul Batak',
    district: 'Samosir & Simalungun',
    languages: ['Bahasa Indonesia', 'English', 'Deutsch'],
    experienceYears: 10,
    pricePerTrip: 'Rp 350.000',
    rating: 5.0,
    totalTrips: 310,
    avatar: PHOTO_COVERS.pusukBuhit,
    verified: true,
  },
  {
    id: 'g-4',
    name: 'Martua Pangaribuan',
    specialty: 'Geosite Kaldera Toba & Sejarah Letusan Supervolcano',
    district: 'Toba & Humbang Hasundutan',
    languages: ['Batak Toba', 'Bahasa Indonesia'],
    experienceYears: 6,
    pricePerTrip: 'Rp 275.000',
    rating: 4.82,
    totalTrips: 118,
    avatar: PHOTO_COVERS.gondang,
    verified: true,
  },
];

const FILTER_DISTRICTS = ['Semua', 'Samosir', 'Simalungun', 'Toba', 'Humbang Hasundutan'];

export default function GuidesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('Semua');

  const filteredGuides = useMemo(() => {
    return SEED_GUIDES.filter((g) => {
      const matchDistrict =
        selectedDistrict === 'Semua' || g.district.includes(selectedDistrict);
      const matchQuery =
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.district.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDistrict && matchQuery;
    });
  }, [searchQuery, selectedDistrict]);

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
          Pemandu Budaya Lokal
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
              placeholder="Cari pemandu, keahlian adat, lokasi..."
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

        {/* Filter Chips Kabupaten */}
        <View className="mb-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {FILTER_DISTRICTS.map((chip) => {
              const isSelected = selectedDistrict === chip;
              return (
                <Pressable
                  key={chip}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                    setSelectedDistrict(chip);
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

        {/* List of Guides */}
        <View className="gap-3.5">
          {filteredGuides.map((guide) => (
            <View
              key={guide.id}
              className="bg-surface-card rounded-2xl border border-card-border p-4 shadow-sm"
            >
              <View className="flex-row items-start gap-3.5">
                <View className="relative">
                  <Image
                    source={guide.avatar}
                    className="w-16 h-16 rounded-2xl bg-stone-100"
                    resizeMode="cover"
                  />
                  {guide.verified && (
                    <View className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-ulos-red items-center justify-center border-2 border-white">
                      <Ionicons name="checkmark" size={11} color="#FFFFFF" />
                    </View>
                  )}
                </View>

                <View className="flex-1 min-w-0">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-base font-bold text-on-surface">
                      {guide.name}
                    </Text>
                    <View className="flex-row items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full">
                      <AppIcon name="star" size={12} />
                      <Text className="text-xs font-bold text-amber-700">{guide.rating}</Text>
                    </View>
                  </View>

                  <Text className="text-xs text-secondary mt-0.5" numberOfLines={2}>
                    {guide.specialty}
                  </Text>

                  <View className="flex-row items-center gap-1.5 mt-2">
                    <AppIcon name="location-pin" size={13} />
                    <Text className="text-[11px] text-stone-600 font-medium">
                      {guide.district}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Tag Bahasa & Pengalaman */}
              <View className="flex-row flex-wrap gap-1.5 mt-3 pt-3 border-t border-card-border">
                {guide.languages.map((lang) => (
                  <View key={lang} className="px-2 py-0.5 rounded-md bg-stone-100">
                    <Text className="text-[10px] font-semibold text-stone-600">{lang}</Text>
                  </View>
                ))}
                <View className="px-2 py-0.5 rounded-md bg-blue-50">
                  <Text className="text-[10px] font-semibold text-ulos-red">
                    {guide.experienceYears} thn pengalaman • {guide.totalTrips} trip
                  </Text>
                </View>
              </View>

              {/* Action Button & Tarif */}
              <View className="mt-3.5 pt-2 flex-row items-center justify-between">
                <View>
                  <Text className="text-[10px] text-secondary">Tarif / Tur Rombongan</Text>
                  <Text className="text-base font-extrabold text-ulos-red">
                    {guide.pricePerTrip}
                  </Text>
                </View>

                <Pressable
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                    router.push('/booking/new');
                  }}
                  className="px-4 py-2 bg-ulos-red active:bg-ulos-redDark rounded-xl flex-row items-center gap-1.5 shadow-sm active:opacity-90"
                >
                  <AppIcon name="profile" size={16} color="#FFFFFF" />
                  <Text className="text-xs font-bold text-white">Pesan Pemandu</Text>
                </Pressable>
              </View>
            </View>
          ))}

          {filteredGuides.length === 0 && (
            <View className="items-center justify-center py-12 px-6">
              <View className="w-14 h-14 rounded-2xl bg-stone-100 items-center justify-center mb-3">
                <AppIcon name="profile" size={28} />
              </View>
              <Text className="text-sm font-bold text-on-surface">Tidak ada pemandu ditemukan</Text>
              <Text className="text-xs text-secondary text-center mt-1">
                Silakan cari dengan lokasi atau nama lain.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
