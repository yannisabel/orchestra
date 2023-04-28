import { Box } from './Box'
import { Text } from '../Text'
import React from 'react'
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Staves/Box',
  component: Box,
  argTypes: {
    children: { table: { type: { summary: 'ReactNode' } } },
    className: { table: { type: { summary: 'string' } } },
    as: {
      defaultValue: 'div',
      table: {
        type: {
          summary: 'HTMLElement',
        }
      }
    },
  }
} satisfies Meta<typeof Box>

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Box className="bg-color--blue-30 padding--space-3">
      <Text>Default box</Text>
    </Box>
  ),
  name: 'Default',
}

export const RenderAs: Story = {
  render: () => (
    <Box as="header" className="bg-color--blue-30 padding--space-3">
      <Text>Box as header</Text>
    </Box>
  ),

  name: 'render As',
}
