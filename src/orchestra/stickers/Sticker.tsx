import { Picture } from '../Images'
import { Icon } from '../Icons'
import { Box } from '../Box'
import { StickerProps } from './Sticker.types'
import { radius } from '../Tokens/Radius'
import { shadows } from '../Tokens/Shadows'
import styled from '@emotion/styled'
import { colors } from '../Tokens/Colors'
import { spaces } from '../Tokens/Spaces'
import { fontFamilies, fontSizes } from '../Tokens/Fonts'

export const Sticker = ({
  model = 'default',
  color,
  ...restProps
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
    margin: ${spaces[`${restProps.margin}`]};
    margin-left: ${spaces[`${restProps.marginLeft}`]};
    margin-top: ${spaces[`${restProps.marginTop}`]};
    margin-right: ${spaces[`${restProps.marginRight}`]};
    margin-bottom: ${spaces[`${restProps.marginBottom}`]};
    border-radius: ${radius['radius-round']};
    box-shadow: ${shadows['depth-1']};
    padding: ${spaces[`${restProps.padding}`]};
    padding-left: ${spaces[`${restProps.paddingLeft}`]};
    padding-top: ${spaces[`${restProps.paddingTop}`]};
    padding-right: ${spaces[`${restProps.paddingRight}`]};
    padding-bottom: ${spaces[`${restProps.paddingBottom}`]};
    background-color: ${props => color ? colors[`${color}`] : colors[`${props.theme.colors.stickerBgColor}`]};
    font-family: ${fontFamilies['mulish']};
    font-size: ${fontSizes['fs-1']};
    text-align: center;

    & > * {
      position: relative;
      max-width: 50px;
      max-height: 50px;
    }

    & svg {
      fill: ${props => color ? colors[contentColor()] : colors[`${props.theme.colors.textColor}`]};
      width: ${model === 'default' ? '100%' : '30px'};
      height: ${model === 'default' ? '100%' : '30px'};
    }

    & span {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: ${props => color ? colors[contentColor()] : colors[`${props.theme.colors.textColor}`]}
    }
  `

  const Content = () => {
    if (restProps.type === 'image') {
      return (
        <div>
          <div className={restProps.imgHasBackgroundColor ? 'has-background' : ''}>
            <Picture
              src={restProps.image}
              alt={restProps.alt}
              width="100%"
            />
          </div>
        </div>
      )
    }

    if (restProps.type === 'icon') {
      return <Icon name={restProps.icon} />
    }

    return <span>{restProps.text}</span>
  }

  return (
    <ContentElement {...restProps}>
      <Content />
    </ContentElement>
  )
}
