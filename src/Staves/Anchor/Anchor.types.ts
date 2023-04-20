import { ReactNode } from 'react'
import { IconTypes } from '../Icon'

export interface AnchorRoundProps {
  ref?: any
  model?: 'round'
  state?: 'base' | 'raised' | 'ghost'
  color?: 'blue' | 'orange' | 'white' | 'transparent'
  href: string
  title: string
  icon?: IconTypes
  role?: string
  tabIndex?: number
  isExternal?: boolean
  className?: string
  onClick?: any
  children?: never
}

export interface AllOtherAnchorProps {
  ref?: any
  model?: 'default' | 'button' | 'wrapper'
  state?: 'base' | 'raised' | 'ghost'
  color?: 'blue' | 'orange' | 'white' | 'transparent'
  href: string
  children?: string | ReactNode
  title: string
  icon?: never
  role?: string
  tabIndex?: number
  isExternal?: boolean
  className?: string
  onClick?: any
}

export type AnchorProps = AnchorRoundProps | AllOtherAnchorProps
