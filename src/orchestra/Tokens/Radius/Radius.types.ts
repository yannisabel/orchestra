import { radius } from "./Radius"

export type RadiusToken = keyof typeof radius

export type Radius = Record<RadiusToken, string>
