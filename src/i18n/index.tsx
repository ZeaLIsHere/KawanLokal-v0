import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Locale, TRANSLATIONS, TranslationKey } from './translations';

const STORAGE_LANG_KEY = '@app_language';

interface I18nContextType {
  locale: Locale;
  setLocale: (lang: Locale) => Promise<void>;
  toggleLocale: () => Promise<void>;
  t: (key: TranslationKey, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  setLocale: async () => {},
  toggleLocale: async () => {},
  t: (key: TranslationKey) => key,
});

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Aplikasi secara default menggunakan Bahasa Inggris ('en') untuk turis internasional
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    // Membaca preferensi bahasa pengguna yang tersimpan di perangkat
    AsyncStorage.getItem(STORAGE_LANG_KEY)
      .then((saved) => {
        if (saved === 'id' || saved === 'en') {
          setLocaleState(saved);
        }
      })
      .catch(() => {});
  }, []);

  const setLocale = async (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      await AsyncStorage.setItem(STORAGE_LANG_KEY, newLocale);
    } catch {}
  };

  const toggleLocale = async () => {
    const nextLocale: Locale = locale === 'en' ? 'id' : 'en';
    await setLocale(nextLocale);
  };

  const t = (key: TranslationKey, fallback?: string): string => {
    const dict = TRANSLATIONS[locale] || TRANSLATIONS.en;
    if (key in dict) {
      return (dict as Record<string, string>)[key];
    }
    return fallback || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => useContext(I18nContext);
export * from './translations';
