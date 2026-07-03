# @orchestra-design-system/angular

Angular wrapper package for Orchestra web components.

## Installation

```bash
npm install @orchestra-design-system/angular @orchestra-design-system/core
```

## Usage

Import the generated component module and initialize custom elements once.

```typescript
// app.module.ts
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { OrchestraComponentsModule } from '@orchestra-design-system/angular'
import { defineCustomElements } from '@orchestra-design-system/core/loader'

defineCustomElements()

@NgModule({
  imports: [BrowserModule, OrchestraComponentsModule],
})
export class AppModule {}
```

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
