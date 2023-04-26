import { Box } from '../Box';
import { TextProps } from './Text.types'
import './text.scss'
import React from 'react';


export const Text = ({
  as = 'p',
  fontFamily,
  fontWeight,
  fontSize,
  align = 'left',
  ...props
}: TextProps)  => {
  return <Box as={as} className={`${fontFamily || 'ff-openSans'} ${fontWeight || 'fw-regular'} ${fontSize || 'fs-2'} text-align--${align} ${props.className || ''}`} {...props} />;
}
