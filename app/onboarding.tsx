import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const HERO_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuChv405asjEnmLobylJhBa8HKcnA6aryBFjMu5ghhW_WwuTcIeTUzBaVnftT0nhx9thXwduGANjkW-U71VzGCB8qwf1ZM3BY4R8KsU8tSBWgx9vCt0m2NDJFuLCo977h0swYhYuPPRXVdzdZBSLUF1PVTD9SkYkoznKRIWmXJjWamRru1VgpzTB9J7Ujxm2Kx8l8h81IbwQZVuIzS-tgpCttX6hr81Ka-FeMpTF25x7zhOrPycdw9Y3ZA';

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
          <View className="w-8 h-8 rounded-xl bg-primary-container items-center justify-center shadow-sm">
            <MaterialIcons name="flight" size={20} color="#FFFFFF" />
          </View>
          <Text className="text-2xl font-bold text-primary tracking-tight">
            Truway
          </Text>
        </View>
        <Text className="text-xs text-secondary mt-0.5 tracking-wide font-medium">
          Travel. Your Way.
        </Text>
      </View>

      {/* Scenic Hero Visual */}
      <View className="flex-1 px-4 py-2 justify-center items-center">
        <View className="w-full h-full max-h-[390px] rounded-3xl overflow-hidden bg-stone-100 shadow-sm relative">
          <Image
            source={{ uri: HERO_IMAGE_URL }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Subtle gradient overlay at bottom */}
          <View className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/70 via-white/20 to-transparent pointer-events-none" />
        </View>
      </View>

      {/* Bottom Action Card / Onboarding CTA */}
      <View className="w-full px-6 pt-3 pb-4 bg-surface-card">
        {/* Copy Headings */}
        <View className="mb-5">
          <Text className="text-3xl font-bold text-on-surface tracking-tight leading-tight">
            Discover{'\n'}the world
          </Text>
          <Text className="text-sm text-secondary mt-1.5 font-normal">
            Your journey begins here.
          </Text>
        </View>

        {/* Primary Action CTA Button */}
        <Pressable
          onPress={handleGetStarted}
          className="w-full h-12 bg-primary-container active:bg-primary-hover rounded-full flex-row items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
        >
          <Text className="text-white font-semibold text-base">Get Started</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </Pressable>

        {/* Carousel Pagination Dots */}
        <View className="flex-row items-center justify-center gap-2 mt-5">
          {/* Active Dot */}
          <View className="w-6 h-2 rounded-full bg-primary-container" />
          {/* Inactive Dots */}
          <View className="w-2 h-2 rounded-full bg-input-border" />
          <View className="w-2 h-2 rounded-full bg-input-border" />
        </View>

        {/* iOS Home Indicator bar */}
        <View className="w-32 h-1 bg-stone-300 rounded-full mx-auto mt-5" />
      </View>
    </SafeAreaView>
  );
}
