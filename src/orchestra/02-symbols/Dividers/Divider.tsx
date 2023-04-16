import { Box } from "../Box"
import { DividerProps } from "./Divider.types"
import './divider.scss'

export const Divider = ({ ...restProps }: DividerProps) => {

  return <Box className="divider" as="hr" {...restProps} />
}
