import { Stack } from './Stack'
import { Box } from '../Box'
import { Text } from '../Text'
import React from 'react'

export default {
  title: 'Staves/Stack',
  component: Stack,
}

export const Horizontal = {
  render: () => (
    <Stack direction="row">
      <Box className="bg-color--blue-30 padding--space-3">
        <Text>Item 1</Text>
      </Box>
      <Box className="bg-color--blue-30 padding--space-3">
        <Text>Item 2</Text>
      </Box>
    </Stack>
  ),

  name: 'Horizontal',
}

export const HorizontalWithSpace = {
  render: () => (
    <Stack direction="row" spacing="space-3">
      <Box className="bg-color--blue-30 padding--space-3">
        <Text>Item 1</Text>
      </Box>
      <Box className="bg-color--blue-30 padding--space-3">
        <Text>Item 2</Text>
      </Box>
    </Stack>
  ),

  name: 'Horizontal With Space',
}

export const Vertical = {
  render: () => (
    <Stack direction="column">
      <Box className="bg-color--blue-30 padding--space-3">
        <Text>Item 1</Text>
      </Box>
      <Box className="bg-color--blue-30 padding--space-3">
        <Text>Item 2</Text>
      </Box>
    </Stack>
  ),

  name: 'Vertical',
}

export const VerticalWithSpace = {
  render: () => (
    <Stack direction="column" spacing="space-3">
      <Box className="bg-color--blue-30 padding--space-3">
        <Text>Item 1</Text>
      </Box>
      <Box className="bg-color--blue-30 padding--space-3">
        <Text>Item 2</Text>
      </Box>
    </Stack>
  ),

  name: 'Vertical With Space',
}
