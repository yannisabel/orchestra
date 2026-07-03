# @orchestra-kit/vue

Vue wrapper components for Orchestra web components.

## Installation

```bash
npm install @orchestra-kit/vue @orchestra-kit/core vue
```

## Register the plugin

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { ComponentLibrary } from '@orchestra-kit/vue'

const app = createApp(App)
app.use(ComponentLibrary)
app.mount('#app')
```

The plugin calls `defineCustomElements()` from `@orchestra-kit/core/loader`.

## Usage

```vue
<script setup lang="ts">
import { OrchestraButton, OrchestraIcon } from '@orchestra-kit/vue'
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
