import { Picture } from '../Picture'
import { Icon } from '../Icon'
import { StickerProps } from './Sticker.types'
import './Sticker.scss'
import React from 'react'

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
          <div>
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
