import { Box } from "@symbols/Box"
import { FlexProps } from "./Flex.types"

export const Flex: React.FC<FlexProps> = function Card({ children, ...restProps }) {

  return (
    <Box display="flex" {...restProps}>
      {children}
    </Box>
  )
}
