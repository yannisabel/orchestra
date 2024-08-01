import { Text } from './Text'
import { Box } from '../Box'
import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Staves/Text',
  component: Text,
  argTypes: {
    children: { table: { type: { summary: 'ReactNode' } } },
    className: { table: { type: { summary: 'string' } } },
    as: {
      defaultValue: 'p',
      table: {
        type: {
          summary: 'Inline Elements',
        },
      },
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default Text',
  },
  name: 'Default',
}

export const RenderAs: Story = {
  args: {
    children: 'Strong Text',
    as: 'strong',
  },
  name: 'Render As',
}

export const Code: Story = {
  args: {
    children: 'Code',
    as: 'code',
  },
  name: 'Code',
}

export const LineHeight = {
  render: () => (
    <Box className="lh-space-5">
      <Text>
        If it were, you could call ME Ernest Hemingway. Okay, take it easy Rick.
        T-that's dark. Why'd you even rope me into this?! And that's why I
        always say 'Shumshumschilpiddydah!'
      </Text>
    </Box>
  ),

  name: 'Line Height',
}

export const MultipleParagraphs = {
  render: () => (
    <>
      <Text>Default Text</Text>
      <Text>Default Text</Text>
      <Text>Default Text</Text>
    </>
  ),

  name: 'Multiple paragraphs',
}

export const ParagraphFlow = {
  render: () => (
    <Box className="paragraph-flow--space-5">
      <Text>
        If it were, you could call ME Ernest Hemingway. Okay, take it easy Rick.
        T-that's dark. Why'd you even rope me into this?! And that's why I
        always say 'Shumshumschilpiddydah!'
      </Text>
      <Text>
        God-damn! Oh, wow. That's an intense line of questioning, Snuffles The
        trick to cereal is keeping 70% of it above the milk. Hi! I'm Mr
        Meeseeks! Look at me!
      </Text>
      <Text>
        Your special time is your power. It makes you strong like a boob. I
        couldn't hear you over my own screaming. We've talked about this! Oh,
        I'm sorry Morty, are you the scientist or are you the kid who wanted to
        get laid? 5 more minute of this and I'm going to get mad!
      </Text>
    </Box>
  ),

  name: 'Paragraph flow',
}
