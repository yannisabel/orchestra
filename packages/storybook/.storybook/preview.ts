import "@orchestra-kit/core/dist/orchestra-kit/themes/light.css"
import "@orchestra-kit/core/dist/orchestra-kit/themes/dark.css"
import "./globals.css"

import type { Preview } from "@storybook/web-components-vite"
import { registerIconLibrary } from "@orchestra-kit/core"

// Register custom icon library BEFORE importing components
registerIconLibrary('custom', {
  resolver: (name) => {
    const customIcons: Record<string, string> = {
      'star': `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
      'heart': `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
    }
    return customIcons[name] ?? ''
  }
})

// Import and auto-register components
import "@orchestra-kit/core/dist/orchestra-kit/orchestra-kit.esm.js"

const preview: Preview = {
  parameters: {
    darkMode: {
      classTarget: "html",
      stylePreview: true,
      darkClass: "orchestra-theme--dark",
      lightClass: "orchestra-theme--light",
    },

    viewMode: "docs",

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    docs: {
      toc: {
        title: (async () => {
          const headingSelector = "h2, h3"
          const showTitle = document.querySelector(headingSelector) !== null
          return showTitle ? "On this page" : ""
        })(),
        headingSelector: "h2, h3",
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
}

export default preview

