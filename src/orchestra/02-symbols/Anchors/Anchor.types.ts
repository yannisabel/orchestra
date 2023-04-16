import { ReactNode } from 'react'
import { IconTypes } from '../Icons'

export interface AnchorProps {
  ref?: any
  model?: 'default' | 'button' | 'round' | 'wrapper'
  state?: 'base' | 'raised' | 'ghost'
  color?: 'blue' | 'orange' | 'white' | 'transparent'
  href: string
  children?: string | ReactNode
  title: string
  icon?: IconTypes
  role?: string
  tabIndex?: number
  isExternal?: boolean
  className?: string
  onClick?: any
}
