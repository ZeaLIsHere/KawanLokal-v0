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
import { useTranslation } from '@/i18n';

export default function NewBookingScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const params = useLocalSearchParams<{
    service_type?: string;
    event_id?: string;
    event_title?: string;
    event_location?: string;
    event_price?: string;
    promo_min?: string;
    promo_discount?: string;
    promo_label?: string;
  }>();

  const serviceType = params.service_type || 'ticket';
  const isWorkshop = serviceType === 'workshop';
  const isHomestay = serviceType === 'homestay';

  const defaultTitle = isWorkshop
    ? 'Belajar Menenun Ulos Tradisional (Gedongan)'
    : isHomestay
    ? 'Sopo Bolon Tradisional Tepi Danau'
    : 'Pesta Danau Toba & Pagelaran Gondang';

  const defaultLocation = isWorkshop
    ? 'Sanggar Tenun Lumban Suhi-Suhi, Samosir'
    : isHomestay
    ? 'Tuktuk Siadong, Samosir'
    : 'Pantai Bebas Parapat, Simalungun';

  const [participantCount, setParticipantCount] = useState<number>(2);

  // Parsing harga tiket acara dari parameter (misal "Rp 50.000" -> 50000, Gratis -> 0)
  const ticketPrice = useMemo(() => {
    if (params.event_price) {
      if (params.event_price.toLowerCase().includes('gratis')) return 0;
      const num = parseInt(params.event_price.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(num)) return num;
    }
    return isWorkshop ? 150000 : isHomestay ? 350000 : 50000;
  }, [params.event_price, isWorkshop, isHomestay]);

  const eventTitle = params.event_title || defaultTitle;
  const eventLocation = params.event_location || defaultLocation;

  // Promo rombongan untuk tiket acara / workshop berbayar (default min. 4 peserta diskon 15%)
  const promoMin = (params.promo_min && parseInt(params.promo_min, 10) > 0)
    ? parseInt(params.promo_min, 10)
    : 4;
  const promoDiscount = (params.promo_discount && parseInt(params.promo_discount, 10) > 0)
    ? parseInt(params.promo_discount, 10)
    : 15;
  const promoLabel = params.promo_label || `Diskon ${promoDiscount}% min. ${promoMin} ${isHomestay ? 'malam' : 'peserta'}`;

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
        service_type: serviceType,
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
            {isWorkshop ? t('booking.workshop_title') : isHomestay ? t('booking.homestay_title') : t('booking.ticket_title')}
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
          {/* Field 1: Layanan Terpilih */}
          <View className="border border-white/80 rounded-3xl bg-white/80 p-4 flex-row items-center shadow-sm">
            <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3.5">
              <Ionicons
                name={isWorkshop ? 'brush-outline' : isHomestay ? 'home-outline' : 'map-outline'}
                size={18}
                color="#1D4ED8"
              />
            </View>
            <View className="flex-1">
              <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant">
                {isWorkshop ? t('booking.field_workshop') : isHomestay ? t('booking.field_homestay') : t('booking.field_event')}
              </Text>
              <Text
                numberOfLines={1}
                className="font-raleway text-base font-medium text-on-surface tracking-wide mt-0.5"
              >
                {eventTitle}
              </Text>
            </View>
          </View>

          {/* Field 2: Lokasi */}
          <View className="border border-white/80 rounded-3xl bg-white/80 p-4 flex-row items-center shadow-sm">
            <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3.5">
              <Ionicons name="location-outline" size={18} color="#1D4ED8" />
            </View>
            <View className="flex-1">
              <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant">
                {isWorkshop ? t('booking.field_studio') : isHomestay ? t('booking.field_stay_loc') : t('booking.field_location')}
              </Text>
              <Text
                numberOfLines={1}
                className="font-raleway text-base font-medium text-on-surface tracking-wide mt-0.5"
              >
                {eventLocation}
              </Text>
            </View>
          </View>

          {/* Field 3: Jadwal */}
          <View className="border border-white/80 rounded-3xl bg-white/80 p-4 flex-row items-center shadow-sm">
            <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3.5">
              <Ionicons name="calendar-outline" size={18} color="#1D4ED8" />
            </View>
            <View className="flex-1">
              <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant">
                {isWorkshop ? t('booking.field_schedule') : isHomestay ? t('booking.field_stay_schedule') : t('booking.field_schedule')}
              </Text>
              <Text
                numberOfLines={1}
                className="font-raleway text-base font-medium text-on-surface tracking-wide mt-0.5"
              >
                Jumat, 2 Nov 2026 • 10.00
              </Text>
            </View>
          </View>

          {/* Field 4: Jumlah Tiket / Malam Peserta */}
          <View className="border border-white/80 rounded-3xl bg-white/80 p-4 flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center gap-3.5">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                <Ionicons name={isHomestay ? 'bed-outline' : 'people-outline'} size={18} color="#1D4ED8" />
              </View>
              <View>
                <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant">
                  {isWorkshop ? t('booking.field_capacity_workshop') : isHomestay ? t('booking.field_capacity_homestay') : t('booking.field_capacity_ticket')}
                </Text>
                <Text className="font-raleway text-base font-medium text-on-surface tracking-wide mt-0.5">
                  {isHomestay
                    ? `${participantCount} Malam (${formatRupiah(ticketPrice)}/malam)`
                    : `${participantCount} Peserta (${ticketPrice === 0 ? t('common.free') : `${formatRupiah(ticketPrice)}/org`})`}
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
            {t('booking.billing_title')}
          </Text>
          <View className="flex-row justify-between items-center pb-2.5 border-b border-border/50">
            <Text className="text-xs font-dmsans text-on-surface-variant">
              {isWorkshop
                ? `${t('booking.base_workshop')} (${participantCount}x)`
                : isHomestay
                ? `${t('booking.base_homestay')} (${participantCount} Malam)`
                : `${t('booking.base_ticket')} (${participantCount}x)`}
            </Text>
            <Text className="text-xs font-dmsans-medium text-on-surface">
              {ticketPrice === 0 ? t('common.free') : formatRupiah(baseTotal)}
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
            <Text className="text-xs font-dmsans text-on-surface-variant">{t('booking.service_fee')}</Text>
            <Text className="text-xs font-dmsans-bold text-emerald-700">{t('common.free_cost')}</Text>
          </View>

          <View className="flex-row justify-between items-center pt-3">
            <Text className="font-raleway text-base font-medium text-on-surface">{t('booking.total_cost')}</Text>
            <View className="flex-row items-baseline gap-2">
              {isPromoActive && (
                <Text className="text-xs line-through text-on-surface-variant">
                  {formatRupiah(baseTotal)}
                </Text>
              )}
              <Text className={`font-dmsans-bold text-lg ${isPromoActive ? 'text-emerald-700' : 'text-primary'}`}>
                {ticketPrice === 0 ? t('common.free') : formatRupiah(totalPrice)}
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
            {t('booking.proceed_payment')} • {ticketPrice === 0 ? t('common.free') : formatRupiah(totalPrice)}
          </Text>
        </Pressable>

        {/* Info Card Jaminan KawanLokal */}
        <View className="w-full bg-surface-tonal border border-border/80 rounded-3xl p-4 flex-row items-center justify-between overflow-hidden relative shadow-sm">
          <View className="w-16 h-16 rounded-2xl overflow-hidden bg-white/70 shadow-sm shrink-0">
            <Image
              source={isWorkshop ? PHOTO_COVERS.ulos : isHomestay ? PHOTO_COVERS.homestaySopo : PHOTO_COVERS.parapat}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <View className="flex-1 pl-3.5 justify-center">
            <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-primary">
              {isWorkshop
                ? t('booking.guarantee_workshop')
                : isHomestay
                ? t('booking.guarantee_homestay')
                : t('booking.guarantee_ticket')}
            </Text>
            <Text className="font-raleway text-base font-medium text-on-surface leading-tight mt-0.5">
              {isWorkshop
                ? 'Garansi Kelas Budaya'
                : isHomestay
                ? 'Garansi Penginapan Siap Huni'
                : 'Garansi Akses Langsung'}
            </Text>
            <Text className="text-[11px] font-dmsans text-on-surface-variant mt-0.5">
              {isWorkshop
                ? t('booking.guarantee_workshop_desc')
                : isHomestay
                ? t('booking.guarantee_homestay_desc')
                : t('booking.guarantee_ticket_desc')}
            </Text>
          </View>
        </View>

        {/* Home Indicator */}
        <View className="w-32 h-1 bg-stone-300 rounded-full mx-auto mt-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
