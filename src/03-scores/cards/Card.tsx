import { CardProps } from './Card.types'
import styled from '@emotion/styled'

const CardStyled = styled.article`
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.cardBgColor};
    position: relative;
    overflow: hidden;
    border-radius: $radius-4;
    min-height: 100px;
    box-shadow: $depth-1;
`

const LinkStyled = styled.a`
  color: ${props => props.theme.textColor};
  text-decoration: none;
`

export const Card = ({
  type, children, ...restProps
}: CardProps) => {

  const Content = (): JSX.Element => {
    if (type === 'linkable') {
      return (
        <LinkStyled
          {...restProps}
        >
          <CardStyled>
            {children}
          </CardStyled>
        </LinkStyled>
      )
    }

    return <>{children}</>
  }

  return <CardStyled>
    <Content />
  </CardStyled>
}
