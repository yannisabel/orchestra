import {
  AttachInternals,
  Component,
  h,
  Prop,
  Element,
  Watch,
  Host,
  Event,
  EventEmitter,
  Method,
  State,
} from '@stencil/core'
import { invariant } from '../../helpers'

export interface CheckboxChangeDetail {
  checked: boolean
  indeterminate: boolean
  name: string
  value: string
}

@Component({
  tag: 'orchestra-checkbox',
  styleUrl: 'checkbox.css',
  formAssociated: true,
  shadow: { delegatesFocus: true },
})
export class OrchestraCheckbox {
  /**
   * A boolean indicating the checked state of the checkbox.
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) checked?: boolean = false

  /**
   * A boolean indicating the indeterminate state of the checkbox (shows a dash/minus sign).
   * This is part of the native HTML checkbox API for mixed/partial selection states.
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) indeterminate?: boolean = false

  /**
   * A boolean indicating the disable state of the checkbox.
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) disabled?: boolean = false

  /**
   * A string representing the name of the checkbox for form submission.
   */
  @Prop() name?: string = ''

  /**
   * A string representing the value of the checkbox for form submission.
   * @default 'on'
   */
  @Prop() value?: string = 'on'

  /**
   * A boolean indicating whether the field is required.
   * @default false
   */
  @Prop() required?: boolean = false

  /**
   * Optional custom validity message. When set to a non-empty string, the field is invalid.
   */
  @Prop() validationMessage?: string = ''

  /**
   * The unique identifier for the checkbox input. Used to associate with external label elements.
   */
  @Prop() htmlId?: string

  /**
   * Optional visible label text displayed next to the checkbox.
   */
  @Prop() label?: string

  /**
   * Accessible label for screen readers when no visible label is associated.
   */
  @Prop({ attribute: 'aria-label' }) ariaLabel?: string

  /**
   * ID reference(s) to element(s) that label this checkbox.
   */
  @Prop({ attribute: 'aria-labelledby' }) ariaLabelledby?: string

  /**
   * ID reference(s) to element(s) that describe this checkbox.
   */
  @Prop({ attribute: 'aria-describedby' }) ariaDescribedby?: string

  /**
   * Native change event - emitted when checkbox state changes.
   */
  @Event({ bubbles: true, composed: true })
  orchestraChange!: EventEmitter<boolean>

  /**
   * Rich state change payload for consumers that need full checkbox context.
   */
  @Event({ bubbles: true, composed: true })
  orchestraStateChange!: EventEmitter<CheckboxChangeDetail>

  @Element() host!: HTMLElement
  @AttachInternals() internals!: ElementInternals

  #checkbox?: HTMLInputElement
  #hasWarnedMissingAccessibleName = false
  #defaultChecked = false
  #defaultIndeterminate = false
  @State() invalid = false

  /**
   * Sync property changes to internal input.
   */
  @Watch('checked')
  protected checkedChanged(): void {
    invariant(this.#checkbox)
    this.#checkbox.checked = this.checked ?? false
    this.syncFormValue()
    this.syncValidity()
  }

  @Watch('indeterminate')
  protected indeterminateChanged(): void {
    invariant(this.#checkbox)
    this.#checkbox.indeterminate = this.indeterminate ?? false
    this.syncFormValue()
  }

  @Watch('disabled')
  protected disabledChanged(): void {
    invariant(this.#checkbox)
    this.#checkbox.disabled = this.disabled ?? false
    this.syncValidity()
  }

  @Watch('required')
  protected requiredChanged(): void {
    invariant(this.#checkbox)
    this.#checkbox.required = this.required ?? false
    this.syncValidity()
  }

  @Watch('value')
  protected valueChanged(): void {
    invariant(this.#checkbox)
    this.#checkbox.value = this.value ?? 'on'
    this.syncFormValue()
  }

  @Watch('name')
  protected nameChanged(): void {
    invariant(this.#checkbox)
    this.#checkbox.name = this.name ?? ''
  }

  @Watch('validationMessage')
  protected validationMessageChanged(): void {
    this.syncValidity()
  }

  public componentDidLoad(): void {
    invariant(this.#checkbox)
    this.#checkbox.type = 'checkbox'
    this.#defaultChecked = this.checked ?? false
    this.#defaultIndeterminate = this.indeterminate ?? false
    this.nameChanged()
    this.valueChanged()
    this.disabledChanged()
    this.requiredChanged()
    this.checkedChanged()
    this.indeterminateChanged()
    this.syncFormValue()
    this.syncValidity()
    this.warnIfMissingAccessibleName()
  }

  public componentDidRender(): void {
    this.warnIfMissingAccessibleName()
  }

  public formResetCallback(): void {
    this.checked = this.#defaultChecked
    this.indeterminate = this.#defaultIndeterminate
  }

  public formStateRestoreCallback(
    state: string | File | FormData | null,
  ): void {
    if (typeof state !== 'string') {
      return
    }

    try {
      const parsed = JSON.parse(state) as {
        checked?: boolean
        indeterminate?: boolean
      }
      this.checked = Boolean(parsed.checked)
      this.indeterminate = Boolean(parsed.indeterminate)
    } catch {
      // Keep defaults when restoration payload is not parseable.
    }
  }

  /**
   * Internal change handler - sync back to property and emit change event.
   */
  private handleChange = (e: Event): void => {
    const input = e.target as HTMLInputElement
    const wasIndeterminate = this.indeterminate ?? false

    // Keep a deterministic state cycle: mixed -> checked -> unchecked.
    if (wasIndeterminate) {
      this.checked = true
      this.indeterminate = false
    } else {
      this.checked = input.checked
      this.indeterminate = false
    }

    this.orchestraChange.emit(this.checked ?? false)
    this.orchestraStateChange.emit({
      checked: this.checked ?? false,
      indeterminate: this.indeterminate ?? false,
      name: this.name ?? '',
      value: this.value ?? 'on',
    })
  }

  /**
   * Checks whether the checkbox satisfies all constraints.
   */
  @Method()
  public async checkValidity(): Promise<boolean> {
    return this.internals.checkValidity()
  }

  /**
   * Reports validity and prompts the browser to show the validation UI.
   */
  @Method()
  public async reportValidity(): Promise<boolean> {
    return this.internals.reportValidity()
  }

  /**
   * Sets a custom validity message. Pass an empty string to clear custom errors.
   */
  @Method()
  public async setCustomValidity(message: string): Promise<void> {
    this.validationMessage = message
  }

  private warnIfMissingAccessibleName(): void {
    if (this.#hasWarnedMissingAccessibleName) {
      return
    }

    if (this.hasAccessibleName()) {
      return
    }

    console.warn(
      '[orchestra-checkbox] Missing accessible name. Provide a linked <label>, aria-label, or aria-labelledby.',
      this.host,
    )
    this.#hasWarnedMissingAccessibleName = true
  }

  private hasAccessibleName(): boolean {
    if (this.ariaLabel?.trim() || this.ariaLabelledby?.trim()) {
      return true
    }

    if (this.host.closest('label')) {
      return true
    }

    const id = this.htmlId?.trim()
    if (!id) {
      return false
    }

    const escapedId =
      typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
        ? CSS.escape(id)
        : id.replace(/"/g, '\\"')

    return document.querySelector(`label[for="${escapedId}"]`) !== null
  }

  private syncFormValue(): void {
    const shouldSubmitValue =
      (this.checked ?? false) && !(this.disabled ?? false)
    const submitValue = shouldSubmitValue ? (this.value ?? 'on') : null
    const state = JSON.stringify({
      checked: this.checked ?? false,
      indeterminate: this.indeterminate ?? false,
    })
    this.internals.setFormValue(submitValue, state)
  }

  private syncValidity(): void {
    const customMessage = this.validationMessage?.trim() ?? ''
    const isRequiredMissing =
      (this.required ?? false) &&
      !(this.checked ?? false) &&
      !(this.disabled ?? false)

    if (customMessage) {
      this.internals.setValidity(
        { customError: true },
        customMessage,
        this.#checkbox,
      )
      this.invalid = true
      return
    }

    if (isRequiredMissing) {
      this.internals.setValidity(
        { valueMissing: true },
        'Please check this box if you want to proceed.',
        this.#checkbox,
      )
      this.invalid = true
      return
    }

    this.internals.setValidity({})
    this.invalid = false
  }

  private handleLabelClick = (e: Event): void => {
    e.preventDefault()
    if (!(this.disabled ?? false)) {
      this.checked = !(this.checked ?? false)
    }
  }

  render() {
    const showIndicator =
      (this.checked ?? false) || (this.indeterminate ?? false)
    const indicatorName = this.indeterminate
      ? 'checkbox-indeterminate'
      : 'checkbox-check'

    return (
      <Host data-indeterminate={this.indeterminate} data-invalid={this.invalid}>
        <div class="orchestra-checkbox-wrapper">
          <input
            id={this.htmlId}
            class="orchestra-checkbox"
            type="checkbox"
            aria-label={this.ariaLabel}
            aria-labelledby={this.ariaLabelledby}
            aria-describedby={this.ariaDescribedby}
            aria-invalid={this.invalid ? 'true' : undefined}
            ref={this.#checkboxRef}
            onChange={this.handleChange}
          />
          <span class="orchestra-checkbox-visual">
            {showIndicator && (
              <orchestra-icon
                class="orchestra-checkbox-icon"
                name={indicatorName}
                library="orchestra-icons"
                fill="currentcolor"
                size="0.625rem"
              ></orchestra-icon>
            )}
          </span>
          {this.label && (
            <label
              class="orchestra-checkbox-label"
              onClick={this.handleLabelClick}
            >
              {this.label}
            </label>
          )}
        </div>
        {this.invalid && (
          <div class="orchestra-checkbox-error-container">
            <slot name="error"></slot>
          </div>
        )}
      </Host>
    )
  }

  readonly #checkboxRef = (checkbox?: HTMLInputElement): void => {
    this.#checkbox = checkbox
  }
}
