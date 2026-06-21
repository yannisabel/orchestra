import "@orchestra-kit/core/dist/orchestra-kit/themes/light.css"
import "@orchestra-kit/core/dist/orchestra-kit/themes/dark.css"
import "./globals.css"

import type { Preview } from "@storybook/web-components-vite"

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
