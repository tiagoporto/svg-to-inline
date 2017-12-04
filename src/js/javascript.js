import domready from 'domready'
import svgToInline from './svg-to-inline.js'

domready(() => {
  // Executes after dow ready
})

svgToInline({
  elementsClass: 'svg',
  useTriggerClass: false,
  preserveComments: false
})
