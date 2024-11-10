export const convertStringToNode = (svg: string | null) => {
  if (!svg) {
    return null
  }

  const parsedHtml = new DOMParser().parseFromString(svg, 'text/html')
  const parsedElement = parsedHtml.body.firstChild

  return parsedElement
}
