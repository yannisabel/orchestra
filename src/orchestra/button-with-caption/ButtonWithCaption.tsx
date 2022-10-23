import { Anchor } from '../anchors/Anchor'
import { ButtonWithCaptionProps } from './ButtonWithCaption.types'

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
        href={linkto}
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
