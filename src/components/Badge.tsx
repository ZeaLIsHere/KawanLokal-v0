import React from 'react';
import { View, Text } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'ulos';
  className?: string;
}

export function Badge({ label, variant = 'default', className = '' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-stone-100 text-stone-700',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
    ulos: 'bg-red-50 text-ulos-red border border-red-200',
  }[variant];

  return (
    <View className={`self-start px-2.5 py-1 rounded-full ${variantStyles.split(' ')[0]} ${className}`}>
      <Text className={`text-xs font-medium ${variantStyles.split(' ').slice(1).join(' ')}`}>
        {label}
      </Text>
    </View>
  );
}
