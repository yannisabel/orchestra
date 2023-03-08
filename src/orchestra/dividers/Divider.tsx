import styled from "@emotion/styled"
import { Box } from "../Box"
import { colors } from "../Tokens/Colors"
import { spaces } from "../Tokens/Spaces"
import { DividerProps } from "./Divider.types"

export const Divider = ({ ...restProps }: DividerProps) => {

  const DividerElement = styled(Box)`
    display: block;
    margin-top: ${spaces['space-3']};
    margin-bottom: ${spaces['space-3']};
    border-top: 1px solid;
    border-top-color: ${props => colors[`${props.theme.colors.dividerColor}`]};
  `

  return <DividerElement {...restProps} />
}
