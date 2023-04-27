import {
  Meta,
  StoryObj,
} from '@storybook/react'
import React from 'react';

import { Anchor } from './Anchor'

const Template = (args) => <Anchor {...args} />

const storybookMeta: Meta<typeof Anchor > = {
  title: 'Staves/Anchor',
  component: Anchor ,
};

export default storybookMeta;

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    children: 'Anchor',
    model: 'default',
    href: 'https://example.com',
    title: 'go to example website',
  },
}

export const IsExternal = {
  render: Template.bind({}),
  name: 'isExternal',

  args: {
    isExternal: true,
    children: 'Anchor',
    model: 'default',
    state: 'default',
    href: 'https://example.com',
    title: 'go to example website',
  },
}

export const WithColor = {
  render: Template.bind({}),
  name: 'WithColor',

  args: {
    children: 'Anchor',
    model: 'button',
    color: 'blue',
    state: 'default',
    href: 'https://example.com',
    title: 'go to example website',
  },
}

export const Round = {
  render: Template.bind({}),
  name: 'Round',

  args: {
    model: 'round',
    icon: 'image',
    backgroundColor: 'blue-30',
    href: 'https://example.com',
    title: 'go to example website',
  },
}

export const GhostButton = {
  render: Template.bind({}),
  name: 'Ghost button',

  args: {
    children: 'Anchor',
    model: 'button',
    state: 'ghost',
    href: 'https://example.com',
    title: 'go to example website',
  },
}

export const GhostRound = {
  render: Template.bind({}),
  name: 'Ghost Round',

  args: {
    model: 'round',
    state: 'ghost',
    icon: 'image',
    href: 'https://example.com',
    title: 'go to example website',
  },
}

export const Raised = {
  render: Template.bind({}),
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
