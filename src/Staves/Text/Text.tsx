import { Box } from '../Box';
import { TextProps } from './Text.types'
import './text.scss'
import React from 'react';


export const Text = ({
  as = 'p',
  align,
  ...props
}: TextProps)  => {
  return <Box as={as} className={`text-align--${align} ${props.className || ''}`} {...props} />;
}
