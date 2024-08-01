import { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Staves/Button',
  component: Button,
  argTypes: {
    model: {
      control: { type: 'select' },
      options: ['default', 'round'],
      defaultValue: 'default',
    },
    state: {
      control: { type: 'select' },
      options: ['base', 'raised'],
      defaultValue: 'base',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      defaultValue: 'primary',
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Default',

  args: {
    children: 'Button',
    model: 'default',
    onClick: () => console.log('hi there!'),
  },
}

export const Secondary: Story = {
  name: 'Secondary',

  args: {
    children: 'Button',
    model: 'default',
    variant: 'secondary',
    onClick: () => console.log('hi there!'),
  },
}

export const Tertiary: Story = {
  name: 'Secondary',

  args: {
    children: 'Button',
    model: 'default',
    variant: 'tertiary',
    onClick: () => console.log('hi there!'),
  },
}

export const Round: Story = {
  name: 'Round',

  args: {
    model: 'round',
    icon: 'image',
    variant: 'primary',
    onClick: () => console.log('hi there!'),
  },
}

export const TertiaryButton: Story = {
  name: 'Tertiary button',

  args: {
    children: 'Button',
    model: 'default',
    variant: 'tertiary',
    onClick: () => console.log('hi there!'),
  },
}

export const TertiaryRound: Story = {
  name: 'Tertiary Round',

  args: {
    model: 'round',
    variant: 'tertiary',
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
    variant: 'primary',
    onClick: () => console.log('hi there!'),
  },
}

export const IconAndText: Story = {
  name: 'Icon And Text',

  args: {
    children: 'Button',
    model: 'default',
    icon: 'image',
    variant: 'primary',
  },
}
