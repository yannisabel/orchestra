---
name: icon-library
description: Build high-performance icon systems with zero HTTP requests, multi-level caching, and library registration. Use when implementing icons with multiple libraries, optimizing icon delivery, or designing icon loading strategies. Covers registry pattern, SVG bundling, caching strategies, and performance monitoring.
user-invocable: true
argument-hint: Describe your icon requirement (e.g., "add icons from Font Awesome", "register two icon libraries", "optimize icon loading")
---

# Icon Library System

## Overview

Orchestra's icon system implements a **zero-HTTP, cache-first registry** that achieves microsecond icon lookups through in-memory caching. All SVGs are pre-loaded from local repositories and organized into semantic libraries (core, social, brand, etc.).

**Performance Profile**:

- ✅ **First icon render**: ~1-2ms (lookup + sanitize)
- ✅ **Subsequent renders**: ~0.1ms (memory cache hit)
- ✅ **No network overhead**: All SVGs bundled
- ✅ **No re-fetching**: Aggressive caching across app lifecycle

## Quick Start

### 1. Organize Icons

```bash
# Create library directories
mkdir -p packages/icons/core
mkdir -p packages/icons/social

# Place SVG files
cp my-icons/*.svg packages/icons/core/
```

### 2. Initialize in App

```typescript
import {
  initializeIconRegistry,
  loadIconLibraries,
} from '@orchestra-design-system/core'

// Run once at app startup
const libraries = loadIconLibraries('./icons')
initializeIconRegistry(libraries)
```

### 3. Use in Components

```html
<!-- Default library -->
<orchestra-icon name="check"></orchestra-icon>

<!-- Specific library -->
<orchestra-icon name="social:twitter" size="24px"></orchestra-icon>
```

## Architecture

### Three-Layer Caching

```
Layer 1: Memory Cache ← O(1) microseconds
  ↓ miss
Layer 2: Registry (pre-loaded) ← O(1) lookup
  ↓ first access
Layer 3: File System / Build ← Bundled at build time
```

### Library Organization

Icons organized by semantic library:

```
packages/icons/
├── core/           → registry.getIcon('check')
│   ├── check.svg
│   └── close.svg
└── social/         → registry.getIcon('twitter', 'social')
    ├── twitter.svg
    └── github.svg
```

## Implementation Details

### Icon Registry

Manages all icon libraries with O(1) lookups:

```typescript
import {
  getIconRegistry,
  initializeIconRegistry,
} from '@orchestra-design-system/core'

const registry = getIconRegistry()

// Register a library
registry.registerLibrary({
  id: 'core',
  icons: { check: '<svg>...</svg>' },
})

// Fast lookup (O(1) - microseconds)
const svg = registry.getIcon('check')
const socialSvg = registry.getIcon('twitter', 'social')

// List all libraries
const libs = registry.getLibraries()

// Clear cache if needed
registry.clearCache()
```

### Icon Loader

Load SVGs from file system or create inline:

```typescript
import {
  loadIconLibrary,
  loadIconLibraries,
  createInlineIconLibrary,
} from '@orchestra-design-system/core'

// Load from disk (production)
const coreLib = loadIconLibrary('core', './icons/core')

// Load all subdirectories
const allLibs = loadIconLibraries('./icons')

// Create inline (Storybook)
const inline = createInlineIconLibrary('core', {
  check: '<svg>...</svg>',
  close: '<svg>...</svg>',
})
```

### Icon Component

Displays SVGs with sanitization and caching:

```typescript
@Component({
  tag: 'orchestra-icon',
  shadow: true,
  styleUrl: 'icon.css',
})
export class OrchestraIcon {
  @Prop() name!: string // "check" or "social:twitter"
  @Prop() fill?: string = 'currentcolor' // SVG color
  @Prop() size?: string = '100%' // SVG size

  private loadIconSvg(name: string): void {
    const registry = getIconRegistry()
    const [lib, icon] = this.parseIconName(name)
    const svg = lib ? registry.getIcon(icon, lib) : registry.getIcon(icon)
    this.svg = svg || ''
  }
}
```

## Setup Examples

### Storybook Setup

```typescript
// .storybook/preview.ts
import {
  initializeIconRegistry,
  createInlineIconLibrary,
} from '@orchestra-design-system/core'

const coreIcons = createInlineIconLibrary('core', {
  check: '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12..."/></svg>',
  close: '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5..."/></svg>',
})

initializeIconRegistry([coreIcons])
```

### React App Setup

```typescript
import { useEffect } from 'react'
import { initializeIconRegistry, loadIconLibraries } from '@orchestra-design-system/core'

export function App() {
  useEffect(() => {
    const libraries = loadIconLibraries('./icons')
    initializeIconRegistry(libraries)
  }, [])

  return <OrchestraIcon name="check" />
}
```

### Vue App Setup

```typescript
import { createApp } from 'vue'
import { initializeIconRegistry, loadIconLibraries } from '@orchestra-design-system/core'

const app = createApp({...})

const libraries = loadIconLibraries('./icons')
initializeIconRegistry(libraries)

app.mount('#app')
```

### Angular App Setup

```typescript
import { Component, OnInit } from '@angular/core'
import {
  initializeIconRegistry,
  loadIconLibraries,
} from '@orchestra-design-system/core'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OrchestraIconComponent],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const libraries = loadIconLibraries('./icons')
    initializeIconRegistry(libraries)
  }
}
```

## Performance Optimization

### Memory Cache Lookup

```typescript
// O(1) lookup time after initialization
// Key format: "libraryId:iconName"
const start = performance.now()
const svg = registry.getIcon('check') // ~0.05ms
console.log(performance.now() - start)
```

### SVG Optimization

Automatic optimization reduces bundle size:

```typescript
import { optimizeSvg } from '@orchestra-design-system/core'

const raw = '<svg xmlns="..." id="icon" class="old">...</svg>'
const optimized = optimizeSvg(raw)
// Removes: xmlns, id, class, data-attributes
// Result: 20-40% size reduction
```

### Lazy Loading Libraries

Load less-common libraries on-demand:

```typescript
const registry = getIconRegistry()

// Initial: core only
let libs = [loadIconLibrary('core', './icons/core')]
initializeIconRegistry(libs)

// Later: add social icons when needed
const socialLib = loadIconLibrary('social', './icons/social')
registry.registerLibrary(socialLib)
```

### Cache Pre-Warming

Pre-load frequently-used icons:

```typescript
const registry = getIconRegistry()

// Touch each icon to populate cache
registry.getIcon('check')
registry.getIcon('close')
registry.getIcon('social:twitter')
// Subsequent: ~0.01ms per lookup
```

## Caching Strategy

### Multi-Level Cache

| Level | Type         | Lookup  | Lifetime      |
| ----- | ------------ | ------- | ------------- |
| 1     | Memory (Map) | O(1) μs | App session   |
| 2     | Registry     | O(1) ms | App session   |
| 3     | Build bundle | -       | Deployed code |

### Cache Invalidation

```typescript
const registry = getIconRegistry()

// Clear all caches
registry.clearCache()

// Unload specific library
registry.unregisterLibrary('social')

// Reload library
const socialLib = loadIconLibrary('social', './icons/social')
registry.registerLibrary(socialLib)
```

## Usage Examples

### Basic HTML

```html
<!-- Default library -->
<orchestra-icon name="check"></orchestra-icon>

<!-- Specific library -->
<orchestra-icon name="social:twitter"></orchestra-icon>

<!-- With styling -->
<orchestra-icon name="close" fill="#e53935" size="24px"> </orchestra-icon>
```

### React

```tsx
import { OrchestraIcon } from '@orchestra-design-system/react'

export function Button() {
  return (
    <button>
      <OrchestraIcon name="check" />
      Save
    </button>
  )
}

export function Share() {
  return <OrchestraIcon name="social:twitter" size="24px" fill="#1DA1F2" />
}
```

### Vue

```vue
<script setup lang="ts">
import { OrchestraIcon } from '@orchestra-design-system/vue'
</script>

<template>
  <!-- Default library -->
  <OrchestraIcon name="check" />

  <!-- Specific library -->
  <OrchestraIcon name="social:twitter" />

  <!-- With props -->
  <OrchestraIcon name="close" fill="#e53935" size="24px" />
</template>
```

### Angular

```typescript
import { Component } from '@angular/core'
import { OrchestraIconComponent } from '@orchestra-design-system/angular'

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [OrchestraIconComponent],
  template: `
    <button>
      <orchestra-icon name="check"></orchestra-icon>
      Save
    </button>
  `,
})
export class ButtonComponent {}
```

## File Structure

```
packages/icons/
├── core/
│   ├── check.svg
│   ├── close.svg
│   ├── arrow-left.svg
│   ├── arrow-right.svg
│   ├── menu.svg
│   └── settings.svg
├── social/
│   ├── twitter.svg
│   ├── github.svg
│   ├── linkedin.svg
│   └── facebook.svg
└── brand/
    ├── logo.svg
    └── icon.svg
```

## Troubleshooting

### Icon Not Found

```typescript
// Check if icon exists
const svg = registry.getIcon('nonexistent')
if (svg === null) {
  console.warn('Icon not found')
}

// Use library:name format
const svg = registry.getIcon('twitter', 'social')

// List available icons
const libs = registry.getLibraries()
libs.forEach((lib) => {
  console.log(`${lib.id}:`, Object.keys(lib.icons))
})
```

### Performance Issues

```typescript
// Debug: measure lookup time
const start = performance.now()
const svg = registry.getIcon('check')
console.log(`Lookup: ${(performance.now() - start).toFixed(2)}ms`)

// Check library sizes
registry.getLibraries().forEach((lib) => {
  const count = Object.keys(lib.icons).length
  console.log(`${lib.id}: ${count} icons`)
})
```

### Cache Problems

```typescript
// Reload all libraries
registry.clearCache()
const libraries = loadIconLibraries('./icons')
initializeIconRegistry(libraries)

// Or unload specific library
registry.unregisterLibrary('social')
```

## Best Practices

✅ **Do:**

- Organize icons into semantic libraries (core, social, brand)
- Initialize registry once at app startup
- Use `library:name` format for non-default libraries
- Pre-optimize SVGs with SVGO
- Lazy-load less-common libraries
- Monitor cache hit rates

❌ **Don't:**

- Fetch icons from external CDNs
- Create multiple registry instances
- Modify SVG content after registration
- Store unoptimized SVGs
- Ignore library organization
- Hot-swap SVG files

## Efficiency Tips

When using LLMs to work on icon systems:

- Reference specific libraries when asking for changes
- Use [token-optimization](../token-optimization/SKILL.md) to avoid pasting large SVG strings
- Store common icon definitions in `/memories/repo/`
- Ask for performance metrics, not full dumps
- Request specific icon format changes

## References

- **Related Skills**:
  - [stencil-components](../stencil-components/SKILL.md) — Component architecture
  - [design-tokens](../design-tokens/SKILL.md) — Token-based styling
  - [token-optimization](../token-optimization/SKILL.md) — LLM efficiency

- **Documentation**:
  - [Icon Registry Setup Guide](../../packages/core/src/utils/ICON_REGISTRY_SETUP.md)
  - [Production Setup Example](../../packages/core/src/utils/icon-registry-production-setup.ts)
  - [Storybook Icon Example](../../packages/storybook/.storybook/icon-libraries.ts)

- **Tools & Resources**:
  - [SVGO](https://github.com/svg/svgo) — SVG optimization tool
  - [SVG Best Practices](https://developer.mozilla.org/en-US/docs/Web/SVG)
  - [Web Components Performance](https://web.dev/web-components/#performance)
  - [Icon Systems Best Practices](https://www.smashingmagazine.com/2023/05/inline-svg-icon-systems-svelte/)
