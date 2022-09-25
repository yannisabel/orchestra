import { CardProps } from './Card.types'
import { radius } from '../radius'
import { Box } from '../layout'
import { shadows } from '../shadows'
import { allColors } from '../colors'
import styled from '@emotion/styled'

export const Card = ({
  type, children, ...restProps
}: CardProps) => {

  const CardElement = styled(Box)`
    background-color: ${props => allColors[`${props.theme.colors.cardBgColor}`]};
    position: relative;
    overflow: hidden;
    border-radius: ${restProps.borderRadius || radius['radius-4']};
    box-shadow: ${restProps.boxShadow || shadows['depth-1']};

    & p {
      color: ${props => props.theme.colors.textColor};
    }
  `

  const LinkElement = styled(Box)`
  background-color: ${props => allColors[`${props.theme.colors.cardBgColor}`]};
    position: relative;
    overflow: hidden;
    text-decoration: none;
    border-radius: ${restProps.borderRadius || radius['radius-4']};
    box-shadow: ${restProps.boxShadow || shadows['depth-1']};
    color: ${props => allColors[`${props.theme.colors.textColor}`]};
    text-decoration: none;

    & p {
      color: ${props => allColors[`${props.theme.colors.textColor}`]};
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
