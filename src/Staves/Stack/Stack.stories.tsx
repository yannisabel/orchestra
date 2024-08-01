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
      defaultValue: 'row',
    },
    spacing: {
      table: { type: { summary: 'space-${number}' } },
    },
  },
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {
    direction: 'row',
    children: (
      <>
        <Box className="full padding--space-3">
          <Text className="text--white">Item 1</Text>
        </Box>
        <Box className="full padding--space-3">
          <Text className="text--white">Item 2</Text>
        </Box>
      </>
    ),
  },
  name: 'Horizontal',
}

export const HorizontalWithSpace: Story = {
  args: {
    direction: 'row',
    children: (
      <>
        <Box className="full padding--space-3">
          <Text className="text--white">Item 1</Text>
        </Box>
        <Box className="full padding--space-3">
          <Text className="text--white">Item 2</Text>
        </Box>
      </>
    ),
    spacing: 'space-3',
  },
  name: 'Horizontal With Space',
}

export const Vertical: Story = {
  args: {
    direction: 'column',
    children: (
      <>
        <Box className="full padding--space-3">
          <Text className="text--white">Item 1</Text>
        </Box>
        <Box className="full padding--space-3">
          <Text className="text--white">Item 2</Text>
        </Box>
      </>
    ),
  },
  name: 'Vertical',
}

export const VerticalWithSpace: Story = {
  args: {
    direction: 'column',
    children: (
      <>
        <Box className="full padding--space-3">
          <Text className="text--white">Item 1</Text>
        </Box>
        <Box className="full padding--space-3">
          <Text className="text--white">Item 2</Text>
        </Box>
      </>
    ),
    spacing: 'space-3',
  },

  name: 'Vertical With Space',
}

export const HorizontalMultipleLines: Story = {
  args: {
    direction: 'row',
    children: (
      <>
        <Box className="full padding--space-3">
          <Text className="text--white">Item 1</Text>
        </Box>
        <Box className="full padding--space-3">
          <Text className="text--white">Item 2</Text>
        </Box>
        <Box className="full padding--space-3">
          <Text className="text--white">Item 3</Text>
        </Box>
        <Box className="full padding--space-3">
          <Text className="text--white">Item 4</Text>
        </Box>
        <Box className="full padding--space-3">
          <Text className="text--white">Item 5</Text>
        </Box>
        <Box className="full padding--space-3">
          <Text className="text--white">Item 6</Text>
        </Box>
        <Box className="full padding--space-3">
          <Text className="text--white">Item 7</Text>
        </Box>
        <Box className="full padding--space-3">
          <Text className="text--white">Item 8</Text>
        </Box>
      </>
    ),
    spacing: 'space-3',
  },
  name: 'Horizontal Multiple Lines',
}
