/**
 * replace tags to inline SVG
 * @param  {object} options [description]
 * @return {undefined} This function dont have return
 */
const svgToInline = options => {
  const trigger = {
    class: options.elementsClass.replace('.', ''),
    useClass: (options && options.useTriggerClass) || false
  }

  const elements = document.getElementsByClassName(trigger.class)

  if (elements.length) {
    Array.from(elements).forEach(item => {
      const svg = {
        current: item,
        oldClass: '',
        newClass: '',
        path: item.getAttribute('data') || item.getAttribute('src')
      }
      const requestDetails = {
        element: '',
        svgTag: '',
        svgTagWithoutClass: ''
      }

      // Get class names
      const inputClass = svg.current.getAttribute('class').split(' ')

      inputClass.forEach((item, index) => {
        let space = ''

        // check if isn't the last class
        if (inputClass[index] === trigger.class && !trigger.useClass) {
          return
        }

        (index !== inputClass.length - 1) && (space = ' ')
        svg.newClass += inputClass[index] + space
      })

      let request = new XMLHttpRequest()
      request.open('GET', svg.path, true)

      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 400) {
            const response = this.responseText

            // Remove comments
            requestDetails.element = response.replace(/<[?!][\s\w"-/:=?]+>/g, '')

            requestDetails.svgTag = requestDetails.element.match(/<svg[\w\s\t\n:="\\'/.#-]+>/g)
            requestDetails.svgTagWithoutClass = requestDetails.svgTag[0].replace(/class="[\w\s-_]+"/, '')
            svg.oldClass = requestDetails.svgTag[0].match(/class="(.*?)"/)

            // If exist class in svg add to svg.newClass
            svg.oldClass && svg.oldClass[1] && svg.newClass && (svg.newClass = `${svg.oldClass[1]} ${svg.newClass}`);

            (svg.newClass !== '') && (svg.newClass = `class="${svg.newClass}"`)

            requestDetails.svgTagWithoutClass = requestDetails.svgTagWithoutClass.replace('>', ` ${svg.newClass}>`)

            svg.current.outerHTML = requestDetails.element.replace(/<svg[\w\s\t\n:="\\'/.#-]+>/g, requestDetails.svgTagWithoutClass)
          } else {
            console.error('Conection Error')
          }
        }
      }

      request.send()
      request = null
    })

    return
  }

  return console.error('No elements found, Check the class name!')
}

export default svgToInline
