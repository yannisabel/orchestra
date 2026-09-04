# @orchestra-design-system/themes

Theme entry points for the Orchestra design system.

This package is the public token layer for applications and Storybook. It owns token source files and generates the light and dark CSS bundles consumed by the core components and wrapper packages.

## Token model

Orchestra uses a three-tier token structure:

```text
Primitive → Semantic → Component
```

- Primitive: raw values such as colors, spacing, and radius tokens
- Semantic: meaningful values tied to role or state
- Component: optional overrides for a specific component when the semantic layer is not precise enough

This keeps the token system hierarchical and avoids unnecessary duplication.

## Structure

```text
packages/themes/
├── tokens/
│   ├── primitive.json
│   ├── semantic.light.json
│   ├── semantic.dark.json
│   ├── component.light.json
│   ├── component.dark.json
│   └── ...
├── build.mjs
├── dist/
│   ├── css/light.css
│   ├── css/dark.css
│   └── ...
├── package.json
├── README.md
└── LICENSE
```

## Usage

```css
@import '@orchestra-design-system/themes/light.css';
@import '@orchestra-design-system/themes/dark.css';
```

```ts
import '@orchestra-design-system/themes/light.css'
```

## Build

```bash
npm run build
```

This generates the distributed CSS bundles used by the design system and apps that consume it.

## Notes

- Token sources live in `tokens/`.
- CSS generation is handled by Style Dictionary.
- The core package consumes these variables, rather than owning the generated theme CSS itself.
- The public theme package is the recommended entry point for applications and Storybook.
