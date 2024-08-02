import { ElementType } from "react"
import { BoxProps } from "../Box/Box.types"
import { IconProps } from "../Icon/Icon.types"

interface StickerCommonProps extends BoxProps<ElementType> {
  model?: 'default' | 'mini'
  variant?: 'primary' | 'secondary' | 'tertiary'
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
  iconSize?: IconProps['size']
}

interface StickerTextProps {
  type: 'text'
  text: string
}

export type StickerProps = StickerCommonProps &
  (StickerImageProps | StickerIconProps | StickerTextProps)