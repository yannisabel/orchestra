import { ThemeProvider } from '@emotion/react'
import { OrchestraProviderProps } from './OrchestraProvider.types'
import { light, dark } from '@instruments/colors'
import { useOrchestraTheme } from './hooks/useOrchestraTheme'

const theme = {
  light, dark
}

export const OrchestraProvider = ({ children, themeName }: OrchestraProviderProps) => {
  const { currentTheme } = useOrchestraTheme()
  return (
    <ThemeProvider theme={theme[themeName || currentTheme]}>
      {children}
    </ThemeProvider>
  )
}