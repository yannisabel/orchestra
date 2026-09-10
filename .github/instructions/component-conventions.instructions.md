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

Tests are **not** colocated as `*.spec.ts` in the component folder - see
[Testing Pattern](#testing-pattern) below.

## Stencil Component Pattern

### Imports & Decorators

```typescript
import { Component, Element, Host, Prop, State, Watch, h } from '@stencil/core'
import DOMPurify from 'dompurify'

@Component({
  tag: 'orchestra-{name}',
  shadow: true,
  styleUrl: '{name}.css',
})
export class Orchestra {
  Name
}
{
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

### CSS Variables

```css
:host {
  --component-color: currentcolor;
  --component-size: 100%;
  display: flex;
}

:host svg {
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
  .querySelector('svg')
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

## Testing Pattern

Orchestra does **not** use Stencil's `newSpecPage`/colocated `*.spec.ts` pattern for
component behavior, even though `packages/core/package.json` still exposes a
`test:spec` script. The CI-enforced, canonical pattern is Storybook `play`
functions with Vitest assertions, written under
`packages/storybook/src/stories/components/{component}/`. See
[story-testing](../skills/story-testing/SKILL.md) for the full pattern by
component type.

```typescript
// packages/storybook/src/stories/components/{component}/{component}.stories.ts
import { expect } from '@storybook/test'

export const Primary: Story = {
  args: {/* props */},
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector('orchestra-component')
    expect(el).toBeInTheDocument()
  },
}
```

- Use `newSpecPage` for unit tests
- Test prop changes with `waitForChanges()`
- Test shadow DOM content

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
    "build:css": "vite build --config vite-style.config.js",
    "build:js": "stencil build --docs",
    "start:js": "stencil build --docs --watch"
  }
}
```

- `build:js` compiles Stencil components
- `build:css` compiles CSS variables
- Both run in build, watch available for dev

## Module System

### Exports (index.ts)

```typescript
// packages/core/src/index.ts
export { OrchestraIcon } from './components/icon/icon'
```

- Export components for library consumers
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
- Link to component docs via MDX
