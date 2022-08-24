export const commonColors = {
  'black': '0, 0%, 0%',
  'white': '0, 0%, 100%',
  'grey': '0, 0%, 80%',
  'blue': '206, 46%, 28%',
  'orange': '26, 100%, 56%',
}

export const blackPalette = {
  'black-0': `hsla(${commonColors.black}, 1)`,
  'black-V0--T10': 'hsla(0, 0%, 0%, 0.1)',
  'black-V0--T25': 'hsla(0, 0%, 0%, 0.25)',
  'black-V0--T50': 'hsla(0, 0%, 0%, 0.5)',
  'black-V0--T75': 'hsla(0, 0%, 0%, 0.75)',
  'black-V0--T90': 'hsla(0, 0%, 0%, 0.9)',
}

export type BlackPaletteType = keyof typeof blackPalette

export const whitePalette = {
  'white-0': `hsla(${commonColors.white}, 1)`,
  'white-10': 'hsla(0,0%,95%,1)',
  'white-V0--T75': `hsla(${commonColors.white}, 0.75)`,
}

export type WhitePaletteType = keyof typeof whitePalette

export const greyPalette = {
  'grey-0': `hsla(${commonColors.grey}, 1)`,
  'grey-10': 'hsla(0, 0%, 82%, 1)',
  'grey-50': 'hsla(0, 0%, 57%, 1)',
  'grey-60': 'hsla(0, 0%, 49%, 1)',
  'grey-100': 'hsla(0, 0%, 20%, 1)',
  'grey-V0--T2': `hsla(${commonColors.white}, 0.2)`,
}

export type GreyPaletteType = keyof typeof greyPalette

export const bluePalette = {
  'blue-0': 'hsla(206, 45%, 88%, 1)',
  'blue-10': 'hsla(206, 100%, 71%, 1)',
  'blue-20': 'hsla(206, 47%, 43%, 1)',
  'blue-30': 'hsla(206, 46%, 28%, 1)',
  'blue-40': 'hsla(226, 14%, 29%, 1)',
  'blue-50': 'hsla(235, 12%, 18%, 1)',
  'blue-100': 'hsla(231, 10%, 14%, 1)',
}

export type BluePaletteType = keyof typeof bluePalette

export const orangePalette = {
  'orange-0': `hsla(${commonColors.orange}, 1)`,
  'orange-10': 'hsla(26, 100%, 46%, 1)',
}

export type OrangePaletteType = keyof typeof orangePalette

export type ColorToken = BlackPaletteType | WhitePaletteType | GreyPaletteType | BluePaletteType | OrangePaletteType

export const allColors = {...blackPalette, ...whitePalette, ...greyPalette, ...bluePalette, ...orangePalette}

export type Colors = Record<ColorToken, string>

export const light = {
  primaryBgColor: whitePalette['white-10'],
  textColor: greyPalette['grey-100'],
  titleColor: bluePalette['blue-30'],
  linkColor: bluePalette['blue-30'],
  accentColor: bluePalette['blue-10'],
  cardBgColor: whitePalette['white-0'],
  cardTitleColor: bluePalette['blue-10'],
  discreetColor: greyPalette['grey-60'],
  whiteStickerColor: greyPalette['grey-0'],
  codeBgColor: bluePalette['blue-0'],
  codeColor: bluePalette['blue-30'],
  dividerColor: greyPalette['grey-0'],
  footerLinkColor: whitePalette['white-0'],
}

export const dark = {
  primaryBgColor: bluePalette['blue-100'],
  textColor: whitePalette['white-10'],
  titleColor: bluePalette['blue-10'],
  linkColor: bluePalette['blue-10'],
  accentColor: bluePalette['blue-10'],
  cardBgColor: bluePalette['blue-50'],
  cardTitleColor: whitePalette['white-10'],
  discreetColor: greyPalette['grey-50'],
  whiteStickerColor: bluePalette['blue-30'],
  codeBgColor: bluePalette['blue-30'],
  codeColor: whitePalette['white-0'],
  dividerColor: bluePalette['blue-40'],
  footerLinkColor: whitePalette['white-0'],
}


