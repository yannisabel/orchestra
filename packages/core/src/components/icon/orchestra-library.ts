import { checked } from '@orchestra-kit/icons-library'

import type { IconLibrary } from './library'

const icons: Record<string, string | undefined> = {
  checked,
}

const orchestraLibrary: IconLibrary = {
  name: 'core',
  resolver: (name) => icons[name] ?? '',
}

export default orchestraLibrary
