import { useEffect, useState } from 'react'

export const DarkModeToggle = (): JSX.Element => {
  const [darkMode, setDarkMode] = useState(() => {
    const isDarkMode = localStorage.getItem('darkMode')
    return isDarkMode === 'true'
  })

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString())
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = (): void => {
    setDarkMode((prevDarkMode) => !prevDarkMode)
  }
  return (
    <button
    className="rounded-full w-8 h-8 bg-gray-300 dark:bg-gray-700"
    onClick={toggleDarkMode}
  >
    {/* You can use icons or text to indicate the mode */}
    {darkMode
      ? (
      <span className="text-white">🌙</span>
        )
      : (
      <span className="text-black">☀️</span>
        )}
  </button>
  )
}
