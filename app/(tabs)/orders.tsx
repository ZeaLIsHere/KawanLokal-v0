import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { AppIcon } from '@/components/AppIcon';
import { PHOTO_COVERS } from '@/constants/localPhotos';
import { getOrders, cancelOrder, StoredOrder, OrderStatus } from '@/lib/ordersStorage';

type TabFilter = 'upcoming' | 'completed' | 'cancelled';

export default function OrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabFilter>('upcoming');
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Memuat data pesanan setiap kali layar pesanan dibuka (focus effect)
  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    const data = await getOrders();
    setOrders(data);
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [loadOrders])
  );

  const handleTabChange = (tab: TabFilter) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setActiveTab(tab);
  };

  const handleCardPress = (order: StoredOrder) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    router.push({
      pathname: '/ticket/detail',
      params: {
        service_type: order.service_type,
        title: order.title,
        location: order.location,
        amount: String(order.amount),
        participants: order.travelers,
      },
    });
  };

  const handleCancel = (order: StoredOrder) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    Alert.alert(
      'Batalkan Pesanan',
      `Apakah Anda yakin ingin membatalkan pesanan "${order.title}"? Status pesanan akan dipindahkan ke tab Dibatalkan.`,
      [
        { text: 'Tidak', style: 'cancel' },
        {
          text: 'Ya, Batalkan',
          style: 'destructive',
          onPress: async () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
            await cancelOrder(order.id);
            await loadOrders();
          },
        },
      ]
    );
  };

  const filteredOrders = orders.filter((order) => order.status === activeTab);

  const getImageSource = (imageKey: StoredOrder['imageKey']) => {
    switch (imageKey) {
      case 'desaTomok':
        return PHOTO_COVERS.desaTomok;
      case 'ulos':
        return PHOTO_COVERS.ulos;
      case 'homestaySopo':
        return PHOTO_COVERS.homestaySopo;
      case 'parapat':
      default:
        return PHOTO_COVERS.parapat;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      {/* Top Header Glassmorphic (DESIGN.md) */}
      <View className="px-5 py-3.5 bg-white/75 border-b border-border/50">
        <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant mb-0.5">
          RIWAYAT KEGIATAN
        </Text>
        <Text className="font-raleway text-2xl font-medium text-on-surface tracking-wide">
          Pesanan & Tiket Saya
        </Text>
        <Text className="text-xs font-dmsans text-on-surface-variant mt-1 leading-relaxed">
          Tiket QR digital dan reservasi budaya Danau Toba
        </Text>
      </View>

      {/* Trip Category Segmented Filter Tabs */}
      <View className="px-5 pt-3.5 pb-2">
        <View className="flex-row items-center justify-between p-1 bg-white/70 rounded-full border border-white/80 shadow-sm">
          <Pressable
            onPress={() => handleTabChange('upcoming')}
            className={`flex-1 py-2 px-3 rounded-full items-center justify-center ${
              activeTab === 'upcoming' ? 'bg-primary shadow-sm' : 'bg-transparent'
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
            className={`flex-1 py-2 px-3 rounded-full items-center justify-center ${
              activeTab === 'completed' ? 'bg-primary shadow-sm' : 'bg-transparent'
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
            className={`flex-1 py-2 px-3 rounded-full items-center justify-center ${
              activeTab === 'cancelled' ? 'bg-primary shadow-sm' : 'bg-transparent'
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
            <View
              key={order.id}
              className="bg-white/85 rounded-3xl p-4 border border-white/90 shadow-sm mb-4"
            >
              <Pressable
                onPress={() => handleCardPress(order)}
                className="flex-row items-center gap-3.5"
              >
                {/* Photo Thumbnail */}
                <View className="w-22 h-22 rounded-2xl overflow-hidden bg-surface-tonal shrink-0 border border-white/80">
                  <Image
                    source={getImageSource(order.imageKey)}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>

                {/* Trip Info Details */}
                <View className="flex-1 min-w-0 pr-1">
                  <Text
                    numberOfLines={1}
                    className="font-raleway text-base font-medium text-on-surface tracking-wide leading-tight"
                  >
                    {order.title}
                  </Text>

                  <View className="flex-row items-center gap-1.5 mt-1.5">
                    <AppIcon name="calendar" size={13} color="#8A827A" />
                    <Text numberOfLines={1} className="text-[11px] font-dmsans text-on-surface-variant">
                      {order.dateWIB}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-1.5 mt-0.5">
                    <Ionicons name="location-outline" size={13} color="#8A827A" />
                    <Text numberOfLines={1} className="text-[11px] font-dmsans text-on-surface-variant">
                      {order.location}
                    </Text>
                  </View>

                  {/* Status Badge & Price */}
                  <View className="flex-row items-center justify-between mt-2 pt-2 border-t border-border/50">
                    <View className={`self-start px-2.5 py-0.5 rounded-full border ${badgeStyles}`}>
                      <Text className="text-[10px] uppercase tracking-wider font-dmsans-bold">
                        {order.statusLabel}
                      </Text>
                    </View>
                    <Text className="font-dmsans-bold text-xs text-primary">
                      {order.priceFormatted}
                    </Text>
                  </View>
                </View>

                {/* Trailing Chevron */}
                <View className="shrink-0 pl-1">
                  <Ionicons name="chevron-forward" size={18} color="#8A827A" />
                </View>
              </Pressable>

              {/* Tombol Aksi Batal Khusus Tiket Berstatus Mendatang */}
              {order.status === 'upcoming' && (
                <View className="mt-3 pt-2.5 border-t border-border/50 flex-row justify-end">
                  <Pressable
                    onPress={() => handleCancel(order)}
                    className="h-8 px-4 rounded-full bg-surface-tonal border border-border/70 flex-row items-center gap-1.5"
                  >
                    <Ionicons name="close-circle-outline" size={13} color="#8C4A4A" />
                    <Text className="text-[11px] font-dmsans-bold text-destructive uppercase tracking-wider">
                      Batalkan Pesanan
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          );
        })}

        {filteredOrders.length === 0 && !isLoading && (
          <View className="items-center justify-center py-14 px-6 bg-white/70 rounded-3xl border border-white/80 text-center shadow-sm mt-2">
            <View className="w-16 h-16 rounded-full bg-surface-tonal items-center justify-center mb-3 border border-border">
              <AppIcon name="ticket" size={30} color="#8A827A" />
            </View>
            <Text className="font-raleway text-lg font-medium text-on-surface text-center">
              {activeTab === 'upcoming'
                ? 'Belum Ada Pesanan Mendatang'
                : activeTab === 'completed'
                ? 'Belum Ada Kegiatan Selesai'
                : 'Tidak Ada Pesanan Dibatalkan'}
            </Text>
            <Text className="text-xs font-dmsans text-on-surface-variant text-center mt-1 mb-5 max-w-[260px] leading-relaxed">
              {activeTab === 'upcoming'
                ? 'Tiket acara adat, kelas workshop, atau reservasi pemandu yang Anda pesan akan muncul di sini.'
                : 'Riwayat kegiatan yang telah selesai atau dibatalkan akan tersimpan di sini.'}
            </Text>
            {activeTab === 'upcoming' && (
              <Pressable
                onPress={() => router.push('/calendar')}
                className="h-10 px-6 rounded-full bg-primary items-center justify-center shadow-sm"
              >
                <Text className="text-[11px] uppercase tracking-[0.15em] font-dmsans-bold text-white">
                  Mulai Eksplorasi
                </Text>
              </Pressable>
            )}
          </View>
        )}

        {/* Offline Ticket Guarantee Notice (PRD Non-Fungsional) */}
        <View className="bg-surface-tonal border border-border/80 rounded-3xl p-4 flex-row items-start gap-3 mt-3 shadow-xs">
          <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center shrink-0">
            <Ionicons name="cloud-offline-outline" size={18} color="#1D4ED8" />
          </View>
          <View className="flex-1">
            <Text className="text-xs font-dmsans-bold uppercase tracking-wider text-on-surface">
              GARANSI TIKET SIAP OFFLINE
            </Text>
            <Text className="text-[11px] font-dmsans text-on-surface-variant mt-0.5 leading-relaxed">
              Semua tiket yang tercantum dapat dibuka tanpa koneksi internet. Cukup klik kartu pesanan untuk memunculkan kode QR di gerbang acara.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
