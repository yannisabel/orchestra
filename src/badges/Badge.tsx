import { BadgeProps } from './Badge.types'
import { Sticker } from '../stickers'

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
