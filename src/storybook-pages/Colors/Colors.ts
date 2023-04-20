export const blackPalette = {
  'black-0': 'rgba(0, 0, 0, 1)',
  'black-V0--T10': 'rgba(0, 0, 0, 0.1)',
  'black-V0--T25': 'rgba(0, 0, 0, 0.25)',
  'black-V0--T50': 'rgba(0, 0, 0, 0.5)',
  'black-V0--T75': 'rgba(0, 0, 0, 0.75)',
  'black-V0--T90': 'rgba(0, 0, 0, 0.9)',
}

export const whitePalette = {
  'white-0': 'rgba(255, 255, 255, 1)',
  'white-10': 'rgba(241, 241, 241, 1)',
  'white-V0--T75': 'rgba(255, 255, 255, 0.75)',
}

export const greyPalette = {
  'grey-0': 'rgba(209, 209, 209, 1)',
  'grey-10': 'rgba(204, 204, 204, 1)',
  'grey-50': 'rgba(145, 145, 145, 1)',
  'grey-60': 'rgba(124, 124, 124, 1)',
  'grey-100': 'rgba(51, 51, 51, 1)',
  'grey-V0--T2': 'rgba(209, 209, 209, .2)',
}

export const bluePalette = {
  'blue-0': 'rgba(210, 226, 238, 1)',
  'blue-10': 'rgba(107, 190, 255, 1)',
  'blue-20': 'rgba(58, 115, 160, 1)',
  'blue-30': 'rgba(38, 75, 104), 1)',
  'blue-40': 'rgba(64, 69, 85, 1)',
  'blue-50': 'rgba(40, 41, 51, 1)',
  'blue-100': 'rgba(33, 34, 40, 1)',
}

export const orangePalette = {
  'orange-0': 'rgba(255, 129, 31, 1)',
  'orange-10': 'rgba(235, 103, 1)',
}

export const colors = {...blackPalette, ...whitePalette, ...greyPalette, ...bluePalette, ...orangePalette}

export const colorLightTheme = {
  primaryBgColor: 'white-10',
  textColor: 'grey-100',
  titleColor: 'blue-30',
  linkColor: 'blue-30',
  accentColor: 'blue-10',
  cardBgColor: 'white-0',
  cardTitleColor: 'blue-10',
  discreetColor: 'grey-60',
  stickerBgColor: 'white-0',
  codeBgColor: 'blue-0',
  codeColor: 'blue-30',
  dividerColor: 'grey-0',
  footerLinkColor: 'white-0',
}

export const colorDarkTheme = {
  primaryBgColor: 'blue-100',
  textColor: 'white-0',
  titleColor: 'blue-10',
  linkColor: 'blue-10',
  accentColor: 'blue-10',
  cardBgColor: 'blue-50',
  cardTitleColor: 'white-10',
  discreetColor: 'grey-50',
  stickerBgColor: 'blue-40',
  codeBgColor: 'blue-30',
  codeColor: 'white-0',
  dividerColor: 'blue-40',
  footerLinkColor: 'white-0',
}
