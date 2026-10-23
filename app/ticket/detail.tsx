import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80';

export default function TicketDetailScreen() {
  const router = useRouter();
  const [isSavedOffline, setIsSavedOffline] = useState(true);

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    try {
      await Share.share({
        title: 'Tiket KawanLokal: Pesta Danau Toba',
        message:
          'Tiket Resmi KawanLokal\nAcara: Pesta Danau Toba & Pagelaran Gondang\nKode: #KL-TB-2026-891\nJadwal: Jumat, 2 Nov 2026 • 10.00 WIB\nLokasi: Pantai Bebas Parapat, Danau Toba',
      });
    } catch {}
  };

  const handleSaveOffline = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    Alert.alert(
      'Tiket Offline Tersimpan',
      'Tiket ini telah tersimpan dalam cache perangkat Anda. Dapat dibuka dan dipindai di lokasi acara tanpa memerlukan koneksi internet.'
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top', 'bottom']}>
      {/* App Top Navigation Bar */}
      <View className="w-full px-4 py-2.5 flex-row items-center justify-between bg-surface-card border-b border-card-border/60 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center active:bg-stone-100 active:opacity-80"
        >
          <Ionicons name="arrow-back" size={24} color="#131b2e" />
        </Pressable>

        <Text className="text-lg font-bold text-on-surface tracking-tight">
          Detail Tiket Acara
        </Text>

        <Pressable
          accessibilityLabel="Bagikan Tiket"
          onPress={handleShare}
          className="w-10 h-10 rounded-full items-center justify-center active:bg-stone-100 active:opacity-80"
        >
          <Ionicons name="share-social-outline" size={22} color="#131b2e" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-3"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image Banner */}
        <View className="relative w-full h-[142px] rounded-2xl overflow-hidden shadow-sm border border-card-border mb-4">
          <Image
            source={{ uri: HERO_IMAGE }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          <View className="absolute bottom-2.5 left-3 bg-ulos-red/90 px-2.5 py-0.5 rounded-full">
            <Text className="text-[10px] font-bold text-white tracking-wide">
              FESTIVAL BUDAYA AKBAR
            </Text>
          </View>
        </View>

        {/* Route & Event Information Card */}
        <View className="bg-surface-card rounded-2xl p-4 border border-card-border shadow-sm mb-4 gap-4">
          {/* Titik Lokasi & Jalur Acara */}
          <View className="flex-row justify-between items-center px-1">
            <View>
              <Text className="text-2xl font-black text-on-surface tracking-tight">
                AJB
              </Text>
              <Text className="text-xs text-secondary mt-0.5">Dermaga Ajibata</Text>
            </View>

            <View className="items-center px-2">
              <View className="flex-row items-center gap-1">
                <View className="w-8 h-0.5 bg-stone-300" />
                <Ionicons name="boat-outline" size={20} color="#991B1B" />
                <View className="w-8 h-0.5 bg-stone-300" />
              </View>
              <Text className="text-[10px] font-semibold text-secondary mt-1">
                Lintas Danau Toba
              </Text>
            </View>

            <View className="items-end">
              <Text className="text-2xl font-black text-on-surface tracking-tight">
                TMK
              </Text>
              <Text className="text-xs text-secondary mt-0.5">Tomok, Samosir</Text>
            </View>
          </View>

          <View className="w-full h-px bg-card-border" />

          {/* Penyelenggara & Kategori Layanan */}
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 items-center justify-center shrink-0">
              <Ionicons name="sparkles" size={20} color="#991B1B" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-on-surface leading-tight">
                Pesta Danau Toba & Pagelaran Gondang
              </Text>
              <Text className="text-xs text-secondary mt-0.5">
                Panitia Adat Toba • Tiket Terverifikasi Kurator
              </Text>
            </View>
          </View>

          {/* Date, Timing & Status Pill */}
          <View className="bg-surface-canvas rounded-xl p-3 flex-row items-center justify-between border border-card-border">
            <View className="flex-row items-start gap-2.5">
              <Ionicons name="calendar-outline" size={18} color="#505f76" style={{ marginTop: 2 }} />
              <View>
                <Text className="text-xs font-bold text-on-surface">Jumat, 2 Nov 2026</Text>
                <Text className="text-xs text-secondary mt-0.5">10:00 – 16:00 WIB</Text>
              </View>
            </View>
            <View className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              <Text className="text-xs font-bold text-emerald-700">LUNAS / SIAP</Text>
            </View>
          </View>
        </View>

        {/* QR Code Digital Ticket Card (PRD F6) */}
        <View className="bg-surface-card rounded-2xl p-4 border border-card-border shadow-sm mb-4 items-center">
          <View className="flex-row items-center justify-between w-full pb-3 border-b border-dashed border-card-border mb-4">
            <View>
              <Text className="text-[11px] font-semibold text-secondary">KODE TIKET DIGITAL</Text>
              <Text className="text-sm font-extrabold text-on-surface mt-0.5">#KL-TB-2026-891</Text>
            </View>
            <View className="px-2.5 py-1 rounded-lg bg-stone-100 flex-row items-center gap-1">
              <Ionicons name="cloud-offline" size={13} color="#15803D" />
              <Text className="text-[11px] font-bold text-emerald-800">Tersedia Offline</Text>
            </View>
          </View>

          {/* Mock QR Code Container */}
          <View className="p-4 bg-white border border-stone-200 rounded-2xl items-center justify-center shadow-xs mb-3">
            <Ionicons name="qr-code" size={140} color="#131b2e" />
          </View>

          <Text className="text-xs font-semibold text-stone-700 text-center">
            Tunjukkan kode QR ini ke panitia di pintu masuk acara
          </Text>
          <Text className="text-[11px] text-secondary text-center mt-1">
            Peserta: 2 Orang (Akses Panggung Budaya + Souvenir Ulos)
          </Text>
        </View>

        {/* Price Breakdown Card */}
        <View className="bg-surface-card rounded-2xl p-4 border border-card-border shadow-sm mb-4 space-y-3">
          <Text className="text-sm font-bold text-on-surface">Rincian Pembayaran</Text>
          <View className="pt-2 gap-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-xs text-secondary">Tiket Masuk (2x)</Text>
              <Text className="text-xs font-semibold text-on-surface">Rp 100.000</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-xs text-secondary">Biaya Layanan & Pemeliharaan Adat</Text>
              <Text className="text-xs font-bold text-emerald-700">Bebas Biaya</Text>
            </View>
            <View className="pt-2.5 border-t border-card-border flex-row justify-between items-center">
              <Text className="text-sm font-bold text-on-surface">Total Dibayar</Text>
              <Text className="text-base font-extrabold text-ulos-red">Rp 100.000</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Floating Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-surface-card/95 backdrop-blur-md px-4 pt-3 pb-6 border-t border-card-border shadow-lg z-30 flex-col items-center">
        <Pressable
          onPress={handleSaveOffline}
          className="w-full h-12 bg-stone-900 active:bg-stone-800 rounded-xl flex-row items-center justify-center gap-2 shadow-md active:opacity-90"
        >
          <Ionicons name="download-outline" size={18} color="#FFFFFF" />
          <Text className="text-white font-bold text-sm">
            Simpan Tiket ke Galeri
          </Text>
        </Pressable>

        {/* iOS Home Indicator */}
        <View className="w-32 h-1 bg-stone-300 rounded-full mt-3" />
      </View>
    </SafeAreaView>
  );
}
