export const ULOS_COLORS = {
  red: '#1D4ED8', // Warna utama aplikasi (Royal Blue Toba)
  redDark: '#1E40AF',
  redLight: '#3B82F6',
  black: '#1C1917',
  dark: '#0F0E0D',
  charcoal: '#292524',
  cream: '#FAF7F2',
  white: '#FFFFFF',
  gold: '#D97706',
  goldLight: '#FBBF24',
  grayBorder: '#E7E5E4',
  grayMuted: '#78716C',
} as const;

export const TOBA_DISTRICTS = [
  'Toba',
  'Samosir',
  'Simalungun',
  'Tapanuli Utara',
  'Humbang Hasundutan',
  'Karo',
  'Dairi',
] as const;

export type TobaDistrict = typeof TOBA_DISTRICTS[number];
