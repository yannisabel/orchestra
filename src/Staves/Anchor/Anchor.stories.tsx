import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Text } from '../Text'
import { Anchor } from './Anchor'

const meta = {
  title: 'Staves/Anchor',
  component: Anchor,
  argTypes: {
    model: {
      control: { type: 'select' },
      options: ['round', 'default', 'button', 'wrapper'],
      defaultValue: 'default',
    },
    state: {
      control: { type: 'select' },
      options: ['base', 'raised', 'ghost'],
      defaultValue: 'base',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
    },
    isExternal: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    icon: {
      control: { type: 'select' },
      options: ['image', 'people', 'art', 'tools'],
    },
  },
} satisfies Meta<typeof Anchor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Default',
  args: {
    children: 'Anchor',
    model: 'default',
    href: 'https://example.com',
    title: 'go to example website',
  },
}

export const IsExternal: Story = {
  name: 'isExternal',

  args: {
    isExternal: true,
    children: 'Anchor',
    model: 'default',
    state: 'base',
    href: 'https://example.com',
    title: 'go to example website',
  },
}

export const Primary: Story = {
  name: 'Primary',

  args: {
    children: 'Anchor',
    model: 'button',
    variant: 'primary',
    state: 'base',
    href: 'https://example.com',
    title: 'go to example website',
  },
}

export const Secondary: Story = {
  name: 'Secondary',

  args: {
    children: 'Anchor',
    model: 'button',
    variant: 'primary',
    state: 'base',
    href: 'https://example.com',
    title: 'go to example website',
  },
}

export const Tertiary: Story = {
  name: 'Tertiary',

  args: {
    children: 'Anchor',
    model: 'button',
    variant: 'primary',
    state: 'base',
    href: 'https://example.com',
    title: 'go to example website',
  },
}

export const Round: Story = {
  name: 'Round',

  args: {
    model: 'round',
    icon: 'image',
    variant: 'primary',
    href: 'https://example.com',
    title: 'go to example website',
  },
}

export const TertiaryButton: Story = {
  name: 'Tertiary button',

  args: {
    children: 'Anchor',
    model: 'button',
    variant: 'tertiary',
    href: 'https://example.com',
    title: 'go to example website',
  },
}

export const TertiaryRound: Story = {
  name: 'Tertiary Round',

  args: {
    model: 'round',
    state: 'base',
    icon: 'image',
    variant: 'tertiary',
    href: 'https://example.com',
    title: 'go to example website',
  },
}

export const Raised: Story = {
  name: 'Raised',

  args: {
    model: 'button',
    state: 'raised',
    variant: 'primary',
    href: 'https://example.com',
    title: 'go to example website',
    children: 'Anchor',
  },
}

export const IconAndText: Story = {
  name: 'Icon And Text',

  args: {
    model: 'button',
    icon: 'image',
    variant: 'primary',
    href: 'https://example.com',
    title: 'go to example website',
    children: <Text as="span">Anchor</Text>,
  },
}
