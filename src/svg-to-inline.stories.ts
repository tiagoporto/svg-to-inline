import { html } from 'lit'
import type { TemplateResult } from 'lit'
import type { Meta } from '@storybook/web-components'

import './svg-to-inline.js'

interface ArgTypes {
  path: string
  className: string
  placeholder?: TemplateResult | string
  lazy?: boolean
  loading?: TemplateResult | string
}

const meta: Meta = {
  title: 'SVG to Inline',
  tags: ['autodocs'],
  component: 'svg-to-inline',
  argTypes: {
    path: {
      control: 'text',
      type: { required: true, name: 'string' },
      description: 'SVG path',
    },
    className: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    loading: {
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
        type: { summary: 'boolean' },
      },
    },
  },
}

export default meta

interface Story<T> {
  (args: T): TemplateResult
  args?: Partial<T>
  argTypes?: Record<string, unknown>
}

const Template: Story<ArgTypes> = ({
  path,
  className,
  loading,
  placeholder,
}: ArgTypes) => html`
  <svg-to-inline
    path=${path}
    className=${className}
    placeholder=${placeholder}
    loading=${loading}
  ></svg-to-inline>
`

export const Regular = Template.bind({})
Regular.args = {
  path: './SVG_Logo.svg',
  loading: 'loading...',
  placeholder: 'Some Error',
}
