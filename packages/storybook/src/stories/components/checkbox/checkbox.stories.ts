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
    const container = document.createElement('div')
    container.style.display = 'flex'
    container.style.alignItems = 'center'
    container.style.gap = '0.5rem'

    const checkbox = document.createElement(
      'orchestra-checkbox',
    ) as HTMLElement & {
      checked?: boolean
      indeterminate?: boolean
      disabled?: boolean
      name?: string
      value?: string
      htmlId?: string
      ariaLabel?: string
    }

    const label = document.createElement('label')
    const labelId = `${args.htmlId ?? 'checkbox-default'}-label`
    label.id = labelId
    label.textContent = args.label ?? 'Accept terms and conditions'
    label.style.cursor = 'pointer'

    checkbox.htmlId = args.htmlId ?? 'checkbox-example'
    checkbox.name = 'terms'
    checkbox.value = 'accept'
    checkbox.checked = args.checked ?? false
    checkbox.indeterminate = args.indeterminate ?? false
    checkbox.disabled = args.disabled ?? false
    checkbox.ariaLabel = args.label ?? 'Accept terms and conditions'

    container.append(checkbox, label)
    return container
  },
  play: async ({ canvasElement, userEvent }) => {
    const checkbox = canvasElement.querySelector('orchestra-checkbox')

    expect(checkbox).toBeTruthy()
    await waitFor(() => {
      expect(checkbox?.shadowRoot?.querySelector('input')).toBeTruthy()
    })

    const input = checkbox?.shadowRoot?.querySelector(
      'input',
    ) as HTMLInputElement | null

    expect(input?.checked).toBe(false)
    expect(input?.indeterminate).toBe(false)
    expect(input?.disabled).toBe(false)

    // Click the native input inside shadow DOM to assert state transitions.
    if (input) {
      await userEvent.click(input)
    }

    await waitFor(() => {
      expect(input?.checked).toBe(true)
      expect(input?.indeterminate).toBe(false)
    })
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
    const container = document.createElement('div')
    container.style.display = 'flex'
    container.style.alignItems = 'center'
    container.style.gap = '0.5rem'

    const checkbox = document.createElement(
      'orchestra-checkbox',
    ) as HTMLElement & {
      checked?: boolean
      indeterminate?: boolean
      disabled?: boolean
      name?: string
      value?: string
      htmlId?: string
      ariaLabel?: string
    }

    const label = document.createElement('label')
    const labelId = `${args.htmlId ?? 'checkbox-indeterminate'}-label`
    label.id = labelId
    label.textContent = args.label ?? 'Partially selected items'
    label.style.cursor = 'pointer'

    checkbox.htmlId = args.htmlId ?? 'checkbox-indeterminate'
    checkbox.name = 'items'
    checkbox.value = 'partial'
    checkbox.checked = args.checked ?? true
    checkbox.indeterminate = args.indeterminate ?? true
    checkbox.disabled = args.disabled ?? false
    checkbox.ariaLabel = args.label ?? 'Partially selected items'

    container.append(checkbox, label)
    return container
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

    expect(input?.indeterminate).toBe(true)
    expect(input?.checked).toBe(true)
    expect(input?.disabled).toBe(false)
  },
}
