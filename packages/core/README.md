[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)

# @orchestra-design-system/core

Stencil-based web components for the Orchestra design system. Provides a comprehensive component library built with web standards, theme-aware styling, and extensive accessibility support.

## Installation

```bash
npm install @orchestra-design-system/core
```

## Features

- ✅ **Web Components** - Framework-agnostic, standards-based components
- ✅ **Shadow DOM Encapsulation** - Scoped styles and DOM isolation
- ✅ **Theme Support** - Light and dark themes via CSS variables
- ✅ **Design Tokens** - Integrated with @orchestra-design-system/themes token bundles
- ✅ **Icon System** - Extensible icon library with custom library support
- ✅ **Accessibility** - ARIA attributes, keyboard navigation, screen reader support
- ✅ **TypeScript** - Full type definitions included
- ✅ **Lazy Loading** - Automatic code splitting and lazy loading
- ✅ **SSR Ready** - Pre-rendering support for static sites

## Quick Start

### HTML

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="https://unpkg.com/@orchestra-design-system/core"></script>
  <link rel="stylesheet" href="https://unpkg.com/@orchestra-design-system/themes/light.css">
</head>
<body>
  <orchestra-button text="Click me"></orchestra-button>
</body>
</html>
```

### React

```tsx
import React from 'react'
import { defineCustomElements } from '@orchestra-design-system/core/loader'
import '@orchestra-design-system/themes/light.css'

defineCustomElements()

export default function App() {
  return <orchestra-button text="Click me"></orchestra-button>
}
```

### Vue

```vue
<script setup>
import { defineCustomElements } from '@orchestra-design-system/core/loader'
import '@orchestra-design-system/themes/light.css'

defineCustomElements()
</script>

<template>
  <orchestra-button text="Click me"></orchestra-button>
</template>
```

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { defineCustomElements } from '@orchestra-design-system/core/loader'

defineCustomElements()

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

```html
<!-- app.component.html -->
<orchestra-button text="Click me"></orchestra-button>
```

## Components

### Available Components

- **orchestra-button** - Button component with variants
- **orchestra-icon** - Icon component with library registry system

See [Storybook](../storybook/README.md) for interactive documentation and examples.

### Component Structure

Each component is located in `src/components/{name}/`:

```
src/components/button/
├── button.tsx           # Component implementation
├── button.css          # Shadow DOM styles
├── button.spec.ts      # Unit tests
├── readme.md           # Auto-generated docs
└── test/               # E2E tests (optional)
```

## Icon Component

The icon component supports multiple icon libraries using a registry system.

### Using Built-in Icons

```html
<orchestra-icon name="checked" size="24px" fill="currentcolor"></orchestra-icon>
```

Available from `@orchestra-design-system/icons-library`:

```typescript
import { iconNames } from '@orchestra-design-system/icons-library'

type IconName = typeof iconNames[number]
```

### Registering Custom Icon Libraries

```typescript
import { registerIconLibrary } from '@orchestra-design-system/core'

const myIcons = {
  'star': `<svg viewBox="0 0 24 24">...</svg>`,
  'heart': `<svg viewBox="0 0 24 24">...</svg>`,
}

registerIconLibrary('my-icons', {
  resolver: (name) => myIcons[name] ?? ''
})
```

Then use:
```html
<orchestra-icon name="star" library="my-icons"></orchestra-icon>
```

See [@orchestra-design-system/icons-library README](../icons-library/README.md) for details on custom libraries and Storybook integration.

## Theming

Components use CSS variables for theming. The recommended approach is to import the theme bundle from the dedicated themes package:

```html
<!-- Light theme (default) -->
<link rel="stylesheet" href="https://unpkg.com/@orchestra-design-system/themes/light.css">

<!-- Dark theme -->
<link rel="stylesheet" href="https://unpkg.com/@orchestra-design-system/themes/dark.css">
```

Or use in JavaScript:

```javascript
import '@orchestra-design-system/themes/light.css'
```

> Best practice: use the themes package in applications. The themes package is the source of truth for token sources and generated theme CSS bundles.

### Custom Themes

Override CSS variables in your styles:

```css
:root {
  --primary-color: #007bff;
  --primary-color-hover: #0056b3;
  --text-color: #333;
  --background-color: #fff;
}
```

See [Themes README](../themes/README.md) for complete token and theme reference.

## Development

### Setup

```bash
cd packages/core
npm install
```

### Build

```bash
npm run build:js        # Compile TypeScript → JavaScript
npm run build          # Full core build (JS + types)
```

### Watch Mode

```bash
npm run start:js       # Watch Stencil build and docs
npm run start          # Alias of start:js
```

Theme CSS is owned by `@orchestra-design-system/themes` and should be imported at the application layer (for example Storybook or consuming apps), not generated by the core package.

### Testing

```bash
npm run test           # Run full Stencil test suite
npm run test:watch     # Watch mode
npm run test:spec      # Unit/spec tests
npm run test:e2e       # Browser end-to-end tests
```

### Storybook

See [../storybook/README.md](../storybook/README.md) for component development and testing with Storybook.

## Implementation Workflow

Use this workflow when adding or updating components:

1. Implement component logic in `src/components/{name}/`.
2. Update tokens in `../themes/tokens/` if needed.
3. Build or regenerate theme bundles when token sources change.
4. Add or update stories in `../storybook/src/stories/`.
5. Add or update interaction assertions in Storybook play functions.
6. Build and verify:

```bash
npm run build
npm run test
```

## Building Components

### Creating a New Component

1. **Create component file** - `src/components/{name}/{name}.tsx`
2. **Define Stencil component**:

```typescript
import { Component, Prop, h } from '@stencil/core'

@Component({
  tag: 'orchestra-mycomponent',
  shadow: true,
  styleUrl: 'mycomponent.css',
})
export class MyComponent {
  @Prop() label!: string

  render() {
    return <button>{this.label}</button>
  }
}
```

3. **Add styles** - `src/components/{name}/{name}.css` (scoped to shadow DOM)
4. **Export from index** - `src/index.ts`
5. **Add story** - `../storybook/src/stories/components/{name}/{name}.stories.ts`
6. **Test in Storybook** - `npm run dev`

### Component Conventions

See [.github/instructions/component-conventions.instructions.md](.github/instructions/component-conventions.instructions.md) for:
- Naming conventions
- Property/method patterns
- Event handling
- Accessibility requirements
- Documentation standards

## Output Targets

Components are compiled to multiple formats:

- **ESM** - `dist/orchestra-design-system/index.esm.js` (modern browsers)
- **CommonJS** - `dist/index.cjs.js` (Node.js)
- **UMD** - `dist/orchestra-design-system.js` (browser globals)
- **Hydrate** - `hydrate/index.js` (server-side rendering)
- **Loader** - `loader/index.js` (lazy loading)

See `stencil.config.ts` for output target configuration.

## Distribution

Packages are published to npm:

```bash
npm install @orchestra-design-system/core
```

CDN:
```html
<script src="https://unpkg.com/@orchestra-design-system/core"></script>
```

## File Structure

```
packages/core/
├── src/
│   ├── components/       # Component implementations
│   │   ├── button/
│   │   ├── icon/
│   │   └── ...
│   ├── utils/            # Utility functions
│   │   ├── a11y.ts      # Accessibility utilities
│   │   └── ...
│   ├── types/            # TypeScript type definitions
│   ├── themes/           # CSS theme files (generated)
│   ├── helpers.ts        # Helper functions
│   └── index.ts          # Package entry point
├── dist/                 # Build output (generated)
├── stencil.config.ts     # Stencil configuration
├── tsconfig.json
├── package.json
└── README.md
```

## Learn More

- [Stencil Documentation](https://stenciljs.com)
- [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
