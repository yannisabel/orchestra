import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Switch } from '../Switch'

jest.setTimeout(30000)

describe('Switch', () => {
  test('should render a Switch element', () => {

    render (
      <Switch label="Switch label" checked={false} onClick={() => jest.fn()} />,
    )

    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', "false")
  })

  test('should call onClick function', async () => {

    const user = userEvent.setup({ delay: null })
    const onClick = jest.fn()

    render (
      <Switch label="Switch label" checked={false} onClick={onClick} />
    )

    await user.click(screen.getByRole('switch'))

    expect(onClick).toHaveBeenCalled()
  })
})
