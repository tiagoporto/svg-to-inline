import { html, LitElement } from 'lit'
import { state, customElement, property } from 'lit/decorators.js'
import { throttle } from 'throttle-debounce'
import { fetchFile } from './utils/fetchFile.js'
import { convertStringToNode } from './utils/convertStringToNode.js'
import { addClassNames } from './utils/addClassNames.js'

@customElement('svg-to-inline')
export class SvgToInline extends LitElement {
  @state()
  private svgDOM: Node | null = null

  @state()
  private throttleLazyFetchSVG: (event: Event) => void

  // SVG path
  @property()
  path?: string

  @property({ type: Boolean })
  // Enable Lazy load SVG
  // SVG will be loaded only when it enters the viewport
  lazy: boolean = false

  @property()
  className: string = ''

  private _addListeners() {
    window.addEventListener('scroll', this.throttleLazyFetchSVG)
    window.addEventListener('resize', this.throttleLazyFetchSVG)
    window.addEventListener('orientationchange', this.throttleLazyFetchSVG)
  }

  private _removeListeners() {
    window.removeEventListener('scroll', this.throttleLazyFetchSVG)
    window.removeEventListener('resize', this.throttleLazyFetchSVG)
    window.removeEventListener('orientationchange', this.throttleLazyFetchSVG)
  }

  private _lazyFetchSVG = () => {
    if (this.offsetTop < window.innerHeight + window.pageYOffset + 300) {
      this._removeListeners()
      this._fetchSVG()
    }
  }

  // Enable external styles
  protected createRenderRoot() {
    return this
  }

  private async _fetchSVG() {
    if (this.path) {
      let svgString = await fetchFile(this.path)

      svgString = addClassNames(svgString, this.className)
      this.svgDOM = convertStringToNode(svgString)
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

  constructor() {
    super()

    this.throttleLazyFetchSVG = throttle(400, this._lazyFetchSVG)
  }

  render() {
    return html`${this.svgDOM ? this.svgDOM : html`<slot></slot>`}`
  }
}
