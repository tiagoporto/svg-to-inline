import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('svg-to-inline')
export class SvgToInline extends LitElement {
  @property()
  // SVG path
  path?: string = undefined

  protected render() {
    return html`<div>Loading...</div>`
  }
}
