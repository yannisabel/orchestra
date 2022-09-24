import { ColorToken } from '../colors'
import { FontFamilyToken, FontSizeToken, FontWeightToken } from '../fonts'
import { CSSProperties, ElementType, ReactNode } from 'react'

export interface TextProps extends CSSProperties {
  backgroundColor?: ColorToken
  translate?: any
  renderAs?: ElementType<any>
  children: ReactNode
  fontFamily?: FontFamilyToken
  fontSize?: FontSizeToken
  fontWeight?: FontWeightToken
  color?: ColorToken
}
