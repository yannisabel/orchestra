# @orchestra-design-system/themes

Theme entry points for the Orchestra design system.

This package is the recommended public entry point for applications and Storybook. It owns primitive, semantic, and component token sources and generates ready-to-use light and dark theme bundles.

## How it works

- Token sources live in `tokens/`.
- The build uses Style Dictionary to generate CSS variables per theme.
- Consumers should import this package, not internal token build files.

## Usage

```css
@import '@orchestra-design-system/themes/light.css';
@import '@orchestra-design-system/themes/dark.css';
```

## Files

- dist/css/light.css
- dist/css/dark.css

## Build

```bash
npm run build
```
