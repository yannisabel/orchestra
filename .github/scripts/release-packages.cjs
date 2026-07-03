#!/usr/bin/env node

const { spawnSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')

const packages = [
  'core',
  'react',
  'angular',
  'vue',
  'design-tokens',
  'icons-library',
]
const firstReleaseScopeNote =
  'This is the first release under the @orchestra-design-system scope. Previous packages were published under @orchestra-kit.'

function runCommand(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    stdio: options.capture ? 'pipe' : 'inherit',
    env: process.env,
  })

  if (result.error) {
    throw result.error
  }

  if (!options.allowFailure && result.status !== 0) {
    if (options.capture) {
      process.stdout.write(result.stdout || '')
      process.stderr.write(result.stderr || '')
    }
    process.exit(result.status || 1)
  }

  return result
}

function getFirstTag(pkg, index) {
  const result = runCommand(
    'git',
    ['tag', '--list', `@orchestra-design-system/${pkg}@*`, '--sort=-v:refname'],
    { capture: true },
  )

  const tags = (result.stdout || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  return tags[index] || ''
}

function computeReleaseVersion() {
  console.log('Computing shared release version from core dry-run...')
  const result = runCommand('npm', ['run', 'release:core:dry', '--', '--ci'], {
    capture: true,
    allowFailure: true,
  })

  process.stdout.write(result.stdout || '')
  process.stderr.write(result.stderr || '')

  if (result.status !== 0) {
    console.error('Failed to compute shared release version from core dry-run.')
    process.exit(result.status || 1)
  }

  const output = `${result.stdout || ''}\n${result.stderr || ''}`
  const match = output.match(
    /\(([0-9]+\.[0-9]+\.[0-9]+([-.][0-9A-Za-z.]+)?)\.\.\.([0-9]+\.[0-9]+\.[0-9]+([-.][0-9A-Za-z.]+)?)\)/,
  )

  if (!match || !match[3]) {
    console.error(
      'Could not parse shared release version from core dry-run output.',
    )
    process.exit(1)
  }

  const releaseVersion = match[3]
  console.log(`Shared release version: ${releaseVersion}`)
  return releaseVersion
}

function runDryReleaseForRemainingPackages(releaseVersion) {
  for (const pkg of packages.slice(1)) {
    runCommand('npm', [
      'run',
      `release:${pkg}:dry`,
      '--',
      '--ci',
      '--release-version',
      releaseVersion,
    ])
  }
}

function runRealReleases(releaseVersion) {
  runCommand('node', [
    '.github/scripts/sync-internal-release-deps.cjs',
    releaseVersion,
  ])

  runCommand('npm', ['install', '--package-lock-only'])
  for (const pkg of packages) {
    runCommand('npm', [
      'run',
      `release:${pkg}`,
      '--',
      '--no-github',
      '--release-version',
      releaseVersion,
    ])
  }

  runCommand('npm', ['install', '--package-lock-only'])

  const diffResult = runCommand(
    'git',
    ['diff', '--quiet', '--', 'package-lock.json'],
    { allowFailure: true },
  )
  if (diffResult.status === 1) {
    runCommand('git', ['add', 'package-lock.json'])
    runCommand('git', ['commit', '-m', 'chore(release): sync lockfile'])
    runCommand('git', ['push', 'origin', 'HEAD:main'])
  } else if (diffResult.status !== 0) {
    process.exit(diffResult.status || 1)
  }
}

function createGithubReleaseForPackage(pkg) {
  const tag = getFirstTag(pkg, 0)
  const previousTag = getFirstTag(pkg, 1)

  if (!tag) {
    console.error(`Failed to resolve package tag for ${pkg}.`)
    process.exit(1)
  }

  const releaseExists = runCommand('gh', ['release', 'view', tag], {
    allowFailure: true,
  })
  if (releaseExists.status === 0) {
    return
  }

  const version = tag.split('@').pop()
  const changelogFile = `packages/${pkg}/CHANGELOG.md`
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'orchestra-release-'))
  const notesFile = path.join(tempDir, 'notes.md')
  const combinedNotesFile = path.join(tempDir, 'notes-combined.md')

  runCommand('node', [
    '.github/scripts/extract-release-notes.cjs',
    changelogFile,
    version,
    notesFile,
  ])

  const notes = fs.existsSync(notesFile)
    ? fs.readFileSync(notesFile, 'utf8').trim()
    : ''

  try {
    if (notes) {
      if (version === '0.0.1') {
        fs.writeFileSync(
          combinedNotesFile,
          `${firstReleaseScopeNote}\n\n${notes}\n`,
          'utf8',
        )
        runCommand('gh', [
          'release',
          'create',
          tag,
          '--notes-file',
          combinedNotesFile,
        ])
      } else {
        runCommand('gh', ['release', 'create', tag, '--notes-file', notesFile])
      }
    } else if (version === '0.0.1') {
      runCommand('gh', [
        'release',
        'create',
        tag,
        '--generate-notes',
        '--notes',
        firstReleaseScopeNote,
      ])
    } else if (previousTag) {
      runCommand('gh', [
        'release',
        'create',
        tag,
        '--generate-notes',
        '--notes-start-tag',
        previousTag,
      ])
    } else {
      runCommand('gh', ['release', 'create', tag, '--generate-notes'])
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true })
  }
}

function main() {
  const releaseVersion = computeReleaseVersion()

  if ((process.env.DRY_RUN || 'true') === 'true') {
    runDryReleaseForRemainingPackages(releaseVersion)
    return
  }

  runRealReleases(releaseVersion)
  for (const pkg of packages) {
    createGithubReleaseForPackage(pkg)
  }
}

main()
