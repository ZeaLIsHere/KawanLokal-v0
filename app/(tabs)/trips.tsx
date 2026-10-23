import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function TripsTab() {
  return (
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top']}>
      <View className="px-4 py-3 bg-surface-card border-b border-card-border">
        <Text className="text-xl font-bold text-on-surface">My Trips</Text>
        <Text className="text-xs text-secondary mt-0.5">Manage your upcoming and past bookings</Text>
      </View>
      <View className="flex-1 items-center justify-center p-8">
        <View className="w-16 h-16 rounded-2xl bg-blue-50 items-center justify-center mb-4">
          <MaterialIcons name="luggage" size={32} color="#2563eb" />
        </View>
        <Text className="text-base font-bold text-on-surface text-center">
          No Booked Trips Yet
        </Text>
        <Text className="text-xs text-secondary text-center mt-1">
          Explore destinations and book your flights or hotels to see them here.
        </Text>
      </View>
    </SafeAreaView>
  );
}
