import type { AnchorProps } from '../../02-symbols/anchors/Anchor'
import { Anchor } from '../../02-symbols/anchors/Anchor'

interface ButtonWithCaptionProps {
  linkto: string
  model: AnchorProps['model']
  state: AnchorProps['state']
  color: AnchorProps['color']
  text: string
  title: string
  target: string
  caption: string
}

export const ButtonWithCaption = ({
  linkto,
  model = 'default',
  state = 'raised',
  color = 'blue',
  text,
  title,
  caption,
}: ButtonWithCaptionProps) => {
  return (
    <div className="button-caption">
      <Anchor
        linkto={linkto}
        model={model}
        state={state}
        color={color}
        text={text}
        title={title}
        isExternal
      />
      <p>{caption}</p>
    </div>
  )
}
