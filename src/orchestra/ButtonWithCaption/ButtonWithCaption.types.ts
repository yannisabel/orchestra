import type { AnchorProps } from '../Anchors'
import { BoxProps } from '../Box'

export interface ButtonWithCaptionProps extends BoxProps {
  href: string
  model?: AnchorProps['model']
  state?: AnchorProps['state']
  backgroundColor?: AnchorProps['backgroundColor']
  text: string
  title: string
  target?: string
  caption: string
}
