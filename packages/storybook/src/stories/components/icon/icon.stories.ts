import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { iconNames } from '@orchestra-design-system/icons-library'
import type { Components } from '@orchestra-design-system/core'
import { expect, waitFor } from 'storybook/test'
import { within } from 'shadow-dom-testing-library'

// type IconName = typeof iconNames[number]

interface OrchestraIconArgs {
  name: string
  fill: string
  size: string
  library?: 'orchestra-icons' | 'custom' | 'core'
  label?: string
}

const meta: Meta<OrchestraIconArgs> = {
  component: 'orchestra-icon',
  title: 'Components/orchestra-icon',
  render: (args) => {
    const icon = document.createElement('orchestra-icon') as HTMLElement &
      Components.OrchestraIcon
    icon.name = args.name
    icon.label = args.label
    icon.size = args.size
    icon.fill = args.fill
    if (args.library) icon.library = args.library
    return icon
  },
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
    label: {
      control: { type: 'text' },
      description: 'Accessible name. Leave blank for a decorative icon.',
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

export const Informative: Story = {
  args: {
    name: 'checkbox-check',
    label: 'Completed',
  },
  play: async ({ canvasElement }) => {
    const icon = (await within(canvasElement).findByShadowRole('img', {
      name: 'Completed',
    })) as HTMLElement & Components.OrchestraIcon
    expect(icon).not.toHaveAttribute('aria-hidden')
    expect(icon.shadowRoot?.querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true',
    )
    expect(icon.shadowRoot?.querySelector('svg')).toHaveAttribute(
      'focusable',
      'false',
    )

    icon.label = 'Updated status'
    await waitFor(() => expect(icon).toHaveAccessibleName('Updated status'))

    icon.name = 'checkbox-indeterminate'
    await waitFor(() => expect(icon).toHaveAccessibleName('Updated status'))
    expect(icon).not.toHaveAttribute('aria-hidden')

    icon.label = ' '
    await waitFor(() => {
      expect(icon).toHaveAttribute('aria-hidden', 'true')
      expect(icon).not.toHaveAttribute('role')
      expect(icon).not.toHaveAttribute('aria-label')
    })

    icon.label = 'Restored status'
    await waitFor(() => expect(icon).toHaveAccessibleName('Restored status'))
    expect(icon).toHaveAttribute('role', 'img')
    expect(icon).not.toHaveAttribute('aria-hidden')
  },
}

export const Default = {
  args: {
    name: 'checked',
    fill: 'currentcolor',
    size: '60px',
  } as OrchestraIconArgs,
  play: async ({ canvasElement }) => {
    const icon = canvasElement.querySelector('orchestra-icon')
    await waitFor(() => expect(icon).toHaveAttribute('aria-hidden', 'true'))
    expect(icon).not.toHaveAttribute('role')
    expect(within(canvasElement).queryByShadowRole('img')).toBeNull()
  },
} satisfies Story

export const CustomLibrary: Story = {
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
