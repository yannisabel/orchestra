import { BadgeProps } from './Badge.types'
import { Sticker } from '../stickers'
import { Text } from '../text'
import styled from '@emotion/styled'
import { Box } from '../box'

export const Badge = ({
  image,
  alt,
  legend,
  color = 'white',
}: BadgeProps) => {

  const BadgeElement = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    vertical-align: top;
    width: 100px;
  `

  return (
    <BadgeElement>
      <Sticker
        type="image"
        image={image}
        alt={alt}
        color={color}
      />
      <Text textAlign="center">{legend}</Text>
    </BadgeElement>
  )
}
