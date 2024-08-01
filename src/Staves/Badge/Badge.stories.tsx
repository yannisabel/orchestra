import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Badge } from './Badge'

const Template = (args) => <Badge {...args} />

const meta = {
  title: 'Staves/Badge',
  component: Badge,
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'orange', 'white', 'grey', 'blue-grey'],
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

export const WithColor: Story = {
  render: Template.bind({}),
  name: 'with Color',

  args: {
    image: 'https://via.placeholder.com/50',
    alt: 'placeholder image',
    legend: 'This is a legend',
    color: 'blue',
  },
}
