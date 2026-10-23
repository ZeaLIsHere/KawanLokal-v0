import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <View
      className={`bg-white rounded-2xl border border-stone-200/80 p-4 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
