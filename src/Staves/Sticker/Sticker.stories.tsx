import React from 'react'
import { Sticker } from './Sticker'

const Template = (args) => <Sticker {...args} />

export default {
  title: 'Staves/Sticker',
  component: Sticker,
}

export const WithIcon = {
  render: Template.bind({}),
  name: 'With Icon',

  args: {
    type: 'icon',
    icon: 'image',
  },
}

export const WithImage = {
  render: Template.bind({}),
  name: 'With Image',

  args: {
    type: 'image',
    image: 'https://via.placeholder.com/50',
    alt: 'placeholder image',
  },
}

export const WithText = {
  render: Template.bind({}),
  name: 'With Text',

  args: {
    type: 'text',
    text: 'Text placeholder',
  },
}
