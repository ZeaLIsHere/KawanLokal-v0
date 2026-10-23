import { Tabs } from 'expo-router';
import { ULOS_COLORS } from '@/constants/theme';
import { AppIcon } from '@/components/AppIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ULOS_COLORS.red,
        tabBarInactiveTintColor: '#505f76',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color }) => (
            <AppIcon name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Jelajah',
          tabBarIcon: ({ color }) => (
            <AppIcon name="map" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Pesanan',
          tabBarIcon: ({ color }) => (
            <AppIcon name="ticket" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
