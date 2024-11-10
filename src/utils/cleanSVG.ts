export const cleanSVG = (svg: string) =>
  // Remove comments
  svg.replace(/<!--[\s\w"-/:=?><]+-->/g, '')
