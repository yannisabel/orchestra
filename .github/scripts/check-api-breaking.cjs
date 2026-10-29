#!/usr/bin/env node
'use strict'

/**
 * Breaking-change guard for the core public API.
 *
 * Compares `packages/core/custom-elements.json` (the working tree) against the
 * copy at the merge-base with the base branch, then checks the commits in
 * `merge-base..HEAD` for a declaration when a breaking change is found.
 *
 * Rules:
 * - Additions are never breaking.
 * - Removals and changes are breaking, except widening a union type while
 *   keeping every previous member, and appending optional method parameters.
 * - A default value change is always breaking, including adding a default.
 * - A breaking change is declared by at least one non-merge commit in the range
 *   whose header has `!` (e.g. `feat(core)!: ...`) and which has a
 *   `BREAKING CHANGE: <explanation>` footer.
 *
 * Usage (from the repo root, after building core):
 *   npm run check:api
 *   npm run check:api -- --base-ref origin/main
 *
 * Exit codes: 0 pass (or skipped when the base has no manifest), 1 undeclared
 * breaking change, 2 invalid arguments.
 *
 * @module check-api-breaking
 */

const { execFileSync } = require('node:child_process')
const fs = require('node:fs')

const MANIFEST_PATH = 'packages/core/custom-elements.json'
const DEFAULT_BASE_REF = 'origin/main'
const NAMED_LISTS = {
  events: 'event',
  slots: 'slot',
  cssProperties: 'cssprop',
  cssParts: 'csspart',
}

/**
 * Runs a git command and returns its stdout.
 * @param {string[]} args Arguments passed to `git`.
 * @returns {string} The command's stdout.
 * @throws {Error} When git exits with a non-zero status.
 */
function git(args) {
  return execFileSync('git', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })
}

/**
 * Runs a git command, returning null instead of throwing on failure.
 * @param {string[]} args Arguments passed to `git`.
 * @returns {string | null} The command's stdout, or null if it failed.
 */
function gitOrNull(args) {
  try {
    return git(args)
  } catch {
    return null
  }
}

/**
 * Flattens a Custom Elements Manifest into comparable entries keyed by
 * `<tag>#prop:<name>`, `<tag>#method:<name>`, `<tag>#event:<name>`,
 * `<tag>#slot:<name>`, `<tag>#cssprop:<name>` and `<tag>#csspart:<name>`.
 * Private and protected members are ignored.
 * @param {object} manifest Parsed `custom-elements.json`.
 * @returns {Map<string, {kind: 'prop' | 'method' | 'value', value: object}>}
 */
function describeSurface(manifest) {
  const surface = new Map()
  const set = (key, kind, value) => surface.set(key, { kind, value })

  for (const mod of manifest.modules ?? []) {
    for (const decl of mod.declarations ?? []) {
      if (!decl.tagName) continue
      const tag = decl.tagName

      for (const member of decl.members ?? []) {
        if (member.privacy === 'private' || member.privacy === 'protected')
          continue
        if (member.kind === 'field') {
          set(`${tag}#prop:${member.name}`, 'prop', {
            attribute: member.attribute ?? null,
            type: member.type?.text ?? null,
            readonly: Boolean(member.readonly),
            default: member.default ?? null,
          })
        }
        if (member.kind === 'method') {
          set(`${tag}#method:${member.name}`, 'method', {
            static: Boolean(member.static),
            params: (member.parameters ?? []).map((p) => ({
              type: p.type?.text ?? null,
              optional: Boolean(p.optional),
            })),
            returns: member.return?.type?.text ?? null,
          })
        }
      }

      for (const [list, label] of Object.entries(NAMED_LISTS)) {
        for (const item of decl[list] ?? []) {
          set(`${tag}#${label}:${item.name}`, 'value', {
            type: item.type?.text ?? null,
            default: item.default ?? null,
          })
        }
      }
    }
  }
  return surface
}

/**
 * Splits a union type text such as `'a' | 'b'` into trimmed members.
 * @param {string | null} text Type text from the manifest.
 * @returns {string[] | null} The members, or null when there is no type.
 */
function unionMembers(text) {
  return text === null ? null : text.split('|').map((t) => t.trim())
}

/**
 * Whether `to` is a union widening of `from`: every member of `from` is kept.
 * Widening is non-breaking for consumers.
 * @param {string | null} from Previous type text.
 * @param {string | null} to Current type text.
 * @returns {boolean}
 */
function isWidening(from, to) {
  const before = unionMembers(from)
  const after = unionMembers(to)
  return (
    before !== null && after !== null && before.every((m) => after.includes(m))
  )
}

/**
 * Records breaking changes to the type or default of an entry.
 * @param {string} key Surface key of the entry.
 * @param {{type: string | null, default: string | null}} from Previous entry.
 * @param {{type: string | null, default: string | null}} to Current entry.
 * @param {{key: string, reason: string}[]} breaking Accumulator, mutated.
 */
function compareValue(key, from, to, breaking) {
  if (from.type !== to.type && !isWidening(from.type, to.type)) {
    breaking.push({ key, reason: `type ${from.type} -> ${to.type}` })
  }
  if (from.default !== to.default) {
    breaking.push({ key, reason: `default ${from.default} -> ${to.default}` })
  }
}

/**
 * Records breaking changes to a property: type, default, attribute, or
 * becoming readonly. Dropping readonly is not breaking.
 * @param {string} key Surface key of the property.
 * @param {object} from Previous property entry.
 * @param {object} to Current property entry.
 * @param {{key: string, reason: string}[]} breaking Accumulator, mutated.
 */
function compareProp(key, from, to, breaking) {
  compareValue(key, from, to, breaking)
  if (from.attribute !== to.attribute) {
    breaking.push({
      key,
      reason: `attribute ${from.attribute} -> ${to.attribute}`,
    })
  }
  if (to.readonly && !from.readonly) {
    breaking.push({ key, reason: 'became readonly' })
  }
}

/**
 * Records breaking changes to a method. Appending optional parameters is
 * non-breaking; existing parameters may only be widened in type, and may not
 * become required.
 * @param {string} key Surface key of the method.
 * @param {object} from Previous method entry.
 * @param {object} to Current method entry.
 * @param {{key: string, reason: string}[]} breaking Accumulator, mutated.
 */
function compareMethod(key, from, to, breaking) {
  if (from.static !== to.static || from.returns !== to.returns) {
    breaking.push({ key, reason: `signature ${from.returns} -> ${to.returns}` })
  }
  const existingKept = from.params.every((p, i) => {
    const next = to.params[i]
    return (
      next !== undefined &&
      (next.type === p.type || isWidening(p.type, next.type)) &&
      (next.optional || !p.optional)
    )
  })
  const addedOptional = to.params
    .slice(from.params.length)
    .every((p) => p.optional)
  if (!existingKept || !addedOptional) {
    breaking.push({ key, reason: 'parameters changed' })
  }
}

/**
 * Compares two surfaces. Removed entries and changed entries are breaking;
 * new keys are additions.
 * @param {Map<string, {kind: string, value: object}>} base Surface at the merge-base.
 * @param {Map<string, {kind: string, value: object}>} head Surface of the working tree.
 * @returns {{breaking: {key: string, reason: string}[], additions: string[]}}
 */
function compareSurfaces(base, head) {
  const breaking = []
  const additions = []

  for (const [key, from] of base) {
    if (!head.has(key)) {
      breaking.push({ key, reason: 'removed' })
      continue
    }
    const to = head.get(key)
    if (from.kind === 'prop') compareProp(key, from.value, to.value, breaking)
    else if (from.kind === 'method')
      compareMethod(key, from.value, to.value, breaking)
    else compareValue(key, from.value, to.value, breaking)
  }
  for (const key of head.keys()) {
    if (!base.has(key)) additions.push(key)
  }
  return { breaking, additions }
}

/**
 * Reads the Conventional Commits breaking-change markers from a commit message.
 * @param {string} message Full commit message.
 * @returns {{bang: boolean, explanation: string | null}} Whether the header has
 *   `!` before the colon, and the text of the `BREAKING CHANGE:` footer if any.
 */
function parseBreakingDeclaration(message) {
  const header = message.split('\n')[0]
  const bang = /^[a-z]+(\([^)]*\))?!: \S/.test(header)
  const footer = message.match(/^BREAKING[ -]CHANGE: (\S.*)$/m)
  return { bang, explanation: footer ? footer[1].trim() : null }
}

/**
 * Whether a commit declares a breaking change. Both `!` and the footer are
 * required in the same commit.
 * @param {string} message Full commit message.
 * @returns {boolean}
 */
function isDeclared(message) {
  const { bang, explanation } = parseBreakingDeclaration(message)
  return bang && explanation !== null
}

/**
 * Decides the outcome. Undeclared breaking changes fail. A declaration with no
 * detected break only warns.
 * @param {{breaking: {key: string, reason: string}[]}} result Output of compareSurfaces.
 * @param {string[]} commitMessages Messages of the non-merge commits in merge-base..HEAD.
 * @returns {{ok: boolean, messages: string[]}}
 */
function evaluate({ breaking }, commitMessages) {
  const declared = commitMessages.some(isDeclared)

  if (breaking.length === 0) {
    const partial = commitMessages.some((m) => {
      const { bang, explanation } = parseBreakingDeclaration(m)
      return bang || explanation !== null
    })
    return {
      ok: true,
      messages: partial
        ? ['A commit declares a breaking change but no API break was detected.']
        : [],
    }
  }

  if (declared) return { ok: true, messages: [] }

  return {
    ok: false,
    messages: [
      "Breaking API change detected but no commit in this branch declares it. Add a commit whose header has '!' after the type (e.g. 'feat(core)!: ...') and a 'BREAKING CHANGE: <explanation>' footer.",
    ],
  }
}

/**
 * Turns a surface key into a readable label, e.g. `orchestra-button prop:size`.
 * @param {string} key Surface key.
 * @returns {string}
 */
function format(key) {
  return key.replace('#', ' ')
}

/**
 * CLI entry point. Prints the comparison and returns the exit code.
 * @param {string[]} argv Arguments after the script name.
 * @returns {number} 0 when passing or skipped, 1 on an undeclared break, 2 on bad arguments.
 */
function main(argv) {
  const flagIndex = argv.indexOf('--base-ref')
  const baseRef = flagIndex === -1 ? DEFAULT_BASE_REF : argv[flagIndex + 1]
  if (!baseRef || baseRef.startsWith('--')) {
    console.error(
      'Usage: node check-api-breaking.cjs [--base-ref <git-ref>] (default: origin/main)',
    )
    return 2
  }

  const mergeBase = git(['merge-base', baseRef, 'HEAD']).trim()
  const baseText = gitOrNull(['show', `${mergeBase}:${MANIFEST_PATH}`])
  if (baseText === null) {
    console.log(
      `No ${MANIFEST_PATH} on the base branch yet; skipping API compatibility check.`,
    )
    return 0
  }

  const head = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
  const base = JSON.parse(baseText)
  const result = compareSurfaces(describeSurface(base), describeSurface(head))
  const commitMessages = git([
    'log',
    '--no-merges',
    '--format=%B%x00',
    `${mergeBase}..HEAD`,
  ])
    .split('\0')
    .map((m) => m.trim())
    .filter(Boolean)
  const verdict = evaluate(result, commitMessages)

  if (result.breaking.length > 0) {
    console.log('Breaking API changes:')
    for (const change of result.breaking) {
      console.log(`  - ${format(change.key)}: ${change.reason}`)
    }
  }
  if (result.additions.length > 0) {
    console.log(
      `Non-breaking additions: ${result.additions.map(format).join(', ')}`,
    )
  }
  if (result.breaking.length === 0 && result.additions.length === 0) {
    console.log('No API changes detected.')
  }
  for (const message of verdict.messages)
    console.log(verdict.ok ? `Warning: ${message}` : `Error: ${message}`)

  return verdict.ok ? 0 : 1
}

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2))
}

module.exports = {
  describeSurface,
  compareSurfaces,
  parseBreakingDeclaration,
  evaluate,
}
