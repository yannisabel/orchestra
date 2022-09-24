import { CardProps } from './Card.types'
import styled from "../theme/theme.types"
import { radius } from '../radius'
import { Box } from '../layout'
import { shadows } from '../shadows'
import { allColors } from '../colors'

export const Card = ({
  type, children, ...restProps
}: CardProps) => {

  const CardElement = styled(Box)`
    color: ${props => allColors[`${props.theme.color.textColor}`]};
    background-color: ${props => allColors[`${props.theme.color.cardBgColor}`]}
    position: relative;
    overflow: hidden;
    border-radius: ${restProps.borderRadius || radius['radius-4']};
    box-shadow: ${restProps.boxShadow || shadows['depth-1']};

    & p {
      color: ${props => props.theme.color.textColor};
    }
  `

  const LinkElement = styled(Box)`
  color: ${props => allColors[`${props.theme.color.textColor}`]};
  background-color: ${props => allColors[`${props.theme.color.cardBgColor}`]}
    position: relative;
    overflow: hidden;
    text-decoration: none;
    border-radius: ${restProps.borderRadius || radius['radius-4']};
    box-shadow: ${restProps.boxShadow || shadows['depth-1']};

    & p {
      color: ${props => allColors[`${props.theme.color.textColor}`]};
      text-decoration: none;
    }
  `

  const Content = (): JSX.Element => {
    if (type === 'linkable') {
      return (
        <LinkElement
          {...restProps}
          renderAs={'a'}
        >
          <CardElement>
            {children}
          </CardElement>
        </LinkElement>
      )
    }

    return <>{children}</>
  }

  return <CardElement {...restProps} renderAs={'article'}>
    <Content />
  </CardElement>
}
