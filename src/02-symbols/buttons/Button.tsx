import { useState } from 'react'

import { Icon } from '@symbols/icons'

import type { IconTypes } from '@symbols/icons/IconTypes'

import './_button.scss'

export interface ButtonProps {
  model?: 'default' | 'round'
  state?: 'base' | 'raised' | 'less' | 'ghost'
  color?: 'blue' | 'orange' | 'white' | 'none'
  type: 'button' | 'submit' | 'reset'
  text?: string
  icon?: IconTypes
  role?: string
  tabIndex?: number
  className?: string
  onAction?: () => void
}

export const Button = ({
  model = 'default',
  state = 'base',
  color = 'none',
  type = 'button',
  text,
  icon,
  role,
  tabIndex,
  onAction,
  ...props
}: ButtonProps) => {
  const [isDown, setIsDown] = useState(false)

  const getButtonClasses = () => {
    const buttonClasses = [
      'button',
      `button-m--${model}`,
      `button-s--${state}`,
      `button-c--${color}`,
    ]

    icon && icon !== 'none' && buttonClasses.push('button--icon')

    return buttonClasses.join(' ')
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

  const buttonClasses = `${isDown
    ? [getButtonClasses(), props.className, 'button-s--pressed'].join(' ')
    : [getButtonClasses(), props.className].join(' ')
    }`

  return (
    <button
      type={type}
      role={role}
      className={buttonClasses}
      onMouseDown={pressOrRelease}
      onTouchStart={pressOrRelease}
      onMouseUp={pressOrRelease}
      onTouchEnd={pressOrRelease}
      onClick={onAction}
      tabIndex={tabIndex}
    >
      {icon && <Icon name={icon} />}
      {text}
    </button>
  )
}
