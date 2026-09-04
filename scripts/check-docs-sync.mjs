import fs from 'node:fs'
import path from 'node:path'

const repoRoot = process.cwd()
const expectedPackages = [
  '@orchestra-design-system/core',
  '@orchestra-design-system/themes',
  '@orchestra-design-system/icons-library',
  '@orchestra-design-system/storybook',
  '@orchestra-design-system/react',
  '@orchestra-design-system/vue',
  '@orchestra-design-system/angular',
]

const docs = [
  'README.md',
  'packages/core/README.md',
  'packages/themes/README.md',
  'packages/storybook/README.md',
  'packages/react/README.md',
  'packages/vue/README.md',
  'packages/angular/README.md',
  'packages/icons-library/README.md',
  '.github/instructions/copilot-instructions.md',
  ...fs
    .readdirSync(path.join(repoRoot, '.github/skills'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join('.github/skills', entry.name, 'SKILL.md')),
]

const issues = []

for (const doc of docs) {
  const filePath = path.join(repoRoot, doc)
  if (!fs.existsSync(filePath)) {
    issues.push(`Missing source-of-truth file: ${doc}`)
  }
}

for (const pkg of expectedPackages) {
  const pkgPath = path.join(repoRoot, 'packages')
  const names = fs
    .readdirSync(pkgPath)
    .map((name) => {
      const manifestPath = path.join(pkgPath, name, 'package.json')
      if (!fs.existsSync(manifestPath)) return null
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
        return manifest.name
      } catch {
        return null
      }
    })
    .filter(Boolean)

  if (!names.includes(pkg)) {
    issues.push(`Package name missing from workspace: ${pkg}`)
  }
}

const rootPkg = JSON.parse(
  fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'),
)
const scriptNames = Object.keys(rootPkg.scripts || {})
if (!scriptNames.includes('check:docs')) {
  issues.push('Root package.json is missing the check:docs script')
}

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8')
if (
  !readme.includes('Canonical repo references') ||
  !readme.includes('check:docs')
) {
  issues.push('README.md is missing the canonical docs or checks guidance')
}

const instructions = fs.readFileSync(
  path.join(repoRoot, '.github/instructions/copilot-instructions.md'),
  'utf8',
)
if (
  !instructions.includes('source of truth') &&
  !instructions.includes('canonical source of truth')
) {
  issues.push(
    'AI instructions do not declare the repo docs as the canonical source of truth',
  )
}

if (issues.length > 0) {
  console.error('Documentation sync check failed:')
  for (const issue of issues) {
    console.error(`- ${issue}`)
  }
  process.exit(1)
}

console.log('Documentation sync check passed.')
