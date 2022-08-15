import { CardProps } from './Card.types'
import './_card.scss'

export const Card = ({
  type, children, ...restProps
}: CardProps) => {

  const Content = (): JSX.Element => {
    if (type === 'linkable') {
      return (
        <a
          className="card__link"
          {...restProps}
        >
          {children}
        </a>
      )
    }

    return <>{children}</>
  }

  return <article className="card">
    <Content />
  </article>
}
