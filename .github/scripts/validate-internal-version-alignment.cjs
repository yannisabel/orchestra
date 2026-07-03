const fs = require('fs')
const path = require('path')

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

const publishableNames = [
  '@orchestra-design-system/core',
  '@orchestra-design-system/react',
  '@orchestra-design-system/angular',
  '@orchestra-design-system/vue',
  '@orchestra-design-system/design-tokens',
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

const publishableVersions = packageData
  .filter(({ json }) => publishable.has(json.name))
  .map(({ json }) => ({ name: json.name, version: json.version }))

const uniqueVersions = [
  ...new Set(publishableVersions.map((item) => item.version)),
]
if (uniqueVersions.length !== 1) {
  console.error('Publishable package versions are not aligned:')
  for (const item of publishableVersions) {
    console.error(`- ${item.name}: ${item.version}`)
  }
  process.exit(1)
}

const sharedVersion = uniqueVersions[0]
const expectedRange = `^${sharedVersion}`
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

      if (deps[depName] !== expectedRange) {
        issues.push(
          `${relativePath} -> ${section}.${depName} is ${deps[depName]} (expected ${expectedRange})`,
        )
      }
    }
  }
}

if (issues.length > 0) {
  console.error('Internal dependency ranges are out of sync:')
  for (const issue of issues) {
    console.error(`- ${issue}`)
  }
  process.exit(1)
}

console.log(`Internal package versions are aligned at ${sharedVersion}.`)
console.log(`Internal dependency ranges are aligned to ${expectedRange}.`)
