import { Meta, StoryObj } from '@storybook/react'
import { Sticker } from './Sticker'

const meta = {
  title: 'Staves/Sticker',
  component: Sticker,
  argTypes: {
    model: {
      control: 'radio',
      options: ['default', 'mini'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
  },
} satisfies Meta<typeof Sticker>

export default meta
type Story = StoryObj<typeof meta>

export const WithIcon: Story = {
  name: 'With Icon',

  args: {
    type: 'icon',
    icon: 'image',
  },
}

export const WithModelMini: Story = {
  name: 'With Model Mini',

  args: {
    type: 'icon',
    model: 'mini',
    icon: 'image',
  },
}

export const WithImage: Story = {
  name: 'With Image',

  args: {
    type: 'image',
    image: 'https://via.placeholder.com/50',
    alt: 'placeholder image',
  },
}

export const WithText: Story = {
  name: 'With Text',

  args: {
    type: 'text',
    text: 'Text placeholder',
  },
}
