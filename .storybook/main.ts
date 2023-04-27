const path = require('path');
import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../')
    });
    return config;
  },
  docs: {
    autodocs: 'tag',
  }
}

export default config