import { ColorToken } from '../colors'
import { FontFamilyToken, FontSizeToken, FontWeightToken } from '../fonts'
import { CSSProperties, ElementType, ReactNode } from 'react'
import { BoxProps } from '../layout'

export interface TextProps extends BoxProps {
  children: ReactNode
  fontFamily?: FontFamilyToken
  fontSize?: FontSizeToken
  fontWeight?: FontWeightToken
}
