import {
  checkboxCheck,
  checkboxIndeterminate,
  checked,
} from '@orchestra-design-system/icons-library'

import type { IconLibrary } from './library'

const icons: Record<string, string | undefined> = {
  'checkbox-check': checkboxCheck,
  checkboxCheck,
  'checkbox-indeterminate': checkboxIndeterminate,
  checkboxIndeterminate,
  checked,
}

const orchestraLibrary: IconLibrary = {
  name: 'orchestra-icons',
  resolver: (name) => icons[name] ?? '',
}

export default orchestraLibrary
