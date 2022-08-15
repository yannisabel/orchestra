import { Picture } from '@symbols/images/Picture'
import { Icon } from '@symbols/icons/Icons'

import './_sticker.scss'

interface StickerCommonProps {
  model?: 'default' | 'mini'
  color?: 'white' | 'blue' | 'orange' | 'blue-grey' | 'none'
  className?: string
}

interface StickerImageProps {
  type: 'image'
  image: string
  alt: string
  imgHasBackgroundColor?: boolean
}

interface StickerIconProps {
  type: 'icon'
  icon: string
}

interface StickerTextProps {
  type: 'text'
  text: string
}

export type StickerProps = StickerCommonProps &
  (StickerImageProps | StickerIconProps | StickerTextProps)

export const Sticker = ({
  model = 'default',
  color = 'white',
  ...props
}: StickerProps) => {
  const getStickerClasses = () => {
    const stickerClasses = [
      'sticker',
      `sticker-m--${model}`,
      `sticker-c--${color}`,
    ]

    return stickerClasses.join(' ')
  }

  const stickerClasses = `${[
    getStickerClasses(),
    props.className,
    props.type === 'image' ? 'has-img' : '',
  ].join(' ')}`

  const Content = () => {
    if (props.type === 'image') {
      return (
        <div className="sticker-content">
          <div className={props.imgHasBackgroundColor ? 'has-background' : ''}>
            <Picture
              src={props.image}
              alt={props.alt}
            />
          </div>
        </div>
      )
    }

    if (props.type === 'icon') {
      return <Icon name={props.icon} />
    }

    return <span>{props.text}</span>
  }

  return (
    <div className={stickerClasses}>
      <Content />
    </div>
  )
}
