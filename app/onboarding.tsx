import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ScrollViewInstance,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { TOBA_IMAGES } from '@/constants/images';

interface OnboardingSlide {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
}

const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: 'slide-1',
    tag: 'PESONA ALAM',
    title: 'Jelajahi\nKeagungan Toba',
    description:
      'Nikmati lanskap magis kaldera vulkanik terbesar di dunia, perbukitan hijau Samosir, dan danau biru yang menenangkan.',
    image: TOBA_IMAGES.lakeTobaLandscape,
  },
  {
    id: 'slide-2',
    tag: 'WARISAN LELUHUR',
    title: 'Kalender\nBudaya Autentik',
    description:
      'Akses jadwal resmi upacara adat Batak terverifikasi, pagelaran gondang sabangunan, serta pesta tahunan di 7 kabupaten.',
    image: TOBA_IMAGES.tortorDance,
  },
  {
    id: 'slide-3',
    tag: 'KOMUNITAS LOKAL',
    title: 'Pemandu &\nPenginapan Adat',
    description:
      'Dapatkan cerita sejarah dari pemandu lokal terpercaya, ikuti workshop tenun ulos, dan rasakan kenyamanan Sopo Bolon tradisional.',
    image: TOBA_IMAGES.rumahBolonTraditional,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollViewInstance>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === ONBOARDING_SLIDES.length - 1;

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    if (isLastSlide) {
      router.replace('/(tabs)/home');
    } else {
      const nextIndex = activeIndex + 1;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setActiveIndex(nextIndex);
    }
  };

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    router.replace('/(tabs)/home');
  };

  const handleDotPress = (index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
    setActiveIndex(index);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    if (index !== activeIndex && index >= 0 && index < ONBOARDING_SLIDES.length) {
      setActiveIndex(index);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-card" edges={['top', 'bottom']}>
      {/* Brand Header & Skip Button */}
      <View className="pt-2 pb-1 px-5 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          {/* Logo Glyph KawanLokal Biru Toba */}
          <View className="w-8 h-8 rounded-xl bg-ulos-red items-center justify-center shadow-sm">
            <Ionicons name="sparkles" size={17} color="#FFFFFF" />
          </View>
          <Text className="text-xl font-bold text-on-surface tracking-tight">
            Kawan<Text className="text-ulos-red">Lokal</Text>
          </Text>
        </View>

        {!isLastSlide ? (
          <Pressable
            accessibilityLabel="Lewati intro"
            onPress={handleSkip}
            className="px-3 py-1.5 rounded-full active:bg-stone-100"
          >
            <Text className="text-xs font-semibold text-secondary">Lewati</Text>
          </Pressable>
        ) : (
          <View className="w-12" />
        )}
      </View>

      {/* Horizontal Carousel (3 Cards) */}
      <View className="flex-1 justify-center">
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          scrollEventThrottle={16}
          className="flex-1"
        >
          {ONBOARDING_SLIDES.map((slide) => (
            <View
              key={slide.id}
              style={{ width }}
              className="px-5 py-2 justify-center items-center"
            >
              <View className="w-full h-full max-h-[360px] rounded-3xl overflow-hidden bg-stone-100 shadow-sm relative">
                <Image
                  source={{ uri: slide.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                {/* Badge Tag */}
                <View className="absolute top-3 left-3 bg-stone-900/70 backdrop-blur-md px-3 py-1 rounded-full">
                  <Text className="text-[10px] font-bold text-white tracking-wider">
                    {slide.tag}
                  </Text>
                </View>

                {/* Subtle bottom gradient */}
                <View className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/70 via-white/10 to-transparent pointer-events-none" />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Content Area */}
      <View className="w-full px-6 pt-2 pb-4 bg-surface-card">
        {/* Dynamic Text for Active Card */}
        <View className="min-h-[115px] justify-start mb-4">
          <Text className="text-3xl font-bold text-on-surface tracking-tight leading-tight">
            {ONBOARDING_SLIDES[activeIndex].title}
          </Text>
          <Text className="text-sm text-secondary mt-2 font-normal leading-relaxed">
            {ONBOARDING_SLIDES[activeIndex].description}
          </Text>
        </View>

        {/* Action Button */}
        <Pressable
          onPress={handleNext}
          className="w-full h-12 bg-ulos-red active:bg-ulos-redDark rounded-full flex-row items-center justify-center gap-2 shadow-md active:opacity-90"
        >
          <Text className="text-white font-semibold text-base">
            {isLastSlide ? 'Mulai Eksplorasi' : 'Lanjut'}
          </Text>
          <Ionicons
            name={isLastSlide ? 'checkmark' : 'arrow-forward'}
            size={18}
            color="#FFFFFF"
          />
        </Pressable>

        {/* 3 Interactive Pagination Dots */}
        <View className="flex-row items-center justify-center gap-2 mt-5">
          {ONBOARDING_SLIDES.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <Pressable
                key={index}
                accessibilityLabel={`Slide ke-${index + 1}`}
                onPress={() => handleDotPress(index)}
                className={`h-2 rounded-full transition-none ${
                  isActive ? 'w-6 bg-ulos-red' : 'w-2 bg-input-border'
                }`}
              />
            );
          })}
        </View>

        {/* Home Indicator */}
        <View className="w-32 h-1 bg-stone-300 rounded-full mx-auto mt-4" />
      </View>
    </SafeAreaView>
  );
}
