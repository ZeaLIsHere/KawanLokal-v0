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
  image: ImageSourcePropType;
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
    image: PHOTO_COVERS.ulos,
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
    image: PHOTO_COVERS.gorga,
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
    image: PHOTO_COVERS.tobaCulinary,
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
    image: PHOTO_COVERS.gondang,
  },
];

const FILTER_LEVELS = ['Semua', 'Pemula', 'Semua Tingkat', 'Pecinta Kuliner'];

export default function WorkshopsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
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
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      {/* Top App Bar Glassmorphic (DESIGN.md: top-app-bar + button-icon-glass) */}
      <View className="flex-row items-center justify-between px-5 py-3 bg-white/75 border-b border-border/50 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-11 h-11 items-center justify-center rounded-full bg-white/80 border border-white/90 shadow-sm"
        >
          <AppIcon name="arrow-left" size={20} color="#23201E" />
        </Pressable>

        <View className="items-center">
          <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
            {t('workshops.header_title')}
          </Text>
        </View>

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
              placeholder={t('workshops.search_placeholder')}
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

        {/* Filter Chips Tingkat (DESIGN.md: chip & chip-active) */}
        <View className="mb-5">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row -mx-1 px-1">
            {FILTER_LEVELS.map((chip) => {
              const isSelected = selectedLevel === chip;
              return (
                <Pressable
                  key={chip}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                    setSelectedLevel(chip);
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
            {t('workshops.section_title')}
          </Text>
        </View>

        {/* List of Workshops (DESIGN.md: card glassmorphic) */}
        <View className="gap-4">
          {filteredWorkshops.map((ws) => (
            <View
              key={ws.id}
              className="bg-white/85 rounded-3xl border border-white/90 overflow-hidden shadow-sm"
            >
              {/* Photo Cover */}
              <View className="relative w-full h-44 bg-surface-tonal">
                <Image
                  source={ws.image}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute top-3 right-3 bg-white/90 border border-white px-2.5 py-1 rounded-full flex-row items-center gap-1 shadow-xs">
                  <Ionicons name="star" size={12} color="#D97706" />
                  <Text className="text-xs font-dmsans-bold text-amber-700">{ws.rating}</Text>
                </View>
                <View className="absolute top-3 left-3 bg-white/90 border border-white px-2.5 py-1 rounded-full shadow-xs">
                  <Text className="text-[10px] uppercase tracking-wider font-dmsans-bold text-primary">
                    {ws.level}
                  </Text>
                </View>
              </View>

              <View className="p-5 pt-3.5">
                <Text className="font-raleway text-base font-medium text-on-surface tracking-wide leading-snug">
                  {ws.title}
                </Text>

                <Text className="text-xs font-dmsans text-on-surface-variant mt-1">
                  {ws.studioName} • {ws.district}
                </Text>

                <View className="flex-row items-center gap-2 mt-3 bg-surface-tonal p-2.5 rounded-2xl border border-border/50">
                  <Ionicons name="time-outline" size={14} color="#1D4ED8" />
                  <Text className="text-xs font-dmsans-medium text-on-surface-strong">
                    {t('workshops.duration')}: {ws.duration}
                  </Text>
                </View>

                <Text className="text-xs font-dmsans text-on-surface-variant mt-2.5 leading-relaxed">
                  {t('workshops.included')}: <Text className="text-on-surface-strong font-dmsans-medium">{ws.included}</Text>
                </Text>

                <View className="mt-4 pt-3 border-t border-border/50 flex-row items-center justify-between">
                  <View>
                    <Text className="text-[10px] uppercase tracking-wider font-dmsans-medium text-on-surface-variant">
                      {t('workshops.fee_per_person')}
                    </Text>
                    <Text className="text-base font-dmsans-bold text-primary mt-0.5">
                      {ws.pricePerPerson}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                      router.push({
                        pathname: '/booking/new',
                        params: {
                          service_type: 'workshop',
                          event_title: ws.title,
                          event_location: `${ws.studioName}, ${ws.district}`,
                          event_price: ws.pricePerPerson,
                        },
                      });
                    }}
                    className="h-10 px-5 bg-primary rounded-full flex-row items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Ionicons name="school-outline" size={14} color="#FFFFFF" />
                    <Text className="text-white font-dmsans-medium text-xs tracking-wide">
                      {t('workshops.join_button')}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}

          {filteredWorkshops.length === 0 && (
            <View className="items-center justify-center py-12 px-6 bg-white/70 rounded-3xl border border-white/80 text-center shadow-sm">
              <View className="w-14 h-14 rounded-full bg-surface-tonal items-center justify-center mb-3">
                <Ionicons name="brush-outline" size={26} color="#8A827A" />
              </View>
              <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
                {t('workshops.empty_title')}
              </Text>
              <Text className="font-dmsans text-xs text-on-surface-variant text-center mt-1 max-w-[260px] leading-relaxed">
                {t('workshops.empty_desc')}
              </Text>
              <Pressable
                onPress={() => {
                  setSearchQuery('');
                  setSelectedLevel('Semua');
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
