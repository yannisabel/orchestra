import type { StickerProps } from '@symbols/stickers/Sticker'
import { Sticker } from '@symbols/stickers/Sticker'

interface BadgeProps {
  image: string
  alt: string
  legend: string
  color?: StickerProps['color']
  imgHasBackgroundColor?: boolean
}

export const Badge = ({
  image,
  alt,
  legend,
  color = 'white',
  imgHasBackgroundColor = false,
}: BadgeProps) => {
  return (
    <div className="badge">
      <Sticker
        type="image"
        image={image}
        alt={alt}
        color={color}
        imgHasBackgroundColor={imgHasBackgroundColor}
      />
      <p
        className="badge__legend"
        dangerouslySetInnerHTML={{ __html: legend }}
      />
    </div>
  )
}
