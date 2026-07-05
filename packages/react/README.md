# @orchestra-design-system/react

React wrapper components for Orchestra web components.

## Installation

```bash
npm install @orchestra-design-system/react
```

`@orchestra-design-system/core` is installed transitively by the React wrapper.

The wrapper expects `react` and `react-dom` as peer dependencies (`>=17 <20`). Most React apps already provide these.

Install core explicitly only if your app imports from core directly (for example `@orchestra-design-system/core/loader` or raw web component modules).

## Usage

```tsx
import { OrchestraButton, OrchestraIcon } from '@orchestra-design-system/react'

export function Example() {
  return (
    <div>
      <OrchestraButton variant="primary" text="Save" />
      <OrchestraIcon name="checked" size="20px" />
    </div>
  )
}
```

## Available components

- `OrchestraButton`
- `OrchestraIcon`

These wrappers are generated from core Stencil components.

## Scripts

```bash
npm run build
```

Build output is emitted to `dist/`.

## Development notes

- Source proxies are in `lib/components/stencil-generated/`.
- Core component behavior and styles come from `@orchestra-design-system/core`.
- For component API details, see [../core/README.md](../core/README.md).
