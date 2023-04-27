import { Box } from './Box'
import { Text } from '../Text'
import React from 'react'

export default {
  title: 'Staves/Box',
  component: Box,
}

export const Default = {
  render: () => (
    <Box className="bg-color--blue-30 padding--space-3">
      <Text>Default box</Text>
    </Box>
  ),
  name: 'Default',
}

export const RenderAs = {
  render: () => (
    <Box as="header" className="bg-color--blue-30 padding--space-3">
      <Text>Box as header</Text>
    </Box>
  ),

  name: 'render As',
}
