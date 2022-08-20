import { ColorToken } from "@instruments/colors"
import { CSSProperties, ReactNode } from "react"

export type BoxOptions = CSSProperties & {
  backgroundColor?: ColorToken
  color?: ColorToken
  translate?: any 
}

export type BoxProps = BoxOptions & {
  children: ReactNode
}
