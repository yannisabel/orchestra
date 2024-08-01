import { Stack } from '../Stack'
import { Card } from './Card'
import { Picture } from '../Picture'
import { Text } from '../Text'
import { Anchor } from '../Anchor'
import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Staves/Card',
  component: Card,
  argTypes: {
    children: { table: { type: { summary: 'ReactNode' } } },
    className: { table: { type: { summary: 'string' } } },
    as: {
      defaultValue: 'div',
      table: {
        type: {
          summary: 'HTMLElement',
        },
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  render: () => (
    <Card className="display--flex">
      <Picture
        src="https://via.placeholder.com/160"
        alt="placeholder image"
        width={160}
        height={160}
      />
      <Stack direction="column" spacing="space-2" className="padding--space-3">
        <Text>Title</Text>
        <Text>type</Text>
        <Text>description</Text>
      </Stack>
    </Card>
  ),

  name: 'Default',
}

export const Linkable = {
  render: () => (
    <Card>
      <Anchor
        href="https://example.com"
        title="go to link"
        isExternal
        model="wrapper"
        className="display--flex"
      >
        <Picture
          src="https://via.placeholder.com/160"
          alt="placeholder image"
        />
        <Stack
          direction="column"
          spacing="space-2"
          className="padding--space-3"
        >
          <Text>Title</Text>
          <Text>type</Text>
          <Text>description</Text>
        </Stack>
      </Anchor>
    </Card>
  ),

  name: 'Linkable',
}
