import { useState } from 'react'
import { DarkModeToggle } from './DarkModeToggle'
import { MobileNavIcon } from './Icons'
import { Link, NavLink } from 'react-router-dom'
import { useLoginContext } from '../hooks/useLoginContext'
import { LoginContext } from '../context/LoginContext'

export const Navbar = (): JSX.Element => {
  const [showNavbar, setShowNavbar] = useState(false)

  const { user, setUser } = useLoginContext(LoginContext)

  const activeLink = 'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500'
  const inactiveLink = 'block py-2 pl-3 pr-4 text-blue bg-white-700 rounded md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-white-500'

  const handleLogout = (): void => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (

<nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        <Link to='/' className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Blog</Link>

    <button onClick={() => { setShowNavbar(!showNavbar) }} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" >
        <MobileNavIcon/>
    </button>

        <div className={`${showNavbar ? ' w-full md:block md:w-auto' : ' hidden w-full md:block md:w-auto'}`} id="navbar-default">
        <ul className="font-medium flex flex-col gap-2 items-center p-4 md:p-0 mt-4 border absolute w-[95%] md:w-auto md:relative border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <DarkModeToggle/>
          <li>
            <NavLink to='/' className={({ isActive }) => isActive ? activeLink : inactiveLink} >Home</NavLink>
          </li>

          {
            user === null
              ? (
          <li>
            <NavLink to='/login' className={({ isActive }) => isActive ? activeLink : inactiveLink} >Login</NavLink>
          </li>

                )
              : (
          <li>
            <button onClick={handleLogout} className='block py-2 pl-3 pr-4 text-blue bg-white-700 rounded md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-white-500' type="button">Logout</button>
          </li>
                )
          }
        </ul>
      </div>

  </div>
</nav>

  )
}
