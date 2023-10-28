import { useNavigate } from 'react-router-dom'
import { DarkModeToggle } from '../components/DarkModeToggle'

export const Error = (): JSX.Element => {
  const navigate = useNavigate()
  const handleNavigate = (): void => {
    navigate('/')
  }
  return (
    <section className="h-screen flex flex-col items-center justify-center gap-10 dark:bg-gray-800 ">
      <DarkModeToggle />
      <div className="error-image"></div>
      <p className="text-4xl sm:text-6xl text-blue-600 dark:text-white">
        PAGE NOT FOUND
      </p>
      <div className="flex flex-col gap-4 text-blue-600 text-lg text-center sm:font-semibold dark:text-white">
        <p>We looked everywhere for this page</p>
        <p>Are you sure the website I-JRL is correct?</p>
      </div>
      <button
        onClick={handleNavigate}
        className="border-[2px] border-blue-600 rounded-full px-10 py-2 text-blue-600 font-semibold outline-none dark:text-white"
      >
        Go Back
      </button>
    </section>
  )
}
