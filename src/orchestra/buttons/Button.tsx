import { useState } from 'react'

import { Icon } from '../Icons'

import { ButtonProps } from './Button.types'
import styled from '@emotion/styled'
import { colors } from '../Tokens/Colors'
import { spaces } from '../Tokens/Spaces'
import { shadows } from '../Tokens/Shadows'
import { radius } from '../Tokens/Radius'
import { transitions } from '../Tokens/Animations'
import { fontFamilies, fontSizes, fontWeights } from '../Tokens/Fonts'

export const Button = ({
  model = 'default',
  state = 'base',
  backgroundColor = state === 'ghost' ? 'transparent' : 'white-10',
  type = 'button',
  text,
  icon,
  iconColor,
  role,
  tabIndex,
  onClick,
  ...restProps
}: ButtonProps) => {
  const [isDown, setIsDown] = useState(false)
  const isRound = model === 'round'
  const roundButtonSize = '60px'
  const buttonWidth = typeof restProps.width === 'number' ? `${restProps.width}px` : restProps.width
  const buttonHeight = typeof restProps.height === 'number' ? `${restProps.height}px` : restProps.height

  const raisedShadowDefault = isDown ? shadows['depth-2'] : shadows['depth-5']

  const commonStyles = `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 36px;
    margin: ${spaces['space-3']};
    border: none;
    border-radius: ${isRound ? radius['radius-round'] : radius['radius-1']};
    outline: none;
    padding: ${isRound ? spaces['space-3'] : spaces['space-2']};
    width: ${isRound ? roundButtonSize : buttonWidth};
    height: ${isRound ? roundButtonSize : buttonHeight};
    text-decoration: none;
    text-transform: uppercase;
    font-family: ${fontFamilies['mulish']};
    font-size: ${fontSizes['fs-1']};
    cursor: pointer;
    box-shadow: ${state === 'raised' ? raisedShadowDefault : 'unset'};
    transition: all ${transitions['cubicBezier-04']};
  `

  const ButtonGhostElement = styled.button`
    ${commonStyles}
    background-color: transparent;
    color: ${props => restProps.color ? colors[`${restProps.color}`] : colors[`${props.theme.colors.textColor}`]};

    &:hover,
    &:focus {
      background-color: ${colors['grey-V0--T2']};
    }

    & svg {
      fill: ${props => iconColor || colors[`${props.theme.colors.textColor}`]};
    }
  `

  const ButtonBlueElement = styled.button`
    ${commonStyles}
    background-color: ${colors['blue-30']};
    color: ${colors['white-0']};

    &:hover,
    &:focus {
      background-color: ${colors['blue-20']};
    }

    & svg {
      fill: ${colors['white-0']};
    }
  `

  const ButtonOrangeElement = styled.button`
    ${commonStyles}
    background-color: ${colors['orange-10']};
    color: ${colors['white-0']};
    font-size: ${fontSizes['fs-2']};
    font-weight: ${fontWeights['fw-bold']};

    &:hover,
    &:focus {
      background-color: ${colors['orange-0']};
    }

    & svg {
      fill: ${colors['white-0']};
    }
  `

  const ButtonWhiteElement = styled.button`
    ${commonStyles}
    background-color: ${colors['white-10']};
    color: ${colors['grey-100']};

    &:hover,
    &:focus {
      background-color: ${colors['white-0']};
    }

    & svg {
      fill: ${colors['grey-100']};
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
        return <ButtonGhostElement {...restProps}>{children}</ButtonGhostElement>
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
      {icon && <Icon name={icon} />}
      {text}
    </ButtonElement>
  )
}
