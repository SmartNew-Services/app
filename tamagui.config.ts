import { radius, size, space, zIndex } from '@tamagui/themes'
import { createFont, createTamagui, createTokens } from 'tamagui'
import { config as TConfig } from '@tamagui/config'

const tokens = createTokens({
  size,
  space,
  zIndex,
  radius,
  color: {
    purple100: '#ede9fe',
    purple300: '#c4b5fd',
    purple200: '#ddd6fe',
    purple400: '#a78bfa',
    purple500: '#8b5cf6',
    purple600: '#7c3aed',
    slate100: '#F1F5F9',
    slate300: '#CBD5E1',
    slate700: '#334155',
    slate900: '#0f172a',
    zinc500: '#71717a',
    red200: '#fecaca',
    red500: '#EF4444',
    red600: '#dc2626',
    red400: '#F87171',
    green200: '#bbf7d0',
    green300: '#86EFAC',
    green500: '#22c55e',
    green600: '#16a34a',
    green700: '#15803D',
    background: '#FFF',
    black: '#000',
    white: '#FFF',
    text: '#0F172A',
    textThin: '#475569',
    textShallow: '#94A3B8',
  },
})

const interFont = createFont({
  family: 'Inter, sans-serif',
  size: {
    1: 12,
    2: 16,
    3: 20,
    4: 24,
    // ...
  },
  lineHeight: {
    1: 17,
    2: 22,
    3: 25,
    // ...
  },
  weight: {
    4: '300',
    6: '600',
  },
  letterSpacing: {
    4: 0,
    8: -1,
  },
  // for native only, alternate family based on weight/style
  face: {
    // pass in weights as keys
    700: { normal: 'InterBold', italic: 'InterBold-Italic' },
    800: { normal: 'InterBold', italic: 'InterBold-Italic' },
    900: { normal: 'InterBold', italic: 'InterBold-Italic' },
  },
})

const config = createTamagui({
  ...TConfig,
  tokens,
  themes: {
    light: {
      purple200: tokens.color.purple200,
      purple400: tokens.color.purple400,
      purple500: tokens.color.purple500,
      purple600: tokens.color.purple600,
      slate300: tokens.color.slate300,
      red500: tokens.color.red500,
      red400: tokens.color.red400,
      green300: tokens.color.green300,
      green500: tokens.color.green500,
      green700: tokens.color.green700,
      background: tokens.color.background,
      black: tokens.color.black,
      white: tokens.color.white,
      text: tokens.color.text,
      textThin: tokens.color.textThin,
      textShallow: tokens.color.textShallow,
    },

    'button-primary': {
      background: tokens.color.purple500,
      backgroundPress: tokens.color.purple600, // darker background on press
      backgroundHover: tokens.color.purple400, // lighter background on hover
      color: tokens.color.white,
    },

    'button-secondary': {
      background: tokens.color.purple200,
      backgroundPress: tokens.color.purple300, // darker background on press
      backgroundHover: tokens.color.purple100, // lighter background on hover
      color: tokens.color.purple500,
    },

    'button-test': {
      background: tokens.color.green500,
      backgroundPress: tokens.color.green600, // darker background on press
      backgroundHover: tokens.color.green300, // lighter background on hover
      color: tokens.color.white,
    },

    'button-red': {
      background: tokens.color.red500,
      backgroundPress: tokens.color.red600, // darker background on press
      // backgroundHover: tokens.color.purple100, // lighter background on hover
      color: tokens.color.white,
    },
  },
  fonts: {
    body: interFont,
  },
})

export type Conf = typeof config
declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TamaguiCustomConfig extends Conf {}
}
export default config
