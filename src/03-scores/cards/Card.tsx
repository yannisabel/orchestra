import { CardProps } from './Card.types'
import styled from '@emotion/styled'
import { radius } from '@instruments/radius'
import { Box } from '@symbols/layout/box'
import { shadows } from '@instruments/shadows'
import { allColors } from '@instruments/colors'

export const Card = ({
  type, children, ...restProps
}: CardProps) => {

  const CardElement = styled(Box)`
    color: ${props => allColors[`${props.theme.textColor}`]};
    background-color: ${props => allColors[`${props.theme.cardBgColor}`]}
    position: relative;
    overflow: hidden;
    border-radius: ${restProps.borderRadius || radius['radius-4']};
    box-shadow: ${restProps.boxShadow || shadows['depth-1']};

    & p {
      color: ${props => props.theme.textColor};
    }
  `

  const LinkElement = styled(Box)`
  color: ${props => allColors[`${props.theme.textColor}`]};
  background-color: ${props => allColors[`${props.theme.cardBgColor}`]}
    position: relative;
    overflow: hidden;
    text-decoration: none;
    border-radius: ${restProps.borderRadius || radius['radius-4']};
    box-shadow: ${restProps.boxShadow || shadows['depth-1']};

    & p {
      color: ${props => allColors[`${props.theme.textColor}`]};
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
