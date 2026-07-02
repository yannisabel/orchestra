import '@orchestra-kit/core/dist/orchestra-kit/themes/light.css'
import '@orchestra-kit/core/dist/orchestra-kit/themes/dark.css'
import './globals.css'

import type { Preview } from '@storybook/web-components-vite'

type ThemeMode = 'light' | 'dark' | 'system'

const resolveTheme = (theme: ThemeMode): 'light' | 'dark' => {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  return theme
}

const applyThemeClass = (theme: ThemeMode) => {
  const resolvedTheme = resolveTheme(theme)
  const root = document.documentElement
  root.classList.remove('orchestra-theme--light', 'orchestra-theme--dark')
  root.classList.add(
    resolvedTheme === 'dark'
      ? 'orchestra-theme--dark'
      : 'orchestra-theme--light',
  )
}

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'system',
      toolbar: {
        icon: 'circlehollow',
        dynamicTitle: true,
        items: [
          { value: 'system', title: 'System' },
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },

  initialGlobals: {
    theme: 'system',
  },

  parameters: {
    viewMode: 'docs',

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    docs: {
      toc: {
        title: (async () => {
          const headingSelector = 'h2, h3'
          const showTitle = document.querySelector(headingSelector) !== null
          return showTitle ? 'On this page' : ''
        })(),
        headingSelector: 'h2, h3',
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },

  decorators: [
    (story, context) => {
      const selectedTheme =
        context.globals.theme === 'dark' ||
        context.globals.theme === 'light' ||
        context.globals.theme === 'system'
          ? context.globals.theme
          : 'system'

      applyThemeClass(selectedTheme)
      return story()
    },
  ],
}

export default preview
