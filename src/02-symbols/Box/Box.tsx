import { BoxProps } from "./Box.types"
import styled from '@emotion/styled'
import { allColors } from "@instruments/colors"

export const Box: React.FC<BoxProps> = function Card({ children, ...restProps }) {

  const BoxElement = styled.div`
    color: ${allColors[`${restProps.color}` || 'grey-100']};
    background-color: ${allColors[`${restProps.backgroundColor}` || 'black-0']};
    position: ${restProps.position};
    overflow: ${restProps.overflow};
    border-radius: ${restProps.borderRadius};
    min-height: 100px;
    box-shadow: ${restProps.boxShadow};
    translate: ${restProps.translate};
`


  return (
    <BoxElement {...restProps} >
      {children}
    </BoxElement >
  )
}
