# @orchestra-design-system/angular

Angular wrapper package for Orchestra web components.

## Installation

```bash
npm install @orchestra-design-system/angular
```

`@orchestra-design-system/core` is installed transitively by the Angular wrapper.

Install core explicitly only if your app imports from core directly (for example `@orchestra-design-system/core/loader` or raw web component modules).

## Usage

Import the generated component module once.

```typescript
// app.module.ts
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { ComponentLibraryModule } from '@orchestra-design-system/angular'

@NgModule({
  imports: [BrowserModule, ComponentLibraryModule],
})
export class AppModule {}
```

The module registers custom elements via `defineCustomElements()` from `@orchestra-design-system/core/loader` using `APP_INITIALIZER`.

Then use Orchestra components in templates:

```html
<orchestra-button text="Save"></orchestra-button> <orchestra-icon name="checked" size="20px"></orchestra-icon>
```

## Build

```bash
npm run build
```

Build output is generated to `dist/`.

## Notes

- Angular wrappers are generated from Stencil output targets.
- Source proxies live under `projects/component-library/src/lib/stencil-generated/`.
- For component API details, see [../core/README.md](../core/README.md).
