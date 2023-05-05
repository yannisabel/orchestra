import {
  Meta,
  StoryObj,
} from '@storybook/react'
import React from 'react';
import { Text } from '../Text';
import { Anchor } from './Anchor'

const meta = {
  title: 'Staves/Anchor',
  component: Anchor ,
  argTypes: {
    model: {
      control: { type: 'select' },
      options: ['round', 'default', 'button', 'wrapper'],
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
    isExternal: {
      control: { type: 'boolean' },
      defaultValue: false
    },
    icon: {
      control: { type: 'select' },
      options: ['image', 'people', 'art', 'tools'],
    }
  }
} satisfies Meta<typeof Anchor>

export default meta;
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

export const WithColor: Story = {
  name: 'WithColor',

  args: {
    children: 'Anchor',
    model: 'button',
    color: 'blue',
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
    color: 'blue',
    href: 'https://example.com',
    title: 'go to example website',
  },
}

export const GhostButton: Story = {
  name: 'Ghost button',

  args: {
    children: 'Anchor',
    model: 'button',
    state: 'ghost',
    href: 'https://example.com',
    title: 'go to example website',
  },
}

export const GhostRound: Story = {
  name: 'Ghost Round',

  args: {
    model: 'round',
    state: 'ghost',
    icon: 'image',
    href: 'https://example.com',
    title: 'go to example website',
  },
}

export const Raised: Story = {
  name: 'Raised',

  args: {
    model: 'button',
    state: 'raised',
    color: 'blue',
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
    color: 'blue',
    href: 'https://example.com',
    title: 'go to example website',
    children: <Text as="span">Anchor</Text>,
  },
}
