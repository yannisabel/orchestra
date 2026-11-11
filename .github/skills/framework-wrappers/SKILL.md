---
name: framework-wrappers
description: 'Understand and extend framework wrappers (React, Vue, Angular) for Orchestra. Use when creating wrapper components, configuring output targets, or using Orchestra components in specific frameworks. Covers auto-generated proxies, Stencil output targets, framework-specific patterns, and avoiding duplication.'
argument-hint: "Describe your framework scenario (e.g., 'use Button in React', 'configure Vue wrapper', 'add Angular components')"
user-invocable: true
---

# Framework Wrappers

## Overview

Orchestra uses **Stencil output targets** to automatically generate framework-specific wrappers (React, Vue, Angular) from a single Stencil component source. This approach eliminates component duplication while providing framework-idiomatic APIs.

**Key principle**: Write once in Stencil, get proxies for React, Vue, and Angular automatically—no manual wrapper code needed.

## Architecture

### Repository-specific flow

This repo uses the Stencil output targets defined in `packages/core/stencil.config.ts`.

```
packages/core/src/components/...           # Stencil source of truth
    ↓
packages/core/stencil.config.ts          # outputTargets for React/Vue/Angular
    ↓
packages/react/lib/components/stencil-generated/   # React proxies
packages/vue/lib/stencil-generated/                # Vue proxies
packages/angular/projects/component-library/src/lib/stencil-generated/  # Angular proxies
```

**Actual repo wiring**:

- React output: `reactOutputTarget({ outDir: '../react/lib/components/stencil-generated/' })`
- Vue output: `vueOutputTarget({ proxiesFile: '../vue/lib/stencil-generated/components.ts' })`
- Angular output: `angularOutputTarget({ directivesProxyFile: '../angular/projects/component-library/src/lib/stencil-generated/components.ts' })`

**Flow**:

1. Update the Stencil source under `packages/core/src/components`
2. Rebuild the core package so Stencil regenerates framework bindings
3. Review the generated files in the framework packages, not a manually duplicated wrapper layer
4. Export the generated proxies from each framework package entry point

### Important repo rule

Do not hand-write a second implementation of the same component API in React/Vue/Angular when the Stencil output target can generate it. The generated proxies are the canonical wrapper layer for this monorepo.

### How It Works

**Generated files** (do not edit by hand):

- `packages/react/lib/components/stencil-generated/` (one file per component, plus `.server.ts` variants)
- `packages/vue/lib/stencil-generated/components.ts`
- `packages/angular/projects/component-library/src/lib/stencil-generated/components.ts` and `index.ts`

**Each framework package re-exports the generated proxies**:

```typescript
// packages/react/lib/index.ts
export * from './components/stencil-generated/components.js'
```

## React Wrapper

### Configuration

**File**: `packages/core/stencil.config.ts`

```typescript
reactOutputTarget({
  outDir: '../react/lib/components/stencil-generated/',
  esModules: true,
})
```

All three framework targets are declared in the same `outputTargets` array (see Build & Integration).

This repo builds the generated proxies as part of the core package build, so wrapper changes should be treated as derivative artifacts of the Stencil source—not as custom implementations.

### Usage

```typescript
// packages/react/lib/index.ts
export * from './components/stencil-generated/components.js'
```

**In React apps**:

```tsx
import { OrchestraButton } from '@orchestra-design-system/react'

export function App() {
  return (
    <OrchestraButton text="Click me" onClick={() => console.log('clicked')} />
  )
}
```

### Features

- ✅ TypeScript types from Stencil
- ✅ React event binding (`onClick`, `onChange`)
- ✅ Prop spreading
- ✅ Refs support
- ✅ No wrapper code needed

### React Pattern

The generated file wraps the custom element with `createComponent` from the Stencil React output target and exports it under the PascalCase name, for example `OrchestraButton`. Props follow the Stencil `@Prop` names (`text`, `variant`, `size`, `disabled`, `icon`, `iconName`, `iconLibrary`, and so on). Do not edit these files by hand.

## Vue Wrapper

### Configuration

**File**: `packages/core/stencil.config.ts`

```typescript
vueOutputTarget({
  componentCorePackage: '@orchestra-design-system/core',
  proxiesFile: '../vue/lib/stencil-generated/components.ts',
})
```

### Usage

```typescript
// packages/vue/lib/index.ts
export * from './stencil-generated/components'
export * from './plugin'
```

**In Vue apps**:

```typescript
import { OrchestraButton } from '@orchestra-design-system/vue'

export default {
  components: { OrchestraButton },
  template: `<OrchestraButton text="Click me" @click="handleClick" />`,
}
```

**Setup plugin** (optional, exported as `ComponentLibrary` from `packages/vue/lib/plugin.ts`):

```typescript
// main.ts
import { createApp } from 'vue'
import { ComponentLibrary } from '@orchestra-design-system/vue'

createApp(App).use(ComponentLibrary).mount('#app')
```

### Features

- ✅ Vue 3 Composition API ready
- ✅ Event listeners with `@event` syntax
- ✅ TypeScript support
- ✅ No wrapper code needed

### Vue Pattern

The generated `components.ts` calls `defineContainer` (from `vue-component-lib/utils.ts`) for each component and exports it under the PascalCase name, for example `OrchestraButton`. Do not edit this file by hand.

## Angular Wrapper

### Configuration

**File**: `packages/core/stencil.config.ts`

```typescript
angularOutputTarget({
  componentCorePackage: '@orchestra-design-system/core',
  outputType: 'component',
  directivesProxyFile:
    '../angular/projects/component-library/src/lib/stencil-generated/components.ts',
  directivesArrayFile:
    '../angular/projects/component-library/src/lib/stencil-generated/index.ts',
})
```

### Usage

**In Angular module**:

```typescript
// app.module.ts
import { ComponentLibraryModule } from '@orchestra-design-system/angular'

@NgModule({
  imports: [ComponentLibraryModule],
})
export class AppModule {}
```

**In Angular components** (the custom element tag is used directly in templates):

```typescript
import { Component } from '@angular/core'

@Component({
  selector: 'app-button-demo',
  template: `<orchestra-button
    text="Click me"
    (click)="handleClick()"
  ></orchestra-button>`,
})
export class ButtonDemoComponent {
  handleClick() {
    console.log('Clicked')
  }
}
```

### Features

- ✅ Angular property binding with `[prop]`
- ✅ Event binding with `(event)`
- ✅ TypeScript types

### Angular Pattern

The generated `components.ts` uses `ProxyCmp`, `proxyInputs`, and `proxyOutputs` from `angular-component-lib/utils.ts` to create `OrchestraButton` (selector `orchestra-button`), mapping Stencil props and events to Angular inputs and outputs. Do not edit these files by hand.

## Build & Integration

### Stencil Output Targets Config

**File**: `packages/core/stencil.config.ts`

The config uses namespace `orchestra-design-system` and declares the `dist`, `dist-custom-elements`, `docs-readme`, `docs-custom-elements-manifest`, `www`, and `dist-hydrate-script` targets, plus the framework targets `reactOutputTarget`, `vueOutputTarget`, and `angularOutputTarget` (each with `componentCorePackage: '@orchestra-design-system/core'`). Read the file before changing output paths.

### Build Process

```bash
# Build core (generates all framework proxies)
npm run build --workspace=@orchestra-design-system/core

# This:
# 1. Compiles Stencil components
# 2. Generates React proxies → packages/react/lib/components/stencil-generated/
# 3. Generates Vue proxies → packages/vue/lib/stencil-generated/
# 4. Generates Angular proxies → packages/angular/projects/component-library/src/lib/stencil-generated/

# Each framework package then exports:
npm run build --workspace=@orchestra-design-system/react
npm run build --workspace=@orchestra-design-system/vue
npm run build --workspace=@orchestra-design-system/angular
```

## Type Safety

### TypeScript Definitions

Stencil generates `.d.ts` files for all wrappers:

Stencil derives the prop types from the `@Prop` declarations in `packages/core/src/components/**` (for example `variant?: 'primary' | 'secondary' | 'tertiary'` and `text` on `orchestra-button`). The generated framework files re-export those types.

```tsx
import { OrchestraButton } from '@orchestra-design-system/react'

;<OrchestraButton text="Submit" variant="primary" disabled={false} />
```

## Best Practices

### ✅ Do's

- ✅ Write components in Stencil only (single source of truth)
- ✅ Use `type` output target in stencil.config
- ✅ Export from each framework package
- ✅ Let Stencil generate proxies automatically
- ✅ Test wrappers in framework-specific environments
- ✅ Maintain consistent prop naming across frameworks

### ❌ Don'ts

- ❌ Write manual React/Vue/Angular components (they're auto-generated)
- ❌ Edit generated proxy files
- ❌ Copy wrapper code between frameworks
- ❌ Add framework-specific logic to Stencil components
- ❌ Bypass output targets

## Adding a New Framework

### 1. Create Package

```bash
cd packages
mkdir [framework-name]
cd [framework-name]
npm init -y
```

### 2. Update `stencil.config.ts`

Add output target:

```typescript
{
  type: '[framework-name]',
  componentCorePackage: '@orchestra-design-system/core',
  proxiesFile: '../../[framework-name]/lib/stencil-generated/index.ts',
}
```

### 3. Configure Package

```json
{
  "name": "@orchestra-design-system/[framework-name]",
  "main": "./lib/index.ts",
  "exports": {
    ".": "./lib/index.ts"
  },
  "peerDependencies": {
    "[framework]": "^version"
  }
}
```

### 4. Build

```bash
npm run build --workspace=@orchestra-design-system/core
npm run build --workspace=@orchestra-design-system/[framework-name]
```

## Efficiency Tips

When working with LLMs on wrapper components:

- Ask about specific framework patterns (React hooks, Vue composition, Angular services)
- Reference [stencil-components](../stencil-components/SKILL.md) for the source implementation
- Use [token-optimization](../token-optimization/SKILL.md) to explore framework package structure
- Store framework-specific patterns in `/memories/repo/`

## References

- [token-optimization](../token-optimization/SKILL.md) — Efficient exploration
- [stencil-components](../stencil-components/SKILL.md) — Component implementation
- [Stencil Output Targets](https://stenciljs.com/docs/output-targets)
- [React Integration](https://stenciljs.com/docs/react)
- [Vue Integration](https://stenciljs.com/docs/vue)
- [Angular Integration](https://stenciljs.com/docs/angular)
