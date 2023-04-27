import { Meta, StoryObj } from '@storybook/react'
import React from 'react';
import { Badge } from './Badge'

const Template = (args) => <Badge {...args} />

const meta: Meta<typeof Badge> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Staves/Badge',
  component: Badge,
};

export default meta;
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

export const WithGreyColor = {
  render: Template.bind({}),
  name: 'with Grey Color',

  args: {
    image: 'https://via.placeholder.com/50',
    alt: 'placeholder image',
    legend: 'This is a legend',
    color: 'grey',
  },
}

export const WithBlueGreyColor = {
  render: Template.bind({}),
  name: 'with Blue grey Color',

  args: {
    image: 'https://via.placeholder.com/50',
    alt: 'placeholder image',
    legend: 'This is a legend',
    color: 'blue-grey',
  },
}

export const WithBlueColor = {
  render: Template.bind({}),
  name: 'with Blue Color',

  args: {
    image: 'https://via.placeholder.com/50',
    alt: 'placeholder image',
    legend: 'This is a legend',
    color: 'blue',
  },
}

export const WithOrangeColor = {
  render: Template.bind({}),
  name: 'with Orange Color',

  args: {
    image: 'https://via.placeholder.com/50',
    alt: 'placeholder image',
    legend: 'This is a legend',
    color: 'orange',
  },
}
