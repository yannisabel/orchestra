import { checkmark, minus } from '@orchestra-design-system/icons-library'

import type { IconLibrary } from './library'

const icons: Record<string, string | undefined> = {
  checkmark,
  minus,
}

const orchestraLibrary: IconLibrary = {
  name: 'orchestra-icons',
  resolver: (name) => icons[name] ?? '',
}

export default orchestraLibrary
