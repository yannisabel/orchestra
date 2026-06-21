# @orchestra-kit/icons-library

SVG icon library for Orchestra components. Provides pre-built SVG icons as TypeScript exports for use with the Orchestra icon component.

## Features

- ✅ SVGs embedded at build time (zero HTTP requests)
- ✅ TypeScript support with full type definitions
- ✅ ESM and CommonJS outputs
- ✅ Works seamlessly with `@orchestra-kit/core` icon component
- ✅ Supports dynamic color and size customization

## Installation

```bash
npm install @orchestra-kit/icons-library
```

## Usage

### With Orchestra Icon Component (Recommended)

The icon component automatically uses the 'core' library (pre-registered, no setup needed):

```jsx
<orchestra-icon name="checked" size="24px" fill="currentcolor"></orchestra-icon>
```

**Customize appearance:**

```jsx
<!-- Change color -->
<orchestra-icon name="checked" fill="#FF6B6B"></orchestra-icon>

<!-- Change size -->
<orchestra-icon name="checked" size="32px"></orchestra-icon>

<!-- Custom color and size -->
<orchestra-icon name="checked" fill="#4CAF50" size="48px"></orchestra-icon>
```

**Register as custom library (for consumers):**

```typescript
import { registerIconLibrary } from '@orchestra-kit/core'
import * as icons from '@orchestra-kit/icons-library'

registerIconLibrary('orchestra', {
  resolver: (name) => icons[name] ?? ''
})
```

Then use:
```jsx
<orchestra-icon name="checked" library="orchestra"></orchestra-icon>
```

### Direct Import

For non-component usage:

```typescript
// ESM
import { checked } from '@orchestra-kit/icons-library'

// CommonJS
const { checked } = require('@orchestra-kit/icons-library')
```

## Available Icons

All icons are automatically discovered from the `svg/` folder. Access the list programmatically:

```typescript
import { iconNames } from '@orchestra-kit/icons-library'

type IconName = typeof iconNames[number]  // Type union of all available icons
```

Current icons: `checked`

## Package Structure

```
packages/icons-library/
├── svg/                    # SVG source files
│   └── checked.svg
├── src/
│   ├── icons.ts           # Auto-generated icon string exports
│   ├── index.ts           # Auto-generated entry point
│   └── generate-icons.mjs # Icon generation script
├── dist/                  # Build outputs
│   ├── index.js           # ESM
│   ├── index.cjs          # CommonJS
│   └── index.d.ts         # TypeScript types
├── tsconfig.json
├── build.mjs              # ESM to CommonJS converter
└── package.json
```

**Key files:**
- `generate-icons.mjs` - Automatically generates `src/icons.ts` and `src/index.ts` from SVG files
- `src/icons.ts` - Auto-generated; contains `export const iconName = \`<svg>...\`` for each icon
- `src/index.ts` - Auto-generated; contains exports and `iconNames` constant array

## Adding Icons

### Automated Generation

Icons are automatically generated from SVG files. The build process handles all exports and the `iconNames` array.

### Step 1: Add SVG File
Place your SVG in `svg/` folder:
```
svg/my-icon.svg
```

### Step 2: Build
```bash
npm run build
```

The build process (`generate-icons.mjs`) automatically:
- Scans `svg/` for all SVG files
- Generates `src/icons.ts` with icon exports (as SVG strings)
- Generates `src/index.ts` with imports and updated `iconNames` array
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
import { iconNames, myIcon } from '@orchestra-kit/icons-library'

type IconName = typeof iconNames[number]  // Automatically includes 'myIcon'
```

### (Optional) Step 5: Register in Core Library

To add the icon to the default 'core' library, update `packages/core/src/components/icon/orchestra-library.ts`:

```typescript
import { checked, myIcon } from '@orchestra-kit/icons-library'

const icons = {
  'checked': checked,
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
import { registerIconLibrary } from '@orchestra-kit/core'

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
