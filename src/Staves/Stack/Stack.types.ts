import { ElementType } from 'react'
import { BoxProps } from '../Box/Box.types'

export interface StackProps extends BoxProps<ElementType> {
  direction?: 'column' | 'row'
  spacing?: 'spaceless' | 'space-1' | 'space-2' | 'space-3' | 'space-4' | 'space-5'
}

