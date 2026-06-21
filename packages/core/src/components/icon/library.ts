import type { Except } from 'type-fest'

import orchestraLibrary from './orchestra-library'
import defaultLibrary from './default-library'

export type IconLibraryResolver = (name: string) => string
export interface IconLibrary {
  name: string
  resolver: IconLibraryResolver
}

let registry: IconLibrary[] = [defaultLibrary, orchestraLibrary]

/**
 * Returns a library from the registry.
 */
export const getIconLibrary = (name: string): IconLibrary | undefined =>
  registry.find((library) => library.name === name)

/**
 * Removes an icon library from the registry.
 */
export const unregisterIconLibrary = (name: string): void => {
  registry = registry.filter((library) => library.name !== name)
}

/**
 * Adds an icon library to the registry or overrides an existing one.
 */
export const registerIconLibrary = (
  name: string,
  options: Except<IconLibrary, 'name'>,
): void => {
  unregisterIconLibrary(name)
  registry.push({
    name,
    ...options,
  })
}
