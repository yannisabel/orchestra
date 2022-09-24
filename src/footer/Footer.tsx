import { Box } from "../layout"
import { FooterProps } from "./Footer.types"

export const Footer = ({ children, ...restProps }: FooterProps) => {
  return (
    <Box {...restProps}>
      {children}
    </Box>
  )
}
