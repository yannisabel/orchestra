import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const CORE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const COMPONENTS_ROOT = resolve(CORE_ROOT, 'src/components')
const DEFAULT_REPORT_PATH = resolve(CORE_ROOT, 'design-tokens-check-report.md')

const COLOR_PROPERTIES = new Set([
  'background',
  'background-color',
  'border',
  'border-bottom',
  'border-bottom-color',
  'border-color',
  'border-left',
  'border-left-color',
  'border-right',
  'border-right-color',
  'border-top',
  'border-top-color',
  'box-shadow',
  'caret-color',
  'color',
  'column-rule-color',
  'fill',
  'outline',
  'outline-color',
  'stroke',
  'text-decoration-color',
  'text-shadow',
])

const COLOR_FUNCTION_PATTERN =
  /\b(?:color|hsl|hsla|hwb|lab|lch|oklab|oklch|rgb|rgba)\([^)]*\)/gi
const HEX_COLOR_PATTERN = /#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{4}|[\da-f]{3})\b/gi
const DIMENSION_PATTERN =
  /(-?(?:\d+(?:\.\d*)?|\.\d+))(px|rem|em|vw|vh|vmin|vmax|ch|ex|cm|mm|in|pt|pc|%)\b/gi
const COLOR_KEYWORDS = new Set(
  `aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond
  blue blueviolet brown burlywood cadetblue chartreuse chocolate coral
  cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray
  darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid
  darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey
  darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue
  firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod
  gray green greenyellow grey honeydew hotpink indianred indigo ivory khaki
  lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan
  lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon
  lightseagreen lightskyblue lightslategray lightslategrey lightsteelblue
  lightyellow lime limegreen linen magenta maroon mediumaquamarine mediumblue
  mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen
  mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin
  navajowhite navy oldlace olive olivedrab orange orangered orchid palegoldenrod
  palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum
  powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon
  sandybrown seagreen seashell sienna silver skyblue slateblue slategray
  slategrey snow springgreen steelblue tan teal thistle tomato turquoise violet
  wheat white whitesmoke yellow yellowgreen transparent`.split(/\s+/),
)

const NON_LITERAL_COLOR_KEYWORDS = new Set(
  `currentcolor inherit initial revert revert-layer unset windowtext
  canvas canvastext linktext visitedtext activetext buttonface buttontext
  field fieldtext highlight highlighttext mark marktext graytext`.split(/\s+/),
)

const TOKENIZABLE_DIMENSION_PROPERTIES = new Set([
  'border',
  'border-block',
  'border-block-end',
  'border-block-start',
  'border-bottom',
  'border-inline',
  'border-inline-end',
  'border-inline-start',
  'border-left',
  'border-radius',
  'border-right',
  'border-top',
  'border-width',
  'border-block-width',
  'border-block-end-width',
  'border-block-start-width',
  'border-bottom-width',
  'border-inline-width',
  'border-inline-end-width',
  'border-inline-start-width',
  'border-left-width',
  'border-right-width',
  'border-top-width',
  'bottom',
  'box-shadow',
  'column-gap',
  'font-size',
  'gap',
  'height',
  'inset',
  'inset-block',
  'inset-block-end',
  'inset-block-start',
  'inset-inline',
  'inset-inline-end',
  'inset-inline-start',
  'left',
  'letter-spacing',
  'margin',
  'margin-block',
  'margin-block-end',
  'margin-block-start',
  'margin-bottom',
  'margin-inline',
  'margin-inline-end',
  'margin-inline-start',
  'margin-left',
  'margin-right',
  'margin-top',
  'max-height',
  'max-width',
  'min-height',
  'min-width',
  'outline',
  'outline-offset',
  'outline-width',
  'padding',
  'padding-block',
  'padding-block-end',
  'padding-block-start',
  'padding-bottom',
  'padding-inline',
  'padding-inline-end',
  'padding-inline-start',
  'padding-left',
  'padding-right',
  'padding-top',
  'right',
  'row-gap',
  'text-indent',
  'top',
  'width',
  'word-spacing',
])

const dimensionCategory = (property) => {
  if (property.includes('radius')) return 'radius'
  if (
    property.startsWith('padding') ||
    property.startsWith('margin') ||
    property.startsWith('inset') ||
    ['gap', 'column-gap', 'row-gap', 'top', 'right', 'bottom', 'left'].includes(
      property,
    )
  ) {
    return 'spacing'
  }
  if (property.includes('font') || property.includes('letter-spacing')) {
    return 'typography'
  }
  if (property.startsWith('border') || property.startsWith('outline')) {
    return 'border or outline'
  }
  if (property === 'box-shadow') return 'shadow'
  return 'size'
}

const stripComments = (source) =>
  source.replace(/\/\*[\s\S]*?\*\//g, (comment) =>
    comment.replace(/[^\r\n]/g, ' '),
  )

const maskVarFunctions = (value) => {
  const masked = [...value]
  const varPattern = /\bvar\s*\(/gi
  let match

  while ((match = varPattern.exec(value))) {
    const openIndex = value.indexOf('(', match.index)
    let depth = 0
    let quote = ''
    let escaped = false

    for (let index = openIndex; index < value.length; index++) {
      const char = value[index]
      if (escaped) {
        escaped = false
        continue
      }
      if (char === '\\') {
        escaped = true
        continue
      }
      if (quote) {
        if (char === quote) quote = ''
        continue
      }
      if (char === '"' || char === "'") {
        quote = char
        continue
      }
      if (char === '(') depth += 1
      if (char === ')') depth -= 1
      if (depth === 0) {
        for (
          let maskedIndex = match.index;
          maskedIndex <= index;
          maskedIndex++
        ) {
          if (masked[maskedIndex] !== '\n' && masked[maskedIndex] !== '\r') {
            masked[maskedIndex] = ' '
          }
        }
        varPattern.lastIndex = index + 1
        break
      }
    }
  }

  return masked.join('')
}

const findColorLiterals = (value) => {
  const literals = new Set()
  const masked = maskVarFunctions(value)

  for (const match of masked.matchAll(HEX_COLOR_PATTERN)) {
    literals.add(match[0])
  }
  for (const match of masked.matchAll(COLOR_FUNCTION_PATTERN)) {
    literals.add(match[0])
  }

  for (const match of masked.matchAll(/[a-z]+/gi)) {
    const keyword = match[0].toLowerCase()
    if (
      COLOR_KEYWORDS.has(keyword) &&
      !NON_LITERAL_COLOR_KEYWORDS.has(keyword)
    ) {
      literals.add(match[0])
    }
  }

  return [...literals]
}

const findDimensionLiterals = (value) => {
  const literals = new Set()
  const masked = maskVarFunctions(value)

  for (const match of masked.matchAll(DIMENSION_PATTERN)) {
    if (Number(match[1]) === 0 || match[2] === '%') continue
    literals.add(match[0])
  }

  return [...literals]
}

const readDeclarations = (source) => {
  const declarations = []
  let segmentStart = 0
  let parentheses = 0
  let quote = ''
  let escaped = false

  const collect = (end) => {
    const segment = source.slice(segmentStart, end)
    const match = segment.match(/^\s*([-\w]+)\s*:\s*([\s\S]*?)\s*$/)
    if (!match) return

    const property = match[1]
    if (!property.startsWith('--') && !/^[a-z]/i.test(property)) return

    const leadingWhitespace = segment.match(/^\s*/)?.[0].length ?? 0
    declarations.push({
      property,
      value: match[2].trim(),
      index: segmentStart + leadingWhitespace,
    })
  }

  for (let index = 0; index < source.length; index++) {
    const char = source[index]
    if (escaped) {
      escaped = false
      continue
    }
    if (char === '\\') {
      escaped = true
      continue
    }
    if (quote) {
      if (char === quote) quote = ''
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      continue
    }
    if (char === '(') {
      parentheses += 1
      continue
    }
    if (char === ')') {
      parentheses = Math.max(0, parentheses - 1)
      continue
    }
    if (parentheses > 0) continue

    if (char === ';' || char === '}') collect(index)
    if (char === ';' || char === '{' || char === '}') {
      segmentStart = index + 1
    }
  }

  collect(source.length)
  return declarations
}

export const findRawDesignValues = (source, file) => {
  const cleanSource = stripComments(source)
  const findings = []

  for (const declaration of readDeclarations(cleanSource)) {
    const property = declaration.property.toLowerCase()
    const value = declaration.value
    const line = cleanSource.slice(0, declaration.index).split('\n').length

    if (COLOR_PROPERTIES.has(property)) {
      for (const rawValue of findColorLiterals(value)) {
        findings.push({ file, line, property, rawValue, category: 'color' })
      }
    }

    if (
      property.startsWith('--') ||
      TOKENIZABLE_DIMENSION_PROPERTIES.has(property)
    ) {
      for (const rawValue of findDimensionLiterals(value)) {
        findings.push({
          file,
          line,
          property,
          rawValue,
          category: dimensionCategory(property),
        })
      }
    }
  }

  return findings
}

const findCssFiles = (directory) => {
  const files = []
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name)
    if (entry.isDirectory()) files.push(...findCssFiles(path))
    else if (entry.isFile() && entry.name.endsWith('.css')) files.push(path)
  }
  return files.toSorted()
}

const escapeMarkdownCell = (value) =>
  String(value).replaceAll('|', '\\|').replaceAll('\n', '<br>')

export const renderReport = (findings, fileCount) => {
  const summary = findings.length
    ? `Found ${findings.length} potential raw design value${findings.length === 1 ? '' : 's'} in ${fileCount} component stylesheet${fileCount === 1 ? '' : 's'}.`
    : `No potential raw design values found in ${fileCount} component stylesheet${fileCount === 1 ? '' : 's'}.`

  const rows = findings.length
    ? findings
        .map(
          ({ file, line, property, rawValue, category }) =>
            `| ${escapeMarkdownCell(file)} | ${line} | \`${escapeMarkdownCell(property)}\` | \`${escapeMarkdownCell(rawValue)}\` | ${category} | Replace with an appropriate design token when one exists; otherwise assess whether a token is needed. |`,
        )
        .join('\n')
    : '| - | - | - | - | - | No issues found. |'

  return `# Design tokens check report

${summary}

Values inside CSS \`var()\` fallbacks, unitless values, percentages, zero dimensions, and transition durations are not reported.

| File | Line | Property | Raw value | Category | Recommendation |
| --- | ---: | --- | --- | --- | --- |
${rows}
`
}

const showHelp = () => {
  console.log(
    `Usage: npm run check:design-tokens [-- --output <path>]

Scans CSS files under src/components for raw colors and design dimensions,
then writes a Markdown report. Exits with status 1 when findings are present.

Options:
  --output <path>  Report path (default: design-tokens-check-report.md)
  --help           Show this help`,
  )
}

const parseArgs = (args) => {
  let outputPath = DEFAULT_REPORT_PATH
  for (let index = 0; index < args.length; index++) {
    if (args[index] === '--help') return { help: true }
    if (args[index] === '--output') {
      const value = args[index + 1]
      if (!value || value.startsWith('--')) {
        throw new Error('Expected a path after --output.')
      }
      outputPath = resolve(process.cwd(), value)
      index += 1
      continue
    }
    throw new Error(`Unknown option: ${args[index]}`)
  }
  return { help: false, outputPath }
}

export const runCheck = ({ outputPath = DEFAULT_REPORT_PATH } = {}) => {
  const files = findCssFiles(COMPONENTS_ROOT)
  const findings = files.flatMap((path) =>
    findRawDesignValues(
      readFileSync(path, 'utf8'),
      relative(CORE_ROOT, path).split('\\').join('/'),
    ),
  )

  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, renderReport(findings, files.length))
  console.log(
    `${findings.length} potential raw design value${findings.length === 1 ? '' : 's'} found in ${files.length} stylesheet${files.length === 1 ? '' : 's'}.`,
  )
  console.log(`Report written to ${relative(process.cwd(), outputPath)}`)
  return findings.length
}

const main = () => {
  const options = parseArgs(process.argv.slice(2))
  if (options.help) {
    showHelp()
    return
  }
  if (!readdirSync(COMPONENTS_ROOT).length) {
    throw new Error(`No component source files found at ${COMPONENTS_ROOT}`)
  }

  const findingCount = runCheck(options)
  if (findingCount > 0) process.exitCode = 1
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main()
}
