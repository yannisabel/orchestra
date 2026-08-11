import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { expect, waitFor } from 'storybook/test'

interface CheckboxArgs {
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  name?: string
  value?: string
  htmlId?: string
  label?: string
}

const meta: Meta<CheckboxArgs> = {
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
}

export default meta
type Story = StoryObj<CheckboxArgs>

export const Default: Story = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    htmlId: 'checkbox-example',
    label: 'Accept terms and conditions',
  },
  render: (args) => {
    const checkbox = document.createElement(
      'orchestra-checkbox',
    ) as HTMLElement & {
      checked?: boolean
      indeterminate?: boolean
      disabled?: boolean
      name?: string
      value?: string
      htmlId?: string
      label?: string
      ariaLabel?: string
    }

    checkbox.htmlId = args.htmlId ?? 'checkbox-example'
    checkbox.label = args.label ?? 'Accept terms and conditions'
    checkbox.name = 'terms'
    checkbox.value = 'accept'
    checkbox.checked = args.checked ?? false
    checkbox.indeterminate = args.indeterminate ?? false
    checkbox.disabled = args.disabled ?? false
    checkbox.ariaLabel = args.label ?? 'Accept terms and conditions'

    return checkbox
  },
  play: async ({ canvasElement }) => {
    const checkbox = canvasElement.querySelector('orchestra-checkbox')

    expect(checkbox).toBeTruthy()
    await waitFor(() => {
      expect(checkbox?.shadowRoot?.querySelector('input')).toBeTruthy()
    })

    const input = checkbox?.shadowRoot?.querySelector(
      'input',
    ) as HTMLInputElement | null

    // Verify initial state without modifying (no clicks)
    expect(input?.checked).toBe(false)
    expect(input?.indeterminate).toBe(false)
    expect(input?.disabled).toBe(false)
  },
}

export const Indeterminate: Story = {
  args: {
    checked: true,
    indeterminate: true,
    disabled: false,
    htmlId: 'checkbox-indeterminate',
    label: 'Partially selected items',
  },
  render: (args) => {
    const checkbox = document.createElement(
      'orchestra-checkbox',
    ) as HTMLElement & {
      checked?: boolean
      indeterminate?: boolean
      disabled?: boolean
      name?: string
      value?: string
      htmlId?: string
      label?: string
      ariaLabel?: string
    }

    checkbox.htmlId = args.htmlId ?? 'checkbox-indeterminate'
    checkbox.label = args.label ?? 'Partially selected items'
    checkbox.name = 'items'
    checkbox.value = 'partial'
    checkbox.checked = args.checked ?? true
    checkbox.indeterminate = args.indeterminate ?? true
    checkbox.disabled = args.disabled ?? false
    checkbox.ariaLabel = args.label ?? 'Partially selected items'

    return checkbox
  },
  play: async ({ canvasElement }) => {
    const checkbox = canvasElement.querySelector('orchestra-checkbox')

    expect(checkbox).toBeTruthy()
    await waitFor(() => {
      expect(checkbox?.shadowRoot?.querySelector('input')).toBeTruthy()
    })

    const input = checkbox?.shadowRoot?.querySelector(
      'input',
    ) as HTMLInputElement | null

    // Wait for indeterminate property to be set by component lifecycle
    await waitFor(() => {
      expect(input?.indeterminate).toBe(true)
    })
    expect(input?.checked).toBe(true)
    expect(input?.disabled).toBe(false)
  },
}

export const WithError: Story = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    htmlId: 'checkbox-agreement',
    label: 'I agree to the terms',
  },
  render: (args) => {
    const checkbox = document.createElement(
      'orchestra-checkbox',
    ) as HTMLElement & {
      checked?: boolean
      indeterminate?: boolean
      disabled?: boolean
      name?: string
      value?: string
      htmlId?: string
      label?: string
      ariaLabel?: string
      validationMessage?: string
    }

    checkbox.htmlId = args.htmlId ?? 'checkbox-agreement'
    checkbox.label = args.label ?? 'I agree to the terms'
    checkbox.name = 'agreement'
    checkbox.value = 'agreed'
    checkbox.checked = args.checked ?? false
    checkbox.indeterminate = args.indeterminate ?? false
    checkbox.disabled = args.disabled ?? false
    checkbox.ariaLabel = args.label ?? 'I agree to the terms'
    checkbox.validationMessage = 'You must agree to continue'

    const errorMessage = document.createElement('span')
    errorMessage.slot = 'error'
    errorMessage.textContent = 'You must agree to continue'

    checkbox.appendChild(errorMessage)
    return checkbox
  },
  play: async ({ canvasElement }) => {
    const checkbox = canvasElement.querySelector('orchestra-checkbox')

    expect(checkbox).toBeTruthy()
    await waitFor(() => {
      expect(checkbox?.shadowRoot?.querySelector('input')).toBeTruthy()
    })

    // Check that the error message is slotted in the component
    const errorSlot = checkbox?.querySelector('[slot="error"]')
    expect(errorSlot).toBeTruthy()
    expect(errorSlot?.textContent).toContain('You must agree to continue')
  },
}
