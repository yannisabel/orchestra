# @orchestra-design-system/angular

Angular wrapper package for the Orchestra design system.

This package exposes the Stencil web components through Angular-friendly generated components and module wiring.

## Installation

```bash
npm install @orchestra-design-system/angular
```

The core package is installed transitively for the runtime loader and custom element registration.

## Usage

```ts
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ComponentLibraryModule } from '@orchestra-design-system/angular'

@NgModule({
  imports: [BrowserModule, ComponentLibraryModule],
})
export class AppModule {}
```

Then use the components in templates:

```html
<orchestra-button text="Save"></orchestra-button> <orchestra-icon name="checked" size="20px"></orchestra-icon>
```

## Build

```bash
npm run build
```

Build output is emitted to the package dist folder.

## Notes

- Generated proxies are in projects/component-library/src/lib/stencil-generated.
- Component behavior and styles originate from the core package.
- See [../core/readme.md](../core/readme.md) for the underlying web component APIs.
