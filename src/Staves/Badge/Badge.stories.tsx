import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Badge } from './Badge'

const Template = (args) => <Badge {...args} />

const meta = {
  title: 'Staves/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    image: 'https://via.placeholder.com/50',
    alt: 'placeholder image',
    legend: 'This is a legend',
  },
}
