import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { AppIcon } from '@/components/AppIcon';
import { PHOTO_COVERS } from '@/constants/localPhotos';
import { getProfile, saveProfile, UserProfileData } from '@/lib/profileStorage';
import { useTranslation } from '@/i18n';

export default function EditProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const [avatarUri, setAvatarUri] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [origin, setOrigin] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    getProfile().then((data) => {
      setAvatarUri(data.avatarUri);
      setFullName(data.fullName);
      setEmail(data.email);
      setPhone(data.phone);
      setOrigin(data.origin);
      setBio(data.bio);
    });
  }, []);

  const handlePickAvatar = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Izin Galeri Diperlukan',
          'Mohon izinkan akses galeri foto untuk memilih foto profil Anda.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        setAvatarUri(selectedUri);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      }
    } catch {
      Alert.alert('Gagal Membuka Galeri', 'Terjadi kendala saat mengakses galeri foto.');
    }
  };

  const handleSave = async () => {
    if (!fullName.trim()) {
      Alert.alert('Nama Diperlukan', 'Mohon isi nama lengkap Anda.');
      return;
    }

    setIsSaving(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});

    await saveProfile({
      avatarUri,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      origin: origin.trim(),
      bio: bio.trim(),
    });

    setIsSaving(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});

    Alert.alert(
      'Profil Berhasil Diperbarui',
      'Data profil Anda telah tersimpan secara lokal di perangkat.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      {/* Top App Bar Glassmorphic (DESIGN.md) */}
      <View className="flex-row items-center justify-between px-5 py-3 bg-white/75 border-b border-border/50 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-11 h-11 items-center justify-center rounded-full bg-white/80 border border-white/90 shadow-sm"
        >
          <AppIcon name="arrow-left" size={20} color="#23201E" />
        </Pressable>

        <View className="items-center">
          <Text className="font-raleway text-lg font-medium text-on-surface tracking-wide">
            {t('settings.edit_profile')}
          </Text>
        </View>

        <Pressable
          onPress={handleSave}
          disabled={isSaving}
          className="h-9 px-4 rounded-full bg-primary items-center justify-center shadow-xs"
        >
          <Text className="text-white font-dmsans-bold text-xs tracking-wide">
            {t('common.save')}
          </Text>
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 px-5 pt-5"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Picker Section */}
        <View className="items-center mb-6">
          <View className="relative">
            <View className="w-28 h-28 rounded-full p-1 bg-white shadow-md border-2 border-primary/20 overflow-hidden">
              <Image
                source={avatarUri ? { uri: avatarUri } : PHOTO_COVERS.desaTomok}
                className="w-full h-full rounded-full"
                resizeMode="cover"
              />
            </View>
            <Pressable
              accessibilityLabel="Ganti Foto"
              onPress={handlePickAvatar}
              className="absolute bottom-0 right-0 w-9 h-9 bg-primary rounded-full items-center justify-center shadow-md border-2 border-white"
            >
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
          <Pressable onPress={handlePickAvatar} className="mt-2.5">
            <Text className="text-xs font-dmsans-bold text-primary">
              Ganti Foto Profil
            </Text>
          </Pressable>
        </View>

        {/* Input Form Module (DESIGN.md: card glassmorphic) */}
        <View className="bg-white/85 rounded-3xl border border-white/90 p-5 shadow-sm mb-5 gap-4">
          {/* Field 1: Nama Lengkap */}
          <View>
            <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant mb-1.5 px-1">
              Nama Lengkap
            </Text>
            <View className="bg-surface-tonal rounded-2xl px-4 h-12 justify-center border border-border/60">
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Masukkan nama lengkap..."
                placeholderTextColor="#8A827A"
                className="text-xs font-dmsans text-on-surface h-full"
              />
            </View>
          </View>

          {/* Field 2: Email */}
          <View>
            <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant mb-1.5 px-1">
              Alamat Email
            </Text>
            <View className="bg-surface-tonal rounded-2xl px-4 h-12 justify-center border border-border/60">
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="contoh@email.com"
                placeholderTextColor="#8A827A"
                keyboardType="email-address"
                autoCapitalize="none"
                className="text-xs font-dmsans text-on-surface h-full"
              />
            </View>
          </View>

          {/* Field 3: Telepon / WhatsApp */}
          <View>
            <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant mb-1.5 px-1">
              Nomor Telepon / WhatsApp
            </Text>
            <View className="bg-surface-tonal rounded-2xl px-4 h-12 justify-center border border-border/60">
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="+62 8xx-xxxx-xxxx"
                placeholderTextColor="#8A827A"
                keyboardType="phone-pad"
                className="text-xs font-dmsans text-on-surface h-full"
              />
            </View>
          </View>

          {/* Field 4: Asal Daerah / Negara */}
          <View>
            <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant mb-1.5 px-1">
              Asal Daerah / Negara
            </Text>
            <View className="bg-surface-tonal rounded-2xl px-4 h-12 justify-center border border-border/60">
              <TextInput
                value={origin}
                onChangeText={setOrigin}
                placeholder="Contoh: Medan, Indonesia"
                placeholderTextColor="#8A827A"
                className="text-xs font-dmsans text-on-surface h-full"
              />
            </View>
          </View>

          {/* Field 5: Bio Singkat / Minat Budaya */}
          <View>
            <Text className="text-[10px] uppercase tracking-[0.18em] font-dmsans-bold text-on-surface-variant mb-1.5 px-1">
              Minat Budaya / Bio Singkat
            </Text>
            <View className="bg-surface-tonal rounded-2xl p-4 min-h-[90px] border border-border/60">
              <TextInput
                value={bio}
                onChangeText={setBio}
                placeholder="Ceritakan minat wisata atau ketertarikan Anda terhadap budaya Toba..."
                placeholderTextColor="#8A827A"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                className="text-xs font-dmsans text-on-surface leading-relaxed"
              />
            </View>
          </View>
        </View>

        {/* Action Button: Simpan Perubahan */}
        <Pressable
          onPress={handleSave}
          disabled={isSaving}
          className="w-full h-14 rounded-full bg-primary flex-row items-center justify-center gap-2 shadow-md mb-4"
        >
          <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" />
          <Text className="text-white font-dmsans-bold text-base tracking-wide">
            {isSaving ? 'Menyimpan...' : t('common.save')}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
