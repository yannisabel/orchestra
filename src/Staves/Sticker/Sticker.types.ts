import { ElementType } from "react"
import { BoxProps } from "../Box/Box.types"

interface StickerCommonProps extends BoxProps<ElementType> {
  model?: 'default' | 'mini'
  color?: 'white' | 'grey' | 'blue-grey' | 'blue' | 'orange'
  className?: string
}

interface StickerImageProps {
  type: 'image'
  image: string
  alt: string
}

interface StickerIconProps {
  type: 'icon'
  icon: string
}

interface StickerTextProps {
  type: 'text'
  text: string
}

export type StickerProps = StickerCommonProps &
  (StickerImageProps | StickerIconProps | StickerTextProps)