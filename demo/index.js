import { html, render } from 'lit-html';
import '../src/svg-to-inline.js';

{
  // https://upload.wikimedia.org/wikipedia/commons/6/66/Rammstein_logo_2.svg
  // https://upload.wikimedia.org/wikipedia/de/e/ec/Metallica_Logo.svg
  // https://raw.githubusercontent.com/tiagoporto/svg-music-logos/master/public/logos/alcatrazz/alcatrazz_no-parole-from-rock-n-roll.svg
}
render(
  html`
    <h1>
      <a href="http://www.somewhere.com">
        <svg-to-inline path="images/logos/logo.svg" className="test muito" lazy=${true}>
        </svg-to-inline>
      </a>
    </h1>
    <svg-to-inline
      path="https://upload.wikimedia.org/wikipedia/de/e/ec/Metallica_Logo.svg"
      className="test muito"
      lazy=${true}
    >
    </svg-to-inline>
  `,
  document.querySelector('#demo'),
);