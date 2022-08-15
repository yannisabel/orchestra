import { ElementType, ReactNode } from "react"

export interface FlexOptions {
  /**
   * `alignItems` style prop
   */
  alignItems?: 'center' | 'start' | 'end' | 'stretch'

  /**
   * `justifyContent` style prop
   */
  justifyContent?: 'center' | 'start' | 'space-between' | 'space-around' | 'space-evenly'

  /**
   * `flexWrap` style prop
   */
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'

  /**
   * `flexDirection` style prop
   */
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'

  /**
   * `flexBasis` style prop
   */
  flexBasis?: 'auto' | number | string

  /**
   * `flexGrow` style prop
   */
  flexGrow?: number

  /**
   * flexShrink` style prop
   */
  flexShrink?: number
}

export type FlexProps = FlexOptions & {
  children: ReactNode
}
