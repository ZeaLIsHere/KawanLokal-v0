import React, { useEffect, useRef } from 'react';
import { Animated, ViewProps } from 'react-native';

interface SkeletonProps extends ViewProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
}

export function Skeleton({
  className = '',
  width,
  height,
  borderRadius = 8,
  style,
  ...props
}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      className={`bg-stone-200 ${className}`}
      style={[
        {
          opacity,
          width: width as any,
          height: height as any,
          borderRadius,
        },
        style,
      ]}
      {...props}
    />
  );
}
