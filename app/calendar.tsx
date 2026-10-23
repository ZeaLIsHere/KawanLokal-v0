import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { TOBA_DISTRICTS } from '@/constants/theme';

interface CalendarEvent {
  id: string;
  day: number;
  month: number; // 10 = Nov
  title: string;
  category: string;
  categoryBadge: 'ulos' | 'success' | 'amber' | 'slate';
  district: string;
  timeWIB: string;
  summary: string;
  verified: boolean;
}

const SEED_EVENTS: CalendarEvent[] = [
  {
    id: 'ev-1',
    day: 2,
    month: 11,
    title: 'Pesta Danau Toba & Pagelaran Gondang',
    category: 'Festival',
    categoryBadge: 'ulos',
    district: 'Simalungun',
    timeWIB: '10.00 WIB',
    summary: 'Parade perahu kayu solu bolon, tarian Tortor kolosal, dan pameran tenun pusaka.',
    verified: true,
  },
  {
    id: 'ev-2',
    day: 15,
    month: 11,
    title: 'Upacara Mangongkal Holi',
    category: 'Adat Terbuka',
    categoryBadge: 'ulos',
    district: 'Samosir',
    timeWIB: '09.00 WIB',
    summary: 'Pemindahan tulang belulang leluhur ke tugu keluarga marga. Wajib busana sopan.',
    verified: true,
  },
  {
    id: 'ev-3',
    day: 20,
    month: 11,
    title: 'Festival Gondang Naposo',
    category: 'Seni',
    categoryBadge: 'success',
    district: 'Toba',
    timeWIB: '14.00 WIB',
    summary: 'Ajang tari Tortor kreasi muda-mudi Batak dalam mencari pasangan dan silaturahmi.',
    verified: true,
  },
  {
    id: 'ev-4',
    day: 25,
    month: 11,
    title: 'Ritual Sipaha Lima Parmalim',
    category: 'Keagamaan',
    categoryBadge: 'amber',
    district: 'Toba',
    timeWIB: '08.30 WIB',
    summary: 'Ucapan syukur tahunan penganut Ugamo Malim atas berkah panen dan kehidupan.',
    verified: true,
  },
  {
    id: 'ev-5',
    day: 28,
    month: 11,
    title: 'Pesta Rondang Bittang',
    category: 'Festival',
    categoryBadge: 'ulos',
    district: 'Simalungun',
    timeWIB: '16.00 WIB',
    summary: 'Perayaan panen raya suku Simalungun di bawah sinar bulan purnama.',
    verified: true,
  },
];

const DAYS_OF_WEEK = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
// Dummy kalender bulan November 2026 (30 hari, mulai hari Minggu)
const CALENDAR_DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

export default function CalendarScreen() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Semua');

  const handleSelectDay = (day: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setSelectedDay(selectedDay === day ? null : day);
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
      const matchDay = selectedDay === null || ev.day === selectedDay;
      return matchDistrict && matchDay;
    });
  }, [selectedDistrict, selectedDay]);

  const daysWithEvents = useMemo(() => {
    return new Set(SEED_EVENTS.map((e) => e.day));
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top']}>
      {/* Top Header */}
      <View className="px-4 py-2.5 bg-surface-card border-b border-card-border flex-row items-center justify-between z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center active:bg-stone-100 active:opacity-80"
        >
          <Ionicons name="arrow-back" size={24} color="#131b2e" />
        </Pressable>

        <View className="items-center">
          <Text className="text-base font-bold text-on-surface">
            Kalender Budaya Toba
          </Text>
          <Text className="text-[11px] text-secondary">November 2026 (WIB)</Text>
        </View>

        {/* View Mode Switcher (Bulan / Daftar) */}
        <View className="flex-row bg-stone-100 p-0.5 rounded-xl">
          <Pressable
            onPress={() => handleToggleView('month')}
            className={`p-1.5 rounded-lg ${
              viewMode === 'month' ? 'bg-white shadow-xs' : 'bg-transparent'
            }`}
          >
            <Ionicons
              name="calendar"
              size={18}
              color={viewMode === 'month' ? '#991B1B' : '#78716C'}
            />
          </Pressable>
          <Pressable
            onPress={() => handleToggleView('list')}
            className={`p-1.5 rounded-lg ${
              viewMode === 'list' ? 'bg-white shadow-xs' : 'bg-transparent'
            }`}
          >
            <Ionicons
              name="list"
              size={18}
              color={viewMode === 'list' ? '#991B1B' : '#78716C'}
            />
          </Pressable>
        </View>
      </View>

      {/* Filter Kabupaten Horizontal */}
      <View className="bg-surface-card border-b border-card-border/60 py-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 flex-row">
          <Pressable
            onPress={() => handleSelectDistrict('Semua')}
            className={`mr-2 px-3.5 py-1.5 rounded-full border ${
              selectedDistrict === 'Semua'
                ? 'bg-ulos-red border-ulos-red'
                : 'bg-surface-canvas border-card-border'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                selectedDistrict === 'Semua' ? 'text-white' : 'text-secondary'
              }`}
            >
              Semua Wilayah
            </Text>
          </Pressable>

          {TOBA_DISTRICTS.map((district) => (
            <Pressable
              key={district}
              onPress={() => handleSelectDistrict(district)}
              className={`mr-2 px-3.5 py-1.5 rounded-full border ${
                selectedDistrict === district
                  ? 'bg-ulos-red border-ulos-red'
                  : 'bg-surface-canvas border-card-border'
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  selectedDistrict === district ? 'text-white' : 'text-secondary'
                }`}
              >
                {district}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-3"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Tampilan Grid Kalender Bulan (PRD F2) */}
        {viewMode === 'month' && (
          <View className="bg-surface-card rounded-2xl border border-card-border p-3.5 shadow-sm mb-4">
            <View className="flex-row justify-between items-center mb-3 px-1">
              <Text className="text-sm font-bold text-on-surface">
                November 2026
              </Text>
              {selectedDay !== null && (
                <Pressable
                  onPress={() => setSelectedDay(null)}
                  className="px-2 py-0.5 rounded-md bg-stone-100"
                >
                  <Text className="text-[10px] font-bold text-secondary">
                    Reset Hari ({selectedDay} Nov)
                  </Text>
                </Pressable>
              )}
            </View>

            {/* Header Nama Hari */}
            <View className="flex-row justify-between mb-2">
              {DAYS_OF_WEEK.map((d) => (
                <View key={d} className="w-[13%] items-center">
                  <Text className="text-[11px] font-bold text-secondary">{d}</Text>
                </View>
              ))}
            </View>

            {/* Grid Tanggal */}
            <View className="flex-row flex-wrap justify-between gap-y-1.5">
              {CALENDAR_DAYS.map((day) => {
                const isSelected = selectedDay === day;
                const hasEvent = daysWithEvents.has(day);

                return (
                  <Pressable
                    key={day}
                    onPress={() => handleSelectDay(day)}
                    className={`w-[13%] aspect-square rounded-xl items-center justify-center relative active:opacity-80 ${
                      isSelected
                        ? 'bg-ulos-red shadow-xs'
                        : hasEvent
                        ? 'bg-red-50 border border-red-200'
                        : 'bg-transparent'
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        isSelected
                          ? 'text-white'
                          : hasEvent
                          ? 'text-ulos-red'
                          : 'text-on-surface'
                      }`}
                    >
                      {day}
                    </Text>

                    {/* Dot Penanda Acara */}
                    {hasEvent && (
                      <View
                        className={`w-1.5 h-1.5 rounded-full absolute bottom-1 ${
                          isSelected ? 'bg-white' : 'bg-ulos-red'
                        }`}
                      />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {/* Section Header Acara Terverifikasi */}
        <View className="flex-row justify-between items-center mb-2.5">
          <Text className="text-sm font-bold text-on-surface">
            {selectedDay !== null
              ? `Acara Tanggal ${selectedDay} Nov 2026`
              : 'Daftar Acara Terverifikasi'}
          </Text>
          <Text className="text-xs font-semibold text-secondary">
            {filteredEvents.length} Acara
          </Text>
        </View>

        {/* List Kartu Acara */}
        <View className="gap-3">
          {filteredEvents.map((ev) => (
            <Pressable
              key={ev.id}
              onPress={() => router.push('/event/detail')}
              className="bg-surface-card rounded-2xl p-4 border border-card-border shadow-sm active:opacity-90"
            >
              <View className="flex-row items-center justify-between pb-2 border-b border-card-border/60">
                <View className="px-2.5 py-0.5 rounded-full bg-red-50">
                  <Text className="text-[10px] font-bold text-ulos-red">
                    {ev.category}
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="location-outline" size={12} color="#78716C" />
                  <Text className="text-xs font-semibold text-secondary">
                    {ev.district}
                  </Text>
                </View>
              </View>

              <Text className="text-base font-bold text-on-surface mt-2 leading-snug">
                {ev.title}
              </Text>
              <Text className="text-xs text-secondary mt-1 leading-relaxed">
                {ev.summary}
              </Text>

              <View className="mt-3 pt-2.5 border-t border-card-border flex-row items-center justify-between">
                <View className="flex-row items-center gap-1.5">
                  <Ionicons name="time-outline" size={13} color="#D97706" />
                  <Text className="text-xs font-semibold text-stone-700">
                    {ev.day} Nov • {ev.timeWIB}
                  </Text>
                </View>

                <View className="flex-row items-center gap-1">
                  <Ionicons name="checkmark-circle" size={14} color="#15803D" />
                  <Text className="text-[11px] font-bold text-emerald-700">
                    Terverifikasi
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}

          {filteredEvents.length === 0 && (
            <View className="items-center justify-center py-10 bg-surface-card rounded-2xl border border-card-border p-6">
              <Ionicons name="calendar-outline" size={36} color="#CBD5E1" />
              <Text className="text-sm font-semibold text-on-surface mt-2">
                Tidak ada acara pada tanggal / wilayah ini
              </Text>
              <Pressable
                onPress={() => {
                  setSelectedDay(null);
                  setSelectedDistrict('Semua');
                }}
                className="mt-3 px-4 py-1.5 rounded-xl bg-stone-100 active:bg-stone-200"
              >
                <Text className="text-xs font-bold text-secondary">
                  Reset Semua Filter
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
