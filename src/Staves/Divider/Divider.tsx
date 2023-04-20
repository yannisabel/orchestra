import { Box } from "../Box"
import { DividerProps } from "./Divider.types"
import './divider.scss'
import React from "react"

export const Divider = ({ ...restProps }: DividerProps) => {

  return <Box className="divider" as="hr" {...restProps} />
}
