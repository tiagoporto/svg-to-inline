import { html, fixture, expect } from '@open-wc/testing';

import '../src/svg-to-inline.js';

describe('<svg-to-inline>', () => {
  it('has a default property heading', async () => {
    const el = await fixture('<svg-to-inline></svg-to-inline>');

    expect(el.heading).to.equal('Hello world!');
  });

  it('allows property heading to be overwritten', async () => {
    const el = await fixture(html`
      <svg-to-inline heading="different heading"></svg-to-inline>
    `);

    expect(el.heading).to.equal('different heading');
  });
});
