import { FlexProps } from "./Flex.types"

import './_flex.scss'

export const Flex: React.FC<FlexProps> = function Card({ renderAs, children, ...restProps }) {
  const Element = renderAs || 'div'

  let className = ''

  const getAlignItemsClassName = () => {
    switch (restProps) {
      case restProps.alignItems === 'center':
        className = 'align-items-center'
        break
      case restProps.alignItems === 'end':
        className = 'align-items-end'
      case restProps.alignItems === 'start':
        className = 'align-items-start'
      case restProps.alignItems === 'stretch':
        className = 'align-items-stretch'
      default:
        return;
    }
  }

  getAlignItemsClassName()

  return (
    <Element className={`flex ${className}`}>
      {children}
    </Element>
  )
}
