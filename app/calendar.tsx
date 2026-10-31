import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { TOBA_DISTRICTS } from '@/constants/theme';
import { AppIcon } from '@/components/AppIcon';
import { PHOTO_COVERS } from '@/constants/localPhotos';

interface CalendarEvent {
  id: string;
  day: number;
  month: number; // 11 = Nov
  title: string;
  category: string;
  district: string;
  timeWIB: string;
  summary: string;
  verified: boolean;
  coverImage: ImageSourcePropType;
  price?: string;
}

const SEED_EVENTS: CalendarEvent[] = [
  {
    id: 'ev-1',
    day: 2,
    month: 11,
    title: 'Pesta Danau Toba & Pagelaran Gondang',
    category: 'Festival',
    district: 'Simalungun',
    timeWIB: '10.00',
    summary: 'Parade perahu kayu solu bolon, tarian Tortor kolosal, dan pameran tenun pusaka.',
    verified: true,
    coverImage: PHOTO_COVERS.parapat,
    price: 'Rp 50.000',
  },
  {
    id: 'ev-2',
    day: 15,
    month: 11,
    title: 'Upacara Mangongkal Holi',
    category: 'Adat Sakral',
    district: 'Samosir',
    timeWIB: '09.00',
    summary: 'Pemindahan tulang belulang leluhur ke tugu keluarga marga. Wajib berbusana sopan.',
    verified: true,
    coverImage: PHOTO_COVERS.desaTomok,
    price: 'Gratis',
  },
  {
    id: 'ev-3',
    day: 20,
    month: 11,
    title: 'Festival Gondang Naposo',
    category: 'Seni Tradisi',
    district: 'Toba',
    timeWIB: '14.00',
    summary: 'Ajang tari Tortor kreasi muda-mudi Batak dalam mencari pasangan dan silaturahmi.',
    verified: true,
    coverImage: PHOTO_COVERS.gondang,
    price: 'Rp 25.000',
  },
  {
    id: 'ev-4',
    day: 25,
    month: 11,
    title: 'Ritual Sipaha Lima Parmalim',
    category: 'Keagamaan',
    district: 'Toba',
    timeWIB: '08.30',
    summary: 'Ucapan syukur tahunan penganut Ugamo Malim atas limpahan berkah panen dan kehidupan.',
    verified: true,
    coverImage: PHOTO_COVERS.rumahBolon,
    price: 'Gratis',
  },
  {
    id: 'ev-5',
    day: 28,
    month: 11,
    title: 'Pesta Rondang Bittang',
    category: 'Festival',
    district: 'Simalungun',
    timeWIB: '16.00',
    summary: 'Perayaan panen raya suku Simalungun di bawah sinar bulan purnama yang megah.',
    verified: true,
    coverImage: PHOTO_COVERS.torTor,
    price: 'Gratis',
  },
];

const DAYS_OF_WEEK = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
// Kalender dummy November 2026 (30 hari, mulai Minggu)
const CALENDAR_DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

export default function CalendarScreen() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Semua');
  const [selectedEventModal, setSelectedEventModal] = useState<CalendarEvent | null>(null);

  const handleSelectDay = (day: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    // Jika tanggal yang ditekan memiliki acara, tampilkan pop-up card di tengah layar
    const event = SEED_EVENTS.find((e) => e.day === day);
    if (event) {
      setSelectedEventModal(event);
    }
  };

  const handleSelectDistrict = (dist: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setSelectedDistrict(dist);
  };

  const handleToggleView = (mode: 'month' | 'list') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setViewMode(mode);
  };

  const filteredEvents = useMemo(() => {
    return SEED_EVENTS.filter((ev) => {
      const matchDistrict = selectedDistrict === 'Semua' || ev.district === selectedDistrict;
      return matchDistrict;
    });
  }, [selectedDistrict]);

  const daysWithEvents = useMemo(() => {
    return new Set(SEED_EVENTS.map((e) => e.day));
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      {/* Top App Bar Glassmorphic (DESIGN.md: top-app-bar + button-icon-glass) */}
      <View className="flex-row items-center justify-between px-5 py-3 bg-white/70 border-b border-border/50">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-11 h-11 items-center justify-center rounded-full bg-white/80 border border-white/90 shadow-sm"
        >
          <AppIcon name="arrow-left" size={20} color="#23201E" />
        </Pressable>

        <View className="items-center">
          <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-primary">
            KALENDER BUDAYA
          </Text>
          <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
            Danau Toba
          </Text>
        </View>

        {/* View Mode Switcher Pill */}
        <View className="flex-row bg-surface-tonal p-1 rounded-full border border-border/40">
          <Pressable
            accessibilityLabel="Tampilan Bulan"
            onPress={() => handleToggleView('month')}
            className={`px-3 py-1.5 rounded-full flex-row items-center gap-1.5 ${
              viewMode === 'month' ? 'bg-white shadow-xs' : 'bg-transparent'
            }`}
          >
            <Ionicons
              name="calendar"
              size={15}
              color={viewMode === 'month' ? '#1D4ED8' : '#8A827A'}
            />
          </Pressable>
          <Pressable
            accessibilityLabel="Tampilan Daftar"
            onPress={() => handleToggleView('list')}
            className={`px-3 py-1.5 rounded-full flex-row items-center gap-1.5 ${
              viewMode === 'list' ? 'bg-white shadow-xs' : 'bg-transparent'
            }`}
          >
            <Ionicons
              name="list"
              size={15}
              color={viewMode === 'list' ? '#1D4ED8' : '#8A827A'}
            />
          </Pressable>
        </View>
      </View>

      {/* District Filter Chips (DESIGN.md: chip & chip-active) */}
      <View className="py-3 bg-surface border-b border-border/30">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5 flex-row"
        >
          <Pressable
            onPress={() => handleSelectDistrict('Semua')}
            className={`mr-2 h-8 px-4 rounded-full items-center justify-center ${
              selectedDistrict === 'Semua'
                ? 'bg-primary shadow-xs'
                : 'bg-white/80 border border-border/60'
            }`}
          >
            <Text
              className={`text-[11px] font-dmsans-bold tracking-wider uppercase ${
                selectedDistrict === 'Semua' ? 'text-white' : 'text-on-surface-strong'
              }`}
            >
              Semua Wilayah
            </Text>
          </Pressable>

          {TOBA_DISTRICTS.map((district) => {
            const isSelected = selectedDistrict === district;
            return (
              <Pressable
                key={district}
                onPress={() => handleSelectDistrict(district)}
                className={`mr-2 h-8 px-4 rounded-full items-center justify-center ${
                  isSelected
                    ? 'bg-primary shadow-xs'
                    : 'bg-white/80 border border-border/60'
                }`}
              >
                <Text
                  className={`text-[11px] font-dmsans-bold tracking-wider uppercase ${
                    isSelected ? 'text-white' : 'text-on-surface-strong'
                  }`}
                >
                  {district}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Tampilan Grid Kalender Bulan (DESIGN.md: card glassmorphic) */}
        {viewMode === 'month' && (
          <View className="bg-white/85 rounded-3xl border border-white/90 p-5 shadow-sm mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="font-raleway text-xl font-medium text-on-surface tracking-wide">
                  November 2026
                </Text>
              </View>
            </View>

            {/* Header Nama Hari (7 Kolom Presisi) */}
            <View className="flex-row mb-2 border-b border-border/40 pb-2">
              {DAYS_OF_WEEK.map((d) => (
                <View key={d} className="w-[14.28%] items-center justify-center">
                  <Text className="text-[10px] font-dmsans-bold tracking-wider text-on-surface-variant uppercase">
                    {d}
                  </Text>
                </View>
              ))}
            </View>

            {/* Grid Tanggal (7 Kolom dengan Lingkaran Presisi 36x36) */}
            <View className="flex-row flex-wrap">
              {CALENDAR_DAYS.map((day) => {
                const hasEvent = daysWithEvents.has(day);

                return (
                  <View key={day} className="w-[14.28%] items-center justify-center py-1">
                    <Pressable
                      onPress={() => handleSelectDay(day)}
                      className={`w-9 h-9 rounded-full items-center justify-center ${
                        hasEvent
                          ? 'bg-blue-50/80 border border-primary'
                          : 'bg-transparent'
                      }`}
                    >
                      <Text
                        style={{ includeFontPadding: false }}
                        className={`text-xs text-center ${
                          hasEvent
                            ? 'font-dmsans-bold text-primary'
                            : 'font-dmsans text-on-surface'
                        }`}
                      >
                        {day}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Section Header Acara Terverifikasi */}
        <View className="flex-row justify-between items-baseline mb-4 px-1">
          <View>
            <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant mb-0.5">
              JADWAL RESMI
            </Text>
            <Text className="font-raleway text-xl font-medium text-on-surface tracking-wide">
              Daftar Acara Terverifikasi
            </Text>
          </View>
          <View className="px-2.5 py-1 rounded-full bg-surface-tonal">
            <Text className="text-[11px] font-dmsans-bold text-on-surface-strong">
              {filteredEvents.length} Acara
            </Text>
          </View>
        </View>

        {/* List Kartu Acara dengan Banner Foto & Gradasi */}
        <View className="gap-4">
          {filteredEvents.map((ev) => (
            <Pressable
              key={ev.id}
              onPress={() => router.push({ pathname: '/event/detail', params: { id: ev.id } })}
              className="bg-white/85 rounded-3xl border border-white/90 overflow-hidden shadow-sm"
            >
              {/* Foto Cover dengan Gradasi Lembut ke Body Card */}
              <View className="relative w-full h-36 bg-surface-tonal overflow-hidden">
                <Image
                  source={ev.coverImage}
                  className="w-full h-full"
                  resizeMode="cover"
                />

                {/* Gradasi Overlay ke Putih Card */}
                <Svg
                  style={StyleSheet.absoluteFill}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  pointerEvents="none"
                >
                  <Defs>
                    <LinearGradient
                      id={`evGrad-${ev.id}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="100"
                      gradientUnits="userSpaceOnUse"
                    >
                      <Stop offset="0%" stopColor="#000000" stopOpacity="0.15" />
                      <Stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
                      <Stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.5" />
                      <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                    </LinearGradient>
                  </Defs>
                  <Rect x="0" y="0" width="100" height="100" fill={`url(#evGrad-${ev.id})`} />
                </Svg>
              </View>

              {/* Konten Detail Acara */}
              <View className="p-4 pt-1">
                {/* Meta Bar: Tanggal, Waktu & Wilayah */}
                <View className="flex-row items-center gap-3 mb-2">
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="calendar-outline" size={13} color="#1D4ED8" />
                    <Text className="text-[11px] font-dmsans-bold text-primary">
                      {ev.day} Nov 2026
                    </Text>
                  </View>
                  <Text className="text-border">•</Text>
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="time-outline" size={13} color="#8A827A" />
                    <Text className="text-[11px] font-dmsans text-on-surface-variant">
                      {ev.timeWIB}
                    </Text>
                  </View>
                  <Text className="text-border">•</Text>
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="location-outline" size={13} color="#8A827A" />
                    <Text className="text-[11px] font-dmsans text-on-surface-variant">
                      {ev.district}
                    </Text>
                  </View>
                </View>

                {/* Judul Acara (Raleway) */}
                <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide leading-snug">
                  {ev.title}
                </Text>

                {/* Deskripsi Singkat (DM Sans) */}
                <Text className="font-dmsans text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                  {ev.summary}
                </Text>

                {/* Footer Bar: Harga & Tombol Lanjut */}
                <View className="mt-3.5 pt-3 border-t border-border/50 flex-row items-center justify-between">
                  <View>
                    <Text className="text-[10px] uppercase tracking-wider font-dmsans-medium text-on-surface-variant">
                      HTM / Tiket
                    </Text>
                    <Text className="text-xs font-dmsans-bold text-primary mt-0.5">
                      {ev.price || 'Gratis'}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => router.push({ pathname: '/event/detail', params: { id: ev.id } })}
                    className="h-9 px-4 bg-primary rounded-full flex-row items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Text className="text-white font-dmsans-medium text-xs tracking-wide">
                      Lanjut
                    </Text>
                    <Ionicons name="arrow-forward" size={13} color="#FFFFFF" />
                  </Pressable>
                </View>
              </View>
            </Pressable>
          ))}

          {/* Empty State Card */}
          {filteredEvents.length === 0 && (
            <View className="items-center justify-center py-12 px-6 bg-white/70 rounded-3xl border border-white/80 text-center shadow-sm">
              <View className="w-14 h-14 rounded-full bg-surface-tonal items-center justify-center mb-3">
                <Ionicons name="calendar-outline" size={26} color="#8A827A" />
              </View>
              <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
                Tidak Ada Acara Ditemukan
              </Text>
              <Text className="font-dmsans text-xs text-on-surface-variant text-center mt-1 max-w-[260px] leading-relaxed">
                Belum ada jadwal acara adat atau festival pada filter tanggal dan wilayah yang Anda pilih.
              </Text>
              <Pressable
                onPress={() => {
                  setSelectedDistrict('Semua');
                }}
                className="mt-4 h-10 px-5 rounded-full bg-white border border-border items-center justify-center shadow-xs"
              >
                <Text className="text-[11px] uppercase tracking-[0.15em] font-dmsans-bold text-primary">
                  RESET FILTER
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Overlay Modal Card Keterangan Acara saat Tanggal Ditekan (Tepat di Tengah Layar) */}
      {selectedEventModal && (
        <View
          style={StyleSheet.absoluteFill}
          className="z-50 bg-black/50 justify-center items-center px-6"
        >
          {/* Backdrop Tap to Close */}
          <Pressable
            accessibilityLabel="Tutup"
            style={StyleSheet.absoluteFill}
            onPress={() => setSelectedEventModal(null)}
          />

          {/* Card Keterangan Acara Tengah Layar */}
          <View className="w-full max-w-sm bg-white rounded-[32px] overflow-hidden border border-white/90 shadow-2xl z-10">
            {/* Foto Banner Acara dengan Gradasi */}
            <View className="relative w-full h-40 bg-surface-tonal overflow-hidden">
              <Image
                source={selectedEventModal.coverImage}
                className="w-full h-full"
                resizeMode="cover"
              />
              <Svg
                style={StyleSheet.absoluteFill}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                pointerEvents="none"
              >
                <Defs>
                  <LinearGradient
                    id="modalEventGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="100"
                    gradientUnits="userSpaceOnUse"
                  >
                    <Stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
                    <Stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
                    <Stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.6" />
                    <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                  </LinearGradient>
                </Defs>
                <Rect x="0" y="0" width="100" height="100" fill="url(#modalEventGrad)" />
              </Svg>

              {/* Tombol Tutup di atas Foto */}
              <View className="absolute top-3.5 right-3.5">
                <Pressable
                  accessibilityLabel="Tutup"
                  onPress={() => setSelectedEventModal(null)}
                  className="w-9 h-9 rounded-full bg-white/90 border border-white items-center justify-center shadow-xs"
                >
                  <Ionicons name="close" size={18} color="#23201E" />
                </Pressable>
              </View>
            </View>

            {/* Konten Keterangan Acara & Tombol Lanjut */}
            <View className="p-5 pt-3">
              {/* Meta Bar */}
              <View className="flex-row items-center gap-2 mb-2">
                <View className="flex-row items-center gap-1">
                  <Ionicons name="calendar-outline" size={13} color="#1D4ED8" />
                  <Text className="text-[11px] font-dmsans-bold text-primary">
                    {selectedEventModal.day} Nov 2026
                  </Text>
                </View>
                <Text className="text-border">•</Text>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="time-outline" size={13} color="#8A827A" />
                  <Text className="text-[11px] font-dmsans text-on-surface-variant">
                    {selectedEventModal.timeWIB}
                  </Text>
                </View>
                <Text className="text-border">•</Text>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="location-outline" size={13} color="#8A827A" />
                  <Text className="text-[11px] font-dmsans text-on-surface-variant">
                    {selectedEventModal.district}
                  </Text>
                </View>
              </View>

              <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide leading-snug">
                {selectedEventModal.title}
              </Text>

              <Text className="font-dmsans text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                {selectedEventModal.summary}
              </Text>

              {/* Info HTM & Tombol Lanjut */}
              <View className="mt-4 pt-3 border-t border-border/50 flex-row items-center justify-between">
                <View>
                  <Text className="text-[10px] uppercase tracking-wider font-dmsans-medium text-on-surface-variant">
                    HTM / Tiket
                  </Text>
                  <Text className="text-sm font-dmsans-bold text-primary mt-0.5">
                    {selectedEventModal.price || 'Gratis'}
                  </Text>
                </View>

                {/* Tombol Lanjut (button-primary) */}
                <Pressable
                  onPress={() => {
                    const eventId = selectedEventModal.id;
                    setSelectedEventModal(null);
                    router.push({ pathname: '/event/detail', params: { id: eventId } });
                  }}
                  className="h-10 px-5 bg-primary rounded-full flex-row items-center justify-center gap-1.5 shadow-md"
                >
                  <Text className="text-white font-dmsans-medium text-xs tracking-wide">
                    Lanjut
                  </Text>
                  <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
