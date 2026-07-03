---
name: storybook-setup
description: 'Configure and extend Storybook for Orchestra. Use when setting up Storybook, adding addons, configuring themes, or organizing stories. Covers Vite integration, Stencil plugin, dark/light theme support, story structure, and addon configuration.'
argument-hint: "Describe what you're configuring (e.g., 'add dark mode', 'organize stories', 'configure addon')"
user-invocable: true
---

# Storybook Setup

## Overview

Orchestra uses **Storybook v10.4.6** with **Vite** and the **Stencil ESM plugin** for interactive component development and documentation. Storybook serves as the single source of truth for UI components, documentation, and automated testing (via Vitest + Playwright).

**Stack**:

- Storybook v10.4.6
- Vite dev server
- @stencil/storybook-plugin (ESM loader)
- Vitest v4.1.9 (integrated testing)
- Playwright v1.61.0 (browser testing)
- Dark-mode addon (theme switching)

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
│   └── stories/
│       ├── components/              # Component-grouped stories
│       │   ├── button/
│       │   │   └── button.stories.ts
│       │   ├── form-input/
│       │   │   └── form-input.stories.ts
│       │   └── ...
│       └── assets/                  # Shared story assets
├── vitest.config.ts                 # Vitest configuration
├── vitest.shims.d.ts                # Vitest type stubs
└── tsconfig.json                    # TypeScript config
```

### Configuration Files

**`.storybook/main.ts`** — Core Storybook configuration:

```typescript
import { getViteConfig } from '@stencil/storybook-plugin'

export default {
  stories: ['../src/stories/**/*.stories.ts'], // Story files glob
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y', // Accessibility
    '@storybook/addon-interactions',
    'storybook-dark-mode', // Dark/light themes
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: { builder: getViteConfig() }, // Stencil + Vite
  },
  docs: {
    autodocs: 'tag', // Auto-generate docs from stories
  },
}
```

**`.storybook/preview.ts`** — Global preview configuration (themes, decorators):

```typescript
import { Preview } from '@storybook/web-components'
import { themes } from '@storybook/theming'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    docs: {
      theme: themes.light,
    },
    darkMode: {
      classNameDark: 'orchestra-theme--dark', // Dark theme class
      classNameLight: 'orchestra-theme--light', // Light theme class
      stylePreview: true, // Preview theme in story list
    },
  },
  decorators: [
    (story) => {
      // Global decorators (theme setup, providers, etc.)
      return story()
    },
  ],
}

export default preview
```

## Story Organization

### Story File Structure

```typescript
// src/stories/components/button/button.stories.ts
import { Meta, StoryObj } from '@storybook/web-components'
import { expect } from '@storybook/test'

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
  args: { variant: 'primary', label: 'Click me' },
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

Storybook integrates with Orchestra's design tokens for automatic theme switching:

```typescript
// .storybook/preview.ts
darkMode: {
  classNameDark: 'orchestra-theme--dark',     // Applied to root
  classNameLight: 'orchestra-theme--light',   // Applied to root
  stylePreview: true,                         // Theme button in toolbar
}
```

**CSS Applied**:

```css
/* Light theme (default) */
.orchestra-theme--light {
  --orchestra-color-primary: #7b55ad;
  /* ... all light tokens */
}

/* Dark theme */
.orchestra-theme--dark {
  --orchestra-color-primary: #9066d9;
  /* ... all dark tokens */
}
```

**In stories**:

```typescript
export const DarkMode: Story = {
  args: { variant: 'primary' },
  parameters: {
    darkMode: { classNameDark: 'orchestra-theme--dark' }, // Force dark
  },
}
```

## Development & Running Storybook

### Start Development Server

```bash
# From root
npm run dev                    # Starts Storybook + Stencil dev (concurrent)

# Or directly
npm run storybook:start --workspace=@orchestra-design-system/storybook
```

This runs:

1. Vite dev server for Storybook UI
2. Stencil dev server for component hot reloading
3. Both with live reload on file changes

### Build for Production

```bash
# From root
npm run build                 # Builds design tokens, then all packages

# Build Storybook static site
npm run build-storybook-ci --workspace=@orchestra-design-system/storybook
# Output: `.storybook/dist/`
```

## Testing in Storybook

### Vitest Integration

Tests run directly in story play functions (see [story-testing](../story-testing/SKILL.md)):

```typescript
export const Interactive: Story = {
  args: { label: 'Click me' },
  play: async ({ canvasElement, args }) => {
    const button = canvasElement.querySelector('orchestra-button')

    // Import test utilities
    const { userEvent } = await import('@storybook/test')
    const { expect } = await import('@storybook/test')

    // Test
    expect(button).toBeInTheDocument()
    await userEvent.click(button)
    expect(args.onClick).toHaveBeenCalledOnce()
  },
}
```

### Run Tests

```bash
# Run Vitest on all stories
npm run test

# Run specific story
npm run test -- button.stories.ts

# Run with coverage
npm run test:coverage
```

## Addons & Customization

### Essential Addons

| Addon                           | Purpose                          | Config            |
| ------------------------------- | -------------------------------- | ----------------- |
| `@storybook/addon-a11y`         | Accessibility audit              | Auto-loaded       |
| `@storybook/addon-docs`         | Auto-generated docs from stories | `autodocs: 'tag'` |
| `@storybook/addon-essentials`   | Controls, actions, viewport      | Auto-loaded       |
| `storybook-dark-mode`           | Dark/light theme toggle          | In preview.ts     |
| `@storybook/addon-interactions` | Play function interactions       | Auto-loaded       |

### Adding a New Addon

1. **Install**:

```bash
npm install --save-dev @storybook/addon-example
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

Create `.stories.mdx` files for documentation:

```mdx
import { Canvas, Story, Meta } from '@storybook/blocks'
import { Button } from '../button'

<Meta title="Components/Button" component={Button} />

# Button Component

A flexible button for user interactions.

## Usage

<Canvas>
  <Story name="Primary">
    <orchestra-button variant="primary">Click me</orchestra-button>
  </Story>
</Canvas>

## Variants

### Secondary

<Canvas>
  <Story name="Secondary">
    <orchestra-button variant="secondary">Click me</orchestra-button>
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
- ❌ Placing stories in component folders (use `stories/` directory)

## Efficiency Tips

When working with LLMs on Storybook:

- Provide story exports instead of full MDX when asking for patterns
- Reference [story-testing](../story-testing/SKILL.md) for test patterns
- Use [token-optimization](../token-optimization/SKILL.md) to explore configuration files without full context

## References

- [token-optimization](../token-optimization/SKILL.md) — Efficient exploration
- [story-testing](../story-testing/SKILL.md) — Write tests in play functions
- [stencil-components](../stencil-components/SKILL.md) — Component implementation
- [design-tokens](../design-tokens/SKILL.md) — Token theming
- [Storybook Official Docs](https://storybook.js.org/)
- [Stencil Storybook Plugin](https://github.com/ionic-team/stencil-storybook-plugin)
- [Vitest + Storybook Integration](https://storybook.js.org/docs/writing-tests/vitest)
