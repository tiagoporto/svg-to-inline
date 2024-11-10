import { html } from 'lit'
import type { TemplateResult } from 'lit'
import './SvgToInline.ts'

interface ArgTypes {
  path: string
  slot?: TemplateResult | string
}

export default {
  title: 'SVG to Inline',
  tags: ['autodocs'],
  component: 'svg-to-inline',
  argTypes: {
    path: { control: 'text' },
  },
}

interface Story<T> {
  (args: T): TemplateResult
  args?: Partial<T>
  argTypes?: Record<string, unknown>
}

const Template: Story<ArgTypes> = ({ path, slot }: ArgTypes) => html`
  <svg-to-inline path=${path}> ${slot} </svg-to-inline>
`

export const Regular = Template.bind({})
Regular.args = {
  path: '/SVG_Logo.svg',
  slot: 'Loading...',
}
