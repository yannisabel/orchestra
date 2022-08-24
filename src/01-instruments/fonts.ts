export const fontFamilies = {
  'fontDefault': 'Roboto, Arial, Helvetica, Verdana, sans-serif',
  'openSans': "'Open Sans', sans-serif'",
  'mulish': 'Mulish, Arial, Helvetica, Verdana, sans-serif',
}

export type FontFamilyToken = keyof typeof fontFamilies

export type FontFamily = Record<FontFamilyToken, string>

export const fontSizes = {
  'fs-1': '12px',
  'fs-2': '16px',
  'fs-3': '20px',
  'fs-4': '24px',
  'fs-5': '28px',
  'fs-6': '32px',
  'fs-7': '36px',
  'fs-8': '40px',
  'fs-9': '44px',
  'fs-10': '48px',
  'fs-11': '52px',
  'fs-12': '56px',
  'fs-13': '60px',
  'fs-14': '64px',
}

export type FontSizeToken = keyof typeof fontSizes

export type FontSize = Record<FontSizeToken, string>

export const fontWeights = {
  'fw-regular': '400',
  'fw-medium': '600',
  'fw-bold': '700',
  'fw-extraBold': '800',
  'fw-black': '900',
}

export type FontWeightsToken = keyof typeof fontWeights

export type FontWeight = Record<FontWeightsToken, string>
