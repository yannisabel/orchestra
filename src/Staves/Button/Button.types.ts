import { ReactNode } from 'react'
import type { IconProps, IconTypes } from '../Icon/Icon.types'

export interface ButtonProps {
  model?: 'default' | 'round'
  state?: 'base' | 'raised'
  variant?: 'primary' | 'secondary' | 'tertiary'
  type?: 'button' | 'submit' | 'reset'
  children?: string | ReactNode
  icon?: IconTypes
  iconSize?: IconProps['size']
  role?: string
  tabIndex?: number
  className?: string
  onClick?: () => void
}
