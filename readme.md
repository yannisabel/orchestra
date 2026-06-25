# Orchestra Kit

Orchestra Kit is a design system and component library built with web components that follows Orchestra Design Systems principles. It provides theme-aware components, design tokens, and multiple framework integrations.

## Monorepo Structure

```
orchestra/
├── packages/
│   ├── core/                    # Stencil web components
│   ├── design-tokens/           # Design system tokens (CSS/JSON/JS)
│   ├── icons-library/           # SVG icon library (auto-generated)
│   ├── angular/                 # Angular wrapper components
│   ├── react/                   # React wrapper components
│   ├── vue/                     # Vue wrapper components
│   └── storybook/               # Component documentation & testing
├── .github/
│   ├── instructions/            # Code conventions
│   ├── skills/                  # AI assistant domain knowledge
│   └── workflows/               # CI/CD pipelines
├── lerna.json                   # Monorepo config
└── package.json                 # Root workspace config
```

## Quick Start

### Prerequisites
- Node.js 18+
- npm 8+

### Install Dependencies

```bash
npm install
```

The monorepo uses `npm` workspaces and Lerna for dependency management.

### Build All Packages

```bash
npm run build
```

Builds in dependency order:
1. Design tokens → CSS/JSON/JS variables
2. Icons library → SVG string exports (auto-generated from svg/ folder)
3. Core components → Stencil compilation
4. Framework wrappers → Angular/React/Vue component wrappers

### Development Workflow

```bash
# Watch mode (core + storybook)
npm run dev

# Lint all packages
npm run lint

# Type check
npm run type-check
```

## Packages

Each package has detailed documentation. See their individual READMEs:

- **[Design Tokens](packages/design-tokens/README.md)** - Theme-aware tokens (CSS/JSON/JS), three-tier hierarchy, Figma integration
- **[Icons Library](packages/icons-library/README.md)** - Auto-generated SVG exports, type-safe icon names
- **[Core Components](packages/core/readme.md)** - Stencil web components, component API reference
- **[Angular](packages/angular/readme.md)** - Angular component wrappers
- **[React](packages/react/README.md)** - React component wrappers
- **[Vue](packages/vue/README.md)** - Vue component wrappers
- **[Storybook](packages/storybook/README.md)** - Component stories, testing, documentation

Quick reference:
```bash
npm install @orchestra-kit/core              # Web components
npm install @orchestra-kit/design-tokens     # Design tokens
npm install @orchestra-kit/icons-library     # Icons
npm install @orchestra-kit/react             # React (or angular, vue)
```

## Development

### Creating Components

1. **Component** - `packages/core/src/components/{name}/`
2. **Design Tokens** - Update semantic token files if needed
3. **Stories** - `packages/storybook/src/stories/components/{name}/`
4. **Tests** - Add Play functions to stories (see [Testing](#linting--testing))
5. **Wrappers** - Create React/Vue/Angular wrappers (optional)

See [packages/core/readme.md](packages/core/readme.md) for detailed component guidelines.

### Adding Icons

1. Add SVG → `packages/icons-library/svg/`
2. Run `npm run build` (auto-generates exports)

See [packages/icons-library/README.md](packages/icons-library/README.md) for details.

### Themes

Components use CSS variables and are automatically theme-aware. See [Design Tokens README](packages/design-tokens/README.md) for theme customization.

## Build Pipeline

### Root Build Command
```bash
npm run build
```

**Dependency order (enforced by Lerna):**

1. **design-tokens** → Generates CSS/JSON/JS variables
   ```bash
   cd packages/design-tokens && npm run build
   ```

2. **icons-library** → Auto-generates from SVG files
   ```bash
   cd packages/icons-library && npm run build
   ```

3. **core** → Stencil components (uses tokens + icons)
   ```bash
   cd packages/core && npm run build:js
   ```

4. **Framework wrappers** (async)
   - angular
   - react
   - vue

5. **storybook** → Documentation (uses core components)
   ```bash
   npm run build-storybook
   ```

### Watch Mode
```bash
npm run dev
```

Watches:
- Core components
- Storybook stories
- Keeps dev server running

## Linting & Testing

### Lint All Packages
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

### Test in Storybook

Tests run in the **Play function** of each story:

```typescript
// packages/storybook/src/stories/components/button/button.stories.ts
export const Primary = {
  render: (args) => `<orchestra-button ...>${args.label}</orchestra-button>`,
  args: { ... },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('orchestra-button')
    await userEvent.click(button)
    // Test assertions here
  }
} satisfies Story
```

Run tests:
```bash
npm run storybook:test          # Run all Play functions
npm run storybook:test-coverage # With coverage report
```

**Benefits:**
- Tests run in real browser environment
- Interactive testing during Storybook development
- Visual feedback alongside test results
- Play functions run automatically in CI

## Contributing & Publishing

**Contributing:**
1. `npm install`
2. Create feature branch
3. `npm run build && npm run lint`
4. Test in Storybook: `npm run dev`
5. Create pull request

**Release Process:**

The repository uses a dual-workflow strategy:

- **NPM Releases** (main branch only) - Automated via GitHub Actions
  ```bash
  git push origin main  # Triggers release.yml workflow
  ```
  Workflow steps: Build → Run release-it → Publish to npm → Create GitHub release

- **Storybook Deployment** (all branches except main) - Automated via GitHub Actions
  ```bash
  git push origin feature-branch  # Triggers storybook-deploy.yml workflow
  ```
  Workflow steps: Build → Deploy to GitHub Pages on gh-pages branch
  
  Access deployed Storybook:
  ```
  https://<username>.github.io/<repo-name>/<branch-name>/
  ```

**Local testing before deployment:**
```bash
npm run build          # Build all packages
npm run build:storybook  # Build Storybook static site
npm run storybook:dev  # Preview locally at http://localhost:6006
```

## License

MIT
