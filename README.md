# Orchestra Design System

Orchestra Design System is a monorepo for a design system built on Stencil web components, design tokens, theme bundles, and framework wrappers.

## Monorepo overview

```text
orchestra/
├── packages/
│   ├── core/              # Stencil components
│   ├── themes/            # Public theme bundles (light/dark) with primitive/semantic/component token sources
│   ├── icons-library/     # SVG ingestion and icon exports
│   ├── angular/           # Angular wrapper package
│   ├── react/             # React wrapper package
│   ├── vue/               # Vue wrapper package
│   └── storybook/         # Docs, stories, and story tests
├── .github/workflows/     # CI, release, and Storybook deploy workflows
├── lerna.json             # Lerna configuration
└── package.json           # npm workspaces + root scripts
```

## Requirements

- Node.js 24 (from `.nvmrc`)
- npm (workspace installs use `npm` + Lerna)
- `.npmrc` contains `legacy-peer-deps=true` for workspace compatibility

## Quick start

```bash
npm install
npm run build
```

Start development (core watcher + Storybook dev server):

```bash
npm run dev
```

## Root scripts

- `npm run dev`: starts Storybook development and core watchers
- `npm run build`: builds themes first, then all workspaces
- `npm run build:tokens`: builds only `@orchestra-design-system/themes`
- `npm run build:storybook`: builds static Storybook
- `npm run lint`: runs Oxlint (with `--fix`)
- `npm run lint:check`: runs Oxlint in check-only mode
- `npm run lint:eslint`: runs ESLint compatibility checks for root config files
- `npm run test`: runs Storybook/Vitest test project
- `npm run test:coverage`: runs tests with coverage
- `npm run format`: runs Prettier across the repo
- `npm run release` / `npm run release:dry`: root release-it workflow

## Package documentation

- [packages/core/README.md](packages/core/README.md): Stencil components and component package usage
- [packages/themes/README.md](packages/themes/README.md): public theme bundles and recommended app entry point
- [packages/icons-library/README.md](packages/icons-library/README.md): icon build and exports
- [packages/angular/README.md](packages/angular/README.md): Angular wrapper package
- [packages/react/README.md](packages/react/README.md): React wrapper package
- [packages/vue/README.md](packages/vue/README.md): Vue wrapper package
- [packages/storybook/README.md](packages/storybook/README.md): Storybook setup and stories

## Development workflow

### Add or update a component

1. Implement component logic in `packages/core/src/components/<name>/`
2. Update theme tokens in `packages/themes/tokens/` if needed
3. If necessary, update the generated theme bundles via the themes package
4. Add or update stories in `packages/storybook/src/stories/`
5. Add test assertions in Storybook play functions
6. Build and verify:

```bash
npm run build
npm run test
```

### Add icons

1. Add SVG files in `packages/icons-library/svg/`
2. Run build to regenerate icon outputs:

```bash
npm run build
```

## Theme usage

Best practice for applications is to consume the themes package:

```css
@import '@orchestra-design-system/themes/light.css';
@import '@orchestra-design-system/themes/dark.css';
```

The themes package is the source of truth for primitive, semantic, and component token sources as well as generated light/dark CSS bundles.

## CI and release

- `workflow.yml`: runs lint on pushes/PRs and tests on main/master
- `storybook-deploy.yml`: deploys Storybook for non-main branches
- `release.yml`: manual (`workflow_dispatch`) release job, gated to main, supports dry-run input

Local validation before pushing:

```bash
npm run lint
npm run build
npm run test
```

## License

MIT
