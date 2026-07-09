import type { StorybookConfig } from '@storybook/web-components-vite'

import { join, dirname } from 'path'

// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const { BASE_PATH } = process.env

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/stories/components/**/*.mdx',
    '../src/stories/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-coverage'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/web-components-vite'),
    options: {},
  },
  previewHead: (head) => `${head}`,
  previewBody: (body) => `${body}`,
  staticDirs: [
    '../public',
    {
      from: '../../core/dist/orchestra-design-system',
      to: '/orchestra-design-system',
    },
  ],
  async viteFinal(config) {
    config.base = BASE_PATH || config.base

    const { mergeConfig } = await import('vite')
    const { liveReload } = await import('vite-plugin-live-reload')

    return mergeConfig(config, {
      plugins: [
        liveReload([
          'www/build/orchestra-design-system.esm.js',
          'www/build/orchestra-design-system.js',
        ]),
      ],
      resolve: {
        alias: {
          '@testing-library/dom': '@testing-library/dom',
          'shadow-dom-testing-library': 'shadow-dom-testing-library',
        },
      },
      build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
          output: {
            manualChunks: {
              lit: ['lit'],
              react: ['react'],
              'react-dom': ['react-dom'],
              'react/jsx-runtime': ['react/jsx-runtime'],
            },
          },
        },
      },
    })
  },
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
  },
}

export default config
