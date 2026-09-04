# @orchestra-design-system/icons-library

Generated SVG icon library for the Orchestra design system.

This package bundles icon assets as TypeScript exports and exposes them to the core icon component through a registry-based runtime.

## Installation

```bash
npm install @orchestra-design-system/icons-library
```

## Usage

```tsx
<orchestra-icon name="checked" size="24px" fill="currentColor"></orchestra-icon>
```

If you need to register a custom library at runtime, use the registry helpers from the core package.

```ts
import { registerIconLibrary } from '@orchestra-design-system/core'

registerIconLibrary('custom', {
  resolver: (name) => ({ star: '<svg>...</svg>' })[name] ?? '',
})
```

## Build

```bash
npm run build
```

The build process scans the SVG source folder and generates the exports used by the design system.

## Notes

- SVG sources live in the svg folder.
- Generated exports are produced in src and exposed through the package entrypoint.
- The default icon library is consumed by the core icon component without extra setup in most apps.
- See [../core/README.md](../core/README.md) for the component runtime details.
- Compiles TypeScript to ESM and CommonJS

**Filename to export name:**

- `checked.svg` → `checked`
- `check-icon.svg` → `checkIcon`
- `arrow-right.svg` → `arrowRight`

### Step 3: SVG Guidelines

When creating SVGs, follow these guidelines:

- Remove hardcoded `fill` colors (use `fill="none"` or omit)
- Include `viewBox` for responsive scaling
- Keep SVG markup clean and minimal

### Step 4: Use in Components or Storybook

The icon is automatically exported and available:

```typescript
import { iconNames, myIcon } from '@orchestra-design-system/icons-library'

type IconName = (typeof iconNames)[number] // Automatically includes 'myIcon'
```

### (Optional) Step 5: Register in Core Library

To add the icon to the default 'core' library, update `packages/core/src/components/icon/orchestra-library.ts`:

```typescript
import { checked, myIcon } from '@orchestra-design-system/icons-library'

const icons = {
  checked: checked,
  'my-icon': myIcon,
}
```

Then rebuild core: `npm run build:js` in `packages/core`

## Building

```bash
npm run build
```

Outputs:

- `dist/index.js` (ESM)
- `dist/index.cjs` (CommonJS)
- `dist/index.d.ts` (TypeScript types)

All formats include embedded SVG strings, no additional assets needed.

## Color Customization

Icons in the orchestra-icon component support the `fill` prop via CSS custom properties:

```jsx
<orchestra-icon name="checked" fill="#FF6B6B"></orchestra-icon>
```

This sets the `--icon-color` CSS variable which applies to all SVG child elements.

## Distribution

The package exports pre-built SVG strings suitable for:

- Direct component usage via `<orchestra-icon>`
- Custom library registration
- Direct SVG string rendering
- Server-side rendering (no DOM required)

## Library Integration

Consumers can create custom icon libraries:

```typescript
import { registerIconLibrary } from '@orchestra-design-system/core'

// Create library resolver
const myLibraryResolver = (name) => {
  const icons = {
    'star': '<svg>...</svg>',
    'heart': '<svg>...</svg>'
  }
  return icons[name] ?? ''
}

// Register it
registerIconLibrary('myLib', { resolver: myLibraryResolver })

// Use it
<orchestra-icon name="star" library="myLib"></orchestra-icon>
```

See [icon-library-system SKILL](../../.github/skills/icon-library-system/SKILL.md) for complete API reference.

## License

MIT
