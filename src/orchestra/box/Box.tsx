import type { BoxProps } from './Box.types'
import styled from '@emotion/styled'
import { colors } from '../Tokens/Colors'
import { spaces } from '../Tokens/Spaces'

export const Box = ({ children, renderAs, className, ...restProps }: BoxProps) => {

  const BoxElement = styled.div`
      display: ${restProps.display ? restProps.display : 'block'};
      flex-direction: ${restProps.flexDirection};
      align-items: ${restProps.alignItems};
      align-self: ${restProps.alignSelf};
      justify-content: ${restProps.justifyContent};
      justify-self: ${restProps.justifySelf};
      margin: ${spaces[`${restProps.margin}`]};
      margin-left: ${spaces[`${restProps.marginLeft}`]};
      margin-top: ${spaces[`${restProps.marginTop}`]};
      margin-right: ${spaces[`${restProps.marginRight}`]};
      margin-bottom: ${spaces[`${restProps.marginBottom}`]};
      background-color: ${colors[`${restProps.backgroundColor}` || 'black-0']};
      position: ${restProps.position};
      overflow: ${restProps.overflow};
      border-radius: ${restProps.borderRadius};
      padding: ${spaces[`${restProps.padding}`]};
      padding-left: ${spaces[`${restProps.paddingLeft}`]};
      padding-top: ${spaces[`${restProps.paddingTop}`]};
      padding-right: ${spaces[`${restProps.paddingRight}`]};
      padding-bottom: ${spaces[`${restProps.paddingBottom}`]};
      min-height: ${restProps.minHeight};
      box-shadow: ${restProps.boxShadow};
      translate: ${restProps.translate};
      height: ${typeof restProps.height === 'number' ? `${restProps.height}px` : restProps.height};
      width: ${typeof restProps.width === 'number' ? `${restProps.width}px` : restProps.width};
      transition: ${restProps.transition};
  `


  return (
    <BoxElement className={className} as={renderAs} {...restProps} >
      {children}
    </BoxElement >
  )
}
