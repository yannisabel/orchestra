import type { ReactNode } from 'react'

interface TitleProps {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  value: string | ReactNode
  styleTitle?: string
}

export const Title = ({ type, value, styleTitle = undefined }: TitleProps) => {
  switch (type) {
    case 'h1':
      return <h1 className={styleTitle}>{value}</h1>
    case 'h2':
      return <h2 className={styleTitle}>{value}</h2>
    case 'h3':
      return <h3 className={styleTitle}>{value}</h3>
    case 'h4':
      return <h4 className={styleTitle}>{value}</h4>
    case 'h5':
      return <h5 className={styleTitle}>{value}</h5>
    case 'h6':
      return <h6 className={styleTitle}>{value}</h6>
    default:
      return null
  }
}
