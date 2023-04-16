import { BoxProps } from '../../02-symbols/Box'
import { ElementType, ReactNode } from 'react'

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

interface CardCommonProps extends BoxProps<ElementType> {
  className?: string
  children: ReactNode
}

type IntrinsicCardProps = LinkableCardProps | CardDefaultProps

export type CardProps = CardCommonProps & IntrinsicCardProps
