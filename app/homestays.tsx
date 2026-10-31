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
import { LOCAL_PHOTOS, PHOTO_COVERS } from '@/constants/localPhotos';
import { useTranslation } from '@/i18n';

interface HomestayItem {
  id: string;
  title: string;
  location: string;
  district: string;
  rating: number;
  priceFormatted: string;
  image: ImageSourcePropType;
}

const FEATURED_HOMESTAY: HomestayItem = {
  id: 'h-feat',
  title: 'Sopo Bolon Tradisional Tepi Danau',
  location: 'Tuktuk Siadong, Samosir',
  district: 'Tuktuk',
  rating: 4.9,
  priceFormatted: 'Rp 350.000',
  image: PHOTO_COVERS.homestaySopo,
};

const RECOMMENDED_HOMESTAYS: HomestayItem[] = [
  {
    id: 'h1',
    title: 'Homestay Bagas Nagodang',
    location: 'Balige, Toba',
    district: 'Balige',
    rating: 4.8,
    priceFormatted: 'Rp 275.000',
    image: LOCAL_PHOTOS.homestaySopo[1] || PHOTO_COVERS.homestaySopo,
  },
  {
    id: 'h2',
    title: 'Parapat Lakeview Cottage',
    location: 'Pantai Bebas, Parapat',
    district: 'Parapat',
    rating: 4.7,
    priceFormatted: 'Rp 420.000',
    image: PHOTO_COVERS.parapat,
  },
  {
    id: 'h3',
    title: 'Guesthouse Tao Silalahi',
    location: 'Silalahi Nabolak, Dairi',
    district: 'Silalahi',
    rating: 4.6,
    priceFormatted: 'Rp 220.000',
    image: PHOTO_COVERS.taoSilalahi,
  },
  {
    id: 'h4',
    title: 'Lumban Suhi Cultural Stay',
    location: 'Pangururan, Samosir',
    district: 'Samosir',
    rating: 4.9,
    priceFormatted: 'Rp 310.000',
    image: PHOTO_COVERS.kampungSuhisuhi,
  },
];

const LOCATION_CHIPS = ['Semua', 'Tuktuk', 'Samosir', 'Parapat', 'Balige', 'Silalahi'];

export default function HomestaysScreen() {
  const router = useRouter();
  const { t } = useTranslation();
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
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      {/* Top App Bar Glassmorphic (DESIGN.md: top-app-bar + button-icon-glass) */}
      <View className="flex-row justify-between items-center px-5 py-3 bg-white/75 border-b border-border/50 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-11 h-11 rounded-full items-center justify-center bg-white/80 border border-white/90 shadow-sm"
        >
          <AppIcon name="arrow-left" size={20} color="#23201E" />
        </Pressable>

        <View className="items-center">
          <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
            {t('homestays.header_title')}
          </Text>
        </View>

        {/* Spacer seimbang */}
        <View className="w-11" />
      </View>

      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Input Field Capsule */}
        <View className="mb-4">
          <View className="flex-row items-center w-full bg-white/85 rounded-full border border-white/90 shadow-xs px-4 h-12">
            <AppIcon name="search" size={18} color="#8A827A" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={t('homestays.search_placeholder')}
              placeholderTextColor="#8A827A"
              className="flex-1 ml-2.5 text-xs font-dmsans text-on-surface h-full"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')} className="p-1">
                <Ionicons name="close-circle" size={16} color="#8A827A" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Location Filter Chips (DESIGN.md: chip & chip-active) */}
        <View className="mb-5">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row -mx-1 px-1"
          >
            {LOCATION_CHIPS.map((chip) => {
              const isSelected = selectedLocation === chip;
              return (
                <Pressable
                  key={chip}
                  onPress={() => handleChipSelect(chip)}
                  className={`mr-2 h-8 px-4 rounded-full items-center justify-center ${
                    isSelected
                      ? 'bg-primary shadow-xs'
                      : 'bg-white/80 border border-border/60'
                  }`}
                >
                  <Text
                    className={`text-[11px] font-dmsans-bold tracking-wider uppercase ${
                      isSelected ? 'text-white' : 'text-on-surface-strong'
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
        <View className="mb-6">
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              router.push({
                pathname: '/booking/new',
                params: {
                  service_type: 'homestay',
                  event_title: FEATURED_HOMESTAY.title,
                  event_location: FEATURED_HOMESTAY.location,
                  event_price: FEATURED_HOMESTAY.priceFormatted,
                },
              });
            }}
            className="relative w-full h-60 rounded-3xl overflow-hidden shadow-sm border border-white/80 bg-surface-tonal"
          >
            <Image
              source={FEATURED_HOMESTAY.image}
              className="w-full h-full"
              resizeMode="cover"
            />
            {/* Gradient Mask for Legibility */}
            <View className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

            {/* Top Badge & Favorite Button */}
            <View className="absolute top-3.5 inset-x-3.5 flex-row items-center justify-between z-10">
              <View className="px-3 py-1 rounded-full bg-white/90 border border-white shadow-xs">
                <Text className="text-[10px] uppercase tracking-wider font-dmsans-bold text-primary">
                  {t('homestays.featured_badge')}
                </Text>
              </View>

              <Pressable
                accessibilityLabel="Simpan favorit"
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                  setIsFeaturedFavorite(!isFeaturedFavorite);
                }}
                className="w-9 h-9 rounded-full bg-white/90 border border-white items-center justify-center shadow-xs"
              >
                <Ionicons
                  name={isFeaturedFavorite ? 'heart' : 'heart-outline'}
                  size={18}
                  color={isFeaturedFavorite ? '#DC2626' : '#23201E'}
                />
              </Pressable>
            </View>

            {/* Bottom Card Content */}
            <View className="absolute bottom-4 left-4 right-4 flex-row justify-between items-end">
              <View className="flex-1 pr-3">
                <Text className="font-raleway text-xl font-normal text-white tracking-wide leading-tight">
                  {FEATURED_HOMESTAY.title}
                </Text>
                <Text className="text-xs font-dmsans text-white/80 mt-1">
                  {FEATURED_HOMESTAY.location}
                </Text>
              </View>
              <View className="items-end shrink-0">
                <Text className="font-dmsans-bold text-base text-white">
                  {FEATURED_HOMESTAY.priceFormatted}
                </Text>
                <Text className="text-[10px] font-dmsans text-white/70">/malam</Text>
              </View>
            </View>
          </Pressable>
        </View>

        {/* Recommended Homestays Section */}
        <View className="mb-4">
          {/* Section Header */}
          <View className="mb-3.5 px-1">
            <Text className="font-raleway text-xl font-medium text-on-surface tracking-wide">
              {t('homestays.recommended_title')}
            </Text>
          </View>

          {/* List Items (DESIGN.md: list-row pattern) */}
          <View className="gap-3.5">
            {filteredRecommended.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                  router.push({
                    pathname: '/booking/new',
                    params: {
                      service_type: 'homestay',
                      event_title: item.title,
                      event_location: item.location,
                      event_price: item.priceFormatted,
                    },
                  });
                }}
                className="p-3.5 bg-white/85 rounded-3xl border border-white/90 flex-row items-center shadow-sm"
              >
                {/* Thumbnail Image */}
                <View className="w-24 h-24 rounded-2xl overflow-hidden bg-surface-tonal shrink-0 border border-white/80">
                  <Image
                    source={item.image}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>

                {/* Middle Info Column */}
                <View className="flex-1 min-w-0 ml-3.5 justify-between py-0.5">
                  <View>
                    <Text
                      numberOfLines={1}
                      className="font-raleway text-base font-medium text-on-surface leading-tight"
                    >
                      {item.title}
                    </Text>
                    <Text
                      numberOfLines={1}
                      className="text-xs font-dmsans text-on-surface-variant mt-1"
                    >
                      {item.location}
                    </Text>
                  </View>

                  <View className="flex-row items-center justify-between mt-2 pt-2 border-t border-border/50">
                    <View className="flex-row items-center gap-1 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded-full">
                      <Ionicons name="star" size={11} color="#D97706" />
                      <Text className="text-xs font-dmsans-bold text-amber-700">
                        {item.rating.toFixed(1)}
                      </Text>
                    </View>

                    <View className="items-end">
                      <Text className="text-sm font-dmsans-bold text-primary">
                        {item.priceFormatted}
                      </Text>
                      <Text className="text-[10px] font-dmsans text-on-surface-variant -mt-0.5">
                        /malam
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}

            {filteredRecommended.length === 0 && (
              <View className="items-center justify-center py-12 px-6 bg-white/70 rounded-3xl border border-white/80 text-center shadow-sm">
                <View className="w-14 h-14 rounded-full bg-surface-tonal items-center justify-center mb-3">
                  <Ionicons name="bed-outline" size={26} color="#8A827A" />
                </View>
                <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
                  {t('homestays.empty_title')}
                </Text>
                <Text className="text-xs font-dmsans text-on-surface-variant text-center mt-1 max-w-[260px] leading-relaxed">
                  {t('homestays.empty_desc')}
                </Text>
                <Pressable
                  onPress={() => {
                    setSearchQuery('');
                    setSelectedLocation('Semua');
                  }}
                  className="mt-4 h-10 px-5 rounded-full bg-white border border-border items-center justify-center shadow-xs"
                >
                  <Text className="text-[11px] uppercase tracking-[0.15em] font-dmsans-bold text-primary">
                    {t('common.reset_search')}
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
