import { TextProps } from "./Text.types"
import styled from '@emotion/styled'
import { allColors } from "@instruments/colors"
import { fontFamilies, fontSizes, fontWeights } from "@instruments/fonts"

export const Text = ({ children, renderAs, ...restProps }: TextProps) => {

  const TextElement = styled.p`
      display: ${restProps.display ? restProps.display : 'inline'};
      align-items: ${restProps.alignItems};
      justify-content: ${restProps.justifyContent};
      background-color: ${allColors[`${restProps.backgroundColor}` || 'black-0']};
      position: ${restProps.position};
      translate: ${restProps.translate};
      height: ${typeof restProps.height === 'number' ? `${restProps.height}px` : restProps.height};
      width: ${typeof restProps.width === 'number' ? `${restProps.width}px` : restProps.width};
      margin-left: ${restProps.marginLeft};
      transition: ${restProps.transition};
      font-family: ${restProps.fontFamily ? fontFamilies[`${restProps.fontFamily}`] : fontFamilies['mulish']};
      font-size: ${fontSizes[`${restProps.fontSize}`]};
      font-weight: ${fontWeights[`${restProps.fontWeight}`]};
      color: ${restProps.color ? allColors[`${restProps.color}`] : allColors['grey-100']};
  `


  return (
    <TextElement as={renderAs} {...restProps} >
      {children}
    </TextElement >
  )
}
