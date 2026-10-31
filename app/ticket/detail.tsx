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
import { useTranslation } from '@/i18n';

export default function TicketDetailScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const params = useLocalSearchParams<{
    service_type?: string;
    title?: string;
    location?: string;
    amount?: string;
    participants?: string;
  }>();

  const serviceType = params.service_type || 'ticket';
  const isGuide = serviceType === 'guide';
  const isWorkshop = serviceType === 'workshop';
  const isHomestay = serviceType === 'homestay';

  const defaultTitle = isGuide
    ? 'Bona Simanjuntak'
    : isWorkshop
    ? 'Belajar Menenun Ulos Tradisional (Gedongan)'
    : isHomestay
    ? 'Sopo Bolon Tradisional Tepi Danau'
    : 'Pesta Danau Toba & Pagelaran Gondang';

  const defaultLocation = isGuide
    ? 'Dermaga Tomok, Pulau Samosir'
    : isWorkshop
    ? 'Sanggar Tenun Lumban Suhi-Suhi, Samosir'
    : isHomestay
    ? 'Tuktuk Siadong, Samosir'
    : 'Pantai Bebas Parapat, Danau Toba';

  const displayTitle = params.title || defaultTitle;
  const displayLocation = params.location || defaultLocation;
  const totalAmount = params.amount
    ? parseInt(params.amount, 10)
    : isGuide
    ? 250000
    : isWorkshop
    ? 150000
    : isHomestay
    ? 350000
    : 100000;
  const participantCount = params.participants || '2';
  const bookingCode = isGuide
    ? '#KL-GD-2026-442'
    : isWorkshop
    ? '#KL-WS-2026-319'
    : isHomestay
    ? '#KL-HS-2026-812'
    : '#KL-TB-2026-891';

  const [isSavedOffline, setIsSavedOffline] = useState(true);

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    const shareTitle = isGuide
      ? `Voucher Pemandu: ${displayTitle}`
      : isWorkshop
      ? `Voucher Workshop: ${displayTitle}`
      : isHomestay
      ? `Voucher Homestay: ${displayTitle}`
      : `Tiket KawanLokal: ${displayTitle}`;

    const shareMessage = isGuide
      ? `Voucher Reservasi Pemandu KawanLokal\nPemandu: ${displayTitle}\nKode Booking: ${bookingCode}\nTitik Temu: ${displayLocation}\nKontak: +62 812-6421-9901`
      : isWorkshop
      ? `Voucher Workshop Seni KawanLokal\nKelas: ${displayTitle}\nKode Booking: ${bookingCode}\nLokasi Sanggar: ${displayLocation}\nJadwal: Jumat, 2 Nov 2026 • 10.00`
      : isHomestay
      ? `Voucher Reservasi Homestay KawanLokal\nPenginapan: ${displayTitle}\nKode Booking: ${bookingCode}\nLokasi: ${displayLocation}\nCheck-in: 14.00 WIB`
      : `Tiket Resmi KawanLokal\nAcara: ${displayTitle}\nKode: ${bookingCode}\nJadwal: Jumat, 2 Nov 2026 • 10.00\nLokasi: ${displayLocation}`;

    try {
      await Share.share({ title: shareTitle, message: shareMessage });
    } catch {}
  };

  const handleSaveOffline = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    Alert.alert(
      isGuide || isWorkshop || isHomestay ? 'Voucher Offline Tersimpan' : 'Tiket Offline Tersimpan',
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
      {/* App Top Navigation Bar (DESIGN.md: top-app-bar + button-icon-glass) */}
      <View className="w-full px-5 py-3 flex-row items-center justify-between bg-white/75 border-b border-border/50 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.replace('/(tabs)/home')}
          className="w-11 h-11 rounded-full items-center justify-center bg-white/80 border border-white/90 shadow-sm"
        >
          <AppIcon name="arrow-left" size={20} color="#23201E" />
        </Pressable>

        <View className="items-center">
          <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-primary">
            {isGuide
              ? t('ticket.tag_reservation')
              : isWorkshop
              ? t('ticket.tag_class')
              : isHomestay
              ? t('ticket.tag_reservation')
              : t('ticket.tag_ticket')}
          </Text>
          <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
            {isGuide
              ? t('ticket.title_guide')
              : isWorkshop
              ? t('ticket.title_workshop')
              : isHomestay
              ? t('ticket.title_homestay')
              : t('ticket.title_ticket')}
          </Text>
        </View>

        <Pressable
          accessibilityLabel="Bagikan"
          onPress={handleShare}
          className="w-11 h-11 rounded-full items-center justify-center bg-white/80 border border-white/90 shadow-sm"
        >
          <Ionicons name="share-social-outline" size={18} color="#23201E" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image Banner */}
        <View className="relative w-full h-[150px] rounded-3xl overflow-hidden shadow-sm border border-white/80 mb-4 bg-surface-tonal">
          <Image
            source={
              isGuide
                ? PHOTO_COVERS.desaTomok
                : isWorkshop
                ? PHOTO_COVERS.ulos
                : isHomestay
                ? PHOTO_COVERS.homestaySopo
                : PHOTO_COVERS.parapat
            }
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
                {isGuide ? 'MDN' : isWorkshop ? 'SMR' : isHomestay ? 'CHK' : 'AJB'}
              </Text>
              <Text className="text-xs font-dmsans text-on-surface-variant mt-0.5">
                {isGuide
                  ? 'Titik Penjemputan'
                  : isWorkshop
                  ? 'Studio Pengrajin'
                  : isHomestay
                  ? 'Check-in 14.00'
                  : 'Dermaga Ajibata'}
              </Text>
            </View>

            <View className="items-center px-2">
              <View className="flex-row items-center gap-1">
                <View className="w-8 h-0.5 bg-border" />
                <Ionicons
                  name={
                    isGuide
                      ? 'walk-outline'
                      : isWorkshop
                      ? 'brush-outline'
                      : isHomestay
                      ? 'bed-outline'
                      : 'boat-outline'
                  }
                  size={18}
                  color="#1D4ED8"
                />
                <View className="w-8 h-0.5 bg-border" />
              </View>
              <Text className="text-[10px] uppercase tracking-wider font-dmsans-bold text-primary mt-1">
                {isGuide
                  ? t('ticket.route_tour')
                  : isWorkshop
                  ? t('ticket.route_workshop')
                  : isHomestay
                  ? t('ticket.route_homestay')
                  : t('ticket.route_crossing')}
              </Text>
            </View>

            <View className="items-end">
              <Text className="text-2xl font-raleway font-semibold text-on-surface tracking-wide">
                {isGuide ? 'TMK' : isWorkshop ? 'TBA' : isHomestay ? 'OUT' : 'TMK'}
              </Text>
              <Text className="text-xs font-dmsans text-on-surface-variant mt-0.5">
                {isGuide
                  ? 'Tomok, Samosir'
                  : isWorkshop
                  ? 'Lumban Suhi'
                  : isHomestay
                  ? 'Check-out 12.00'
                  : 'Tomok, Samosir'}
              </Text>
            </View>
          </View>

          <View className="w-full h-px bg-border/50" />

          {/* Penyelenggara / Profil Pemandu */}
          <View className="flex-row items-center gap-3">
            <View className="w-11 h-11 rounded-2xl bg-blue-50 border border-primary/20 items-center justify-center shrink-0">
              <Ionicons
                name={
                  isGuide
                    ? 'person'
                    : isWorkshop
                    ? 'brush'
                    : isHomestay
                    ? 'home'
                    : 'sparkles'
                }
                size={20}
                color="#1D4ED8"
              />
            </View>
            <View className="flex-1">
              <Text className="font-raleway text-base font-medium text-on-surface leading-tight">
                {displayTitle}
              </Text>
              <Text className="text-xs font-dmsans text-on-surface-variant mt-0.5">
                {isGuide
                  ? 'Pemandu Budaya Berlisensi • Terverifikasi KawanLokal'
                  : isWorkshop
                  ? 'Sanggar Seni Budaya Toba • Instruktur Terverifikasi'
                  : isHomestay
                  ? 'Pengelola Sopo Bolon Adat • Terverifikasi KawanLokal'
                  : 'Panitia Adat Toba • Tiket Terverifikasi Kurator'}
              </Text>
            </View>
          </View>

          {/* Date & Timing */}
          <View className="bg-surface-tonal rounded-2xl p-3.5 flex-row items-center border border-border/60">
            <View className="flex-row items-start gap-2.5">
              <Ionicons name="calendar-outline" size={18} color="#1D4ED8" style={{ marginTop: 2 }} />
              <View>
                <Text className="text-xs font-dmsans-bold text-on-surface">Jumat, 2 Nov 2026</Text>
                <Text className="text-xs font-dmsans text-on-surface-variant mt-0.5">09.00 – 16.00</Text>
              </View>
            </View>
          </View>
        </View>

        {/* QR Code / Voucher Verification Card */}
        <View className="bg-white/85 rounded-3xl p-5 border border-white/90 shadow-sm mb-4 items-center">
          <View className="w-full pb-3 border-b border-dashed border-border/80 mb-4">
            <Text className="text-[10px] uppercase tracking-wider font-dmsans-medium text-on-surface-variant">
              {isGuide
                ? t('ticket.code_guide')
                : isWorkshop
                ? t('ticket.code_workshop')
                : isHomestay
                ? t('ticket.code_homestay')
                : t('ticket.code_ticket')}
            </Text>
            <Text className="font-raleway text-base font-semibold text-on-surface mt-0.5">
              {bookingCode}
            </Text>
          </View>

          {/* QR Code Container */}
          <View className="p-4 bg-white border border-border/80 rounded-3xl items-center justify-center shadow-xs mb-3">
            <Ionicons name="qr-code" size={130} color="#23201E" />
          </View>

          <Text className="font-dmsans-medium text-xs text-on-surface text-center">
            {isGuide
              ? t('ticket.qr_guide')
              : isWorkshop
              ? t('ticket.qr_workshop')
              : isHomestay
              ? t('ticket.qr_homestay')
              : t('ticket.qr_ticket')}
          </Text>
          <Text className="text-[11px] font-dmsans text-on-surface-variant text-center mt-1">
            {isHomestay
              ? `Durasi: ${participantCount} Malam • ${displayLocation}`
              : `Peserta: ${participantCount} Orang • ${displayLocation}`}
          </Text>

          {/* Action Hubungi Kontak Khusus Guide, Workshop & Homestay */}
          {(isGuide || isWorkshop || isHomestay) && (
            <View className="w-full mt-4 pt-3 border-t border-border/50 gap-2.5">
              <Pressable
                onPress={handleContactWhatsApp}
                className="w-full h-12 bg-emerald-600 rounded-full flex-row items-center justify-center gap-2 shadow-xs"
              >
                <Ionicons name="logo-whatsapp" size={17} color="#FFFFFF" />
                <Text className="text-white font-dmsans-medium text-xs tracking-wide">
                  {isGuide
                    ? t('ticket.contact_wa_guide')
                    : isWorkshop
                    ? t('ticket.contact_wa_workshop')
                    : t('ticket.contact_wa_homestay')}
                </Text>
              </Pressable>

              <Pressable
                onPress={handleCallGuide}
                className="w-full h-12 bg-white border border-border rounded-full flex-row items-center justify-center gap-2 shadow-xs"
              >
                <Ionicons name="call-outline" size={17} color="#23201E" />
                <Text className="text-on-surface font-dmsans-medium text-xs tracking-wide">
                  {t('ticket.call')} (+62 812-6421-9901)
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Price Breakdown Card */}
        <View className="bg-white/85 rounded-3xl p-5 border border-white/90 shadow-sm mb-4">
          <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant mb-3">
            {t('ticket.billing_summary')}
          </Text>
          <View className="gap-2.5">
            <View className="flex-row justify-between items-center">
              <Text className="text-xs font-dmsans text-on-surface-variant">
                {isGuide
                  ? `Jasa Pemandu Budaya (${participantCount} org)`
                  : isWorkshop
                  ? `Biaya Workshop (${participantCount} Peserta)`
                  : isHomestay
                  ? `Tarif Menginap (${participantCount} Malam)`
                  : `Tiket Masuk (${participantCount}x)`}
              </Text>
              <Text className="text-xs font-dmsans-medium text-on-surface">
                {formatRupiah(totalAmount)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-xs font-dmsans text-on-surface-variant">{t('booking.service_fee')}</Text>
              <Text className="text-xs font-dmsans-bold text-emerald-700">{t('common.free_cost')}</Text>
            </View>
            <View className="pt-2.5 border-t border-border/50 flex-row justify-between items-center">
              <Text className="font-raleway text-sm font-medium text-on-surface">{t('ticket.total_paid')}</Text>
              <Text className="text-base font-dmsans-bold text-primary">
                {formatRupiah(totalAmount)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Action Bar (DESIGN.md: button-primary) */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/95 px-5 pt-3 pb-6 border-t border-border/50 shadow-lg z-30">
        <Pressable
          onPress={handleSaveOffline}
          className="w-full h-14 bg-primary rounded-full flex-row items-center justify-center gap-2.5 shadow-md"
        >
          <Ionicons name="download-outline" size={20} color="#FFFFFF" />
          <Text className="text-white font-dmsans-medium text-sm tracking-wide">
            {t('ticket.save_to_gallery')}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
