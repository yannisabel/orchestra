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

## Notes

- Scripts are intended to be run from repository root.
- The workflow remains the source of truth for execution order and branch/release conditions.
