# Orchestra Kit

Orchestra Kit is a monorepo for a design system built on Stencil web components, design tokens, and framework wrappers.

## Monorepo overview

```text
orchestra/
├── packages/
│   ├── core/              # Stencil components (currently button and icon)
│   ├── design-tokens/     # Token source + generated outputs
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
- `npm run build`: builds tokens first, then all workspaces
- `npm run build:tokens`: builds only `@orchestra-design-system/design-tokens`
- `npm run build:storybook`: builds static Storybook
- `npm run lint`: runs Oxlint (with `--fix`)
- `npm run lint:check`: runs Oxlint in check-only mode
- `npm run lint:eslint`: runs ESLint compatibility checks for root config files
- `npm run test`: runs Storybook/Vitest test project
- `npm run test:coverage`: runs tests with coverage
- `npm run format`: runs Prettier across the repo
- `npm run release` / `npm run release:dry`: root release-it workflow

## Package documentation

- [packages/core/README.md](packages/core/README.md): Stencil components
- [packages/design-tokens/README.md](packages/design-tokens/README.md): token architecture and usage
- [packages/icons-library/README.md](packages/icons-library/README.md): icon build and exports
- [packages/angular/README.md](packages/angular/README.md): Angular wrapper package
- [packages/react/README.md](packages/react/README.md): React wrapper package
- [packages/vue/README.md](packages/vue/README.md): Vue wrapper package
- [packages/storybook/README.md](packages/storybook/README.md): Storybook setup and stories

## Development workflow

### Add or update a component

1. Implement component logic in `packages/core/src/components/<name>/`
2. Update tokens in `packages/design-tokens/tokens/` if needed
3. Add or update stories in `packages/storybook/src/stories/`
4. Add test assertions in Storybook play functions
5. Build and verify:

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
