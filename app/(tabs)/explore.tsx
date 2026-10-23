import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TOBA_DISTRICTS } from '@/constants/theme';

const SERVICES_DATA = [
  {
    id: 's1',
    type: 'workshop',
    typeLabel: 'Workshop Ulos',
    title: 'Belajar Menenun Ulos Tradisional',
    district: 'Samosir',
    price: 'Rp 150.000',
    unit: '/ orang',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    provider: 'Panitia Pesta Danau Toba',
  },
];

const FILTER_TABS = ['Semua', 'Tiket Acara', 'Pemandu', 'Workshop', 'Homestay'];

export default function ExploreScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Semua');

  return (
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top']}>
      {/* Header */}
      <View className="px-4 py-3 bg-surface-card border-b border-card-border">
        <Text className="text-xl font-bold text-on-surface">Jelajah Pengalaman Lokal</Text>
        <Text className="text-xs text-secondary mt-0.5">
          Pemandu, workshop ulos, homestay, dan tiket acara Danau Toba
        </Text>
      </View>

      {/* Filter Chips */}
      <View className="bg-surface-card border-b border-card-border/60 py-2.5">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 flex-row">
          {FILTER_TABS.map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`mr-2 px-3.5 py-1.5 rounded-full border ${
                  isSelected
                    ? 'bg-ulos-red border-ulos-red'
                    : 'bg-surface-canvas border-card-border'
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    isSelected ? 'text-white' : 'text-on-surface'
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
      <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 36 }}>
        {SERVICES_DATA.map((service) => (
          <View
            key={service.id}
            className="bg-surface-card rounded-2xl border border-card-border overflow-hidden shadow-sm mb-4"
          >
            <View className="relative w-full h-44 bg-stone-100">
              <Image
                source={{ uri: service.image }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute top-3 left-3 bg-ulos-red px-2.5 py-1 rounded-full">
                <Text className="text-[10px] font-bold text-white">{service.typeLabel}</Text>
              </View>
              <View className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full flex-row items-center gap-1">
                <Ionicons name="star" size={13} color="#F59E0B" />
                <Text className="text-xs font-bold text-on-surface">{service.rating}</Text>
              </View>
            </View>

            <View className="p-4">
              <Text className="text-base font-bold text-on-surface leading-snug">
                {service.title}
              </Text>
              <Text className="text-xs text-secondary mt-1">
                Oleh {service.provider} • {service.district}
              </Text>

              <View className="mt-3 pt-3 border-t border-card-border flex-row items-center justify-between">
                <View>
                  <Text className="text-[11px] text-secondary">Mulai Dari</Text>
                  <Text className="text-base font-bold text-ulos-red">
                    {service.price} <Text className="text-xs font-normal text-secondary">{service.unit}</Text>
                  </Text>
                </View>
                <Pressable
                  onPress={() => router.push('/booking/new')}
                  className="px-4 py-2 bg-ulos-red active:bg-ulos-redDark rounded-xl"
                >
                  <Text className="text-xs font-semibold text-white">Pesan</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
