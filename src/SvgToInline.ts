import { html, LitElement } from 'lit'
import type { TemplateResult } from 'lit'
import { state, property } from 'lit/decorators.js'
import { throttle } from 'throttle-debounce'
import { fetchFile } from './utils/fetchFile.js'
import { convertStringToNode } from './utils/convertStringToNode.js'
import { addClassNames } from './utils/addClassNames.js'

export class SvgToInline extends LitElement {
  @state()
  private _svgDOM: string | null = null

  @state()
  private _statusElement?: TemplateResult | string | null

  @state()
  private _throttleLazyFetchSVG: (event: Event) => void

  @property({ type: String })
  path = ''

  @property({ type: String })
  className = ''

  @property()
  loading?: TemplateResult | string

  @property()
  placeholder?: TemplateResult | string

  @property({ type: Boolean })
  lazy = false

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
      if (this.loading) {
        this._statusElement = this.loading
      }
      const svgString = await fetchFile(this.path)

      if (svgString) {
        this._svgDOM = svgString
      } else {
        this._svgDOM = null
        this._statusElement = this.placeholder
      }
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
    return html`${
      this._svgDOM
        ? convertStringToNode(addClassNames(this._svgDOM, this.className))
        : this._statusElement
    }`
  }
}
