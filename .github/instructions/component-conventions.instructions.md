---
name: component-conventions
applyTo: 'packages/core/src/components/**'
description: 'Code conventions and patterns for Orchestra component development'
---

# Orchestra Component Development Conventions

## Component Structure

Each component lives in its own directory:

```
src/components/icon/
  ├── icon.tsx          # Component implementation (Stencil)
  ├── icon.css          # Scoped styles (shadow DOM)
  ├── readme.md         # Generated from JSDoc
  ├── library.ts        # Shared utilities (if needed)
  └── *.ts              # Helper modules
```

When a component file is renamed, moved, or its API changes, grep `.github/` and package READMEs for its name and update each mention.

Tests are **not** colocated as `*.spec.ts` in the component folder - see
[Testing Pattern](#testing-pattern) below.

## Stencil Component Pattern

### Imports & Decorators

```typescript
import { Component, Element, Host, Prop, State, Watch, h } from '@stencil/core'
import DOMPurify from 'dompurify'

@Component({
  tag: 'orchestra-name',
  shadow: true,
  styleUrl: 'name.css',
})
export class OrchestraName {
  // implementation
}
```

### Props (with JSDoc)

```typescript
/**
 * Brief description of prop
 */
@Prop({ mutable: true }) propName!: string

@Prop({ mutable: true }) fill?: string | 'currentcolor' = 'currentcolor'
```

- Mark as `mutable` to allow external updates
- Always provide sensible defaults
- Use union types for constrained values
- Include JSDoc comment (auto-generates readme)

### State

```typescript
@State() svg: string = ''
```

- Only for internal UI state
- Not accessible to consumers
- Use for caching/temporary data

### Element Reference

```typescript
@Element() host!: SVGElement
```

- Reference to the custom element itself
- Use for shadow DOM manipulation
- Type as appropriate element type

### Property Watchers

```typescript
@Watch('propName')
protected handlePropChange(newValue: string): void {
  // Synchronous logic only
  // Call other methods, update state
  // AVOID: async/await here (use separate methods)
}
```

- React to prop changes
- Keep synchronous
- Call methods for async operations

### Lifecycle

```typescript
public componentWillLoad(): void {
  // Called before first render
  // Setup logic, fetch data preparation
}
```

- `componentWillLoad`: Before render (use for init)
- `componentDidLoad`: After render (DOM available)

### Rendering

```typescript
public render() {
  return <Host></Host>
}
```

- JSX syntax
- `<Host>` renders component as web component
- Use shadow DOM for style encapsulation
- Insert dynamic content via shadow DOM manipulation

## Styling Pattern

### Headless Styling

- Expose each visual element with `part="..."` and document it with a JSDoc `@part` tag on the class
- Expose state with `data-*` attributes, never with classes
- Do not add `class` attributes to rendered elements
- In shadow CSS, select with `[part]` and attribute selectors, never by tag name
- Read values only from `--orchestra-*` design tokens

### CSS Variables

```css
:host {
  --component-color: currentcolor;
  --component-size: 100%;
  display: flex;
}

:host [part='svg'] {
  fill: var(--component-color);
  width: var(--component-size);
  height: var(--component-size);
}
```

- Define CSS custom properties in `:host`
- Use for themeable values
- Apply via `style.setProperty()` in component

```typescript
this.host.shadowRoot
  .querySelector("[part='svg']")
  ?.style.setProperty('--icon-color', color)
```

## Security Pattern

### SVG Sanitization

```typescript
import DOMPurify from 'dompurify'

public sanitizeSVG(): void {
  this.host.shadowRoot!.innerHTML = DOMPurify.sanitize(this.svg, {
    USE_PROFILES: { svg: true, svgFilters: true }
  })
}
```

- Always sanitize untrusted SVG content
- Use DOMPurify with SVG profile
- Call before inserting into DOM

## Accessibility Pattern

### Decorative Content

```typescript
this.host.setAttribute('aria-hidden', 'true')
```

- Mark decorative elements as hidden from screen readers
- Prevents duplicate announcements
- Use when icon is supplementary (fill color, visual indicator only)
- `orchestra-icon` is decorative by default. Set its `label` property for a
  standalone informative icon; it exposes `role="img"` and a matching
  `aria-label` on the host. Keep the internal SVG hidden from assistive technology.

## Testing Pattern

Two test layers exist:

- **Storybook play functions** (Vitest via `@storybook/addon-vitest`) cover component behavior, interactions, and a11y. Write them under `packages/storybook/src/pages/components/{component}/`. See [story-testing](../skills/story-testing/SKILL.md) for patterns by component type.
- **Stencil spec tests** (`npm run test:spec` in `packages/core`) can use `newSpecPage` for isolated render checks. `npm run test:e2e` runs browser tests.

```typescript
// packages/storybook/src/pages/components/{component}/{component}.stories.ts
import { expect } from 'storybook/test'

export const Primary: Story = {
  args: {/* props */},
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector('orchestra-component')
    expect(el).toBeInTheDocument()
  },
}
```

- Query inside the shadow root (`el.shadowRoot`) and select by `part` or `data-*`
- Use `waitForChanges()` in Stencil spec tests after prop changes

## Build Configuration

### Stencil Config

```typescript
// stencil.config.ts
export const config: Config = {
  namespace: 'orchestra-design-system',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    // ... more targets
  ],
}
```

- Each package has own namespace
- Multiple output targets for different environments
- Built via `npm run build:js` (stencil build)

### Package.json Scripts

```json
{
  "scripts": {
    "build:js": "stencil build --docs",
    "start:js": "stencil build --docs --watch",
    "test:spec": "stencil-test --project spec",
    "test:e2e": "stencil-test --project browser"
  }
}
```

- `build:js` compiles Stencil components
- `start:js` runs the build in watch mode for development
- Run `npm run build:js` inside `packages/core` (`npm run build` is an alias)

## Module System

### Exports (index.ts)

```typescript
// packages/core/src/index.ts
export {
  registerIconLibrary,
  unregisterIconLibrary,
  getIconLibrary,
} from './components/icon/library'
```

- `src/index.ts` exports utilities and the icon library API, not components
- Components are registered by the Stencil build (`dist`, `loader`, and framework wrappers); do not add component exports to `index.ts`
- Keep public API clean

### Imports

**From local modules:**

```typescript
import { helper } from './helper'
```

**From npm packages:**

```typescript
import { registerIconLibrary } from '@orchestra-design-system/core'
```

**From other orchestra packages:**

```typescript
import { checked } from '@orchestra-design-system/icons-library'
```

Guidelines:

- Use relative paths for internal modules
- Use package names for monorepo packages
- Monorepo packages resolved via npm workspaces

## Documentation

### JSDoc in Props

```typescript
/**
 * The name of the icon to display. Resolves using registered icon libraries.
 */
@Prop({ mutable: true }) name!: string
```

- Auto-generates `readme.md` from JSDoc
- Describe usage, defaults, constraints
- Visible in Storybook docs

### Storybook Stories

```typescript
// component.stories.ts
const meta = {
  component: 'orchestra-component',
  title: 'Components/orchestra-component',
  argTypes: {/* ... */},
} satisfies Meta<typeof OrchestraComponent>

export const Default: Story = {
  args: { propName: 'value' },
}
```

- Show primary use case
- Include prop variations
- Stories live in `packages/storybook/src/pages/components/{component}/` as `.stories.ts`
