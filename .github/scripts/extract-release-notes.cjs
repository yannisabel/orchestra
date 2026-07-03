#!/usr/bin/env node

const fs = require('fs')

function usage() {
  console.error(
    'Usage: node .github/scripts/extract-release-notes.cjs <changelog-file> <version> <output-file>',
  )
  process.exit(1)
}

const [, , changelogFile, version, outputFile] = process.argv
if (!changelogFile || !version || !outputFile) {
  usage()
}

if (!fs.existsSync(changelogFile)) {
  fs.writeFileSync(outputFile, '', 'utf8')
  process.exit(0)
}

const content = fs.readFileSync(changelogFile, 'utf8')
const lines = content.split(/\r?\n/)

function extractSectionByPredicate(predicate) {
  let start = -1
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].startsWith('## ') && predicate(lines[i])) {
      start = i
      break
    }
  }

  if (start === -1) {
    return ''
  }

  let end = lines.length
  for (let i = start + 1; i < lines.length; i += 1) {
    if (lines[i].startsWith('## ')) {
      end = i
      break
    }
  }

  return `${lines.slice(start, end).join('\n')}\n`
}

let section = extractSectionByPredicate((heading) => heading.includes(version))
if (!section.trim()) {
  section = extractSectionByPredicate(() => true)
}

fs.writeFileSync(outputFile, section, 'utf8')
