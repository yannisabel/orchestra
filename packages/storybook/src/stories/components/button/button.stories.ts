import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { fn, expect } from 'storybook/test'
import { within } from 'shadow-dom-testing-library';

interface ButtonArgs {
  text: string;
  type?: 'button' | 'reset' | 'submit';
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  icon?: 'none' | 'start' | 'end' | 'only';
  iconName?: string;
  disabled?: boolean;
  onClick?: (e: Event) => void;
  onOrchestraFocus?: (e: Event) => void;
  onOrchestraBlur?: (e: Event) => void;
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
        if (activeElement?.tagName === 'ORCHESTRA-BUTTON' || activeElement?.shadowRoot?.activeElement) {
          activeElement?.blur?.()
        }
      }, 100)
      return story()
    },
  ],
  argTypes: {
    text: {
      type: { name: 'string', required: true },
      description: 'This is the text which appear inside the button. It is **required**.',
    },
    type: {
      control: 'select',
      options: ['button', 'reset', 'submit'],
      description: "A string indicating the behavior of the button. It relies on `HTMLButtonElement['type']`",
      table: { defaultValue: { summary: 'button' } },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'A string indicating the design variation of the button based on the level of importance.',
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
      description: 'It allows to render the chosen icon on the left or on the right.\nThe icon render only if `iconName` and `icon` are defined.',
      table: {
        type: { summary: 'string' }
      }
    },
    iconName: {
      type: { name: 'string' },
      description: 'For now only docaposte icons are working (at-outline)',
      if: {
        arg: 'icon',
        exists: true
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
    variant: 'primary'
  },
  play: async ({ canvasElement, userEvent, args }) => {
    if (args.onClick) {
      canvasElement.addEventListener('click', args.onClick);
    }

    const canvas = within(canvasElement)
    const button = await canvas.findByShadowRole('button')
    // Click
    await userEvent.click(button)
    expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    text: 'Button',
    disabled: true,
    variant: 'primary'
  },
  play: async ({ canvasElement, userEvent, args }) => {
    if (args.onClick) {
      canvasElement.addEventListener('click', args.onClick);
    }

    const canvas = within(canvasElement)
    const button = await canvas.findByShadowRole('button')
    // Click
    await userEvent.click(button)
    expect(args.onClick).not.toHaveBeenCalledOnce()
  },
}