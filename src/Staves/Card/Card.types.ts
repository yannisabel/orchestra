import { BoxProps } from '../Box/Box.types'
import { ElementType, ReactNode } from 'react'

export interface CardProps extends BoxProps<ElementType> {
  className?: string
  children: ReactNode
}
