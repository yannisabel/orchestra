import { useOrchestraTheme } from '../src/providers/hooks/useOrchestraTheme'
import { OrchestraProvider } from '../src/providers/OrchestraProvider'
import { Box } from '../src/layout/box'
import { Button } from '../src/buttons'
import { Text } from '../src/text'

const StoryContainer = ({children}) => {
  const { toggleTheme, isDark, currentTheme } = useOrchestraTheme()
  return (
    <Box flexDirection="column" backgroundColor={isDark ? 'blue-100' : 'white-10'} padding="space-1">
      <Box display="inline-flex">
        <Button onClick={toggleTheme} text={`Toggle Theme to ${isDark ? 'light' : 'dark'}`} />
      </Box>
      <OrchestraProvider themeName={currentTheme}>
        {children}
      </OrchestraProvider>
    </Box>
  )
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['Overview', ['Introduction', 'Getting Started', 'Principles'], 'Instruments', 'Symbols', 'Scores', 'Masterpieces'],
    },
  },
}

export const decorators = [
  (Story) => (
    <StoryContainer>
      <Story />
    </StoryContainer>
  )
]
