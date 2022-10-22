import { CardProps } from './Card.types'
import { radius } from '../radius'
import { Box } from '../layout'
import { shadows } from '../shadows'
import { colors } from '../colors'
import styled from '@emotion/styled'

export const Card = ({
  type, children, ...restProps
}: CardProps) => {

  const CardElement = styled(Box)`
    background-color: ${props => colors[`${props.theme.colors.cardBgColor}`]};
    position: relative;
    overflow: hidden;
    border-radius: ${restProps.borderRadius || radius['radius-4']};
    box-shadow: ${restProps.boxShadow || shadows['depth-1']};

    & a {
      text-decoration: none;
    }

    & p {
      color: ${props => colors[`${props.theme.colors.textColor}`]};
    }
  `

  return <CardElement {...restProps} renderAs={'article'}>{children}</CardElement>
}
