import { forwardRef, useState } from 'react'
import { Icon } from '../Icon'
import { AnchorProps } from './Anchor.types'
import './anchor.scss'
import React from 'react'

export const Anchor = forwardRef(({
  model = 'default',
  state = 'base',
  color = 'transparent',
  href,
  title,
  icon,
  role,
  tabIndex,
  isExternal = false,
  onClick,
  children,
  ...props
}: AnchorProps, ref) => {
  const [isDown, setIsDown] = useState(false)

  const getAnchorClasses = () => {
    const AnchorClasses = [
      'anchor',
      `anchor-m--${model}`,
      `anchor-s--${state}`,
      `anchor-c--${color}`,
    ]

    icon && AnchorClasses.push('anchor--icon')

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

  const anchorClasses = `${
    isDown
      ? [getAnchorClasses(), props.className, 'anchor-s--pressed'].join(' ')
      : [getAnchorClasses(), props.className].join(' ')
  }`
    return (
      <a
        ref={ref as any}
        href={href}
        onClick={onClick}
        className={anchorClasses}
        onMouseDown={pressOrRelease}
        onTouchStart={pressOrRelease}
        onMouseUp={pressOrRelease}
        onTouchEnd={pressOrRelease}
        title={title}
        {...isExternal && {
          target: '_blank',
          rel: 'noopener noreferer'
        }}
      >
        {model === 'round' && icon ? <Icon name={icon} /> : children}
      </a>
    )
})
