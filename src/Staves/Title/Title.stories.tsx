import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Box } from '../Box'
import { Title } from './Title'
import { TitleProps } from './Title.types'

const meta = {
  title: 'Staves/Title',
  component: Title,
  argTypes: {
    children: { table: { type: { summary: 'ReactNode' } } },
    className: { table: { type: { summary: 'string' } } },
    type: {
      table: {
        type: {
          summary: 'heading level: h1 to h6',
        }
      }
    },
  }
} satisfies Meta<typeof Title>

export default meta;
type Story = StoryObj<typeof meta>

const titles: Array<TitleProps['type']> = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export const Default = {
  render: () =>
    titles.map(function (title, i) {
      return (
        <Title key={title} type={title}>
          A {title} title
        </Title>
      )
    }),

  name: 'Default',
}
