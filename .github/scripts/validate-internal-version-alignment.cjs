const fs = require('fs')
const path = require('path')

const packageFiles = [
  'packages/core/package.json',
  'packages/react/package.json',
  'packages/angular/package.json',
  'packages/vue/package.json',
  'packages/themes/package.json',
  'packages/icons-library/package.json',
  'packages/storybook/package.json',
  'packages/angular/projects/component-library/package.json',
]

const publishableNames = [
  '@orchestra-design-system/core',
  '@orchestra-design-system/react',
  '@orchestra-design-system/angular',
  '@orchestra-design-system/vue',
  '@orchestra-design-system/themes',
  '@orchestra-design-system/icons-library',
]

const depSections = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
]
const publishable = new Set(publishableNames)
const packageData = packageFiles.map((relativePath) => {
  const absolutePath = path.join(process.cwd(), relativePath)
  const json = JSON.parse(fs.readFileSync(absolutePath, 'utf8'))
  return { relativePath, json }
})

const publishableVersionByName = new Map(
  packageData
    .filter(({ json }) => publishable.has(json.name))
    .map(({ json }) => [json.name, json.version]),
)

const issues = []

for (const { relativePath, json } of packageData) {
  for (const section of depSections) {
    const deps = json[section]
    if (!deps) {
      continue
    }

    for (const depName of Object.keys(deps)) {
      if (!publishable.has(depName)) {
        continue
      }

      const depVersion = publishableVersionByName.get(depName)
      if (!depVersion) {
        issues.push(
          `${relativePath} -> ${section}.${depName} points to a publishable package with no known local version`,
        )
        continue
      }

      const expectedRange = `^${depVersion}`
      if (deps[depName] !== expectedRange) {
        issues.push(
          `${relativePath} -> ${section}.${depName} is ${deps[depName]} (expected ${expectedRange})`,
        )
      }
    }
  }
}

const publishableVersions = [...publishableVersionByName.entries()]

if (issues.length > 0) {
  console.error('Publishable package versions:')
  for (const [name, version] of publishableVersions) {
    console.error(`- ${name}: ${version}`)
  }
  console.error('Internal dependency ranges are out of sync:')
  for (const issue of issues) {
    console.error(`- ${issue}`)
  }
  process.exit(1)
}

console.log('Publishable package versions (independent):')
for (const [name, version] of publishableVersions) {
  console.log(`- ${name}: ${version}`)
}
console.log(
  'Internal dependency ranges are aligned to each referenced package version.',
)
