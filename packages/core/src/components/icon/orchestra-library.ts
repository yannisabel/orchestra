import { checked } from '@orchestra-design-system/icons-library'

import type { IconLibrary } from './library'

const icons: Record<string, string | undefined> = {
  checked,
}

const orchestraLibrary: IconLibrary = {
  name: 'orchestra-icons',
  resolver: (name) => icons[name] ?? '',
}

export default orchestraLibrary
