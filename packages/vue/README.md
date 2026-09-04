# @orchestra-design-system/vue

Vue wrapper package for the Orchestra design system.

This package exposes the Stencil-based components as Vue-friendly components and a plugin for app registration.

## Installation

```bash
npm install @orchestra-design-system/vue vue
```

Vue 3 is expected as a peer dependency. The core package is installed transitively and can also be imported directly when needed.

## Register the plugin

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { ComponentLibrary } from '@orchestra-design-system/vue'

const app = createApp(App)
app.use(ComponentLibrary)
app.mount('#app')
```

This plugin registers the custom elements by calling the Stencil loader from the core package.

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

- OrchestraButton
- OrchestraIcon

These wrappers are generated from the Stencil source in the core package.

## Build

```bash
npm run build
```

Build output is emitted to the package dist folder.

## Notes

- Generated proxies live under lib/stencil-generated.
- Plugin registration is defined in lib/plugin.ts.
- See [../core/readme.md](../core/readme.md) for the underlying component APIs.
