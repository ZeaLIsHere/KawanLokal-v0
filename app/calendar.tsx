import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { TOBA_DISTRICTS } from '@/constants/theme';

export default function CalendarScreen() {
  const router = useRouter();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Semua');

  return (
    <SafeAreaView className="flex-1 bg-stone-50" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-3 bg-white border-b border-stone-200">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-stone-100 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={20} color="#1C1917" />
        </Pressable>
        <Text className="text-base font-bold text-stone-900">
          Kalender Budaya Toba
        </Text>
        <View className="w-10" />
      </View>

      {/* Filter Kabupaten */}
      <View className="bg-white border-b border-stone-200 py-3">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5 flex-row">
          <Pressable
            onPress={() => setSelectedDistrict('Semua')}
            className={`mr-2 px-3.5 py-1.5 rounded-full border ${
              selectedDistrict === 'Semua'
                ? 'bg-ulos-red border-ulos-red'
                : 'bg-stone-50 border-stone-300'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                selectedDistrict === 'Semua' ? 'text-white' : 'text-stone-700'
              }`}
            >
              Semua Wilayah
            </Text>
          </Pressable>

          {TOBA_DISTRICTS.map((district) => (
            <Pressable
              key={district}
              onPress={() => setSelectedDistrict(district)}
              className={`mr-2 px-3.5 py-1.5 rounded-full border ${
                selectedDistrict === district
                  ? 'bg-ulos-red border-ulos-red'
                  : 'bg-stone-50 border-stone-300'
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  selectedDistrict === district ? 'text-white' : 'text-stone-700'
                }`}
              >
                {district}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Daftar Acara Terverifikasi */}
      <ScrollView className="flex-1 p-5">
        <Card className="mb-4">
          <View className="flex-row items-center justify-between">
            <Badge label="Adat Terbuka" variant="ulos" />
            <Text className="text-xs font-semibold text-stone-500">Samosir</Text>
          </View>
          <Text className="text-base font-bold text-stone-900 mt-2">
            Upacara Mangongkal Holi
          </Text>
          <Text className="text-xs text-stone-600 mt-1">
            Tradisi sakral pemindahan tulang leluhur ke tugu keluarga. Wisatawan diperbolehkan menyaksikan dengan busana adat sopan.
          </Text>
          <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-stone-100">
            <Text className="text-xs text-stone-500">Zona Waktu: 09:00 WIB</Text>
            <Text className="text-xs font-bold text-emerald-700">Terverifikasi Kurator</Text>
          </View>
        </Card>

        <Card className="mb-4">
          <View className="flex-row items-center justify-between">
            <Badge label="Festival Seni" variant="success" />
            <Text className="text-xs font-semibold text-stone-500">Toba</Text>
          </View>
          <Text className="text-base font-bold text-stone-900 mt-2">
            Festival Gondang Naposo
          </Text>
          <Text className="text-xs text-stone-600 mt-1">
            Ajang tari tradisional Tortor untuk pemuda-pemudi Batak dalam mencari pasangan hidup dan silaturahmi budaya.
          </Text>
          <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-stone-100">
            <Text className="text-xs text-stone-500">Zona Waktu: 14:00 WIB</Text>
            <Text className="text-xs font-bold text-emerald-700">Terverifikasi Kurator</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
