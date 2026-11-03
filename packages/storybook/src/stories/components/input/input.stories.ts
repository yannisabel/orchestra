import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { expect, fn, waitFor } from 'storybook/test'
import { within } from 'shadow-dom-testing-library'

interface InputArgs {
  label?: string
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'
  name?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  helperText?: string
  errorMessage?: string
  autocomplete?: string
  onOrchestraInput?: (event: CustomEvent<string>) => void
  onOrchestraChange?: (event: CustomEvent<string>) => void
}

interface OrchestraInputElement extends HTMLElement, InputArgs {
  checkValidity: () => Promise<boolean>
}

const meta = {
  component: 'orchestra-input',
  title: 'Components/orchestra-input',
  parameters: {
    test: {
      autoplay: false,
    },
  },
  argTypes: {
    label: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url'],
    },
    name: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    onOrchestraInput: { action: 'orchestraInput' },
    onOrchestraChange: { action: 'orchestraChange' },
  },
  args: {
    onOrchestraInput: fn(),
    onOrchestraChange: fn(),
  },
} satisfies Meta<InputArgs>

export default meta
type Story = StoryObj<InputArgs>

export const Default: Story = {
  args: {
    label: 'Email address',
    type: 'email',
    name: 'email',
    placeholder: 'you@example.com',
    autocomplete: 'email',
    helperText: 'We will only use this to contact you.',
  } as InputArgs,
  render: (args) => {
    const input = document.createElement(
      'orchestra-input',
    ) as OrchestraInputElement

    input.label = args.label
    input.type = args.type
    input.name = args.name
    input.value = args.value
    input.placeholder = args.placeholder
    input.disabled = args.disabled
    input.readOnly = args.readOnly
    input.required = args.required
    input.helperText = args.helperText
    input.errorMessage = args.errorMessage
    input.autocomplete = 'email'
    return input
  },
  play: async ({ canvasElement, userEvent }) => {
    const host =
      canvasElement.querySelector<OrchestraInputElement>('orchestra-input')
    expect(host).toBeTruthy()
    await waitFor(() => {
      expect(host?.shadowRoot?.querySelector('input')).toBeTruthy()
    })

    const canvas = within(canvasElement)
    const input = await canvas.findByShadowRole('textbox', {
      name: 'Email address',
    })
    const onInput = fn()
    const onChange = fn()
    host?.addEventListener('orchestraInput', onInput)
    host?.addEventListener('orchestraChange', onChange)

    await userEvent.type(input, 'a@b.com')
    expect(input).toHaveValue('a@b.com')
    expect(onInput).toHaveBeenCalled()
    expect(onInput.mock.calls[onInput.mock.calls.length - 1]?.[0].detail).toBe(
      'a@b.com',
    )

    input.dispatchEvent(new Event('change', { bubbles: true }))
    expect(onChange).toHaveBeenCalledOnce()
    expect(onChange.mock.calls[0][0].detail).toBe('a@b.com')
  },
}

export const RequiredWithError: Story = {
  args: {
    label: 'Username',
    name: 'username',
    required: true,
    errorMessage: 'Choose a username.',
  },
  render: (args) => {
    const input = document.createElement(
      'orchestra-input',
    ) as OrchestraInputElement
    input.label = args.label
    input.name = args.name
    input.required = args.required
    input.errorMessage = args.errorMessage
    return input
  },
  play: async ({ canvasElement }) => {
    const host =
      canvasElement.querySelector<OrchestraInputElement>('orchestra-input')
    await waitFor(() => {
      expect(host?.shadowRoot?.querySelector('input')).toHaveAttribute(
        'aria-invalid',
        'true',
      )
    })

    const input = host?.shadowRoot?.querySelector('input')
    expect(input).toHaveAttribute(
      'aria-describedby',
      'orchestra-input-description',
    )
    expect(
      host?.shadowRoot?.querySelector('#orchestra-input-description'),
    ).toHaveTextContent('Choose a username.')
    expect(await host?.checkValidity()).toBe(false)
  },
}
