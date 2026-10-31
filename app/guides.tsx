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
import { useTranslation } from '@/i18n';

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
  promo?: {
    minParticipants: number;
    discountPercent: number;
    label: string;
  };
}

const SEED_GUIDES: GuideItem[] = [
  {
    id: 'g-1',
    name: 'Bona Simanjuntak',
    specialty: 'Sejarah Makam Raja & Adat Batak Samosir',
    district: 'Samosir (Tomok & Simanindo)',
    languages: ['Batak Toba', 'Indonesia', 'English'],
    experienceYears: 8,
    pricePerTrip: 'Rp 250.000',
    rating: 4.95,
    totalTrips: 184,
    avatar: PHOTO_COVERS.desaTomok,
    verified: true,
    promo: {
      minParticipants: 4,
      discountPercent: 15,
      label: 'Diskon 15% min. 4 org',
    },
  },
  {
    id: 'g-2',
    name: 'Tiurmaida Sinaga',
    specialty: 'Filosofi Tenun Ulos & Wisata Desa Adat',
    district: 'Samosir (Lumban Suhi-Suhi)',
    languages: ['Batak Toba', 'Indonesia'],
    experienceYears: 5,
    pricePerTrip: 'Rp 200.000',
    rating: 4.88,
    totalTrips: 92,
    avatar: PHOTO_COVERS.ulos,
    verified: true,
    promo: {
      minParticipants: 4,
      discountPercent: 20,
      label: 'Diskon 20% min. 4 org',
    },
  },
  {
    id: 'g-3',
    name: 'Jansen Hutapea',
    specialty: 'Trekking Pusuk Buhit & Asal-Usul Batak',
    district: 'Samosir & Simalungun',
    languages: ['Indonesia', 'English', 'Deutsch'],
    experienceYears: 10,
    pricePerTrip: 'Rp 350.000',
    rating: 5.0,
    totalTrips: 310,
    avatar: PHOTO_COVERS.pusukBuhit,
    verified: true,
    promo: {
      minParticipants: 4,
      discountPercent: 15,
      label: 'Diskon 15% min. 4 org',
    },
  },
  {
    id: 'g-4',
    name: 'Martua Pangaribuan',
    specialty: 'Geosite Kaldera & Geologi Danau Toba',
    district: 'Toba & Humbang Hasundutan',
    languages: ['Batak Toba', 'Indonesia'],
    experienceYears: 6,
    pricePerTrip: 'Rp 275.000',
    rating: 4.82,
    totalTrips: 118,
    avatar: PHOTO_COVERS.gondang,
    verified: true,
    promo: {
      minParticipants: 4,
      discountPercent: 10,
      label: 'Diskon 10% min. 4 org',
    },
  },
];

const FILTER_DISTRICTS = ['Semua', 'Samosir', 'Simalungun', 'Toba', 'Humbang'];

export default function GuidesScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('Semua');

  const filteredGuides = useMemo(() => {
    return SEED_GUIDES.filter((g) => {
      const matchDistrict =
        selectedDistrict === 'Semua' || g.district.toLowerCase().includes(selectedDistrict.toLowerCase());
      const matchQuery =
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.district.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDistrict && matchQuery;
    });
  }, [searchQuery, selectedDistrict]);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      {/* Top App Bar Glassmorphic (DESIGN.md: top-app-bar + button-icon-glass) */}
      <View className="flex-row items-center justify-between px-5 py-3 bg-white/70 border-b border-border/50 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-11 h-11 items-center justify-center rounded-full bg-white/80 border border-white/90 shadow-sm"
        >
          <AppIcon name="arrow-left" size={20} color="#23201E" />
        </Pressable>

        <View className="items-center">
          <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
            {t('guides.header_title')}
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
        {/* Search Bar Capsule (DESIGN.md: input-text glassmorphic) */}
        <View className="mb-4">
          <View className="flex-row items-center w-full bg-white/85 rounded-full border border-white/90 shadow-xs px-4 h-12">
            <AppIcon name="search" size={18} color="#8A827A" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={t('guides.search_placeholder')}
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

        {/* Filter Chips Wilayah (DESIGN.md: chip & chip-active) */}
        <View className="mb-5">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row -mx-1 px-1">
            {FILTER_DISTRICTS.map((chip) => {
              const isSelected = selectedDistrict === chip;
              return (
                <Pressable
                  key={chip}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                    setSelectedDistrict(chip);
                  }}
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

        {/* Section Title */}
        <View className="mb-3.5 px-1">
          <Text className="font-raleway text-xl font-medium text-on-surface tracking-wide">
            {t('guides.section_title')}
          </Text>
        </View>

        {/* List Kartu Pemandu (DESIGN.md: card glassmorphic) */}
        <View className="gap-4">
          {filteredGuides.map((guide) => (
            <View
              key={guide.id}
              className="bg-white/85 rounded-3xl border border-white/90 p-5 shadow-sm"
            >
              {/* Header Info Pemandu */}
              <View className="flex-row items-start gap-4">
                <View className="relative">
                  <Image
                    source={guide.avatar}
                    className="w-16 h-16 rounded-2xl bg-surface-tonal border border-white/80"
                    resizeMode="cover"
                  />
                  <View className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 items-center justify-center border-2 border-white">
                    <Ionicons name="checkmark" size={11} color="#FFFFFF" />
                  </View>
                </View>

                <View className="flex-1 min-w-0">
                  <View className="mb-0.5">
                    <Text className="font-raleway text-base font-medium text-on-surface tracking-wide leading-snug">
                      {guide.name}
                    </Text>
                  </View>

                  <Text className="font-dmsans text-xs text-on-surface-variant mt-1 leading-relaxed" numberOfLines={2}>
                    {guide.specialty}
                  </Text>

                  <View className="flex-row items-center gap-1.5 mt-2">
                    <Ionicons name="location-outline" size={13} color="#8A827A" />
                    <Text className="text-[11px] font-dmsans text-on-surface-variant" numberOfLines={1}>
                      {guide.district}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Promo Badge jika ada */}
              {guide.promo && (
                <View className="mt-3.5 pt-3 border-t border-border/50 flex-row">
                  <View className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 flex-row items-center gap-1.5">
                    <Ionicons name="pricetag-outline" size={11} color="#15803D" />
                    <Text className="text-[10px] font-dmsans-bold text-emerald-800">
                      {guide.promo.label}
                    </Text>
                  </View>
                </View>
              )}

              {/* Footer Bar: Tarif & Tombol Pesan */}
              <View className="mt-4 pt-3 border-t border-border/50 flex-row items-center justify-between">
                <View>
                  <Text className="text-[10px] uppercase tracking-wider font-dmsans-medium text-on-surface-variant">
                    {t('guides.fare_label')}
                  </Text>
                  <Text className="text-sm font-dmsans-bold text-primary mt-0.5">
                    {guide.pricePerTrip}
                  </Text>
                </View>

                <Pressable
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                    router.push({
                      pathname: '/booking/guide',
                      params: {
                        guide_id: guide.id,
                        guide_name: guide.name,
                        guide_specialty: guide.specialty,
                        guide_district: guide.district,
                        guide_price: guide.pricePerTrip,
                        promo_min: guide.promo ? String(guide.promo.minParticipants) : '',
                        promo_discount: guide.promo ? String(guide.promo.discountPercent) : '',
                        promo_label: guide.promo ? guide.promo.label : '',
                      },
                    });
                  }}
                  className="h-9 px-5 bg-primary rounded-full flex-row items-center justify-center gap-1.5 shadow-xs"
                >
                  <Ionicons name="person-outline" size={13} color="#FFFFFF" />
                  <Text className="text-white font-dmsans-medium text-xs tracking-wide">
                    {t('guides.book_button')}
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}

          {/* Empty State Card (DESIGN.md: card-tonal) */}
          {filteredGuides.length === 0 && (
            <View className="items-center justify-center py-12 px-6 bg-white/70 rounded-3xl border border-white/80 text-center shadow-sm">
              <View className="w-14 h-14 rounded-full bg-surface-tonal items-center justify-center mb-3">
                <Ionicons name="search-outline" size={26} color="#8A827A" />
              </View>
              <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
                {t('guides.empty_title')}
              </Text>
              <Text className="font-dmsans text-xs text-on-surface-variant text-center mt-1 max-w-[260px] leading-relaxed">
                {t('guides.empty_desc')}
              </Text>
              <Pressable
                onPress={() => {
                  setSearchQuery('');
                  setSelectedDistrict('Semua');
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
      </ScrollView>
    </SafeAreaView>
  );
}
