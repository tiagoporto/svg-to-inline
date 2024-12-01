import { SvgToInline } from './SvgToInline.js'

customElements.define('svg-to-inline', SvgToInline)

declare global {
  interface HTMLElementTagNameMap {
    'svg-to-inline': SvgToInline
  }
}
