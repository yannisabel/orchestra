import { ElementType, ReactNode } from 'react'
import { BoxProps } from '../Box/Box.types'

export interface BlockquoteProps extends BoxProps<ElementType> {
  citeUrl: string
  quote: ReactNode
  citeWho: string
  citeFrom: string
}
