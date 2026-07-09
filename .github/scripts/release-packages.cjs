#!/usr/bin/env node

const { spawnSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')

const packages = ['core', 'react', 'angular', 'vue', 'themes', 'icons-library']
const internalReleaseManifests = [
  'packages/core/package.json',
  'packages/react/package.json',
  'packages/angular/package.json',
  'packages/vue/package.json',
  'packages/themes/package.json',
  'packages/icons-library/package.json',
  'packages/storybook/package.json',
  'packages/angular/projects/component-library/package.json',
]
const firstReleaseScopeNote =
  'This is the first release under the @orchestra-design-system scope. Previous packages were published under the legacy orchestra-kit scope.'

function runCommand(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    stdio: options.capture ? 'pipe' : 'inherit',
    env: options.env || process.env,
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
      releaseVersion,
      '--ci',
    ])
  }
}

function commitSyncedInternalDeps(releaseVersion) {
  const diffResult = runCommand(
    'git',
    ['diff', '--quiet', '--', ...internalReleaseManifests],
    { allowFailure: true },
  )

  if (diffResult.status === 0) {
    return
  }
  if (diffResult.status !== 1) {
    process.exit(diffResult.status || 1)
  }

  runCommand('git', ['add', ...internalReleaseManifests])
  runCommand('git', [
    'commit',
    '-m',
    `chore(release): sync internal deps to ^${releaseVersion}`,
  ])
}

function runRealReleases(releaseVersion) {
  runCommand('node', [
    '.github/scripts/sync-internal-release-deps.cjs',
    releaseVersion,
  ])
  commitSyncedInternalDeps(releaseVersion)

  // Delay lockfile regeneration until package versions are bumped by release-it.
  // Running npm install here can resolve freshly bumped internal ranges against
  // the registry before local workspace versions match, causing ETARGET.
  for (const pkg of packages) {
    runCommand(
      'npm',
      ['run', `release:${pkg}`, '--', releaseVersion, '--no-github'],
      {
        env: {
          ...process.env,
          npm_config_package_lock: 'false',
        },
      },
    )
  }

  const lockfileResult = runCommand('npm', ['install', '--package-lock-only'], {
    capture: true,
    allowFailure: true,
  })

  if (lockfileResult.status !== 0) {
    const output = `${lockfileResult.stdout || ''}\n${lockfileResult.stderr || ''}`
    const isInternalTargetMiss =
      /npm error code ETARGET/i.test(output) &&
      /@orchestra-design-system\//i.test(output)

    if (isInternalTargetMiss) {
      console.warn(
        'Skipping lockfile sync: npm registry has not indexed a freshly published internal version yet.',
      )
      return
    }

    process.stdout.write(lockfileResult.stdout || '')
    process.stderr.write(lockfileResult.stderr || '')
    process.exit(lockfileResult.status || 1)
  }

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

  console.log(`Checking GitHub release for ${tag}...`)

  const releaseExists = runCommand('gh', ['release', 'view', tag], {
    capture: true,
    allowFailure: true,
  })
  if (releaseExists.status === 0) {
    console.log(`GitHub release already exists for ${tag}; skipping creation.`)
    return
  }

  console.log(`Creating GitHub release for ${tag}...`)

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

  console.log(`GitHub release created for ${tag}.`)
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
  console.log(
    `GitHub release checks completed for ${packages.length} packages at version ${releaseVersion}.`,
  )
}

main()
