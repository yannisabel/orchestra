import type { Except } from 'type-fest'

import orchestraLibrary from './orchestra-library'
import defaultLibrary from './default-library'

export type IconLibraryResolver = (name: string) => string
export interface IconLibrary {
  name: string
  resolver: IconLibraryResolver
}

const ICON_REGISTRY_KEY = '__orchestraIconRegistry'
const coreLibraryAlias: IconLibrary = {
  ...orchestraLibrary,
  name: 'core',
}

// Use window as global registry to share across isolated modules
const getGlobalRegistry = (): IconLibrary[] => {
  if (typeof window !== 'undefined') {
    if (!(window as any)[ICON_REGISTRY_KEY]) {
      ;(window as any)[ICON_REGISTRY_KEY] = [
        defaultLibrary,
        orchestraLibrary,
        coreLibraryAlias,
      ]
    }
    return (window as any)[ICON_REGISTRY_KEY]
  }
  // Fallback for non-browser environments
  if (!(globalThis as any)[ICON_REGISTRY_KEY]) {
    ;(globalThis as any)[ICON_REGISTRY_KEY] = [
      defaultLibrary,
      orchestraLibrary,
      coreLibraryAlias,
    ]
  }
  return (globalThis as any)[ICON_REGISTRY_KEY]
}

/**
 * Returns a library from the registry.
 */
export const getIconLibrary = (name: string): IconLibrary | undefined => {
  const registry = getGlobalRegistry()
  return registry.find((library) => library.name === name)
}

/**
 * Removes an icon library from the registry.
 */
export const unregisterIconLibrary = (name: string): void => {
  const registry = getGlobalRegistry()
  const filtered = registry.filter((library) => library.name !== name)
  if (typeof window !== 'undefined') {
    ;(window as any)[ICON_REGISTRY_KEY] = filtered
  } else {
    ;(globalThis as any)[ICON_REGISTRY_KEY] = filtered
  }
}

/**
 * Adds an icon library to the registry or overrides an existing one.
 */
export const registerIconLibrary = (
  name: string,
  options: Except<IconLibrary, 'name'>,
): void => {
  unregisterIconLibrary(name)
  const registry = getGlobalRegistry()
  registry.push({
    name,
    ...options,
  })
}
