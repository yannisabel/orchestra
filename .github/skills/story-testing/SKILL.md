---
name: story-testing
description: 'Write effective tests in Storybook stories using Vitest play functions. Use when testing components, interactions, accessibility, and state changes. Covers patterns for different component types (form inputs, buttons, modals, lists), user interactions, and assertions.'
argument-hint: "Describe your component type (e.g., 'form input', 'modal dialog', 'list component')"
user-invocable: true
---

# Story Testing

## Overview

Tests in Orchestra live in **Storybook Play functions** using **Vitest v4.1.9**. This is not Jest-it's Vitest running test code inside interactive stories. See [code-conventions](../code-conventions/SKILL.md) for naming and TypeScript rules.

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

## Procedure: Pick the Right Pattern

Match the component type below, then open the linked section in [patterns-by-type](./references/patterns-by-type.md) for full story code.

| Component type                   | Testing checklist                                               | Full pattern                                                                              |
| -------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Button                           | label, click handler, disabled state, variants                  | [patterns-by-type.md § Button](./references/patterns-by-type.md#button-component)         |
| Form input                       | label, placeholder, value updates, validation, error states     | [patterns-by-type.md § Form Input](./references/patterns-by-type.md#form-input-component) |
| Modal/Dialog                     | visibility, close button, overlay click, escape key, focus trap | [patterns-by-type.md § Modal](./references/patterns-by-type.md#modaldialog-component)     |
| List/Table                       | items render, empty state, sorting, filtering, pagination       | [patterns-by-type.md § List](./references/patterns-by-type.md#listtable-component)        |
| Select/Dropdown                  | options render, selection, keyboard navigation, open/close      | [patterns-by-type.md § Select](./references/patterns-by-type.md#selectdropdown-component) |
| Async data / delayed interaction | `waitFor`, delayed typing                                       | [patterns-by-type.md § Async](./references/patterns-by-type.md#async-patterns)            |
| Multi-field form                 | fill + submit, validation error                                 | [complete-example](./references/complete-example.md)                                      |

## Querying Best Practices

Prefer semantic queries, in order:

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

Always guard queries - use optional chaining or check existence before asserting:

```typescript
const button = canvasElement.querySelector('button')
await userEvent.click(button!) // non-null assertion only if you know it exists

const options = canvasElement.querySelectorAll('[role="option"]')
expect(options).toHaveLength(3)
```

## Assertion Patterns

```typescript
// Visibility & presence
expect(element).toBeInTheDocument()
expect(element).toBeVisible()
expect(element).toHaveTextContent('Expected text')
expect(element).not.toBeVisible()
expect(element).not.toBeInTheDocument()

// Attributes & classes
expect(input).toHaveAttribute('type', 'email')
expect(button).toHaveClass('primary', 'large')
expect(input).toHaveValue('test@example.com')

// Interactions & callbacks
expect(onClick).toHaveBeenCalledOnce()
expect(onChange).toHaveBeenCalledWith('new-value')
expect(onScroll).toHaveBeenCalledTimes(3)

// Accessibility
expect(button).toHaveAccessibleName('Submit')
expect(button).toBeDisabled()
expect(input).toHaveFocus()
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

## Efficiency Tips

When working with LLMs on test writing:

- Provide component props/interface instead of full component code
- Ask for patterns for specific component types (button, form, list) to avoid context sprawl
- Reference this skill to avoid re-explaining assertion patterns
- Use [token-optimization](../token-optimization/SKILL.md) for efficient code exploration

## References

- [patterns-by-type](./references/patterns-by-type.md) - full story code per component type + async patterns
- [complete-example](./references/complete-example.md) - full multi-field form example
- [token-optimization](../token-optimization/SKILL.md) - keep context minimal when discussing tests
- [code-conventions](../code-conventions/SKILL.md) - naming, TypeScript, and test structure
- [Storybook Play Functions](https://storybook.js.org/docs/writing-tests/stories)
- [Vitest API](https://vitest.dev/api/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [userEvent API](https://testing-library.com/docs/user-event/intro)
