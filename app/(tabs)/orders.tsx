import React, { useState } from 'react';
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
import { AppIcon } from '@/components/AppIcon';
import { PHOTO_COVERS } from '@/constants/localPhotos';

interface TripOrder {
  id: string;
  code: string;
  title: string;
  location: string;
  dateWIB: string;
  travelers: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  statusLabel: string;
  statusBadgeVariant: 'emerald' | 'amber' | 'slate' | 'rose';
  image: ImageSourcePropType;
  price: string;
}

const TRIP_ORDERS: TripOrder[] = [
  {
    id: 'ord-1',
    code: '#KL-TB-2026-891',
    title: 'Pesta Danau Toba & Pagelaran Gondang',
    location: 'Pantai Bebas Parapat, Simalungun',
    dateWIB: 'Jumat, 2 Nov 2026 • 10.00 WIB',
    travelers: '2 Peserta (Dewasa)',
    status: 'upcoming',
    statusLabel: 'Lunas / Tiket Siap',
    statusBadgeVariant: 'emerald',
    image: PHOTO_COVERS.parapat,
    price: 'Rp 100.000',
  },
  {
    id: 'ord-2',
    code: '#KL-TB-2026-904',
    title: 'Pemandu Budaya Desa Adat Tomok',
    location: 'Dermaga Tomok, Pulau Samosir',
    dateWIB: 'Senin, 5 Nov 2026 • 09.00 WIB',
    travelers: '1 Peserta',
    status: 'upcoming',
    statusLabel: 'Menunggu Verifikasi',
    statusBadgeVariant: 'amber',
    image: PHOTO_COVERS.desaTomok,
    price: 'Rp 150.000',
  },
  {
    id: 'ord-3',
    code: '#KL-TB-2026-712',
    title: 'Workshop Menenun Ulos Tradisional',
    location: 'Lumban Suhi-Suhi, Samosir',
    dateWIB: 'Minggu, 18 Okt 2026 • 13.00 WIB',
    travelers: '2 Peserta',
    status: 'completed',
    statusLabel: 'Kegiatan Selesai',
    statusBadgeVariant: 'slate',
    image: PHOTO_COVERS.ulos,
    price: 'Rp 300.000',
  },
];

type TabFilter = 'upcoming' | 'completed' | 'cancelled';

export default function OrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabFilter>('upcoming');

  const handleTabChange = (tab: TabFilter) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setActiveTab(tab);
  };

  const handleCardPress = (order: TripOrder) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    router.push('/ticket/detail');
  };

  const filteredOrders = TRIP_ORDERS.filter((order) => order.status === activeTab);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      {/* Top Header Glassmorphic */}
      <View className="px-5 py-3.5 bg-white/75 border-b border-border/50">
        <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant mb-0.5">
          RIWAYAT KEGIATAN
        </Text>
        <Text className="font-raleway text-2xl font-medium text-on-surface tracking-wide">
          Pesanan & Tiket Saya
        </Text>
        <Text className="text-xs font-dmsans text-on-surface-variant mt-1 leading-relaxed">
          Tiket QR digital dan riwayat kegiatan budaya Danau Toba
        </Text>
      </View>

      {/* Trip Category Segmented Filter Tabs */}
      <View className="px-5 pt-3.5 pb-2">
        <View className="flex-row items-center justify-between p-1 bg-white/70 rounded-full border border-white/80 shadow-sm">
          <Pressable
            onPress={() => handleTabChange('upcoming')}
            className={`flex-1 py-2 px-3 rounded-full items-center justify-center active:opacity-80 ${
              activeTab === 'upcoming'
                ? 'bg-primary shadow-sm'
                : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-[10px] uppercase tracking-[0.15em] font-dmsans-bold ${
                activeTab === 'upcoming' ? 'text-white' : 'text-on-surface-variant'
              }`}
            >
              Mendatang
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleTabChange('completed')}
            className={`flex-1 py-2 px-3 rounded-full items-center justify-center active:opacity-80 ${
              activeTab === 'completed'
                ? 'bg-primary shadow-sm'
                : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-[10px] uppercase tracking-[0.15em] font-dmsans-bold ${
                activeTab === 'completed' ? 'text-white' : 'text-on-surface-variant'
              }`}
            >
              Selesai
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleTabChange('cancelled')}
            className={`flex-1 py-2 px-3 rounded-full items-center justify-center active:opacity-80 ${
              activeTab === 'cancelled'
                ? 'bg-primary shadow-sm'
                : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-[10px] uppercase tracking-[0.15em] font-dmsans-bold ${
                activeTab === 'cancelled' ? 'text-white' : 'text-on-surface-variant'
              }`}
            >
              Dibatalkan
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Trips List Cards */}
      <ScrollView
        className="flex-1 px-5 pt-2"
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredOrders.map((order) => {
          const badgeStyles = {
            emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
            amber: 'bg-amber-50 text-amber-800 border-amber-200',
            slate: 'bg-stone-100 text-stone-700 border-stone-200',
            rose: 'bg-rose-50 text-rose-800 border-rose-200',
          }[order.statusBadgeVariant];

          return (
            <Pressable
              key={order.id}
              onPress={() => handleCardPress(order)}
              className="bg-white/80 rounded-3xl p-3.5 border border-white/80 shadow-sm active:opacity-90 mb-3.5 flex-row items-center gap-3.5"
            >
              {/* 96x96 Photo Thumbnail */}
              <View className="w-24 h-24 rounded-2xl overflow-hidden bg-surface-tonal shrink-0">
                <Image
                  source={order.image}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Trip Info Details */}
              <View className="flex-1 min-w-0 pr-1 justify-between h-24 py-0.5">
                <View>
                  <Text
                    numberOfLines={1}
                    className="font-raleway text-base font-medium text-on-surface tracking-wide leading-tight"
                  >
                    {order.title}
                  </Text>
                  <View className="flex-row items-center gap-1.5 mt-1">
                    <AppIcon name="calendar" size={13} color="#8A827A" />
                    <Text numberOfLines={1} className="text-[11px] font-dmsans text-on-surface-variant">
                      {order.dateWIB}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1.5 mt-0.5">
                    <AppIcon name="profile" size={13} color="#8A827A" />
                    <Text className="text-[11px] font-dmsans text-on-surface-variant">
                      {order.travelers}
                    </Text>
                  </View>
                </View>

                {/* Status Badge & Price */}
                <View className="flex-row items-center justify-between mt-1">
                  <View className={`self-start px-2.5 py-0.5 rounded-full border ${badgeStyles}`}>
                    <Text className="text-[10px] uppercase tracking-wider font-dmsans-bold">
                      {order.statusLabel}
                    </Text>
                  </View>
                  <Text className="font-dmsans-bold text-xs text-primary">
                    {order.price}
                  </Text>
                </View>
              </View>

              {/* Trailing Chevron */}
              <View className="shrink-0 pl-1">
                <Ionicons name="chevron-forward" size={18} color="#8A827A" />
              </View>
            </Pressable>
          );
        })}

        {filteredOrders.length === 0 && (
          <View className="items-center justify-center py-16 px-6">
            <View className="w-16 h-16 rounded-full bg-surface-tonal items-center justify-center mb-3 border border-border">
              <AppIcon name="ticket" size={30} color="#8A827A" />
            </View>
            <Text className="font-raleway text-lg font-medium text-on-surface text-center">
              Belum Ada Kegiatan {activeTab === 'cancelled' ? 'Dibatalkan' : 'Selesai'}
            </Text>
            <Text className="text-xs font-dmsans text-on-surface-variant text-center mt-1 mb-5 leading-relaxed">
              Jelajahi kalender upacara adat atau pesan pengalaman pemandu lokal Danau Toba.
            </Text>
          </View>
        )}

        {/* Offline Ticket Guarantee Notice (PRD Non-Fungsional) */}
        <View className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-3.5 flex-row items-start gap-3 mt-2">
          <Ionicons name="cloud-offline-outline" size={20} color="#004ac6" />
          <View className="flex-1">
            <Text className="text-xs font-bold text-blue-950">
              Garansi Tiket Siap Offline
            </Text>
            <Text className="text-[11px] text-blue-800/80 mt-0.5 leading-relaxed">
              Semua tiket yang tercantum dapat dibuka tanpa koneksi internet. Cukup klik kartu pesanan untuk memunculkan kode QR di gerbang acara.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
