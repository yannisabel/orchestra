---
name: icon-development
applyTo: '**/{icon,icons}*.{ts,tsx,md,stories.*}'
description: 'Icon system domain knowledge for Orchestra development. Provides guidance on icon components, custom library registration, and Storybook icon testing patterns.'
---

# Icon Development Skill

Apply this whenever working with icon-related files in Orchestra.

## Quick Reference

### Icon Component Usage

```jsx
<!-- Built-in icon (core library, pre-registered) -->
<orchestra-icon name="checked" size="24px" fill="currentcolor"></orchestra-icon>

<!-- Custom library icon -->
<orchestra-icon name="star" library="custom" size="24px"></orchestra-icon>
```

### Registering Custom Icon Libraries

```typescript
import { registerIconLibrary } from '@orchestra-kit/core'

const customIcons = {
  'star': `<svg viewBox="0 0 24 24"><path d="..."/></svg>`,
  'heart': `<svg viewBox="0 0 24 24"><path d="..."/></svg>`,
}

registerIconLibrary('custom', {
  resolver: (name) => customIcons[name] ?? ''
})
```

## Architecture

### Icon System Components

1. **Icon Component** (`packages/core/src/components/icon/`)
   - Accepts `name` and `library` props
   - Resolves SVGs via library registry
   - Supports color and size customization

2. **Icon Library Registry** (`packages/core/src/components/icon/library.ts`)
   - Global registry: `window.__orchestraIconRegistry` (browser) or `globalThis.__orchestraIconRegistry` (Node.js)
   - Shared across all components and modules
   - Functions: `getIconLibrary()`, `registerIconLibrary()`, `unregisterIconLibrary()`

3. **Icons Library** (`packages/icons-library/`)
   - Auto-generated from `svg/` folder
   - Exports SVG strings as TypeScript constants
   - Provides `iconNames` type union array
   - Pre-registered as 'core' library in components

4. **Storybook Stories** (`packages/storybook/src/stories/components/icon/`)
   - Default story: uses 'core' library (built-in icons)
   - CustomLibrary story: demonstrates custom icon registration

## Key Implementation Details

### Global Registry (Important!)

The icon registry was changed from module-level variable to `window`/`globalThis` to solve module isolation issues:

- **Before**: Each bundled module got its own registry copy → custom libraries couldn't be accessed
- **After**: Single shared registry on `window` → all modules access the same registry

This is critical for Storybook (where preview.ts registers) to work with bundled components.

### Component Lifecycle

```typescript
@Component({ tag: 'orchestra-icon', shadow: true })
export class OrchestraIcon {
  @Prop() library: string = 'core'
  @Prop() name: string = ''
  
  // Called when component loads
  componentWillLoad() {
    this.handleNameChange(this.name)
  }
  
  // Called when library prop changes
  @Watch('library')
  handleLibraryChange() {
    this.loadIcon(this.name)
  }
  
  protected resolveIcon(library, name) {
    const lib = getIconLibrary(library)  // Searches global registry
    if (!lib) console.warn(`❌ Icon library "${library}" not found`)
    return lib?.resolver(name) ?? ''
  }
}
```

### Storybook Registration Pattern

**CRITICAL**: Register in `play()` function, NOT in decorator or render function.

```typescript
// ❌ WRONG - races with componentWillLoad()
render: () => {
  registerIconLibrary('custom', { resolver: ... })
  return `<orchestra-icon library="custom">`
}

// ✅ CORRECT - runs AFTER component mounts
play: async () => {
  registerIconLibrary('custom', { resolver: ... })
  
  // Force reload by toggling library prop
  const icon = document.querySelector('orchestra-icon')
  icon.library = 'core'
  await new Promise(r => setTimeout(r, 100))
  icon.library = 'custom'
}
```

**Why?**
- `componentWillLoad()` fires immediately on element creation
- `play()` runs after component is in DOM and initialized
- Toggling library prop triggers `@Watch('library')` → icon reloads from new library

## Common Tasks

### Adding a New Icon to Core Library

1. **Add SVG file**: `packages/icons-library/svg/my-icon.svg`
2. **Run build**: `npm run build`
3. **Verify export**: Check `packages/icons-library/src/icons.ts` has `export const myIcon`
4. **Update type**: `iconNames` array auto-updates
5. **Use in component**: `<orchestra-icon name="myIcon">`

### Creating a Custom Icon Library Story

```typescript
import { registerIconLibrary } from '@orchestra-kit/core'

export const CustomLibrary = {
  render: (args) => 
    `<orchestra-icon name="${args.name}" library="custom" fill="${args.fill}" size="${args.size}"></orchestra-icon>`,
  args: { name: 'star', fill: 'currentcolor', size: '60px' },
  play: async () => {
    const customIcons = {
      'star': `<svg viewBox="0 0 24 24">...</svg>`,
    }
    
    // Register in play() - runs after mount
    registerIconLibrary('custom', {
      resolver: (name) => customIcons[name] ?? ''
    })
    
    // Trigger reload
    const icon = document.querySelector('orchestra-icon')
    icon.library = 'core'
    await new Promise(r => setTimeout(r, 100))
    icon.library = 'custom'
  }
}
```

### Registering Custom Icons in Application Code

```typescript
// app.ts or main.ts
import { registerIconLibrary } from '@orchestra-kit/core'

const appIcons = {
  'home': `<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor"/></svg>`,
  'settings': `<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l1.72-1.35c.15-.12.2-.34.1-.52l-1.63-2.83c-.1-.17-.32-.23-.51-.16l-2.03.8c-.42-.33-.88-.6-1.38-.81l-.31-2.17c-.02-.2-.2-.35-.4-.35h-3.26c-.2 0-.37.15-.39.35l-.31 2.17c-.5.21-.96.48-1.38.81l-2.03-.8c-.19-.07-.41 0-.51.16L2.93 8.19c-.1.17-.05.4.1.52l1.72 1.35c-.05.3-.07.62-.07.94 0 .33.02.64.07.94l-1.72 1.35c-.15.12-.2.34-.1.52l1.63 2.83c.1.17.32.23.51.16l2.03-.8c.42.33.88.6 1.38.81l.31 2.17c.02.2.2.35.4.35h3.26c.2 0 .37-.15.39-.35l.31-2.17c.5-.21.96-.48 1.38-.81l2.03.8c.19.07.41 0 .51-.16l1.63-2.83c.1-.17.05-.4-.1-.52l-1.72-1.35M12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor"/></svg>`,
}

registerIconLibrary('app', {
  resolver: (name) => appIcons[name] ?? ''
})

// Now use in components
<orchestra-icon name="home" library="app"></orchestra-icon>
```

## SVG Guidelines

### Filename to Export Name

- `checked.svg` → `checked`
- `check-icon.svg` → `checkIcon`
- `arrow-right.svg` → `arrowRight`
- `my-custom-icon.svg` → `myCustomIcon`

### SVG Attributes

```xml
<!-- ✅ GOOD -->
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="..." fill="currentColor"/>
</svg>

<!-- ❌ AVOID -->
<svg width="24" height="24" fill="#000">  <!-- Fixed size, hardcoded color -->
  <path d="..."/>
</svg>
```

Requirements:
- Include `viewBox` for responsive scaling
- Use `fill="currentColor"` to inherit color from icon component
- Omit `width`/`height` (use viewBox instead)
- Remove hardcoded colors (except for gradients, images)
- Keep markup minimal

## Troubleshooting

### "Icon library 'X' not found"

**Cause**: Library not registered when component resolves icon

**Solutions**:
1. In Storybook: Register in `play()` function, not render/decorator
2. In app: Call `registerIconLibrary()` before rendering component
3. Check global registry: `console.log(window.__orchestraIconRegistry)`

### Icon renders but not visible (blank)

**Causes**:
1. SVG string is malformed → Validate SVG syntax
2. `resolver()` returns empty string → Check resolver returns correct icon
3. SVG sanitization failed → Ensure valid SVG attributes
4. `fill="currentColor"` not set → Won't inherit color from component

### Custom library registers but component doesn't find it

**Cause**: Module isolation - bundled components have isolated scope

**Solution**: Use global registry (`window.__orchestraIconRegistry`)
- Already implemented in `packages/core/src/components/icon/library.ts`
- If issue persists, verify you're using `registerIconLibrary()` not direct registry assignment

## Files Reference

| File | Purpose |
|------|---------|
| `packages/core/src/components/icon/icon.tsx` | Icon component implementation |
| `packages/core/src/components/icon/library.ts` | Global registry management |
| `packages/icons-library/svg/` | SVG source files (auto-generates exports) |
| `packages/icons-library/src/icons.ts` | Auto-generated icon exports |
| `packages/icons-library/src/index.ts` | Auto-generated entry point |
| `packages/storybook/src/stories/components/icon/` | Icon component stories |
| `packages/storybook/.storybook/preview.ts` | Global Storybook setup (registers 'core' library) |

## Related Documentation

- [Icons Library README](../../packages/icons-library/README.md)
- [Core Package README](../../packages/core/readme.md) - Icon Component section
- [Storybook README](../../packages/storybook/README.md) - Custom Icon Libraries section
- [GitHub Deployment](../DEPLOYMENT.md) - For GitHub Pages Storybook deployment
