import { Box } from '../Box';
import { TextProps } from './Text.types'
import './text.scss'
import React from 'react';


export const Text = ({
  as = 'p',
  fontFamily = 'ff-openSans',
  fontWeight = 'fw-regular',
  fontSize = 'fs-2',
  align = 'left',
  className = '',
  children,
  ...props
}: TextProps)  => {
  return <Box as={as} className={`as${as} ${fontFamily} ${fontWeight} ${fontSize} text-align--${align} ${className}`} {...props}>{ children }</Box>
}
