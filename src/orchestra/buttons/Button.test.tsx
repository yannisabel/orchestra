import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

test('should renders Button', () => {
  render(<Button text="Button" />)
  screen.debug()
  const buttonElement = screen.getByText('Button')
  expect(buttonElement).toBeTruthy()
  expect(buttonElement.getAttribute('type')).toMatch('button')
})

test('should call onClick function', async () => {
  const onClick = jest.fn()
  render(<Button text="Button" onClick={onClick} />)

  await userEvent.click(screen.getByText('Button'))
  expect(onClick).toHaveBeenCalled()
})
