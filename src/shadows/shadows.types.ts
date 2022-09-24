import { shadows } from './shadows'

export type ShadowToken = keyof typeof shadows

export type Shadows = Record<ShadowToken, string>
