import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'
import orchestralogowhite from './img/orchestra-logo-white.svg'

const theme = create({
  base: 'dark',
  brandImage: orchestralogowhite,
  colorSecondary: '#264B68',
  appBg: '#212228',
  appContentBg: '#212228',
  appBorderColor: '#000000',
  appBorderRadius: 4,

  // Toolbar default and active colors
  barTextColor: 'hsla(0, 0%, 82%, 1)',
  barSelectedColor: 'hsla(0, 0%, 57%, 1)',
  barBg: 'hsla(0, 0%, 20%, 1)',
})

addons.setConfig({
  theme,
})
