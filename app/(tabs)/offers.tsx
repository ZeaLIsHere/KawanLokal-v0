import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function OffersTab() {
  return (
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top']}>
      <View className="px-4 py-3 bg-surface-card border-b border-card-border">
        <Text className="text-xl font-bold text-on-surface">Special Offers</Text>
        <Text className="text-xs text-secondary mt-0.5">Exclusive travel discounts & seasonal promotions</Text>
      </View>
      <ScrollView className="flex-1 p-4">
        <View className="bg-gradient-to-r from-blue-50 to-white border border-card-border rounded-2xl p-4 shadow-sm mb-4">
          <View className="self-start px-2.5 py-0.5 rounded-full bg-badge-discount-bg mb-2">
            <Text className="text-badge-discount-text text-[10px] font-bold">25% OFF</Text>
          </View>
          <Text className="text-base font-bold text-on-surface">Early Bird Flight Deals</Text>
          <Text className="text-xs text-secondary mt-1">
            Book 30 days in advance and get discounts across major domestic routes.
          </Text>
        </View>

        <View className="bg-surface-card border border-card-border rounded-2xl p-4 shadow-sm">
          <View className="self-start px-2.5 py-0.5 rounded-full bg-badge-discount-bg mb-2">
            <Text className="text-badge-discount-text text-[10px] font-bold">HOTEL FLASH SALE</Text>
          </View>
          <Text className="text-base font-bold text-on-surface">Up to 40% OFF Resorts</Text>
          <Text className="text-xs text-secondary mt-1">
            Special weekend getaway discounts in Bali, Lombok, and Lake Toba.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
