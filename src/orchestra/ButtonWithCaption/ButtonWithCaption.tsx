import { Anchor } from '../Anchors'
import { ButtonWithCaptionProps } from './ButtonWithCaption.types'
import { Box } from '../Box'
import { Text } from '../Text'

export const ButtonWithCaption = ({
  href,
  model = 'default',
  state = 'raised',
  backgroundColor = 'blue-30',
  text,
  title,
  caption,
}: ButtonWithCaptionProps) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Anchor
        href={href}
        model={model}
        state={state}
        backgroundColor={backgroundColor}
        text={text}
        title={title}
        isExternal
      />
      <Text fontSize="fs-1" fontWeight="fw-bold">{caption}</Text>
    </Box>
  )
}
