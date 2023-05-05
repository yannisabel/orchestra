import { Box } from "../Box"
import { DividerProps } from "./Divider.types"
import './Divider.scss'
import React from "react"

export const Divider = ({ ...restProps }: DividerProps) => {

  return <Box className="divider" as="hr" {...restProps} />
}
