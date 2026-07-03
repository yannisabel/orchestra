---
name: npm-audit-management
applyTo: "**/package.json"
description:
  "Monorepo npm audit and dependency update workflow. Prevents common npm
  vulnerability management pitfalls in the Orchestra workspace."
---

# npm Audit Management for Orchestra Monorepo

## Quick Start

When you see npm audit vulnerabilities:

```bash
# ✅ CORRECT: Update each workspace individually
cd packages/angular && npm up --save --legacy-peer-deps
cd packages/core && npm up --save --legacy-peer-deps
cd packages/react && npm up --save --legacy-peer-deps
cd packages/storybook && npm up --save --legacy-peer-deps
cd packages/vue && npm up --save --legacy-peer-deps

# Then reinstall at root
cd /repo/root && npm install
npm audit  # Verify results
```

## Why This Matters

This monorepo uses Lerna workspaces with strong peer dependency requirements between Angular and its build tools. Direct `npm audit fix` commands fail due to conflicting peer dependencies.

**Your `.npmrc` file requires `legacy-peer-deps=true`** to work around these structural conflicts.

## ✅ What Works

1. **`.npmrc` Configuration**

   ```
   legacy-peer-deps=true
   ```

   This file is required for the monorepo to install correctly. Commit it.

2. **Update Strategy**
   - Run `npm up --save --legacy-peer-deps` in each workspace directory separately
   - This respects each package's peer dependency constraints
   - Updates propagate to root via package-lock.json

3. **Verify After Updates**
   ```bash
   npm install        # Reinstall at root
   npm audit          # Check vulnerability status
   npm run build      # Verify no build breakage
   ```

## ❌ What Doesn't Work

- ❌ **`npm audit fix`** — Fails immediately: "Could not resolve dependency" errors
- ❌ **`npm audit fix --force`** — Creates MORE vulnerabilities (45 → 91+ in practice)
  - Forces Angular version downgrades
  - Breaks peer dependency resolution
  - Results in 2x more critical vulnerabilities
  - **Never use this in this monorepo**

- ❌ **Removing `.npmrc`** — Causes immediate installation failures
  - Build tools require `legacy-peer-deps` for Angular peer dependency resolution

## Known Limitations

### Remaining High-Severity Vulnerabilities (Current Baseline)

Current audit baseline shows 2 high-severity vulnerabilities, both from dev tooling:

- **http-proxy-middleware**: Used by Angular dev server toolchain via `@angular-devkit/build-angular`

These cannot be resolved without breaking Angular's build toolchain. They are:

- **Development-only dependencies** (not in production)
- **Structural issues** in Angular's dependency tree (not fixable without upgrading Angular)
- **Industry standard**: Accepted risk in Angular monorepo development

### When to Accept These Risks

- During development: Acceptable (sandboxed environment)
- In CI/CD: Document with security team (explain dev-only nature)
- In production: Different story (production dependencies are separate)

## Monitoring Workflow

### Monthly Check

```bash
cd /repo/root
npm audit 2>&1 | grep vulnerabilities
# Expected baseline after Wave 3: ~8 vulnerabilities (3 low, 3 moderate, 2 high)
```

### When Vulnerabilities Increase

1. Check which workspace package changed: `git diff packages/*/package.json`
2. Determine if it's an indirect dependency (from dev tool)
3. If production dependency: Prioritize update
4. If dev-only dependency: Assess risk vs. stability

### Dependency Update Cadence

- **Production deps**: Update within 48 hours of security advisory
- **Dev deps**: Update within 1 week (batch updates)
- **Angular**: Major version updates every ~6 months (plan accordingly)

### Proven Reduction Steps (Current Monorepo)

- Add root `overrides` in `package.json` for:
  - `js-yaml: ^4.3.0`
  - `tar: ^7.5.16`
- Remove unused `@storybook/test-runner` from `packages/core/package.json`
- Re-run `npm install`, `npm audit`, and `npm run build`

## Reference: Package Vulnerabilities by Workspace

| Workspace | Primary Vulnerability Sources                                                    |
| --------- | -------------------------------------------------------------------------------- |
| angular   | @angular-devkit/build-angular → http-proxy-middleware, webpack-dev-server/sockjs |
| core      | Minimal (Stencil-based, fewer build tools)                                       |
| react     | Generally low/moderate transitive vulnerabilities from build toolchain           |
| storybook | Minimal after removing unused `@storybook/test-runner` from core workspace       |
| vue       | Generally low/moderate transitive vulnerabilities from build tooling             |

## Troubleshooting

### Error: "Could not resolve dependency"

```
npm error ERESOLVE could not resolve
```

**Solution**: Ensure `.npmrc` has `legacy-peer-deps=true`. This is required and already committed.

### Error: "Will install X, which is a breaking change"

```
fix available via `npm audit fix --force`
```

**Solution**: Ignore this warning. Breaking changes mean downgrading—bad in a monorepo. Use the individual workspace update strategy instead.

### Build Fails After npm Updates

```bash
npm ci --legacy-peer-deps  # Clean install
npm run build               # Retry build
```

## Key Files

- **`.npmrc`** — Enables legacy peer deps (required, committed)
- **`package.json` (root)** — Workspace configuration
- **`packages/*/package.json`** — Individual workspace dependencies
- **`package-lock.json`** — Lock file (auto-generated, commit it)

## Additional Resources

- [npm audit documentation](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Lerna monorepo guide](https://lerna.js.org/)
- [Angular dependency management](https://angular.io/guide/npm-packages)
