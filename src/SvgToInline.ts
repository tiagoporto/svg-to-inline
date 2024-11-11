import { html, LitElement } from 'lit'
import { state, customElement, property } from 'lit/decorators.js'
import { throttle } from 'throttle-debounce'
import { fetchFile } from './utils/fetchFile.js'
import { convertStringToNode } from './utils/convertStringToNode.js'
import { addClassNames } from './utils/addClassNames.js'

@customElement('svg-to-inline')
export class SvgToInline extends LitElement {
  @state()
  private _svgDOM: string | null = null

  @state()
  private _throttleLazyFetchSVG: (event: Event) => void

  @property()
  path?: string

  @property({ type: Boolean })
  lazy: boolean = false

  @property()
  className: string = ''

  constructor() {
    super()

    this._throttleLazyFetchSVG = throttle(400, this._lazyFetchSVG)
  }

  // Enable external styles
  protected createRenderRoot() {
    return this
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    if (changedProperties.has('path')) {
      this._removeListeners()
      this._init()
    }
  }

  private _addListeners() {
    window.addEventListener('scroll', this._throttleLazyFetchSVG)
    window.addEventListener('resize', this._throttleLazyFetchSVG)
    window.addEventListener('orientationchange', this._throttleLazyFetchSVG)
  }

  private _removeListeners() {
    window.removeEventListener('scroll', this._throttleLazyFetchSVG)
    window.removeEventListener('resize', this._throttleLazyFetchSVG)
    window.removeEventListener('orientationchange', this._throttleLazyFetchSVG)
  }

  private _lazyFetchSVG = () => {
    if (this.offsetTop < window.innerHeight + window.pageYOffset + 300) {
      this._removeListeners()
      this._fetchSVG()
    }
  }

  private async _fetchSVG() {
    if (this.path) {
      const svgString = await fetchFile(this.path)

      this._svgDOM = svgString
    }
  }

  private _init() {
    if (this.lazy) {
      this._addListeners()
      this._lazyFetchSVG()
    } else {
      this._fetchSVG()
    }
  }

  connectedCallback() {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback()

    if (this.path) {
      this._init()
    }
  }

  disconnectedCallback() {
    // eslint-disable-next-line wc/guard-super-call
    super.disconnectedCallback()

    this._removeListeners()
  }

  render() {
    return html`${this._svgDOM
      ? convertStringToNode(addClassNames(this._svgDOM, this.className))
      : html`<slot></slot>`}`
  }
}
