export interface PictureProps {
  src: string
  width?: number | string
  height?: number | string
  alt: string
  className?: string
  lazyLoading?: boolean
}