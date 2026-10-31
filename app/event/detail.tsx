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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { AppIcon } from '@/components/AppIcon';
import { CULTURAL_EVENTS, DEFAULT_EVENT } from '@/constants/culturalEvents';

export default function EventDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();

  // Ambil data acara spesifik sesuai ID yang dipilih pengguna
  const currentEvent = (params.id && CULTURAL_EVENTS[params.id]) ? CULTURAL_EVENTS[params.id] : DEFAULT_EVENT;

  const [isSaved, setIsSaved] = useState(false);

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    try {
      await Share.share({
        title: `${currentEvent.title} - KawanLokal`,
        message:
          `KawanLokal: ${currentEvent.title}\nLokasi: ${currentEvent.location}\nJadwal: ${currentEvent.scheduleText}\nHTM: ${currentEvent.price}`,
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
        : `Acara ${currentEvent.title} berhasil disimpan ke daftar pengingat. Notifikasi pengingat H-7 dan H-1 akan aktif.`
    );
  };

  const handleAddToCalendar = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    Alert.alert(
      'Kalender HP',
      `Jadwal ${currentEvent.title} berhasil disinkronkan ke kalender perangkat Anda.`
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      {/* Top App Bar Glassmorphic (DESIGN.md: top-app-bar + button-icon-glass) */}
      <View className="w-full px-5 py-3 flex-row items-center justify-between bg-white/75 border-b border-border/50 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-11 h-11 rounded-full items-center justify-center bg-white/80 border border-white/90 shadow-sm"
        >
          <AppIcon name="arrow-left" size={20} color="#23201E" />
        </Pressable>

        <View className="items-center">
          <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-primary">
            ACARA BUDAYA
          </Text>
          <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
            Detail Acara
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Pressable
            accessibilityLabel="Simpan acara"
            onPress={handleToggleSave}
            className="w-11 h-11 rounded-full items-center justify-center bg-white/80 border border-white/90 shadow-sm"
          >
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={18}
              color={isSaved ? '#1D4ED8' : '#23201E'}
            />
          </Pressable>

          <Pressable
            accessibilityLabel="Bagikan acara"
            onPress={handleShare}
            className="w-11 h-11 rounded-full items-center justify-center bg-white/80 border border-white/90 shadow-sm"
          >
            <Ionicons name="share-social-outline" size={18} color="#23201E" />
          </Pressable>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Destination / Event Card (DESIGN.md: card glassmorphic) */}
        <View className="relative w-full h-56 rounded-3xl overflow-hidden shadow-sm border border-white/80 mb-5 bg-surface-tonal">
          <Image
            source={currentEvent.coverImage}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

          {/* Bottom Card Content */}
          <View className="absolute bottom-4 left-5 right-5 z-10">
            <View className="flex-row items-center gap-1.5 mb-1">
              <Ionicons name="location-outline" size={14} color="#FFFFFF" />
              <Text className="text-xs font-dmsans-medium text-white/90">
                {currentEvent.location}
              </Text>
            </View>
            <Text className="font-raleway text-2xl font-normal text-white tracking-wide leading-tight mb-1.5">
              {currentEvent.title}
            </Text>
            <View className="flex-row items-center gap-2">
              <Ionicons name="calendar-outline" size={14} color="#FFFFFF" />
              <Text className="text-xs font-dmsans text-white/85">
                {currentEvent.scheduleText}
              </Text>
            </View>
          </View>
        </View>

        {/* Makna Sakral & Filosofi Budaya (DESIGN.md: card glassmorphic) */}
        <View className="bg-white/85 rounded-3xl border border-white/90 shadow-sm overflow-hidden mb-5 p-5">
          <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide mb-3 pb-2.5 border-b border-border/50">
            Makna Budaya & Nilai Leluhur
          </Text>

          <Text className="font-dmsans text-xs text-on-surface-variant leading-relaxed">
            {currentEvent.philosophy}
          </Text>
        </View>

        {/* Etiket & Kesantunan Pengunjung (DESIGN.md: card-tonal) */}
        <View className="bg-surface-tonal border border-border/70 rounded-3xl p-5 shadow-sm mb-5">
          <View className="flex-row items-center gap-2.5 mb-3">
            <Ionicons name="shield-checkmark" size={18} color="#D97706" />
            <Text className="text-[11px] font-dmsans-bold text-amber-950 uppercase tracking-wider">
              ETIKET PENGUNJUNG YANG WAJIB DIPATUHI
            </Text>
          </View>

          <View className="gap-2.5">
            {currentEvent.etiquettes.map((etiquette, idx) => (
              <View key={idx} className="flex-row items-start gap-2.5">
                <Text className="text-xs font-dmsans-bold text-amber-800">•</Text>
                <Text className="text-xs font-dmsans text-on-surface-strong flex-1 leading-relaxed">
                  {etiquette}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Urutan Program Acara (Timeline Itinerary) */}
        <View className="bg-white/85 rounded-3xl border border-white/90 p-5 shadow-sm mb-5">
          <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant mb-1">
            RUNDOWN KEGIATAN
          </Text>
          <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide mb-4">
            Susunan Prosesi Adat
          </Text>

          <View className="gap-4">
            {currentEvent.itinerary.map((item, idx) => {
              const isLast = idx === currentEvent.itinerary.length - 1;
              return (
                <View key={idx} className="flex-row items-start gap-3.5">
                  <View className="w-16 pt-0.5">
                    <Text className="text-xs font-dmsans-bold text-primary">{item.dayLabel}</Text>
                    <Text className="text-[10px] font-dmsans text-on-surface-variant">{item.time}</Text>
                  </View>
                  <View className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5" />
                  <View className={`flex-1 ${!isLast ? 'pb-3 border-b border-border/50' : ''}`}>
                    <Text className="font-raleway text-sm font-medium text-on-surface tracking-wide leading-snug">
                      {item.title}
                    </Text>
                    <Text className="text-xs font-dmsans text-on-surface-variant mt-1 leading-relaxed">
                      {item.description}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Galeri Dokumentasi Foto Asli */}
        <View className="mb-5">
          <View className="flex-row justify-between items-baseline mb-3 px-1">
            <View>
              <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant mb-0.5">
                DOKUMENTASI
              </Text>
              <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
                Galeri Lapangan ({currentEvent.gallery.length} Foto)
              </Text>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row -mx-1 px-1">
            {currentEvent.gallery.map((photo, idx) => (
              <View
                key={idx}
                className="w-52 h-36 rounded-3xl overflow-hidden mr-3 bg-surface-tonal border border-white/80 shadow-sm"
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

        {/* Pemandu Budaya Terkait (DESIGN.md: card glassmorphic) */}
        <View className="bg-white/85 rounded-3xl border border-white/90 p-5 shadow-sm mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3.5">
              <View className="w-12 h-12 rounded-2xl bg-blue-50 border border-primary/20 items-center justify-center">
                <Ionicons name="people-outline" size={22} color="#1D4ED8" />
              </View>
              <View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="star" size={12} color="#D97706" />
                  <Text className="text-xs font-dmsans-bold text-amber-700">{currentEvent.rating}</Text>
                  <Text className="text-[10px] font-dmsans text-on-surface-variant">({currentEvent.reviewCount})</Text>
                </View>
                <Text className="font-raleway text-base font-medium text-on-surface leading-tight mt-0.5">
                  {currentEvent.communityName}
                </Text>
                <Text className="text-xs font-dmsans text-on-surface-variant mt-0.5">
                  {currentEvent.communitySubtitle}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Action Bar (DESIGN.md: sticky footer bar) */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/95 px-5 pt-3 pb-6 border-t border-border/50 shadow-lg z-30">
        <View className="flex-row gap-3">
          <Pressable
            onPress={handleAddToCalendar}
            className="flex-1 h-14 rounded-full border border-border bg-white items-center justify-center flex-row gap-2 shadow-xs"
          >
            <Ionicons name="calendar-outline" size={18} color="#23201E" />
            <Text className="text-sm font-dmsans-medium text-on-surface">Ingatkan di HP</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              router.push({
                pathname: '/booking/new',
                params: {
                  service_type: 'ticket',
                  event_id: currentEvent.id,
                  event_title: currentEvent.title,
                  event_location: currentEvent.location,
                  event_price: currentEvent.price,
                },
              });
            }}
            className="flex-1 h-14 rounded-full bg-primary items-center justify-center flex-row gap-2 shadow-md"
          >
            <Ionicons name="ticket-outline" size={18} color="#FFFFFF" />
            <Text className="text-sm font-dmsans-bold text-white">
              {currentEvent.price === 'Gratis' ? 'Daftar Tiket Gratis' : `Pesan • ${currentEvent.price}`}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
