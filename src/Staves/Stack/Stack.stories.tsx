import { Stack } from './Stack'
import { Box } from '../Box'
import { Text } from '../Text'
import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Staves/Stack',
  component: Stack,
  argTypes: {
    direction: {
      control: { type: 'radio' },
      options: ['row', 'column'],
      defaultValue: 'row'
    },
    spacing: {
      table: { type: { summary: 'space-${number}' } }
    },
  }
} satisfies Meta<typeof Stack>

export default meta;
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {
    direction: 'row',
    children: <>
      <Box className="bg-color--blue-30 padding--space-3">
        <Text>Item 1</Text>
      </Box>
      <Box className="bg-color--blue-30 padding--space-3">
        <Text>Item 2</Text>
      </Box>
    </>
  },
  name: 'Horizontal',
}

export const HorizontalWithSpace: Story = {
  args: {
    direction: 'row',
    children: <>
      <Box className="bg-color--blue-30 padding--space-3">
        <Text>Item 1</Text>
      </Box>
      <Box className="bg-color--blue-30 padding--space-3">
        <Text>Item 2</Text>
      </Box>
    </>,
    spacing: 'space-3'
  },
  name: 'Horizontal With Space',
}

export const Vertical: Story = {
  args: {
    direction: 'column',
    children: <>
      <Box className="bg-color--blue-30 padding--space-3">
        <Text>Item 1</Text>
      </Box>
      <Box className="bg-color--blue-30 padding--space-3">
        <Text>Item 2</Text>
      </Box>
    </>
  },
  name: 'Vertical',
}

export const VerticalWithSpace: Story = {
  args: {
    direction: 'column',
    children: <>
      <Box className="bg-color--blue-30 padding--space-3">
        <Text>Item 1</Text>
      </Box>
      <Box className="bg-color--blue-30 padding--space-3">
        <Text>Item 2</Text>
      </Box>
    </>,
    spacing: 'space-3'
  },

  name: 'Vertical With Space',
}
