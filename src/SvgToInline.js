import { html, css, LitElement } from 'lit-element';
import { throttle } from 'throttle-debounce';

export default class SvgToInline extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
    `;
  }

  static get properties() {
    return {
      path: { type: String },
      placeholder: { type: Boolean },
      lazy: { type: Boolean },
      className: { type: String },
    };
  }

  lazyLoad = () => {
    if (this.offsetTop < window.innerHeight + window.pageYOffset + 300) {
      this.init();

      window.removeEventListener('scroll', this.callFunction);
      window.removeEventListener('resize', this.callFunction);
      window.removeEventListener('orientationchange', this.callFunction);
    }
  };

  contClass(svg) {
    let element = svg;

    if (!svg.match(/class="(.*?)"/)) {
      element = svg.replace(/(<svg[\w\s\t\n:="\\'/.#-]+)/, '$& class=" "');
    }

    const svgClass = element.match(/class="(.*?)"/)[1].split(' ');
    const classToAdd = this.className.split(' ');
    const newClass = [...svgClass, ...classToAdd].filter(classname => classname).join(' ');

    return element.replace(/class="[\w\s-_]+"/, `class="${newClass}"`);
  }

  replace(element) {
    const parsedHtml = new DOMParser().parseFromString(element, 'text/html');
    const parsedElement = parsedHtml.body.firstChild;

    if (!this.shadowRoot.childNodes.length) {
      this.shadowRoot.appendChild(parsedElement);
    }
  }

  async request() {
    const response = await (await fetch(this.path)).text();
    // Remove comments
    return response.replace(/<[?!][\s\w"-/:=?]+>/g, '');
  }

  init() {
    this.request().then(svg => {
      let svgElement = svg;
      if (this.className) {
        svgElement = this.contClass(svg);
      }
      this.replace(svgElement);
    });
  }

  constructor() {
    super();

    this.callFunction = throttle(400, this.lazyLoad);
  }

  connectedCallback() {
    if (this.lazy) {
      window.addEventListener('scroll', this.callFunction);
      window.addEventListener('resize', this.callFunction);
      window.addEventListener('orientationchange', this.callFunction);
      this.lazyLoad();
    } else {
      this.init();
    }
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
