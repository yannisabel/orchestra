import type { AnchorProps } from 'Anchors.types'

export interface ButtonWithCaptionProps {
  href: string
  model?: AnchorProps['model']
  state?: AnchorProps['state']
  backgroundColor?: AnchorProps['backgroundColor']
  text: string
  title: string
  target?: string
  caption: string
}
