import { useState } from 'react'
import { Icon } from '../Icons'
import { AnchorProps } from './Anchor.types'
import styled from '@emotion/styled'
import { colors } from '../Tokens/Colors'
import { spaces } from '../Tokens/Spaces'
import { shadows } from '../Tokens/Shadows'
import { radius } from '../Tokens/Radius'
import { transitions } from '../Tokens/Animations'
import { fontFamilies, fontSizes, fontWeights } from '../Tokens/fonts'

export const Anchor = ({
  model = 'default',
  state = 'default',
  backgroundColor = state === 'ghost' ? 'transparent' : undefined,
  text,
  icon,
  iconColor,
  href,
  title,
  role,
  tabIndex,
  isExternal = false,
  ...restProps
}: AnchorProps) => {
  const [isDown, setIsDown] = useState(false)
  const isRound = model === 'round'
  const roundAnchorSize = '60px'
  const anchorWidth = typeof restProps.width === 'number' ? `${restProps.width}px` : restProps.width
  const anchorHeight = typeof restProps.height === 'number' ? `${restProps.height}px` : restProps.height

  const raisedShadowDefault = isDown ? shadows['depth-2'] : shadows['depth-5']

  const commonStyles = `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: ${spaces['space-3']};
    border: none;
    border-radius: ${isRound ? radius['radius-round'] : radius['radius-1']};
    outline: none;
    padding: ${isRound ? spaces['space-3'] : spaces['space-2']};
    width: ${isRound ? roundAnchorSize : anchorWidth};
    height: ${isRound ? roundAnchorSize : anchorHeight};
    font-family: ${fontFamilies['mulish']};
    font-size: ${fontSizes['fs-1']};
    cursor: pointer;
    box-shadow: ${state === 'raised' ? raisedShadowDefault : 'unset'};
    transition: all ${transitions['cubicBezier-04']};
  `

  const AnchorDefaultElement = styled.a`
    ${commonStyles}
    margin: 0;
    padding: 0;
    background-color: transparent;
    color: ${props => colors[`${props.theme.colors.linkColor}`]};
    outline: none;
    text-decoration: underline;
  `

  const AnchorGhostElement = styled.a`
    ${commonStyles}
    min-height: 36px;
    background-color: transparent;
    text-decoration: none;
    text-transform: uppercase;
    color:${props => restProps.color ? colors[`${restProps.color}`] : colors[`${props.theme.colors.textColor}`]};

    &:hover,
    &:focus {
      background-color: ${colors['grey-V0--T2']};
    }

    & svg {
      fill: ${props => iconColor || colors[`${props.theme.colors.textColor}`]};
    }
  `

  const AnchorBlueElement = styled.a`
    ${commonStyles}
    min-height: 36px;
    background-color: ${colors['blue-30']};
    text-decoration: none;
    text-transform: uppercase;
    color: ${colors['white-0']};

    &:hover,
    &:focus {
      background-color: ${colors['blue-20']};
    }

    & svg {
      fill: ${colors['white-0']};
    }
  `

  const AnchorOrangeElement = styled.a`
    ${commonStyles}
    min-height: 36px;
    background-color: ${colors['orange-10']};
    color: ${colors['white-0']};
    text-decoration: none;
    text-transform: uppercase;
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

  const AnchorWhiteElement = styled.a`
    ${commonStyles}
    min-height: 36px;
    background-color: ${colors['white-10']};
    text-decoration: none;
    text-transform: uppercase;
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

  const AnchorElement = ({ children, ...restProps }: AnchorProps) => {
    switch (backgroundColor) {
      case 'blue-30':
        return <AnchorBlueElement {...restProps}>{children}</AnchorBlueElement>
      case 'orange-10':
        return <AnchorOrangeElement {...restProps}>{children}</AnchorOrangeElement>
      case 'white-10':
        return <AnchorWhiteElement {...restProps}>{children}</AnchorWhiteElement>
      case 'transparent':
        return <AnchorGhostElement {...restProps}>{children}</AnchorGhostElement>
      default:
        return <AnchorDefaultElement {...restProps}>{children}</AnchorDefaultElement>
    }
  }

  return (
    <AnchorElement
      renderAs={restProps.renderAs}
      href={href}
      onMouseDown={pressOrRelease}
      onTouchStart={pressOrRelease}
      onMouseUp={pressOrRelease}
      onTouchEnd={pressOrRelease}
      title={title}
      {...isExternal && {
        target: '_blank',
        rel: 'noopener noreferer',
      }
      }
    >
      {icon && <Icon name={icon} />}
      {text}
      {restProps.children}
    </AnchorElement>
  )
}
