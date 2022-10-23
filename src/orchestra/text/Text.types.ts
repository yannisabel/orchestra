import { FontFamilyToken, FontSizeToken, FontWeightToken } from '../fonts'
import { ReactNode } from 'react'
import { BoxProps } from '../box'

export interface TextProps extends BoxProps {
  children: ReactNode
  fontFamily?: FontFamilyToken
  fontSize?: FontSizeToken
  fontWeight?: FontWeightToken
}
