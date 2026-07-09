import StyleDictionary from 'style-dictionary'
import { outputReferencesFilter } from 'style-dictionary/utils'
import { rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { formats, transformTypes, transforms } from 'style-dictionary/enums'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PREFIX = 'orchestra'
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
