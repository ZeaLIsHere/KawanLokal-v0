import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  PressableProps,
} from 'react-native';
import * as Haptics from 'expo-haptics';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  className?: string;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  onPress,
  className = '',
  ...props
}: ButtonProps) {
  const handlePress = (e: any) => {
    if (disabled || loading) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    onPress?.(e);
  };

  const baseStyles = 'items-center justify-center rounded-xl flex-row';

  const variantStyles = {
    primary: 'bg-ulos-red active:bg-ulos-redDark',
    secondary: 'bg-ulos-black active:bg-ulos-charcoal',
    outline: 'border border-stone-300 bg-transparent active:bg-stone-100',
    ghost: 'bg-transparent active:bg-stone-100',
  }[variant];

  const sizeStyles = {
    sm: 'px-3 py-2 min-h-[36px]',
    md: 'px-4 py-3 min-h-[44px]',
    lg: 'px-6 py-4 min-h-[52px]',
  }[size];

  const textVariantStyles = {
    primary: 'text-white font-semibold',
    secondary: 'text-white font-semibold',
    outline: 'text-stone-800 font-semibold',
    ghost: 'text-stone-800 font-semibold',
  }[variant];

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${
        disabled ? 'opacity-50' : ''
      } ${className}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? '#1C1917' : '#FFFFFF'}
          size="small"
        />
      ) : (
        <Text className={textVariantStyles}>{title}</Text>
      )}
    </Pressable>
  );
}
