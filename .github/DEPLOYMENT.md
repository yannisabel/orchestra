# GitHub Deployment Strategy

Orchestra uses a dual-workflow CI/CD strategy to manage releases and documentation separately.

## Overview

- **NPM Releases** - Automated package publishing to npm (main branch only)
- **Storybook Deployment** - Automated documentation to GitHub Pages (all branches except main)

This strategy allows:

- Release-ready packages published only from main branch
- Pre-production documentation on feature branches
- Per-branch Storybook URLs for design reviews and testing

## Release Workflow (NPM Packages)

**File**: `.github/workflows/release.yml`

### Trigger

```yaml
on:
  push:
    branches:
      - main
      - master
```

Only runs when pushing to `main` or `master` branches.

### Steps

1. **Checkout** - Clone repository
2. **Setup Node.js** - Install Node.js runtime
3. **Install dependencies** - `npm ci`
4. **Build packages** - `npm run build`
5. **Run release-it** - Bump versions, create git tags, publish to npm
6. **Create GitHub Release** - Auto-generated release notes

### Output

- **npm packages** - Published to @orchestra-design-system/* namespace
  - `@orchestra-design-system/core`
  - `@orchestra-design-system/design-tokens`
  - `@orchestra-design-system/icons-library`
  - etc.
- **Git tags** - Semantic versioning tags (v1.0.0, v1.1.0, etc.)
- **GitHub Release** - Release notes on GitHub Releases page

### Manual Release

```bash
# On main branch
git push origin main
# Workflow runs automatically
```

## Storybook Deployment Workflow

**File**: `.github/workflows/storybook-deploy.yml`

### Trigger

```yaml
on:
  push:
    branches:
      - '**' # All branches
      - '!main' # Except main
```

Runs on all branch pushes except `main`.

### Steps

1. **Checkout** - Clone repository
2. **Setup Node.js** - Install Node.js runtime
3. **Install dependencies** - `npm ci`
4. **Build all packages** - `npm run build`
5. **Build Storybook** - `npm run build:storybook`
6. **Deploy to GitHub Pages** - Upload to gh-pages branch with branch-specific path

### Output

- **GitHub Pages URL** - `https://{username}.github.io/{repo}/{branch}/`
- **Storybook static site** - HTML, CSS, JS, assets
- **gh-pages branch** - Contains all deployed Storybook versions

### Access Deployed Storybooks

After pushing to any branch except main:

```bash
git push origin feature-branch
# Wait ~2-3 minutes for workflow to complete

# View at:
# https://yannisabel.github.io/orchestra/feature-branch/
```

**Example URLs:**

- `https://yannisabel.github.io/orchestra/stencil-migration/` - stencil-migration branch
- `https://yannisabel.github.io/orchestra/feature/new-component/` - feature/new-component branch
- `https://yannisabel.github.io/orchestra/docs-update/` - docs-update branch

## Workflow Configuration

### release.yml

```yaml
name: Release
on:
  push:
    branches: [main, master]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npx release-it --ci
```

### storybook-deploy.yml

```yaml
name: Deploy Storybook
on:
  push:
    branches:
      - '**'
      - '!main'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run build:storybook
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: packages/storybook/storybook-static
          destination_dir: ${{ github.ref_name }}
```

## GitHub Pages Configuration

**Settings** → **Pages**

- **Source**: Deploy from branch
- **Branch**: `gh-pages` / `/(root)`
- **Custom domain** (optional)

### Branch-Specific Paths

Storybook deploys each branch to a subdirectory:

```
gh-pages branch structure:
├── stencil-migration/     # Branch: stencil-migration
│   ├── index.html
│   ├── assets/
│   └── ...
├── feature-new-component/ # Branch: feature/new-component
│   ├── index.html
│   ├── assets/
│   └── ...
└── docs-update/          # Branch: docs-update
    ├── index.html
    ├── assets/
    └── ...
```

Each branch gets its own isolated Storybook instance at `/{branch}/`.

## Local Testing Before Deployment

### Simulate Release Workflow

```bash
# Build all packages
npm run build

# Verify build output
ls packages/*/dist

# Check what would be published
npm run version --dry-run  # Or use release-it --dry-run
```

### Simulate Storybook Deployment

```bash
# Build Storybook
npm run build:storybook

# Test build output
ls packages/storybook/storybook-static/
cd packages/storybook/storybook-static
python3 -m http.server 8000
# Visit http://localhost:8000
```

## Troubleshooting

### Storybook Not Deploying

1. **Check workflow status** - Go to GitHub Actions tab
2. **View logs** - Click failed job → see error output
3. **Common issues**:
   - Node cache miss → Clear cache in Actions settings
   - Build errors → Run `npm run build` locally to reproduce
   - Branch filter → Ensure branch is not `main`

### Release Not Publishing

1. **Check release-it configuration** - `.releaserc.json` or `lerna.json`
2. **Verify npm token** - GitHub Actions needs `GITHUB_TOKEN` and npm credentials
3. **Check semver** - Ensure version bump is valid (major.minor.patch)

### GitHub Pages Not Showing

1. **Enable Pages** - Settings → Pages → Enable if needed
2. **Check branch** - Verify `gh-pages` branch exists
3. **Check CNAME** - If custom domain, verify DNS records
4. **Clear cache** - Force refresh or clear browser cache

## Security

### GitHub Secrets

Workflows use `${{ secrets.GITHUB_TOKEN }}` which is automatically provided by GitHub Actions. No additional credentials needed.

### Automatic Deployments

Both workflows are fully automated and require no manual intervention:

- No npm login needed
- No deployment keys needed
- Uses GitHub's trusted deployment system

## Monitoring

### GitHub Actions Dashboard

View workflow runs: **Actions** tab → Click workflow → See runs

Each run shows:

- Status (success, failed, cancelled)
- Duration
- Logs for each step
- Artifacts (if configured)

### Notifications

Workflow failures notify:

- Repository watchers
- Workflow file contributors
- GitHub commit status checks

## Customization

### Change Deployment Branch

In `storybook-deploy.yml`:

```yaml
push:
  branches:
    - develop # Deploy from develop branch
    - '!main'
    - '!staging'
```

### Change Build Command

```yaml
- run: npm run build:storybook -- --output-dir dist
```

### Add Custom Domain

In GitHub Pages settings:

- Enter custom domain (e.g., `storybook.example.com`)
- Update DNS records
- Add CNAME file to gh-pages branch

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Release-it Documentation](https://github.com/release-it/release-it)
- [Lerna Documentation](https://lerna.js.org/)
