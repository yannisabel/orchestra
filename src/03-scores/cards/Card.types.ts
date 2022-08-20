import { BoxProps } from "@symbols/Box/Box.types"
import { ReactNode } from "react"

interface LinkableCardProps extends BoxProps {
  type: 'linkable'
  href: string
  target: string
  title: string
  children: ReactNode
}

interface CardDefaultProps extends BoxProps {
  type: 'default'
  children: ReactNode
}

export type CardProps = LinkableCardProps | CardDefaultProps
