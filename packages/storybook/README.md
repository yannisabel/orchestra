# @orchestra-design-system/storybook

Storybook documentation and interaction testing for the Orchestra design system.

This package provides the component playground, design review surface, and automated interaction tests for the core web components.

## Quick start

```bash
npm run dev
```

Or run the Storybook package directly:

```bash
cd packages/storybook
npm run storybook:dev
```

The docs are served on http://localhost:6006.

## Build

```bash
npm run build:storybook
```

This generates the static Storybook site in the package output folder.

## Features

- Component stories and examples
- Play-function interaction tests
- Light and dark theme previews
- Accessibility checks via Storybook addons
- Icon library demos and runtime custom library registration

## Testing

```bash
npm run storybook:test
npm run storybook:test-coverage
```

## Theming

Storybook consumes the public theme bundles from the themes package. This keeps visual review aligned with how consumers import the design system in real applications.

## Notes

- Story files live under src/stories.
- Global Storybook setup is configured in .storybook.
- The package depends on the core component runtime, the theme bundle, and the generated icon library.
