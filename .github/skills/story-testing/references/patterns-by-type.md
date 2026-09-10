# Story Test Patterns by Component Type

Full story code for the checklist in [the main skill](../SKILL.md#procedure-pick-the-right-pattern).

## Button Component

**Testing checklist**: Label, click handler, disabled state, variants (primary, secondary)

```typescript
import { expect } from '@storybook/test'
import { Button } from './button'

export const Primary: Story = {
  args: { label: 'Click me', variant: 'primary' },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button')

    // Verify rendering
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
    expect(button).toHaveClass('primary')
  },
}

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button')
    expect(button).toBeDisabled()
  },
}

export const WithClick: Story = {
  args: { label: 'Click me', onClick: vi.fn() },
  play: async ({ canvasElement, args }) => {
    const button = canvasElement.querySelector('button')

    // Simulate user interaction
    await userEvent.click(button!)

    // Verify callback was called
    expect(args.onClick).toHaveBeenCalledOnce()
  },
}
```

## Form Input Component

**Testing checklist**: Label, placeholder, value updates, validation, error states

```typescript
import { userEvent } from '@storybook/test'
import { FormInput } from './form-input'

export const Default: Story = {
  args: { label: 'Email', placeholder: 'Enter email' },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input')

    // Verify initial state
    expect(input).toHaveAttribute('placeholder', 'Enter email')
    expect(input).toHaveValue('')
  },
}

export const WithValue: Story = {
  args: { label: 'Email', value: 'test@example.com' },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input')
    expect(input).toHaveValue('test@example.com')
  },
}

export const UserTyping: Story = {
  args: { label: 'Email', onChange: vi.fn() },
  play: async ({ canvasElement, args }) => {
    const input = canvasElement.querySelector('input')

    // Simulate user typing
    await userEvent.type(input!, 'hello@world.com')

    // Verify value changed
    expect(input).toHaveValue('hello@world.com')

    // Verify onChange callback was called
    expect(args.onChange).toHaveBeenCalled()
  },
}

export const ValidationError: Story = {
  args: {
    label: 'Email',
    error: 'Invalid email format',
    value: 'invalid',
  },
  play: async ({ canvasElement }) => {
    const errorMsg = canvasElement.querySelector('[role="alert"]')
    expect(errorMsg).toHaveTextContent('Invalid email format')

    const input = canvasElement.querySelector('input')
    expect(input).toHaveClass('error')
  },
}
```

## Modal/Dialog Component

**Testing checklist**: Visibility, close button, overlay click, keyboard escape, focus trap

```typescript
import { userEvent } from '@storybook/test'
import { Modal } from './modal'

export const Open: Story = {
  args: {
    isOpen: true,
    title: 'Confirm Action',
    onClose: vi.fn(),
  },
  play: async ({ canvasElement, args }) => {
    // Verify modal is visible
    const modal = canvasElement.querySelector('[role="dialog"]')
    expect(modal).toBeInTheDocument()
    expect(modal).toHaveTextContent('Confirm Action')
  },
}

export const CloseButton: Story = {
  args: { isOpen: true, onClose: vi.fn() },
  play: async ({ canvasElement, args }) => {
    const closeBtn = canvasElement.querySelector('[aria-label="Close"]')
    await userEvent.click(closeBtn!)

    expect(args.onClose).toHaveBeenCalledOnce()
  },
}

export const EscapeKey: Story = {
  args: { isOpen: true, onClose: vi.fn() },
  play: async ({ canvasElement, args }) => {
    const modal = canvasElement.querySelector('[role="dialog"]')

    // Simulate ESC key press
    await userEvent.keyboard('{Escape}')

    expect(args.onClose).toHaveBeenCalledOnce()
  },
}

export const Closed: Story = {
  args: { isOpen: false },
  play: async ({ canvasElement }) => {
    const modal = canvasElement.querySelector('[role="dialog"]')
    expect(modal).not.toBeInTheDocument()
  },
}
```

## List/Table Component

**Testing checklist**: Items render, empty state, sorting, filtering, pagination

```typescript
import { List } from './list'

export const WithItems: Story = {
  args: {
    items: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ],
  },
  play: async ({ canvasElement }) => {
    const rows = canvasElement.querySelectorAll('[role="row"]')
    expect(rows).toHaveLength(3)

    // Verify each item
    expect(rows[0]).toHaveTextContent('Item 1')
    expect(rows[1]).toHaveTextContent('Item 2')
    expect(rows[2]).toHaveTextContent('Item 3')
  },
}

export const EmptyState: Story = {
  args: { items: [] },
  play: async ({ canvasElement }) => {
    const empty = canvasElement.querySelector('[role="status"]')
    expect(empty).toHaveTextContent('No items found')
  },
}

export const Sortable: Story = {
  args: {
    items: [
      { id: 1, name: 'Zebra', date: '2025-01-01' },
      { id: 2, name: 'Apple', date: '2025-02-01' },
    ],
    onSort: vi.fn(),
  },
  play: async ({ canvasElement, args }) => {
    const nameHeader = canvasElement.querySelector('[data-column="name"]')

    await userEvent.click(nameHeader!)

    expect(args.onSort).toHaveBeenCalledWith('name', 'asc')
  },
}
```

## Select/Dropdown Component

**Testing checklist**: Options render, selection, keyboard navigation, open/close

```typescript
import { userEvent } from '@storybook/test'
import { Select } from './select'

export const Closed: Story = {
  args: {
    label: 'Choose option',
    options: ['Option A', 'Option B', 'Option C'],
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('[role="combobox"]')
    expect(button).toHaveTextContent('Choose option')

    // Options not visible when closed
    const listbox = canvasElement.querySelector('[role="listbox"]')
    expect(listbox).not.toBeVisible()
  },
}

export const Open: Story = {
  args: {
    options: ['Option A', 'Option B', 'Option C'],
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('[role="combobox"]')
    await userEvent.click(button!)

    // Options now visible
    const options = canvasElement.querySelectorAll('[role="option"]')
    expect(options).toHaveLength(3)
  },
}

export const Selection: Story = {
  args: {
    options: ['Apple', 'Banana', 'Cherry'],
    onChange: vi.fn(),
  },
  play: async ({ canvasElement, args }) => {
    const button = canvasElement.querySelector('[role="combobox"]')
    await userEvent.click(button!)

    const appleOption = canvasElement.querySelector('[data-value="Apple"]')
    await userEvent.click(appleOption!)

    expect(args.onChange).toHaveBeenCalledWith('Apple')
  },
}

export const KeyboardNavigation: Story = {
  args: {
    options: ['Option A', 'Option B', 'Option C'],
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('[role="combobox"]')
    await userEvent.click(button!)

    // Navigate with arrow keys
    await userEvent.keyboard('{ArrowDown}{ArrowDown}')

    const options = canvasElement.querySelectorAll('[role="option"]')
    expect(options[1]).toHaveFocus()
  },
}
```

## Async Patterns

### Waiting for Changes

```typescript
import { waitFor } from '@storybook/test'

export const AsyncData: Story = {
  args: { onFetch: vi.fn() },
  play: async ({ canvasElement, args }) => {
    const button = canvasElement.querySelector('button')
    await userEvent.click(button!)

    // Wait for async operation
    await waitFor(() => {
      const result = canvasElement.querySelector('[role="status"]')
      expect(result).toHaveTextContent('Loaded')
    })
  },
}
```

### Simulating Delays

```typescript
export const DelayedInteraction: Story = {
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input')

    // Type slowly
    await userEvent.type(input!, 'hello', { delay: 50 })

    expect(input).toHaveValue('hello')
  },
}
```
