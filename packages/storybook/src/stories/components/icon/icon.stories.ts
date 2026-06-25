import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { iconNames } from '@orchestra-kit/icons-library'
import { registerIconLibrary } from '@orchestra-kit/core'

type IconName = typeof iconNames[number]

interface OrchestraIconArgs {
  name: IconName
  fill: string
  size: string
  library?: string
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
  },
  args: {
    name: iconNames[0],
    fill: 'currentcolor',
    size: '60px',
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => `<orchestra-icon name="${args.name}" library="core" fill="${args.fill}" size="${args.size}"></orchestra-icon>`,
  args: {
    name: 'checked',
    fill: 'currentcolor',
    size: '60px'
  },
} satisfies Story

export const CustomLibrary = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => `<orchestra-icon name="${args.name}" library="custom" fill="${args.fill}" size="${args.size}"></orchestra-icon>`,
  args: {
    name: 'star',
    fill: 'currentcolor',
    size: '60px'
  },
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'Icon name from the custom library (string input)',
    }
  }
} satisfies Story