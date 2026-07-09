# Orchestra Design System Storybook

Component documentation, testing, and visual development environment for Orchestra Design System web components.

## Quick Start

### View Storybook Locally

```bash
# From repository root
npm run dev

# Or from packages/storybook
npm run storybook:dev
```

Opens at http://localhost:6006/

### Build Static Site

```bash
# From repository root
npm run build:storybook

# Or from packages/storybook
npm run build-storybook
```

Output: `packages/storybook/storybook-static/`

## Features

- **Interactive Component Stories** - Develop and test components in isolation
- **Play Functions** - Automated testing and interactions defined in stories
- **Theme Support** - Light and dark mode switcher
- **Icon Library Demo** - Custom icon library registration example
- **Responsive Preview** - Built-in device/viewport simulators
- **Accessibility Testing** - A11y addon for accessibility checks

## Component Stories

Stories are located in `packages/storybook/src/stories/components/` and organized by component name.

### Story Structure

```typescript
// packages/storybook/src/stories/components/button/button.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components-vite'

export default {
  component: 'orchestra-button',
  title: 'Components/orchestra-button',
  argTypes: {/* define controls */},
} satisfies Meta

export const Primary = {
  render: (args) =>
    `<orchestra-button variant="${args.variant}">Click me</orchestra-button>`,
  args: { variant: 'primary' },
  play: async ({ canvasElement }) => {
    // Automated tests run here
  },
} satisfies Story
```

### Writing Stories

1. **Create story file** - `src/stories/components/{name}/{name}.stories.ts`
2. **Define component** - Reference the web component tag
3. **Add controls** - Use `argTypes` for interactive props
4. **Write render function** - Return HTML string with component
5. **Add play function** - Optional: interactive testing

## Custom Icon Libraries

Orchestra supports registering custom icon libraries at runtime.

Recommended pattern in Storybook:

- Register libraries in `.storybook/preview.ts` (or a global decorator) before stories render.
- Use `play()` only for interaction assertions or explicit runtime swap scenarios.

### Example: Custom Library Story

```typescript
// packages/storybook/src/stories/components/icon/icon.stories.ts
export const CustomLibrary = {
  render: (args) =>
    `<orchestra-icon name="${args.name}" library="custom" fill="${args.fill}" size="${args.size}"></orchestra-icon>`,
  args: {
    name: 'star',
    fill: 'currentcolor',
    size: '60px',
  },
} satisfies Story
```

### Key Timing Requirements

- **Register BEFORE render** - Use `.storybook/preview.ts` or an early decorator
- **Use `play()` for interactions** - Reserve it for assertions or explicit runtime switching tests
- **Global registry** - Uses `window.__orchestraIconRegistry` for shared access

## Testing

### Play Functions

Tests run in Storybook's Play panel:

```typescript
play: async ({ canvasElement }) => {
  const button = canvasElement.querySelector('orchestra-button')

  // Test initial state
  expect(button.getAttribute('aria-label')).toBe('Click me')

  // Simulate interactions
  await userEvent.click(button)

  // Assert after action
  expect(button.hasAttribute('active')).toBe(true)
}
```

### Run All Tests

```bash
npm run storybook:test          # Run all play functions
npm run storybook:test-coverage # With coverage report
```

## Theming

Storybook includes light and dark theme support via the Storybook Themes addon.

- **Light Theme** - Default, imports `@orchestra-design-system/themes/light.css`
- **Dark Theme** - Toggle via Storybook theme switcher

Best practice for applications and Storybook is to use the themes package as the public entry point. The themes package now owns primitive/semantic/component token sources and generates token CSS variables directly.

To customize themes, see [Themes README](../themes/README.md).

## Configuration

### Storybook Config

- **Entry Point** - `.storybook/main.ts` - Framework setup and static assets
- **Preview Config** - `.storybook/preview.ts` - Global decorators and theming
- **Vite Config** - customized in `.storybook/main.ts` via `viteFinal` (base path, live-reload plugin, aliases, chunking)

### Static Assets

Static files are copied during build:

```typescript
// .storybook/main.ts
staticDirs: [
  '../public',
  {
    from: '../../core/dist/orchestra-design-system',
    to: '/orchestra-design-system',
  },
]
```

This ensures Stencil entry files and built components are available to stories.

## File Structure

```
packages/storybook/
├── .storybook/
│   ├── main.ts            # Storybook framework config
│   ├── preview.ts         # Global decorators & theme setup
│   └── manager.ts         # UI customization (optional)
├── src/
│   ├── stories/
│   │   ├── components/    # Component stories
│   │   │   ├── button/
│   │   │   ├── icon/
│   │   │   └── ...
│   │   └── pages/         # Page-level stories (optional)
│   ├── index.css          # Global Storybook styles
│   └── vite-env.d.ts
├── storybook-static/      # Built static site (generated)
├── public/                # Static assets copied to build
├── package.json
├── tsconfig.json
├── vitest.config.ts       # Test runner config
└── README.md
```

## GitHub Pages Deployment

Storybook deployment uses two flows:

- **Branch previews**
  - Trigger: push to any non-main branch
  - Workflow: `.github/workflows/storybook-deploy.yml`
  - Access path: `https://{username}.github.io/{repo}/branches/{sanitized-branch}/`

- **Main Storybook**
  - Trigger: successful non-dry release on `main`
  - Workflow: `.github/workflows/release.yml` (`deploy-storybook-main` job)
  - Access path: `https://{username}.github.io/{repo}/`

Example:

```bash
git push origin feature/new-component
# Workflow runs, deploys to:
# https://yannisabel.github.io/orchestra/branches/feature-new-component/
```

## Development Tips

### Hot Module Reload (HMR)

Storybook watches for changes in:

- Story files (`src/stories/**`)
- Built core outputs used by Storybook (`../../core/www/build/**`)
- Preview config (`.storybook/preview.ts`)

Changes auto-reload in browser without manual refresh.

### Debugging

- **Browser DevTools** - Use Elements tab to inspect components
- **Story Source** - Click "Show code" button to see generated HTML
- **Console** - Check for warnings/errors during story interactions
- **Actions** - Addon shows component events and interactions

### Performance

- **Lazy Loading** - Storybook lazy-loads stories on demand
- **Build Optimization** - Vite handles minification and splitting
- **Bundle Size** - Monitor with Webpack Bundle Analyzer (optional addon)

## Learn More

- [Storybook Docs](https://storybook.js.org/docs/web-components)
- [Web Components in Storybook](https://storybook.js.org/docs/web-components/get-started)
- [Play Functions](https://storybook.js.org/docs/web-components/writing-stories/play-function)
- [Stencil Storybook Integration](https://stenciljs.com/docs/storybook)
