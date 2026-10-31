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

export default function GuideBookingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    guide_id?: string;
    guide_name?: string;
    guide_specialty?: string;
    guide_district?: string;
    guide_price?: string;
  }>();

  const [groupSize, setGroupSize] = useState<number>(2);

  // Parsing tarif flat pemandu per trip (misal "Rp 250.000" -> 250000)
  const tripPrice = useMemo(() => {
    if (params.guide_price) {
      const num = parseInt(params.guide_price.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(num) && num > 0) return num;
    }
    return 250000;
  }, [params.guide_price]);

  const guideName = params.guide_name || 'Bona Simanjuntak';
  const guideDistrict = params.guide_district || 'Dermaga Tomok, Pulau Samosir';

  const handleIncrement = () => {
    if (groupSize < 10) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      setGroupSize((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (groupSize > 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      setGroupSize((prev) => prev - 1);
    }
  };

  const handleProceedPayment = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    router.push({
      pathname: '/payment',
      params: {
        service_type: 'guide',
        title: guideName,
        location: guideDistrict,
        amount: String(tripPrice),
        participants: String(groupSize),
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      {/* Top App Bar Glassmorphic (DESIGN.md) */}
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
            Reservasi Pemandu
          </Text>
        </View>

        <Pressable
          accessibilityLabel="Informasi"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            Alert.alert(
              'Info Reservasi Pemandu',
              'Tarif pemandu berlaku flat untuk satu kelompok rombongan (maksimal 10 orang per trip). Anda akan menerima voucher temu dan kontak pemandu setelah pembayaran.'
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
          {/* Field 1: Pemandu Terpilih */}
          <View className="border border-white/80 rounded-3xl bg-white/80 p-4 flex-row items-center shadow-sm">
            <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3.5">
              <Ionicons name="person-outline" size={18} color="#1D4ED8" />
            </View>
            <View className="flex-1">
              <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant">
                Pemandu Terpilih
              </Text>
              <Text
                numberOfLines={1}
                className="font-raleway text-base font-medium text-on-surface tracking-wide mt-0.5"
              >
                {guideName}
              </Text>
            </View>
          </View>

          {/* Field 2: Titik Kumpul Temu */}
          <View className="border border-white/80 rounded-3xl bg-white/80 p-4 flex-row items-center shadow-sm">
            <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3.5">
              <Ionicons name="location-outline" size={18} color="#1D4ED8" />
            </View>
            <View className="flex-1">
              <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant">
                Titik Kumpul Temu
              </Text>
              <Text
                numberOfLines={1}
                className="font-raleway text-base font-medium text-on-surface tracking-wide mt-0.5"
              >
                {guideDistrict}
              </Text>
            </View>
          </View>

          {/* Field 3: Jadwal Kegiatan Temu */}
          <View className="border border-white/80 rounded-3xl bg-white/80 p-4 flex-row items-center shadow-sm">
            <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3.5">
              <Ionicons name="calendar-outline" size={18} color="#1D4ED8" />
            </View>
            <View className="flex-1">
              <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant">
                Jadwal Pertemuan
              </Text>
              <Text
                numberOfLines={1}
                className="font-raleway text-base font-medium text-on-surface tracking-wide mt-0.5"
              >
                Jumat, 2 Nov 2026 • 09.00
              </Text>
            </View>
          </View>

          {/* Field 4: Jumlah Rombongan */}
          <View className="border border-white/80 rounded-3xl bg-white/80 p-4 flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center gap-3.5">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                <Ionicons name="people-outline" size={18} color="#1D4ED8" />
              </View>
              <View>
                <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant">
                  Kapasitas Rombongan
                </Text>
                <Text className="font-raleway text-base font-medium text-on-surface tracking-wide mt-0.5">
                  {groupSize} Orang (Maks. 10 org/trip)
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
                {groupSize}
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
              Jasa Pemandu Budaya (Tarif Tur Rombongan)
            </Text>
            <Text className="text-xs font-dmsans-medium text-on-surface">
              {formatRupiah(tripPrice)}
            </Text>
          </View>
          <View className="flex-row justify-between items-center py-2.5 border-b border-border/50">
            <Text className="text-xs font-dmsans text-on-surface-variant">Biaya Layanan Konservasi</Text>
            <Text className="text-xs font-dmsans-bold text-emerald-700">Bebas Biaya</Text>
          </View>
          <View className="flex-row justify-between items-center pt-3">
            <Text className="font-raleway text-base font-medium text-on-surface">Total Biaya</Text>
            <Text className="font-dmsans-bold text-lg text-primary">
              {formatRupiah(tripPrice)}
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
            Lanjut ke Pembayaran • {formatRupiah(tripPrice)}
          </Text>
        </Pressable>

        {/* Info Card Jaminan KawanLokal */}
        <View className="w-full bg-surface-tonal border border-border/80 rounded-3xl p-4 flex-row items-center justify-between overflow-hidden relative shadow-sm">
          <View className="w-16 h-16 rounded-2xl overflow-hidden bg-white/70 shadow-sm shrink-0">
            <Image
              source={PHOTO_COVERS.desaTomok}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <View className="flex-1 pl-3.5 justify-center">
            <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-primary">
              GARANSI LOKAL
            </Text>
            <Text className="font-raleway text-base font-medium text-on-surface leading-tight mt-0.5">
              Pemandu Resmi Berlisensi
            </Text>
            <Text className="text-[11px] font-dmsans text-on-surface-variant mt-0.5">
              Didampingi langsung oleh warga asli pelaku adat Danau Toba.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
