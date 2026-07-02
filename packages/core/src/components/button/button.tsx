import { Component, h, Prop, Element, Listen, Watch, Host } from '@stencil/core'
import { invariant } from '../../helpers'

const preventDefault = (event: KeyboardEvent | MouseEvent): void => {
  event.preventDefault()
}

@Component({
  tag: 'orchestra-button',
  styleUrl: 'button.css',
  formAssociated: true,
  shadow: { delegatesFocus: true },
})
export class OrchestraButton {
  /**
   * This is the text which appear inside the button. It is required.
   */
  @Prop() text!: string
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
  /**
   * It allows to render the chosen icon.
   *
   * The icon render only if `iconName` and `iconPosition` are defined.
   */
  @Prop({ mutable: true }) icon?: 'only' | 'start' | 'end' | 'none' = 'none'
  /**
   * The name of the icon library used by the button icon. Defaults to 'orchestra-icons'.
   * Consumers can override this when they register another icon library.
   *
   * The icon render only if `iconName` and `iconPosition` are defined.
   */
  @Prop({ mutable: true }) iconName?: string = undefined
  /**
   * The name of the icon library used by the button icons.
   */
  @Prop({ mutable: true }) iconLibrary?: string = 'orchestra-icons'

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

  @Listen('keydown')
  protected onKeydown(event: KeyboardEvent): void {
    invariant(this.#button)
    if (event.key === 'Enter') {
      this.#button.click()
    }
  }

  @Listen('keyup')
  protected onKeyup(event: KeyboardEvent): void {
    invariant(this.#button)
    if (event.key === ' ') this.#button.click()
  }

  @Watch('disabled')
  protected disabledChanged(): void {
    invariant(this.#button)

    if (this.disabled) {
      this.#button.tabIndex = -1
      this.#button.ariaDisabled = this.disabled ? 'true' : null
      this.#button.disabled = this.disabled
    }
  }

  public componentDidLoad(): void {
    invariant(this.#button)
    this.#button.type = this.type ?? 'button'
    this.disabledChanged()
  }

  render() {
    return (
      <Host>
        <button
          class={`orchestra-button orchestra-button--${this.variant} orchestra-button--${this.size}`}
          type={this.type}
          ref={this.#buttonRef}
          disabled={this.disabled}
          aria-label={this.#getAriaLabel()}
          data-icon={this.icon}
          onClick={this.#onClick}
        >
          {this.iconName && (this.icon === 'start' || this.icon === 'only') && (
            <orchestra-icon
              name={this.iconName}
              library={this.iconLibrary}
            ></orchestra-icon>
          )}
          {this.#hasTextDisplayed() && (
            <span class="orchestra-overflow">{this.text}</span>
          )}
          {this.iconName && this.icon === 'end' && (
            <orchestra-icon
              name={this.iconName}
              library={this.iconLibrary}
            ></orchestra-icon>
          )}
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

  readonly #hasTextDisplayed = () => {
    return this.icon === 'start' || this.icon === 'end' || this.icon === 'none'
  }

  readonly #getAriaLabel = (): string | undefined => {
    if (this.icon === 'only') {
      return this.text
    }

    return undefined
  }
}
