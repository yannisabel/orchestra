import { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@symbols/icons/Icons'

import type { IconTypes } from '../icons/IconTypes'

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

export const Anchor = ({
  model = 'default',
  state = 'base',
  color = 'none',
  linkto,
  text,
  title,
  icon,
  role,
  tabIndex,
  isExternal = false,
  ...props
}: AnchorProps) => {
  const [isDown, setIsDown] = useState(false)

  const getAnchorClasses = () => {
    const AnchorClasses = [
      'button',
      `button-m--${model}`,
      `button-s--${state}`,
      `button-c--${color}`,
    ]

    icon && icon !== 'none' && AnchorClasses.push('button--icon')

    return AnchorClasses.join(' ')
  }

  const pressOrRelease = () => {
    let bool

    if (state === 'raised') {
      setIsDown(!isDown)

      bool = true
    } else {
      bool = false
    }

    return bool
  }

  const anchorClasses = `${isDown
      ? [getAnchorClasses(), props.className, 'button-s--pressed'].join(' ')
      : [getAnchorClasses(), props.className].join(' ')
    }`

  if (isExternal) {
    return (
      <a
        href={linkto}
        className={anchorClasses}
        onMouseDown={pressOrRelease}
        onTouchStart={pressOrRelease}
        onMouseUp={pressOrRelease}
        onTouchEnd={pressOrRelease}
        title={title}
        target="_blank"
        rel="noopener noreferer"
      >
        {icon && <Icon name={icon} />}
        {text}
      </a>
    )
  }

  return (
    <Link href={linkto}>
      <a
        className={anchorClasses}
        onMouseDown={pressOrRelease}
        onTouchStart={pressOrRelease}
        onMouseUp={pressOrRelease}
        onTouchEnd={pressOrRelease}
        title={title}
        role={role}
        tabIndex={tabIndex}
      >
        {icon && <Icon name={icon} />}
        {text}
      </a>
    </Link>
  )
}
