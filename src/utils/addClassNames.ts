export const addClassNames = (
  svgString: string | null,
  classNamesToAdd?: string,
) => {
  if (!classNamesToAdd || !svgString) {
    return svgString
  }
  const searchClassAttributeRegex = /<svg[^>]+class="(.*?)"/
  const extractSVGTagRegex = /(<svg[^>]+)/
  const extractSVGUntilClassAttributeRegex = /(<svg[^>]+) class="(.*?)"/

  // Extract SVG classes
  const svgClassNames = svgString.match(searchClassAttributeRegex)?.[1]
  const newClassNames = svgClassNames
    ? `${svgClassNames} ${classNamesToAdd}`
    : classNamesToAdd
  const uniqueClassNames = newClassNames
    .split(' ')
    .filter((className) => className)
    .filter((className, index, self) => self.indexOf(className) === index)
    .join(' ')

  // If SVG doesn't already have a class attribute add it
  if (!svgString.match(searchClassAttributeRegex)) {
    return svgString.replace(
      extractSVGTagRegex,
      `$1 class="${uniqueClassNames}"`,
    )
  }

  return svgString.replace(
    extractSVGUntilClassAttributeRegex,
    `$1 class="${uniqueClassNames}"`,
  )
}
