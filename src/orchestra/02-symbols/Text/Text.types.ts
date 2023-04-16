import { ElementType } from 'react'
import { BoxProps } from '../Box';

type InlineElements = 'address' | 'abbr' | 'b' | 'bdi' | 'bdo' | 'cite' | 'dfn' | 'em' | 'figcaption' | 'i'  | 'kbd' | 'label' | 'mark' | 'p' | 'q' | 's' | 'samp' | 'small' | 'span' | 'strong' | 'sub' | 'sup' | 'time' | 'u' | 'var' | 'wbr'

export interface TextProps extends BoxProps<ElementType> {
  as?: Extract<keyof JSX.IntrinsicElements, InlineElements>
}
