import { Picture } from '../images'
import { Icon } from '../icons'
import { Box } from '../layout/box'

import { StickerProps } from './Sticker.types'
import { radius } from '../radius'
import { shadows } from '../shadows'
import styled from '@emotion/styled'
import { allColors } from '../colors'
import { fontFamilies, fontSizes } from '../fonts'

export const Sticker = ({
  model = 'default',
  color,
  ...props
}: StickerProps) => {

  const contentColor = () => {
    if (color === 'white-0') {
      return 'black-V0--T50'
    }

    return 'white-0'
  }

  const ContentElement = styled(Box)`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: ${model === 'default' ? '100px' : '45px'};
    height: ${model === 'default' ? '100px' : '45px'};
    border-radius: ${radius['radius-round']};
    box-shadow: ${shadows['depth-1']};
    background-color: ${props => color ? allColors[`${color}`] : allColors[`${props.theme.colors.stickerBgColor}`]};
    font-family: ${fontFamilies['mulish']};
    font-size: ${fontSizes['fs-1']};
    text-align: center;

    & > * {
      position: relative;
      max-width: 50px;
      max-height: 50px;
    }

    & svg {
      fill: ${props => color ? allColors[contentColor()] : allColors[`${props.theme.colors.textColor}`]};
      width: ${model === 'default' ? '100%' : '30px'};
      height: ${model === 'default' ? '100%' : '30px'};
    }

    & span {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: ${props => color ? allColors[contentColor()] : allColors[`${props.theme.colors.textColor}`]}
    }
  `

  const Content = () => {
    if (props.type === 'image') {
      return (
        <div>
          <div className={props.imgHasBackgroundColor ? 'has-background' : ''}>
            <Picture
              src={props.image}
              alt={props.alt}
              width="100%"
            />
          </div>
        </div>
      )
    }

    if (props.type === 'icon') {
      return <Icon name={props.icon} />
    }

    return <span>{props.text}</span>
  }

  return (
    <ContentElement {...props}>
      <Content />
    </ContentElement>
  )
}
