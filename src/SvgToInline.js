/* eslint-disable */
import 'whatwg-fetch'
import { html, css, LitElement, svg } from 'lit-element'
import { throttle } from 'throttle-debounce'

export default class SvgToInline extends LitElement {
  static get properties() {
    return {
      path: { type: String },
      placeholder: { type: Boolean },
      lazy: { type: Boolean },
      'class-name': { type: String },
      svgDOM: { type: String },
      'loading-Label': { type: String },
    }
  }

  createRenderRoot() {
    return this
  }

  extractClassNames(svg) {
    let element = svg

    if (!svg.match(/<svg[\w\s\t\n:="\\'/.#-]+ class="(.*?)"/)) {
      element = svg.replace(/(<svg[\w\s\t\n:="\\'/.#-]+)/, '$1 class=" "')
    }

    const svgClass =
      element.match(/<svg[\w\s\t\n:="\\'/.#-]+ class="(.*?)"/) &&
      element.match(/class="(.*?)"/)[1].split(' ')
    const classToAdd =
      (this['class-name'] && this['class-name'].split(' ')) || []
    const allClasses = [...svgClass, ...classToAdd].filter(
      (classname) => classname,
    )
    const newClasses = [...new Set(allClasses)].join(' ')

    return element.replace(
      /(<svg[\w\s\t\n:="\\'/.#-]+) class="[\w\s-_]+?"/,
      `$1 class="${newClasses}"`,
    )
  }

  // static clean(svg) {
  //   // Remove comments
  //   return svg.replace(/<!--[\s\w"-/:=?><]+-->/g, '');
  // }

  static parse(element) {
    const parsedHtml = new DOMParser().parseFromString(element, 'text/html')
    const parsedElement = parsedHtml.body.firstChild

    return parsedElement
  }

  static async fetchFile(path) {
    try {
      const response = await (await fetch(path)).text()
      return response
    } catch (error) {
      return new Error(error)
    }
  }

  lazyLoad = () => {
    if (this.offsetTop < window.innerHeight + window.pageYOffset + 300) {
      this.removeListeners()

      return this.svg()
    }
  }

  svg() {
    return SvgToInline.fetchFile(this.path).then((svg) => {
      // let svgElement = SvgToInline.clean(svg);
      let svgElement = svg
      svgElement = this.extractClassNames(svgElement)
      this.svgDOM = svgElement
    })
  }

  updated(changedProperties) {
    if (changedProperties.has('path')) {
      this.removeListeners()
      this.init()
    } else if (changedProperties.has('className') && this.svgDOM) {
      this.svgDOM = this.extractClassNames(this.svgDOM)
    }

    return false
  }

  addListeners() {
    window.addEventListener('scroll', this.callFunction)
    window.addEventListener('resize', this.callFunction)
    window.addEventListener('orientationchange', this.callFunction)
  }

  removeListeners() {
    window.removeEventListener('scroll', this.callFunction)
    window.removeEventListener('resize', this.callFunction)
    window.removeEventListener('orientationchange', this.callFunction)
  }

  init() {
    if (this.lazy) {
      this.addListeners()
      return this.lazyLoad()
    }

    return this.svg()
  }

  connectedCallback() {
    super.connectedCallback()
    if (this.path) {
      this.init()
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeListeners()
  }

  constructor() {
    super()

    this['loading-Label'] = 'Loading...'
    this.callFunction = throttle(400, this.lazyLoad)
  }

  render() {
    return html`
      ${this.svgDOM
        ? html` ${SvgToInline.parse(this.svgDOM)} `
        : html` <span>${this['loading-Label']}</span> `}
    `
  }
}
