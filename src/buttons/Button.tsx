import { useState } from 'react'

import { Icon } from '../icons'

import { ButtonProps } from './Button.types'
import styled from '@emotion/styled'
import { allColors } from '../colors'
import { spaces } from '../spaces'
import { shadows } from '../shadows'
import { radius } from '../radius'
import { transitions } from '../animations'
import { fontFamilies, fontSizes, fontWeights } from '../fonts'

export const Button = ({
  model = 'default',
  state = 'base',
  backgroundColor = 'white-10',
  type = 'button',
  text,
  icon,
  iconColor = backgroundColor === 'white-10' ? 'grey-100' : 'white-0',
  role,
  tabIndex,
  onClick,
  ...restProps
}: ButtonProps) => {
  const [isDown, setIsDown] = useState(false)

  const raisedShadowDefault = isDown ? shadows['depth-2'] : shadows['depth-5']

  const commonStyles = `
    display: inline-flex;
    align-items: center;
    min-height: 36px;
    margin: ${spaces['space-3']};
    border: none;
    border-radius: ${model === 'round' ? radius['radius-round'] : radius['radius-1']};
    outline: none;
    padding: ${model === 'round' ? spaces['space-3'] : spaces['space-2']};
    width: ${model === 'round' ? '60px' : 'unset'};
    width: ${model === 'round' ? '60px' : 'unset'};
    text-decoration: none;
    text-transform: uppercase;
    font-family: ${fontFamilies['mulish']};
    font-size: ${fontSizes['fs-1']};
    cursor: pointer;
    box-shadow: ${state === 'raised' ? raisedShadowDefault : 'unset'};
    transition: all ${transitions['cubicBezier-04']};
  `

  const ButtonBlueElement = styled.button`
    ${commonStyles}
    background-color: ${allColors['blue-30']};
    color: ${allColors['white-0']};

    &:hover,
    &:focus {
      background-color: ${allColors['blue-20']};
    }
  `

  const ButtonOrangeElement = styled.button`
    ${commonStyles}
    background-color: ${allColors['orange-10']};
    color: ${allColors['white-0']};
    font-size: ${fontSizes['fs-2']};
    font-weight: ${fontWeights['fw-bold']};

    &:hover,
    &:focus {
      background-color: ${allColors['orange-0']};
    }
  `

  const ButtonWhiteElement = styled.button`
    ${commonStyles}
    background-color: ${allColors['white-10']};
    color: ${allColors['grey-100']};

    &:hover,
    &:focus {
      background-color: ${allColors['white-0']};
    }
  `

  const pressOrRelease = () => {
    let bool = false

    if (state === 'raised') {
      setIsDown(!isDown)

      bool = isDown
    }

    return bool
  }

  const ButtonElement = ({ children, ...restProps }: ButtonProps) => {
    switch (backgroundColor) {
      case 'blue-30':
        return <ButtonBlueElement {...restProps}>{children}</ButtonBlueElement>
      case 'orange-10':
        return <ButtonOrangeElement {...restProps}>{children}</ButtonOrangeElement>
      case 'white-10':
        return <ButtonWhiteElement {...restProps}>{children}</ButtonWhiteElement>
      default:
        return null
    }
  }

  return (
    <ButtonElement
      {...restProps}
      type={type}
      role={role}
      onMouseDown={pressOrRelease}
      onTouchStart={pressOrRelease}
      onMouseUp={pressOrRelease}
      onTouchEnd={pressOrRelease}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      {icon && <Icon name={icon} color={iconColor} />}
      {text}
    </ButtonElement>
  )
}
