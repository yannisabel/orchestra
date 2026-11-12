import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { fn, expect, waitFor } from 'storybook/test'
import { within } from 'shadow-dom-testing-library'

interface ButtonArgs {
  type?: 'button' | 'reset' | 'submit'
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  onClick?: (e: Event) => void
  onOrchestraFocus?: (e: Event) => void
  onOrchestraBlur?: (e: Event) => void
}

const meta = {
  component: 'orchestra-button',
  title: 'Components/orchestra-button',
  render: (args) => html`
    <orchestra-button
      .type=${args.type ?? 'button'}
      .variant=${args.variant ?? 'primary'}
      .size=${args.size ?? 'medium'}
      .disabled=${args.disabled ?? false}
      >Button</orchestra-button
    >
  `,
  parameters: {
    test: {
      autoplay: false,
    },
  },
  decorators: [
    (story) => {
      // Defer focus removal to ensure play function completes first
      setTimeout(() => {
        const activeElement = document.activeElement as HTMLElement
        if (
          activeElement?.tagName === 'ORCHESTRA-BUTTON' ||
          activeElement?.shadowRoot?.activeElement
        ) {
          activeElement?.blur?.()
        }
      }, 100)
      return story()
    },
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['button', 'reset', 'submit'],
      description:
        "A string indicating the behavior of the button. It relies on `HTMLButtonElement['type']`",
      table: { defaultValue: { summary: 'button' } },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description:
        'A string indicating the design variation of the button based on the level of importance.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'A string indicating the size of the button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'A boolean indicating the disable state of the button.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: { action: 'clicked' },
    onOrchestraFocus: { action: 'orchestraFocus' },
    onOrchestraBlur: { action: 'orchestraBlur' },
  },
  args: {
    onClick: fn(),
    onOrchestraFocus: fn(),
    onOrchestraBlur: fn(),
  },
} satisfies Meta<ButtonArgs>

export default meta

type Story = StoryObj<ButtonArgs>

export const Default: Story = {
  args: {
    disabled: false,
    variant: 'primary',
  },
  play: async ({ canvasElement, userEvent }) => {
    const onClick = fn()
    canvasElement.addEventListener('click', () => onClick())

    const canvas = within(canvasElement)
    const button = await canvas.findByShadowRole('button')
    // Click
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()
  },
}

export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    disabled: true,
    variant: 'primary',
  },
  play: async ({ canvasElement, userEvent }) => {
    const onClick = fn()
    canvasElement.addEventListener('click', () => onClick())

    const canvas = within(canvasElement)
    const button = await canvas.findByShadowRole('button')
    // Click
    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalledOnce()
  },
}

// The decorator above blurs the button 100ms after render. Wait past that
// so the deferred blur cannot land between focusing and the key press.
const focusAfterDecoratorBlur = async (button: HTMLElement) => {
  await new Promise((resolve) => setTimeout(resolve, 150))
  button.focus()
}

export const KeyboardEnter: Story = {
  tags: ['!dev'],
  args: {
    disabled: false,
    variant: 'primary',
  },
  play: async ({ canvasElement, userEvent }) => {
    const onClick = fn()
    canvasElement.addEventListener('click', () => onClick())

    const button = await within(canvasElement).findByShadowRole('button', {
      name: 'Button',
    })
    await userEvent.click(button)
    onClick.mockClear()
    await focusAfterDecoratorBlur(button)
    await userEvent.keyboard('{Enter}')

    expect(onClick).toHaveBeenCalledOnce()
  },
}

export const KeyboardSpace: Story = {
  tags: ['!dev'],
  args: {
    disabled: false,
    variant: 'primary',
  },
  play: async ({ canvasElement, userEvent }) => {
    const onClick = fn()
    canvasElement.addEventListener('click', () => onClick())

    const button = await within(canvasElement).findByShadowRole('button', {
      name: 'Button',
    })
    await userEvent.click(button)
    onClick.mockClear()
    await focusAfterDecoratorBlur(button)
    await userEvent.keyboard(' ')

    expect(onClick).toHaveBeenCalledOnce()
  },
}

export const DisabledAttributes: Story = {
  tags: ['!dev'],
  args: {
    disabled: true,
    variant: 'primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.findByShadowRole('button')

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(button.tabIndex).toBe(-1)
  },
}

export const SubmitType: Story = {
  tags: ['!dev'],
  args: {
    type: 'submit',
    disabled: false,
    variant: 'primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.findByShadowRole('button')

    expect(button).toHaveAttribute('type', 'submit')
  },
}

export const WithIcon: Story = {
  args: {
    disabled: false,
    variant: 'primary',
    size: 'medium',
  },
  render: (args) => html`
    <orchestra-button
      size=${args.size}
      variant=${args.variant}
      disabled=${args.disabled}
      type=${args.type}
    >
      <orchestra-icon name="checkmark" label="Validation"></orchestra-icon>
      <span>Button</span>
    </orchestra-button>
  `,
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector('orchestra-button')
    expect(host).toBeTruthy()

    const icon = host?.querySelector('orchestra-icon')
    expect(icon).toBeTruthy()
    await waitFor(() => {
      const slot = host?.shadowRoot?.querySelector('slot')
      expect(slot?.assignedElements()).toContain(icon)
    })
  },
}

export const IconOnly: Story = {
  tags: ['!dev'],
  args: {
    disabled: false,
    variant: 'primary',
  },
  render: () => html`
    <orchestra-button>
      <orchestra-icon name="checked" label="Checked"></orchestra-icon>
    </orchestra-button>
  `,
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector('orchestra-button')
    expect(host?.textContent?.trim()).toBe('')

    const button = await within(canvasElement).findByShadowRole('button', {
      name: 'Checked',
    })
    expect(button).toBeTruthy()
  },
}

export const CustomIconLibrary: Story = {
  tags: ['!dev'],
  args: {
    disabled: false,
    variant: 'primary',
  },
  render: () => html`
    <orchestra-button>
      <orchestra-icon name="star" library="custom"></orchestra-icon>
      <span>Button</span>
    </orchestra-button>
  `,
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector('orchestra-button')
    expect(host).toBeTruthy()

    await waitFor(() => {
      const icon = host?.querySelector('orchestra-icon') as
        (HTMLElement & { library?: string }) | null
      expect(icon).toBeTruthy()
      expect(icon?.getAttribute('library') ?? icon?.library).toBe('custom')
      expect(icon?.shadowRoot?.querySelector('svg')).toBeInTheDocument()
    })
  },
}

export const VariantAndSizeAttributes: Story = {
  tags: ['!dev'],
  args: {
    disabled: false,
    variant: 'secondary',
    size: 'large',
  },
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector('orchestra-button')
    expect(host).toBeTruthy()

    await waitFor(() => {
      expect(host).toHaveAttribute('data-variant', 'secondary')
      expect(host).toHaveAttribute('data-size', 'large')
    })

    const button = await within(canvasElement).findByShadowRole('button')
    expect(button).toBeTruthy()
  },
}
