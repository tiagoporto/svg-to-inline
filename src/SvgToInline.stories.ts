import { html } from 'lit'
import type { TemplateResult } from 'lit'
import './SvgToInline.ts'

interface ArgTypes {
  path: string
  className: string
  lazy: boolean
  slot?: TemplateResult | string
}

export default {
  title: 'SVG to Inline',
  tags: ['autodocs'],
  component: 'svg-to-inline',
  argTypes: {
    path: { control: 'text', description: 'SVG path' },
    className: {
      control: 'text',
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

const Template: Story<ArgTypes> = ({ path, className }: ArgTypes) => html`
  <svg-to-inline path=${path} classname=${className}></svg-to-inline>
`

export const Regular = Template.bind({})
Regular.args = {
  path: '/SVG_Logo.svg',
}
