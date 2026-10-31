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
  const totalPrice = participantCount * ticketPrice;

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
              {formatRupiah(totalPrice)}
            </Text>
          </View>
          <View className="flex-row justify-between items-center py-2.5 border-b border-border/50">
            <Text className="text-xs font-dmsans text-on-surface-variant">Biaya Layanan & Konservasi</Text>
            <Text className="text-xs font-dmsans-bold text-emerald-700">Bebas Biaya</Text>
          </View>
          <View className="flex-row justify-between items-center pt-3">
            <Text className="font-raleway text-base font-medium text-on-surface">Total Biaya</Text>
            <Text className="font-dmsans-bold text-lg text-primary">
              {formatRupiah(totalPrice)}
            </Text>
          </View>
        </View>

        {/* Primary Action CTA Button: Lanjut ke Pembayaran */}
        <Pressable
          onPress={handleProceedPayment}
          className="w-full h-14 rounded-full bg-primary flex-row items-center justify-center gap-2 shadow-md mb-5"
        >
          <Ionicons name="card-outline" size={18} color="#FFFFFF" />
          <Text className="text-white font-dmsans-medium text-base tracking-wide">
            Lanjut ke Pembayaran • {formatRupiah(totalPrice)}
          </Text>
        </Pressable>

        {/* Promotional Offer Card */}
        <View className="w-full bg-surface-tonal border border-border/80 rounded-3xl p-4 flex-row items-center justify-between overflow-hidden relative shadow-sm">
          {/* Photo */}
          <View className="w-20 h-16 rounded-2xl overflow-hidden bg-white/70 shadow-sm shrink-0">
            <Image
              source={PHOTO_COVERS.parapat}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Offer Details */}
          <View className="flex-1 pl-3.5 justify-center">
            <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-primary">
              PROMO BUDAYA
            </Text>
            <Text className="font-raleway text-base font-medium text-on-surface leading-tight mt-0.5">
              Diskon Rombongan 15%
            </Text>
            <Text className="text-[11px] font-dmsans text-on-surface-variant mt-0.5">
              Khusus pemesanan minimal 4 peserta
            </Text>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                Alert.alert('Promo Rombongan', 'Gunakan kode KAWANLOKAL15 saat checkout untuk diskon 15% pemesanan 4 peserta atau lebih.');
              }}
              className="mt-1 flex-row items-center gap-1"
            >
              <Text className="text-[11px] uppercase tracking-[0.15em] font-dmsans-bold text-primary">
                PELAJARI PROMO
              </Text>
              <Ionicons name="chevron-forward" size={12} color="#1D4ED8" />
            </Pressable>
          </View>
        </View>

        {/* Home Indicator */}
        <View className="w-32 h-1 bg-stone-300 rounded-full mx-auto mt-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
