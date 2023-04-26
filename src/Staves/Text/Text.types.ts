import { ElementType } from 'react'
import { BoxProps } from '../Box';

type InlineElements = 'address' | 'abbr' | 'b' | 'bdi' | 'bdo' | 'cite' | 'code' | 'dfn' | 'em' | 'figcaption' | 'i' | 'kbd' | 'label' | 'mark' | 'p' | 'q' | 's' | 'samp' | 'small' | 'span' | 'strong' | 'sub' | 'sup' | 'time' | 'u' | 'var' | 'wbr'

type Alignments = 'center' | 'end' | 'justify' | 'left' | 'right' | 'start'

export interface TextProps extends BoxProps<ElementType> {
  as?: Extract<keyof JSX.IntrinsicElements, InlineElements>
  fontFamily?: 'ff-openSans' | 'ff-mulish'
  fontWeight?: 'fw-regular' | 'fw-medium' | 'fw-bold' | 'fw-extraBold' | 'fw-black'
  fontSize?: 'fs-1' | 'fs-2' | 'fs-3' | 'fs-4' | 'fs-5' | 'fs-6' | 'fs-7' | 'fs-8' | 'fs-9' | 'fs-10' | 'fs-11' | 'fs-12' | 'fs-13' | 'fs-14'
  align?: Alignments
}
