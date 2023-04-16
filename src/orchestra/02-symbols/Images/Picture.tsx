import { PictureProps } from './Picture.types'
import './image.scss'

export const Picture = ({
  src,
  width,
  height,
  alt,
  className,
  ...resProps
}: PictureProps) => {
  return (
    <img
      {...resProps}
      src={src}
      alt={alt}
      className={className}
    />
  )
}
