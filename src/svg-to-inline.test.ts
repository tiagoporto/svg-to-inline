import { html } from 'lit'
import { fixture, expect } from '@open-wc/testing'
import type { SvgToInline } from './'
import './svg-to-inline.js'

describe('SvgToInline', () => {
  // it('test _ and ; value')
  // it('test path')
  // it('loading')
  // it('placeholder')
  // it('lazy')
  // it('has a default header "Hey there" and counter 5', async () => {
  //   const el = await fixture<SvgToInline>(html`<svg-to-inline></svg-to-inline>`)
  //   expect(el.header).to.equal('Hey there')
  //   expect(el.counter).to.equal(5)
  // })
  // it('increases the counter on button click', async () => {
  //   const el = await fixture<SvgToInline>(html`<svg-to-inline></svg-to-inline>`)
  //   el.shadowRoot!.querySelector('button')!.click()
  //   expect(el.counter).to.equal(6)
  // })
  // it('can override the header via attribute', async () => {
  //   const el = await fixture<SvgToInline>(
  //     html`<svg-to-inline path="attribute header"></svg-to-inline>`,
  //   )
  //   expect(el.path).to.equal('attribute header')
  // })
  it('passes the a11y audit', async () => {
    const el = await fixture<SvgToInline>(html`<svg-to-inline></svg-to-inline>`)
    await expect(el).shadowDom.to.be.accessible()
  })
})
