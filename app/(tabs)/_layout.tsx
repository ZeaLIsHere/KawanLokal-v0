import { View, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { AppIcon } from '@/components/AppIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#1D4ED8',
        tabBarInactiveTintColor: '#8A827A',
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 28 : 20,
          left: 20,
          right: 20,
          height: 64,
          borderRadius: 32,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.8)',
          paddingBottom: 0,
          paddingTop: 0,
          elevation: 10,
          shadowColor: '#D1C8BC',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.4,
          shadowRadius: 20,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ focused, color }) => (
            <View className="items-center justify-center py-1">
              <AppIcon name="home" size={24} color={color} />
              {focused && (
                <View className="w-1.5 h-1.5 rounded-full bg-primary mt-1" />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Jelajah',
          tabBarIcon: ({ focused, color }) => (
            <View className="items-center justify-center py-1">
              <AppIcon name="map" size={24} color={color} />
              {focused && (
                <View className="w-1.5 h-1.5 rounded-full bg-primary mt-1" />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Pesanan',
          tabBarIcon: ({ focused, color }) => (
            <View className="items-center justify-center py-1">
              <AppIcon name="ticket" size={24} color={color} />
              {focused && (
                <View className="w-1.5 h-1.5 rounded-full bg-primary mt-1" />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
