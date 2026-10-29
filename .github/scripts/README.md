# Release Scripts

This folder contains the release helper scripts used by `.github/workflows/release.yml`.

## Scripts

### `release-packages.cjs`

Main release orchestrator for publishable packages.

- Computes one shared release version from `core` dry-run output.
- In dry-run mode, runs package dry-runs with that shared version.
- In real mode, syncs internal dependency ranges, publishes packages, syncs lockfile, and creates GitHub releases.

Environment variables:

- `DRY_RUN`: `true` or `false` (defaults to `true` if unset)
- `GITHUB_TOKEN`: required for GitHub release operations
- `NODE_AUTH_TOKEN`: required for npm authentication in release commands

### `extract-release-notes.cjs`

Extracts release notes for one package version from a package `CHANGELOG.md`.

Usage:

```bash
node .github/scripts/extract-release-notes.cjs <changelog-file> <version> <output-file>
```

Behavior:

- Tries to extract the changelog section matching the requested version.
- Falls back to the first changelog section if exact version heading is not found.
- Writes an empty output file when changelog file does not exist.

### `sync-internal-release-deps.cjs`

Synchronizes internal monorepo dependency ranges to `^<releaseVersion>` across workspace package manifests.

Usage:

```bash
node .github/scripts/sync-internal-release-deps.cjs <release-version>
```

### `validate-internal-version-alignment.cjs`

Pre-release guard that verifies:

- publishable package versions are aligned
- internal dependency ranges point to the expected shared version range

Usage:

```bash
node .github/scripts/validate-internal-version-alignment.cjs
```

### `check-api-breaking.cjs`

Breaking-change guard for the core public API, run by the `api-compatibility` job in `.github/workflows/workflow.yml`.

- Compares `packages/core/custom-elements.json` against the merge-base with the base branch.
- Removed or changed entries (props, attributes, types, defaults, methods, events, slots, CSS properties and parts) are breaking. Additions are not.
- Union types may be widened without a break when every previous member is kept and the default is unchanged. Any default change is breaking.
- Methods: appending optional parameters is non-breaking. Changing a return type, making a parameter required, or changing its type (other than widening) is breaking.
- If a breaking change is detected, at least one commit in `merge-base..HEAD` (merges excluded) must declare it: `!` after the type in the header and a `BREAKING CHANGE: <explanation>` footer. The commit does not need to be the last one.
- A declared breaking change with no detected break only produces a warning.

Usage (from the repo root, after `npm run build`):

```bash
npm run check:api
npm run check:api -- --base-ref origin/main
```

`--base-ref` defaults to `origin/main`. The `api-compatibility` CI job runs the same npm script with the PR base branch.

## Notes

- Scripts are intended to be run from repository root.
- The workflow remains the source of truth for execution order and branch/release conditions.
