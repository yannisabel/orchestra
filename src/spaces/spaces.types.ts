import { spaces } from "./spaces"

export type SpaceToken = keyof typeof spaces

export type Spaces = Record<SpaceToken, string>
