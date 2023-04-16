import { blackPalette, bluePalette, greyPalette, orangePalette, whitePalette } from './Colors'

export type BlackPaletteType = keyof typeof blackPalette

export type WhitePaletteType = keyof typeof whitePalette

export type GreyPaletteType = keyof typeof greyPalette


export type BluePaletteType = keyof typeof bluePalette

export type OrangePaletteType = keyof typeof orangePalette

export type ColorToken = BlackPaletteType | WhitePaletteType | GreyPaletteType | BluePaletteType | OrangePaletteType

export type Colors = Record<ColorToken, string>
