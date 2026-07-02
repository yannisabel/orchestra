import '@orchestra-kit/core/dist/orchestra-kit/themes/light.css'
import '@orchestra-kit/core/dist/orchestra-kit/themes/dark.css'
import './globals.css'

import type { Preview } from '@storybook/web-components-vite'
import { registerIconLibrary } from '@orchestra-kit/core'

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

// Define custom icons FIRST
const customIcons: Record<string, string> = {
  star: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg>`,
  heart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/></svg>`,
}

// Register custom icon library BEFORE importing components
registerIconLibrary('custom', {
  resolver: (name) => {
    console.log('🎨 Custom library resolver called for:', name)
    return customIcons[name] ?? ''
  },
})
console.log('✅ Custom library registered')

// Now import and auto-register components
import '@orchestra-kit/core/dist/orchestra-kit/orchestra-kit.esm.js'

// Store icons globally and register after a delay to ensure components are ready
Promise.resolve().then(() => {
  registerIconLibrary('custom', {
    resolver: (name) => customIcons[name] ?? '',
  })
})

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
