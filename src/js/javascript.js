import domready from 'domready'
import svgToInline from './svg-to-inline.js'

domready(() => {
  // Executes after dow ready
})

// svgToInline()

// svgToInline('.svg')

// svgToInline('#svg')

svgToInline({
  elementsClass: 'svg',
  useTriggerClass: false,
  preserveComments: false
})
