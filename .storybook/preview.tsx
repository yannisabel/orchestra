import { Decorator } from '@storybook/react'
import { themes } from '@storybook/theming'
import React from 'react'
import { Title } from '../src/Staves/Title'
import { Text } from '../src/Staves/Text'
import { Anchor } from '../src/Staves/Anchor'
import '../src/Notations/reset.scss'
import './storybook-styles.scss'
import { bluePalette, orangePalette } from '../src/storybook-pages/Notations/Colors/Colors'

export const withTheme: Decorator = (StoryFn) => {

      return (
        <div style={{display: 'grid', gridAutoFlow: 'column', minHeight: '200px'}}>
            <div className='dark' style={{backgroundColor: bluePalette['blue-100'], padding: '16px'}}>
              <Title type="h3">Dark theme</Title>
              <StoryFn />
            </div>
            <div className='light' style={{backgroundColor: orangePalette['orange-0'], padding: '16px'}}>
            <Title type="h3">Light theme</Title>
              <StoryFn />
            </div>
        </div>
      )
}

export const decorators = [withTheme]

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewMode: 'docs',
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
    theme: themes.dark,
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
