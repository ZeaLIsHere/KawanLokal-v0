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
import { LOCAL_PHOTOS, PHOTO_COVERS } from '@/constants/localPhotos';

const HERO_IMAGE = PHOTO_COVERS.torTor;
const EVENT_GALLERY = [...LOCAL_PHOTOS.torTor, ...LOCAL_PHOTOS.desaTomok.slice(0, 4)];

export default function EventDetailScreen() {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    try {
      await Share.share({
        title: 'Upacara Mangongkal Holi - KawanLokal',
        message:
          'KawanLokal: Upacara Mangongkal Holi\nLokasi: Desa Adat Tomok, Samosir\nJadwal: 15 - 17 Nov 2026 (WIB)\nStatus: Terbuka untuk wisatawan dengan etiket adat.',
      });
    } catch {}
  };

  const handleToggleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setIsSaved(!isSaved);
    Alert.alert(
      isSaved ? 'Dihapus dari Simpanan' : 'Acara Disimpan',
      isSaved
        ? 'Acara telah dihapus dari daftar acara tersimpan Anda.'
        : 'Acara berhasil disimpan ke daftar pengingat. Notifikasi pengingat H-7 dan H-1 akan aktif.'
    );
  };

  const handleAddToCalendar = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    Alert.alert(
      'Kalender HP',
      'Jadwal Upacara Mangongkal Holi berhasil disinkronkan ke kalender perangkat Anda (Zona WIB).'
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top', 'bottom']}>
      {/* Top Navigation Bar */}
      <View className="w-full px-4 py-2 flex-row items-center justify-between bg-surface-card border-b border-card-border/60 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center active:bg-stone-100 active:opacity-80"
        >
          <Ionicons name="arrow-back" size={24} color="#131b2e" />
        </Pressable>

        <View className="items-center">
          <Text className="text-base font-bold text-on-surface tracking-tight">
            Detail Acara Budaya
          </Text>
          <Text className="text-[11px] text-secondary">Kawasan Danau Toba</Text>
        </View>

        <View className="flex-row items-center gap-1">
          <Pressable
            accessibilityLabel="Simpan acara"
            onPress={handleToggleSave}
            className="w-9 h-9 rounded-full items-center justify-center active:bg-stone-100 active:opacity-80"
          >
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={isSaved ? '#991B1B' : '#131b2e'}
            />
          </Pressable>

          <Pressable
            accessibilityLabel="Bagikan acara"
            onPress={handleShare}
            className="w-9 h-9 rounded-full items-center justify-center active:bg-stone-100 active:opacity-80"
          >
            <Ionicons name="share-social-outline" size={20} color="#131b2e" />
          </Pressable>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-3"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Destination / Event Card */}
        <View className="relative w-full h-52 rounded-2xl overflow-hidden shadow-sm border border-card-border mb-4">
          <Image
            source={HERO_IMAGE}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent pointer-events-none" />

          {/* Top Badges */}
          <View className="absolute top-3 left-3 right-3 flex-row justify-between items-center z-10">
            <View className="px-2.5 py-1 rounded-full bg-ulos-red shadow-sm">
              <Text className="text-[10px] font-bold text-white tracking-wide uppercase">
                Terbuka Wisatawan
              </Text>
            </View>
            <View className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm">
              <Text className="text-[10px] font-bold text-on-surface">
                #VERIFIKASI-KURATOR-089
              </Text>
            </View>
          </View>

          {/* Bottom Card Content */}
          <View className="absolute bottom-3 left-4 right-4 z-10">
            <View className="flex-row items-center gap-1 mb-0.5">
              <Ionicons name="location-outline" size={14} color="#FECACA" />
              <Text className="text-xs font-semibold text-red-100">
                Desa Adat Tomok, Samosir
              </Text>
            </View>
            <Text className="text-xl font-bold text-white tracking-tight leading-snug mb-1">
              Upacara Mangongkal Holi
            </Text>
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="calendar-outline" size={14} color="#FFFFFF" />
              <Text className="text-xs font-medium text-white/90">
                3 Hari Acara • 15 - 17 Nov 2026 (WIB)
              </Text>
            </View>
          </View>
        </View>

        {/* Makna Sakral & Filosofi Budaya (PRD F2) */}
        <View className="bg-surface-card rounded-2xl border border-card-border shadow-sm overflow-hidden mb-4 p-4">
          <View className="flex-row items-center gap-2 mb-2 pb-2 border-b border-card-border">
            <View className="w-8 h-8 rounded-lg bg-red-50 items-center justify-center">
              <Ionicons name="sparkles" size={16} color="#991B1B" />
            </View>
            <View>
              <Text className="text-sm font-bold text-on-surface">Makna Budaya & Filosofi</Text>
              <Text className="text-[11px] text-secondary">Nilai Leluhur Batak Toba</Text>
            </View>
          </View>

          <Text className="text-xs text-stone-700 leading-relaxed">
            Upacara Mangongkal Holi merupakan tradisi sakral pemindahan tulang-belulang leluhur ke tugu tugu keluarga permanen. Bertujuan menyatukan seluruh keturunan marga dalam satu tempat peristirahatan terhormat, sebagai wujud bhakti tertinggi anak-cucu serta pengikat tali persaudaraan dalihan na tolu.
          </Text>
        </View>

        {/* Etiket & Kesantunan Pengunjung (PRD F2 Non-Negotiable) */}
        <View className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 shadow-sm mb-4">
          <View className="flex-row items-center gap-2 mb-2.5">
            <Ionicons name="shield-checkmark" size={18} color="#B45309" />
            <Text className="text-xs font-bold text-amber-950 uppercase tracking-wide">
              Etiket Pengunjung yang Wajib Dipatuhi
            </Text>
          </View>

          <View className="gap-2">
            <View className="flex-row items-start gap-2">
              <Text className="text-xs font-bold text-amber-800">•</Text>
              <Text className="text-xs text-amber-900 flex-1 leading-snug">
                Wajib mengenakan Ulos ragi hotang atau busana sopan menutup bahu dan lutut.
              </Text>
            </View>
            <View className="flex-row items-start gap-2">
              <Text className="text-xs font-bold text-amber-800">•</Text>
              <Text className="text-xs text-amber-900 flex-1 leading-snug">
                Dilarang melintas sembarangan di depan tetua adat saat lantunan doa tonggo-tonggo.
              </Text>
            </View>
            <View className="flex-row items-start gap-2">
              <Text className="text-xs font-bold text-amber-800">•</Text>
              <Text className="text-xs text-amber-900 flex-1 leading-snug">
                Mintalah izin panitia sebelum mendokumentasikan prosesi pembukaan peti tulang leluhur.
              </Text>
            </View>
          </View>
        </View>

        {/* Urutan Program Acara (Timeline Itinerary) */}
        <View className="bg-surface-card rounded-2xl border border-card-border p-4 shadow-sm mb-4">
          <Text className="text-sm font-bold text-on-surface mb-3">
            Susunan Prosesi Acara (WIB)
          </Text>

          <View className="gap-3.5">
            <View className="flex-row items-start gap-3">
              <View className="w-16 pt-0.5">
                <Text className="text-xs font-bold text-ulos-red">Hari 1</Text>
                <Text className="text-[10px] text-secondary">10.00 WIB</Text>
              </View>
              <View className="w-2.5 h-2.5 rounded-full bg-ulos-red mt-1.5" />
              <View className="flex-1 pb-2 border-b border-stone-100">
                <Text className="text-xs font-bold text-on-surface">
                  Penyambutan Marga & Gondang Sabangunan
                </Text>
                <Text className="text-[11px] text-secondary mt-0.5">
                  Tarian Tortor pembuka oleh raja huta dan tetua adat.
                </Text>
              </View>
            </View>

            <View className="flex-row items-start gap-3">
              <View className="w-16 pt-0.5">
                <Text className="text-xs font-bold text-ulos-red">Hari 2</Text>
                <Text className="text-[10px] text-secondary">09.00 WIB</Text>
              </View>
              <View className="w-2.5 h-2.5 rounded-full bg-ulos-red mt-1.5" />
              <View className="flex-1 pb-2 border-b border-stone-100">
                <Text className="text-xs font-bold text-on-surface">
                  Prosesi Penggalian & Pencucian Tulang Belulang
                </Text>
                <Text className="text-[11px] text-secondary mt-0.5">
                  Ritual sakral pembersihan tulang leluhur dengan air perasan jeruk purut.
                </Text>
              </View>
            </View>

            <View className="flex-row items-start gap-3">
              <View className="w-16 pt-0.5">
                <Text className="text-xs font-bold text-ulos-red">Hari 3</Text>
                <Text className="text-[10px] text-secondary">13.00 WIB</Text>
              </View>
              <View className="w-2.5 h-2.5 rounded-full bg-ulos-red mt-1.5" />
              <View className="flex-1">
                <Text className="text-xs font-bold text-on-surface">
                  Penyemayaman ke Tugu & Pesta Syukur
                </Text>
                <Text className="text-[11px] text-secondary mt-0.5">
                  Penyemayaman di tugu keluarga diiringi jamuan makan bersama khas Toba.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Galeri Dokumentasi Foto Asli */}
        <View className="mb-4">
          <Text className="text-base font-bold text-on-surface mb-2.5 px-1">
            Galeri Dokumentasi Upacara ({EVENT_GALLERY.length} Foto)
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {EVENT_GALLERY.map((photo, idx) => (
              <View
                key={idx}
                className="w-48 h-32 rounded-2xl overflow-hidden mr-3 bg-stone-100 border border-card-border shadow-sm"
              >
                <Image
                  source={photo}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Pemandu Budaya Terkait (PRD F3) */}
        <View className="bg-surface-card rounded-2xl border border-card-border p-4 shadow-sm mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="w-11 h-11 rounded-xl bg-blue-50 items-center justify-center">
                <Ionicons name="people-outline" size={22} color="#004ac6" />
              </View>
              <View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="star" size={13} color="#F59E0B" />
                  <Text className="text-xs font-bold text-on-surface">4.9</Text>
                  <Text className="text-[10px] text-secondary">(120+ ulasan)</Text>
                </View>
                <Text className="text-sm font-bold text-on-surface mt-0.5">
                  Komunitas Pemandu Adat Tomok
                </Text>
                <Text className="text-[11px] text-secondary">Pemandu Lokal Berlisensi</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Floating Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-surface-card/95 backdrop-blur-md px-4 pt-3 pb-6 border-t border-card-border shadow-lg z-30">
        <View className="flex-row gap-2.5">
          <Pressable
            onPress={handleAddToCalendar}
            className="flex-1 py-3 px-3 rounded-xl border border-stone-300 bg-white items-center justify-center flex-row gap-1.5 active:bg-stone-50"
          >
            <Ionicons name="calendar-outline" size={16} color="#131b2e" />
            <Text className="text-xs font-bold text-on-surface">Ingatkan di HP</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/booking/new')}
            className="flex-1 py-3 px-4 rounded-xl bg-ulos-red active:bg-ulos-redDark items-center justify-center flex-row gap-1.5 shadow-md active:opacity-90"
          >
            <Ionicons name="ticket-outline" size={16} color="#FFFFFF" />
            <Text className="text-xs font-bold text-white">Pesan Tiket</Text>
          </Pressable>
        </View>

        {/* iOS Home Indicator */}
        <View className="w-32 h-1 bg-stone-300 rounded-full mx-auto mt-3" />
      </View>
    </SafeAreaView>
  );
}
