import { StyleSheet, Text, type TextProps, TextStyle, StyleProp } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

const fontWeightMap: Record<string, string> = {
  'normal': 'NexaRound-Regular',
  '400': 'NexaRound-Regular',
  '500': 'NexaRound-Bold',
  '600': 'NexaRound-Bold',
  'bold': 'NexaRound-Bold',
  '700': 'NexaRound-Bold',
  '800': 'NexaRound-ExtraBold',
  '900': 'NexaRound-Heavy',
};

function resolveFont(style: StyleProp<TextStyle>): { fontFamily: string; restStyle: StyleProp<TextStyle> } {
  const flatStyle = StyleSheet.flatten(style) || {};
  const { fontWeight, ...rest } = flatStyle;
  const fontFamily = fontWeightMap[fontWeight as string] || 'NexaRound-Regular';
  return { fontFamily, restStyle: rest };
}

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const typeStyle = styles[type];
  const { fontFamily, restStyle } = resolveFont([typeStyle, style]);

  return (
    <Text
      style={[
        { color, fontFamily },
        restStyle,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
