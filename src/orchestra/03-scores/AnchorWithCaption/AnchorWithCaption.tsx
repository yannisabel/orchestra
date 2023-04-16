import { Anchor } from '../../02-symbols/Anchors'
import { AnchorWithCaptionProps } from './AnchorWithCaption.types'
import { Box } from '../../02-symbols/Box'
import { Text } from '../../02-symbols/Text'

export const AnchorWithCaption = ({
  href,
  model = 'button',
  state = 'raised',
  color = 'blue',
  text,
  title,
  caption,
}: AnchorWithCaptionProps) => {
  return (
    <Box className="flex flex-direction--column align-items--center">
      <Anchor
        href={href}
        model={model}
        state={state}
        color={color}
        title={title}
        isExternal>
        {text}
      </Anchor>
      <Text className="fs-1 fw-bold">{caption}</Text>
    </Box>
  )
}
