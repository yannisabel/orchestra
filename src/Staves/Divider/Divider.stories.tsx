import { Meta, StoryObj } from '@storybook/react';
import React from 'react'
import { Divider } from './Divider'

const meta = {
  title: 'Staves/Divider',
  component: Divider,
} satisfies Meta<typeof Divider>

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Divider />,
  name: 'Default',
}
