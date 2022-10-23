import { TextProps } from './Text.types'
import styled from '@emotion/styled'
import { colors } from '../colors'
import { fontFamilies, fontSizes, fontWeights } from '../fonts'

export const Text = ({ children, renderAs, ...restProps }: TextProps) => {

  const TextElement = styled.p`
      display: ${restProps.display ? restProps.display : 'inline'};
      align-items: ${restProps.alignItems};
      justify-content: ${restProps.justifyContent};
      background-color: ${colors[`${restProps.backgroundColor}`]};
      position: ${restProps.position};
      translate: ${restProps.translate};
      height: ${typeof restProps.height === 'number' ? `${restProps.height}px` : restProps.height};
      width: ${typeof restProps.width === 'number' ? `${restProps.width}px` : restProps.width};
      margin-left: ${restProps.marginLeft};
      transition: ${restProps.transition};
      font-family: ${restProps.fontFamily ? fontFamilies[`${restProps.fontFamily}`] : fontFamilies['mulish']};
      font-size: ${restProps.fontSize ? fontSizes[`${restProps.fontSize}`] : fontSizes['fs-2']};
      font-weight: ${restProps.fontWeight ? fontWeights[`${restProps.fontWeight}`] : fontWeights['fw-regular']};
      color: ${props => restProps.color ? colors[`${restProps.color}`] : colors[`${props.theme.colors.textColor}`]};
  `


  return (
    <TextElement as={renderAs} {...restProps}>
      {children}
    </TextElement >
  )
}
