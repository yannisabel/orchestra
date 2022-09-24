import type { IconTypes } from '../icons/Icon.types'

export interface AnchorProps {
  model?: 'default' | 'round'
  state?: 'base' | 'raised' | 'less' | 'ghost'
  color?: 'blue' | 'orange' | 'white' | 'none'
  linkto: string
  text?: string
  title: string
  icon?: IconTypes
  role?: string
  tabIndex?: number
  isExternal?: boolean
  className?: string
}
