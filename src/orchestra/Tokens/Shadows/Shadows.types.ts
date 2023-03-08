import { shadows } from './Shadows'

export type ShadowToken = keyof typeof shadows

export type Shadows = Record<ShadowToken, string>
