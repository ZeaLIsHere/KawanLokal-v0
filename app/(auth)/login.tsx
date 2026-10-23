import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-card" edges={['top', 'bottom']}>
      <View className="flex-1 px-6 justify-center">
        {/* Brand Header */}
        <View className="items-center mb-8">
          <View className="w-12 h-12 rounded-2xl bg-ulos-red items-center justify-center shadow-md mb-3">
            <Ionicons name="sparkles" size={24} color="#FFFFFF" />
          </View>
          <Text className="text-2xl font-bold text-on-surface tracking-tight">
            Masuk ke Kawan<Text className="text-ulos-red">Lokal</Text>
          </Text>
          <Text className="text-xs text-secondary mt-1 text-center font-medium">
            Jelajahi upacara adat, pemandu, dan pengalaman otentik Danau Toba
          </Text>
        </View>

        {/* Form Inputs */}
        <View className="gap-3.5 mb-6">
          <View>
            <Text className="text-xs font-semibold text-secondary mb-1.5">Email</Text>
            <View className="flex-row items-center bg-surface-canvas rounded-xl border border-card-border px-3.5 h-12">
              <Ionicons name="mail-outline" size={18} color="#78716C" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="nama@email.com"
                placeholderTextColor="#A8A29E"
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 ml-2.5 text-sm font-medium text-on-surface"
              />
            </View>
          </View>

          <View>
            <Text className="text-xs font-semibold text-secondary mb-1.5">Kata Sandi</Text>
            <View className="flex-row items-center bg-surface-canvas rounded-xl border border-card-border px-3.5 h-12">
              <Ionicons name="lock-closed-outline" size={18} color="#78716C" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#A8A29E"
                secureTextEntry
                className="flex-1 ml-2.5 text-sm font-medium text-on-surface"
              />
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="gap-3">
          <Pressable
            onPress={handleLogin}
            className="w-full h-12 bg-ulos-red active:bg-ulos-redDark rounded-full items-center justify-center shadow-md active:scale-[0.98] transition-all"
          >
            <Text className="text-white font-bold text-base">Masuk</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              router.replace('/(tabs)/home');
            }}
            className="w-full h-12 bg-surface-canvas active:bg-stone-100 rounded-full items-center justify-center border border-card-border active:scale-[0.98] transition-all"
          >
            <Text className="text-on-surface font-semibold text-sm">
              Lanjut ke Beranda
            </Text>
          </Pressable>
        </View>

        {/* Footer Navigation */}
        <View className="flex-row items-center justify-center mt-6 gap-1">
          <Text className="text-xs text-secondary">Belum memiliki akun?</Text>
          <Pressable onPress={() => router.push('/(auth)/register')}>
            <Text className="text-xs font-bold text-ulos-red">Daftar Sekarang</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
