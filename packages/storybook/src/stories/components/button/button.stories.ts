import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { fn, expect } from 'storybook/test'
import { within } from 'shadow-dom-testing-library'

interface ButtonArgs {
  text: string
  type?: 'button' | 'reset' | 'submit'
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'small' | 'medium' | 'large'
  icon?: 'none' | 'start' | 'end' | 'only'
  iconName?: string
  iconLibrary?: 'orchestra-icons' | 'custom' | 'core'
  disabled?: boolean
  onClick?: (e: Event) => void
  onOrchestraFocus?: (e: Event) => void
  onOrchestraBlur?: (e: Event) => void
}

const meta = {
  component: 'orchestra-button',
  title: 'Components/orchestra-button',
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
    text: {
      type: { name: 'string', required: true },
      description:
        'This is the text which appear inside the button. It is **required**.',
    },
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
    icon: {
      control: 'select',
      options: ['none', 'start', 'end', 'only'],
      description:
        'It allows to render the chosen icon on the left or on the right.\nThe icon render only if `iconName` and `icon` are defined.',
      table: {
        type: { summary: 'string' },
      },
    },
    iconName: {
      type: { name: 'string' },
      control: 'text',
      description:
        'Icon name to render. Keep this as a string so the name can vary by library.',
      if: {
        arg: 'icon',
        exists: true,
      },
    },
    iconLibrary: {
      control: 'select',
      options: ['orchestra-icons', 'custom'],
      description:
        'Icon library to use when an icon is selected. Defaults to orchestra-icons.',
      if: {
        arg: 'icon',
        exists: true,
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
    text: 'Button',
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
    text: 'Button',
    disabled: true,
    variant: 'primary',
    icon: 'start',
    iconName: 'checked',
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

export const KeyboardEnter: Story = {
  tags: ['!dev'],
  args: {
    text: 'Button',
    disabled: false,
    variant: 'primary',
  },
  play: async ({ canvasElement }) => {
    const onClick = fn()
    canvasElement.addEventListener('click', () => onClick())

    const host = canvasElement.querySelector('orchestra-button')
    expect(host).toBeTruthy()
    host?.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
    )

    expect(onClick).toHaveBeenCalledOnce()
  },
}

export const KeyboardSpace: Story = {
  tags: ['!dev'],
  args: {
    text: 'Button',
    disabled: false,
    variant: 'primary',
  },
  play: async ({ canvasElement }) => {
    const onClick = fn()
    canvasElement.addEventListener('click', () => onClick())

    const host = canvasElement.querySelector('orchestra-button')
    expect(host).toBeTruthy()
    host?.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', bubbles: true }))

    expect(onClick).toHaveBeenCalledOnce()
  },
}

export const DisabledAttributes: Story = {
  tags: ['!dev'],
  args: {
    text: 'Button',
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
    text: 'Button',
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

export const EndIcon: Story = {
  tags: ['!dev'],
  args: {
    text: 'Button',
    disabled: false,
    variant: 'primary',
    icon: 'end',
    iconName: 'checked',
  },
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector('orchestra-button')
    expect(host).toBeTruthy()

    const icon = host?.shadowRoot?.querySelector('orchestra-icon')
    const text = host?.shadowRoot?.querySelector('span.orchestra-overflow')
    expect(icon).toBeTruthy()
    expect(text).toBeTruthy()
  },
}

export const IconOnly: Story = {
  tags: ['!dev'],
  args: {
    text: 'Button',
    disabled: false,
    variant: 'primary',
    icon: 'only',
    iconName: 'checked',
  },
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector('orchestra-button')
    expect(host).toBeTruthy()

    const icon = host?.shadowRoot?.querySelector('orchestra-icon')
    const text = host?.shadowRoot?.querySelector('span.orchestra-overflow')
    const button = host?.shadowRoot?.querySelector('button')
    expect(icon).toBeTruthy()
    expect(text).toBeNull()
    expect(button).toHaveAttribute('aria-label', 'Button')
  },
}

export const CustomIconLibrary: Story = {
  tags: ['!dev'],
  args: {
    text: 'Button',
    disabled: false,
    variant: 'primary',
    icon: 'start',
    iconName: 'checked',
    iconLibrary: 'custom',
  },
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector('orchestra-button')
    expect(host).toBeTruthy()

    const icon = host?.shadowRoot?.querySelector('orchestra-icon') as
      (HTMLElement & { library?: string }) | null
    expect(icon).toBeTruthy()
    expect(icon?.getAttribute('library') ?? icon?.library).toBe('custom')
  },
}

export const VariantAndSizeClass: Story = {
  tags: ['!dev'],
  args: {
    text: 'Button',
    disabled: false,
    variant: 'secondary',
    size: 'large',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.findByShadowRole('button')

    expect(button).toHaveClass('orchestra-button--secondary')
    expect(button).toHaveClass('orchestra-button--large')
  },
}
