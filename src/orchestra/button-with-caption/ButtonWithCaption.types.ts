import { AnchorProps } from 'anchors'

export interface ButtonWithCaptionProps {
  linkto: string
  model: AnchorProps['model']
  state: AnchorProps['state']
  color: AnchorProps['color']
  text: string
  title: string
  target: string
  caption: string
}
