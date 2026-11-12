# Component Lifecycle: Props, Events, Watchers, Listeners

Reference detail for step 3 of [the build procedure](../SKILL.md#procedure-build-a-new-component).

## Native Web API Compatibility

**For form elements** (button, checkbox, radio, input), always:

- ✅ Use `formAssociated: true` to participate in form submission
- ✅ Proxy native element properties: `checked`, `value`, `disabled`, `required`, `name`
- ✅ Emit events that align with native behavior (even if using custom names for framework compatibility)
- ✅ Support standard HTML attributes and properties
- ✅ Use shadow DOM with `delegatesFocus: true` for form elements (see the checkbox component)
- ✅ Leverage native validation APIs when available

**Event Naming**:

- For better framework compatibility, use custom prefixed event names (e.g., `orchestraChange` instead of `change`)
- The custom event wrapper still carries native event behavior and proper typing
- Consumers can still react to standard input element events if needed

**Example - Native Checkbox Pattern**:

```typescript
@Component({
  tag: 'orchestra-checkbox',
  styleUrl: 'checkbox.css',
  formAssociated: true,
  shadow: { delegatesFocus: true }, // Focus delegates to internal input
})
export class OrchestraCheckbox {
  // Native checkbox properties
  @Prop({ mutable: true }) checked?: boolean = false
  @Prop() value?: string = 'on'
  @Prop({ mutable: true }) disabled?: boolean = false
  @Prop() required?: boolean = false
  @Prop() name?: string = ''

  // Custom event for framework compatibility
  @Event({ bubbles: true, composed: true })
  orchestraChange!: EventEmitter<boolean>

  private handleChange(e: Event) {
    const input = e.target as HTMLInputElement
    this.checked = input.checked
    this.orchestraChange.emit(this.checked) // Emit event with clean payload
  }
}
```

## Props (Inputs)

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
  @Prop() variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  // Content
  @Prop() text!: string;
  @Prop() icon: 'only' | 'start' | 'end' | 'none' = 'none';
  @Prop() iconName?: string;
  @Prop() iconLibrary: string = 'orchestra-icons';

  // State
  @Prop({ mutable: true }) disabled: boolean = false;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  // Headless hooks: parts for structure, data-* for state. No classes.
  render() {
    return (
      <button
        part="button"
        type={this.type}
        disabled={this.disabled}
        data-variant={this.variant}
        data-size={this.size}
        data-icon={this.icon}
        data-disabled={this.disabled ? '' : undefined}
      >
        <span part="label">{this.text}</span>
      </button>
    );
  }
}
```

For customer-facing states, emit events (see Events below) instead of callback props. Consumers style with `orchestra-button::part(button)` and `[data-variant]`.

## Events (Outputs)

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

## Watchers (React to Prop Changes)

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

## Listeners (Event Handlers)

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
