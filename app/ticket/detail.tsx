import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
  Share,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { formatRupiah } from '@/lib/format';
import { AppIcon } from '@/components/AppIcon';
import { PHOTO_COVERS } from '@/constants/localPhotos';

export default function TicketDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    service_type?: string;
    title?: string;
    location?: string;
    amount?: string;
    participants?: string;
  }>();

  const isGuide = params.service_type === 'guide';
  const displayTitle = params.title || (isGuide ? 'Bona Simanjuntak' : 'Pesta Danau Toba & Pagelaran Gondang');
  const displayLocation = params.location || (isGuide ? 'Dermaga Tomok, Pulau Samosir' : 'Pantai Bebas Parapat, Danau Toba');
  const totalAmount = params.amount ? parseInt(params.amount, 10) : (isGuide ? 250000 : 100000);
  const participantCount = params.participants || '2';
  const bookingCode = isGuide ? '#KL-GD-2026-442' : '#KL-TB-2026-891';

  const [isSavedOffline, setIsSavedOffline] = useState(true);

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    try {
      await Share.share({
        title: isGuide ? `Voucher Pemandu: ${displayTitle}` : `Tiket KawanLokal: ${displayTitle}`,
        message: isGuide
          ? `Voucher Reservasi Pemandu KawanLokal\nPemandu: ${displayTitle}\nKode Booking: ${bookingCode}\nTitik Temu: ${displayLocation}\nKontak: +62 812-6421-9901`
          : `Tiket Resmi KawanLokal\nAcara: ${displayTitle}\nKode: ${bookingCode}\nJadwal: Jumat, 2 Nov 2026 • 10.00 WIB\nLokasi: ${displayLocation}`,
      });
    } catch {}
  };

  const handleSaveOffline = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    Alert.alert(
      isGuide ? 'Voucher Offline Tersimpan' : 'Tiket Offline Tersimpan',
      'Dokumen ini telah tersimpan dalam cache perangkat Anda. Dapat dibuka dan dipindai di lokasi tanpa koneksi internet.'
    );
  };

  const handleContactWhatsApp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    Linking.openURL('https://wa.me/6281264219901?text=Halo%20saya%20telah%20memesan%20jasa%20pemandu%20melalui%20KawanLokal').catch(() => {
      Alert.alert('Kontak Pemandu', 'WhatsApp: +62 812-6421-9901 (Bona Simanjuntak)');
    });
  };

  const handleCallGuide = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    Linking.openURL('tel:+6281264219901').catch(() => {
      Alert.alert('Kontak Pemandu', 'Telepon: +62 812-6421-9901 (Bona Simanjuntak)');
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      {/* App Top Navigation Bar */}
      <View className="w-full px-5 py-3 flex-row items-center justify-between bg-white/75 border-b border-border/50 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.replace('/(tabs)/home')}
          className="w-11 h-11 rounded-full items-center justify-center bg-white/80 border border-white/90 shadow-xs"
        >
          <AppIcon name="arrow-left" size={20} color="#23201E" />
        </Pressable>

        <View className="items-center">
          <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant">
            {isGuide ? 'BUKTI RESERVASI' : 'BUKTI TIKET'}
          </Text>
          <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
            {isGuide ? 'Voucher Pemandu' : 'Detail Tiket Acara'}
          </Text>
        </View>

        <Pressable
          accessibilityLabel="Bagikan"
          onPress={handleShare}
          className="w-11 h-11 rounded-full items-center justify-center bg-white/80 border border-white/90 shadow-xs"
        >
          <Ionicons name="share-social-outline" size={18} color="#23201E" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image Banner */}
        <View className="relative w-full h-[150px] rounded-3xl overflow-hidden shadow-sm border border-white/80 mb-4 bg-surface-tonal">
          <Image
            source={isGuide ? PHOTO_COVERS.desaTomok : PHOTO_COVERS.parapat}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Route / Service Information Card */}
        <View className="bg-white/85 rounded-3xl p-5 border border-white/90 shadow-sm mb-4 gap-4">
          {/* Titik Lokasi & Jalur Acara */}
          <View className="flex-row justify-between items-center px-1">
            <View>
              <Text className="text-2xl font-raleway font-semibold text-on-surface tracking-wide">
                {isGuide ? 'MDN' : 'AJB'}
              </Text>
              <Text className="text-xs font-dmsans text-on-surface-variant mt-0.5">
                {isGuide ? 'Titik Penjemputan' : 'Dermaga Ajibata'}
              </Text>
            </View>

            <View className="items-center px-2">
              <View className="flex-row items-center gap-1">
                <View className="w-8 h-0.5 bg-border" />
                <Ionicons name={isGuide ? 'walk-outline' : 'boat-outline'} size={18} color="#1D4ED8" />
                <View className="w-8 h-0.5 bg-border" />
              </View>
              <Text className="text-[10px] uppercase tracking-wider font-dmsans-bold text-primary mt-1">
                {isGuide ? 'Tur Budaya Adat' : 'Lintas Danau Toba'}
              </Text>
            </View>

            <View className="items-end">
              <Text className="text-2xl font-raleway font-semibold text-on-surface tracking-wide">
                TMK
              </Text>
              <Text className="text-xs font-dmsans text-on-surface-variant mt-0.5">
                Tomok, Samosir
              </Text>
            </View>
          </View>

          <View className="w-full h-px bg-border/50" />

          {/* Penyelenggara / Profil Pemandu */}
          <View className="flex-row items-center gap-3">
            <View className="w-11 h-11 rounded-2xl bg-blue-50 border border-primary/20 items-center justify-center shrink-0">
              <Ionicons name={isGuide ? 'person' : 'sparkles'} size={20} color="#1D4ED8" />
            </View>
            <View className="flex-1">
              <Text className="font-raleway text-base font-medium text-on-surface leading-tight">
                {displayTitle}
              </Text>
              <Text className="text-xs font-dmsans text-on-surface-variant mt-0.5">
                {isGuide
                  ? 'Pemandu Budaya Berlisensi • Terverifikasi KawanLokal'
                  : 'Panitia Adat Toba • Tiket Terverifikasi Kurator'}
              </Text>
            </View>
          </View>

          {/* Date, Timing & Status Pill */}
          <View className="bg-surface-tonal rounded-2xl p-3.5 flex-row items-center justify-between border border-border/60">
            <View className="flex-row items-start gap-2.5">
              <Ionicons name="calendar-outline" size={18} color="#1D4ED8" style={{ marginTop: 2 }} />
              <View>
                <Text className="text-xs font-dmsans-bold text-on-surface">Jumat, 2 Nov 2026</Text>
                <Text className="text-xs font-dmsans text-on-surface-variant mt-0.5">09:00 – 16:00 WIB</Text>
              </View>
            </View>
            <View className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              <Text className="text-xs font-dmsans-bold text-emerald-700">LUNAS / SIAP</Text>
            </View>
          </View>
        </View>

        {/* QR Code / Voucher Verification Card */}
        <View className="bg-white/85 rounded-3xl p-5 border border-white/90 shadow-sm mb-4 items-center">
          <View className="flex-row items-center justify-between w-full pb-3 border-b border-dashed border-border/80 mb-4">
            <View>
              <Text className="text-[10px] uppercase tracking-wider font-dmsans-medium text-on-surface-variant">
                {isGuide ? 'KODE RESERVASI PEMANDU' : 'KODE TIKET DIGITAL'}
              </Text>
              <Text className="font-raleway text-base font-semibold text-on-surface mt-0.5">
                {bookingCode}
              </Text>
            </View>
            <View className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 flex-row items-center gap-1">
              <Ionicons name="cloud-offline" size={13} color="#15803D" />
              <Text className="text-[10px] font-dmsans-bold text-emerald-800">Tersedia Offline</Text>
            </View>
          </View>

          {/* QR Code Container */}
          <View className="p-4 bg-white border border-border/80 rounded-3xl items-center justify-center shadow-xs mb-3">
            <Ionicons name="qr-code" size={130} color="#23201E" />
          </View>

          <Text className="font-dmsans-medium text-xs text-on-surface text-center">
            {isGuide
              ? 'Tunjukkan QR atau sebutkan PIN temu kepada pemandu Anda di lokasi kumpul'
              : 'Tunjukkan kode QR ini ke panitia di pintu masuk acara'}
          </Text>
          <Text className="text-[11px] font-dmsans text-on-surface-variant text-center mt-1">
            Peserta: {participantCount} Orang • {displayLocation}
          </Text>

          {/* Action Hubungi Pemandu Khusus Guide Service */}
          {isGuide && (
            <View className="w-full mt-4 pt-3 border-t border-border/50 gap-2">
              <Pressable
                onPress={handleContactWhatsApp}
                className="w-full h-11 bg-emerald-600 rounded-full flex-row items-center justify-center gap-2 shadow-xs"
              >
                <Ionicons name="logo-whatsapp" size={16} color="#FFFFFF" />
                <Text className="text-white font-dmsans-medium text-xs tracking-wide">
                  Hubungi Pemandu via WhatsApp
                </Text>
              </Pressable>

              <Pressable
                onPress={handleCallGuide}
                className="w-full h-11 bg-white border border-border rounded-full flex-row items-center justify-center gap-2 shadow-xs"
              >
                <Ionicons name="call-outline" size={16} color="#23201E" />
                <Text className="text-on-surface font-dmsans-medium text-xs tracking-wide">
                  Telepon (+62 812-6421-9901)
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Price Breakdown Card */}
        <View className="bg-white/85 rounded-3xl p-5 border border-white/90 shadow-sm mb-4">
          <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant mb-3">
            RINCIAN PEMBAYARAN
          </Text>
          <View className="gap-2.5">
            <View className="flex-row justify-between items-center">
              <Text className="text-xs font-dmsans text-on-surface-variant">
                {isGuide ? `Jasa Pemandu Budaya (${participantCount} org)` : `Tiket Masuk (${participantCount}x)`}
              </Text>
              <Text className="text-xs font-dmsans-medium text-on-surface">
                {formatRupiah(totalAmount)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-xs font-dmsans text-on-surface-variant">Biaya Layanan & Konservasi</Text>
              <Text className="text-xs font-dmsans-bold text-emerald-700">Bebas Biaya</Text>
            </View>
            <View className="pt-2.5 border-t border-border/50 flex-row justify-between items-center">
              <Text className="font-raleway text-sm font-medium text-on-surface">Total Dibayar</Text>
              <Text className="text-base font-dmsans-bold text-primary">
                {formatRupiah(totalAmount)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/92 px-5 pt-3 pb-6 border-t border-border/50 shadow-lg z-30">
        <Pressable
          onPress={handleSaveOffline}
          className="w-full h-13 bg-primary rounded-full flex-row items-center justify-center gap-2 shadow-md"
        >
          <Ionicons name="download-outline" size={18} color="#FFFFFF" />
          <Text className="text-white font-dmsans-medium text-sm tracking-wide">
            {isGuide ? 'Simpan Voucher ke Galeri' : 'Simpan Tiket ke Galeri'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
