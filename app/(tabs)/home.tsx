import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';

const EVENT_CATEGORIES = [
  { id: 'adat', label: 'Adat', icon: 'people-outline' },
  { id: 'keagamaan', label: 'Keagamaan', icon: 'book-outline' },
  { id: 'festival', label: 'Festival', icon: 'sparkles-outline' },
  { id: 'kuliner', label: 'Kuliner', icon: 'restaurant-outline' },
  { id: 'seni', label: 'Seni', icon: 'color-palette-outline' },
] as const;

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-stone-50" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-3 bg-white border-b border-stone-200">
        <Pressable
          onPress={() => router.push('/profile')}
          className="flex-row items-center gap-3"
        >
          <View className="w-10 h-10 rounded-full bg-ulos-red items-center justify-center">
            <Text className="text-white font-bold text-base">KL</Text>
          </View>
          <View>
            <Text className="text-xs text-stone-500">Horas! Selamat Datang</Text>
            <Text className="text-base font-bold text-stone-900">Kawan Lokal</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => router.push('/settings')}
          className="w-10 h-10 rounded-full bg-stone-100 items-center justify-center active:bg-stone-200"
        >
          <Ionicons name="settings-outline" size={20} color="#1C1917" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Hero Card */}
        <View className="p-5">
          <View className="bg-ulos-black rounded-3xl p-6 overflow-hidden relative">
            <View className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-ulos-red opacity-30" />
            <Badge label="Wisata & Budaya Danau Toba" variant="ulos" className="mb-3 bg-red-950/60 text-red-200 border-red-800" />
            <Text className="text-white text-2xl font-extrabold leading-tight">
              Eksplorasi Keindahan & Kearifan Lokal Toba
            </Text>
            <Text className="text-stone-300 text-sm mt-2 leading-relaxed">
              Jadwal upacara adat terverifikasi, layanan pemandu lokal, dan pemesanan pengalaman otentik.
            </Text>

            <View className="flex-row gap-3 mt-5">
              <Button
                title="Buka Kalender"
                variant="primary"
                onPress={() => router.push('/calendar')}
                className="flex-1"
              />
              <Button
                title="Jelajah Layanan"
                variant="outline"
                onPress={() => router.push('/(tabs)/explore')}
                className="flex-1 border-stone-700 bg-stone-900/60"
              />
            </View>
          </View>
        </View>

        {/* Kategori Budaya */}
        <View className="px-5 mb-6">
          <Text className="text-base font-bold text-stone-900 mb-3">
            Kategori Budaya & Kegiatan
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {EVENT_CATEGORIES.map((cat) => (
              <Pressable
                key={cat.id}
                onPress={() => router.push('/calendar')}
                className="mr-3 items-center bg-white border border-stone-200 rounded-2xl p-3 min-w-[76px] active:bg-stone-100"
              >
                <View className="w-10 h-10 rounded-xl bg-red-50 items-center justify-center mb-1.5">
                  <Ionicons name={cat.icon as any} size={20} color="#991B1B" />
                </View>
                <Text className="text-xs font-semibold text-stone-700">{cat.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Acara Budaya Terdekat */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-bold text-stone-900">
              Acara Budaya Terdekat
            </Text>
            <Pressable onPress={() => router.push('/calendar')}>
              <Text className="text-xs font-bold text-ulos-red">Lihat Semua</Text>
            </Pressable>
          </View>

          <Card className="mb-3">
            <View className="flex-row items-start justify-between">
              <Badge label="Adat Terbuka" variant="ulos" />
              <Text className="text-xs text-stone-500">Samosir</Text>
            </View>
            <Text className="text-lg font-bold text-stone-900 mt-2">
              Pesta Danau Toba & Pagelaran Gondang
            </Text>
            <Text className="text-xs text-stone-600 mt-1">
              Perayaan budaya tahunan menampilkan tarian Tortor, pameran Ulos, dan kompetisi solu bolon.
            </Text>
            <View className="flex-row items-center justify-between mt-4 pt-3 border-t border-stone-100">
              <Text className="text-xs font-medium text-stone-500">
                Waktu: 10.00 WIB
              </Text>
              <Button
                title="Lihat Detail"
                variant="outline"
                size="sm"
                onPress={() => router.push('/calendar')}
              />
            </View>
          </Card>
        </View>

        {/* Nilai Budaya Toba */}
        <View className="px-5">
          <Card className="bg-stone-900 border-stone-800">
            <Text className="text-white font-bold text-sm mb-1">
              Etiket & Kesantunan Adat
            </Text>
            <Text className="text-stone-400 text-xs leading-relaxed">
              Semua acara berstatus publik telah diverifikasi bersama tokoh adat. Harap selalu kenakan busana sopan dan patuhi tata krama setempat.
            </Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
