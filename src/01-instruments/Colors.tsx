import { Box } from "@symbols/Box"
import { allColors } from "./colors"

export const ColorList = () => {
  return Object.entries(allColors).map((color) => {
    console.log(color, allColors)
    return (
      <Box backgroundColor={allColors[`${color}`]} key={allColors[`${color}`]}>
        <p>
          value: allColors[`${color}`]
        </p>
      </Box>
    )
  })
}
