import React from 'react';
import { View, ViewStyle, StyleProp, ColorValue } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { SVG_ICONS, SvgIconName } from '@/constants/svgIcons';

interface AppIconProps {
  name: SvgIconName;
  size?: number;
  color?: ColorValue | string;
  style?: StyleProp<ViewStyle>;
}

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 24,
  color,
  style,
}) => {
  const baseXml = SVG_ICONS[name];
  if (!baseXml) return null;

  let xml: string = baseXml;
  if (color && typeof color === 'string') {
    // Sesuaikan warna aksen SVG jika properti color dioper berupa string hex/rgb
    xml = xml.replace(/#2160D5/g, color);
  }

  return (
    <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      <SvgXml xml={xml} width={size} height={size} />
    </View>
  );
};

export default AppIcon;
