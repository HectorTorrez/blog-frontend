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
    className="flex justify-center  items-center shadow-inner font-medium h-[30px]  border hover:border-2 border-gray-200 w-[164px] hover:font-medium rounded hover: hover:border-[#e2e8f0]  dark:text-white dark:border-gray-200 dark:hover:bg-gray-900   dark:active:bg-gray-900 "
    onClick={toggleDarkMode}
  >
    {darkMode
      ? (
      <p className=" text-center text-white-700 font-medium"><Moon/></p>
        )
      : (
      <span className="text-black text-center"><Sun/></span>
        )}
  </button>
  )
}
