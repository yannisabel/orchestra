---
name: stencil-components
description: 'Build flexible, token-driven Stencil components for Orchestra. Use when creating new UI components or extending existing ones. Covers component structure, props/variants, styling with design tokens, accessibility (ARIA), keyboard navigation, and Shadow/Light DOM decisions.'
argument-hint: "Describe the component (e.g., 'button with variants', 'form input', 'dropdown')"
user-invocable: true
---

# Stencil Components

## Overview

Orchestra uses **Stencil** to build reusable web components with multiple output targets (React, Vue, Angular, vanilla JS). Components are token-driven (pulling values from [design-tokens](../design-tokens/SKILL.md)), support dark/light themes automatically, and are tested in Storybook (v10.4.6) with Vitest (v4.1.9).

**Build Pipeline**:

- **CSS**: Vite (`vite-style.config.js`) processes design tokens → CSS with variables
- **JS**: Stencil CLI builds multiple targets (dist, dist-custom-elements, www, hydrate, framework bindings)
- **Testing**: Storybook + Vitest with play functions
- **Documentation**: MDX stories + Storybook docs addon

**Key principle**: One component = One semantic element with variants, props for states, token-based styling, and full accessibility.

## Component Architecture

### File Structure

```
packages/core/src/components/[component-name]/
├── [component-name].tsx          # Component logic (Stencil)
├── [component-name].css          # Styling with tokens
├── [component-name].spec.tsx     # Unit tests (optional)
└── readme.md                     # Documentation
```

### Stencil Component Decorator

```typescript
import { Component, Prop, Event, EventEmitter, Listen, Watch, h } from '@stencil/core';

@Component({
  tag: 'orchestra-[component-name]',      // Web component tag (kebab-case)
  styleUrl: '[component-name].css',       // CSS file with token variables
  shadow: true | false,                   // True: isolated styles, False: global
  formAssociated: true | false,           // True if form element (button, input, etc.)
  scoped: false                           // Usually false (use shadow)
})
export class Orchestra[ComponentName] {
  // Implementation
}
```

**Shadow vs Light DOM**:

| Decision           | Use Shadow                | Use Light              |
| ------------------ | ------------------------- | ---------------------- |
| Isolated styles    | ✅ Default                | ❌ Global styles apply |
| Form association   | ❌ Limited                | ✅ Full support        |
| Content projection | ✅ Slots                  | ❌ Direct nesting      |
| Focus delegation   | ✅ `delegatesFocus: true` | ✅ Natural             |
| **When to use**    | Most components           | Form controls, buttons |

## Component Anatomy

### Props (Inputs)

Define component inputs with `@Prop()` decorator:

```typescript
@Component({
  tag: 'orchestra-button',
  styleUrl: 'button.css',
  formAssociated: true,
  shadow: { delegatesFocus: true }  // Focus on button, not shadow root
})
export class OrchestraButton {
  // Variant props
  @Prop() variant?: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Prop() size?: 'small' | 'medium' | 'large' = 'medium';

  // Content
  @Prop() text!: string;
  @Prop() iconName?: string;
  @Prop() iconPosition?: 'start' | 'end' = 'start';

  // State
  @Prop({ mutable: true }) disabled?: boolean = false;
  @Prop({ mutable: true }) loading?: boolean = false;
  @Prop() type?: 'button' | 'submit' | 'reset' = 'button';

  // Callbacks (passed as functions, not events)
  @Prop() onClick?: (event: MouseEvent) => void;
  @Prop() onFocus?: (event: FocusEvent) => void;

  // Attributes for ARIA
  @Prop() ariaLabel?: string;
  @Prop() ariaDescribedBy?: string;

  // Computed properties for CSS
  private get buttonClass(): string {
    return [
      'orchestra-button',
      `orchestra-button--${this.variant}`,
      `orchestra-button--${this.size}`,
      { 'is-disabled': this.disabled },
      { 'is-loading': this.loading }
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
      >
        {this.text}
      </button>
    );
  }
}
```

### Events (Outputs)

Use `@Event()` for component events:

```typescript
@Component({
  tag: 'orchestra-form-input',
  styleUrl: 'form-input.css',
  shadow: true
})
export class OrchestraFormInput {
  @Prop() value?: string;
  @Prop() name?: string;
  @Prop() label?: string;

  // Events emitted by component
  @Event({ bubbles: true, composed: true }) orchestraChange!: EventEmitter<string>;
  @Event({ bubbles: true, composed: true }) orchestraFocus!: EventEmitter<FocusEvent>;
  @Event({ bubbles: true, composed: true }) orchestraBlur!: EventEmitter<FocusEvent>;

  private handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.orchestraChange.emit(target.value);
  }

  private handleFocus(e: FocusEvent) {
    this.orchestraFocus.emit(e);
  }

  render() {
    return (
      <input
        type="text"
        value={this.value}
        onChange={(e) => this.handleChange(e)}
        onFocus={(e) => this.handleFocus(e)}
      />
    );
  }
}
```

### Watchers (React to Prop Changes)

Use `@Watch()` to respond to prop changes:

```typescript
@Component({
  tag: 'orchestra-button'
})
export class OrchestraButton {
  @Prop() disabled?: boolean;

  @Watch('disabled')
  disabledChanged(newValue: boolean) {
    if (newValue) {
      // Handle disabled state (e.g., update ARIA attributes)
      console.log('Button disabled');
    }
  }

  render() {
    return <button disabled={this.disabled}>Click me</button>;
  }
}
```

### Listeners (Event Handlers)

Use `@Listen()` for event listeners:

```typescript
@Component({
  tag: 'orchestra-button'
})
export class OrchestraButton {
  @Listen('click')
  protected onClick(event: MouseEvent) {
    if (this.disabled) {
      event.stopImmediatePropagation();
    }
  }

  @Listen('keydown')
  protected onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.handleActivation();
    }
  }

  render() {
    return <button>Click me</button>;
  }
}
```

## Styling with Design Tokens

### CSS Variables

Use tokens in your component CSS (see [design-tokens](../design-tokens/SKILL.md)):

```css
/* packages/core/src/components/button/button.css */

:host {
  --button-padding: var(--orchestra-button-primary-container-padding);
  --button-radius: var(--orchestra-button-primary-container-radius);
  display: inline-flex;
}

.orchestra-button {
  border: 0;
  border-radius: var(--button-radius);
  padding: var(--button-padding);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 150ms ease-in-out;
}

/* Variant: Primary */
.orchestra-button--primary {
  background-color: var(--orchestra-color-action-primary-container-default);
  color: var(--orchestra-color-action-primary-content-default);
  border: 1px solid var(--orchestra-color-action-primary-border-default);
}

.orchestra-button--primary:hover:not(:disabled) {
  background-color: var(--orchestra-color-action-primary-container-hover);
  border-color: var(--orchestra-color-action-primary-border-hover);
}

.orchestra-button--primary:active:not(:disabled) {
  background-color: var(--orchestra-color-action-primary-container-active);
}

.orchestra-button--primary:disabled {
  background-color: var(--orchestra-color-action-primary-container-disabled);
  color: var(--orchestra-color-action-primary-content-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}

/* Variant: Secondary */
.orchestra-button--secondary {
  background-color: var(--orchestra-color-action-secondary-container-default);
  color: var(--orchestra-color-action-secondary-content-default);
}

.orchestra-button--secondary:hover:not(:disabled) {
  background-color: var(--orchestra-color-action-secondary-container-hover);
}

/* Size: Small */
.orchestra-button--small {
  padding: var(--orchestra-button-primary-sizes-small-padding);
  font-size: var(--orchestra-font-size-sm);
}

/* Size: Large */
.orchestra-button--large {
  padding: var(--orchestra-button-primary-sizes-large-padding);
  font-size: var(--orchestra-font-size-lg);
}

/* Focus styles (accessibility) */
.orchestra-button:focus-visible {
  outline: 2px solid var(--orchestra-color-outline);
  outline-offset: 2px;
}

/* Disabled state */
.orchestra-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
```

**Key patterns**:

- ✅ Use `var(--orchestra-*)` for all colors, spacing, typography
- ✅ Define variants with class names: `.orchestra-button--primary`, `.orchestra-button--secondary`
- ✅ Use pseudo-classes for states: `:hover`, `:active`, `:disabled`, `:focus-visible`
- ✅ Transitions for smooth interactions (150-300ms)
- ❌ Don't hardcode colors or spacing
- ❌ Don't forget focus/accessibility states

## Accessibility (ARIA)

### Essential ARIA Attributes

```typescript
@Component({ tag: 'orchestra-button' })
export class OrchestraButton {
  @Prop() ariaLabel?: string;              // Button text (if no visible text)
  @Prop() ariaDescribedBy?: string;        // ID of description element
  @Prop() ariaPressed?: boolean;           // For toggle buttons
  @Prop() ariaHasPopup?: boolean;          // For dropdown triggers
  @Prop() ariaExpanded?: boolean;          // For expandable content

  render() {
    return (
      <button
        aria-label={this.ariaLabel}
        aria-described-by={this.ariaDescribedBy}
        aria-pressed={this.ariaPressed}
      >
        {this.text}
      </button>
    );
  }
}
```

### Common ARIA Patterns

```typescript
// Form Input with Error
<input
  aria-invalid={this.hasError}
  aria-described-by={this.hasError ? `${this.id}-error` : undefined}
/>
<span id={`${this.id}-error`} role="alert">
  {this.error}
</span>

// Modal Dialog
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Action</h2>
  <button onClick={() => this.close()}>Close</button>
</div>

// Tabs
<div role="tablist">
  <button role="tab" aria-selected={this.activeTab === 0} aria-controls="panel-0">
    Tab 1
  </button>
</div>
<div id="panel-0" role="tabpanel" aria-labelledby="tab-0">
  Content
</div>

// List
<ul role="list">
  {this.items.map((item, i) => (
    <li key={i} role="listitem">{item}</li>
  ))}
</ul>
```

## Keyboard Navigation

### Common Patterns

```typescript
@Component({ tag: 'orchestra-dropdown' })
export class OrchestraDropdown {
  @Prop() options: string[]
  @Prop() value?: string

  private focused: number = 0

  @Listen('keydown')
  handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        this.focused = (this.focused + 1) % this.options.length
        this.updateFocus()
        break

      case 'ArrowUp':
        e.preventDefault()
        this.focused =
          (this.focused - 1 + this.options.length) % this.options.length
        this.updateFocus()
        break

      case 'Enter':
      case ' ':
        e.preventDefault()
        this.selectOption(this.options[this.focused])
        break

      case 'Escape':
        e.preventDefault()
        this.close()
        break

      case 'Home':
        e.preventDefault()
        this.focused = 0
        this.updateFocus()
        break

      case 'End':
        e.preventDefault()
        this.focused = this.options.length - 1
        this.updateFocus()
        break
    }
  }

  private updateFocus() {
    const option = this.el?.querySelector(
      `[data-index="${this.focused}"]`,
    ) as HTMLElement
    option?.focus()
  }
}
```

## Complete Example: Button Component

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

## Build & Testing

### Building Components

```bash
# Build all components
npm run build --workspace=@orchestra-design-system/core

# Specific build command
npm run build:js --workspace=@orchestra-design-system/core    # Stencil build
npm run build:css --workspace=@orchestra-design-system/core   # CSS build with tokens
```

### Testing Components

Tests go in Storybook stories (see [story-testing](../story-testing/SKILL.md)):

```typescript
// packages/core/src/components/button/button.stories.tsx
import { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent } from '@storybook/test'
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

## Anti-Patterns

| Problem                                   | Issue                     | Fix                                          |
| ----------------------------------------- | ------------------------- | -------------------------------------------- |
| Using hard-coded colors                   | No theme support          | Use design tokens only                       |
| `@Prop` with complex objects              | TypeScript issues         | Use primitives (string, number, boolean)     |
| No keyboard support                       | Inaccessible              | Use `@Listen()` for keyboard events          |
| Missing ARIA attributes                   | Screen readers fail       | Add `aria-label`, `aria-described-by`, roles |
| Shadow DOM for form controls              | Can't associate with form | Use `formAssociated: true, shadow: false`    |
| No focus management                       | Tab order breaks          | Use `delegatesFocus: true` or manual focus   |
| Inline JSX styles                         | Can't use tokens          | Move all styles to CSS file                  |
| Creating new DOM elements with `document` | Breaks reactivity         | Use JSX `render()` method                    |

## Efficiency Tips

When working with LLMs on component development:

- Use targeted requests for specific component types (button, form input, etc.)
- Reference existing component examples instead of pasting full code
- Use [token-optimization](../token-optimization/SKILL.md) to explore component patterns without loading full files
- Store component templates in `/memories/repo/` for reuse

## References

- [token-optimization](../token-optimization/SKILL.md) — Reduce context when building components
- [Stencil Documentation](https://stenciljs.com/)
- [design-tokens](../design-tokens/SKILL.md) — Token structure and theming
- [story-testing](../story-testing/SKILL.md) — Testing in Storybook
- [code-conventions](../code-conventions/SKILL.md) — Naming and TypeScript rules
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Web Components Best Practices](https://webcomponents.dev/)
