import { BoxProps } from '../box/Box.types'
import { ReactNode } from 'react'

interface LinkableCardProps {
  type: 'linkable'
  href: string
  target: string
  title: string
}

interface CardDefaultProps {
  type: 'default'
  href: never
  target: never
  title: never
}

interface CardCommonProps extends BoxProps {
  className?: string
  children: ReactNode
}

type IntrinsicCardProps = LinkableCardProps | CardDefaultProps

export type CardProps = CardCommonProps & IntrinsicCardProps
