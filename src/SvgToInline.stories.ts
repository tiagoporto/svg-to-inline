import { html } from 'lit'
import type { TemplateResult } from 'lit'
import './SvgToInline.ts'

interface ArgTypes {
  path: string
  className: string
  placeholder?: TemplateResult
  lazy?: boolean
  'loading-label'?: TemplateResult
}

export default {
  title: 'SVG to Inline',
  tags: ['autodocs'],
  component: 'svg-to-inline',
  argTypes: {
    path: {
      control: 'text',
      type: { required: true },
      description: 'SVG path',
    },
    className: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    'loading-label': {
      control: 'text',
      description: 'While loading the element to be visible',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'If fetch error the element to be visible',
      table: {
        type: { summary: 'string' },
      },
    },
    lazy: {
      control: 'boolean',
      description: `
Enable Lazing load SVG\n
SVG will be loaded only when it enters the viewport`,
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
  },
}

interface Story<T> {
  (args: T): TemplateResult
  args?: Partial<T>
  argTypes?: Record<string, unknown>
}

const Template: Story<ArgTypes> = ({
  path,
  className,
  'loading-label': loadingLabel,
  placeholder,
}: ArgTypes) => html`
  <svg-to-inline
    path=${path}
    classname=${className}
    .placeholder=${placeholder}
    .loading-label=${loadingLabel}
  ></svg-to-inline>
`

export const Regular = Template.bind({})
Regular.args = {
  path: './SVG_Logo.svg.',
  'loading-label': html`<button>loading</button>`,
  placeholder: html`<button>placeholder</button>`,
}
