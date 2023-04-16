import { DecoratorFn } from '@storybook/react'
import React from 'react'
import { Title } from '../src/orchestra/02-symbols/Titles'
import '../src/orchestra/01-instruments/reset.scss'

export const withTheme: DecoratorFn = (StoryFn) => {

      return (
        <div style={{display: 'grid', gridAutoFlow: 'column', minHeight: '200px'}}>
            <div className='dark' style={{backgroundColor: '#212228', padding: '8px'}}>
              <Title type="h3">Dark theme</Title>
              <StoryFn />
            </div>
            <div className='light' style={{backgroundColor: '#F1F1F1', padding: '8px'}}>
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
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['Overview', ['Introduction', 'Getting Started', 'Principles'], 'Instruments', 'Symbols', 'Scores', 'Masterpieces'],
    },
  },
}
