import { StickerProps } from '../Stickers'

export interface BadgeProps {
  image: string
  alt: string
  legend: string
  color?: StickerProps['color']
  className?: string
}
