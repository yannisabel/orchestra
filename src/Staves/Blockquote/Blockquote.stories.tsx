import { Blockquote } from './Blockquote'
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Staves/Blockquote',
  component: Blockquote,
} satisfies Meta<typeof Blockquote>

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    citeUrl: 'https://atomicdesign.bradfrost.com/chapter-2/#whats-in-a-name',
    quote: '“Atomic design” as a buzzword encapsulates the concepts of modular design and development, which becomes a useful shorthand for convincing stakeholders and talking with colleagues. But atomic design is not rigid dogma. Ultimately, whatever taxonomy you choose to work with should help you and your organization communicate more effectively in order to craft an amazing UI design system.',
    citeWho: 'Brad Frost',
    citeFrom: 'Atomic Design, chapter 2 Atomic Design Methodology',
  },
  name: 'Default',
}
