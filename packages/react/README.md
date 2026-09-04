# @orchestra-design-system/react

React wrapper package for the Orchestra design system.

This package exposes the Stencil-based web components as React-friendly components for use in React applications.

## Installation

```bash
npm install @orchestra-design-system/react
```

The package installs the core component runtime transitively. React and React DOM are peer dependencies and should already be present in most React apps.

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

- OrchestraButton
- OrchestraIcon

These wrappers are generated from the Stencil source in the core package.

## Build

```bash
npm run build
```

Build output is emitted to the package dist folder.

## Notes

- Generated proxy code lives under lib/components/stencil-generated.
- Component behavior and styles are sourced from the core package.
- See [../core/readme.md](../core/readme.md) for the underlying component APIs.
