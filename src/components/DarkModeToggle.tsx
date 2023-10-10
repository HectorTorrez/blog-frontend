import { useEffect, useState } from 'react'

export const DarkModeToggle = (): JSX.Element => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check if dark mode is set in localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)

    // Set dark mode on the body element
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    // Update localStorage when dark mode changes
    localStorage.setItem('darkMode', darkMode.toString())
    // Toggle the 'dark' class on the body element
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

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
