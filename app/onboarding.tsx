import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

// Foto pemandangan ikonik Danau Toba & bukit hijau Samosir
const LAKE_TOBA_HERO_IMAGE =
  'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-card" edges={['top', 'bottom']}>
      {/* Brand Header */}
      <View className="pt-2 pb-1 px-6 items-center justify-center">
        <View className="flex-row items-center gap-2">
          {/* Logo Glyph KawanLokal bertema Ulos & Rumah Bolon */}
          <View className="w-8 h-8 rounded-xl bg-ulos-red items-center justify-center shadow-sm">
            <Ionicons name="sparkles" size={18} color="#FFFFFF" />
          </View>
          <Text className="text-2xl font-bold text-on-surface tracking-tight">
            Kawan<Text className="text-ulos-red">Lokal</Text>
          </Text>
        </View>
        <Text className="text-xs text-secondary mt-0.5 tracking-wide font-medium">
          Warisan Budaya & Wisata Danau Toba
        </Text>
      </View>

      {/* Scenic Hero Visual Danau Toba */}
      <View className="flex-1 px-4 py-2 justify-center items-center">
        <View className="w-full h-full max-h-[390px] rounded-3xl overflow-hidden bg-stone-100 shadow-sm relative">
          <Image
            source={{ uri: LAKE_TOBA_HERO_IMAGE }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Subtle gradient overlay at bottom for blending */}
          <View className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/80 via-white/20 to-transparent pointer-events-none" />
        </View>
      </View>

      {/* Bottom Action Card / Onboarding CTA */}
      <View className="w-full px-6 pt-3 pb-4 bg-surface-card">
        {/* Copy Headings sesuai PRD */}
        <View className="mb-5">
          <Text className="text-3xl font-bold text-on-surface tracking-tight leading-tight">
            Jelajahi{'\n'}Keagungan Toba
          </Text>
          <Text className="text-sm text-secondary mt-1.5 font-normal leading-relaxed">
            Jadwal upacara adat terverifikasi, pemandu lokal, dan pengalaman budaya otentik.
          </Text>
        </View>

        {/* Primary Action CTA Button */}
        <Pressable
          onPress={handleGetStarted}
          className="w-full h-12 bg-ulos-red active:bg-ulos-redDark rounded-full flex-row items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
        >
          <Text className="text-white font-semibold text-base">Mulai Eksplorasi</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </Pressable>

        {/* Carousel Pagination Dots */}
        <View className="flex-row items-center justify-center gap-2 mt-5">
          {/* Active Dot */}
          <View className="w-6 h-2 rounded-full bg-ulos-red" />
          {/* Inactive Dots */}
          <View className="w-2 h-2 rounded-full bg-input-border" />
          <View className="w-2 h-2 rounded-full bg-input-border" />
        </View>

        {/* Home Indicator bar */}
        <View className="w-32 h-1 bg-stone-300 rounded-full mx-auto mt-5" />
      </View>
    </SafeAreaView>
  );
}
