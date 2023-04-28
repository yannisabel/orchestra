import { useState } from 'react'
import { Icon } from '../Icon'
import { ButtonProps } from './Button.types'
import './button.scss'
import React from 'react'

export const Button = ({
  model = 'default',
  state = 'base',
  color = 'transparent',
  type = 'button',
  children,
  icon,
  role,
  tabIndex,
  onClick,
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

    icon && buttonClasses.push('button--icon')

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

  const buttonClasses = `${
    isDown
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
      onClick={onClick}
      tabIndex={tabIndex}
    >
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}
