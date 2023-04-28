import { Meta, StoryObj } from '@storybook/react'
import { Picture } from './Picture'

const meta = {
  title: 'Staves/Picture',
  component: Picture,
} satisfies Meta<typeof Picture>

export default meta;
type Story = StoryObj<typeof meta>

export const WithImage: Story = {
  args: {
    src: 'https://via.placeholder.com/200',
    alt: 'placeholder image'
  },
  name: 'With Image',
}
