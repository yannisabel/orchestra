export const commonColors = {
  black: '#000000',
  white: '#FFFFFF',
  grey: '#CCCCCC',
  blue: '#D2E2EE',
  orange: '#FF811F',
}

export const blackPalette = [
  {
    black: {
      0: commonColors.black,
      V0T10: `rgba(${commonColors.black}, .10)`,
      V0T25: `rgba(${commonColors.black}, .25)`,
      V0T50: `rgba(${commonColors.black}, .50)`,
      V0T75: `rgba(${commonColors.black}, .75)`,
      V0T90: `rgba(${commonColors.black}, .90)`,
    }
  }
] as const

export const whitePalette = {
  0: commonColors.white,
  10: '#F1F1F1',
  V0T75: `rgba(${commonColors.white}, .75)`,
}

export const greyPalette = {
  0: commonColors.grey,
  10: '#D1D1D1',
  50: '#919191',
  60: '#7C7C7C',
  100: '#333333',
  V0T2: `rgba(${commonColors.grey}, .2)`,
}

export const bluePalette = {
  0: commonColors.blue,
  10: '#6BBEFF',
  20: '#3A73A0',
  30: '#264B68',
  40: '#404555',
  50: '#282933',
  100: '#212228',
}

export const orangePalette = {
  0: commonColors.orange,
  10: '#EB6700',
}

export type ColorType = keyof typeof blackPalette

let colorArray: Array<any> = []
colorArray.push(Object.values(blackPalette), Object.values(whitePalette), Object.values(greyPalette), Object.values(bluePalette), Object.values(orangePalette))
export const allColors = colorArray

export const light = {
  primaryBgColor: whitePalette[10],
  textColor: greyPalette[100],
  titleColor: bluePalette[30],
  linkColor: bluePalette[30],
  accentColor: bluePalette[10],
  cardBgColor: whitePalette[0],
  cardTitleColor: bluePalette[10],
  discreetColor: greyPalette[60],
  whiteStickerColor: greyPalette[0],
  codeBgColor: bluePalette[0],
  codeColor: bluePalette[30],
  dividerColor: greyPalette[0],
  footerLinkColor: whitePalette[0],
}

export const dark = {
  primaryBgColor: bluePalette[100],
  textColor: whitePalette[10],
  titleColor: bluePalette[10],
  linkColor: bluePalette[10],
  accentColor: bluePalette[10],
  cardBgColor: bluePalette[50],
  cardTitleColor: whitePalette[10],
  discreetColor: greyPalette[50],
  whiteStickerColor: bluePalette[30],
  codeBgColor: bluePalette[30],
  codeColor: whitePalette[0],
  dividerColor: bluePalette[40],
  footerLinkColor: whitePalette[0],
}


