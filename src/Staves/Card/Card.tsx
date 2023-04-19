import { CardProps } from './Card.types'
import { Box } from '../Box'
import './card.scss'
import React from 'react'

export const Card = ({
  type = 'default', children, as, ...restProps
}: CardProps) => {

  return <Box {...restProps} className={`card ${restProps.className}`} as={as || 'article'}>{children}</Box>
}
