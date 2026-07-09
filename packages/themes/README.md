# @orchestra-design-system/themes

Theme entry points for the Orchestra design system.

This package is the recommended public entry point for applications and Storybook. It is generated from the design-tokens package and exposes ready-to-use light and dark theme bundles.

## How it works

- The design-tokens package stores the source token files (primitive, semantic, component).
- The themes package combines primitive tokens with per-theme semantic and per-theme component token files.
- The themes package generates CSS variables for each theme and publishes the final theme bundles.
- Applications should import the themes package, not the lower-level design-tokens CSS files directly.

## Usage

```css
@import '@orchestra-design-system/themes/light.css';
@import '@orchestra-design-system/themes/dark.css';
```

```typescript
import '@orchestra-design-system/themes/light.css'
```

> Best practice: use the themes package in apps. The design-tokens package remains the source of truth for token generation and should be considered an implementation detail unless you need to consume raw variables directly.
