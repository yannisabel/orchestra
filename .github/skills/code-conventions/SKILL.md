---
name: code-conventions
description: 'Apply Orchestra monorepo code conventions. Use when writing components, utilities, or tests. Covers naming (kebab-case files, PascalCase classes, use* hooks), TypeScript strict mode, type safety, and testing with Vitest/Storybook.'
argument-hint: "Describe what you're building (e.g., 'new component', 'utility function', 'test')"
user-invocable: true
---

# Code Conventions

## Quick Reference

| Category       | Rule                  | Example                                   |
| -------------- | --------------------- | ----------------------------------------- |
| **Files**      | kebab-case            | `button.ts`, `form-input.tsx`             |
| **Classes**    | PascalCase            | `ButtonComponent`, `FormHandler`          |
| **Hooks**      | `use*` prefix         | `useButtonState`, `useFormValidation`     |
| **TypeScript** | Strict mode, no `any` | Use `unknown` + type guards               |
| **Tests**      | Vitest (not Jest)     | `*.spec.ts` directly in component stories |
| **Node**       | >= 24                 | Always target modern Node                 |

## Environment & Setup

### Node Version

- **Minimum**: Node 24+
- Check: `node --version` should return v24.x.x or higher
- Configure in: `package.json` engines field or `.nvmrc`

### TypeScript Configuration

- All projects use **TypeScript strict mode**
- `tsconfig.json` must include: `"strict": true`
- No exceptions for `any` type — use `unknown` with type guards instead

## Naming Conventions

### Files & Directories

**Pattern**: kebab-case (lowercase, hyphens for spaces)

✅ **Correct**:

```
src/
  components/
    button/
      button.ts
      button.tsx
      button.spec.ts
    form-input/
      form-input.tsx
  utils/
    string-helpers.ts
    date-formatter.ts
```

❌ **Incorrect**:

```
src/components/Button.ts         # PascalCase
src/components/button_component.ts  # snake_case
src/utils/stringHelpers.ts       # camelCase
```

### Classes & Types

**Pattern**: PascalCase (uppercase first letter, each word)

✅ **Correct**:

```typescript
class ButtonComponent {}
interface FormProps {}
type ValidationState = 'valid' | 'invalid'
class DateFormatter {}
```

❌ **Incorrect**:

```typescript
class button_component {}
interface formProps {}
class dateFormatter {}
```

### React Hooks

**Pattern**: `use*` prefix, then descriptive name in camelCase

✅ **Correct**:

```typescript
function useButtonState() {}
function useFormValidation(schema) {}
function useLocalStorage(key) {}
```

❌ **Incorrect**:

```typescript
function ButtonState() { }        # Missing 'use' prefix
function UseButtonState() { }     # Capitalized after 'use'
function getButtonState() { }     # Non-hook naming
```

### Variables & Functions

**Pattern**: camelCase (lowercase first word, then PascalCase)

✅ **Correct**:

```typescript
let isActive = false
const handleClick = () => {}
function validateEmail(email: string) {}
const MAX_RETRIES = 3 // Constants: UPPER_SNAKE_CASE
```

## Type Safety

### No `any` Type

TypeScript strict mode forbids `any`. Use `unknown` with type guards.

❌ **Forbidden**:

```typescript
function process(data: any) {
  return data.value
}
```

✅ **Correct**:

```typescript
function process(data: unknown): string {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return String(data.value)
  }
  throw new Error('Invalid data')
}
```

### Type Guards

Create explicit type predicates when working with `unknown`:

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isButtonProps(value: unknown): value is ButtonProps {
  return isRecord(value) && 'label' in value && typeof value.label === 'string';
}

// Usage
function handleData(data: unknown) {
  if (isButtonProps(data)) {
    // TypeScript now knows: data.label is string
    return <Button {...data} />;
  }
}
```

## Testing

### Framework: Vitest (Not Jest)

- Use **Vitest** for all unit tests
- Tests run in Play functions within Storybook stories
- No separate test files in `__tests__` folders (tests live in stories)

### Test File Structure

Tests are embedded in Storybook story files:

```typescript
// src/components/button/button.stories.tsx
import { describe, it, expect, vi } from 'vitest';

export const Primary = {
  render: () => <Button label="Click me" />,
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');
    expect(button).toHaveTextContent('Click me');

    // Simulate user interaction
    button?.click();
    await expect(button).toHaveClass('active');
  },
};

export const WithCallback = {
  render: () => <Button label="Test" onClick={vi.fn()} />,
  play: async () => {
    // Test interaction and callback
  },
};
```

### Test Naming

- ✅ Descriptive, human-readable names
- ✅ Use `describe()` and `it()` from Vitest
- ✅ One test per story when possible

```typescript
describe('Button Component', () => {
  it('renders with label', () => {})
  it('calls onClick when clicked', () => {})
  it('applies disabled class when disabled', () => {})
})
```

## Package Organization

The monorepo uses **Lerna** with workspaces:

```
packages/
  core/               # Stencil components & shared
  react/              # React wrapper components
  vue/                # Vue wrapper components
  angular/            # Angular wrapper components
  storybook/          # Shared Storybook config
  design-tokens/      # Design token generation
  icons/              # Icon assets
```

### Adding a New Package

1. Create folder under `packages/`
2. Name folder in kebab-case: `my-package`
3. Create `package.json` with workspace name: `@orchestra/my-package`
4. Update root `lerna.json` if needed

## Component Example

**File**: `src/components/button/button.tsx`

```typescript
// ✅ Good: kebab-case file, PascalCase class, strict types
import { FC } from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
```

**File**: `src/components/button/button.stories.tsx`

```typescript
import { describe, it, expect } from 'vitest';
import { Button } from './button';

export const Primary = {
  render: () => <Button label="Click me" />,
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');
    expect(button?.textContent).toBe('Click me');
  },
};

export const Disabled = {
  render: () => <Button label="Disabled" disabled />,
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');
    expect(button).toBeDisabled();
  },
};
```

## Hook Example

**File**: `src/hooks/use-form-state.ts`

```typescript
import { useState, useCallback } from 'react'

interface FormState {
  values: Record<string, unknown>
  errors: Record<string, string>
  isDirty: boolean
}

export function useFormState(initialValues: Record<string, unknown>) {
  const [state, setState] = useState<FormState>({
    values: initialValues,
    errors: {},
    isDirty: false,
  })

  const setFieldValue = useCallback((field: string, value: unknown) => {
    setState((prev) => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      isDirty: true,
    }))
  }, [])

  return { state, setFieldValue }
}
```

## Common Mistakes

| Mistake                  | Issue                    | Fix                                     |
| ------------------------ | ------------------------ | --------------------------------------- |
| `function MyComponent()` | Mixed naming conventions | Use `const MyComponent: FC = ()`        |
| `data: any`              | Type safety violation    | Use `data: unknown` + type guard        |
| Tests in `__tests__/`    | Wrong structure          | Put tests in Storybook Play functions   |
| `using Jest`             | Wrong test framework     | Switch to Vitest                        |
| `button.tsx` in root     | Wrong structure          | Place in `components/button/button.tsx` |
| Node 20                  | Outdated version         | Update to Node 24+                      |

## ESLint & Formatting

- ESLint config: `eslint.config.mjs` (root)
- TypeScript strict checking enforced in all workspaces
- Prettier for formatting (integrated with ESLint)

Run locally:

```bash
npm run lint              # Check violations
npm run lint -- --fix    # Auto-fix violations
```

## Efficiency Tips

When working with LLMs, keep requests focused and use memory to store discovered patterns:

- Reference this skill to avoid re-explaining conventions
- Store common component patterns in `/memories/repo/`
- Use [token-optimization](../token-optimization/SKILL.md) for efficient code exploration

## References

- [token-optimization](../token-optimization/SKILL.md) — Reduce context bloat when discussing code
- [TypeScript Handbook: Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
- [Vitest Documentation](https://vitest.dev/)
- [Storybook Play Functions](https://storybook.js.org/docs/writing-tests/stories)
- [MDN documentation](https://developer.mozilla.org/en-US/)
