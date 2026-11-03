import {
  AttachInternals,
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'

export type OrchestraInputType =
  'text' | 'email' | 'password' | 'search' | 'tel' | 'url'

@Component({
  tag: 'orchestra-input',
  styleUrl: 'input.css',
  formAssociated: true,
  shadow: { delegatesFocus: true },
})
export class OrchestraInput {
  /** The visible label for the input. */
  @Prop() label?: string

  /** The current value of the input. */
  @Prop({ mutable: true }) value?: string = ''

  /** The kind of single-line text input to render. */
  @Prop() type?: OrchestraInputType = 'text'

  /** The name submitted with the input value. */
  @Prop() name?: string = ''

  /** A short hint shown when the input has no value. */
  @Prop() placeholder?: string

  /** Prevents interaction and excludes the value from form submission. */
  @Prop({ mutable: true, reflect: true }) disabled?: boolean = false

  /** Prevents editing while keeping the value available to form submission. */
  @Prop({ mutable: true, reflect: true, attribute: 'readonly' })
  readOnly?: boolean = false

  /** Requires a value before the associated form can be submitted. */
  @Prop({ mutable: true, reflect: true }) required?: boolean = false

  /** Persistent supporting text shown below the input. */
  @Prop() helperText?: string

  /** Custom validation error shown below the input and used for form validity. */
  @Prop() errorMessage?: string

  /** The input's id, useful when associating an external label. */
  @Prop() htmlId?: string

  /** Autofill hint forwarded to the native input. */
  @Prop() autocomplete?: string

  /** Virtual keyboard hint forwarded to the native input. */
  @Prop({ attribute: 'inputmode' }) inputMode?: HTMLInputElement['inputMode']

  /** Minimum number of characters accepted by the native input. */
  @Prop() minLength?: number

  /** Maximum number of characters accepted by the native input. */
  @Prop() maxLength?: number

  /** Native pattern constraint applied to the input value. */
  @Prop() pattern?: string

  /** Accessible name used when no visible label is provided. */
  @Prop({ attribute: 'aria-label' }) ariaLabel?: string

  /** ID reference(s) for an accessible label. */
  @Prop({ attribute: 'aria-labelledby' }) ariaLabelledby?: string

  /** Additional ID reference(s) describing the input. */
  @Prop({ attribute: 'aria-describedby' }) ariaDescribedby?: string

  /** Emitted for each user edit. The event detail is the current value. */
  @Event({ bubbles: true, composed: true })
  orchestraInput!: EventEmitter<string>

  /** Emitted when the user commits a value change. The event detail is the current value. */
  @Event({ bubbles: true, composed: true })
  orchestraChange!: EventEmitter<string>

  @Element() host!: HTMLElement
  @AttachInternals() internals!: ElementInternals

  #input?: HTMLInputElement
  #defaultValue = ''
  #hasWarnedMissingAccessibleName = false

  @State() invalid = false

  @Watch('value')
  protected valueChanged(): void {
    if (this.#input && this.#input.value !== (this.value ?? '')) {
      this.#input.value = this.value ?? ''
    }
    this.syncFormValue()
    this.syncValidity()
  }

  @Watch('disabled')
  protected disabledChanged(): void {
    this.syncFormValue()
    this.syncValidity()
  }

  @Watch('required')
  protected requiredChanged(): void {
    this.syncValidity()
  }

  @Watch('readOnly')
  protected readOnlyChanged(): void {
    this.syncValidity()
  }

  @Watch('errorMessage')
  protected errorMessageChanged(): void {
    this.syncValidity()
  }

  public componentDidLoad(): void {
    this.#defaultValue = this.value ?? ''
    this.syncFormValue()
    this.syncValidity()
    this.warnIfMissingAccessibleName()
  }

  public componentDidRender(): void {
    this.warnIfMissingAccessibleName()
  }

  public formResetCallback(): void {
    this.value = this.#defaultValue
  }

  public formStateRestoreCallback(
    state: string | File | FormData | null,
  ): void {
    if (typeof state === 'string') {
      this.value = state
    }
  }

  @Listen('invalid')
  protected handleInvalid(): void {
    this.invalid = !(this.disabled ?? false) && !(this.readOnly ?? false)
  }

  private handleInput = (event: Event): void => {
    const input = event.currentTarget as HTMLInputElement
    this.value = input.value
    this.syncFormValue()
    this.syncValidity()
    this.orchestraInput.emit(this.value ?? '')
  }

  private handleChange = (event: Event): void => {
    const input = event.currentTarget as HTMLInputElement
    this.value = input.value
    this.syncFormValue()
    this.syncValidity()
    this.orchestraChange.emit(this.value ?? '')
  }

  /** Checks whether the input satisfies its constraints. */
  @Method()
  public async checkValidity(): Promise<boolean> {
    return this.internals.checkValidity()
  }

  /** Reports validity and prompts the browser to show its validation UI. */
  @Method()
  public async reportValidity(): Promise<boolean> {
    return this.internals.reportValidity()
  }

  /** Sets a custom validation message. Pass an empty string to clear it. */
  @Method()
  public async setCustomValidity(message: string): Promise<void> {
    this.errorMessage = message
  }

  private syncFormValue(): void {
    const formValue = this.disabled ? null : (this.value ?? '')
    this.internals.setFormValue(formValue, this.value ?? '')
  }

  private syncValidity(): void {
    const input = this.#input
    if (!input) {
      return
    }

    input.setCustomValidity(this.errorMessage?.trim() ?? '')
    if (this.disabled || this.readOnly) {
      this.internals.setValidity({})
      this.invalid = false
      return
    }

    const validity = input.validity
    if (validity.valid) {
      this.internals.setValidity({})
      this.invalid = false
      return
    }

    this.internals.setValidity(
      {
        badInput: validity.badInput,
        customError: validity.customError,
        patternMismatch: validity.patternMismatch,
        rangeOverflow: validity.rangeOverflow,
        rangeUnderflow: validity.rangeUnderflow,
        stepMismatch: validity.stepMismatch,
        tooLong: validity.tooLong,
        tooShort: validity.tooShort,
        typeMismatch: validity.typeMismatch,
        valueMissing: validity.valueMissing,
      },
      input.validationMessage,
      input,
    )
    this.invalid = Boolean(this.errorMessage?.trim()) || input.value.length > 0
  }

  private warnIfMissingAccessibleName(): void {
    if (
      this.#hasWarnedMissingAccessibleName ||
      this.label?.trim() ||
      this.ariaLabel?.trim() ||
      this.ariaLabelledby?.trim()
    ) {
      return
    }

    console.warn(
      '[orchestra-input] Missing accessible name. Provide a label, aria-label, or aria-labelledby.',
      this.host,
    )
    this.#hasWarnedMissingAccessibleName = true
  }

  render() {
    const description = this.errorMessage?.trim() || this.helperText?.trim()
    const descriptionId = 'orchestra-input-description'
    const describedBy = [
      this.ariaDescribedby?.trim(),
      description ? descriptionId : undefined,
    ]
      .filter(Boolean)
      .join(' ')

    const input = (
      <input
        id={this.htmlId}
        class="orchestra-input-control"
        type={this.type ?? 'text'}
        name={this.name}
        value={this.value ?? ''}
        placeholder={this.placeholder}
        disabled={this.disabled}
        readOnly={this.readOnly}
        required={this.required}
        autoComplete={this.autocomplete}
        inputMode={this.inputMode}
        minLength={this.minLength}
        maxLength={this.maxLength}
        pattern={this.pattern}
        aria-label={this.ariaLabel}
        aria-labelledby={this.ariaLabelledby}
        aria-describedby={describedBy || undefined}
        aria-invalid={this.invalid ? 'true' : undefined}
        ref={this.inputRef}
        onInput={this.handleInput}
        onChange={this.handleChange}
      />
    )

    return (
      <Host data-invalid={this.invalid}>
        <div class="orchestra-input-field">
          {this.label ? (
            <label class="orchestra-input-label">
              <span>{this.label}</span>
              {input}
            </label>
          ) : (
            input
          )}
          {description && (
            <div
              id={descriptionId}
              class={`orchestra-input-description${this.errorMessage?.trim() ? ' orchestra-input-description--error' : ''}`}
              aria-live={this.errorMessage?.trim() ? 'polite' : undefined}
            >
              {description}
            </div>
          )}
        </div>
      </Host>
    )
  }

  readonly inputRef = (input?: HTMLInputElement): void => {
    this.#input = input
  }
}
