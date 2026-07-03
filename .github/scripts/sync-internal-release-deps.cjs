const fs = require('fs')
const path = require('path')

const releaseVersion = process.argv[2]
if (!releaseVersion) {
  console.error(
    'Usage: node .github/scripts/sync-internal-release-deps.cjs <release-version>',
  )
  process.exit(1)
}

const packageFiles = [
  'packages/core/package.json',
  'packages/react/package.json',
  'packages/angular/package.json',
  'packages/vue/package.json',
  'packages/design-tokens/package.json',
  'packages/icons-library/package.json',
  'packages/storybook/package.json',
  'packages/angular/projects/component-library/package.json',
]

const publishable = new Set([
  '@orchestra-design-system/core',
  '@orchestra-design-system/react',
  '@orchestra-design-system/angular',
  '@orchestra-design-system/vue',
  '@orchestra-design-system/design-tokens',
  '@orchestra-design-system/icons-library',
])

const depSections = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
]
const expectedRange = `^${releaseVersion}`

for (const relativePath of packageFiles) {
  const absolutePath = path.join(process.cwd(), relativePath)
  const pkg = JSON.parse(fs.readFileSync(absolutePath, 'utf8'))

  for (const section of depSections) {
    const deps = pkg[section]
    if (!deps) {
      continue
    }

    for (const depName of Object.keys(deps)) {
      if (publishable.has(depName)) {
        deps[depName] = expectedRange
      }
    }
  }

  fs.writeFileSync(absolutePath, `${JSON.stringify(pkg, null, 2)}\n`)
}

console.log(`Synchronized internal dependency ranges to ${expectedRange}.`)
