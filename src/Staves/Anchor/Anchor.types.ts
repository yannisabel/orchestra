import { ReactNode } from 'react'
import { IconProps, IconTypes } from '../Icon/Icon.types'

export interface AnchorProps {
  ref?: any
  model?: 'round' | 'default' | 'button' | 'wrapper'
  state?: 'base' | 'raised'
  variant?: 'primary' | 'secondary' | 'tertiary' | 'none'
  href: string
  children?: string | ReactNode
  title: string
  icon?: IconTypes
  iconSize?: IconProps['size']
  role?: string
  tabIndex?: number
  isExternal?: boolean
  className?: string
  onClick?: any
}
