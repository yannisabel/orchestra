# Complete Example: Button Component

End-to-end reference combining the decorator, props, events, watchers, listeners, and token-based styling described in [the main skill](../SKILL.md).

```typescript
// packages/core/src/components/button/button.tsx
import { Component, Prop, Event, EventEmitter, Listen, Watch, h } from '@stencil/core';

@Component({
  tag: 'orchestra-button',
  styleUrl: 'button.css',
  formAssociated: true,
  shadow: { delegatesFocus: true }
})
export class OrchestraButton {
  // Props
  @Prop() text!: string;
  @Prop() variant?: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Prop() size?: 'small' | 'medium' | 'large' = 'medium';
  @Prop() type?: 'button' | 'submit' | 'reset' = 'button';
  @Prop({ mutable: true }) disabled?: boolean = false;
  @Prop() ariaLabel?: string;
  @Prop() ariaDescribedBy?: string;

  // Events
  @Event({ bubbles: true, composed: true }) orchestraClick!: EventEmitter<MouseEvent>;

  // Watchers
  @Watch('disabled')
  disabledChanged(newValue: boolean) {
    if (newValue) {
      // Update internal state
    }
  }

  // Listeners
  @Listen('click')
  handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.stopImmediatePropagation();
      return;
    }
    this.orchestraClick.emit(e);
  }

  @Listen('keydown')
  handleKeyDown(e: KeyboardEvent) {
    if ((e.key === 'Enter' || e.key === ' ') && !this.disabled) {
      e.preventDefault();
      this.orchestraClick.emit(new MouseEvent('click'));
    }
  }

  // Computed
  private get buttonClass(): string {
    return [
      'orchestra-button',
      `orchestra-button--${this.variant}`,
      `orchestra-button--${this.size}`,
      this.disabled && 'is-disabled'
    ]
      .filter(Boolean)
      .join(' ');
  }

  render() {
    return (
      <button
        class={this.buttonClass}
        type={this.type}
        disabled={this.disabled}
        aria-label={this.ariaLabel}
        aria-described-by={this.ariaDescribedBy}
      >
        {this.text}
      </button>
    );
  }
}
```

```css
/* packages/core/src/components/button/button.css */
:host {
  display: inline-flex;
  --button-padding: var(--orchestra-button-primary-container-padding);
  --button-radius: var(--orchestra-button-primary-container-radius);
}

.orchestra-button {
  padding: var(--button-padding);
  border-radius: var(--button-radius);
  border: 1px solid transparent;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease-in-out;
}

.orchestra-button--primary {
  background-color: var(--orchestra-color-action-primary-container-default);
  color: var(--orchestra-color-action-primary-content-default);
}

.orchestra-button--primary:hover:not(:disabled) {
  background-color: var(--orchestra-color-action-primary-container-hover);
}

.orchestra-button--primary:disabled {
  background-color: var(--orchestra-color-action-primary-container-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}

.orchestra-button:focus-visible {
  outline: 2px solid var(--orchestra-color-outline);
  outline-offset: 2px;
}
```

Tests for this component belong in Storybook, per [story-testing](../../story-testing/SKILL.md):

```typescript
// packages/storybook/src/stories/components/button/button.stories.tsx
import { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/test'
import { OrchestraButton } from './button'

const meta = {
  title: 'Components/Button',
  component: OrchestraButton,
} satisfies Meta<typeof OrchestraButton>

export default meta

export const Primary: StoryObj = {
  args: { text: 'Click me', variant: 'primary' },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('orchestra-button')
    expect(button).toBeInTheDocument()
  },
}
```
