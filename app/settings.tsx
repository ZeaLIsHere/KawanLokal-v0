import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { AppIcon } from '@/components/AppIcon';
import { useTranslation } from '@/i18n';

export default function SettingsScreen() {
  const router = useRouter();
  const { locale, setLocale, t } = useTranslation();

  const handleSelectLanguage = (lang: 'en' | 'id') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setLocale(lang);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      {/* Top App Bar Glassmorphic (DESIGN.md: top-app-bar + button-icon-glass) */}
      <View className="flex-row items-center justify-between px-5 py-3 bg-white/75 border-b border-border/50 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-11 h-11 rounded-full items-center justify-center bg-white/80 border border-white/90 shadow-sm"
        >
          <AppIcon name="arrow-left" size={20} color="#23201E" />
        </Pressable>

        <View className="items-center">
          <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
            {t('settings.title')}
          </Text>
        </View>

        <View className="w-11" />
      </View>

      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
        {/* Section Label */}
        <Text className="text-[10px] uppercase tracking-[0.2em] font-dmsans-bold text-on-surface-variant mb-2.5 px-1">
          {t('settings.account')}
        </Text>

        {/* 1. Edit Profil Card (DESIGN.md: card glassmorphic) */}
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            router.push('/profile');
          }}
          className="bg-white/85 rounded-3xl border border-white/90 p-4 shadow-sm mb-4 flex-row items-center justify-between"
        >
          <View className="flex-row items-center gap-3.5 flex-1 pr-2">
            <View className="w-12 h-12 rounded-2xl bg-blue-50 border border-primary/20 items-center justify-center shrink-0">
              <Ionicons name="person-outline" size={20} color="#1D4ED8" />
            </View>
            <View className="flex-1">
              <Text className="font-raleway text-base font-medium text-on-surface leading-tight">
                {t('settings.edit_profile')}
              </Text>
              <Text className="text-xs font-dmsans text-on-surface-variant mt-0.5 leading-snug">
                {t('settings.edit_profile_desc')}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#8A827A" />
        </Pressable>

        {/* 2. Ganti Bahasa Card dengan Button Badges (DESIGN.md: card glassmorphic) */}
        <View className="bg-white/85 rounded-3xl border border-white/90 p-5 shadow-sm mb-6">
          <View className="flex-row items-center gap-3.5 mb-4">
            <View className="w-12 h-12 rounded-2xl bg-blue-50 border border-primary/20 items-center justify-center shrink-0">
              <AppIcon name="globe" size={20} color="#1D4ED8" />
            </View>
            <View className="flex-1">
              <Text className="font-raleway text-base font-medium text-on-surface leading-tight">
                {t('settings.language')}
              </Text>
              <Text className="text-xs font-dmsans text-on-surface-variant mt-0.5 leading-snug">
                {t('settings.language_desc')}
              </Text>
            </View>
          </View>

          {/* Button Badge Switcher untuk Bahasa yang Tersedia */}
          <View className="pt-2 border-t border-border/50">
            <View className="flex-row items-center gap-2.5">
              {/* Badge English (Default) */}
              <Pressable
                onPress={() => handleSelectLanguage('en')}
                className={`flex-1 h-11 rounded-full flex-row items-center justify-center gap-2 border ${
                  locale === 'en'
                    ? 'bg-primary border-primary shadow-xs'
                    : 'bg-surface-tonal border-border/70'
                }`}
              >
                <Ionicons
                  name={locale === 'en' ? 'checkmark-circle' : 'ellipse-outline'}
                  size={15}
                  color={locale === 'en' ? '#FFFFFF' : '#8A827A'}
                />
                <Text
                  className={`text-xs ${
                    locale === 'en'
                      ? 'font-dmsans-bold text-white'
                      : 'font-dmsans-medium text-on-surface-strong'
                  }`}
                >
                  English (US)
                </Text>
              </Pressable>

              {/* Badge Bahasa Indonesia */}
              <Pressable
                onPress={() => handleSelectLanguage('id')}
                className={`flex-1 h-11 rounded-full flex-row items-center justify-center gap-2 border ${
                  locale === 'id'
                    ? 'bg-primary border-primary shadow-xs'
                    : 'bg-surface-tonal border-border/70'
                }`}
              >
                <Ionicons
                  name={locale === 'id' ? 'checkmark-circle' : 'ellipse-outline'}
                  size={15}
                  color={locale === 'id' ? '#FFFFFF' : '#8A827A'}
                />
                <Text
                  className={`text-xs ${
                    locale === 'id'
                      ? 'font-dmsans-bold text-white'
                      : 'font-dmsans-medium text-on-surface-strong'
                  }`}
                >
                  Bahasa Indonesia
                </Text>
              </Pressable>
            </View>

            {/* Status Aktif */}
            <View className="flex-row items-center justify-center gap-1.5 mt-3.5">
              <View className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <Text className="text-[11px] font-dmsans text-on-surface-variant">
                {locale === 'en'
                  ? 'Active language: English (Default for global tourists)'
                  : 'Bahasa aktif: Bahasa Indonesia'}
              </Text>
            </View>
          </View>
        </View>

        {/* Info Aplikasi */}
        <View className="items-center py-6">
          <Text className="text-xs font-dmsans-bold text-on-surface-variant tracking-wider">
            KAWANLOKAL
          </Text>
          <Text className="text-[11px] font-dmsans text-on-surface-variant/70 mt-1">
            {t('settings.app_info')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
