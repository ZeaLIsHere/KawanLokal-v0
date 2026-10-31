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
import { AppIcon } from '@/components/AppIcon';
import { PHOTO_COVERS } from '@/constants/localPhotos';

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
          <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant">
            FORMULIR
          </Text>
          <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
            Pesan Layanan
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
        {/* Switcher Segmented Control Glassmorphic */}
        <View className="w-full p-1 bg-white/70 rounded-full border border-white/80 flex-row items-center justify-between mb-5 shadow-sm">
          <Pressable
            onPress={() => handleTypeSwitch('ticket')}
            className={`flex-1 py-2.5 rounded-full items-center justify-center ${
              bookingType === 'ticket' ? 'bg-primary shadow-sm' : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-[10px] uppercase tracking-[0.18em] font-dmsans-bold ${
                bookingType === 'ticket' ? 'text-white' : 'text-on-surface-variant'
              }`}
            >
              Tiket Acara
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleTypeSwitch('guide')}
            className={`flex-1 py-2.5 rounded-full items-center justify-center ${
              bookingType === 'guide' ? 'bg-primary shadow-sm' : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-[10px] uppercase tracking-[0.18em] font-dmsans-bold ${
                bookingType === 'guide' ? 'text-white' : 'text-on-surface-variant'
              }`}
            >
              Paket Pemandu
            </Text>
          </Pressable>
        </View>

        {/* Booking Parameters Form Module */}
        <View className="gap-3.5 mb-5">
          {/* Field 1: Pilihan Layanan / Acara */}
          <View className="border border-white/80 rounded-3xl bg-white/80 p-4 flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center gap-3.5 flex-1 pr-2">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                <Ionicons name="sparkles" size={18} color="#1D4ED8" />
              </View>
              <View className="flex-1">
                <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant">
                  Layanan Terpilih
                </Text>
                <Text
                  numberOfLines={1}
                  className="font-raleway text-base font-medium text-on-surface tracking-wide mt-0.5"
                >
                  {bookingType === 'ticket'
                    ? 'Pesta Danau Toba & Pagelaran Gondang'
                    : 'Pemandu Budaya Desa Adat Tomok'}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-down" size={18} color="#8A827A" />
          </View>

          {/* Field 2: Kawasan / Lokasi Temu */}
          <View className="border border-white/80 rounded-3xl bg-white/80 p-4 flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center gap-3.5 flex-1 pr-2">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                <Ionicons name="location-outline" size={18} color="#1D4ED8" />
              </View>
              <View className="flex-1">
                <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant">
                  Titik Lokasi
                </Text>
                <Text
                  numberOfLines={1}
                  className="font-raleway text-base font-medium text-on-surface tracking-wide mt-0.5"
                >
                  {bookingType === 'ticket'
                    ? 'Pantai Bebas Parapat, Simalungun'
                    : 'Dermaga Tomok, Pulau Samosir'}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-down" size={18} color="#8A827A" />
          </View>

          {/* Field 3: Jadwal & Waktu WIB */}
          <View className="border border-white/80 rounded-3xl bg-white/80 p-4 flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center gap-3.5 flex-1 pr-2">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                <Ionicons name="calendar-outline" size={18} color="#1D4ED8" />
              </View>
              <View className="flex-1">
                <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant">
                  Jadwal Kegiatan (WIB)
                </Text>
                <Text
                  numberOfLines={1}
                  className="font-raleway text-base font-medium text-on-surface tracking-wide mt-0.5"
                >
                  Jumat, 2 Nov 2026 • 10.00 WIB
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-down" size={18} color="#8A827A" />
          </View>

          {/* Field 4: Jumlah Peserta dengan Kontrol +/- */}
          <View className="border border-white/80 rounded-3xl bg-white/80 p-4 flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center gap-3.5">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                <Ionicons name="people-outline" size={18} color="#1D4ED8" />
              </View>
              <View>
                <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant">
                  Jumlah Peserta
                </Text>
                <Text className="font-raleway text-base font-medium text-on-surface tracking-wide mt-0.5">
                  {participantCount} Peserta ({formatRupiah(pricePerItem)}/org)
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
            <Text className="text-xs font-dmsans text-on-surface-variant">Tarif Dasar ({participantCount}x)</Text>
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
