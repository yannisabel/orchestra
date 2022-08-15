import { ColorType } from "@instruments/colors"
import { CSSProperties, ElementType, ReactNode } from "react"

export type BoxOptions = CSSProperties & {
  backgroundColor?: ColorType
}

export type BoxProps = BoxOptions & {
  renderAs?: ElementType
  children: ReactNode
}
