import './_image.scss'

interface PictureProps {
  src: string
  width?: number | string
  height?: number | string
  alt: string
  classes?: string
}

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
