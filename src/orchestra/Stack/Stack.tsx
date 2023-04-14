import type { StackProps } from './Stack.types'
import styled from '@emotion/styled'
import { colors } from '../Tokens/Colors'
import { spaces } from '../Tokens/Spaces'
import { Box } from '../Box'

export const Stack = ({ children, renderAs, className, ...restProps }: StackProps) => {

  const commonStyles = `
      display: flex;
      flex-direction: ${restProps.flexDirection};
      align-items: ${restProps.alignItems};
      align-self: ${restProps.alignSelf};
      justify-content: ${restProps.justifyContent};
      justify-self: ${restProps.justifySelf};
      margin: ${spaces[`${restProps.margin}`]};
      margin-left: ${spaces[`${restProps.marginLeft}`]};
      margin-top: ${spaces[`${restProps.marginTop}`]};
      margin-right: ${spaces[`${restProps.marginRight}`]};
      margin-bottom: ${spaces[`${restProps.marginBottom}`]};
      background-color: ${colors[`${restProps.backgroundColor}` || 'black-0']};
      position: ${restProps.position};
      overflow: ${restProps.overflow};
      border-radius: ${restProps.borderRadius};
      padding: ${spaces[`${restProps.padding}`]};
      padding-left: ${spaces[`${restProps.paddingLeft}`]};
      padding-top: ${spaces[`${restProps.paddingTop}`]};
      padding-right: ${spaces[`${restProps.paddingRight}`]};
      padding-bottom: ${spaces[`${restProps.paddingBottom}`]};
      min-height: ${restProps.minHeight};
      box-shadow: ${restProps.boxShadow};
      translate: ${restProps.translate};
      height: ${typeof restProps.height === 'number' ? `${restProps.height}px` : restProps.height};
      width: ${typeof restProps.width === 'number' ? `${restProps.width}px` : restProps.width};
      transition: ${restProps.transition};
  `

  const StackH = styled(Box)`
    ${commonStyles}
      & > * {
        margin-left: 0;
        margin-right: 0;
      }
    
      & > * + * {
        margin-left: ${spaces[`${restProps.spacing}`]}
      }
  `
  
  const StackV = styled(Box)`
  ${commonStyles}
      & > * {
        margin-top: 0;
        margin-bottom: 0;
      }
    
      & > * + * {
        margin-top: ${spaces[`${restProps.spacing}`]}
      }
  `

  if (restProps.flexDirection === 'row') {
    return <StackH {...restProps} spacing={restProps.spacing} className={className} as={renderAs}>{children}</StackH>
  }

  return (
    <StackV {...restProps} spacing={restProps.spacing} className={className} as={renderAs} >
      {children}
    </StackV >
  )
}
