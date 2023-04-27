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
  ...props
}: TextProps)  => {
  return <Box as={as} className={`${fontFamily} ${fontWeight} ${fontSize} text-align--${align} ${className}`} {...props} />
}
