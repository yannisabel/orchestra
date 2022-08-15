import { BoxProps } from "./Box.types"
import styled from '@emotion/styled'

export const Box: React.FC<BoxProps> = function Card({ renderAs, children, ...restProps }) {

  const BoxStyled = styled.div`
    color: ${restProps.color};
    background-color: ${restProps.backgroundColor};
    position: ${restProps.position};
    overflow: ${restProps.overflow};
    border-radius: ${restProps.borderRadius};
    min-height: 100px;
    box-shadow: ${restProps.boxShadow};
`

  const Element = renderAs || BoxStyled


  return (
    <Element {...restProps} >
      {children}
    </Element >
  )
}
