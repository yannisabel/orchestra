import { Meta, StoryObj } from '@storybook/react';
import React from 'react'
import { useState } from 'react'

import { Switch } from './Switch'

const meta = {
  title: 'Staves/Switch',
  component: Switch,
} satisfies Meta<typeof Switch>

export default meta;
type Story = StoryObj<typeof meta>

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
  args: {
    label: 'Switch Label',
    onClick: '() => setValue(!value)',
    checked: false,
  },
  name: 'Default',
}
