import { Component, Element, Host, Prop, State, Watch, h } from '@stencil/core'

import DOMPurify from 'dompurify'
import { getIconLibrary } from './library'

const cache: Record<string, string> = {}

@Component({
  tag: 'orchestra-icon',
  shadow: true,
  styleUrl: 'icon.css',
})
export class OrchestraIcon {
  /**
   * The name of the icon to display. Resolves using registered icon libraries.
   */
  @Prop({ mutable: true }) name!: string
  /**
   * The name of the icon library to use. Defaults to 'core'.
   */
  @Prop({ mutable: true }) library: string = 'core'
  /**
   * Taking the currentcolor (inherited color of the font) by default, except if specified.
   */
  @Prop({ mutable: true }) fill?: string | 'currentcolor' = 'currentcolor'
  /**
   * Taking the size of the parent element by default, except if specified.
   */
  @Prop({ mutable: true }) size?: string | '100%' = '100%'

  @State() svg: string = ''

  @Element() host!: SVGElement

  protected resolveIcon(iconLibrary: string, name: string): string {
    if (!name) return ''
    if (cache[`${iconLibrary}:${name}`]) {
      return cache[`${iconLibrary}:${name}`]
    }

    const lib = getIconLibrary(iconLibrary)
    if (!lib) {
      console.warn(`❌ Icon library "${iconLibrary}" not found`)
      return ''
    }

    console.log(`✅ Icon library "${iconLibrary}" found, resolving "${name}"`)
    const svg = lib.resolver(name)
    if (svg) {
      cache[`${iconLibrary}:${name}`] = svg
    }
    return svg
  }

  protected getSvg(name: string): void {
    this.svg = this.resolveIcon(this.library, name)
  }

  protected loadIcon(icon: string): void {
    if (!this.name || this.name === '' || this.name === 'undefined') return
    console.log(`🎨 loadIcon called: name="${this.name}", library="${this.library}", fill="${this.fill}", size="${this.size}"`)
    try {
      this.getSvg(icon)
      this.sanitizeSVG()
      const isNotDefaultColor = this.fill !== 'currentcolor'
      const isNotDefaultSize = this.size !== '100%'
      this.host.setAttribute('aria-hidden', 'true')
      // Set CSS variables on the host element, not the SVG
      if (isNotDefaultColor) {
        this.host.style.setProperty('--icon-color', `${this.fill}`)
      }
      if (isNotDefaultSize) {
        this.host.style.setProperty('--icon-size', `${this.size}`)
      }
      if (this.host.shadowRoot) {
        this.host.shadowRoot.querySelector('svg')?.classList.add('orchestra-icon')
      }
    } catch (error) {
      console.error('Error loading SVG:', error)
    }
  }

  @Watch('name')
  protected handleNameChange(newValue: string): void {
    this.svg = this.resolveIcon(this.library, newValue)
    this.loadIcon(newValue)
  }

  @Watch('library')
  protected handleLibraryChange(): void {
    this.loadIcon(this.name)
  }

  @Watch('fill')
  protected handleFillChange(): void {
    const isNotDefaultColor = this.fill !== 'currentcolor'
    if (isNotDefaultColor) {
      this.host.style.setProperty('--icon-color', `${this.fill}`)
    } else {
      this.host.style.removeProperty('--icon-color')
    }
  }

  @Watch('size')
  protected handleSizeChange(): void {
    const isNotDefaultSize = this.size !== '100%'
    if (isNotDefaultSize) {
      this.host.style.setProperty('--icon-size', `${this.size}`)
    } else {
      this.host.style.removeProperty('--icon-size')
    }
  }

  public componentWillLoad(): void {
    this.handleNameChange(this.name)
    this.handleFillChange()
    this.handleSizeChange()
  }

  public componentDidLoad(): void {
    this.sanitizeSVG()
  }

  public render() {
    return (
      <Host></Host>
    )
  }

  /**
   * Sanitize svg element and allow only svg tags to be written
   */
  public sanitizeSVG(): void {
    console.log(`🧹 sanitizeSVG called, this.svg: "${this.svg}"`)
    if (!this.svg) {
      console.warn(`⚠️ No SVG to render`)
      return
    }
    if (!this.host.shadowRoot) {
      console.warn(`⚠️ No shadowRoot available`)
      return
    }
    const sanitized = DOMPurify.sanitize(this.svg, { USE_PROFILES: { svg: true, svgFilters: true } })
    console.log(`🧹 DOMPurify result: "${sanitized}"`)
    this.host.shadowRoot.innerHTML = sanitized
    console.log(`✨ shadowRoot.innerHTML set to: "${this.host.shadowRoot.innerHTML}"`)
  }
}
