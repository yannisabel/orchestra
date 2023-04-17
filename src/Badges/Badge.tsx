import { BadgeProps } from './Badge.types'
import { Sticker } from '../Stickers'
import { Text } from '../Text'
import { Box } from '../Box'
import React from 'react'

export const Badge = ({
  image,
  alt,
  legend,
  color,
  className
}: BadgeProps) => {

  return (
    <Box className={`badge ${className}`}>
      <Sticker
        type="image"
        image={image}
        alt={alt}
        color={color}
      />
      <Text className="fs-1">{legend}</Text>
    </Box>
  )
}
