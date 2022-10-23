import { radius } from "./radius"

export type RadiusToken = keyof typeof radius

export type Radius = Record<RadiusToken, string>
