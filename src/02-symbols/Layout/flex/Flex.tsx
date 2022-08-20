import { Box } from "@symbols/Box"
import { FlexProps } from "./Flex.types"
import styled from '@emotion/styled'

export const Flex = ({ children, ...restProps }: FlexProps) => {

  const FlexElement = styled(Box)`
    display: ${restProps.display || 'flex'};
    align-items: ${restProps.alignItems};
    justify-content: ${restProps.justifyContent};
    flex-wrap: ${restProps.flexWrap};
    flex-direction: ${restProps.flexDirection};
    flex-basis: ${restProps.flexBasis};
    flex-grow: ${restProps.flexGrow};
    flex-shrink: ${restProps.flexShrink};
`

  return (
    <FlexElement {...restProps}>
      {children}
    </FlexElement>
  )
}
