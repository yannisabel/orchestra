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
  'grey-70': 'rgba(110, 110, 110, 1)',
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
  bgMainColor: 'white-10',
  bgSmallComponentColor: 'grey-0',
  bgOverlayComponentColor: 'white-0',
  bgDecorationColor: 'grey-0',
  bgCodeColor: 'blue-0',
  bghostButtonHoverColor: 'black-V0--T10',
  fgMainColor: 'grey-100',
  fgAccentColor: 'blue-30',
  fgLinkColor: 'blue-30',
  fgEmphasisColor: 'blue-20',
  fgSubtleColor: 'grey-70',
  fgCodeColor: 'blue-30',
}

export const colorDarkTheme = {
  bgMainColor: 'blue-100',
  bgSmallComponentColor: 'blue-30',
  bgOverlayComponentColor: 'blue-50',
  bgDecorationColor: 'blue-40',
  bgCodeColor: 'blue-30',
  bghostButtonHoverColor: 'grey-V0--T2',
  fgMainColor: 'white-10',
  fgAccentColor: 'blue-20',
  fgLinkColor: 'blue-10',
  fgEmphasisColor: 'white-10',
  fgSubtleColor: 'grey-50',
  fgCodeColor: 'white-0',
}
