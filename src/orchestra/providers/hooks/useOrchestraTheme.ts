import { useEffect, useState } from 'react'

export const useOrchestraTheme = () => {
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
  const [currentTheme, setCurrentTheme] = useState(isDark ? 'dark' : 'light')

  const toggleTheme = () => {
    if (currentTheme !== 'dark') {
			localStorage.setItem('theme', 'dark');
			setCurrentTheme('dark')
      setIsDark(true)
		} else {
			localStorage.setItem('theme', 'light');
			setCurrentTheme('light')
      setIsDark(false)
		}
  }

  useEffect(() => {
    localStorage.setItem('theme', 'dark');
    const localTheme = localStorage.getItem('theme')
    if (localTheme) {
      setCurrentTheme(localTheme)
      setIsDark(localTheme === 'dark')
    }
  }, [])

  return {
    isDark,
    currentTheme,
    toggleTheme,
  }
}