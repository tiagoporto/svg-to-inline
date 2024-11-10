export const fetchFile = async (path: string) => {
  try {
    const response = await (await fetch(path)).text()
    return response
  } catch (error) {
    console.error(error)
    return null
  }
}
