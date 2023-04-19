import type { BoxProps } from './Box.types'
import './box.scss'
import React from 'react';

export const Box = <T extends React.ElementType = "div">({
  as,
  ...props
}:
  BoxProps<T>
  & Omit<React.ComponentPropsWithoutRef<T>, keyof BoxProps<T>>
) => {
  const Component = as || "div";
  return <Component {...props} />;
}
