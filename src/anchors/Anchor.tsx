import { useState } from 'react'
import { Icon } from '../icons'
import { AnchorProps } from './Anchor.types'

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
    <a
      href={linkto}
      className={anchorClasses}
      onMouseDown={pressOrRelease}
      onTouchStart={pressOrRelease}
      onMouseUp={pressOrRelease}
      onTouchEnd={pressOrRelease}
      title={title}
    >
      {icon && <Icon name={icon} />}
      {text}
    </a>
  )
}
