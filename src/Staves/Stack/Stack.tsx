import type { StackProps } from './Stack.types'
import { Box } from '../Box'
import './stack.scss'
import React from 'react'

export const Stack = ({ children, as, direction = 'row', spacing = 'spaceless', ...restProps }: StackProps) => {

  return (
    <Box {...restProps} className={`stack--${direction} ${direction}--${spacing} ${restProps.className || ''}`} as={as} >
      {children}
    </Box >
  )
}
