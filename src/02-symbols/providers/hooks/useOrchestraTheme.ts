import { useEffect, useState } from "react"

export const useOrchestraTheme = () => {
  const [currentTheme, setCurrentTheme] = useState('dark')

  const toggleTheme = () => {
    if (currentTheme !== "dark") {
			localStorage.setItem("theme", "dark");
			setCurrentTheme("dark");
		} else {
			localStorage.setItem("theme", "light");
			setCurrentTheme("light");
		}
  }

  useEffect(() => {
    localStorage.setItem("theme", "dark");
    const localTheme = localStorage.getItem('theme')
    if (localTheme) {
      setCurrentTheme(localTheme)
    }
  }, [])

  return {
    currentTheme,
    toggleTheme,
  }
}