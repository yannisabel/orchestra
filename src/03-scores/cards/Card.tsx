import { CardProps } from './Card.types'
import styled from '@emotion/styled'
import { radius } from '@instruments/radius'
import { Box } from '@symbols/layout/box'
import { shadows } from '@instruments/shadows'

export const Card = ({
  type, children, ...restProps
}: CardProps) => {

  const CardElement = styled(Box)`
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.cardBgColor};
    position: relative;
    overflow: hidden;
    border-radius: ${restProps.borderRadius || radius['radius-4']};
    min-height: 100px;
    box-shadow: ${restProps.boxShadow || shadows['depth-1']};
  `

  const LinkElement = styled(Box)`
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.cardBgColor};
    position: relative;
    overflow: hidden;
    min-height: 100px;
    text-decoration: none;
    border-radius: ${restProps.borderRadius || radius['radius-4']};
    min-height: 100px;
    box-shadow: ${restProps.boxShadow || shadows['depth-1']};
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
