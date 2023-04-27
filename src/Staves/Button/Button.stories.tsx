import React from 'react'
import { Button } from './Button'

const Template = (args) => <Button {...args} />

export default {
  title: 'Staves/Button',
  component: Button,
}

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    children: 'Button',
    model: 'default',
    onClick: () => console.log('coucou'),
  },
}

export const WithColor = {
  render: Template.bind({}),
  name: 'WithColor',

  args: {
    children: 'Button',
    model: 'default',
    color: 'blue',
    onClick: () => console.log('coucou'),
  },
}

export const Round = {
  render: Template.bind({}),
  name: 'Round',

  args: {
    children: 'Button',
    model: 'round',
    icon: 'image',
    onClick: () => console.log('coucou'),
  },
}

export const GhostButton = {
  render: Template.bind({}),
  name: 'Ghost button',

  args: {
    children: 'Button',
    model: 'default',
    state: 'ghost',
    onClick: () => console.log('coucou'),
  },
}

export const GhostRound = {
  render: Template.bind({}),
  name: 'Ghost Round',

  args: {
    model: 'round',
    state: 'ghost',
    icon: 'image',
    onClick: () => console.log('coucou'),
  },
}

export const Raised = {
  render: Template.bind({}),
  name: 'Raised',

  args: {
    children: 'Button',
    model: 'default',
    state: 'raised',
    color: 'blue',
    onClick: () => console.log('coucou'),
  },
}
