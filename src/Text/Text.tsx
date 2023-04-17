import { Box } from '../Box';
import { TextProps } from './Text.types'
import './text.scss'
import React from 'react';


export const Text = ({
  as,
  ...props
}: TextProps)  => {
  const renderAs = as || 'p';
  return <Box as={renderAs} {...props} />;
}
