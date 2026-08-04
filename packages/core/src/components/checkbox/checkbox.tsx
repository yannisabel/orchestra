import { Component, h, Prop, Element, Listen, Watch, Host, Event, EventEmitter } from '@stencil/core'
import { invariant } from '../../helpers'

@Component({
  tag: 'orchestra-checkbox',
  styleUrl: 'checkbox.css',
  formAssociated: true,
  shadow: { delegatesFocus: true },
})
export class OrchestraCheckbox {
  /**
   * A string indicating the design variation of the checkbox based on the level of importance.
   * @default 'primary'
   */
  @Prop() variant?: 'primary' | 'secondary' = 'primary'

  /**
   * A boolean indicating the checked state of the checkbox.
   * @default false
   */
  @Prop({ mutable: true }) checked?: boolean = false

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
   * Native change event - emitted when checkbox state changes.
   */
  @Event({ bubbles: true, composed: true }) orchestraChange!: EventEmitter<boolean>

  @Element() host!: HTMLInputElement

  #checkbox?: HTMLInputElement

  /**
   * Forward click events to the internal input.
   */
  @Listen('click')
  protected onClick(event: MouseEvent): void {
    if (this.disabled) {
      event.stopImmediatePropagation()
      return
    }
    if (this.#checkbox) {
      this.#checkbox.click()
    }
  }

  @Listen('keydown')
  protected onKeydown(event: KeyboardEvent): void {
    // Space toggles checkbox (browser handles this natively when input is focused)
    if (event.key === ' ' && this.#checkbox) {
      event.preventDefault()
      this.#checkbox.click()
    }
  }

  /**
   * Sync property changes to internal input.
   */
  @Watch('checked')
  protected checkedChanged(): void {
    invariant(this.#checkbox)
    this.#checkbox.checked = this.checked ?? false
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
  }

  /**
   * Internal change handler - sync back to property and emit change event.
   */
  private handleChange = (e: Event): void => {
    const input = e.target as HTMLInputElement
    this.checked = input.checked
    this.orchestraChange.emit(this.checked ?? false)
  }

  render() {
    return (
      <Host>
        <input
          class={`orchestra-checkbox orchestra-checkbox--${this.variant}`}
          type="checkbox"
          ref={this.#checkboxRef}
          onChange={this.handleChange}
          aria-checked={this.checked ? 'true' : 'false'}
        />
        <span class="orchestra-checkbox-visual"></span>
      </Host>
    )
  }

  readonly #checkboxRef = (checkbox?: HTMLInputElement): void => {
    this.#checkbox = checkbox
  }
}
