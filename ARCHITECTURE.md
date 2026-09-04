# Architecture Contract

This document is the maintainer-facing source of truth for the repo structure, package ownership, and update flow. It complements the root README and the AI skill files.

## 1. Repository map

- `packages/core` — Stencil component runtime and source of truth for web components.
- `packages/themes` — token sources and generated theme artifacts.
- `packages/icons-library` — generated icon exports derived from SVG assets.
- `packages/storybook` — docs, examples, and Storybook/Vitest interaction coverage.
- `packages/react` — generated React wrapper exports.
- `packages/vue` — generated Vue wrapper exports and plugin layer.
- `packages/angular` — Angular package consuming generated Stencil proxies.
- `.github/skills` — AI task guidance for repo workflows and conventions.
- `.github/instructions` — global agent rules and response constraints.

## 2. Ownership boundaries

- Components live in `packages/core/src/components`.
- Tokens live in `packages/themes/tokens` and are built into theme outputs.
- Icons live in `packages/icons-library/src` and are generated from the SVG asset set.
- Storybook stories and tests live in `packages/storybook/src`.
- React/Vue/Angular packages are wrapper surfaces, not independent implementations.

## 3. Source-of-truth rules

- Treat `packages/core` as the canonical implementation layer for component logic.
- Treat `packages/themes` as the canonical token source.
- Treat generated wrapper output as derived from Stencil output targets, not as hand-written component implementations.
- If a package name, script, dependency, or repo layout changes, update the matching README and skill docs in the same change.
- New architecture changes require a matching docs update in the root README, package docs, and relevant skill files.

## 4. Generated wrapper flow

The repo uses Stencil output targets defined in `packages/core/stencil.config.ts`.

- React output is generated into `packages/react/lib/components/stencil-generated/`
- Vue output is generated into `packages/vue/lib/stencil-generated/`
- Angular output is generated into `packages/angular/projects/component-library/src/lib/stencil-generated/`

Do not manually recreate wrapper behavior that Stencil already generates. Update the Stencil source and rebuild the wrapper outputs.

## 5. Common workflows

### Local setup

```bash
npm install
npm run build
npm run dev
```

### Validation

```bash
npm run check:docs
npm run lint
npm run test
```

### Package-specific release

```bash
npm run release:core
npm run release:react
npm run release:vue
npm run release:angular
npm run release:themes
npm run release:icons-library
```

## 6. Change policy

When changing any of the following, update this contract and the related docs in the same PR:

- package names
- workspace layout
- build/test scripts
- framework wrapper boundaries
- cross-package ownership

## 7. AI operating principle

AI and automation should work from the repo docs and skills as the canonical operating model, not from stale assumptions or generic framework examples. The repo should be treated as a monorepo with a clear source-of-truth layer and explicit derived output packages.
