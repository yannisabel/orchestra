import type { IconTypes } from '../Icons/Icon.types'
import { BoxProps } from '../Box'
import { MouseEventHandler, ReactEventHandler, ReactNode, TouchEventHandler } from 'react'

export interface AnchorProps extends BoxProps {
  model?: 'default' | 'round'
  state?: 'default' | 'base' | 'raised' | 'ghost'
  backgroundColor?: 'blue-30' | 'orange-10' | 'white-10' | 'transparent'
  color?: 'white-0' | 'grey-100'
  href: string
  text?: string
  title: string
  icon?: IconTypes
  iconColor?: 'white-0' | 'grey-100'
  role?: string
  tabIndex?: number
  isExternal?: boolean
  onMouseDown?: MouseEventHandler<HTMLElement> | undefined
  onMouseDownCapture?: MouseEventHandler<HTMLElement> | undefined
  onMouseEnter?: MouseEventHandler<HTMLElement> | undefined
  onMouseLeave?: MouseEventHandler<HTMLElement> | undefined
  onMouseMove?: MouseEventHandler<HTMLElement> | undefined
  onMouseMoveCapture?: MouseEventHandler<HTMLElement> | undefined
  onMouseOut?: MouseEventHandler<HTMLElement> | undefined
  onMouseOutCapture?: MouseEventHandler<HTMLElement> | undefined
  onMouseOver?: MouseEventHandler<HTMLElement> | undefined
  onMouseOverCapture?: MouseEventHandler<HTMLElement> | undefined
  onMouseUp?: MouseEventHandler<HTMLElement> | undefined
  onMouseUpCapture?: MouseEventHandler<HTMLElement> | undefined

  // Selection Events
  onSelect?: ReactEventHandler<HTMLElement> | undefined
  onSelectCapture?: ReactEventHandler<HTMLElement> | undefined

  // Touch Events
  onTouchCancel?: TouchEventHandler<HTMLElement> | undefined
  onTouchCancelCapture?: TouchEventHandler<HTMLElement> | undefined
  onTouchEnd?: TouchEventHandler<HTMLElement> | undefined
  onTouchEndCapture?: TouchEventHandler<HTMLElement> | undefined
  onTouchMove?: TouchEventHandler<HTMLElement> | undefined
  onTouchMoveCapture?: TouchEventHandler<HTMLElement> | undefined
  onTouchStart?: TouchEventHandler<HTMLElement> | undefined
  onTouchStartCapture?: TouchEventHandler<HTMLElement> | undefined
}
