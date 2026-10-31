import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_PROFILE_KEY = '@user_profile_data';

export interface UserProfileData {
  avatarUri: string;
  fullName: string;
  email: string;
  phone: string;
  origin: string;
  bio: string;
}

export const DEFAULT_PROFILE: UserProfileData = {
  avatarUri: '',
  fullName: 'Wisatawan KawanLokal',
  email: 'wisatawan@kawanlokal.id',
  phone: '+62 812-3456-7890',
  origin: 'Medan, Indonesia',
  bio: 'Pecinta kebudayaan Batak dan panorama alam Danau Toba.',
};

/**
 * Mengambil data profil pengguna yang tersimpan di perangkat lokal.
 * Jika belum ada data, mengembalikan data default bawaan.
 */
export async function getProfile(): Promise<UserProfileData> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_PROFILE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
    };
  } catch (error) {
    return DEFAULT_PROFILE;
  }
}

/**
 * Menyimpan pembaruan data profil ke penyimpanan lokal perangkat (AsyncStorage).
 */
export async function saveProfile(updates: Partial<UserProfileData>): Promise<UserProfileData> {
  try {
    const current = await getProfile();
    const updated: UserProfileData = {
      ...current,
      ...updates,
    };
    await AsyncStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    return DEFAULT_PROFILE;
  }
}
