import React from 'react'
import { Picture } from './Picture'

export default {
  title: 'Staves/Picture',
  component: Picture,
}

export const WithImage = {
  render: () => (
    <Picture src="https://via.placeholder.com/200" alt="placeholder image" />
  ),
  name: 'With Image',
}
