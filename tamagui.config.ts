import { radius, size, space, zIndex } from '@tamagui/themes'
import { createTamagui, createTokens } from 'tamagui'
import { config as TConfig } from '@tamagui/config'

const tokens = createTokens({
  size,
  space,
  zIndex,
  radius,
  color: {
    purple200: '#ddd6fe',
    purple400: '#a78bfa',
    purple500: '#8b5cf6',
    purple600: '#7c3aed',
    slate300: '#CBD5E1',
    red500: '#EF4444',
    red400: '#F87171 ',
    green300: '#86EFAC ',
    green500: '#22C55E  ',
    green700: '#15803D ',
    background: '#FFF',
    black: '#000',
    white: '#FFF',
    text: '#0F172A',
    textThin: '#475569',
    textShallow: '#94A3B8',
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
    light_Button: {
      background: tokens.color.purple500,
      backgroundPress: tokens.color.purple600, // darker background on press
      backgroundHover: tokens.color.purple400, // lighter background on hover
      color: tokens.color.white,
    },
  },
})

export type Conf = typeof config
declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TamaguiCustomConfig extends Conf {}
}
export default config
