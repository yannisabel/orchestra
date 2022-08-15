import { ReactNode } from "react"

interface LinkableCardProps {
  type: 'linkable'
  href: string
  target: string
  title: string
  children: ReactNode
}

interface CardDefaultProps {
  type: 'default'
  children: ReactNode
}

export type CardProps = LinkableCardProps | CardDefaultProps
