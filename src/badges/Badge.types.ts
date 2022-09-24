import { StickerProps } from 'stickers'

export interface BadgeProps {
  image: string
  alt: string
  legend: string
  color?: StickerProps['color']
  imgHasBackgroundColor?: boolean
}
