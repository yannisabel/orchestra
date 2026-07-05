# @orchestra-design-system/vue

Vue wrapper components for Orchestra web components.

## Installation

```bash
npm install @orchestra-design-system/vue vue
```

`@orchestra-design-system/core` is installed transitively by the Vue wrapper.

The wrapper expects `vue@^3` as a peer dependency.

Install core explicitly only if your app imports from core directly.

## Register the plugin

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { ComponentLibrary } from '@orchestra-design-system/vue'

const app = createApp(App)
app.use(ComponentLibrary)
app.mount('#app')
```

The plugin calls `defineCustomElements()` from `@orchestra-design-system/core/loader`.

## Usage

```vue
<script setup lang="ts">
import { OrchestraButton, OrchestraIcon } from '@orchestra-design-system/vue'
</script>

<template>
  <OrchestraButton variant="primary" text="Save" />
  <OrchestraIcon name="checked" size="20px" />
</template>
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

- Generated Vue proxies are in `lib/stencil-generated/`.
- Plugin definition is in `lib/plugin.ts`.
- For component API details, see [../core/README.md](../core/README.md).
