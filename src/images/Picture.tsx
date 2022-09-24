import { PictureProps } from './Picture.types'

export const Picture = ({
  src,
  width,
  height,
  alt,
  classes,
  ...resProps
}: PictureProps) => {
  return (
    <img
      {...resProps}
      src={src}
      alt={alt}
      className={classes}
      width={width}
      height={height}
    />
  )
}
