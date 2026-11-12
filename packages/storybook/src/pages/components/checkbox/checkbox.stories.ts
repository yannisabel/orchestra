import type { Meta, StoryObj } from '@storybook/web-components-vite'
import {
  registerIconLibrary,
  type Components,
} from '@orchestra-design-system/core'
import { html } from 'lit'
import { expect, fn, userEvent, waitFor } from 'storybook/test'
import { within } from 'shadow-dom-testing-library'

const CUSTOM_ICON_LIBRARY = 'checkbox-custom'

const customIcons: Record<string, string> = {
  cross: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 2L12 10L20 2L22 4L14 12L22 20L20 22L12 14L4 22L2 20L10 12L2 4Z" fill="currentColor"/></svg>`,
  bar: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="10" width="18" height="4" fill="currentColor"/></svg>`,
}

registerIconLibrary(CUSTOM_ICON_LIBRARY, {
  resolver: (name) => customIcons[name] ?? '',
})

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
        'The unique identifier for the checkbox input. Sets the id of the native input and the for attribute of the internal label.',
    },
    label: {
      type: { name: 'string' },
      control: 'text',
      description:
        'Required. Visible label text rendered next to the checkbox. It also provides the checkbox accessible name.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
}

export default meta
type Story = StoryObj<CheckboxArgs>

export const AccessibleLabel: Story = {
  args: {
    label: 'Accept privacy policy',
  },
  parameters: {
    docs: {
      source: {
        code: `<orchestra-checkbox label="Accept privacy policy"></orchestra-checkbox>`,
      },
    },
  },
  render: (args) => html`
    <orchestra-checkbox label=${args.label}></orchestra-checkbox>
  `,
  play: async ({ canvasElement }) => {
    const input = await within(canvasElement).findByShadowRole('checkbox', {
      name: 'Accept privacy policy',
    })
    expect(input).toBeVisible()
    expect(input).not.toBeChecked()

    const checkbox = canvasElement.querySelector<
      HTMLElement & Components.OrchestraCheckbox
    >('orchestra-checkbox')
    const onChange = fn()
    checkbox?.addEventListener('orchestraChange', onChange)

    const label = checkbox?.shadowRoot?.querySelector('label')
    expect(label).toBeTruthy()
    label?.click()
    await waitFor(() => expect(input).toBeChecked())
    await waitFor(() => expect(checkbox?.checked).toBe(true))
    expect(onChange).toHaveBeenCalledTimes(1)

    await userEvent.click(input)
    await waitFor(() => expect(input).not.toBeChecked())
    await waitFor(() => expect(checkbox?.checked).toBe(false))
    expect(onChange).toHaveBeenCalledTimes(2)
  },
}

export const Default: Story = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    htmlId: 'checkbox-example',
    label: 'Accept terms and conditions',
  },
  parameters: {
    docs: {
      source: {
        code: `<orchestra-checkbox
  html-id="checkbox-example"
  label="Accept terms and conditions"
  name="terms"
  value="accept"
></orchestra-checkbox>`,
      },
    },
  },
  render: (args) => html`
    <orchestra-checkbox
      html-id=${args.htmlId ?? 'checkbox-example'}
      label=${args.label ?? 'Accept terms and conditions'}
      name="terms"
      value="accept"
      ?checked=${args.checked ?? false}
      ?indeterminate=${args.indeterminate ?? false}
      ?disabled=${args.disabled ?? false}
    ></orchestra-checkbox>
  `,
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
  parameters: {
    docs: {
      source: {
        code: `<orchestra-checkbox
  html-id="checkbox-indeterminate"
  label="Partially selected items"
  name="items"
  value="partial"
  checked
  indeterminate
></orchestra-checkbox>`,
      },
    },
  },
  render: (args) => html`
    <orchestra-checkbox
      html-id=${args.htmlId ?? 'checkbox-indeterminate'}
      label=${args.label ?? 'Partially selected items'}
      name="items"
      value="partial"
      ?checked=${args.checked ?? true}
      ?indeterminate=${args.indeterminate ?? true}
      ?disabled=${args.disabled ?? false}
    ></orchestra-checkbox>
  `,
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
  parameters: {
    docs: {
      source: {
        code: `<orchestra-checkbox
  html-id="checkbox-agreement"
  label="I agree to the terms"
  name="agreement"
  value="agreed"
  validation-message="You must agree to continue"
>
  <span slot="error">You must agree to continue</span>
</orchestra-checkbox>`,
      },
    },
  },
  render: (args) => html`
    <orchestra-checkbox
      html-id=${args.htmlId ?? 'checkbox-agreement'}
      label=${args.label ?? 'I agree to the terms'}
      name="agreement"
      value="agreed"
      validation-message="You must agree to continue"
      ?checked=${args.checked ?? false}
      ?indeterminate=${args.indeterminate ?? false}
      ?disabled=${args.disabled ?? false}
    >
      <span slot="error">You must agree to continue</span>
    </orchestra-checkbox>
  `,
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

export const CustomIcons: Story = {
  parameters: {
    docs: {
      source: {
        code: `<orchestra-checkbox
  label="Checked with cross icon"
  checked
  icon-library="checkbox-custom"
  icon-names="cross,bar"
></orchestra-checkbox>`,
      },
    },
  },
  render: () => html`
    <orchestra-checkbox
      label="Checked with cross icon"
      checked
      icon-library="checkbox-custom"
      icon-names="cross,bar"
    ></orchestra-checkbox>
  `,
  play: async ({ canvasElement }) => {
    const checkbox = canvasElement.querySelector('orchestra-checkbox')
    expect(checkbox).toBeTruthy()

    const icon = checkbox?.shadowRoot?.querySelector<
      HTMLElement & Components.OrchestraIcon
    >('[part="icon"]')
    expect(icon?.name).toBe('cross')
    expect(icon?.library).toBe(CUSTOM_ICON_LIBRARY)
    await waitFor(() => {
      expect(icon?.shadowRoot?.querySelector('svg')).toBeTruthy()
    })
  },
}

export const CustomIconIndeterminate: Story = {
  parameters: {
    docs: {
      source: {
        code: `<orchestra-checkbox
  label="Partially selected with custom icon"
  checked
  indeterminate
  icon-library="checkbox-custom"
  icon-names="cross,bar"
></orchestra-checkbox>`,
      },
    },
  },
  render: () => html`
    <orchestra-checkbox
      label="Partially selected with custom icon"
      checked
      indeterminate
      icon-library="checkbox-custom"
      icon-names="cross,bar"
    ></orchestra-checkbox>
  `,
  play: async ({ canvasElement }) => {
    const checkbox = canvasElement.querySelector('orchestra-checkbox')
    expect(checkbox).toBeTruthy()

    const icon = checkbox?.shadowRoot?.querySelector<
      HTMLElement & Components.OrchestraIcon
    >('[part="icon"]')
    expect(icon?.name).toBe('bar')
    expect(icon?.library).toBe(CUSTOM_ICON_LIBRARY)
    await waitFor(() => {
      expect(icon?.shadowRoot?.querySelector('svg')).toBeTruthy()
    })
  },
}
