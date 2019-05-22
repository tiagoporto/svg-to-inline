import { html, css, LitElement } from 'lit-element';
import { throttle } from 'throttle-debounce';

export default class SvgToInline extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
        line-height: 0;
      }
    `;
  }

  static get properties() {
    return {
      path: { type: String },
      cssPath: { type: String },
      placeholder: { type: Boolean },
      lazy: { type: Boolean },
      fitSVG: { type: Boolean },
      className: { type: String },
      svgDOM: { type: String },
      svgClassName: { type: String },
    };
  }

  extractClassNames(svg) {
    let element = svg;

    if (!svg.match(/<svg[\w\s\t\n:="\\'/.#-]+ class="(.*?)"/)) {
      element = svg.replace(/(<svg[\w\s\t\n:="\\'/.#-]+)/, '$1 class=" "');
    }

    const svgClass =
      element.match(/<svg[\w\s\t\n:="\\'/.#-]+ class="(.*?)"/) &&
      element.match(/class="(.*?)"/)[1].split(' ');
    const classToAdd = (this.className && this.className.split(' ')) || [];
    const newClass = [...svgClass, ...classToAdd].filter(classname => classname).join(' ');

    return element.replace(
      /(<svg[\w\s\t\n:="\\'/.#-]+) class="[\w\s-_]+?"/,
      `$1 class="${newClass}"`,
    );
  }

  static clean(svg) {
    // Remove comments
    return svg.replace(/<!--[\s\w"-/:=?><]+-->/g, '');
  }

  static parse(element) {
    const parsedHtml = new DOMParser().parseFromString(element, 'text/html');
    const parsedElement = parsedHtml.body.firstChild;

    return parsedElement;
  }

  static async fetchFile(path) {
    try {
      const response = await (await fetch(path)).text();
      return response;
    } catch (error) {
      return new Error(error);
    }
  }

  lazyLoad = () => {
    if (this.offsetTop < window.innerHeight + window.pageYOffset + 300) {
      this.removeListeners();

      return this.svg();
    }
  };

  svg() {
    return SvgToInline.fetchFile(this.path).then(svg => {
      let svgElement = SvgToInline.clean(svg);
      svgElement = this.extractClassNames(svgElement);
      this.svgDOM = svgElement;
    });
  }

  updated(changedProperties) {
    if (changedProperties.has('path')) {
      this.removeListeners();
      this.init();
    } else if (changedProperties.has('className') && this.svgDOM) {
      this.svgDOM = this.extractClassNames(this.svgDOM);
    }

    return false;
  }

  addListeners() {
    window.addEventListener('scroll', this.callFunction);
    window.addEventListener('resize', this.callFunction);
    window.addEventListener('orientationchange', this.callFunction);
  }

  removeListeners() {
    window.removeEventListener('scroll', this.callFunction);
    window.removeEventListener('resize', this.callFunction);
    window.removeEventListener('orientationchange', this.callFunction);
  }

  init() {
    if (this.lazy) {
      this.addListeners();
      return this.lazyLoad();
    }

    return this.svg();
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.path) {
      this.init();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeListeners();
  }

  constructor() {
    super();

    this.callFunction = throttle(400, this.lazyLoad);
  }

  render() {
    return html`
      <style>
        ${this.cssPath &&
          html`
            @import url('${this.cssPath}');
          `}
            ${this.fitSVG &&
          html`
            svg {
              max-width: 100%;
              width: 100%;
              max-height: 100%
              height: 100%;
            }
          `}
      </style>

      ${this.svgDOM
        ? html`
            ${SvgToInline.parse(this.svgDOM)}
          `
        : html`
            <span>Loading...</span>
          `}
    `;
  }
}
