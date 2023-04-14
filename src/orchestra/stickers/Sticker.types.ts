import { BoxProps } from "../Box"

interface StickerCommonProps extends BoxProps {
  model?: 'default' | 'mini'
  color?: 'white-0' | 'blue-30' | 'orange-10' | 'blue-40'
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