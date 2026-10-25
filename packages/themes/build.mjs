import StyleDictionary from 'style-dictionary'
import { outputReferencesFilter } from 'style-dictionary/utils'
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { formats, transformTypes, transforms } from 'style-dictionary/enums'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PREFIX = 'orchestra'
const PAGE_TITLE = 'Orchestra design tokens monitoring'
const TEMPLATE_PATH = resolve(
  __dirname,
  'monitoring/template/design-tokens-monitoring.template.html',
)
const { sizePxToRem } = transforms

StyleDictionary.registerTransform({
  ...StyleDictionary.hooks.transforms[sizePxToRem],
  name: sizePxToRem,
  type: transformTypes.value,
  transitive: true,
  filter: (token, options) => {
    const value = options.usesDtcg ? token.$value : token.value
    return (
      typeof value === 'string' &&
      value.trim().endsWith('px') &&
      !token.disablePxToRem
    )
  },
})

StyleDictionary.registerTransform({
  name: 'name/kebab-no-alias-no-component',
  type: transformTypes.name,
  transform: (token) => {
    const path = token.path.filter(
      (part) => part !== 'alias' && part !== 'component',
    )
    return [PREFIX, ...path].join('-')
  },
})

StyleDictionary.registerTransformGroup({
  name: 'themes/css-extended',
  transforms: [
    ...StyleDictionary.hooks.transformGroups.css,
    sizePxToRem,
    'name/kebab-no-alias-no-component',
  ],
})

const themes = [
  {
    name: 'light',
    selector: `:root, :host, .${PREFIX}-theme--light`,
    input: [
      './tokens/primitive.json',
      './tokens/semantic.light.json',
      './tokens/component.light.json',
    ],
  },
  {
    name: 'dark',
    selector: `:host, .${PREFIX}-theme--dark`,
    input: [
      './tokens/primitive.json',
      './tokens/semantic.dark.json',
      './tokens/component.dark.json',
    ],
  },
]

rmSync(resolve(__dirname, 'dist'), { recursive: true, force: true })

for (const theme of themes) {
  const sd = new StyleDictionary({
    source: theme.input.map((file) => resolve(__dirname, file)),
    platforms: {
      css: {
        transformGroup: 'themes/css-extended',
        buildPath: resolve(__dirname, 'dist/css/'),
        files: [
          {
            destination: `${theme.name}.css`,
            format: formats.cssVariables,
            filter: (token) => !token.filePath.includes('primitive'),
            options: {
              selector: `${theme.selector} { color-scheme: ${theme.name}; }\n\n${theme.selector}`,
              outputReferences: outputReferencesFilter,
            },
          },
        ],
      },
    },
  })

  await sd.buildAllPlatforms()
}

// Design tokens monitor: classifies every token name against the naming convention of
// its level and writes a static HTML report to monitoring/.

// `root` columns match the first word of a token name.
// `words` columns match any later word, `pattern` columns match a regex.
// Words that match no column are listed in the "Not applicable" column.
const SEMANTIC_COMPONENT_COLUMNS = [
  {
    key: 'domain',
    label: 'Domain',
    words: ['global', 'neutral', 'action', 'selection', 'edition'],
  },
  {
    key: 'variant',
    label: 'Variant',
    words: [
      'primary',
      'secondary',
      'tertiary',
      'brand',
      'inline',
      'common',
      'toggle',
    ],
  },
  {
    key: 'target',
    label: 'Target',
    words: [
      'container',
      'content',
      'border',
      'size',
      'inner-ring',
      'outer-ring',
    ],
  },
  {
    key: 'property',
    label: 'Property',
    words: [
      'radius',
      'border-width',
      'padding',
      'padding-inline-start',
      'padding-inline-end',
      'padding-block-start',
      'padding-block-end',
      'gap',
      'width',
      'height',
      'color',
    ],
  },
  {
    key: 'state',
    label: 'State',
    words: [
      'default',
      'hover',
      'active',
      'focus',
      'disabled',
      'readonly',
      'highlight',
      'on',
      'off',
      'small',
      'medium',
      'large',
    ],
  },
]

const SEMANTIC_COLUMNS = [
  {
    key: 'category',
    label: 'Category',
    root: ['color', 'spacing', 'radius', 'size'],
  },
  ...SEMANTIC_COMPONENT_COLUMNS,
]

const COMPONENT_COLUMNS = [
  { key: 'component', label: 'Component', root: ['button', 'checkbox'] },
  ...SEMANTIC_COMPONENT_COLUMNS,
]

const PRIMITIVE_COLUMNS = [
  { key: 'category', label: 'Category', root: ['color', 'scale'] },
  {
    key: 'family',
    label: 'Family',
    words: ['purple', 'grey', 'green', 'yellow', 'red', 'blue'],
  },
  {
    key: 'step',
    label: 'Step',
    pattern: /^(\d+|x\d+(-\d+)?|none|full|transparent)$/,
  },
]

const matchesWord = (column, word) =>
  Boolean(column.words?.includes(word) || column.pattern?.test(word))

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ],
  )

// Drops the alias and component wrapper segments from a token path.
const toTokenParts = (path) =>
  path.filter((part) => part !== 'alias' && part !== 'component')

const toCssName = (parts) => `--${[PREFIX, ...parts].join('-')}`

// Each level has its own naming columns and source files.
const NAMING_LEVELS = [
  {
    title: 'Primitive',
    columns: PRIMITIVE_COLUMNS,
    sources: ['./tokens/primitive.json'],
    inCss: false,
    toName: (parts) => parts.join('.'),
  },
  {
    title: 'Semantic',
    columns: SEMANTIC_COLUMNS,
    sources: ['./tokens/semantic.light.json', './tokens/semantic.dark.json'],
    inCss: true,
    toName: toCssName,
  },
  {
    title: 'Component',
    columns: COMPONENT_COLUMNS,
    sources: ['./tokens/component.light.json', './tokens/component.dark.json'],
    inCss: true,
    toName: toCssName,
  },
]

// Returns a Map of dotted token path to { parts, value, references } (alias and component removed).
const readTokens = (files) => {
  const tokens = new Map()
  const walk = (node, path) => {
    if (!node || typeof node !== 'object') return
    if ('$value' in node) {
      const parts = toTokenParts(path)
      const key = parts.join('.')
      const token = tokens.get(key) ?? {
        parts,
        value: node.$value,
        references: new Set(),
      }
      token.value = node.$value
      const reference = String(node.$value).match(/^\{(.+)\}$/)
      if (reference) token.references.add(reference[1])
      tokens.set(key, token)
      return
    }
    for (const [key, child] of Object.entries(node)) {
      if (!key.startsWith('$')) walk(child, [...path, key])
    }
  }
  for (const file of files) {
    walk(JSON.parse(readFileSync(resolve(__dirname, file), 'utf8')), [])
  }
  return tokens
}

// Returns a Map of dotted token path to the CSS variable names of tokens that alias it.
const readTokenUsers = () => {
  const users = new Map()
  const walk = (node, path) => {
    if (!node || typeof node !== 'object') return
    if ('$value' in node) {
      const reference = String(node.$value).match(/^\{(.+)\}$/)
      if (!reference) return
      const target = reference[1]
      if (!users.has(target)) users.set(target, new Set())
      users.get(target).add(toCssName(toTokenParts(path)))
      return
    }
    for (const [key, child] of Object.entries(node)) {
      if (!key.startsWith('$')) walk(child, [...path, key])
    }
  }
  for (const file of NAMING_LEVELS.flatMap((level) => level.sources)) {
    walk(JSON.parse(readFileSync(resolve(__dirname, file), 'utf8')), [])
  }
  return users
}

// Returns a Map of CSS variable name to value from a generated theme file.
const readCssValues = (file) => {
  const values = new Map()
  for (const [, name, value] of readFileSync(file, 'utf8').matchAll(
    /^\s*(--[\w-]+):\s*(.+?);\s*$/gm,
  )) {
    values.set(name, value)
  }
  return values
}

const COMPONENTS_DIR = resolve(__dirname, '../core/src/components')

// Returns a Map of CSS variable name to the component folders that reference it.
const readComponentUsage = () => {
  const usage = new Map()
  for (const component of readdirSync(COMPONENTS_DIR, {
    withFileTypes: true,
  })) {
    if (!component.isDirectory()) continue
    const dir = resolve(COMPONENTS_DIR, component.name)
    for (const file of readdirSync(dir)) {
      if (!/\.(css|ts|tsx)$/.test(file)) continue
      const source = readFileSync(resolve(dir, file), 'utf8')
      for (const [, name] of source.matchAll(/var\((--[\w-]+)/g)) {
        if (!usage.has(name)) usage.set(name, new Set())
        usage.get(name).add(component.name)
      }
    }
  }
  return usage
}

const classifyName = (path, columns) => {
  const cells = Object.fromEntries(columns.map((column) => [column.key, []]))
  const notApplicable = []
  const [root, ...rest] = path

  const rootColumn = columns.find((column) => column.root?.includes(root))
  if (rootColumn) cells[rootColumn.key].push(root)
  else notApplicable.push({ word: root, root: true })

  for (const word of rest) {
    const column = columns.find((item) => matchesWord(item, word))
    if (column) cells[column.key].push(word)
    else notApplicable.push({ word, root: false })
  }

  return { cells, notApplicable }
}

const allowedWords = (columns) =>
  columns.flatMap((column) => [
    ...(column.root ?? []).map((value) => ({
      value,
      label: column.label,
      root: true,
    })),
    ...(column.words ?? []).map((value) => ({
      value,
      label: column.label,
      root: false,
    })),
  ])

const editDistance = (a, b) => {
  let row = Array.from({ length: b.length + 1 }, (_, j) => j)
  for (let i = 1; i <= a.length; i++) {
    const next = [i]
    for (let j = 1; j <= b.length; j++) {
      next[j] = Math.min(
        row[j] + 1,
        next[j - 1] + 1,
        row[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
    row = next
  }
  return row[b.length]
}

const adviceFor = (word, root, columns) => {
  const allowed = allowedWords(columns)
  if (root) {
    const owner = allowed.find((item) => item.value === word)
    return owner
      ? `Move it after the category or component. It is a ${owner.label} word.`
      : 'Start the name with a valid root for this token level, or add this root to the corresponding naming columns.'
  }

  const parts = word.split('-')
  const known = parts.filter((part) =>
    allowed.some((item) => !item.root && item.value === part),
  )
  if (parts.length > 1 && known.length) {
    return `Split into separate segments. Allowed parts: ${known.join(', ')}.`
  }

  const closest = allowed
    .filter((item) => !item.root)
    .map((item) => ({ ...item, distance: editDistance(word, item.value) }))
    .toSorted((a, b) => a.distance - b.distance)[0]
  if (closest && closest.distance <= 1 && word.length >= 4) {
    return `Did you mean ${closest.value} (${closest.label})? Rename the segment if so.`
  }

  return 'Rename it to an allowed word, or add it to the corresponding naming columns if the convention should allow it.'
}

const SAME_LAYER_ADVICE =
  'Avoid cannibalism, a design token should always never consume a design token from the same layer.'
const THEME_PAIR_ADVICE =
  'A design token value in one theme should have its pair in other themes.'

const renderAdvice = (rows, columns) => {
  const entries = new Map()
  const addEntry = (key, entry) => {
    const existing = entries.get(key) ?? { ...entry, count: 0 }
    existing.count += 1
    entries.set(key, existing)
  }
  for (const row of rows) {
    for (const { word, root } of row.notApplicable) {
      addEntry(`word:${root}:${word}`, {
        type: 'Not applicable word',
        issue: word,
        position: root ? 'Root' : 'Later segment',
        advice: adviceFor(word, root, columns),
      })
    }
    for (const target of row.sameLayer) {
      addEntry(`same-layer:${target}`, {
        type: 'Same-layer token',
        issue: target,
        position: '-',
        advice: SAME_LAYER_ADVICE,
      })
    }
    for (const theme of row.missingThemes) {
      addEntry(`theme-pair:${theme}`, {
        type: 'Missing theme pair',
        issue: `Missing ${theme} value`,
        position: 'Theme',
        advice: THEME_PAIR_ADVICE,
      })
    }
  }
  if (!entries.size) return ''

  const items = [...entries.values()].toSorted(
    (a, b) =>
      b.count - a.count ||
      a.type.localeCompare(b.type) ||
      a.issue.localeCompare(b.issue),
  )
  const lines = items
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.type)}</td><td><code>${escapeHtml(item.issue)}</code></td><td>${escapeHtml(item.position)}</td><td>${item.count}</td><td>${escapeHtml(item.advice)}</td></tr>`,
    )
    .join('\n')

  return `<h3>Advice for issues</h3>
<div class="table-wrap">
<table>
<thead>
<tr><th scope="col">Type</th><th scope="col">Issue</th><th scope="col">Position</th><th scope="col">Tokens</th><th scope="col">Advice</th></tr>
</thead>
<tbody>
${lines}
</tbody>
</table>
</div>`
}

const renderValue = (value) => {
  if (value === undefined) return '<span class="missing">Not defined</span>'
  const escaped = escapeHtml(value)
  const swatch = /^(#|rgb|hsl)/i.test(value)
    ? `<span class="swatch" style="background:${escaped}"></span>`
    : ''
  return `${swatch}<code>${escaped}</code>`
}

const issueCount = (row) =>
  row.notApplicable.length + row.sameLayer.length + row.missingThemes.length

const renderSection = ({ level, rows }) => {
  const isPrimitive = !level.inCss
  const issueTotal = rows.reduce((sum, row) => sum + issueCount(row), 0)

  const headers = level.columns
    .map((column) => `<th scope="col">${escapeHtml(column.label)}</th>`)
    .join('')
  const usedHeaders = '<th scope="col">Used by</th>'
  const valueHeaders = isPrimitive
    ? '<th scope="col">Value</th>'
    : '<th scope="col">Light Theme</th><th scope="col">Dark Theme</th>'

  const body = rows
    .map((row) => {
      const cells = level.columns
        .map(
          (column) =>
            `<td>${escapeHtml(row.cells[column.key].join(', '))}</td>`,
        )
        .join('')
      const issueClass = issueCount(row) ? ' class="issue"' : ''
      const issueText = escapeHtml(
        row.notApplicable.map((item) => item.word).join(', '),
      )
      const sameLayerNote = row.sameLayer.length
        ? `<small>Same-layer token: ${escapeHtml(row.sameLayer.join(', '))}. ${escapeHtml(SAME_LAYER_ADVICE)}</small>`
        : ''
      const missingThemeNote = row.missingThemes
        .map(
          (theme) =>
            `<small>Missing ${escapeHtml(theme)} theme value. ${escapeHtml(THEME_PAIR_ADVICE)}</small>`,
        )
        .join('')
      const usedBy = row.usedBy.length
        ? `<ul>${row.usedBy.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
        : 'Not used'
      const valueCells = isPrimitive
        ? `<td>${renderValue(row.value)}</td>`
        : `<td>${renderValue(row.light)}</td><td>${renderValue(row.dark)}</td>`
      return `<tr><td><code>${escapeHtml(row.name)}</code></td>${cells}<td${issueClass}>${issueText}${sameLayerNote}${missingThemeNote}</td><td>${usedBy}</td>${valueCells}</tr>`
    })
    .join('\n')

  return `<section>
<h2>${escapeHtml(level.title)} tokens</h2>
<p class="meta">${rows.length} tokens, ${issueTotal} issues.</p>
${renderAdvice(rows, level.columns)}
<div class="table-wrap">
<table>
<thead>
<tr><th scope="col">Token</th>${headers}<th scope="col">Issues</th>${usedHeaders}${valueHeaders}</tr>
</thead>
<tbody>
${body}
</tbody>
</table>
</div>
</section>`
}

const renderNamingMonitor = (sections) => {
  const tokenTotal = sections.reduce((sum, { rows }) => sum + rows.length, 0)
  const issueTotal = sections.reduce(
    (sum, { rows }) =>
      sum + rows.reduce((count, row) => count + issueCount(row), 0),
    0,
  )
  const template = readFileSync(TEMPLATE_PATH, 'utf8')
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const values = {
      PAGE_TITLE,
      GENERATED_AT: escapeHtml(new Date().toISOString()),
      TOTAL_TOKENS: tokenTotal,
      TOTAL_ISSUES: issueTotal,
      SECTIONS: sections.map(renderSection).join('\n'),
    }
    if (!(key in values))
      throw new Error(`Unknown template placeholder: ${key}`)
    return String(values[key])
  })
}

const writeNamingMonitor = () => {
  const light = readCssValues(resolve(__dirname, 'dist/css/light.css'))
  const dark = readCssValues(resolve(__dirname, 'dist/css/dark.css'))
  const components = readComponentUsage()
  const users = readTokenUsers()
  const sections = NAMING_LEVELS.map((level) => {
    const tokens = readTokens(level.sources)
    const rows = [...tokens]
      .map(([path, { parts, value, references }]) => {
        const cssName = toCssName(parts)
        const missingThemes = level.inCss
          ? ['light', 'dark'].filter(
              (theme) => !(theme === 'light' ? light : dark).has(cssName),
            )
          : []
        const consumers = level.inCss
          ? [...(components.get(cssName) ?? [])].map(
              (name) => `component: ${name}`,
            )
          : []
        return {
          name: level.toName(parts),
          ...classifyName(parts, level.columns),
          usedBy: [...(users.get(path) ?? []), ...consumers].toSorted(),
          sameLayer: [...references]
            .filter((target) => tokens.has(target))
            .map((target) => level.toName(target.split('.')))
            .toSorted(),
          light: light.get(cssName),
          dark: dark.get(cssName),
          missingThemes,
          value,
        }
      })
      .toSorted((a, b) => a.name.localeCompare(b.name))
    return { level, rows }
  })

  const monitoringDir = resolve(__dirname, 'monitoring')
  mkdirSync(monitoringDir, { recursive: true })
  writeFileSync(
    resolve(monitoringDir, 'design-tokens-monitoring.html'),
    renderNamingMonitor(sections),
  )
}

writeNamingMonitor()
