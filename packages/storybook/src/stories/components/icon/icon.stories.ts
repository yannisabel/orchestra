import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { iconNames } from '@orchestra-design-system/icons-library'

// type IconName = typeof iconNames[number]

interface OrchestraIconArgs {
  name: string
  fill: string
  size: string
  library?: 'orchestra-icons' | 'custom' | 'core'
}

const meta: Meta<OrchestraIconArgs> = {
  component: 'orchestra-icon',
  title: 'Components/orchestra-icon',
  argTypes: {
    name: {
      type: { name: 'string', required: true },
      control: { type: 'select' },
      options: iconNames,
      description: 'Icon name from the registered library',
    },
    fill: {
      control: { type: 'text' },
      description: 'SVG fill color',
    },
    size: {
      control: { type: 'text' },
      description: 'Icon size (CSS unit)',
    },
    library: {
      control: { type: 'select' },
      options: ['orchestra-icons', 'custom', 'core'],
      description:
        'Icon library to use. Leave empty to use the default orchestra-icons library.',
    },
  },
  args: {
    name: iconNames[0],
    fill: 'currentcolor',
    size: '60px',
  },
}

export default meta

type Story = StoryObj<OrchestraIconArgs>

export const Default = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) =>
    `<orchestra-icon name="${args.name}"${args.library ? ` library="${args.library}"` : ''} fill="${args.fill}" size="${args.size}"></orchestra-icon>`,
  args: {
    name: 'checked',
    fill: 'currentcolor',
    size: '60px',
  } as OrchestraIconArgs,
} satisfies Story

export const CustomLibrary: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) =>
    `<orchestra-icon name="${args.name}"${args.library ? ` library="${args.library}"` : ''} fill="${args.fill}" size="${args.size}"></orchestra-icon>`,
  args: {
    name: 'star',
    fill: 'currentcolor',
    size: '60px',
    library: 'custom',
  },
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'Icon name from the custom library (string input)',
    },
  },
} satisfies Story
