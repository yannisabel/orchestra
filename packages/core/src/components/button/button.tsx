import { Component, h, Prop, Element, Listen, Watch, Host } from '@stencil/core'
import { invariant } from '../../helpers'

const preventDefault = (event: KeyboardEvent | MouseEvent): void => {
  event.preventDefault()
}

/**
 * @slot - Button content, such as a label or an icon.
 * @part button - The native button element. Carries `data-variant`, `data-size` and `data-disabled` state hooks.
 */
@Component({
  tag: 'orchestra-button',
  styleUrl: 'button.css',
  formAssociated: true,
  shadow: { delegatesFocus: true },
})
export class OrchestraButton {
  /**
   * A string indicating the behavior of the button. It relies on `HTMLButtonElement['type']`
   */
  @Prop() type?: HTMLButtonElement['type'] = 'button'
  /**
   * A string indicating the design variation of the button based on the level of importance.
   */
  @Prop() variant?: 'primary' | 'secondary' | 'tertiary' = 'primary'
  /**
   * A boolean indicating the disable state of the button. The `aria-disabled` attribute relies on this property.
   */
  @Prop({ mutable: true }) disabled?: boolean = false

  /**
   * A string indicating the size variation of the button.
   */
  @Prop({ mutable: true }) size?: 'small' | 'medium' | 'large' = 'medium'

  @Element() host!: HTMLButtonElement

  #button?: HTMLButtonElement

  /**
   * Handle the click event on the button.
   */
  @Listen('click')
  protected onClick(event: MouseEvent): void {
    if (this.disabled) {
      event.stopImmediatePropagation()
      return
    }
    event.preventDefault()
  }

  @Watch('disabled')
  protected disabledChanged(): void {
    invariant(this.#button)

    this.#button.tabIndex = this.disabled ? -1 : 0
    this.#button.ariaDisabled = this.disabled ? 'true' : null
    this.#button.disabled = this.disabled ?? false
  }

  public componentDidLoad(): void {
    invariant(this.#button)
    this.#button.type = this.type ?? 'button'
    this.disabledChanged()
  }

  render() {
    return (
      <Host
        data-variant={this.variant}
        data-size={this.size}
        data-disabled={this.disabled ? '' : undefined}
      >
        <button
          part="button"
          type={this.type}
          ref={this.#buttonRef}
          disabled={this.disabled}
          onClick={this.#onClick}
        >
          <slot />
        </button>
      </Host>
    )
  }

  readonly #buttonRef = (button?: HTMLButtonElement): void => {
    this.#button = button
  }

  readonly #onClick = (event: MouseEvent): void => {
    if (this.disabled) {
      preventDefault(event)
      event.stopImmediatePropagation()
    }
  }
}
