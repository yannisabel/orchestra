import { BoxProps } from "./Box.types"
import styled from '@emotion/styled'
import { allColors } from "@instruments/colors"
import { fontFamilies, fontSizes, fontWeights } from "@instruments/fonts"

export const Box = ({ children, renderAs, ...restProps }: BoxProps) => {

  const BoxElement = styled.div`
      display: ${restProps.display};
      align-items: ${restProps.alignItems};
      justify-content: ${restProps.justifyContent};
      color: ${allColors[`${restProps.color}` || 'grey-100']};
      background-color: ${allColors[`${restProps.backgroundColor}` || 'black-0']};
      position: ${restProps.position};
      overflow: ${restProps.overflow};
      border-radius: ${restProps.borderRadius};
      min-height: 100px;
      box-shadow: ${restProps.boxShadow};
      translate: ${restProps.translate};
      height: ${typeof restProps.height === 'number' ? `${restProps.height}px` : restProps.height};
      width: ${typeof restProps.width === 'number' ? `${restProps.width}px` : restProps.width};
      margin-left: ${restProps.marginLeft};
      transition: ${restProps.transition};
      font-family: ${fontFamilies[`${restProps.fontFamily}`] || fontFamilies['mulish']};
      font-size: ${fontSizes[`${restProps.fontSize}`]};
      font-weight: ${fontWeights[`${restProps.fontWeight}`]};
  `


  return (
    <BoxElement as={renderAs} {...restProps} >
      {children}
    </BoxElement >
  )
}
