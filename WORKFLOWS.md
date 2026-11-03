# Maintainer Workflows

This guide defines the expected workflow for the three most common repo tasks: component work, token work, and package release. It is intentionally short and should stay aligned with the repo architecture contract.

## 1. Add or update a component

When a change belongs to the component system:

1. Update the Stencil source under `packages/core/src/components`.
2. Keep the component API and props aligned with the web component contract.
3. Add or update Storybook stories in `packages/storybook/src`.
4. Verify behavior with Storybook/Vitest play tests.
5. Rebuild the core package so generated wrapper outputs refresh.
6. Check the wrapper packages for any generated diffs, but do not hand-author duplicate logic.

Important:

- The source-of-truth is Stencil, not React/Vue/Angular.
- Wrapper packages should remain generated surfaces unless the underlying Stencil output target changes.

## 2. Update design tokens

When visual primitives or theme values change:

1. Edit token files in `packages/themes/tokens`.
2. Rebuild the theme package.
3. Check downstream component stories and visual output in Storybook.
4. Verify the change does not require a new component contract unless the semantics changed.

Important:

- `packages/themes` owns token semantics and generated output.
- Component changes should consume the updated tokens rather than re-implement them in component code.

## 3. Release a package

Use the package-level release scripts from the repo root:

```bash
npm run release:core
npm run release:react
npm run release:vue
npm run release:angular
npm run release:themes
npm run release:icons-library
```

Before release:

```bash
npm run check:docs
npm run lint
npm run build
npm run test
```

Important:

- Do not release a package without verifying the repo docs and AI guidance still match the real state.
- Treat generated wrappers as derived artifacts of the Stencil build, not independent authored packages.

## 4. Repo guardrail

Before merging a repo-wide or package-wide change, run:

```bash
npm run check:docs
```

If the package graph, package names, output targets, or repo responsibilities changed, update the related docs in the same change.

## 5. Breaking API changes (core)

The core public API is tracked in `packages/core/custom-elements.json`, which is generated on every core build. The `api-compatibility` CI job fails a PR that removes or changes public API without declaring it.

- Additions are non-breaking. Removing or changing a prop, attribute, type, default, method, event, slot, CSS property, or CSS part is breaking.
- Exceptions: widening a union type (e.g. `'a' | 'b'` to `'a' | 'b' | 'c'`) keeps the previous default, and appending optional method parameters, are non-breaking. Changing a default, even from none to a value, is breaking.
- For a breaking change, at least one commit in the PR range (`merge-base..HEAD`, merges excluded) must be a Conventional Commit with `!` in the header and a `BREAKING CHANGE:` footer explaining the change. It does not have to be the last commit:

```text
feat(core)!: replace button variant with kind

BREAKING CHANGE: the variant prop is removed; use kind instead.
```

- A `!` or `BREAKING CHANGE` footer drives a major version bump on release (`release-it` with the conventional commits preset).

- Commit the regenerated `custom-elements.json` with the change. The job fails if it is out of date.
- The job is skipped when the base branch has no `packages/core/custom-elements.json` yet (for example, before the manifest was first merged).
- To run the same check locally, use `npm run check:api` (see [scripts/README.md](./.github/scripts/README.md)).
