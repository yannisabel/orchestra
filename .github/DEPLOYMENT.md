# GitHub Deployment Strategy

This repository uses separate workflows for package releases and Storybook deployments.

## Overview

- **Package Release Workflow**: manual, main branch only, publishes npm packages under `@orchestra-design-system/*`
- **Storybook Branch Previews**: automatic on push, deploys non-main branches to branch paths in GitHub Pages
- **Storybook Main Deployment**: runs only after a successful non-dry package release

## Release Workflow

**File**: `.github/workflows/release.yml`

### Trigger

Release is manually triggered with `workflow_dispatch` and supports a `dry-run` input.

- Default: `dry-run: true`
- Branch guard: job runs only on `main`

### Release Flow

1. Run preflight permission checks (`NPM_TOKEN`, npm scope access, `GITHUB_TOKEN` API access)
2. Install dependencies and build all packages
3. Configure git identity
4. Validate internal package version/dependency alignment
5. Execute release mode via `.github/scripts/release-packages.cjs`

#### Dry-run mode (`dry-run: true`)

- Computes shared version from `core` dry-run.
- Runs remaining package dry-runs with the shared version.

#### Real release mode (`dry-run: false`)

- Syncs internal dependency ranges to the shared release version
- Publishes all packages with `--no-github` (npm publish first)
- Refreshes and commits lockfile if needed
- After publish succeeds for all packages, creates GitHub Releases from generated package tags
- Adds a migration note automatically on first `0.0.1` releases under the new scope

This guarantees GitHub releases are created only after successful package publishing.

### Published Packages

Release workflow publishes these packages:

- `@orchestra-design-system/core`
- `@orchestra-design-system/react`
- `@orchestra-design-system/angular`
- `@orchestra-design-system/vue`
- `@orchestra-design-system/design-tokens`
- `@orchestra-design-system/icons-library`

`@orchestra-design-system/storybook` is not published to npm.

### Changelog Behavior

Each publishable package maintains its own `CHANGELOG.md` and is updated by release-it conventional changelog plugin during release.

## Storybook Deployment

### Branch Preview Workflow

**File**: `.github/workflows/storybook-deploy.yml`

- Trigger: push to all branches
- For non-main branches: builds and deploys to `gh-pages` under:

`/branches/{sanitized-branch-name}/`

- For `main`: this workflow intentionally skips main deployment

### Main Storybook Deployment (Post-Release)

**File**: `.github/workflows/release.yml` (`deploy-storybook-main` job)

- Runs only when:
  - release job succeeds
  - branch is `main`
  - `dry-run` is `false`

- Steps:
  - install dependencies
  - build packages
  - build Storybook
  - deploy to GitHub Pages root

This ensures main Storybook is updated only after a successful real package release.

## Required Secrets and Permissions

### Secrets

- `NPM_TOKEN`: npm automation token with publish rights to `@orchestra-design-system`
- `GITHUB_TOKEN`: provided by GitHub Actions

### Job Permissions

- `contents: write` is required for tags/releases and `gh-pages` deployment

## Operational Notes

- Release is not automatic on push; it is manually dispatched.
- Use dry-run by default to validate release readiness before publishing.
- If npm scope access fails (`E404 Scope not found`), verify the npm org and token permissions.
- First release under `@orchestra-design-system` is expected to start at `0.0.1`.

## Local Validation

### Validate package build

```bash
npm run build
```

### Validate Storybook build

```bash
npm run build:storybook
```

### Validate release commands without publishing

```bash
npm run release:core:dry
npm run release:react:dry
npm run release:angular:dry
npm run release:vue:dry
npm run release:design-tokens:dry
npm run release:icons-library:dry
```

## References

- `.github/scripts/README.md` (release helper scripts and usage)

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [release-it Documentation](https://github.com/release-it/release-it)
- [Lerna Documentation](https://lerna.js.org/)
