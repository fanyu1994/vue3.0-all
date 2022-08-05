export function sleep(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function titleCase(str: string): string {
  const newStr = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
  return newStr
}
