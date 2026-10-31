import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { AppIcon } from '@/components/AppIcon';
import { PHOTO_COVERS } from '@/constants/localPhotos';

interface EventTicketItem {
  id: string;
  title: string;
  category: string;
  district: string;
  venue: string;
  dateWIB: string;
  price: string;
  quotaLeft: number;
  image: ImageSourcePropType;
  rating: number;
}

const SEED_TICKETS: EventTicketItem[] = [
  {
    id: 't-1',
    title: 'Tiket Masuk Pesta Danau Toba 2026',
    category: 'Festival',
    district: 'Simalungun',
    venue: 'Pantai Bebas Parapat',
    dateWIB: '2 Nov 2026 • 10.00 WIB',
    price: 'Rp 50.000',
    quotaLeft: 120,
    image: PHOTO_COVERS.parapat,
    rating: 4.9,
  },
  {
    id: 't-2',
    title: 'Pagelaran Akbar Gondang Sabangunan',
    category: 'Musik Adat',
    district: 'Samosir',
    venue: 'Open Stage Tuk-Tuk Siadong',
    dateWIB: '8 Nov 2026 • 19.30 WIB',
    price: 'Rp 75.000',
    quotaLeft: 45,
    image: PHOTO_COVERS.gondang,
    rating: 4.8,
  },
  {
    id: 't-3',
    title: 'Upacara Sakral Mangongkal Holi (Akses Wisatawan)',
    category: 'Upacara Adat',
    district: 'Toba',
    venue: 'Kompleks Makam Leluhur Balige',
    dateWIB: '15 Nov 2026 • 09.00 WIB',
    price: 'Rp 100.000',
    quotaLeft: 20,
    image: PHOTO_COVERS.desaTomok,
    rating: 4.95,
  },
  {
    id: 't-4',
    title: 'Festival Kuliner Tradisional Toba & Naniura',
    category: 'Kuliner',
    district: 'Humbang Hasundutan',
    venue: 'Geosite Sipinsur',
    dateWIB: '22 Nov 2026 • 11.00 WIB',
    price: 'Rp 40.000',
    quotaLeft: 85,
    image: PHOTO_COVERS.tobaCulinary,
    rating: 4.7,
  },
];

const CATEGORY_CHIPS = ['Semua', 'Festival', 'Upacara Adat', 'Musik Adat', 'Kuliner'];

export default function TicketsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredTickets = useMemo(() => {
    return SEED_TICKETS.filter((t) => {
      const matchCat =
        selectedCategory === 'Semua' || t.category === selectedCategory;
      const matchQuery =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.venue.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <SafeAreaView className="flex-1 bg-surface-canvas" edges={['top']}>
      {/* Top Header */}
      <View className="flex-row items-center justify-between px-4 py-2.5 bg-surface-card border-b border-card-border/60 z-20">
        <Pressable
          accessibilityLabel="Kembali"
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center active:bg-stone-100 active:opacity-80"
        >
          <AppIcon name="arrow-left" size={22} />
        </Pressable>

        <Text className="text-lg font-bold text-on-surface tracking-tight">
          Tiket Acara Budaya
        </Text>

        <Pressable
          accessibilityLabel="Buka Kalender"
          onPress={() => router.push('/calendar')}
          className="w-10 h-10 rounded-full items-center justify-center active:bg-stone-100 active:opacity-80"
        >
          <AppIcon name="calendar" size={20} />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-3"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View className="mb-3">
          <View className="flex-row items-center w-full bg-surface-card rounded-2xl border border-card-border shadow-sm px-3.5 h-12">
            <AppIcon name="search" size={20} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Cari festival, upacara, lokasi..."
              placeholderTextColor="#737686"
              className="flex-1 ml-2.5 text-sm font-medium text-on-surface h-full"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')} className="p-1">
                <Ionicons name="close-circle" size={18} color="#737686" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Filter Chips */}
        <View className="mb-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {CATEGORY_CHIPS.map((chip) => {
              const isSelected = selectedCategory === chip;
              return (
                <Pressable
                  key={chip}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                    setSelectedCategory(chip);
                  }}
                  className={`mr-2 px-4 py-2 rounded-full border shadow-sm active:opacity-80 ${
                    isSelected
                      ? 'bg-ulos-red border-ulos-red'
                      : 'bg-surface-card border-card-border'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      isSelected ? 'text-white' : 'text-on-surface'
                    }`}
                  >
                    {chip}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* List of Tickets */}
        <View className="gap-3.5">
          {filteredTickets.map((ticket) => (
            <View
              key={ticket.id}
              className="bg-surface-card rounded-2xl border border-card-border overflow-hidden shadow-sm"
            >
              <View className="relative w-full h-40 bg-stone-100">
                <Image
                  source={ticket.image}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute top-3 left-3 bg-ulos-red px-2.5 py-1 rounded-full">
                  <Text className="text-[10px] font-bold text-white tracking-wide">
                    {ticket.category}
                  </Text>
                </View>
                <View className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full flex-row items-center gap-1">
                  <AppIcon name="star" size={13} />
                  <Text className="text-xs font-bold text-on-surface">{ticket.rating}</Text>
                </View>
              </View>

              <View className="p-4">
                <Text className="text-base font-bold text-on-surface leading-snug">
                  {ticket.title}
                </Text>
                <View className="flex-row items-center gap-1.5 mt-1.5">
                  <AppIcon name="location-pin" size={13} />
                  <Text className="text-xs text-secondary">
                    {ticket.venue}, {ticket.district}
                  </Text>
                </View>

                <View className="flex-row items-center gap-1.5 mt-1">
                  <AppIcon name="calendar" size={13} />
                  <Text className="text-xs font-medium text-stone-700">
                    {ticket.dateWIB}
                  </Text>
                </View>

                <View className="mt-3.5 pt-3 border-t border-card-border flex-row items-center justify-between">
                  <View>
                    <Text className="text-[11px] text-secondary">
                      Sisa Kuota: <Text className="font-bold text-stone-800">{ticket.quotaLeft} tiket</Text>
                    </Text>
                    <Text className="text-base font-extrabold text-ulos-red mt-0.5">
                      {ticket.price}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                      router.push('/booking/new');
                    }}
                    className="px-4 py-2 bg-ulos-red active:bg-ulos-redDark rounded-xl flex-row items-center gap-1.5 shadow-sm active:opacity-90"
                  >
                    <AppIcon name="ticket" size={16} color="#FFFFFF" />
                    <Text className="text-xs font-bold text-white">Beli Tiket</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}

          {filteredTickets.length === 0 && (
            <View className="items-center justify-center py-12 px-6">
              <View className="w-14 h-14 rounded-2xl bg-stone-100 items-center justify-center mb-3">
                <AppIcon name="ticket" size={28} />
              </View>
              <Text className="text-sm font-bold text-on-surface">Tidak ada tiket ditemukan</Text>
              <Text className="text-xs text-secondary text-center mt-1">
                Coba gunakan kata kunci pencarian atau kategori lain.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
