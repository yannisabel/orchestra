---
name: story-testing
description: 'Write effective tests in Storybook stories using Vitest play functions. Use when testing components, interactions, accessibility, and state changes. Covers patterns for different component types (form inputs, buttons, modals, lists), user interactions, and assertions.'
argument-hint: "Describe your component type (e.g., 'form input', 'modal dialog', 'list component')"
user-invocable: true
---

# Story Testing

## Overview

Tests in Orchestra live in **Storybook Play functions** using **Vitest v4.1.9**. This is not Jest—it's Vitest running test code inside interactive stories. See [code-conventions](../code-conventions/SKILL.md) for naming and TypeScript rules.

**Stack**:

- Vitest v4.1.9 (test runner)
- Storybook v10.4.6 (story framework + addon-vitest)
- Playwright v1.61.0 (browser automation)
- shadow-dom-testing-library v1.14.0 (DOM queries)
- userEvent for realistic user interactions

**Key principle**: One story = one test scenario. Each story demonstrates a visual state AND verifies it behaves correctly.

## Story Structure Template

```typescript
// src/components/[component]/[component].stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { [Component] } from './[component]';

const meta = {
  title: 'Components/[ComponentName]',
  component: [Component],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof [Component]>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story with play function (test)
export const Primary: Story = {
  args: {
    // Component props
  },
  play: async ({ canvasElement }) => {
    // Test here
  },
};
```

## Common Patterns by Component Type

### Button Component

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

### Form Input Component

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

### Modal/Dialog Component

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

### List/Table Component

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

### Select/Dropdown Component

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

## Querying Best Practices

### Use Semantic Queries (in order of preference)

```typescript
// ✅ Best: By role (accessible to users)
canvasElement.querySelector('[role="button"]')
canvasElement.querySelector('button')

// ✅ Good: By label text
canvasElement.querySelector('label[for="email"]')
screen.getByLabelText('Email')

// ✅ Okay: By placeholder
canvasElement.querySelector('input[placeholder="Search"]')

// ❌ Avoid: By className (brittle, breaks with refactoring)
canvasElement.querySelector('.my-button-class')

// ❌ Avoid: By test ID (use only as last resort)
canvasElement.querySelector('[data-testid="submit"]')
```

### Safe DOM Queries

```typescript
// Safe: with optional chaining
const button = canvasElement.querySelector('button')
await userEvent.click(button!) // Use non-null assertion if you know it exists

// Safe: check existence first
const input = canvasElement.querySelector('input')
if (input) {
  expect(input).toHaveValue('test')
}

// Safe: find multiple and verify count
const options = canvasElement.querySelectorAll('[role="option"]')
expect(options).toHaveLength(3)
```

## Assertion Patterns

### Visibility & Presence

```typescript
// Element exists in DOM
expect(element).toBeInTheDocument()

// Element is visible
expect(element).toBeVisible()

// Element has text
expect(element).toHaveTextContent('Expected text')

// Element hidden (but in DOM)
expect(element).not.toBeVisible()

// Element not in DOM
expect(element).not.toBeInTheDocument()
```

### Attributes & Classes

```typescript
// Check attribute
expect(input).toHaveAttribute('type', 'email')

// Check class
expect(button).toHaveClass('primary', 'large')

// Check value (for inputs)
expect(input).toHaveValue('test@example.com')
```

### Interactions & Callbacks

```typescript
// Callback called once
expect(onClick).toHaveBeenCalledOnce()

// Callback called with args
expect(onChange).toHaveBeenCalledWith('new-value')

// Callback called N times
expect(onScroll).toHaveBeenCalledTimes(3)
```

### Accessibility

```typescript
// Element has accessible name
expect(button).toHaveAccessibleName('Submit')

// Element is disabled
expect(button).toBeDisabled()

// Focus management
expect(input).toHaveFocus()
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

## Anti-Patterns

| Problem                                   | Issue               | Fix                                          |
| ----------------------------------------- | ------------------- | -------------------------------------------- |
| `setTimeout()` in test                    | Slow, unreliable    | Use `waitFor()`                              |
| Multiple assertions, no context           | Hard to debug       | Group related assertions with comments       |
| Testing implementation details            | Brittle             | Test user-visible behavior                   |
| `.innerHTML` checks                       | Fragile             | Use semantic queries + `toHaveTextContent()` |
| Bare `querySelector()` without null check | Runtime error risk  | Use optional chaining or null checks         |
| No story args                             | Hard to reuse story | Always define `args` for flexibility         |
| Testing in wrong story                    | Confusing           | One story = one scenario                     |
| `any` type in mocks                       | Type unsafety       | Use proper mock types from Vitest            |

## Complete Example: Form Component

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

## Efficiency Tips

When working with LLMs on test writing:

- Provide component props/interface instead of full component code
- Ask for patterns for specific component types (button, form, list) to avoid context sprawl
- Reference this skill to avoid re-explaining assertion patterns
- Use [token-optimization](../token-optimization/SKILL.md) for efficient code exploration

## References

- [token-optimization](../token-optimization/SKILL.md) — Keep context minimal when discussing tests
- [code-conventions](../code-conventions/SKILL.md) — Naming, TypeScript, and test structure
- [Storybook Play Functions](https://storybook.js.org/docs/writing-tests/stories)
- [Vitest API](https://vitest.dev/api/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [userEvent API](https://testing-library.com/docs/user-event/intro)
