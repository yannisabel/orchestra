# Orchestra Design System

Orchestra is a design system monorepo built around Stencil web components, design tokens, and framework wrappers for React, Vue, and Angular.

## Repository structure

```text
orchestra/
├── packages/
│   ├── core/                 # Stencil web components and component runtime
│   ├── themes/               # Token sources and generated theme bundles
│   ├── icons-library/        # Generated icon exports from SVG assets
│   ├── storybook/            # Storybook docs, stories, and component tests
│   ├── react/                # React wrapper package
│   ├── vue/                  # Vue wrapper package
│   ├── angular/              # Angular wrapper package
│   └── ...
├── .github/
│   ├── instructions/
│   ├── skills/
│   └── workflows/
├── package.json
├── lerna.json
├── tsconfig.json
├── eslint.config.mjs
├── README.md
└── LICENSE.txt
```

## Design system principles

The repo follows a layered design-system model:

- Notes: raw values and primitive inputs
- Notations: token meaning and shared semantic structure
- Staves: reusable component primitives
- Scores and movements: composed patterns and page-level implementations
- Conductor: governance, tooling, and release workflows

This model is reflected in the package responsibilities: token ownership sits in the themes package, component implementation lives in the core package, and framework-specific wrappers are generated from the Stencil source.

## Requirements

- Node.js 24+
- npm

## Quick start

```bash
npm install
npm run build
npm run dev
```

## Root scripts

```bash
npm run dev             # run Storybook + core watch tasks
npm run build           # build tokens, then all workspaces
npm run build:tokens    # build theme package only
npm run lint            # run repo linting
npm run test            # run Storybook/Vitest test project
npm run release         # release-it workflow
```

## Package docs

- [packages/core/readme.md](packages/core/readme.md) — core Stencil components
- [packages/themes/README.md](packages/themes/README.md) — theme tokens and generated CSS bundles
- [packages/icons-library/README.md](packages/icons-library/README.md) — generated icon exports
- [packages/storybook/README.md](packages/storybook/README.md) — Storybook docs and interaction tests
- [packages/react/README.md](packages/react/README.md) — React wrapper usage
- [packages/vue/README.md](packages/vue/README.md) — Vue wrapper usage
- [packages/angular/README.md](packages/angular/README.md) — Angular wrapper usage

## Development workflow

1. Implement or update a Stencil component in [packages/core](packages/core).
2. Adjust theme tokens in [packages/themes](packages/themes) when visual primitives change.
3. Add or update Storybook examples in [packages/storybook](packages/storybook).
4. Build and verify with the repo scripts at the root.

## License

MIT
