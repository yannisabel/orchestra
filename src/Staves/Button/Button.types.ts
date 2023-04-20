import { ReactNode } from 'react'
import type { IconTypes } from '../Icon'

export interface ButtonProps {
  model?: 'default' | 'round'
  state?: 'base' | 'raised' | 'ghost'
  color?: 'blue' | 'orange' | 'white' | 'transparent'
  type: 'button' | 'submit' | 'reset'
  children?: string | ReactNode
  icon?: IconTypes
  role?: string
  tabIndex?: number
  className?: string
  onAction?: () => void
}
