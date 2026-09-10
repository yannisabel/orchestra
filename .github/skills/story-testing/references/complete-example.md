# Complete Example: Form Component

End-to-end multi-field form story combining args, user interaction, and validation assertions from [the main skill](../SKILL.md).

```typescript
// src/components/form/form.stories.tsx
import { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent } from '@storybook/test'
import { Form } from './form'

const meta = {
  title: 'Components/Form',
  component: Form,
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: vi.fn(),
    fields: [
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'password', label: 'Password', type: 'password' },
    ],
  },
  play: async ({ canvasElement }) => {
    // Verify form renders
    expect(canvasElement.querySelector('form')).toBeInTheDocument()

    const inputs = canvasElement.querySelectorAll('input')
    expect(inputs).toHaveLength(2)
  },
}

export const FillAndSubmit: Story = {
  args: {
    onSubmit: vi.fn(),
    fields: [
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'password', label: 'Password', type: 'password' },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const inputs = canvasElement.querySelectorAll('input')
    const emailInput = inputs[0] as HTMLInputElement
    const passwordInput = inputs[1] as HTMLInputElement

    // Fill form
    await userEvent.type(emailInput, 'user@example.com')
    await userEvent.type(passwordInput, 'password123')

    // Submit
    const submitBtn = canvasElement.querySelector('button[type="submit"]')
    await userEvent.click(submitBtn!)

    // Verify submission
    expect(args.onSubmit).toHaveBeenCalledOnce()
    expect(args.onSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
    })
  },
}

export const ValidationError: Story = {
  args: {
    onSubmit: vi.fn(),
    fields: [{ name: 'email', label: 'Email', type: 'email', required: true }],
  },
  play: async ({ canvasElement, args }) => {
    // Submit without filling
    const submitBtn = canvasElement.querySelector('button[type="submit"]')
    await userEvent.click(submitBtn!)

    // Verify error shown
    const error = canvasElement.querySelector('[role="alert"]')
    expect(error).toHaveTextContent('Email is required')

    // Verify onSubmit NOT called
    expect(args.onSubmit).not.toHaveBeenCalled()
  },
}
```
