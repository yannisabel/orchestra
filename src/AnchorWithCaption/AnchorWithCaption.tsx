import { Anchor } from '../Anchors'
import { AnchorWithCaptionProps } from './AnchorWithCaption.types'
import { Box } from '../Box'
import { Text } from '../Text'
import React from 'react'

export const AnchorWithCaption = ({
  href,
  model = 'button',
  state = 'raised',
  color = 'blue',
  text,
  title,
  caption,
}: AnchorWithCaptionProps) => {
  return (
    <Box className="flex flex-direction--column align-items--center">
      <Anchor
        href={href}
        model={model}
        state={state}
        color={color}
        title={title}
        isExternal>
        {text}
      </Anchor>
      <Text className="fs-1 fw-bold">{caption}</Text>
    </Box>
  )
}
