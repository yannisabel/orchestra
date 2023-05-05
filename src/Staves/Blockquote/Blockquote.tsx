import { Box } from '../Box'
import { Text } from '../Text'
import { BlockquoteProps } from './Blockquote.types'
import './Blockquote.scss'
import React from 'react'


export const Blockquote = ({
  className = '',
  citeUrl,
  quote,
  citeWho,
  citeFrom,
  ...props
}: BlockquoteProps)  => {
  return (
    <Box as="blockquote" cite={citeUrl} className={`${className}`} {...props}>
      <Text>{quote}</Text>
      <Box as="footer"><Text align='right'>— {citeWho}, <Text as="cite">{citeFrom}</Text></Text></Box>
    </Box>
  )
}
