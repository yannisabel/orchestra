import { spaces } from "./Spaces"

export type SpaceToken = keyof typeof spaces

export type Spaces = Record<SpaceToken, string>
