import React from 'react'
import { useState } from 'react'

import { Switch } from './Switch'

export default {
  title: 'Staves/Switch',
  component: Switch,
}

export const Default = {
  render: () => {
    const [value, setValue] = useState(false)
    return (
      <Switch
        label="Switch Label"
        onClick={() => setValue(!value)}
        checked={value}
      />
    )
  },

  name: 'Default',
}
