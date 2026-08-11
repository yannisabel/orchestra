import {
  Component,
  h,
  Prop,
  Element,
  Watch,
  Host,
  Event,
  EventEmitter,
} from '@stencil/core'
import { invariant } from '../../helpers'

interface CheckboxChangeDetail {
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
  @Prop({ mutable: true }) checked?: boolean = false

  /**
   * A boolean indicating the indeterminate state of the checkbox (shows a dash/minus sign).
   * This is part of the native HTML checkbox API for mixed/partial selection states.
   * @default false
   */
  @Prop({ mutable: true }) indeterminate?: boolean = false

  /**
   * A boolean indicating the disable state of the checkbox.
   * @default false
   */
  @Prop({ mutable: true }) disabled?: boolean = false

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
   * The unique identifier for the checkbox input. Used to associate with external label elements.
   */
  @Prop() htmlId?: string

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

  @Element() host!: HTMLInputElement

  #checkbox?: HTMLInputElement
  #hasWarnedMissingAccessibleName = false

  /**
   * Sync property changes to internal input.
   */
  @Watch('checked')
  protected checkedChanged(): void {
    invariant(this.#checkbox)
    this.#checkbox.checked = this.checked ?? false
  }

  @Watch('indeterminate')
  protected indeterminateChanged(): void {
    invariant(this.#checkbox)
    this.#checkbox.indeterminate = this.indeterminate ?? false
  }

  @Watch('disabled')
  protected disabledChanged(): void {
    invariant(this.#checkbox)
    this.#checkbox.disabled = this.disabled ?? false
  }

  @Watch('required')
  protected requiredChanged(): void {
    invariant(this.#checkbox)
    this.#checkbox.required = this.required ?? false
  }

  public componentDidLoad(): void {
    invariant(this.#checkbox)
    this.#checkbox.type = 'checkbox'
    this.#checkbox.name = this.name ?? ''
    this.#checkbox.value = this.value ?? 'on'
    this.disabledChanged()
    this.requiredChanged()
    this.checkedChanged()
    this.indeterminateChanged()
    this.warnIfMissingAccessibleName()
  }

  public componentDidRender(): void {
    this.warnIfMissingAccessibleName()
  }

  /**
   * Internal change handler - sync back to property and emit change event.
   */
  private handleChange = (e: Event): void => {
    const input = e.target as HTMLInputElement
    this.checked = input.checked
    this.indeterminate = input.indeterminate
    this.orchestraChange.emit(this.checked ?? false)
    this.orchestraStateChange.emit({
      checked: this.checked ?? false,
      indeterminate: this.indeterminate ?? false,
      name: this.name ?? '',
      value: this.value ?? 'on',
    })
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

  render() {
    const showIndicator =
      (this.checked ?? false) || (this.indeterminate ?? false)
    const indicatorName = this.indeterminate
      ? 'checkbox-indeterminate'
      : 'checkbox-check'

    return (
      <Host data-indeterminate={this.indeterminate}>
        <input
          id={this.htmlId}
          class="orchestra-checkbox"
          type="checkbox"
          aria-label={this.ariaLabel}
          aria-labelledby={this.ariaLabelledby}
          aria-describedby={this.ariaDescribedby}
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
      </Host>
    )
  }

  readonly #checkboxRef = (checkbox?: HTMLInputElement): void => {
    this.#checkbox = checkbox
  }
}
