import { render, screen } from '@testing-library/react'
import React from 'react'
import { Text } from '../Text'

describe('Text', () => {
  test('should render text with the right default classes', () => {

    render (
      <Text>Default text</Text>,
    )

    expect(screen.getByText('Default text')).toHaveClass('ff-openSans')
    expect(screen.getByText('Default text')).toHaveClass('fw-regular')
    expect(screen.getByText('Default text')).toHaveClass('fs-2')
  })

  test('should render text with the right custom classes', () => {

    render (
      <Text fontFamily='ff-mulish' fontWeight='fw-bold' fontSize='fs-3'>Default text</Text>,
    )

    expect(screen.getByText('Default text')).toHaveClass('ff-mulish')
    expect(screen.getByText('Default text')).toHaveClass('fw-bold')
    expect(screen.getByText('Default text')).toHaveClass('fs-3')
  })

  test('should render text rendered as strong', () => {

    const {container} = render(<Text as="strong">Default text</Text>)
    container.querySelector('strong')

    expect(container).toBeInTheDocument()
  })
})
