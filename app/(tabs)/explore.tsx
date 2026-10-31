import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { PHOTO_COVERS } from '@/constants/localPhotos';

interface CatalogServiceItem {
  id: string;
  type: 'event_ticket' | 'guide' | 'workshop' | 'homestay';
  typeLabel: string;
  title: string;
  district: string;
  price: string;
  unit: string;
  image: ImageSourcePropType;
  provider: string;
  targetId?: string;
}

const SERVICES_DATA: CatalogServiceItem[] = [
  {
    id: 'cat-1',
    type: 'event_ticket',
    typeLabel: 'Tiket Acara',
    title: 'Pesta Danau Toba & Pagelaran Gondang',
    district: 'Simalungun',
    price: 'Rp 50.000',
    unit: '/ tiket',
    image: PHOTO_COVERS.parapat,
    provider: 'Panitia Pesta Danau Toba',
    targetId: 'ev-1',
  },
  {
    id: 'cat-2',
    type: 'guide',
    typeLabel: 'Pemandu Budaya',
    title: 'Tur Sejarah Makam Raja & Adat Batak',
    district: 'Samosir',
    price: 'Rp 250.000',
    unit: '/ trip rombongan',
    image: PHOTO_COVERS.desaTomok,
    provider: 'Bona Simanjuntak',
  },
  {
    id: 'cat-3',
    type: 'workshop',
    typeLabel: 'Workshop Seni',
    title: 'Belajar Menenun Ulos Tradisional (Gedongan)',
    district: 'Samosir',
    price: 'Rp 150.000',
    unit: '/ peserta',
    image: PHOTO_COVERS.ulos,
    provider: 'Sanggar Tenun Lumban Suhi-Suhi',
  },
  {
    id: 'cat-4',
    type: 'homestay',
    typeLabel: 'Homestay Adat',
    title: 'Sopo Bolon Tradisional Tepi Danau',
    district: 'Toba',
    price: 'Rp 350.000',
    unit: '/ malam',
    image: PHOTO_COVERS.homestaySopo,
    provider: 'Homestay Raja Lumban',
  },
  {
    id: 'cat-5',
    type: 'event_ticket',
    typeLabel: 'Tiket Acara',
    title: 'Upacara Adat Mangongkal Holi',
    district: 'Samosir',
    price: 'Gratis',
    unit: '/ akses terbuka',
    image: PHOTO_COVERS.torTor,
    provider: 'Marga Adat Tomok',
    targetId: 'ev-2',
  },
  {
    id: 'cat-6',
    type: 'guide',
    typeLabel: 'Pemandu Budaya',
    title: 'Filosofi Tenun Ulos & Wisata Desa Adat',
    district: 'Samosir',
    price: 'Rp 200.000',
    unit: '/ trip rombongan',
    image: PHOTO_COVERS.kampungSuhisuhi,
    provider: 'Tiurmaida Sinaga',
  },
  {
    id: 'cat-7',
    type: 'workshop',
    typeLabel: 'Workshop Seni',
    title: 'Seni Ukir Gorga Batak pada Papan Kayu',
    district: 'Toba',
    price: 'Rp 175.000',
    unit: '/ peserta',
    image: PHOTO_COVERS.gorga,
    provider: 'Pengrajin Gorga Balige',
  },
  {
    id: 'cat-8',
    type: 'homestay',
    typeLabel: 'Homestay Adat',
    title: 'Homestay Bagas Nagodang Balige',
    district: 'Toba',
    price: 'Rp 275.000',
    unit: '/ malam',
    image: PHOTO_COVERS.hutaGinjang,
    provider: 'Pengelola Bagas Nagodang',
  },
];

const FILTER_TABS = ['Semua', 'Tiket Acara', 'Pemandu', 'Workshop', 'Homestay'];

export default function ExploreScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('Semua');

  const handleTabChange = (tab: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setActiveTab(tab);
  };

  // Filter layanan interaktif sesuai tab kategori yang dipilih
  const filteredServices = useMemo(() => {
    if (activeTab === 'Semua') return SERVICES_DATA;
    if (activeTab === 'Tiket Acara') return SERVICES_DATA.filter((s) => s.type === 'event_ticket');
    if (activeTab === 'Pemandu') return SERVICES_DATA.filter((s) => s.type === 'guide');
    if (activeTab === 'Workshop') return SERVICES_DATA.filter((s) => s.type === 'workshop');
    if (activeTab === 'Homestay') return SERVICES_DATA.filter((s) => s.type === 'homestay');
    return SERVICES_DATA;
  }, [activeTab]);

  // Logika navigasi kontekstual saat kartu ditekan
  const handleServicePress = (service: CatalogServiceItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});

    switch (service.type) {
      case 'event_ticket':
        if (service.targetId) {
          router.push({
            pathname: '/event/detail',
            params: { id: service.targetId },
          });
        } else {
          router.push({
            pathname: '/booking/new',
            params: {
              service_type: 'ticket',
              event_title: service.title,
              event_location: service.district,
              event_price: service.price,
              promo_min: '4',
              promo_discount: '15',
            },
          });
        }
        break;

      case 'guide':
        router.push({
          pathname: '/booking/guide',
          params: {
            guide_name: service.provider,
            guide_specialty: service.title,
            guide_district: service.district,
            guide_price: service.price,
            promo_min: '4',
            promo_discount: '15',
            promo_label: 'Diskon 15% min. 4 org',
          },
        });
        break;

      case 'workshop':
        router.push({
          pathname: '/booking/new',
          params: {
            service_type: 'workshop',
            event_title: service.title,
            event_location: `${service.provider}, ${service.district}`,
            event_price: service.price,
            promo_min: '4',
            promo_discount: '15',
          },
        });
        break;

      case 'homestay':
        router.push({
          pathname: '/booking/new',
          params: {
            service_type: 'homestay',
            event_title: service.title,
            event_location: service.district,
            event_price: service.price,
          },
        });
        break;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      {/* Top Header Glassmorphic (DESIGN.md) */}
      <View className="px-5 py-3.5 bg-white/75 border-b border-border/50">
        <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-primary mb-0.5">
          KATALOG
        </Text>
        <Text className="font-raleway text-2xl font-medium text-on-surface tracking-wide">
          Jelajah Pengalaman Lokal
        </Text>
        <Text className="text-xs font-dmsans text-on-surface-variant mt-1 leading-relaxed">
          Pemandu, workshop ulos, homestay, dan tiket acara Danau Toba
        </Text>
      </View>

      {/* Filter Chips Kategori (DESIGN.md: chip & chip-active) */}
      <View className="bg-surface border-b border-border/40 py-3">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5 flex-row">
          {FILTER_TABS.map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <Pressable
                key={tab}
                onPress={() => handleTabChange(tab)}
                className={`mr-2.5 px-4 h-8 rounded-full items-center justify-center ${
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
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Daftar Layanan Katalog (DESIGN.md: card glassmorphic) */}
      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-5">
          {filteredServices.map((service) => (
            <Pressable
              key={service.id}
              onPress={() => handleServicePress(service)}
              className="bg-white/85 rounded-3xl border border-white/90 overflow-hidden shadow-sm"
            >
              {/* Photo Cover (Tanpa Badge Rating) */}
              <View className="relative w-full h-48 bg-surface-tonal">
                <Image
                  source={service.image}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                {/* Badge Kategori Layanan Pill */}
                <View className="absolute top-3.5 left-3.5 bg-white/90 border border-white px-3 py-1 rounded-full shadow-xs">
                  <Text className="text-[10px] uppercase tracking-wider font-dmsans-bold text-primary">
                    {service.typeLabel}
                  </Text>
                </View>
              </View>

              <View className="p-5 pt-4">
                <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide leading-snug">
                  {service.title}
                </Text>

                <View className="flex-row items-center gap-1.5 mt-1.5">
                  <Ionicons name="location-outline" size={13} color="#8A827A" />
                  <Text className="text-xs font-dmsans text-on-surface-variant">
                    {service.provider} • {service.district}
                  </Text>
                </View>

                {/* Footer Bar: Harga & Tombol Pesan */}
                <View className="mt-4 pt-3 border-t border-border/50 flex-row items-center justify-between">
                  <View>
                    <Text className="text-[10px] uppercase tracking-wider font-dmsans-medium text-on-surface-variant">
                      Mulai Dari
                    </Text>
                    <Text className="font-dmsans-bold text-base text-primary mt-0.5">
                      {service.price}{' '}
                      <Text className="text-xs font-normal font-dmsans text-on-surface-variant">
                        {service.unit}
                      </Text>
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => handleServicePress(service)}
                    className="h-10 px-5 bg-primary rounded-full flex-row items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Text className="text-white font-dmsans-medium text-xs tracking-wide">Pesan</Text>
                    <Ionicons name="arrow-forward" size={13} color="#FFFFFF" />
                  </Pressable>
                </View>
              </View>
            </Pressable>
          ))}

          {filteredServices.length === 0 && (
            <View className="items-center justify-center py-16 px-6 bg-white/70 rounded-3xl border border-white/80 text-center shadow-sm">
              <View className="w-14 h-14 rounded-full bg-surface-tonal items-center justify-center mb-3">
                <Ionicons name="search-outline" size={26} color="#8A827A" />
              </View>
              <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
                Tidak Ada Layanan
              </Text>
              <Text className="font-dmsans text-xs text-on-surface-variant text-center mt-1 max-w-[260px] leading-relaxed">
                Tidak ada layanan budaya yang cocok dengan kategori yang Anda pilih.
              </Text>
              <Pressable
                onPress={() => setActiveTab('Semua')}
                className="mt-4 h-10 px-5 rounded-full bg-white border border-border items-center justify-center shadow-xs"
              >
                <Text className="text-[11px] uppercase tracking-[0.15em] font-dmsans-bold text-primary">
                  SEMUA KATEGORI
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
