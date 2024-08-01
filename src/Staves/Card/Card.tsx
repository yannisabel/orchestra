import { CardProps } from './Card.types'
import { Box } from '../Box'
import './card.scss'
import React from 'react'

export const Card = ({
  children,
  className = '',
  as = 'article',
  ...restProps
}: CardProps) => {

  return <Box {...restProps} className={`card ${className}`} as={as}>{children}</Box>
}
