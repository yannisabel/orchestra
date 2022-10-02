import { BoxProps } from './Box.types'
import styled from '@emotion/styled'
import { allColors } from '../../colors'
import { spaces } from '../../spaces'

export const Box = ({ children, renderAs, ...restProps }: BoxProps) => {

  const BoxElement = styled.div`
      display: ${restProps.display ? restProps.display : 'flex'};
      flex-direction: ${restProps.flexDirection ? restProps.flexDirection : 'row'};
      align-items: ${restProps.alignItems};
      justify-content: ${restProps.justifyContent};
      margin: ${spaces[`${restProps.margin}`]};
      margin-left: ${spaces[`${restProps.marginLeft}`]};
      margin-top: ${spaces[`${restProps.marginTop}`]};
      margin-right: ${spaces[`${restProps.marginRight}`]};
      margin-bottom: ${spaces[`${restProps.marginBottom}`]};
      background-color: ${allColors[`${restProps.backgroundColor}` || 'black-0']};
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
    <BoxElement as={renderAs} {...restProps} >
      {children}
    </BoxElement >
  )
}
