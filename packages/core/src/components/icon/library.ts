import type { Except } from 'type-fest'

import orchestraLibrary from './orchestra-library'
import defaultLibrary from './default-library'

export type IconLibraryResolver = (name: string) => string
export interface IconLibrary {
  name: string
  resolver: IconLibraryResolver
}

// Use window as global registry to share across isolated modules
const getGlobalRegistry = (): IconLibrary[] => {
  if (typeof window !== 'undefined') {
    if (!(window as any).__orchestraIconRegistry) {
      (window as any).__orchestraIconRegistry = [defaultLibrary, orchestraLibrary]
    }
    return (window as any).__orchestraIconRegistry
  }
  // Fallback for non-browser environments
  if (!(globalThis as any).__orchestraIconRegistry) {
    (globalThis as any).__orchestraIconRegistry = [defaultLibrary, orchestraLibrary]
  }
  return (globalThis as any).__orchestraIconRegistry
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
    (window as any).__orchestraIconRegistry = filtered
  } else {
    (globalThis as any).__orchestraIconRegistry = filtered
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
