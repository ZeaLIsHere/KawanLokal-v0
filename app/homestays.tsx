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
import { TOBA_IMAGES } from '@/constants/images';

interface HomestayItem {
  id: string;
  title: string;
  location: string;
  district: string;
  rating: number;
  priceFormatted: string;
  image: string;
}

const FEATURED_HOMESTAY: HomestayItem = {
  id: 'h-feat',
  title: 'Sopo Bolon Tradisional Tepi Danau',
  location: 'Tuktuk Siadong, Samosir',
  district: 'Tuktuk',
  rating: 4.9,
  priceFormatted: 'Rp 350.000',
  image: TOBA_IMAGES.rumahBolonTraditional,
};

const RECOMMENDED_HOMESTAYS: HomestayItem[] = [
  {
    id: 'h1',
    title: 'Homestay Bagas Nagodang',
    location: 'Balige, Toba',
    district: 'Balige',
    rating: 4.8,
    priceFormatted: 'Rp 275.000',
    image: TOBA_IMAGES.sopoBolonToba,
  },
  {
    id: 'h2',
    title: 'Parapat Lakeview Cottage',
    location: 'Pantai Bebas, Parapat',
    district: 'Parapat',
    rating: 4.7,
    priceFormatted: 'Rp 420.000',
    image: TOBA_IMAGES.lakeTobaParapat,
  },
  {
    id: 'h3',
    title: 'Guesthouse Tao Silalahi',
    location: 'Silalahi Nabolak, Dairi',
    district: 'Silalahi',
    rating: 4.6,
    priceFormatted: 'Rp 220.000',
    image: TOBA_IMAGES.taoSilalahi,
  },
  {
    id: 'h4',
    title: 'Lumban Suhi Cultural Stay',
    location: 'Pangururan, Samosir',
    district: 'Samosir',
    rating: 4.9,
    priceFormatted: 'Rp 310.000',
    image: TOBA_IMAGES.tomokVillage,
  },
];

const LOCATION_CHIPS = ['Semua', 'Tuktuk', 'Samosir', 'Parapat', 'Balige', 'Silalahi'];

export default function HomestaysScreen() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFeaturedFavorite, setIsFeaturedFavorite] = useState(false);

  const handleChipSelect = (loc: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setSelectedLocation(loc);
  };

  const filteredRecommended = useMemo(() => {
    return RECOMMENDED_HOMESTAYS.filter((item) => {
      const matchLoc =
        selectedLocation === 'Semua' || item.district === selectedLocation;
      const matchQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchLoc && matchQuery;
    });
  }, [selectedLocation, searchQuery]);

  return (
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top']}>
      {/* Header / Top Bar */}
      <View className="flex-row justify-between items-center px-4 py-2.5 bg-surface-card border-b border-card-border/60 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center active:bg-stone-100 active:opacity-80"
        >
          <Ionicons name="arrow-back" size={24} color="#131b2e" />
        </Pressable>

        <Text className="text-lg font-bold text-on-surface tracking-tight">
          Homestay & Penginapan
        </Text>

        <Pressable
          accessibilityLabel="Filter penginapan"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
          }}
          className="w-10 h-10 rounded-full items-center justify-center active:bg-stone-100 active:opacity-80"
        >
          <Ionicons name="options-outline" size={22} color="#131b2e" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-3"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Input Field */}
        <View className="mb-3">
          <View className="relative flex-row items-center w-full bg-surface-card rounded-2xl border border-card-border shadow-sm px-3.5 h-12">
            <Ionicons name="search" size={20} color="#737686" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Cari homestay, sopo bolon, desa..."
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

        {/* Category Filter Chips / Horizontal Scroll */}
        <View className="mb-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row py-1 -mx-4 px-4"
          >
            {LOCATION_CHIPS.map((chip) => {
              const isSelected = selectedLocation === chip;
              return (
                <Pressable
                  key={chip}
                  onPress={() => handleChipSelect(chip)}
                  className={`mr-2 px-5 py-2 rounded-full border shadow-sm active:opacity-80 ${
                    isSelected
                      ? 'bg-ulos-red border-ulos-red'
                      : 'bg-surface-card border-card-border'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold whitespace-nowrap ${
                      isSelected ? 'text-white' : 'text-secondary'
                    }`}
                  >
                    {chip}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Featured / Hero Card: Sopo Bolon Tradisional */}
        <View className="mb-5">
          <Pressable
            onPress={() => router.push('/(tabs)/explore')}
            className="relative w-full h-56 rounded-2xl overflow-hidden shadow-sm border border-card-border active:opacity-90"
          >
            <Image
              source={{ uri: FEATURED_HOMESTAY.image }}
              className="w-full h-full"
              resizeMode="cover"
            />
            {/* Gradient Mask for Legibility */}
            <View className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/90 via-[#0b1c30]/30 to-transparent pointer-events-none" />

            {/* Top-Right Favorite Button */}
            <Pressable
              accessibilityLabel="Simpan favorit"
              onPress={(e) => {
                e.stopPropagation();
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                setIsFeaturedFavorite(!isFeaturedFavorite);
              }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/25 backdrop-blur-md items-center justify-center active:opacity-80"
            >
              <Ionicons
                name={isFeaturedFavorite ? 'heart' : 'heart-outline'}
                size={18}
                color={isFeaturedFavorite ? '#DC2626' : '#FFFFFF'}
              />
            </Pressable>

            {/* Featured Badge */}
            <View className="absolute top-3 left-3 bg-ulos-red px-2.5 py-0.5 rounded-full">
              <Text className="text-[10px] font-bold text-white tracking-wide">
                PILIHAN UTAMA
              </Text>
            </View>

            {/* Bottom Card Content */}
            <View className="absolute bottom-3 left-3 right-3 flex-row justify-between items-end">
              <View className="flex-1 pr-2">
                <Text className="text-base font-bold text-white tracking-tight leading-snug">
                  {FEATURED_HOMESTAY.title}
                </Text>
                <Text className="text-xs text-stone-300 mt-0.5">
                  {FEATURED_HOMESTAY.location}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-base font-bold text-white tracking-tight">
                  {FEATURED_HOMESTAY.priceFormatted}
                </Text>
                <Text className="text-[11px] text-stone-300">/malam</Text>
              </View>
            </View>
          </Pressable>
        </View>

        {/* Recommended Hotels/Homestays Section */}
        <View className="gap-3">
          {/* Section Header */}
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-base font-bold text-on-surface">
              Penginapan Rekomendasi
            </Text>
            <Pressable onPress={() => router.push('/(tabs)/explore')}>
              <Text className="text-xs font-semibold text-ulos-red">Lihat Semua</Text>
            </Pressable>
          </View>

          {/* List Items (Horizontal Card Pattern) */}
          <View className="gap-3">
            {filteredRecommended.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => router.push('/(tabs)/explore')}
                className="flex-row items-center p-2.5 bg-surface-card rounded-2xl border border-card-border shadow-sm active:opacity-90"
              >
                {/* Thumbnail Image 80x80 */}
                <View className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>

                {/* Middle Info Column */}
                <View className="flex-1 min-w-0 ml-3.5 justify-between h-20 py-0.5">
                  <View>
                    <Text
                      numberOfLines={1}
                      className="text-sm font-bold text-on-surface leading-snug"
                    >
                      {item.title}
                    </Text>
                    <Text
                      numberOfLines={1}
                      className="text-xs text-secondary mt-0.5"
                    >
                      {item.location}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-1">
                    <Ionicons name="star" size={14} color="#F59E0B" />
                    <Text className="text-xs font-semibold text-on-surface">
                      {item.rating.toFixed(1)}
                    </Text>
                  </View>
                </View>

                {/* Right Price Column */}
                <View className="shrink-0 items-end justify-end h-20 pb-0.5 pl-2">
                  <Text className="text-sm font-bold text-ulos-red">
                    {item.priceFormatted}
                  </Text>
                  <Text className="text-[10px] text-secondary -mt-0.5">
                    /malam
                  </Text>
                </View>
              </Pressable>
            ))}

            {filteredRecommended.length === 0 && (
              <View className="items-center justify-center py-8">
                <Ionicons name="bed-outline" size={36} color="#CBD5E1" />
                <Text className="text-xs font-semibold text-on-surface mt-2">
                  Tidak ada penginapan di lokasi ini
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
