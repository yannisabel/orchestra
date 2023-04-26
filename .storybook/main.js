const path = require('path');
module.exports = {
  "stories": ["../src/**/*.stories.tsx", "../src/**/*.stories.mdx"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },
  webpackFinal: async (config, {
    configType
  }) => {
    config.resolve.alias = {
      ...config.resolve.alias
    };
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../')
    });
    return config;
  },
  docs: {
    autodocs: true
  }
};