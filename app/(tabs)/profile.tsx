import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const USER_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCA5WihJF4kFWiNvclOFZdm8QhOAqXl2qc37l9eYJHr80vnDHSEnBJelvfGuR5NFOquRitQmm21rEIVlM_ZRZmTWZ1NjmeW02wbGv-w-JXk1ktqKwR7DRQgaIyymz-CIRqe75vRsT8BRhFEI9he9JPJhvcBqiCyPUsWvYXB-d0NQ6EPxOf6sh4IfwiOx2zZxA9FNMmhXIA8-w4ie8X9SyojfiEr0uhoDik153otPNPzIjOoK4454VfnNw';

export default function ProfileTab() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top']}>
      <View className="px-4 py-3 bg-surface-card border-b border-card-border flex-row items-center justify-between">
        <Text className="text-xl font-bold text-on-surface">Profile</Text>
        <Pressable
          onPress={() => router.push('/settings')}
          className="w-9 h-9 rounded-full bg-slate-100 items-center justify-center"
        >
          <Ionicons name="settings-outline" size={18} color="#505f76" />
        </Pressable>
      </View>

      <View className="p-4">
        <View className="bg-surface-card border border-card-border rounded-2xl p-4 flex-row items-center gap-3 shadow-sm mb-4">
          <View className="relative w-14 h-14 rounded-full border border-card-border p-0.5">
            <Image
              source={{ uri: USER_AVATAR }}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
            <View className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-white" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-on-surface">Tanmoy</Text>
            <Text className="text-xs text-secondary">tanmoy.travels@truway.com</Text>
          </View>
        </View>

        <View className="bg-surface-card border border-card-border rounded-2xl overflow-hidden divide-y divide-card-border">
          <Pressable
            onPress={() => router.push('/settings')}
            className="flex-row items-center justify-between p-3.5 active:bg-slate-50"
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="notifications-outline" size={20} color="#505f76" />
              <Text className="text-sm font-medium text-on-surface">Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
          </Pressable>
          <Pressable
            onPress={() => router.push('/settings')}
            className="flex-row items-center justify-between p-3.5 active:bg-slate-50"
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="shield-checkmark-outline" size={20} color="#505f76" />
              <Text className="text-sm font-medium text-on-surface">Security & Privacy</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
