import { Icon } from './Icon'
import { Text } from '../Text'
import { Stack } from '../Stack'
import { Box } from '../Box'

import { allIcons } from './Icon.types'
import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Staves/Icon',
  component: Icon,
  argTypes: {
    name: { table: { type: { summary: '["image", "art", "people", ...]' } } }
  }
} satisfies Meta<typeof Icon>

export default meta;
type Story = StoryObj<typeof meta>

export const Default = {
  render: () =>
    allIcons.map((IconName) => {
      return (
        <Stack
          key={IconName}
          direction="column"
          spacing="space-1"
          className="align-items--center"
        >
          <Box
          >
            <Icon name={IconName} className="icon-c--textColor" size={50} />
          </Box>
          <Text>{IconName}</Text>
        </Stack>
      )
    }),

  name: 'Default',
}
