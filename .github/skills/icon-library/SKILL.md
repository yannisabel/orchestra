---
name: icon-library
description: Work with Orchestra's icon system - registering icon libraries, adding icons, and using orchestra-icon. Use when implementing icons, adding a new icon library, or debugging icon resolution.
user-invocable: true
argument-hint: Describe your icon requirement (e.g., "add a new icon", "register a custom icon library", "debug why an icon isn't rendering")
---

# Icon Library System

## Overview

Orchestra icons are rendered by the `orchestra-icon` Stencil component
([packages/core/src/components/icon/icon.tsx](../../../packages/core/src/components/icon/icon.tsx)).
Icons are resolved through a small in-memory **library registry**
([packages/core/src/components/icon/library.ts](../../../packages/core/src/components/icon/library.ts)),
sanitized with DOMPurify, and cached in a module-level object.

**Key principle**: icons are looked up by `(library, name)` against a registry of
`{ name, resolver }` objects. There is no build-time bundling step, no
multi-library-loader API, and no separate "registry" package — it's one file.

## Real API (grounded in source)

```typescript
// packages/core/src/components/icon/library.ts
export interface IconLibrary {
  name: string
  resolver: (name: string) => string
}

// Look up a registered library by name
getIconLibrary(name: string): IconLibrary | undefined

// Register a new library (or override an existing one by name)
registerIconLibrary(name: string, options: { resolver: (name: string) => string }): void

// Remove a library from the registry
unregisterIconLibrary(name: string): void
```

The registry is a plain array stored on `window.__orchestraIconRegistry`
(or `globalThis` outside the browser), pre-populated with:

- `'default'` ([default-library.ts](../../../packages/core/src/components/icon/default-library.ts)) - resolves via `getAssetPath('/icons/{name}.svg')` (Stencil asset path, can involve a network/file request)
- `'orchestra-icons'` ([orchestra-library.ts](../../../packages/core/src/components/icon/orchestra-library.ts)) - resolves from SVG strings statically imported from `@orchestra-design-system/icons-library` (no HTTP request, bundled at build time)
- `'core'` - an alias of `'orchestra-icons'`

There is **no** `initializeIconRegistry`, `loadIconLibraries`, `getIconRegistry`,
`createInlineIconLibrary`, or `optimizeSvg` export anywhere in the codebase.
Do not invent these — always `grep_search` `packages/core/src/components/icon/`
before documenting or using an icon API you haven't seen in source.

## `orchestra-icon` Component

```typescript
@Prop({ mutable: true }) name!: string          // icon name passed to the resolver
@Prop({ mutable: true }) library: string = 'orchestra-icons' // library name, not a "lib:name" prefix
@Prop({ mutable: true }) fill?: string = 'currentcolor'
@Prop({ mutable: true }) size?: string = '100%'
```

Usage:

```html
<orchestra-icon name="checkbox-check"></orchestra-icon>
<orchestra-icon name="settings" library="default"></orchestra-icon>
<orchestra-icon
  name="checkbox-check"
  fill="#e53935"
  size="24px"
></orchestra-icon>
```

`fill`/`size` are applied as `--icon-color`/`--icon-size` CSS custom properties on
the host element (see [icon.css](../../../packages/core/src/components/icon/icon.css)), not on the `<svg>` directly.

## Adding a New Icon

1. Add the source SVG under `packages/icons-library/svg/`.
2. Run the icons-library build (`cd packages/icons-library && npm run build`) to generate the exported string constant.
3. Import and map the new export in [orchestra-library.ts](../../../packages/core/src/components/icon/orchestra-library.ts) `icons` record (both a kebab-case and camelCase key are registered for existing icons - follow that convention).
4. Use it via `<orchestra-icon name="your-icon-name">`.

## Registering a Custom/External Icon Library

```typescript
import { registerIconLibrary } from '@orchestra-design-system/core'

registerIconLibrary('social', {
  resolver: (name) => socialIcons[name] ?? '',
})
```

```html
<orchestra-icon name="twitter" library="social"></orchestra-icon>
```

Call this once, early (e.g. app bootstrap or a Storybook decorator), before any
`orchestra-icon` using that library renders.

## Caching & Sanitization

- `icon.tsx` keeps a single module-level `cache: Record<string, string>` keyed by
  `${library}:${name}` - resolved SVGs are cached after first lookup, there is no
  multi-tier/"L1/L2/L3" cache system.
- Every resolved SVG is passed through `DOMPurify.sanitize(svg, { USE_PROFILES: { svg: true, svgFilters: true } })`
  before being written to `shadowRoot.innerHTML`. Never bypass this when adding
  custom resolvers.
- Icons are marked `aria-hidden="true"` on the host by default (decorative);
  add an accessible name on the consuming element (e.g. `aria-label` on the
  wrapping button) when the icon conveys meaning.

## Troubleshooting

- **Icon not found**: check the console warning
  `❌ Icon library "{library}" not found` (wrong `library` prop) or
  `⚠️ No SVG to render... this icon may not exist in the {library} library`
  (name not in that library's resolver map).
- **Wrong icon after prop change**: confirm the `@Watch('name')`/`@Watch('library')`
  handlers in `icon.tsx` are re-resolving - don't cache SVGs outside the
  component's own `cache` object.

## References

- [stencil-components](../stencil-components/SKILL.md) - component architecture
- [themes](../themes/SKILL.md) - token-based styling for `fill`/color
