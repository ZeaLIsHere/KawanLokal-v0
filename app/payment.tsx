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
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top', 'bottom']}>
      {/* Navigation Header */}
      <View className="flex-row items-center justify-between px-4 py-2.5 bg-surface-card border-b border-card-border/60 shrink-0 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full active:bg-stone-100 active:opacity-80"
        >
          <AppIcon name="arrow-left" size={22} />
        </Pressable>

        <Text className="text-lg font-bold text-on-surface tracking-tight">
          Pembayaran Digital
        </Text>

        <View className="w-10 h-10" />
      </View>

      <ScrollView
        className="flex-1 px-4 py-4"
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Booking Summary Section */}
        <View className="mb-5">
          <Text className="text-base font-bold text-on-surface mb-2.5">
            Ringkasan Pesanan
          </Text>

          {/* Summary Card */}
          <View className="bg-surface-card border border-card-border rounded-2xl p-3.5 flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center gap-3.5 flex-1 pr-2">
              <View className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-card-border">
                <Image
                  source={PHOTO_COVERS.parapat}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              <View className="flex-1">
                <Text
                  numberOfLines={1}
                  className="text-sm font-bold text-on-surface leading-tight"
                >
                  Pesta Danau Toba
                </Text>
                <Text className="text-xs text-secondary mt-0.5">
                  Pantai Bebas Parapat • 2 Peserta
                </Text>
              </View>
            </View>

            <View className="items-end pl-2 shrink-0">
              <Text className="text-base font-extrabold text-ulos-red">
                Rp 100.000
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Method Section (PRD F5) */}
        <View className="mb-5">
          <Text className="text-base font-bold text-on-surface mb-2.5">
            Pilih Metode Pembayaran
          </Text>

          {/* Options Card List */}
          <View className="bg-surface-card border border-card-border rounded-2xl shadow-sm divide-y divide-card-border overflow-hidden">
            {/* Option 1: QRIS */}
            <Pressable
              onPress={() => handleSelectMethod('qris')}
              className="flex-row items-center justify-between p-3.5 active:bg-stone-50"
            >
              <View className="flex-row items-center gap-3 flex-1 pr-2">
                <View className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center shrink-0">
                  <Ionicons name="qr-code-outline" size={20} color="#1D4ED8" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-on-surface">
                    QRIS (Instan)
                  </Text>
                  <Text className="text-xs text-secondary mt-0.5">
                    Gopay, OVO, ShopeePay, Dana, & Semua Bank
                  </Text>
                </View>
              </View>

              <View className="w-5 h-5 rounded-full border-2 border-ulos-red items-center justify-center">
                {selectedMethod === 'qris' && (
                  <View className="w-2.5 h-2.5 rounded-full bg-ulos-red" />
                )}
              </View>
            </Pressable>

            {/* Option 2: Virtual Account Bank */}
            <Pressable
              onPress={() => handleSelectMethod('va')}
              className="flex-row items-center justify-between p-3.5 active:bg-stone-50"
            >
              <View className="flex-row items-center gap-3 flex-1 pr-2">
                <View className="w-10 h-10 rounded-xl bg-stone-100 items-center justify-center shrink-0">
                  <Ionicons name="business-outline" size={20} color="#505f76" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-on-surface">
                    Virtual Account Bank
                  </Text>
                  <Text className="text-xs text-secondary mt-0.5">
                    BCA, Mandiri, BRI, BNI (Verifikasi Otomatis)
                  </Text>
                </View>
              </View>

              <View className="w-5 h-5 rounded-full border-2 border-stone-300 items-center justify-center">
                {selectedMethod === 'va' && (
                  <View className="w-2.5 h-2.5 rounded-full bg-ulos-red" />
                )}
              </View>
            </Pressable>

            {/* Option 3: Kartu Debit / Kredit */}
            <Pressable
              onPress={() => handleSelectMethod('card')}
              className="flex-row items-center justify-between p-3.5 active:bg-stone-50"
            >
              <View className="flex-row items-center gap-3 flex-1 pr-2">
                <View className="w-10 h-10 rounded-xl bg-stone-100 items-center justify-center shrink-0">
                  <Ionicons name="card-outline" size={20} color="#505f76" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-on-surface">
                    Kartu Debit / Kredit
                  </Text>
                  <Text className="text-xs text-secondary mt-0.5">
                    Visa, Mastercard, & Gerbang Pembayaran Nasional
                  </Text>
                </View>
              </View>

              <View className="w-5 h-5 rounded-full border-2 border-stone-300 items-center justify-center">
                {selectedMethod === 'card' && (
                  <View className="w-2.5 h-2.5 rounded-full bg-ulos-red" />
                )}
              </View>
            </Pressable>
          </View>
        </View>

        {/* Security Trust Info Badge */}
        <View className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200/80 flex-row items-start gap-3">
          <View className="w-8 h-8 rounded-full bg-emerald-100 items-center justify-center shrink-0">
            <Ionicons name="shield-checkmark" size={18} color="#15803D" />
          </View>
          <View className="flex-1">
            <Text className="text-xs font-bold text-emerald-950">
              Jaminan Transaksi Terlindungi
            </Text>
            <Text className="text-[11px] text-emerald-800/90 mt-0.5 leading-relaxed">
              Pembayaran diproses melalui payment gateway resmi berlisensi Bank Indonesia. Tiket digital dibuat secara instan dan kuota terjamin atomik.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Elevated Bottom Action Area (Sticky) */}
      <View className="absolute bottom-0 left-0 right-0 bg-surface-card shadow-lg px-4 pt-3 pb-6 border-t border-card-border z-30">
        {/* Primary Action CTA Button */}
        <Pressable
          onPress={handlePayNow}
          className="w-full h-12 bg-ulos-red active:bg-ulos-redDark text-white rounded-xl font-bold flex-row items-center justify-center gap-2 shadow-sm active:opacity-90"
        >
          <AppIcon name="wallet" size={20} color="#FFFFFF" />
          <Text className="text-white font-bold text-base">
            Bayar Rp 100.000
          </Text>
        </Pressable>

        {/* Security Caption Reassurance */}
        <View className="flex-row items-center justify-center gap-1.5 pt-2.5">
          <Ionicons name="shield-outline" size={13} color="#78716C" />
          <Text className="text-[11px] text-secondary text-center">
            Pembayaran dienkripsi aman 256-bit SSL.
          </Text>
        </View>

        {/* iOS Home Indicator Bar */}
        <View className="w-32 h-1 bg-stone-300 rounded-full mx-auto mt-2.5" />
      </View>
    </SafeAreaView>
  );
}
