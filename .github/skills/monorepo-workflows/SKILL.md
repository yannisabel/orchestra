---
name: monorepo-workflows
description: "Work with Orchestra's Lerna monorepo structure. Use when managing workspaces, understanding package relationships, running workspace-scoped commands, or organizing new packages. Covers Lerna configuration, workspace setup, cross-package dependencies, and common workflows."
argument-hint: "Describe your workflow (e.g., 'add new package', 'link dependencies', 'run workspace command')"
user-invocable: true
---

# Monorepo Workflows

## Overview

Orchestra is an npm workspace monorepo with Lerna-compatible release tooling at the root. The packages are organized around a single source of truth in the Stencil core package, with wrapper packages for React, Vue, and Angular plus a Storybook/testing package and token/icon packages.

**Key principle**: Single source of truth (core) → shared configuration → framework-specific wrappers and consumer packages.

## Monorepo Structure

### Directory Layout

```
orchestra/
├── .github/
│   ├── instructions/          # Repo instructions and coding guidance
│   ├── skills/                # LLM skills (this directory)
│   └── workflows/            # CI/CD pipelines
├── packages/
│   ├── angular/              # Angular wrapper package
│   ├── core/                 # Stencil web components (source of truth)
│   ├── icons-library/        # Icon package generated from SVG assets
│   ├── react/                # React wrapper package
│   ├── storybook/            # Storybook + Vitest/test setup
│   ├── themes/               # Token generation and theme output
│   └── vue/                  # Vue wrapper package
├── package.json              # Root workspace config and scripts
├── lerna.json                # Lerna config for release tooling
├── tsconfig.json             # Shared TypeScript config
├── eslint.config.mjs        # Shared ESLint config
├── README.md
└── HANDOFF.md
```

### Package Purposes

| Package           | Purpose                                       | Dependencies                |
| ----------------- | --------------------------------------------- | --------------------------- |
| **core**          | Stencil components and web component runtime  | icons-library               |
| **react**         | React proxy components and typed wrappers     | core                        |
| **vue**           | Vue proxy components                          | core                        |
| **angular**       | Angular proxy components                      | core                        |
| **storybook**     | Documentation, stories, and interactive tests | core, themes, icons-library |
| **themes**        | Design token generation and CSS output        | none                        |
| **icons-library** | Generated icon exports from SVG files         | none                        |

### Dependency Graph

```
icons-library
    ↓
core (depends on icons-library)
    ↓
├→ react (depends on core)
├→ vue (depends on core)
├→ angular (depends on core)
└→ storybook (depends on core + themes + icons-library)

themes (independent; builds the CSS entry points consumed by storybook)
```

## Workspace Configuration

### `lerna.json`

```json
{
  "$schema": "node_modules/lerna/schemas/lerna-schema.json",
  "version": "0.0.0"
}
```

This repo still uses Lerna-style release tooling in the root, but the active package orchestration is driven primarily by npm workspaces and per-package scripts.

### Root `package.json` Workspaces

Workspaces are declared via `"workspaces": ["packages/*"]`. For the actual
script commands (`dev`, `build`, `build:design-tokens`, `test`, `lint`), see
[README.md](../../../README.md#L64-L76) or `AGENTS.md` - don't duplicate that
list here; this section is about workspace _wiring_, not the command
reference.

## Canonical docs and validation

The repo depends on a small set of source-of-truth files:

- [README.md](../../../README.md) - repo overview and package map
- [packages/core/README.md](../../../packages/core/README.md) - Stencil implementation and runtime
- [packages/themes/README.md](../../../packages/themes/README.md) - tokens and theme output
- [packages/storybook/README.md](../../../packages/storybook/README.md) - stories and testing coverage
- [AGENTS.md](../../../AGENTS.md) - repo-wide AI operating rules
- [.github/skills](../) - task-specific workflow guidance

Before merging documentation or toolchain changes, run:

```bash
npm run check:docs
```

This keeps the root docs, package docs, and AI guidance aligned with the real monorepo layout.

## Cross-file change check

After changing any file (source, script, token, story, package.json, or doc), search the repo for mentions of that file before finishing:

```bash
grep -rn "<file-name-or-path>" --include="*.md" --include="*.mdx" --include="*.json" --include="*.ts" --include="*.mjs" . --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=storybook-static
```

- Check skills, instructions, AGENTS.md, README files, and CHANGELOGs that mention the file, its path, or its script or export name
- Update each stale mention in the same change
- Run `npm run check:docs` after any doc or AI guidance update

## Workspace Commands

### Running Commands in All Packages

```bash
# Run script in all workspaces
npm run test --workspaces

# Equivalent to:
npm --workspace=@orchestra-design-system/core run test
npm --workspace=@orchestra-design-system/react run test
npm --workspace=@orchestra-design-system/vue run test
# ... etc
```

### Running Commands in Specific Package

```bash
# Run in specific workspace
npm run build --workspace=@orchestra-design-system/core

# Run in multiple specific packages
npm run build --workspace=@orchestra-design-system/core --workspace=@orchestra-design-system/react
```

### Lerna-Specific Commands

```bash
# Run command in all packages
lerna run build

# Run in topological order (respects dependencies)
lerna run build --stream

# Run in specific package
lerna run build --scope=@orchestra-design-system/core

# Run in changed packages since last commit
lerna run build --since origin/main
```

## Common Workflows

### 1. Build All Packages

```bash
# Build design tokens first, then all packages
npm run build

# This runs:
# 1. npm run build:design-tokens
# 2. lerna run build (all packages in dependency order)
```

### 2. Develop Locally

```bash
# Start Storybook + Stencil in watch mode
npm run dev

# This starts:
# 1. Storybook dev server (port 6006)
# 2. Stencil dev server with hot reload
```

### 3. Run Tests

```bash
# Run tests in all packages
npm run test

# Run tests in specific package
npm run test --workspace=@orchestra-design-system/core

# Run with coverage
npm run test:coverage
```

### 4. Add New Dependency to a Package

```bash
# Install in specific workspace
npm install --workspace=@orchestra-design-system/react axios

# Install dev dependency
npm install --workspace=@orchestra-design-system/storybook --save-dev vitest
```

### 5. Link Local Packages

Local linking happens automatically with npm workspaces—no need for `npm link`:

```typescript
// In packages/react/package.json
{
  "dependencies": {
    "@orchestra-design-system/core": "^0.0.13" // Resolves to packages/core/
  }
}
```

### 6. Create New Package

```bash
# Create new directory
mkdir packages/[new-package]
cd packages/[new-package]

# Create package.json
npm init -y

# Update name to workspace convention
# "name": "@orchestra-design-system/[new-package]"

# Workspaces pick up packages/* automatically; refresh links
npm install
```

## Package Configuration Files

### Shared Root Configs

All packages inherit from root and can override:

```
Root:
├── tsconfig.json (shared TypeScript)
├── eslint.config.mjs (shared ESLint)
└── prettier.config.js (shared Prettier)

Each package can have:
├── tsconfig.json (extends root)
├── package.json (workspace-specific scripts)
└── .eslintrc (overrides if needed)
```

### Example: Package-Specific Override

```json
// packages/core/package.json (scripts excerpt)
{
  "name": "@orchestra-design-system/core",
  "scripts": {
    "build": "npm run build:js",
    "build:js": "stencil build --docs",
    "start": "npm run start:js",
    "start:js": "stencil build --docs --watch",
    "test": "stencil-test",
    "test:spec": "stencil-test --project spec",
    "test:e2e": "stencil-test --project browser"
  }
}
```

## Dependency Management

### Adding Dependencies Between Packages

**Design Tokens** (no dependencies):

```json
{ "name": "@orchestra-design-system/themes", "dependencies": {} }
```

**Core** (depends on Icons Library):

```json
{
  "name": "@orchestra-design-system/core",
  "dependencies": {
    "@orchestra-design-system/icons-library": "^0.1.0"
  }
}
```

**React** (depends on Core):

```json
{
  "name": "@orchestra-design-system/react",
  "dependencies": {
    "@orchestra-design-system/core": "^0.0.1",
    "react": "^19.0.0"
  }
}
```

### Peer Dependencies

Frameworks specify peer dependencies (not required for user):

```json
{
  "name": "@orchestra-design-system/react",
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "dependencies": {
    "@orchestra-design-system/core": "^0.0.1"
  }
}
```

## Version Management

### Release Workflow

```bash
# Build dependency-aware packages
npm run build

# Then release a package from its directory
cd packages/core && release-it
cd packages/react && release-it
```

### Current Version

Package versions are set individually in each `package.json` (not a single repo-wide version). Check the current `version` field before assuming a number; cross-package ranges such as `^0.1.0` for `@orchestra-design-system/core` show the expected pairing.

## Clean & Maintenance

### Clear Build Artifacts

There is no root `clean` script. To remove Lerna-managed build output, use Lerna directly (Lerna v9 is a root devDependency):

```bash
npx lerna clean --yes

# Reinstall if node_modules is also removed
npm install
```

### Check Package Graph

```bash
# Visualize dependencies
lerna list --graph

# Check for circular dependencies
lerna list --all
```

## Monorepo Best Practices

### ✅ Do's

- ✅ Keep root config minimal
- ✅ Use workspace-scoped commands: `npm run build --workspace=@orchestra-design-system/core`
- ✅ Respect dependency graph (don't create circular dependencies)
- ✅ Run `lerna run build --stream` for topological order
- ✅ Use consistent versioning across packages
- ✅ Document each package's purpose in its README.md
- ✅ Test packages independently and together

### ❌ Don'ts

- ❌ Copy code between packages (extract to shared package)
- ❌ Create circular dependencies (A → B → A)
- ❌ Manually manage versions (use Lerna)
- ❌ Install packages directly without workspace flag
- ❌ Push generated files (dist/) to git

## Efficiency Tips

When working with LLMs on monorepo tasks:

- Specify which package(s) you're working on: "In @orchestra-design-system/react..."
- Ask for workspace-scoped commands instead of manual steps
- Reference [stencil-components](../stencil-components/SKILL.md) for core structure
- Reference [framework-wrappers](../framework-wrappers/SKILL.md) for wrapper specifics
- Use [token-optimization](../token-optimization/SKILL.md) to explore package.json files efficiently
- Store discovered patterns in `/memories/repo/`

## References

- [token-optimization](../token-optimization/SKILL.md) — Efficient exploration
- [framework-wrappers](../framework-wrappers/SKILL.md) — Framework package structure
- [stencil-components](../stencil-components/SKILL.md) — Core package structure
- [Lerna Documentation](https://lerna.js.org/)
- [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
