import { BadgeProps } from './Badge.types'
import { Sticker } from '../../02-symbols/Stickers'
import { Text } from '../../02-symbols/Text'
import { Box } from '../../02-symbols/Box'

export const Badge = ({
  image,
  alt,
  legend,
  color,
  className
}: BadgeProps) => {

  return (
    <Box className={`badge ${className}`}>
      <Sticker
        type="image"
        image={image}
        alt={alt}
        color={color}
      />
      <Text className="fs-1">{legend}</Text>
    </Box>
  )
}
