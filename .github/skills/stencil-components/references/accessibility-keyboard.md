# Accessibility (ARIA) & Keyboard Navigation

Reference detail for step 5 of [the build procedure](../SKILL.md#procedure-build-a-new-component).

## Essential ARIA Attributes

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

## Common ARIA Patterns

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
