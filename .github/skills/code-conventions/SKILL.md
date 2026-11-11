---
name: code-conventions
description: 'Apply Orchestra monorepo code conventions. Use when writing components, utilities, or tests. Covers naming (kebab-case files, PascalCase classes, use* hooks), TypeScript strict mode, type safety, and testing with Vitest/Storybook.'
argument-hint: "Describe what you're building (e.g., 'new component', 'utility function', 'test')"
user-invocable: true
---

# Code Conventions

## Quick Reference

| Category       | Rule                                | Example                                      |
| -------------- | ----------------------------------- | -------------------------------------------- |
| **Files**      | kebab-case                          | `button.ts`, `form-input.tsx`                |
| **Classes**    | PascalCase                          | `ButtonComponent`, `FormHandler`             |
| **Hooks**      | `use*` prefix                       | `useButtonState`, `useFormValidation`        |
| **TypeScript** | Strict mode, no `any`               | Use `unknown` + type guards                  |
| **Styling**    | Parts and `data-*`, no classes      | `[part='label']`, `[data-variant='primary']` |
| **Tests**      | Vitest via Storybook play functions | `play` in `*.stories.ts` files               |
| **Node**       | >= 24                               | Always target modern Node                    |

## Environment & Setup

### Node Version

- **Minimum**: Node 24+
- Check: `node --version` should return v24.x.x or higher
- Configure in: `package.json` engines field or `.nvmrc`

### TypeScript Configuration

- Strict mode is the standard. `packages/angular`, `packages/icons-library`, and `packages/storybook` set `"strict": true` in `tsconfig.json`
- `packages/react` currently sets `"strict": false`. Do not copy that setting into new code
- No exceptions for `any` type - use `unknown` with type guards instead

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
      button.stories.ts
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

### npm Scripts

**Pattern**: `action:context` with a colon separating segments (action first, e.g. `build:`, `lint:`, `check:`); kebab-case within each segment

✅ **Correct**:

```json
"check:design-tokens": "node packages/core/scripts/design-tokens-check.mjs",
"build:design-tokens": "npx lerna run build --scope='@orchestra-design-system/themes'",
"test:components": "npm run test:components --workspace=@orchestra-design-system/storybook -- --run"
```

❌ **Incorrect**:

```json
"design-tokens-check": "...",   # Hyphen instead of colon between segments
"design-tokens:check": "...",   # Context before action
"checkDesignTokens": "...",     # camelCase
"design_tokens_check": "...",   # snake_case
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
  return isRecord(value) && 'text' in value && typeof value.text === 'string';
}

// Usage
function handleData(data: unknown) {
  if (isButtonProps(data)) {
    // TypeScript now knows: data.label is string
    return <Button {...data} />;
  }
}
```

## Styling & Customization (Headless)

Orchestra components are headless. They carry structure and state, and the theme comes only from design tokens.

- Expose every visual part with `part="..."` and document it with a JSDoc `@part` tag on the component class
- Expose state with `data-*` attributes (e.g. `data-variant`, `data-size`, `data-disabled`), not with classes
- Do not add `class` attributes to rendered elements
- In shadow CSS, select with `[part='...']` and attribute selectors. Never select by tag name (`svg`, `span`, `label`, `input`)
- Keep native pseudo-classes (`:checked`, `:disabled`, `:focus-visible`) where the element already carries the state
- Read values only from `--orchestra-*` design tokens in CSS

✅ **Correct**:

```css
[part='control']:checked ~ [part='indicator'] {
  color: var(--orchestra-color-action-toggle-on-content-default);
}
```

❌ **Incorrect**:

```css
.orchestra-checkbox-visual {
} /* class selector */
svg {
} /* tag selector */
```

## Testing

### Framework: Vitest (Not Jest)

- Use **Vitest** for stories and play functions; the Storybook Vitest addon (`@storybook/addon-vitest`) runs them
- Play functions import from `storybook/test` (`expect`, `userEvent`, `within`, `fn`)
- No separate test files in `__tests__` folders (tests live in stories)

### Test File Structure

Tests are embedded in Storybook story files (`packages/storybook/src/pages/components/`):

```typescript
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { expect, fn, userEvent, within } from 'storybook/test'

const meta: Meta = { title: 'Components/Button', component: 'orchestra-button' }
export default meta
type Story = StoryObj

export const Primary: Story = {
  args: { text: 'Click me', variant: 'primary' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Click me' })

    await expect(button).toHaveAttribute('data-variant', 'primary')
    await userEvent.click(button)
  },
}

export const WithCallback: Story = {
  args: { text: 'Test', onClick: fn() },
}
```

### Test Naming

- ✅ Descriptive, human-readable names
- ✅ Use `describe()` and `it()` from Vitest
- ✅ One test per story when possible

```typescript
describe('Button Component', () => {
  it('renders with label', () => {})
  it('calls onClick when clicked', () => {})
  it('applies data-disabled when disabled', () => {})
})
```

## Package Organization

The monorepo uses npm workspaces with Lerna-compatible release scripts:

```
packages/
  core/               # Stencil components & shared runtime
  react/              # React wrapper components
  vue/                # Vue wrapper components
  angular/            # Angular wrapper components
  storybook/          # Storybook + testing setup
  themes/             # Design token generation
  icons-library/      # Generated icon exports from SVG assets
```

### Adding a New Package

1. Create folder under `packages/`
2. Name folder in kebab-case: `my-package`
3. Create `package.json` with workspace name: `@orchestra-design-system/my-package`
4. Update root `lerna.json` if needed

## Component Example

**File**: `packages/core/src/components/button/button.tsx` (Stencil, headless)

```typescript
// kebab-case file, PascalCase class, typed props, parts and data-* only
@Component({ tag: 'orchestra-button', styleUrl: 'button.css', shadow: true })
export class OrchestraButton {
  @Prop() text!: string
  @Prop() variant: 'primary' | 'secondary' | 'tertiary' = 'primary'
  @Prop() disabled = false

  render() {
    return (
      <button part="button" data-variant={this.variant} data-disabled={this.disabled ? '' : undefined} disabled={this.disabled}>
        <span part="label">{this.text}</span>
      </button>
    )
  }
}
```

```css
/* button.css: select parts, read tokens */
[part='button'] {
  color: var(--orchestra-color-action-primary-content-default);
}
[part='button'][data-variant='secondary'] {
  color: var(--orchestra-color-action-secondary-content-default);
}
```

See [stencil-components](../stencil-components/SKILL.md) for the full pattern.

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

- Linter: oxlint, run through `npm run lint` (root `package.json`)
- Strict checking is set per package in `tsconfig.json` (see above)

Run locally:

```bash
npm run lint              # oxlint; the script already passes --fix
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
