import { ColorToken } from "@instruments/colors"
import { FontFamilyToken } from "@instruments/fonts"
import { RadiusToken } from "@instruments/radius"
import { ShadowsToken } from "@instruments/shadows"
import { SpacesToken } from "@instruments/spaces"
import { CSSProperties, ElementType, ReactNode } from "react"

export interface BoxProps extends CSSProperties {
  backgroundColor?: ColorToken
  color?: ColorToken
  margin?: SpacesToken
  marginLeft?: SpacesToken
  marginTop?: SpacesToken
  marginRight?: SpacesToken
  marginBottom?: SpacesToken
  borderRadius?: RadiusToken
  borderTopLeftRadius?: RadiusToken
  borderTopRightRadius?: RadiusToken
  borderBottomRightRadius?: RadiusToken
  borderBottomLeftRadius?: RadiusToken
  padding?: SpacesToken
  paddingLeft?: SpacesToken
  paddingTop?: SpacesToken
  paddingRight?: SpacesToken
  paddingBottom?: SpacesToken
  shadows?: ShadowsToken
  fontFamily?: FontFamilyToken
  translate?: any
  renderAs?: ElementType<any>
  children: ReactNode
}
