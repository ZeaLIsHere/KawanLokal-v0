import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { AppIcon } from '@/components/AppIcon';
import { TOBA_IMAGES } from '@/constants/images';

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
  image: string;
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
    image: TOBA_IMAGES.lakeTobaParapat,
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
    image: TOBA_IMAGES.kingSidabutarTomb,
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
    image: TOBA_IMAGES.ulosWeaving,
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
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top']}>
      {/* Top Header */}
      <View className="px-4 py-3 bg-surface-card border-b border-card-border shadow-xs">
        <Text className="text-xl font-bold text-on-surface">Pesanan & Riwayat Saya</Text>
        <Text className="text-xs text-secondary mt-0.5">
          Tiket QR digital dan riwayat kegiatan budaya Danau Toba
        </Text>
      </View>

      {/* Trip Category Segmented Filter Tabs */}
      <View className="px-4 pt-3.5 pb-2">
        <View className="flex-row items-center justify-between p-1 bg-surface-card rounded-full border border-card-border shadow-xs">
          <Pressable
            onPress={() => handleTabChange('upcoming')}
            className={`flex-1 py-2 px-3 rounded-full items-center justify-center active:opacity-80 ${
              activeTab === 'upcoming'
                ? 'bg-ulos-red shadow-sm'
                : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                activeTab === 'upcoming' ? 'text-white' : 'text-secondary'
              }`}
            >
              Mendatang
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleTabChange('completed')}
            className={`flex-1 py-2 px-3 rounded-full items-center justify-center active:opacity-80 ${
              activeTab === 'completed'
                ? 'bg-ulos-red shadow-sm'
                : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                activeTab === 'completed' ? 'text-white' : 'text-secondary'
              }`}
            >
              Selesai
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleTabChange('cancelled')}
            className={`flex-1 py-2 px-3 rounded-full items-center justify-center active:opacity-80 ${
              activeTab === 'cancelled'
                ? 'bg-ulos-red shadow-sm'
                : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                activeTab === 'cancelled' ? 'text-white' : 'text-secondary'
              }`}
            >
              Dibatalkan
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Trips List Cards */}
      <ScrollView
        className="flex-1 px-4 pt-2"
        contentContainerStyle={{ paddingBottom: 40 }}
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
              className="bg-surface-card rounded-2xl p-3 border border-card-border shadow-sm active:opacity-90 mb-3.5 flex-row items-center gap-3.5"
            >
              {/* 96x96 Photo Thumbnail */}
              <View className="w-24 h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                <Image
                  source={{ uri: order.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Trip Info Details */}
              <View className="flex-1 min-w-0 pr-1 justify-between h-24 py-0.5">
                <View>
                  <Text
                    numberOfLines={1}
                    className="text-sm font-bold text-on-surface leading-snug"
                  >
                    {order.title}
                  </Text>
                  <View className="flex-row items-center gap-1.5 mt-1">
                    <AppIcon name="calendar" size={13} />
                    <Text numberOfLines={1} className="text-[11px] text-secondary">
                      {order.dateWIB}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1.5 mt-0.5">
                    <AppIcon name="profile" size={13} />
                    <Text className="text-[11px] text-secondary">
                      {order.travelers}
                    </Text>
                  </View>
                </View>

                {/* Status Badge & Price */}
                <View className="flex-row items-center justify-between mt-1">
                  <View className={`self-start px-2 py-0.5 rounded-full border ${badgeStyles}`}>
                    <Text className="text-[10px] font-bold">
                      {order.statusLabel}
                    </Text>
                  </View>
                  <Text className="text-xs font-bold text-on-surface">
                    {order.price}
                  </Text>
                </View>
              </View>

              {/* Trailing Chevron */}
              <View className="shrink-0 pl-1">
                <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
              </View>
            </Pressable>
          );
        })}

        {filteredOrders.length === 0 && (
          <View className="items-center justify-center py-16 px-6">
            <View className="w-16 h-16 rounded-2xl bg-stone-100 items-center justify-center mb-3">
              <AppIcon name="ticket" size={32} />
            </View>
            <Text className="text-base font-bold text-on-surface text-center">
              Belum Ada Kegiatan {activeTab === 'cancelled' ? 'Dibatalkan' : 'Selesai'}
            </Text>
            <Text className="text-xs text-secondary text-center mt-1 mb-5">
              Jelajahi kalender upacara adat atau pesan pengalaman pemandu lokal Danau Toba.
            </Text>
            <Pressable
              onPress={() => router.push('/(tabs)/home')}
              className="px-5 py-2.5 rounded-xl bg-ulos-red active:bg-ulos-redDark shadow-sm"
            >
              <Text className="text-xs font-bold text-white">Mulai Eksplorasi</Text>
            </Pressable>
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
