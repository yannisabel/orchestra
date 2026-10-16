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
npm run test:components
npm run test:components:coverage
npm run test:integration
```

From the repository root, `npm run test:components` (also `npm run test`)
runs Storybook/Vitest once, `npm run test:integration` runs Playwright
independently, and `npm run test:all` runs
both sequentially. Build packages first with `npm run build`. CI runs the two
suites as parallel matrix jobs, each with its own package build.

### Consumer-facing browser tests

From the repository root:

```bash
npm run build:js --workspace=@orchestra-design-system/core
npm run test:integration
```

The Playwright suite starts Storybook on port 6007 and exercises the consumer
interface story without competing play functions. It uses actual Playwright
`getByRole()` and `getByLabel()` locators, pointer input, and Tab/Enter/Space
keyboard input against the built components. Assertions cover accessible names,
focus order, disabled state, checkbox state, and visible action results.

The consumer-interface fixture is available during development and excluded
from production Storybook builds by the story discovery configuration.

Keep consumer-facing checks independent of shadow markup and CSS class names.
Storybook play tests remain useful for individual states and implementation
regressions; these browser tests verify the public interface. Neither replaces
manual screen-reader or visual accessibility testing.

## Theming

Storybook consumes the public theme bundles from the themes package. This keeps visual review aligned with how consumers import the design system in real applications.

## Notes

- Story files live under src/stories.
- Global Storybook setup is configured in .storybook.
- The package depends on the core component runtime, the theme bundle, and the generated icon library.
