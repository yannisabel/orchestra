import { TextProps } from './Text.types'
import styled from '@emotion/styled'
import { colors } from '../Tokens/Colors'
import { spaces } from '../Tokens/Spaces'
import { fontFamilies, fontSizes, fontWeights } from '../Tokens/Fonts'

export const Text = ({ children, ...restProps }: TextProps) => {

  const TextElement = styled.p`
      display: ${restProps.display ? restProps.display : 'inline'};
      align-items: ${restProps.alignItems};
      justify-content: ${restProps.justifyContent};
      background-color: ${colors[`${restProps.backgroundColor}`]};
      position: ${restProps.position};
      translate: ${restProps.translate};
      height: ${typeof restProps.height === 'number' ? `${restProps.height}px` : restProps.height};
      width: ${typeof restProps.width === 'number' ? `${restProps.width}px` : restProps.width};
      margin: ${spaces[`${restProps.margin}`]};
      margin-left: ${spaces[`${restProps.marginLeft}`]};
      margin-top: ${spaces[`${restProps.marginTop}`]};
      margin-right: ${spaces[`${restProps.marginRight}`]};
      margin-bottom: ${spaces[`${restProps.marginBottom}`]};
      background-color: ${colors[`${restProps.backgroundColor}` || 'black-0']};
      overflow: ${restProps.overflow};
      padding: ${spaces[`${restProps.padding}`]};
      padding-left: ${spaces[`${restProps.paddingLeft}`]};
      padding-top: ${spaces[`${restProps.paddingTop}`]};
      padding-right: ${spaces[`${restProps.paddingRight}`]};
      padding-bottom: ${spaces[`${restProps.paddingBottom}`]};
      transition: ${restProps.transition};
      font-family: ${restProps.fontFamily ? fontFamilies[`${restProps.fontFamily}`] : fontFamilies['mulish']};
      font-size: ${restProps.fontSize ? fontSizes[`${restProps.fontSize}`] : fontSizes['fs-2']};
      font-weight: ${restProps.fontWeight ? fontWeights[`${restProps.fontWeight}`] : fontWeights['fw-regular']};
      color: ${props => restProps.color ? colors[`${restProps.color}`] : colors[`${props.theme.colors.textColor}`]};
  `


  return (
    <TextElement {...restProps}>
      {children}
    </TextElement >
  )
}
