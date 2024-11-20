export const fetchFile = async (path: string) => {
  try {
    const response = await fetch(path)

    if (!response.ok) {
      return null
    }

    const data = await response.text()
    return data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null
  }
}
