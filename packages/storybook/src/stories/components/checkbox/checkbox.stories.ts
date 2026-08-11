import type { Meta, StoryObj } from '@storybook/web-components-vite'

interface CheckboxArgs {
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  name?: string
  value?: string
  htmlId?: string
  label?: string
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
    checked: {
      control: 'boolean',
      description: 'A boolean indicating the checked state of the checkbox.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    indeterminate: {
      control: 'boolean',
      description:
        'A boolean indicating the indeterminate state (mixed/partial selection). Shows a dash/minus sign.',
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
      description:
        'A string representing the name of the checkbox for form submission.',
    },
    value: {
      type: { name: 'string' },
      control: 'text',
      description:
        'A string representing the value of the checkbox for form submission.',
      table: {
        defaultValue: { summary: 'on' },
      },
    },
    htmlId: {
      type: { name: 'string' },
      control: 'text',
      description:
        'The unique identifier for the checkbox input. Used to associate with external label elements.',
    },
    label: {
      type: { name: 'string' },
      control: 'text',
      description:
        'Label text to associate with the checkbox (rendered as external label element).',
    },
  },
} satisfies Meta<CheckboxArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    htmlId: 'checkbox-example',
    label: 'Accept terms and conditions',
  },
  render: (args) => `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <orchestra-checkbox
        html-id="${args.htmlId}"
        name="terms"
        value="accept"
        ${args.checked ? 'checked' : ''}
        ${args.indeterminate ? 'indeterminate' : ''}
        ${args.disabled ? 'disabled' : ''}
      ></orchestra-checkbox>
      <label for="${args.htmlId}" style="cursor: pointer;">
        ${args.label}
      </label>
    </div>
  `,
}

export const Checked: Story = {
  args: {
    checked: true,
    indeterminate: false,
    disabled: false,
    htmlId: 'checkbox-checked',
    label: 'Terms accepted',
  },
  render: (args) => `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <orchestra-checkbox
        html-id="${args.htmlId}"
        name="terms"
        value="accept"
        checked
        ${args.disabled ? 'disabled' : ''}
      ></orchestra-checkbox>
      <label for="${args.htmlId}" style="cursor: pointer;">
        ${args.label}
      </label>
    </div>
  `,
}

export const Indeterminate: Story = {
  args: {
    checked: false,
    indeterminate: true,
    disabled: false,
    htmlId: 'checkbox-indeterminate',
    label: 'Partially selected items',
  },
  render: (args) => `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <orchestra-checkbox
        html-id="${args.htmlId}"
        name="items"
        value="partial"
        indeterminate
        ${args.disabled ? 'disabled' : ''}
      ></orchestra-checkbox>
      <label for="${args.htmlId}" style="cursor: pointer;">
        ${args.label}
      </label>
    </div>
  `,
}
