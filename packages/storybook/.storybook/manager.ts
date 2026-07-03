import { addons } from 'storybook/manager-api'
import { GLOBALS_UPDATED } from 'storybook/internal/core-events'
import { themes } from 'storybook/theming'

type ThemeMode = 'light' | 'dark' | 'system'

const isThemeMode = (value: unknown): value is ThemeMode =>
  value === 'light' || value === 'dark' || value === 'system'

const prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)')

let currentThemeMode: ThemeMode = 'system'

const resolveTheme = (themeMode: ThemeMode): 'light' | 'dark' => {
  if (themeMode === 'system') {
    return prefersDarkQuery.matches ? 'dark' : 'light'
  }

  return themeMode
}

const applyManagerTheme = (
  themeMode: ThemeMode,
  setOptions: (options: { theme: typeof themes.dark }) => void,
) => {
  const resolvedTheme = resolveTheme(themeMode)
  setOptions({
    theme: resolvedTheme === 'dark' ? themes.dark : themes.light,
  })
}

addons.register('orchestra/theme-sync', (api) => {
  const syncFromValue = (themeValue: unknown) => {
    currentThemeMode = isThemeMode(themeValue) ? themeValue : 'system'
    applyManagerTheme(currentThemeMode, api.setOptions)
  }

  syncFromValue(api.getGlobals()?.theme)

  api.on(GLOBALS_UPDATED, ({ globals }: { globals?: { theme?: unknown } }) => {
    syncFromValue(globals?.theme)
  })

  const handleSystemThemeChange = () => {
    if (currentThemeMode === 'system') {
      applyManagerTheme('system', api.setOptions)
    }
  }

  if (typeof prefersDarkQuery.addEventListener === 'function') {
    prefersDarkQuery.addEventListener('change', handleSystemThemeChange)
  } else {
    prefersDarkQuery.addListener(handleSystemThemeChange)
  }
})
