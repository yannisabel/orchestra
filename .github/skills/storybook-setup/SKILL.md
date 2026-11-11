---
name: storybook-setup
description: 'Configure and extend Storybook for Orchestra. Use when setting up Storybook, adding addons, configuring themes, or organizing stories. Covers Vite integration, Stencil plugin, dark/light theme support, story structure, and addon configuration.'
argument-hint: "Describe what you're configuring (e.g., 'add dark mode', 'organize stories', 'configure addon')"
user-invocable: true
---

# Storybook Setup

## Overview

Orchestra uses **Storybook v10** with **Vite** (`@storybook/web-components-vite`) and loads the Stencil-built core bundle for interactive component development and documentation. Storybook serves as the single source of truth for UI components, documentation, and automated testing (via Vitest + Playwright).

**Stack**:

- Storybook v10.4.6 (`storybook`, `@storybook/web-components-vite`)
- Vite dev server
- Vitest v4 with `@storybook/addon-vitest` (play-function tests)
- Playwright (browser and a11y e2e tests)
- Theme toggle via the `theme` global (system, light, dark) in `.storybook/preview.ts`

**Key principle**: Storybook is not separate from development—it's the hub where components are built, documented, and tested simultaneously.

## Storybook Structure

### Directory Layout

```
packages/storybook/
├── .storybook/                      # Storybook configuration
│   ├── main.ts                      # Main config (Vite, plugins, addons)
│   ├── preview.ts                   # Preview config (decorators, global styles)
│   └── manager.ts                   # Manager UI customization (optional)
├── public/                          # Static assets (logos, fonts)
├── src/
│   ├── index.css                    # Global Storybook styles
│   ├── vite-env.d.ts                # Vite type definitions
│   └── pages/                       # Stories and MDX docs, grouped by section
│       ├── accessibility/           # Accessibility stories
│       ├── components/              # Component-grouped docs and stories
│       │   ├── button/
│       │   │   ├── button.mdx
│       │   │   └── button.stories.ts
│       │   ├── checkbox/
│       │   └── icon/
│       ├── foundations/             # Foundations docs (themes)
│       └── overview/                # Introduction and changelog
├── vitest.config.ts                 # Vitest configuration
├── vitest.shims.d.ts                # Vitest type stubs
└── tsconfig.json                    # TypeScript config
```

### Configuration Files

**`.storybook/main.ts`** - Core Storybook configuration (stories glob, addons resolved with `getAbsolutePath`, `@storybook/web-components-vite` framework, static dirs that serve `packages/core/dist/orchestra-design-system`, and Vite live reload for `www/build`):

```typescript
const config: StorybookConfig = {
  stories: async (_, { configType }) => [
    '../src/**/*.mdx',
    configType === 'PRODUCTION'
      ? '../src/**/!(consumer-interface).stories.@(js|jsx|mjs|ts|tsx)'
      : '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-coverage'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/web-components-vite'),
    options: {},
  },
}
```

**`.storybook/preview.ts`** - Global preview configuration (theme global, token CSS, core registration):

```typescript
import '@orchestra-design-system/themes/light.css'
import '@orchestra-design-system/themes/dark.css'
import '@orchestra-design-system/core/dist/orchestra-design-system/orchestra-design-system.esm.js'

const preview: Preview = {
  globalTypes: {
    theme: {
      defaultValue: 'system',
      toolbar: { items: ['system', 'light', 'dark'] },
    },
  },
  initialGlobals: { theme: 'system' },
  parameters: {
    a11y: { test: 'todo' },
  },
}

export default preview
```

## Story Organization

### Story File Structure

```typescript
// src/pages/components/button/button.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { expect, fn } from 'storybook/test'

const meta = {
  title: 'Components/Button', // Storybook sidebar location
  component: 'orchestra-button', // Web component tag
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible button component...',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: 'primary', text: 'Click me' },
  play: async ({ canvasElement }) => {
    // Test in story-testing SKILL
  },
}
```

### Story Naming Convention

| Location   | Pattern                 | Example                |
| ---------- | ----------------------- | ---------------------- |
| **Title**  | `Components/[Category]` | `Components/Button`    |
| **Export** | PascalCase              | `export const Primary` |
| **File**   | kebab-case.stories.ts   | `button.stories.ts`    |

See [code-conventions](../code-conventions/SKILL.md) for full naming rules.

## Theme Configuration

### Dark & Light Themes

The `theme` global (`system`, `light`, `dark`) in `.storybook/preview.ts` sets the `orchestra-theme--light` or `orchestra-theme--dark` class on `document.documentElement`. The token CSS from `@orchestra-design-system/themes` scopes its variables to those classes and to `:host`, so components follow the toolbar selection.

```typescript
// Read the theme in a story via globals (set from the toolbar)
export const Dark: Story = {
  args: { variant: 'primary', text: 'Click me' },
  globals: { theme: 'dark' },
}
```

## Development & Running Storybook

### Start Development Server

```bash
# From root
npm run dev                    # Starts Storybook + Stencil dev (concurrent)

# Or directly
npm run start:storybook --workspace=@orchestra-design-system/storybook
```

This runs:

1. Vite dev server for Storybook UI
2. Stencil dev server for component hot reloading
3. Both with live reload on file changes

### Build for Production

```bash
# From root
npm run build                 # Builds design tokens, then all packages

# Build Storybook static site (output: packages/storybook/storybook-static/)
npm run build:storybook:ci --workspace=@orchestra-design-system/storybook
```

## Testing in Storybook

### Vitest Integration

Tests run directly in story play functions (see [story-testing](../story-testing/SKILL.md)):

```typescript
import { expect, userEvent, within } from 'storybook/test'

export const Interactive: Story = {
  args: { text: 'Click me', onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Click me' })

    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}
```

### Run Tests

```bash
# Run Vitest story tests (root)
npm run test:components

# Run a11y e2e tests (root)
npm run test:a11y

# Run with coverage (root)
npm run test:coverage
```

## Addons & Customization

### Essential Addons

| Addon                       | Purpose                            | Config                  |
| --------------------------- | ---------------------------------- | ----------------------- |
| `@storybook/addon-a11y`     | Accessibility audit                | Reports axe violations  |
| `@storybook/addon-docs`     | Auto-generated docs from stories   | `autodocs` in stories   |
| `@storybook/addon-links`    | Links between stories              | Auto-loaded             |
| `@storybook/addon-vitest`   | Run play functions as Vitest tests | `vitest.config.ts`      |
| `@storybook/addon-coverage` | Coverage for story tests           | `npm run test:coverage` |

### Adding a New Addon

1. **Install**:

```bash
npm install --save-dev --workspace=@orchestra-design-system/storybook @storybook/addon-example
```

2. **Configure** in `.storybook/main.ts`:

```typescript
export default {
  addons: [
    // ... existing addons
    '@storybook/addon-example',
  ],
}
```

3. **Restart** Storybook dev server

## Documentation & MDX Stories

### MDX Story Format

Create `.mdx` docs next to the stories (the `../src/**/*.mdx` glob in `main.ts` picks them up):

```mdx
import { Canvas, Meta, Story } from '@storybook/addon-docs/blocks'

<Meta title="Components/Button" />

# Button Component

A flexible button for user interactions.

## Usage

<Canvas>
  <Story name="Primary">
    <orchestra-button text="Click me" variant="primary"></orchestra-button>
  </Story>
</Canvas>

## Variants

### Secondary

<Canvas>
  <Story name="Secondary">
    <orchestra-button text="Click me" variant="secondary"></orchestra-button>
  </Story>
</Canvas>
```

## Best Practices

### ✅ Do's

- ✅ One story per variant/state combination
- ✅ Use meaningful `argTypes` for component props
- ✅ Include accessibility tests in play functions
- ✅ Name stories descriptively (Primary, Disabled, WithIcon)
- ✅ Test in both light and dark themes
- ✅ Group related stories with title hierarchy
- ✅ Use `play()` for interaction testing (see [story-testing](../story-testing/SKILL.md))

### ❌ Don'ts

- ❌ Multiple states in one story (create separate stories)
- ❌ Hardcoding theme/design token values in stories
- ❌ Skipping accessibility testing
- ❌ Stories with no `args` (always define component inputs)
- ❌ Placing stories outside `src/pages/` (group them by section, e.g. `pages/components/{name}/`)

## Efficiency Tips

When working with LLMs on Storybook:

- Provide story exports instead of full MDX when asking for patterns
- Reference [story-testing](../story-testing/SKILL.md) for test patterns
- Use [token-optimization](../token-optimization/SKILL.md) to explore configuration files without full context

## References

- [token-optimization](../token-optimization/SKILL.md) — Efficient exploration
- [story-testing](../story-testing/SKILL.md) — Write tests in play functions
- [stencil-components](../stencil-components/SKILL.md) — Component implementation
- [themes](../themes/SKILL.md) — Token theming
- [Storybook Official Docs](https://storybook.js.org/)
- [Vitest + Storybook Integration](https://storybook.js.org/docs/writing-tests/vitest)
