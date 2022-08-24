import { ColorToken } from "@instruments/colors"
import { FontFamilyToken } from "@instruments/fonts"
import { RadiusToken } from "@instruments/radius"
import { ShadowsToken } from "@instruments/shadows"
import { CSSProperties, ElementType, ReactNode } from "react"

export interface BoxProps extends CSSProperties {
  backgroundColor?: ColorToken
  color?: ColorToken
  borderRadius?: RadiusToken
  borderTopLeft?: RadiusToken
  borderTopRight?: RadiusToken
  borderBottomRight?: RadiusToken
  borderBottomLeft?: RadiusToken
  shadows?: ShadowsToken
  fontFamily?: FontFamilyToken
  translate?: any
  renderAs?: ElementType<any>
  children: ReactNode
}
