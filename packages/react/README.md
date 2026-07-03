# @orchestra-kit/react

React wrapper components for Orchestra web components.

## Installation

```bash
npm install @orchestra-kit/react @orchestra-kit/core
```

## Usage

```tsx
import { OrchestraButton, OrchestraIcon } from '@orchestra-kit/react'

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
- Core component behavior and styles come from `@orchestra-kit/core`.
- For component API details, see [../core/README.md](../core/README.md).
