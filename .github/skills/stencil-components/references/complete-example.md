# Complete Example: Button Component

End-to-end reference combining the decorator, props, events, watchers, listeners, and token-based styling described in [the main skill](../SKILL.md).

```typescript
// packages/core/src/components/button/button.tsx (abridged; see the real file for icons and full props)
import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'orchestra-button',
  styleUrl: 'button.css',
  shadow: { delegatesFocus: true },
})
export class OrchestraButton {
  /** Button label */
  @Prop() text!: string;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop({ reflect: true }) disabled = false;

  @Event({ bubbles: true, composed: true }) orchestraClick!: EventEmitter<MouseEvent>;

  render() {
    return (
      <button
        part="button"
        type={this.type}
        disabled={this.disabled}
        data-variant={this.variant}
        data-size={this.size}
        data-disabled={this.disabled ? '' : undefined}
        onClick={(e) => this.orchestraClick.emit(e)}
      >
        <span part="label">{this.text}</span>
      </button>
    );
  }
}
```

```css
/* packages/core/src/components/button/button.css */
/* Select parts and data-* attributes. No classes, no tag selectors. */
:host {
  display: inline-flex;
}

[part='button'] {
  padding: var(--orchestra-button-primary-container-padding);
  border-radius: var(--orchestra-button-primary-container-radius);
  border: 1px solid transparent;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease-in-out;
}

[part='button'][data-variant='primary'] {
  background-color: var(--orchestra-color-action-primary-container-default);
  color: var(--orchestra-color-action-primary-content-default);
  border-color: var(--orchestra-color-action-primary-border-default);
}

[part='button'][data-variant='primary']:hover:not(:disabled) {
  background-color: var(--orchestra-color-action-primary-container-hover);
  border-color: var(--orchestra-color-action-primary-border-hover);
}

[part='button'][data-variant='secondary'] {
  background-color: var(--orchestra-color-action-secondary-container-default);
  color: var(--orchestra-color-action-secondary-content-default);
  border-color: var(--orchestra-color-action-secondary-border-default);
}

[part='button'][data-disabled] {
  background-color: var(--orchestra-color-action-primary-container-disabled);
  color: var(--orchestra-color-action-primary-content-disabled);
  cursor: not-allowed;
}

[part='button']:focus-visible {
  outline: 2px solid var(--orchestra-color-action-inner-ring);
  outline-offset: 2px;
}
```

Tests for this component belong in Storybook, per [story-testing](../../story-testing/SKILL.md):

```typescript
// packages/storybook/src/pages/components/button/button.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { expect, fn, userEvent, within } from 'storybook/test'

const meta = {
  title: 'Components/Button',
  component: 'orchestra-button',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { text: 'Click me', variant: 'primary', onOrchestraClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Click me' })

    await expect(button).toHaveAttribute('data-variant', 'primary')
    await userEvent.click(button)
    await expect(args.onOrchestraClick).toHaveBeenCalledOnce()
  },
}
```
