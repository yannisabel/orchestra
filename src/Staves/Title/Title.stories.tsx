import React from 'react'
import { Box } from '../Box'
import { Title } from './Title'
import { TitleProps } from './Title.types'

export default {
  title: 'Staves/Title',
  component: Title,
}

const titles: Array<TitleProps['type']> = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export const Default = {
  render: () =>
    titles.map(function (title, i) {
      return (
        <Title key={title} type={title}>
          An{title}title
        </Title>
      )
    }),

  name: 'Default',
}
