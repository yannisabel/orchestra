interface StickerCommonProps {
  model?: 'default' | 'mini'
  color?: 'white' | 'blue' | 'orange' | 'blue-grey' | 'none'
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