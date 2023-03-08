import { FontFamilyToken, FontSizeToken, FontWeightToken } from '../Tokens/fonts'
import { ReactNode } from 'react'
import { BoxProps } from '../Box'

export interface TextProps extends BoxProps {
  children: ReactNode
  fontFamily?: FontFamilyToken
  fontSize?: FontSizeToken
  fontWeight?: FontWeightToken
}
