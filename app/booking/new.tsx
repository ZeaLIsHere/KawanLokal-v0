import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { formatRupiah } from '@/lib/format';

export default function NewBookingScreen() {
  const router = useRouter();
  const [bookingType, setBookingType] = useState<'ticket' | 'guide'>('ticket');
  const [participantCount, setParticipantCount] = useState<number>(2);

  const pricePerItem = bookingType === 'ticket' ? 50000 : 150000;
  const totalPrice = participantCount * pricePerItem;

  const handleTypeSwitch = (type: 'ticket' | 'guide') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setBookingType(type);
  };

  const handleIncrement = () => {
    if (participantCount < 10) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      setParticipantCount((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (participantCount > 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      setParticipantCount((prev) => prev - 1);
    }
  };

  const handleProceedPayment = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    router.push('/payment');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top', 'bottom']}>
      {/* Top App Bar Navigation */}
      <View className="w-full px-4 py-2.5 flex-row items-center justify-between bg-surface-card border-b border-card-border/60 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center active:bg-stone-100 active:opacity-80"
        >
          <Ionicons name="arrow-back" size={24} color="#131b2e" />
        </Pressable>

        <Text className="text-lg font-bold text-on-surface tracking-tight">
          Pesan Layanan
        </Text>

        <Pressable
          accessibilityLabel="Informasi"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            Alert.alert(
              'Info Pemesanan KawanLokal',
              'Setiap pesanan dijamin kuotanya secara atomik. Tiket QR akan dibuat setelah status pembayaran lunas.'
            );
          }}
          className="w-10 h-10 rounded-full items-center justify-center active:bg-stone-100 active:opacity-80"
        >
          <Ionicons name="information-circle-outline" size={22} color="#131b2e" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4"
        contentContainerStyle={{ paddingBottom: 36 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Switcher Segmented Control (Tiket Acara / Paket Pemandu) */}
        <View className="w-full p-1 bg-surface-card rounded-full border border-card-border flex-row items-center justify-between mb-4 shadow-sm">
          <Pressable
            onPress={() => handleTypeSwitch('ticket')}
            className={`flex-1 py-2.5 rounded-full items-center justify-center active:opacity-80 ${
              bookingType === 'ticket'
                ? 'bg-ulos-red shadow-sm'
                : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                bookingType === 'ticket' ? 'text-white' : 'text-secondary'
              }`}
            >
              Tiket Acara
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleTypeSwitch('guide')}
            className={`flex-1 py-2.5 rounded-full items-center justify-center active:opacity-80 ${
              bookingType === 'guide'
                ? 'bg-ulos-red shadow-sm'
                : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                bookingType === 'guide' ? 'text-white' : 'text-secondary'
              }`}
            >
              Paket Pemandu
            </Text>
          </Pressable>
        </View>

        {/* Booking Parameters Form Module */}
        <View className="gap-3.5 mb-5">
          {/* Field 1: Pilihan Layanan / Acara */}
          <View className="border border-card-border rounded-2xl bg-surface-card p-3.5 flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center gap-3.5 flex-1 pr-2">
              <View className="w-10 h-10 rounded-xl bg-red-50 items-center justify-center">
                <Ionicons name="sparkles" size={20} color="#991B1B" />
              </View>
              <View className="flex-1">
                <Text className="text-[11px] font-medium text-secondary">
                  Layanan Terpilih
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-sm font-bold text-on-surface tracking-tight mt-0.5"
                >
                  {bookingType === 'ticket'
                    ? 'Pesta Danau Toba & Pagelaran Gondang'
                    : 'Pemandu Budaya Desa Adat Tomok'}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-down" size={18} color="#78716C" />
          </View>

          {/* Field 2: Kawasan / Lokasi Temu */}
          <View className="border border-card-border rounded-2xl bg-surface-card p-3.5 flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center gap-3.5 flex-1 pr-2">
              <View className="w-10 h-10 rounded-xl bg-red-50 items-center justify-center">
                <Ionicons name="location-outline" size={20} color="#991B1B" />
              </View>
              <View className="flex-1">
                <Text className="text-[11px] font-medium text-secondary">
                  Titik Lokasi
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-sm font-bold text-on-surface tracking-tight mt-0.5"
                >
                  {bookingType === 'ticket'
                    ? 'Pantai Bebas Parapat, Simalungun'
                    : 'Dermaga Tomok, Pulau Samosir'}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-down" size={18} color="#78716C" />
          </View>

          {/* Field 3: Jadwal & Waktu WIB */}
          <View className="border border-card-border rounded-2xl bg-surface-card p-3.5 flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center gap-3.5 flex-1 pr-2">
              <View className="w-10 h-10 rounded-xl bg-red-50 items-center justify-center">
                <Ionicons name="calendar-outline" size={20} color="#991B1B" />
              </View>
              <View className="flex-1">
                <Text className="text-[11px] font-medium text-secondary">
                  Jadwal Kegiatan (WIB)
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-sm font-bold text-on-surface tracking-tight mt-0.5"
                >
                  Jumat, 2 Nov 2026 • 10.00 WIB
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-down" size={18} color="#78716C" />
          </View>

          {/* Field 4: Jumlah Peserta dengan Kontrol +/- */}
          <View className="border border-card-border rounded-2xl bg-surface-card p-3.5 flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center gap-3.5">
              <View className="w-10 h-10 rounded-xl bg-red-50 items-center justify-center">
                <Ionicons name="people-outline" size={20} color="#991B1B" />
              </View>
              <View>
                <Text className="text-[11px] font-medium text-secondary">
                  Jumlah Peserta
                </Text>
                <Text className="text-sm font-bold text-on-surface tracking-tight mt-0.5">
                  {participantCount} Peserta ({formatRupiah(pricePerItem)}/org)
                </Text>
              </View>
            </View>

            {/* Stepper Buttons */}
            <View className="flex-row items-center gap-2 bg-stone-100 p-1 rounded-xl">
              <Pressable
                onPress={handleDecrement}
                className="w-8 h-8 rounded-lg bg-white items-center justify-center shadow-xs active:bg-stone-200"
              >
                <Ionicons name="remove" size={16} color="#131b2e" />
              </Pressable>
              <Text className="text-sm font-bold text-on-surface px-1">
                {participantCount}
              </Text>
              <Pressable
                onPress={handleIncrement}
                className="w-8 h-8 rounded-lg bg-white items-center justify-center shadow-xs active:bg-stone-200"
              >
                <Ionicons name="add" size={16} color="#131b2e" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Ringkasan Estimasi Biaya */}
        <View className="bg-surface-card rounded-2xl border border-card-border p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center pb-2 border-b border-card-border/60">
            <Text className="text-xs text-secondary">Tarif Dasar ({participantCount}x)</Text>
            <Text className="text-xs font-semibold text-on-surface">
              {formatRupiah(totalPrice)}
            </Text>
          </View>
          <View className="flex-row justify-between items-center py-2 border-b border-card-border/60">
            <Text className="text-xs text-secondary">Biaya Layanan & Konservasi</Text>
            <Text className="text-xs font-bold text-emerald-700">Bebas Biaya</Text>
          </View>
          <View className="flex-row justify-between items-center pt-2">
            <Text className="text-sm font-bold text-on-surface">Total Biaya</Text>
            <Text className="text-base font-extrabold text-ulos-red">
              {formatRupiah(totalPrice)}
            </Text>
          </View>
        </View>

        {/* Primary Action CTA Button: Lanjut ke Pembayaran */}
        <Pressable
          onPress={handleProceedPayment}
          className="w-full py-3.5 px-6 rounded-2xl bg-ulos-red active:bg-ulos-redDark text-white flex-row items-center justify-center gap-2 shadow-md active:opacity-90 mb-4"
        >
          <Ionicons name="card-outline" size={20} color="#FFFFFF" />
          <Text className="text-white font-bold text-base">
            Lanjut ke Pembayaran • {formatRupiah(totalPrice)}
          </Text>
        </Pressable>

        {/* Promotional Offer Card */}
        <View className="w-full bg-red-50/60 border border-red-200/80 rounded-2xl p-4 flex-row items-center justify-between overflow-hidden relative shadow-sm">
          {/* Photo */}
          <View className="w-20 h-16 rounded-xl overflow-hidden bg-stone-100 shadow-sm shrink-0">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=300&q=80' }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Offer Details */}
          <View className="flex-1 pl-3.5 justify-center">
            <Text className="text-sm font-bold text-on-surface leading-tight">
              Diskon Rombongan 15%
            </Text>
            <Text className="text-[11px] text-secondary mt-0.5">
              Khusus pemesanan minimal 4 peserta
            </Text>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                Alert.alert('Promo Rombongan', 'Gunakan kode KAWANLOKAL15 saat checkout untuk diskon 15% pemesanan 4 peserta atau lebih.');
              }}
              className="mt-1 flex-row items-center gap-0.5"
            >
              <Text className="text-xs font-bold text-ulos-red">Pelajari Promo</Text>
              <Ionicons name="chevron-forward" size={14} color="#991B1B" />
            </Pressable>
          </View>
        </View>

        {/* Home Indicator */}
        <View className="w-32 h-1 bg-stone-300 rounded-full mx-auto mt-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
