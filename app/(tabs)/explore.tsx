import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';

export default function ExploreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-stone-50" edges={['top']}>
      <View className="px-5 py-3 bg-white border-b border-stone-200">
        <Text className="text-xl font-bold text-stone-900">Jelajah Layanan</Text>
        <Text className="text-xs text-stone-500">Pemandu lokal, homestay, tiket acara, & workshop</Text>
      </View>

      <ScrollView className="flex-1 p-5">
        <Card className="mb-4">
          <Badge label="Workshop Ulos" variant="ulos" />
          <Text className="text-base font-bold text-stone-900 mt-2">
            Belajar Tenun Ulos Tradisional
          </Text>
          <Text className="text-xs text-stone-600 mt-1">
            Pengalaman langsung menenun bersama pengrajin lokal di Lumban Suhi-Suhi.
          </Text>
          <Text className="text-sm font-bold text-ulos-red mt-3">
            Rp 150.000 / orang
          </Text>
        </Card>

        <Card className="mb-4">
          <Badge label="Pemandu Lokal" variant="success" />
          <Text className="text-base font-bold text-stone-900 mt-2">
            Tur Sejarah & Budaya Desa Tomok
          </Text>
          <Text className="text-xs text-stone-600 mt-1">
            Jelajahi Makam Raja Sidabutar dan Sigale-gale bersama pemandu berlisensi.
          </Text>
          <Text className="text-sm font-bold text-ulos-red mt-3">
            Rp 250.000 / grup
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
