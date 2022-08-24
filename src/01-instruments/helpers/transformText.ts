// Functions that transform text

export function Capitalize(str) {
  return str.replace(/-([a-z])/g, (_, char) => `-${char.toUpperCase()}`)
}
export function DeleteDashes(str) {
  return str.replace(/-/g, '')
}
export function DeleteUnderscores(str) {
  return str.replace(/_/g, '')
}
export function DeleteUnderscoreAndDashes(str) {
  str = DeleteDashes(str)
  str = DeleteUnderscores(str)

  return str
}
export function ToCamelCase(str) {
  return DeleteUnderscoreAndDashes(Capitalize(str))
}

export function CamelCaseToKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}
