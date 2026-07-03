# @orchestra-kit/design-tokens

Design tokens for Orchestra - a theme-aware, maintainable design system exported from Figma.

## Features

- 🎨 **Light/Dark Theme Support** - Single source of truth, theme-specific values
- 📦 **Multi-Format Export** - CSS variables, JSON, and TypeScript
- 🔄 **Automatic Theme Switching** - No code changes, just CSS classes
- 🎯 **Semantic Naming** - Meaningful token names (not "blue-500", but "text-primary")
- ♿ **Accessibility-First** - Token structure enforces a11y decisions
- ✨ **Zero Runtime Overhead** - All tokens embedded at build time

## Quick Start

### Install

```bash
npm install @orchestra-kit/design-tokens
```

### Import Themes

```typescript
// Import both themes (light is default)
import '@orchestra-kit/design-tokens/dist/css/variables.light.css'
import '@orchestra-kit/design-tokens/dist/css/variables.dark.css'

// Toggle theme
document.documentElement.classList.toggle('orchestra-theme--dark')
```

### Use in Components

```css
/* Component CSS */
button {
  background-color: var(--orchestra-color-action-primary-container-default);
  color: var(--orchestra-color-action-primary-content-default);
  padding: var(--orchestra-spacing-action-inline-container);
  border-radius: var(--orchestra-radius-action-container);
}

button:hover {
  background-color: var(--orchestra-color-action-primary-container-hover);
}
```

Colors, spacing, and sizing automatically adjust when theme changes—no component logic needed.

### JavaScript/TypeScript Usage

```typescript
import { colorActionPrimaryContainerDefault } from '@orchestra-kit/design-tokens'

// Access token value directly
const brandColor = colorActionPrimaryContainerDefault
```

## Architecture

### Three-Tier Token System

**1. Primitives** (`primitive.json`)
- Raw colors: `#FF6B6B`, `#1A1A1A`, etc.
- Immutable and shared across themes
- Never used directly in components

**2. Semantic Tokens** (`semantic.light.json`, `semantic.dark.json`)
- Meaningful names: `text/primary`, `background/surface`
- Light theme: dark text on light background
- Dark theme: light text on dark background
- Used directly in components

**3. Component Tokens** (`component.json`)
- Button, form, card styles
- References semantic tokens
- Component-specific semantics

```
Primitive: #FF6B6B
    ↓
Semantic: color/action/primary = #FF6B6B (light) or #FF8C8C (dark)
    ↓
Component: button.primary.background = var(--orchestra-color-action-primary)
```

### Token Structure

```
color
├── text
│   ├── primary         # Main text
│   ├── secondary       # Supporting text
│   └── disabled        # Disabled state
├── background
│   ├── primary
│   ├── secondary
│   └── surface         # Card backgrounds
└── action
    ├── primary
    ├── secondary
    └── tertiary

spacing
├── global
│   ├── xs (4px → 0.25rem)
│   ├── sm (8px → 0.5rem)
│   ├── md (16px → 1rem)
│   └── lg (24px → 1.5rem)
└── action
    ├── inline/container
    └── block/container

radius
├── action/container    # Button, card radius
└── action/control      # Input radius

typography
├── display             # Large headings
├── headline            # Section headings
├── title               # Card titles
├── body                # Paragraph text
└── label               # Form labels
```

## Theme System

### Light Theme (Default)

Applied by default when importing:
```css
:root { color-scheme: light; }
:root { --orchestra-color-text-primary: #1a1a1a; }
:root { --orchestra-color-background-primary: #ffffff; }
```

### Dark Theme

Activated by CSS class:
```css
:host(.orchestra-theme--dark) { color-scheme: dark; }
:host(.orchestra-theme--dark) { --orchestra-color-text-primary: #f0f0f0; }
:host(.orchestra-theme--dark) { --orchestra-color-background-primary: #0a0a0a; }
```

### Switching Themes

```typescript
// Enable dark theme
document.documentElement.classList.add('orchestra-theme--dark')

// Disable dark theme (revert to light)
document.documentElement.classList.remove('orchestra-theme--dark')

// Toggle
document.documentElement.classList.toggle('orchestra-theme--dark')
```

All CSS variables update automatically. Components using `var(--orchestra-...)` see the new values immediately.

## Integration

### With Stencil Components

```tsx
// Components automatically use active theme variables
@Component({
  tag: 'orchestra-button',
  styleUrl: 'button.css',
  shadow: true
})
export class Button { }
```

**button.css:**
```css
:host {
  --btn-bg: var(--orchestra-color-action-primary-container-default);
  --btn-text: var(--orchestra-color-action-primary-content-default);
}

button {
  background-color: var(--btn-bg);
  color: var(--btn-text);
}

/* Hover state uses updated tokens */
:host(:hover) {
  --btn-bg: var(--orchestra-color-action-primary-container-hover);
}
```

### With React/Vue

Import theme CSS in your app root:
```typescript
import '@orchestra-kit/design-tokens/dist/css/variables.light.css'
import '@orchestra-kit/design-tokens/dist/css/variables.dark.css'
```

Use in component CSS:
```css
.card {
  background: var(--orchestra-color-background-surface);
  border: 1px solid var(--orchestra-color-border-default);
  padding: var(--orchestra-spacing-global-md);
}
```

## Maintaining Tokens

### Workflow

1. **Edit in Figma**
   - Create/modify semantic token sets (light + dark)
   - Reference primitives consistently

2. **Export from Figma**
   - Export as JSON: `semantic.light.json` and `semantic.dark.json`
   - Replace in `packages/design-tokens/tokens/`

3. **Build**
   ```bash
   npm run build
   ```

4. **Verify**
   - Check `dist/css/variables.light.css` and `dist/css/variables.dark.css`
   - Ensure new variables are present

5. **Deploy**
   - CSS is regenerated
   - Components automatically use new tokens
   - No code changes needed

### Creating Theme-Specific Tokens

In Figma (Free Plan Workaround):

1. **Create two token sets:**
   - "Semantic Light"
   - "Semantic Dark"

2. **Same structure, different values:**
   ```
   Light:
   - text/primary = #1a1a1a
   - background/primary = #ffffff
   
   Dark:
   - text/primary = #f0f0f0
   - background/primary = #0a0a0a
   ```

3. **Both reference primitives:**
   ```
   Primitives:
   - brand-color = #FF6B6B
   
   Semantic Light:
   - action/primary = {brand-color}
   
   Semantic Dark:
   - action/primary = {brand-color} (adjusted if needed)
   ```

4. **Export separately:**
   - `semantic.light.json`
   - `semantic.dark.json`

### Available Tokens

View generated variables:
```bash
# CSS variables
cat dist/css/variables.light.css
cat dist/css/variables.dark.css

# JavaScript exports
cat dist/js/variables.light.d.ts  # TypeScript types
cat dist/json/properties.light.json
```

## Output Formats

### CSS Variables

**File:** `dist/css/variables.light.css`

```css
:root {
  --orchestra-color-text-primary: #1a1a1a;
  --orchestra-color-background-primary: #ffffff;
  --orchestra-spacing-global-md: 1rem;
}
```

Scoped to:
- Light: `:root, :host, .orchestra-theme--light`
- Dark: `:host, .orchestra-theme--dark`

### JSON

**File:** `dist/json/properties.light.json`

```json
{
  "orchestra-color-text-primary": "#1a1a1a",
  "orchestra-spacing-global-md": "1rem"
}
```

### JavaScript

**File:** `dist/js/variables.light.d.ts`

```typescript
export const colorTextPrimary: string
export const spacingGlobalMd: string
```

**File:** `dist/js/variables.light.js`

```javascript
export const colorTextPrimary = '#1a1a1a'
export const spacingGlobalMd = '1rem'
```

## Building Locally

### Prerequisites
```bash
npm install
```

### Build Tokens
```bash
npm run build
```

Generates all formats for both light and dark themes.

### Watch Mode
```bash
npm run build:watch
```

Rebuilds automatically when token files change.

## API Reference

### CSS Variables

Access tokens via CSS custom properties:
```css
/* Format: --orchestra-{category}-{subcategory}... */
--orchestra-color-text-primary
--orchestra-spacing-global-md
--orchestra-radius-action-container
```

### JavaScript Exports

Access tokens programmatically:
```typescript
import { colorTextPrimary, spacingGlobalMd } from '@orchestra-kit/design-tokens'
```

Naming: camelCase, with category prefix (color, spacing, radius, etc.)

## Philosophy

The design token system enforces:

1. **Consistency** - All colors, spacing, typography standardized
2. **Accessibility** - Semantic names ensure a11y-focused decisions
3. **Maintainability** - Single source of truth in Figma
4. **Flexibility** - Theme switching without code changes
5. **Performance** - Build-time generation, zero runtime overhead
6. **Scalability** - Grows with your design system

## Distribution

Published as `@orchestra-kit/design-tokens`:

- **main**: CommonJS exports
- **module**: ESM exports
- **types**: TypeScript declarations
- **exports**: CSS and JSON entry points

All outputs include both light and dark theme tokens.

## License

MIT
