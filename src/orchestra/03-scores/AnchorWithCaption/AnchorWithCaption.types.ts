import { ElementType } from 'react'
import type { AnchorProps } from '../../02-symbols/Anchors'
import { BoxProps } from '../../02-symbols/Box'

export interface AnchorWithCaptionProps extends BoxProps<ElementType> {
  href: string
  model?: AnchorProps['model']
  state?: AnchorProps['state']
  color?: AnchorProps['color']
  text: string
  title: string
  target?: string
  caption: string
}
