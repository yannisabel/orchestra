import { withThemeByClassName } from '@storybook/addon-themes'
import React from 'react'
import { Title } from '../src/Staves/Title'
import { Text } from '../src/Staves/Text'
import { Anchor } from '../src/Staves/Anchor'
import '../src/Notations/reset.scss'
import './storybook-styles.scss'

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light-theme',
      dark: 'dark-theme',
    },
    defaultTheme: 'dark',
  })
]

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['Overview', ['Introduction', 'Principles', 'Getting Started'], 'Notations', ['Introduction', 'Colors', 'Fonts', 'Grid'], 'Staves'],
    },
  },
  docs: {
    components: {
      h1: ({children}) => <Title type="h1">{children}</Title>,
      h2: ({children}) => <Title type="h2">{children}</Title>,
      h3: ({children}) => <Title type="h3">{children}</Title>,
      h4: ({children}) => <Title type="h4">{children}</Title>,
      h5: ({children}) => <Title type="h5">{children}</Title>,
      h6: ({children}) => <Title type="h6">{children}</Title>,
      p: ({children, ...props}) => <Text {...props}>{children}</Text>,
      b: ({children, ...props}) => <Text {...props} as="b" fontWeight="fw-bold">{children}</Text>,
      strong: ({children, ...props}) => <Text {...props} as="strong" fontWeight="fw-bold">{children}</Text>,
      a: ({children, title, href}) => <Anchor href={href} title={title}>{children}</Anchor>,
    },
  },
}
export const tags = ['autodocs', 'autodocs'];
