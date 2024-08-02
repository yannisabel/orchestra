import { BadgeProps } from './Badge.types'
import { Sticker } from '../Sticker'
import { Text } from '../Text'
import { Stack } from '../Stack'
import React from 'react'
import './badge.scss'

export const Badge = ({
  image,
  alt,
  legend,
  variant = 'primary',
  className = ''
}: BadgeProps) => {

  return (
    <Stack direction="column" spacing="space-2" className={`badge align-items--center ${className}`}>
      <Sticker
        type="image"
        image={image}
        alt={alt}
        variant={variant}
      />
      <Text fontSize="fs-1" align="center">{legend}</Text>
    </Stack>
  )
}
