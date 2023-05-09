import { PictureProps } from './Picture.types'
import './Picture.scss'
import React from 'react'

export const Picture = ({
  src,
  alt,
  className,
  lazyLoading = true,
  ...resProps
}: PictureProps) => {
  return (
    <img
      {...resProps}
      src={src}
      alt={alt}
      className={className}
      {
        ...lazyLoading && {
          loading: 'lazy',
          decoding: 'async',
        }
      }
    />
  )
}
