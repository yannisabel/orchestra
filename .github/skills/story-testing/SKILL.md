---
name: story-testing
description: 'Write effective tests in Storybook stories using Vitest play functions. Use when testing components, interactions, accessibility, and state changes. Covers patterns for different component types (form inputs, buttons, modals, lists), user interactions, and assertions.'
argument-hint: "Describe your component type (e.g., 'form input', 'modal dialog', 'list component')"
user-invocable: true
---

# Story Testing

## Overview

Tests in Orchestra live in **Storybook Play functions** and run with **Vitest v4** through `@storybook/addon-vitest`. This is not Jest - it is Vitest running test code inside interactive stories. See [code-conventions](../code-conventions/SKILL.md) for naming and TypeScript rules.

**Stack**:

- Vitest v4 (test runner, via `@storybook/addon-vitest`)
- Storybook v10.4.6 (`@storybook/web-components-vite`)
- Playwright (browser automation and a11y e2e)
- `storybook/test` (`expect`, `fn`, `userEvent`, `within`, `waitFor`)

**Key principle**: One story = one test scenario. Each story demonstrates a visual state AND verifies it behaves correctly.

## Consumer-Facing Playwright Coverage

For exact Playwright locator behavior and native browser input, use
`packages/storybook/e2e/a11y/accessibility.spec.ts` with
`packages/storybook/playwright.config.ts`. The consumer-interface story has no
play function so the browser tests own all interactions. Run from the repo root:

```bash
npm run build:js --workspace=@orchestra-design-system/core
npm run test:a11y
```

Root `npm run test` runs Storybook/Vitest and then `npm run test:a11y`, which
runs the Storybook a11y checks and Playwright accessibility specs. Root
`npm run test:components` runs only the Storybook/Vitest suite. Root `test:coverage` delegates to
the workspace `test:components:coverage` command in single-run mode.
Build packages before testing. CI runs both suites in parallel matrix jobs,
each building packages independently. The workspace `test:components` command
still supports interactive watch mode.

Prefer role/name or label locators, real pointer and keyboard actions, and
visible outcomes. Do not dispatch synthetic host keyboard events or inspect
shadow markup to prove user-facing behavior. Keep component-specific regression
tests in Storybook play functions; `findByShadowRole()` is not the actual
Playwright `getByRole()` API.

## Story Structure Template

```typescript
// packages/storybook/src/pages/components/[component]/[component].stories.ts
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { expect, fn, userEvent, within } from 'storybook/test'

const meta = {
  title: 'Components/[ComponentName]',
  component: 'orchestra-[component]',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Story with play function (test)
export const Primary: Story = {
  args: {
    // Component props
  },
  play: async ({ canvasElement }) => {
    // Test here
  },
}
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

Orchestra components use Shadow DOM. Query the host first, then its `shadowRoot`. `canvasElement.querySelector` and `within(canvasElement)` do not reach inside a shadow root.

```typescript
const host = canvasElement.querySelector('orchestra-button')!
const button =
  host.shadowRoot!.querySelector<HTMLButtonElement>("[part='button']")!

// Preferred: stable parts and data-* hooks
host.shadowRoot!.querySelector("[part='label']")
host.shadowRoot!.querySelector("[data-variant='primary']")

// Role/name queries work on the shadow root's elements
within(host.shadowRoot!).getByRole('button', { name: 'Click me' })
```

Prefer semantic queries, in order:

```typescript
// ✅ Best: By role (accessible to users)
within(host.shadowRoot!).getByRole('button', { name: 'Click me' })

// ✅ Good: By part or data-* hook (the headless API)
host.shadowRoot!.querySelector("[part='button']")

// ❌ Avoid: By class name (Orchestra does not use classes)
canvasElement.querySelector('.my-button-class')

// ❌ Avoid: By test ID (use only as last resort)
canvasElement.querySelector('[data-testid="submit"]')
```

Always guard queries - use optional chaining or check existence before asserting:

```typescript
const button =
  host.shadowRoot?.querySelector<HTMLButtonElement>("[part='button']")
if (!button) throw new Error('button part not rendered')
await userEvent.click(button)

const options = host.shadowRoot!.querySelectorAll("[part='option']")
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

// Attributes & parts (headless hooks; no classes)
expect(button).toHaveAttribute('data-variant', 'primary')
expect(button).toHaveAttribute('data-size', 'large')
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
| Class assertions (`toHaveClass`)          | Breaks headless API | Assert `data-*` attributes or behavior       |
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
