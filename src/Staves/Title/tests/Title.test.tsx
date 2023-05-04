import { render, screen } from '@testing-library/react'
import React from 'react'
import { Title } from '../Title'
import { TitleProps } from '../Title.types'

const titleLevel: Array<TitleProps['type']> = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

jest.setTimeout(30000)

describe('Title', () => {
  test.each(titleLevel)('should render heading of type %s',(input) => {

    render (
      <Title type={input}>I'm a heading of type {input}</Title>,
    )

    expect(screen.getAllByText(`I'm a heading of type ${input}`)).toBeTruthy()
  })
})
