# Complete Example: Form Component (illustrative)

End-to-end multi-field form story combining args, user interaction, and validation assertions from [the main skill](../SKILL.md).

> No form component exists in `packages/core/src/components` yet. This is an illustrative pattern. Use `fn()` from `storybook/test` in place of `vi.fn()` shown below, and query inside shadow roots (see [the main skill](../SKILL.md#querying-best-practices)).

```typescript
// packages/storybook/src/pages/components/form/form.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { expect, userEvent } from 'storybook/test'

const meta = {
  title: 'Components/Form',
  component: 'orchestra-form',
} satisfies Meta

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
