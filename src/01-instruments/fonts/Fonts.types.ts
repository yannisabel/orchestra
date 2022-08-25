import { fontFamilies, fontSizes, fontWeights } from "./Fonts"

export type FontFamilyToken = keyof typeof fontFamilies

export type FontFamily = Record<FontFamilyToken, string>

export type FontSizeToken = keyof typeof fontSizes

export type FontSize = Record<FontSizeToken, string>

export type FontWeightToken = keyof typeof fontWeights

export type FontWeight = Record<FontWeightToken, string>
