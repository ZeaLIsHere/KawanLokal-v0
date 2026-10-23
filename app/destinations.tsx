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

interface DestinationItem {
  id: string;
  title: string;
  district: string;
  category: string;
  rating: number;
  image: string;
}

const DESTINATIONS: DestinationItem[] = [
  {
    id: 'd1',
    title: 'Pusuk Buhit',
    district: 'Samosir',
    category: 'Situs Sakral',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd2',
    title: 'Desa Adat Tomok',
    district: 'Samosir',
    category: 'Sejarah & Seni',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd3',
    title: 'Pantai Bebas Parapat',
    district: 'Simalungun',
    category: 'Festival & Wisata',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd4',
    title: 'Air Terjun Sipiso-piso',
    district: 'Karo',
    category: 'Panorama Alam',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd5',
    title: 'Huta Ginjang Muara',
    district: 'Tapanuli Utara',
    category: 'Teras Pandang',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd6',
    title: 'Lembah Bakkara',
    district: 'Humbang Hasundutan',
    category: 'Kerajaan Adat',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd7',
    title: 'Tao Silalahi',
    district: 'Dairi',
    category: 'Tepian & Konservasi',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd8',
    title: 'Kampung Tenun Suhi-Suhi',
    district: 'Samosir',
    category: 'Pusat Ulos',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
  },
];

const DISTRICT_CHIPS = [
  'Semua',
  'Samosir',
  'Simalungun',
  'Toba',
  'Tapanuli Utara',
  'Humbang Hasundutan',
  'Karo',
  'Dairi',
];

export default function DestinationsScreen() {
  const router = useRouter();
  const [selectedDistrict, setSelectedDistrict] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const handleChipSelect = (district: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setSelectedDistrict(district);
  };

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((item) => {
      const matchDistrict =
        selectedDistrict === 'Semua' || item.district === selectedDistrict;
      const matchQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDistrict && matchQuery;
    });
  }, [selectedDistrict, searchQuery]);

  return (
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top']}>
      {/* Top App Bar with back navigation */}
      <View className="w-full px-4 py-2.5 flex-row items-center justify-between bg-surface-card border-b border-card-border/60 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center text-on-surface active:bg-stone-100 active:opacity-80"
        >
          <Ionicons name="arrow-back" size={22} color="#131b2e" />
        </Pressable>

        <Text className="text-lg font-bold text-on-surface tracking-tight text-center">
          Destinasi Budaya
        </Text>

        {/* Balanced counterweight */}
        <View className="w-10 h-10" />
      </View>

      <ScrollView
        className="flex-1 px-4 pt-3"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Input Bar */}
        <View className="mb-3">
          <View className="relative flex-row items-center w-full bg-surface-card rounded-2xl border border-card-border shadow-sm px-3.5 h-12">
            <Ionicons name="search" size={20} color="#737686" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Cari destinasi atau situs adat..."
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

        {/* Category Filter Chips per Kabupaten Toba */}
        <View className="mb-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row py-1 -mx-4 px-4"
          >
            {DISTRICT_CHIPS.map((chip) => {
              const isSelected = selectedDistrict === chip;
              return (
                <Pressable
                  key={chip}
                  onPress={() => handleChipSelect(chip)}
                  className={`mr-2 px-4 py-2 rounded-full border shadow-sm active:opacity-80 ${
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

        {/* 2-Column Destination Cards Grid */}
        <View className="flex-row flex-wrap justify-between gap-y-3.5">
          {filteredDestinations.map((dest) => (
            <Pressable
              key={dest.id}
              onPress={() => router.push('/calendar')}
              className="w-[48.5%] bg-surface-card rounded-2xl p-2 border border-card-border shadow-sm active:opacity-90"
            >
              {/* Image with 4:3 aspect ratio */}
              <View className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 mb-2">
                <Image
                  source={{ uri: dest.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute top-1.5 left-1.5 bg-black/60 px-2 py-0.5 rounded-md">
                  <Text className="text-[9px] font-semibold text-white">
                    {dest.category}
                  </Text>
                </View>
              </View>

              {/* Details */}
              <View className="px-1 pb-1">
                <Text
                  numberOfLines={1}
                  className="text-sm font-semibold text-on-surface leading-snug"
                >
                  {dest.title}
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-[11px] text-secondary mt-0.5"
                >
                  {dest.district}
                </Text>

                <View className="flex-row items-center gap-1 mt-1.5">
                  <Ionicons name="star" size={14} color="#F59E0B" />
                  <Text className="text-xs font-semibold text-on-surface">
                    {dest.rating.toFixed(1)}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {filteredDestinations.length === 0 && (
          <View className="items-center justify-center py-12">
            <Ionicons name="location-outline" size={40} color="#CBD5E1" />
            <Text className="text-sm font-semibold text-on-surface mt-2">
              Tidak ada destinasi ditemukan
            </Text>
            <Text className="text-xs text-secondary mt-1 text-center">
              Coba gunakan kata kunci lain atau pilih kabupaten yang berbeda.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
