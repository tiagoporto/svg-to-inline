import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import SvgToInline from '../src/SvgToInline.js';
import '../src/svg-to-inline.js';

import readme from '../README.md';

storiesOf('svg-to-inline', module)
  .addDecorator(withKnobs)
  .add('Documentation', () => withClassPropertiesKnobs(SvgToInline), { notes: { markdown: readme } })
  .add(
    'Alternative Header',
    () => html`
      <svg-to-inline .header=${'Something else'}></svg-to-inline>
    `,
  );
