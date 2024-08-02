import { StickerProps } from '../Sticker/Sticker.types'

export interface BadgeProps {
  image: string
  alt: string
  legend: string
  variant?: StickerProps['variant']
  className?: string
}
