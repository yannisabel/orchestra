import { ColorToken } from '../Tokens/Colors'
import { FontFamilyToken } from '../Tokens/fonts'
import { RadiusToken } from '../Tokens/Radius'
import { ShadowToken } from '../Tokens/Shadows'
import { SpaceToken } from '../Tokens/Spaces'
import { CSSProperties, ElementType, ReactNode } from 'react'

export interface BoxProps extends CSSProperties {
  backgroundColor?: ColorToken | 'transparent'
  color?: ColorToken
  margin?: SpaceToken | string
  marginLeft?: SpaceToken | string
  marginTop?: SpaceToken | string
  marginRight?: SpaceToken | string
  marginBottom?: SpaceToken | string
  borderRadius?: RadiusToken
  borderTopLeftRadius?: RadiusToken
  borderTopRightRadius?: RadiusToken
  borderBottomRightRadius?: RadiusToken
  borderBottomLeftRadius?: RadiusToken
  padding?: SpaceToken
  paddingLeft?: SpaceToken
  paddingTop?: SpaceToken
  paddingRight?: SpaceToken
  paddingBottom?: SpaceToken
  shadows?: ShadowToken
  fontFamily?: FontFamilyToken
  translate?: any
  renderAs?: ElementType<any>
  children?: ReactNode
  className?: string
}
