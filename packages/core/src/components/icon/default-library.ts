import { getAssetPath } from '@stencil/core'

import type { IconLibrary } from './library'

const library: IconLibrary = {
  name: 'default',
  resolver: (name) => getAssetPath(`/icons/${name}.svg`),
}

export default library
