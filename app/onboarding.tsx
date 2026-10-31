import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
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
import { PHOTO_COVERS } from '@/constants/localPhotos';

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: 'slide-1',
    title: 'Jelajahi\nKeagungan Toba',
    description:
      'Nikmati lanskap magis kaldera vulkanik terbesar di dunia, perbukitan hijau Samosir, dan danau biru yang menenangkan.',
    image: require('../assets/photos/lake toba/IMG_2944.JPG'),
  },
  {
    id: 'slide-2',
    title: 'Kalender\nBudaya Autentik',
    description:
      'Akses jadwal resmi upacara adat Batak terverifikasi, pagelaran gondang sabangunan, serta pesta tahunan di 7 kabupaten.',
    image: PHOTO_COVERS.torTor,
  },
  {
    id: 'slide-3',
    title: 'Pemandu &\nPenginapan Adat',
    description:
      'Dapatkan cerita sejarah dari pemandu lokal terpercaya, ikuti workshop tenun ulos, dan rasakan kenyamanan Sopo Bolon tradisional.',
    image: PHOTO_COVERS.rumahBolon,
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
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      {/* Brand Header & Skip Button */}
      <View className="pt-2 pb-1 px-6 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          {/* Logo Glyph KawanLokal Biru Toba */}
          <Image
            source={require('../assets/logo-aplikasi.png')}
            className="w-8 h-8 rounded-full"
            resizeMode="cover"
          />
          <Text className="font-raleway text-xl font-medium text-on-surface tracking-wide">
            Kawan<Text className="text-primary font-semibold">Lokal</Text>
          </Text>
        </View>

        {!isLastSlide ? (
          <Pressable
            accessibilityLabel="Lewati intro"
            onPress={handleSkip}
            className="px-3.5 py-1.5 rounded-full active:bg-surface-tonal"
          >
            <Text className="text-[11px] uppercase tracking-[0.15em] font-dmsans-bold text-on-surface-variant">
              LEWATI
            </Text>
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
              className="px-6 py-2 justify-center items-center"
            >
              <View className="w-full h-full max-h-[360px] rounded-[36px] overflow-hidden bg-surface-tonal border border-white/80 shadow-sm relative">
                <Image
                  source={slide.image}
                  className="w-full h-full"
                  resizeMode="cover"
                />

                {/* Subtle bottom gradient */}
                <View className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/60 via-white/10 to-transparent pointer-events-none" />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Content Area */}
      <View className="w-full px-6 pt-2 pb-4 bg-surface">
        {/* Dynamic Text for Active Card */}
        <View className="min-h-[125px] justify-start mb-3">
          <Text className="font-raleway text-3xl font-normal text-on-surface tracking-wide leading-tight">
            {ONBOARDING_SLIDES[activeIndex].title}
          </Text>
          <Text className="font-dmsans text-sm text-on-surface-variant mt-2 font-normal leading-relaxed">
            {ONBOARDING_SLIDES[activeIndex].description}
          </Text>
        </View>

        {/* Action Button (Primary Pill) */}
        <Pressable
          onPress={handleNext}
          className="w-full h-14 bg-primary active:bg-blue-800 rounded-full flex-row items-center justify-center gap-2 shadow-md active:opacity-90"
        >
          <Text className="text-white font-dmsans-medium text-base tracking-wide">
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
                  isActive ? 'w-6 bg-primary' : 'w-2 bg-border'
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
