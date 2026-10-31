import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { AppIcon } from '@/components/AppIcon';
import { PHOTO_COVERS } from '@/constants/localPhotos';
import { getProfile, UserProfileData, DEFAULT_PROFILE } from '@/lib/profileStorage';
import { getOrders } from '@/lib/ordersStorage';
import { useTranslation } from '@/i18n';

export default function ProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [profile, setProfile] = useState<UserProfileData>(DEFAULT_PROFILE);
  const [eventsJoinedCount, setEventsJoinedCount] = useState<number>(0);

  // Memuat data profil dan jumlah tiket pesanan pengguna setiap layar difokuskan
  useFocusEffect(
    useCallback(() => {
      getProfile().then((data) => setProfile(data));
      getOrders().then((orders) => setEventsJoinedCount(orders.length));
    }, [])
  );

  const handleEditProfile = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    router.push('/profile/edit');
  };

  const handleLogout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    Alert.alert(
      t('profile.logout_title'),
      t('profile.logout_desc'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.logout'),
          style: 'destructive',
          onPress: () => {
            router.replace('/onboarding');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Curved Header (Royal Blue Danau Toba Theme) */}
        <View className="bg-primary pt-3 pb-14 px-5 rounded-b-[2.5rem] shadow-md relative overflow-hidden">
          {/* Ambient Decorative Overlay */}
          <View className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <View className="absolute top-1/2 -left-10 w-36 h-36 rounded-full bg-black/10 blur-xl pointer-events-none" />

          {/* Top Action Bar */}
          <View className="flex-row items-center justify-between mb-3">
            <Pressable
              accessibilityLabel="Kembali"
              onPress={() => router.back()}
              className="w-11 h-11 rounded-full items-center justify-center bg-white/20 border border-white/30 shadow-xs"
            >
              <AppIcon name="arrow-left" size={20} color="#FFFFFF" />
            </Pressable>

            <Text className="font-raleway text-lg font-medium text-white tracking-wide">
              {t('profile.header_title')}
            </Text>

            <Pressable
              accessibilityLabel="Pengaturan"
              onPress={() => router.push('/settings')}
              className="w-11 h-11 rounded-full items-center justify-center bg-white/20 border border-white/30 shadow-xs"
            >
              <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* Avatar & Profile Basic Info */}
          <View className="items-center justify-center pt-1 text-center">
            <View className="relative mb-2.5">
              <Pressable
                onPress={handleEditProfile}
                className="w-24 h-24 rounded-full p-1 bg-white shadow-lg border-2 border-white/50"
              >
                <Image
                  source={profile.avatarUri ? { uri: profile.avatarUri } : PHOTO_COVERS.desaTomok}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              </Pressable>
              <Pressable
                accessibilityLabel="Ubah Foto"
                onPress={handleEditProfile}
                className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md items-center justify-center border border-border/60"
              >
                <Ionicons name="camera" size={15} color="#1D4ED8" />
              </Pressable>
            </View>

            <Text className="font-raleway text-2xl font-medium text-white tracking-wide">
              {profile.fullName || t('profile.user_title')}
            </Text>
            <Text className="text-xs text-blue-100 mt-0.5 font-dmsans">
              {profile.email || 'wisatawan@kawanlokal.id'}
            </Text>
            <View className="mt-2.5 px-3.5 py-1 rounded-full bg-white/20 border border-white/25">
              <Text className="text-[10px] font-dmsans-bold text-white uppercase tracking-wider">
                {t('profile.verified_tourist')}
              </Text>
            </View>
          </View>
        </View>

        {/* Overlapping Floating Content Canvas (-mt-7) */}
        <View className="px-5 -mt-7 gap-4 z-10">
          {/* Stats Card (3 Columns with hairline dividers) */}
          <View className="bg-white/90 rounded-3xl border border-white/90 shadow-md py-4 px-2">
            <View className="flex-row divide-x divide-border/60 items-center">
              {/* Acara Budaya Diikuti (Real data dari storage pesanan) */}
              <Pressable
                onPress={() => router.push('/(tabs)/orders')}
                className="flex-1 items-center justify-center py-1"
              >
                <View className="w-10 h-10 rounded-full bg-blue-50 border border-primary/20 items-center justify-center mb-1.5">
                  <Ionicons name="ticket-outline" size={18} color="#1D4ED8" />
                </View>
                <Text className="font-raleway text-lg font-semibold text-on-surface leading-none">
                  {eventsJoinedCount}
                </Text>
                <Text className="text-[11px] font-dmsans text-on-surface-variant mt-1.5 font-medium">
                  {t('profile.events_joined')}
                </Text>
              </Pressable>

              {/* Acara Tersimpan */}
              <Pressable
                onPress={() => router.push('/calendar')}
                className="flex-1 items-center justify-center py-1"
              >
                <View className="w-10 h-10 rounded-full bg-blue-50 border border-primary/20 items-center justify-center mb-1.5">
                  <Ionicons name="bookmark-outline" size={18} color="#1D4ED8" />
                </View>
                <Text className="font-raleway text-lg font-semibold text-on-surface leading-none">
                  8
                </Text>
                <Text className="text-[11px] font-dmsans text-on-surface-variant mt-1.5 font-medium">
                  {t('profile.saved_items')}
                </Text>
              </Pressable>

              {/* Destinasi Toba */}
              <Pressable
                onPress={() => router.push('/destinations')}
                className="flex-1 items-center justify-center py-1"
              >
                <View className="w-10 h-10 rounded-full bg-blue-50 border border-primary/20 items-center justify-center mb-1.5">
                  <Ionicons name="location-outline" size={18} color="#1D4ED8" />
                </View>
                <Text className="font-raleway text-lg font-semibold text-on-surface leading-none">
                  7
                </Text>
                <Text className="text-[11px] font-dmsans text-on-surface-variant mt-1.5 font-medium">
                  {t('profile.districts_count')}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Account Settings & Menu Options Card (DESIGN.md: card glassmorphic) */}
          <View className="bg-white/85 rounded-3xl border border-white/90 shadow-sm overflow-hidden divide-y divide-border/50">
            {/* Edit Profil Wisatawan */}
            <Pressable
              onPress={handleEditProfile}
              className="flex-row items-center justify-between p-4"
            >
              <View className="flex-row items-center gap-3.5">
                <View className="w-9 h-9 rounded-2xl bg-blue-50 border border-primary/20 items-center justify-center">
                  <Ionicons name="create-outline" size={18} color="#1D4ED8" />
                </View>
                <Text className="text-sm font-dmsans-medium text-on-surface">
                  {t('settings.edit_profile')}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#8A827A" />
            </Pressable>

            {/* Pesanan & Tiket Saya */}
            <Pressable
              onPress={() => router.push('/(tabs)/orders')}
              className="flex-row items-center justify-between p-4"
            >
              <View className="flex-row items-center gap-3.5">
                <View className="w-9 h-9 rounded-2xl bg-blue-50 border border-primary/20 items-center justify-center">
                  <AppIcon name="ticket" size={18} color="#1D4ED8" />
                </View>
                <Text className="text-sm font-dmsans-medium text-on-surface">
                  {t('profile.menu_orders')}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#8A827A" />
            </Pressable>

            {/* Kalender Budaya Terjadwal */}
            <Pressable
              onPress={() => router.push('/calendar')}
              className="flex-row items-center justify-between p-4"
            >
              <View className="flex-row items-center gap-3.5">
                <View className="w-9 h-9 rounded-2xl bg-blue-50 border border-primary/20 items-center justify-center">
                  <AppIcon name="calendar" size={18} color="#1D4ED8" />
                </View>
                <Text className="text-sm font-dmsans-medium text-on-surface">
                  {t('profile.menu_calendar')}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#8A827A" />
            </Pressable>

            {/* Destinasi Wisata */}
            <Pressable
              onPress={() => router.push('/destinations')}
              className="flex-row items-center justify-between p-4"
            >
              <View className="flex-row items-center gap-3.5">
                <View className="w-9 h-9 rounded-2xl bg-surface-tonal items-center justify-center">
                  <AppIcon name="map" size={18} color="#23201E" />
                </View>
                <Text className="text-sm font-dmsans-medium text-on-surface">
                  {t('profile.menu_destinations')}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#8A827A" />
            </Pressable>

            {/* Homestay & Penginapan */}
            <Pressable
              onPress={() => router.push('/homestays')}
              className="flex-row items-center justify-between p-4"
            >
              <View className="flex-row items-center gap-3.5">
                <View className="w-9 h-9 rounded-2xl bg-surface-tonal items-center justify-center">
                  <AppIcon name="hotel" size={18} color="#23201E" />
                </View>
                <Text className="text-sm font-dmsans-medium text-on-surface">
                  {t('profile.menu_homestays')}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#8A827A" />
            </Pressable>

            {/* Pengaturan Akun & Peran */}
            <Pressable
              onPress={() => router.push('/settings')}
              className="flex-row items-center justify-between p-4"
            >
              <View className="flex-row items-center gap-3.5">
                <View className="w-9 h-9 rounded-2xl bg-surface-tonal items-center justify-center">
                  <Ionicons name="settings-outline" size={18} color="#23201E" />
                </View>
                <Text className="text-sm font-dmsans-medium text-on-surface">
                  {t('profile.menu_settings')}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#8A827A" />
            </Pressable>
          </View>

          {/* Logout Action Row */}
          <View className="items-center pt-2">
            <Pressable
              onPress={handleLogout}
              className="flex-row items-center gap-2 py-2.5 px-6 rounded-full bg-white border border-border/80 shadow-xs"
            >
              <Ionicons name="log-out-outline" size={18} color="#8C4A4A" />
              <Text className="text-xs font-dmsans-bold text-destructive uppercase tracking-wider">
                {t('common.logout')}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
