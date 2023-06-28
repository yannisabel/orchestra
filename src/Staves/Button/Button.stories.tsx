import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button'

const meta = {
  title: 'Staves/Button',
  component: Button,
  argTypes: {
    model: {
      control: { type: 'select' },
      options: ['default', 'round'],
      defaultValue: 'default'
    },
    state: {
      control: { type: 'select' },
      options: ['base', 'raised', 'ghost'],
      defaultValue: 'base'
    },
    color: {
      control: { type: 'select' },
      options: ['transparent', 'blue', 'orange', 'white'],
      defaultValue: 'transparent'
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset']
    }
  }
} satisfies Meta<typeof Button>

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Default',

  args: {
    children: 'Button',
    model: 'default',
    state: 'ghost',
    onClick: () => console.log('hi there!'),
  },
}

export const WithColor: Story = {
  name: 'WithColor',

  args: {
    children: 'Button',
    model: 'default',
    color: 'blue',
    onClick: () => console.log('hi there!'),
  },
}

export const Round: Story = {
  name: 'Round',

  args: {
    model: 'round',
    icon: 'image',
    onClick: () => console.log('hi there!'),
  },
}

export const GhostButton: Story = {
  name: 'Ghost button',

  args: {
    children: 'Button',
    model: 'default',
    state: 'ghost',
    onClick: () => console.log('hi there!'),
  },
}

export const GhostRound: Story = {
  name: 'Ghost Round',

  args: {
    model: 'round',
    state: 'ghost',
    icon: 'image',
    onClick: () => console.log('hi there!'),
  },
}

export const Raised: Story = {
  name: 'Raised',

  args: {
    children: 'Button',
    model: 'default',
    state: 'raised',
    color: 'blue',
    onClick: () => console.log('hi there!'),
  },
}
