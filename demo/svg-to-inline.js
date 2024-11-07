/**
 * replace tags to inline SVG
 * @param  {object} options [description]
 * @return {undefined} This function dont have return
 */
const svgToInline = (options) => {
  let trigger = ''
  let elements = []

  if (options) {
    if (typeof options === 'string') {
      if (options.substring(0, 1) === '#') {
        document.getElementById(options.replace('#', '')) &&
          (elements[0] = document.getElementById(options.replace('#', '')))
      } else {
        elements =
          Array.prototype.concat.apply(
            elements,
            document.getElementsByClassName(options.replace('.', '')),
            elements,
          ) || []
      }

      for (let i = elements.length - 1; i >= 0; i -= 1) {
        const file =
          elements[i].getAttribute('src') || elements[i].getAttribute('data')

        if (file.search('.svg') < 0) {
          elements.splice(i, 1)
        }
      }
    } else if (typeof options === 'object') {
      trigger = options
      elements = document.getElementsByClassName(options.elementsClass)
      console.log('elements', elements)
    }
  } else {
    // If there isn't option will get all images and objects on the page with SRC is .svg extension
    elements =
      Array.prototype.concat.apply(
        elements,
        document.getElementsByTagName('img'),
        elements,
      ) || []
    elements =
      Array.prototype.concat.apply(
        elements,
        document.getElementsByTagName('object'),
        elements,
      ) || []

    for (let i = elements.length - 1; i >= 0; i -= 1) {
      const file =
        elements[i].getAttribute('src') || elements[i].getAttribute('data')

      if (file.search('.svg') < 0) {
        elements.splice(i, 1)
      }
    }
  }

  if (elements.length) {
    Array.from(elements).forEach((item) => {
      const svg = {
        current: item,
        oldClass: '',
        newClass: '',
        path: item.getAttribute('data') || item.getAttribute('src'),
      }
      const requestDetails = {
        element: '',
        svgTag: '',
        svgTagWithoutClass: '',
      }

      // Get class names
      const inputClass =
        svg.current.getAttribute('class') &&
        svg.current.getAttribute('class').split(' ')

      if (inputClass) {
        inputClass.forEach((item, index) => {
          let space = ''

          // check if isn't the last class
          if (inputClass[index] === trigger.class && !trigger.useClass) {
            return
          }

          index !== inputClass.length - 1 && (space = ' ')
          svg.newClass += inputClass[index] + space
        })
      }

      let request = new XMLHttpRequest()
      request.open('GET', svg.path, true)

      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 400) {
            const response = this.responseText

            // Remove comments
            requestDetails.element = response.replace(
              /<[?!][\s\w"-/:=?]+>/g,
              '',
            )
            requestDetails.svgTag = requestDetails.element.match(
              /<svg[\w\s\t\n:="\\'/.#-]+>/g,
            )
            requestDetails.svgTagWithoutClass =
              requestDetails.svgTag[0].replace(/class="[\w\s-_]+"/, '')
            svg.oldClass = requestDetails.svgTag[0].match(/class="(.*?)"/)

            // If exist class in svg add to svg.newClass
            svg.oldClass &&
              svg.oldClass[1] &&
              svg.newClass &&
              (svg.newClass = `${svg.oldClass[1]} ${svg.newClass}`)

            svg.newClass !== '' && (svg.newClass = `class="${svg.newClass}"`)

            requestDetails.svgTagWithoutClass =
              requestDetails.svgTagWithoutClass.replace(
                '>',
                ` ${svg.newClass}>`,
              )

            svg.current.outerHTML = requestDetails.element.replace(
              /<svg[\w\s\t\n:="\\'/.#-]+>/g,
              requestDetails.svgTagWithoutClass,
            )
          } else {
            console.error('Conection Error')
          }
        }
      }

      request.send()
      request = null
    })
  }
}

export default svgToInline
