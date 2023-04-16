import { ElementType } from "react"
import { BoxProps } from "../Box"

interface StickerCommonProps extends BoxProps<ElementType> {
  model?: 'default' | 'mini'
  color?: 'white' | 'blue' | 'orange' | 'blue'
  className?: string
}

interface StickerImageProps {
  type: 'image'
  image: string
  alt: string
  imgHasBackgroundColor?: boolean
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