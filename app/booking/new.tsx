import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { formatRupiah } from '@/lib/format';
import { AppIcon } from '@/components/AppIcon';
import { PHOTO_COVERS } from '@/constants/localPhotos';

export default function NewBookingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    event_id?: string;
    event_title?: string;
    event_location?: string;
    event_price?: string;
    promo_min?: string;
    promo_discount?: string;
    promo_label?: string;
  }>();

  const [participantCount, setParticipantCount] = useState<number>(2);

  // Parsing harga tiket acara dari parameter (misal "Rp 50.000" -> 50000, Gratis -> 0)
  const ticketPrice = useMemo(() => {
    if (params.event_price) {
      if (params.event_price.toLowerCase().includes('gratis')) return 0;
      const num = parseInt(params.event_price.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(num)) return num;
    }
    return 50000;
  }, [params.event_price]);

  const eventTitle = params.event_title || 'Pesta Danau Toba & Pagelaran Gondang';
  const eventLocation = params.event_location || 'Pantai Bebas Parapat, Simalungun';

  // Promo rombongan untuk tiket acara berbayar (default min. 4 tiket diskon 15%)
  const promoMin = (params.promo_min && parseInt(params.promo_min, 10) > 0)
    ? parseInt(params.promo_min, 10)
    : 4;
  const promoDiscount = (params.promo_discount && parseInt(params.promo_discount, 10) > 0)
    ? parseInt(params.promo_discount, 10)
    : 15;
  const promoLabel = params.promo_label || `Diskon ${promoDiscount}% min. ${promoMin} tiket`;

  const hasPromo = ticketPrice > 0 && promoMin > 0 && promoDiscount > 0;
  const isPromoActive = hasPromo && participantCount >= promoMin;

  const baseTotal = participantCount * ticketPrice;
  const discountAmount = isPromoActive ? Math.round((baseTotal * promoDiscount) / 100) : 0;
  const totalPrice = baseTotal - discountAmount;

  const handleIncrement = () => {
    if (participantCount < 10) {
      const nextCount = participantCount + 1;
      if (hasPromo && nextCount === promoMin) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      }
      setParticipantCount(nextCount);
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
    router.push({
      pathname: '/payment',
      params: {
        service_type: 'ticket',
        title: eventTitle,
        location: eventLocation,
        amount: String(totalPrice),
        participants: String(participantCount),
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      {/* Top App Bar Glassmorphic */}
      <View className="w-full px-5 py-3 flex-row items-center justify-between bg-white/75 border-b border-border/50 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-11 h-11 rounded-full bg-white/70 border border-white/80 shadow-sm items-center justify-center"
        >
          <AppIcon name="arrow-left" size={20} color="#23201E" />
        </Pressable>

        <View className="items-center">
          <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
            Pesan Tiket Acara
          </Text>
        </View>

        <Pressable
          accessibilityLabel="Informasi"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            Alert.alert(
              'Info Pemesanan KawanLokal',
              'Setiap pesanan dijamin kuotanya secara atomik. Tiket QR akan dibuat setelah status pembayaran lunas.'
            );
          }}
          className="w-11 h-11 rounded-full bg-white/70 border border-white/80 shadow-sm items-center justify-center"
        >
          <Ionicons name="information-circle-outline" size={20} color="#8A827A" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Booking Parameters Form Module */}
        <View className="gap-3.5 mb-5">
          {/* Field 1: Acara Terpilih */}
          <View className="border border-white/80 rounded-3xl bg-white/80 p-4 flex-row items-center shadow-sm">
            <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3.5">
              <Ionicons name="map-outline" size={18} color="#1D4ED8" />
            </View>
            <View className="flex-1">
              <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant">
                Acara Terpilih
              </Text>
              <Text
                numberOfLines={1}
                className="font-raleway text-base font-medium text-on-surface tracking-wide mt-0.5"
              >
                {eventTitle}
              </Text>
            </View>
          </View>

          {/* Field 2: Lokasi Acara */}
          <View className="border border-white/80 rounded-3xl bg-white/80 p-4 flex-row items-center shadow-sm">
            <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3.5">
              <Ionicons name="location-outline" size={18} color="#1D4ED8" />
            </View>
            <View className="flex-1">
              <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant">
                Lokasi Acara
              </Text>
              <Text
                numberOfLines={1}
                className="font-raleway text-base font-medium text-on-surface tracking-wide mt-0.5"
              >
                {eventLocation}
              </Text>
            </View>
          </View>

          {/* Field 3: Jadwal & Waktu */}
          <View className="border border-white/80 rounded-3xl bg-white/80 p-4 flex-row items-center shadow-sm">
            <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3.5">
              <Ionicons name="calendar-outline" size={18} color="#1D4ED8" />
            </View>
            <View className="flex-1">
              <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant">
                Jadwal Kegiatan
              </Text>
              <Text
                numberOfLines={1}
                className="font-raleway text-base font-medium text-on-surface tracking-wide mt-0.5"
              >
                Jumat, 2 Nov 2026 • 10.00
              </Text>
            </View>
          </View>

          {/* Field 4: Jumlah Tiket Peserta */}
          <View className="border border-white/80 rounded-3xl bg-white/80 p-4 flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center gap-3.5">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                <Ionicons name="people-outline" size={18} color="#1D4ED8" />
              </View>
              <View>
                <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant">
                  Jumlah Tiket
                </Text>
                <Text className="font-raleway text-base font-medium text-on-surface tracking-wide mt-0.5">
                  {participantCount} Peserta ({ticketPrice === 0 ? 'Gratis' : `${formatRupiah(ticketPrice)}/tiket`})
                </Text>
              </View>
            </View>

            {/* Stepper Buttons */}
            <View className="flex-row items-center gap-2 bg-surface-tonal p-1 rounded-full border border-border/60">
              <Pressable
                onPress={handleDecrement}
                className="w-8 h-8 rounded-full bg-white items-center justify-center shadow-sm"
              >
                <Ionicons name="remove" size={16} color="#23201E" />
              </Pressable>
              <Text className="font-dmsans-bold text-sm text-on-surface px-1.5">
                {participantCount}
              </Text>
              <Pressable
                onPress={handleIncrement}
                className="w-8 h-8 rounded-full bg-white items-center justify-center shadow-sm"
              >
                <Ionicons name="add" size={16} color="#23201E" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Banner Status Promo Rombongan Otomatis */}
        {hasPromo && (
          <View
            className={`rounded-3xl p-4 mb-5 border flex-row items-center gap-3.5 shadow-sm ${
              isPromoActive
                ? 'bg-emerald-50 border-emerald-300'
                : 'bg-surface-tonal border-border/80'
            }`}
          >
            <View
              className={`w-10 h-10 rounded-2xl items-center justify-center shrink-0 ${
                isPromoActive ? 'bg-emerald-600' : 'bg-white'
              }`}
            >
              <Ionicons
                name={isPromoActive ? 'checkmark-circle' : 'gift-outline'}
                size={20}
                color={isPromoActive ? '#FFFFFF' : '#8A827A'}
              />
            </View>

            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text
                  className={`text-[10px] uppercase tracking-[0.18em] font-dmsans-bold ${
                    isPromoActive ? 'text-emerald-800' : 'text-on-surface-variant'
                  }`}
                >
                  {isPromoActive ? 'PROMO AKTIF TERPASANG' : 'PROMO ROMBONGAN TERSEDIA'}
                </Text>
                {isPromoActive && (
                  <View className="px-2 py-0.5 rounded-full bg-emerald-600">
                    <Text className="text-[10px] font-dmsans-bold text-white">Hemat {promoDiscount}%</Text>
                  </View>
                )}
              </View>

              <Text
                className={`font-raleway text-sm font-medium leading-snug mt-0.5 ${
                  isPromoActive ? 'text-emerald-950 font-semibold' : 'text-on-surface'
                }`}
              >
                {isPromoActive
                  ? `Diskon ${promoDiscount}% otomatis memotong harga total tiket!`
                  : `Tambah ${promoMin - participantCount} tiket lagi untuk mengaktifkan diskon ${promoDiscount}%.`}
              </Text>

              <Text className="text-[11px] font-dmsans text-on-surface-variant mt-0.5">
                {promoLabel} (Jumlah tiket Anda: {participantCount} tiket)
              </Text>
            </View>
          </View>
        )}

        {/* Ringkasan Estimasi Biaya Glassmorphic */}
        <View className="bg-white/80 rounded-3xl border border-white/80 p-5 mb-5 shadow-sm">
          <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant mb-3">
            RINCIAN ESTIMASI BIAYA
          </Text>
          <View className="flex-row justify-between items-center pb-2.5 border-b border-border/50">
            <Text className="text-xs font-dmsans text-on-surface-variant">
              Tiket Masuk Acara ({participantCount}x)
            </Text>
            <Text className="text-xs font-dmsans-medium text-on-surface">
              {ticketPrice === 0 ? 'Gratis' : formatRupiah(baseTotal)}
            </Text>
          </View>

          {isPromoActive && (
            <View className="flex-row justify-between items-center py-2.5 border-b border-border/50">
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="pricetag" size={13} color="#15803D" />
                <Text className="text-xs font-dmsans-bold text-emerald-800">
                  Potongan Promo Rombongan ({promoDiscount}%)
                </Text>
              </View>
              <Text className="text-xs font-dmsans-bold text-emerald-700">
                - {formatRupiah(discountAmount)}
              </Text>
            </View>
          )}

          <View className="flex-row justify-between items-center py-2.5 border-b border-border/50">
            <Text className="text-xs font-dmsans text-on-surface-variant">Biaya Layanan & Konservasi</Text>
            <Text className="text-xs font-dmsans-bold text-emerald-700">Bebas Biaya</Text>
          </View>

          <View className="flex-row justify-between items-center pt-3">
            <Text className="font-raleway text-base font-medium text-on-surface">Total Biaya</Text>
            <View className="flex-row items-baseline gap-2">
              {isPromoActive && (
                <Text className="text-xs line-through text-on-surface-variant">
                  {formatRupiah(baseTotal)}
                </Text>
              )}
              <Text className={`font-dmsans-bold text-lg ${isPromoActive ? 'text-emerald-700' : 'text-primary'}`}>
                {ticketPrice === 0 ? 'Gratis' : formatRupiah(totalPrice)}
              </Text>
            </View>
          </View>
        </View>

        {/* Primary Action CTA Button: Lanjut ke Pembayaran */}
        <Pressable
          onPress={handleProceedPayment}
          className="w-full h-14 rounded-full bg-primary flex-row items-center justify-center gap-2 shadow-md mb-5"
        >
          <Ionicons name="card-outline" size={18} color="#FFFFFF" />
          <Text className="text-white font-dmsans-medium text-base tracking-wide">
            Lanjut ke Pembayaran • {ticketPrice === 0 ? 'Gratis' : formatRupiah(totalPrice)}
          </Text>
        </Pressable>

        {/* Info Card Jaminan KawanLokal */}
        <View className="w-full bg-surface-tonal border border-border/80 rounded-3xl p-4 flex-row items-center justify-between overflow-hidden relative shadow-sm">
          <View className="w-16 h-16 rounded-2xl overflow-hidden bg-white/70 shadow-sm shrink-0">
            <Image
              source={PHOTO_COVERS.parapat}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <View className="flex-1 pl-3.5 justify-center">
            <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-primary">
              TIKET RESMI TERVERIFIKASI
            </Text>
            <Text className="font-raleway text-base font-medium text-on-surface leading-tight mt-0.5">
              Garansi Akses Langsung
            </Text>
            <Text className="text-[11px] font-dmsans text-on-surface-variant mt-0.5">
              Tiket digital resmi KawanLokal dijamin kuotanya langsung oleh panitia acara.
            </Text>
          </View>
        </View>

        {/* Home Indicator */}
        <View className="w-32 h-1 bg-stone-300 rounded-full mx-auto mt-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
