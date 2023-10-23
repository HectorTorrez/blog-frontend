import { useEffect, useState } from 'react'
import { Moon, Sun } from './Icons'

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
    className="w-full flex justify-center p-2 md:border-4 shadow-inner hover:border-blue-500 md:border-gray-200 md:rounded-lg text-white border-2 border-gray-200 rounded-lg md:bg-transparent md:text-blue-700 md:p-x-4 dark:text-white dark:shadow-none dark:border-2 md:dark:text-blue-500 dark:hover:border-blue-500 "
    onClick={toggleDarkMode}
  >
    {darkMode
      ? (
      <p className="text-white text-center"><Moon/></p>
        )
      : (
      <span className="text-black text-center"><Sun/></span>
        )}
  </button>
  )
}
