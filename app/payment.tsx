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
import { AppIcon } from '@/components/AppIcon';
import { PHOTO_COVERS } from '@/constants/localPhotos';

type PaymentMethod = 'qris' | 'va' | 'card';

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('qris');

  const handleSelectMethod = (method: PaymentMethod) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setSelectedMethod(method);
  };

  const handlePayNow = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    Alert.alert(
      'Pembayaran Berhasil',
      'Transaksi sebesar Rp 100.000 berhasil diverifikasi. Tiket digital QR Anda kini telah aktif dan dapat dibuka secara offline.',
      [
        {
          text: 'Buka Tiket Saya',
          onPress: () => {
            router.replace('/ticket/detail');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      {/* Navigation Header Glassmorphic */}
      <View className="flex-row items-center justify-between px-5 py-3 bg-white/75 border-b border-border/50 shrink-0 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-11 h-11 items-center justify-center rounded-full bg-white/70 border border-white/80 shadow-sm active:opacity-75"
        >
          <AppIcon name="arrow-left" size={20} color="#23201E" />
        </Pressable>

        <View className="items-center">
          <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant">
            CHECKOUT
          </Text>
          <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
            Pembayaran Digital
          </Text>
        </View>

        <View className="w-11 h-11" />
      </View>

      <ScrollView
        className="flex-1 px-5 py-4"
        contentContainerStyle={{ paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Booking Summary Section */}
        <View className="mb-5">
          <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant mb-2">
            RINGKASAN PESANAN
          </Text>

          {/* Summary Card Glassmorphic */}
          <View className="bg-white/80 border border-white/80 rounded-3xl p-4 flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center gap-3.5 flex-1 pr-2">
              <View className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-surface-tonal">
                <Image
                  source={PHOTO_COVERS.parapat}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              <View className="flex-1">
                <Text
                  numberOfLines={1}
                  className="font-raleway text-base font-medium text-on-surface tracking-wide leading-tight"
                >
                  Pesta Danau Toba
                </Text>
                <Text className="text-xs font-dmsans text-on-surface-variant mt-0.5">
                  Pantai Bebas Parapat • 2 Peserta
                </Text>
              </View>
            </View>

            <View className="items-end pl-2 shrink-0">
              <Text className="font-dmsans-bold text-base text-primary">
                Rp 100.000
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Method Section (PRD F5) */}
        <View className="mb-5">
          <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant mb-2">
            METODE PEMBAYARAN
          </Text>

          {/* Options Card List */}
          <View className="bg-white/80 border border-white/80 rounded-3xl shadow-sm overflow-hidden">
            {/* Option 1: QRIS */}
            <Pressable
              onPress={() => handleSelectMethod('qris')}
              className="flex-row items-center justify-between p-4 border-b border-border/50 active:bg-surface-tonal/50"
            >
              <View className="flex-row items-center gap-3.5 flex-1 pr-2">
                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center shrink-0">
                  <Ionicons name="qr-code-outline" size={20} color="#1D4ED8" />
                </View>
                <View className="flex-1">
                  <Text className="font-raleway text-base font-medium text-on-surface tracking-wide">
                    QRIS (Instan)
                  </Text>
                  <Text className="text-xs font-dmsans text-on-surface-variant mt-0.5">
                    Gopay, OVO, ShopeePay, Dana, & Semua Bank
                  </Text>
                </View>
              </View>

              <View className="w-5 h-5 rounded-full border-2 border-primary items-center justify-center">
                {selectedMethod === 'qris' && (
                  <View className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </View>
            </Pressable>

            {/* Option 2: Virtual Account Bank */}
            <Pressable
              onPress={() => handleSelectMethod('va')}
              className="flex-row items-center justify-between p-4 border-b border-border/50 active:bg-surface-tonal/50"
            >
              <View className="flex-row items-center gap-3.5 flex-1 pr-2">
                <View className="w-10 h-10 rounded-full bg-surface-tonal items-center justify-center shrink-0">
                  <Ionicons name="business-outline" size={20} color="#4A4542" />
                </View>
                <View className="flex-1">
                  <Text className="font-raleway text-base font-medium text-on-surface tracking-wide">
                    Virtual Account Bank
                  </Text>
                  <Text className="text-xs font-dmsans text-on-surface-variant mt-0.5">
                    BCA, Mandiri, BRI, BNI (Verifikasi Otomatis)
                  </Text>
                </View>
              </View>

              <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                selectedMethod === 'va' ? 'border-primary' : 'border-border'
              }`}>
                {selectedMethod === 'va' && (
                  <View className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </View>
            </Pressable>

            {/* Option 3: Kartu Debit / Kredit */}
            <Pressable
              onPress={() => handleSelectMethod('card')}
              className="flex-row items-center justify-between p-4 active:bg-surface-tonal/50"
            >
              <View className="flex-row items-center gap-3.5 flex-1 pr-2">
                <View className="w-10 h-10 rounded-full bg-surface-tonal items-center justify-center shrink-0">
                  <Ionicons name="card-outline" size={20} color="#4A4542" />
                </View>
                <View className="flex-1">
                  <Text className="font-raleway text-base font-medium text-on-surface tracking-wide">
                    Kartu Debit / Kredit
                  </Text>
                  <Text className="text-xs font-dmsans text-on-surface-variant mt-0.5">
                    Visa, Mastercard, & Gerbang Pembayaran Nasional
                  </Text>
                </View>
              </View>

              <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                selectedMethod === 'card' ? 'border-primary' : 'border-border'
              }`}>
                {selectedMethod === 'card' && (
                  <View className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </View>
            </Pressable>
          </View>
        </View>

        {/* Security Trust Info Badge */}
        <View className="bg-surface-tonal rounded-3xl p-4 border border-border/80 flex-row items-start gap-3">
          <View className="w-8 h-8 rounded-full bg-emerald-100 items-center justify-center shrink-0">
            <Ionicons name="shield-checkmark" size={17} color="#15803D" />
          </View>
          <View className="flex-1">
            <Text className="text-[11px] font-dmsans-bold uppercase tracking-wider text-emerald-950">
              JAMINAN TRANSAKSI TERLINDUNGI
            </Text>
            <Text className="text-[11px] font-dmsans text-on-surface-variant mt-1 leading-relaxed">
              Pembayaran diproses melalui payment gateway resmi berlisensi Bank Indonesia. Tiket digital dibuat secara instan dan kuota terjamin atomik.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Elevated Bottom Action Area (Sticky) */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/92 shadow-lg px-5 pt-3 pb-6 border-t border-border/50 z-30">
        {/* Primary Action CTA Button */}
        <Pressable
          onPress={handlePayNow}
          className="w-full h-14 bg-primary active:bg-blue-800 text-white rounded-full flex-row items-center justify-center gap-2 shadow-md mb-2"
        >
          <AppIcon name="wallet" size={20} color="#FFFFFF" />
          <Text className="text-white font-dmsans-medium text-base tracking-wide">
            Bayar Rp 100.000
          </Text>
        </Pressable>

        {/* Security Caption Reassurance */}
        <View className="flex-row items-center justify-center gap-1.5 pt-1">
          <Ionicons name="shield-outline" size={13} color="#8A827A" />
          <Text className="text-[11px] font-dmsans text-on-surface-variant text-center">
            Pembayaran dienkripsi aman 256-bit SSL.
          </Text>
        </View>

        {/* iOS Home Indicator Bar */}
        <View className="w-32 h-1 bg-stone-300 rounded-full mx-auto mt-2.5" />
      </View>
    </SafeAreaView>
  );
}
