import type { StackProps } from './Stack.types'
import { Box } from '../Box'
import './stack.scss'
import React from 'react'

export const Stack = ({ children, as, className, ...restProps }: StackProps) => {

  return (
    <Box {...restProps} className={`stack ${className}`} as={as} >
      {children}
    </Box >
  )
}
