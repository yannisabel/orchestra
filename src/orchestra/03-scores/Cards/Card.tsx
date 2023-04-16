import { CardProps } from './Card.types'
import { Box } from '../../02-symbols/Box'
import './card.scss'

export const Card = ({
  type = 'default', children, as, ...restProps
}: CardProps) => {

  return <Box {...restProps} className={`card ${restProps.className}`} as={as || 'article'}>{children}</Box>
}
