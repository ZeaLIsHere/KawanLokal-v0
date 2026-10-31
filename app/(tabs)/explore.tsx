import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TOBA_DISTRICTS } from '@/constants/theme';
import { AppIcon } from '@/components/AppIcon';
import { PHOTO_COVERS } from '@/constants/localPhotos';

const SERVICES_DATA: {
  id: string;
  type: string;
  typeLabel: string;
  title: string;
  district: string;
  price: string;
  unit: string;
  image: ImageSourcePropType;
  rating: number;
  provider: string;
}[] = [
  {
    id: 's1',
    type: 'workshop',
    typeLabel: 'Workshop Ulos',
    title: 'Belajar Menenun Ulos Tradisional',
    district: 'Samosir',
    price: 'Rp 150.000',
    unit: '/ orang',
    image: PHOTO_COVERS.ulos,
    rating: 4.9,
    provider: 'Sanggar Tenun Lumban Suhi-Suhi',
  },
  {
    id: 's2',
    type: 'guide',
    typeLabel: 'Pemandu Lokal',
    title: 'Tur Sejarah & Budaya Makam Raja Sidabutar',
    district: 'Samosir',
    price: 'Rp 250.000',
    unit: '/ grup',
    image: PHOTO_COVERS.desaTomok,
    rating: 4.8,
    provider: 'Komunitas Pemandu Tomok',
  },
  {
    id: 's3',
    type: 'homestay',
    typeLabel: 'Homestay',
    title: 'Sopo Bolon Tradisional Tepi Danau',
    district: 'Toba',
    price: 'Rp 350.000',
    unit: '/ malam',
    image: PHOTO_COVERS.homestaySopo,
    rating: 4.7,
    provider: 'Homestay Raja Lumban',
  },
  {
    id: 's4',
    type: 'event_ticket',
    typeLabel: 'Tiket Acara',
    title: 'Tiket VIP Pagelaran Gondang Sabangunan',
    district: 'Simalungun',
    price: 'Rp 75.000',
    unit: '/ tiket',
    image: PHOTO_COVERS.gondang,
    rating: 4.9,
    provider: 'Panitia Pesta Danau Toba',
  },
];

const FILTER_TABS = ['Semua', 'Tiket Acara', 'Pemandu', 'Workshop', 'Homestay'];

export default function ExploreScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Semua');

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      {/* Header Glassmorphic */}
      <View className="px-5 py-3.5 bg-white/75 border-b border-border/50">
        <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant mb-0.5">
          KATALOG PENGALAMAN
        </Text>
        <Text className="font-raleway text-2xl font-medium text-on-surface tracking-wide">
          Jelajah Pengalaman Lokal
        </Text>
        <Text className="text-xs font-dmsans text-on-surface-variant mt-1 leading-relaxed">
          Pemandu, workshop ulos, homestay, dan tiket acara Danau Toba
        </Text>
      </View>

      {/* Filter Chips */}
      <View className="bg-white/50 border-b border-border/40 py-3">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5 flex-row">
          {FILTER_TABS.map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`mr-2.5 px-4 h-8 rounded-full items-center justify-center ${
                  isSelected
                    ? 'bg-primary shadow-sm'
                    : 'bg-surface-tonal border border-border/60'
                }`}
              >
                <Text
                  className={`text-[10px] uppercase tracking-[0.18em] font-dmsans-bold ${
                    isSelected ? 'text-white' : 'text-on-surface-strong'
                  }`}
                >
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Daftar Layanan */}
      <ScrollView className="flex-1 px-5 pt-4" contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        {SERVICES_DATA.map((service) => (
          <View
            key={service.id}
            className="bg-white/80 rounded-3xl border border-white/80 overflow-hidden shadow-sm mb-5"
          >
            <View className="relative w-full h-48 bg-surface-tonal">
              <Image
                source={service.image}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute top-3 right-3 bg-white/85 px-2.5 py-1 rounded-full flex-row items-center gap-1 border border-white/60 shadow-sm">
                <AppIcon name="star" size={13} color="#D97706" />
                <Text className="text-[11px] font-dmsans-bold text-on-surface">{service.rating}</Text>
              </View>
            </View>

            <View className="p-4">
              <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-primary mb-1">
                {service.typeLabel}
              </Text>
              <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide leading-snug">
                {service.title}
              </Text>
              <Text className="text-xs font-dmsans text-on-surface-variant mt-1">
                Oleh {service.provider} • {service.district}
              </Text>

              <View className="mt-3.5 pt-3 border-t border-border/60 flex-row items-center justify-between">
                <View>
                  <Text className="text-[10px] uppercase tracking-wider font-dmsans-medium text-on-surface-variant">Mulai Dari</Text>
                  <Text className="font-dmsans-bold text-base text-primary">
                    {service.price} <Text className="text-xs font-normal font-dmsans text-on-surface-variant">{service.unit}</Text>
                  </Text>
                </View>
                <Pressable
                  onPress={() => router.push('/booking/new')}
                  className="px-5 py-2.5 bg-primary active:bg-blue-800 rounded-full shadow-sm"
                >
                  <Text className="text-xs font-dmsans-medium text-white tracking-wide">Pesan</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
