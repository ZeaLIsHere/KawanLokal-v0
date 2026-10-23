import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const USER_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCA5WihJF4kFWiNvclOFZdm8QhOAqXl2qc37l9eYJHr80vnDHSEnBJelvfGuR5NFOquRitQmm21rEIVlM_ZRZmTWZ1NjmeW02wbGv-w-JXk1ktqKwR7DRQgaIyymz-CIRqe75vRsT8BRhFEI9he9JPJhvcBqiCyPUsWvYXB-d0NQ6EPxOf6sh4IfwiOx2zZxA9FNMmhXIA8-w4ie8X9SyojfiEr0uhoDik153otPNPzIjOoK4454VfnNw';

const BALI_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuApqVCaIv7Be1R-kOnJZpxWHRUM0zSRPniEBxRsMqzTYe41qiNP0U3HZjBanm7E5eGbzvAUMpcXpW98uGWyRJn7q1wll_-WcLPslXXSlbfeJEyxUbdBQ54tQUAlov5SAv3YuNCh2RF2XovYboKNdd_6yFJ0C3yk1lu7AWZPbi-xVBXfX96yYXqmnl1pWzJXHd__hHVeAmBXw-p_RhbjrMawqqUX-lBJzh08ULjqULFm8y8HbFqTcd08kA';

const PARIS_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAsotFOXr9Hw6B0Yg_M2tdrZPkq0xgY7o23KdVslvYoHUhnAIbxhNA4JBRTLDoR1nnctsXyOQpqd98YClqpiaqxMwvWsjxuNjWh95xNYfOIv0a9xf_Gcehv-ewZt4CMmIs3-HzdRw13PDX2PjiOQQxW9RXgcHddKL_As8VjAJv9j4ZAkk78FhUZDJ4yx4UK5eayJOjkJj4RQ2ziY7pCeX9SW5iMak40aDLkqIq_zHgQFgUqQxUBycOH8Q';

const CATEGORIES = [
  { id: 'flights', label: 'Flights', icon: 'flight', isMaterial: true, active: true },
  { id: 'hotels', label: 'Hotels', icon: 'hotel', isMaterial: true, active: false },
  { id: 'packages', label: 'Packages', icon: 'work', isMaterial: true, active: false },
  { id: 'cars', label: 'Cars', icon: 'directions-car', isMaterial: true, active: false },
] as const;

export default function HomeScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('flights');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCategoryPress = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setActiveCategory(id);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top']}>
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center w-full px-4 py-2 bg-surface-card border-b border-card-border/60 z-20">
        {/* Leading Menu Icon */}
        <Pressable
          accessibilityLabel="Open menu"
          onPress={() => router.push('/settings')}
          className="w-10 h-10 items-center justify-center rounded-lg active:bg-blue-50 active:scale-95 transition-all"
        >
          <Ionicons name="menu" size={24} color="#505f76" />
        </Pressable>

        {/* Brand Logo */}
        <View className="flex-row items-center gap-1.5">
          <View className="w-7 h-7 rounded-lg bg-primary-container items-center justify-center shadow-sm">
            <MaterialIcons name="flight" size={18} color="#FFFFFF" />
          </View>
          <Text className="text-xl font-bold text-primary tracking-tight">
            Truway
          </Text>
        </View>

        {/* Trailing Avatar with Indicator */}
        <Pressable
          accessibilityLabel="User Profile Avatar"
          onPress={() => router.push('/profile')}
          className="relative w-10 h-10 rounded-full border border-card-border p-0.5 active:scale-95"
        >
          <Image
            source={{ uri: USER_AVATAR }}
            className="w-full h-full rounded-full"
            resizeMode="cover"
          />
          <View className="absolute top-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border-2 border-surface-card" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting & Header Prompt */}
        <View className="mb-4">
          <View className="flex-row items-center gap-1.5">
            <Text className="text-sm font-medium text-secondary">Hi, Tanmoy</Text>
            <Text className="text-base">👋</Text>
          </View>
          <Text className="text-2xl font-bold text-on-surface tracking-tight leading-snug mt-1">
            Where would you like{'\n'}to travel today?
          </Text>
        </View>

        {/* Search Input Module */}
        <View className="mb-5">
          <View className="relative flex-row items-center w-full bg-surface-card rounded-xl border border-input-border shadow-sm px-3.5 h-12">
            <Ionicons name="search" size={20} color="#737686" />
            <TextInput
              placeholder="Search for destinations..."
              placeholderTextColor="#737686"
              className="flex-1 ml-2.5 text-sm font-medium text-on-surface h-full"
            />
          </View>
        </View>

        {/* Category Quick Action Grid */}
        <View className="flex-row justify-between mb-6">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <Pressable
                key={cat.id}
                onPress={() => handleCategoryPress(cat.id)}
                className="items-center active:scale-95 transition-all"
              >
                <View
                  className={`w-14 h-14 rounded-2xl items-center justify-center shadow-sm border ${
                    isSelected
                      ? 'bg-primary-container border-primary-container'
                      : 'bg-surface-card border-card-border'
                  }`}
                >
                  <MaterialIcons
                    name={cat.icon as any}
                    size={26}
                    color={isSelected ? '#FFFFFF' : '#505f76'}
                  />
                </View>
                <Text
                  className={`mt-2 text-xs font-semibold ${
                    isSelected ? 'text-primary' : 'text-on-surface'
                  }`}
                >
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Popular Destinations Section */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-on-surface">
              Popular Destinations
            </Text>
            <Pressable
              onPress={() => router.push('/(tabs)/explore')}
              className="active:opacity-70"
            >
              <Text className="text-xs font-semibold text-primary">See All</Text>
            </Pressable>
          </View>

          {/* 2-Column Responsive Card Grid */}
          <View className="flex-row gap-3">
            {/* Card 1: Bali */}
            <View className="flex-1 bg-surface-card rounded-2xl border border-card-border overflow-hidden shadow-sm">
              <View className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden">
                <Image
                  source={{ uri: BALI_IMAGE }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <Pressable
                  accessibilityLabel="Save Bali to favorites"
                  onPress={() => toggleFavorite('bali')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/85 items-center justify-center shadow-sm active:scale-90"
                >
                  <Ionicons
                    name={favorites['bali'] ? 'heart' : 'heart-outline'}
                    size={17}
                    color={favorites['bali'] ? '#ba1a1a' : '#505f76'}
                  />
                </Pressable>
              </View>

              <View className="p-3">
                <Text className="text-sm font-semibold text-on-surface leading-tight">
                  Bali, Indonesia
                </Text>
                <View className="flex-row items-center mt-1 gap-1">
                  <Ionicons name="star" size={14} color="#F59E0B" />
                  <Text className="text-xs font-semibold text-on-surface">4.8</Text>
                </View>
                <View className="mt-3 pt-2 border-t border-card-border flex-row items-center justify-between">
                  <Text className="text-[11px] text-secondary">Starting</Text>
                  <Text className="text-sm font-bold text-primary">$499</Text>
                </View>
              </View>
            </View>

            {/* Card 2: Paris */}
            <View className="flex-1 bg-surface-card rounded-2xl border border-card-border overflow-hidden shadow-sm">
              <View className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden">
                <Image
                  source={{ uri: PARIS_IMAGE }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <Pressable
                  accessibilityLabel="Save Paris to favorites"
                  onPress={() => toggleFavorite('paris')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/85 items-center justify-center shadow-sm active:scale-90"
                >
                  <Ionicons
                    name={favorites['paris'] ? 'heart' : 'heart-outline'}
                    size={17}
                    color={favorites['paris'] ? '#ba1a1a' : '#505f76'}
                  />
                </Pressable>
              </View>

              <View className="p-3">
                <Text className="text-sm font-semibold text-on-surface leading-tight">
                  Paris, France
                </Text>
                <View className="flex-row items-center mt-1 gap-1">
                  <Ionicons name="star" size={14} color="#F59E0B" />
                  <Text className="text-xs font-semibold text-on-surface">4.7</Text>
                </View>
                <View className="mt-3 pt-2 border-t border-card-border flex-row items-center justify-between">
                  <Text className="text-[11px] text-secondary">Starting</Text>
                  <Text className="text-sm font-bold text-primary">$699</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Promo Offer Banner */}
        <View className="bg-gradient-to-r from-blue-50 to-white border border-card-border rounded-2xl p-4 shadow-sm flex-row items-center justify-between overflow-hidden relative">
          <View className="space-y-1.5 flex-1 pr-2 z-10">
            <View className="self-start px-2.5 py-0.5 rounded-full bg-badge-discount-bg">
              <Text className="text-badge-discount-text text-[10px] font-bold tracking-wide">
                LIMITED DEAL
              </Text>
            </View>
            <Text className="text-base font-bold text-on-surface leading-tight mt-1">
              Up to 25% OFF{'\n'}
              <Text className="text-xs font-medium text-secondary">
                on Domestic Flights
              </Text>
            </Text>
            <Pressable
              onPress={() => router.push('/(tabs)/orders')}
              className="mt-2 flex-row items-center gap-1 active:opacity-70"
            >
              <Text className="text-xs font-bold text-primary">View Offers</Text>
              <Ionicons name="arrow-forward" size={14} color="#004ac6" />
            </Pressable>
          </View>

          {/* Banner Graphic */}
          <View className="w-20 h-20 bg-primary-light rounded-full items-center justify-center">
            <MaterialIcons
              name="flight-takeoff"
              size={38}
              color="#2563eb"
              style={{ transform: [{ rotate: '-45deg' }] }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
