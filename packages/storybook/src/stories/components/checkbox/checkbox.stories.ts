import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { fn, expect } from 'storybook/test'
import { within } from 'shadow-dom-testing-library'

interface CheckboxArgs {
  variant?: 'primary' | 'secondary'
  checked?: boolean
  disabled?: boolean
  name?: string
  value?: string
  ariaLabel?: string
  ariaLabelledBy?: string
}

const meta = {
  component: 'orchestra-checkbox',
  title: 'Components/orchestra-checkbox',
  parameters: {
    test: {
      autoplay: false,
    },
  },
  decorators: [
    (story) => {
      setTimeout(() => {
        const activeElement = document.activeElement as HTMLElement
        if (
          activeElement?.tagName === 'ORCHESTRA-CHECKBOX' ||
          activeElement?.shadowRoot?.activeElement
        ) {
          activeElement?.blur?.()
        }
      }, 100)
      return story()
    },
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description:
        'A string indicating the design variation of the checkbox based on the level of importance.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'A boolean indicating the checked state of the checkbox.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'A boolean indicating the disable state of the checkbox.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      type: { name: 'string' },
      control: 'text',
      description: 'A string representing the name of the checkbox for form submission.',
    },
    value: {
      type: { name: 'string' },
      control: 'text',
      description: 'A string representing the value of the checkbox for form submission.',
      table: {
        defaultValue: { summary: 'on' },
      },
    },
    ariaLabel: {
      type: { name: 'string' },
      control: 'text',
      description: 'A string providing an accessible label for the checkbox.',
    },
    ariaLabelledBy: {
      type: { name: 'string' },
      control: 'text',
      description: 'A string providing an ID of a label element associated with this checkbox.',
    },
  },
} satisfies Meta<CheckboxArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'primary',
    checked: false,
    disabled: false,
    ariaLabel: 'Accept terms',
  },
  render: (args) => `
    <orchestra-checkbox
      variant="${args.variant}"
      ${args.checked ? 'checked' : ''}
      ${args.disabled ? 'disabled' : ''}
      aria-label="${args.ariaLabel}"
    ></orchestra-checkbox>
  `,
}
