import { useState } from 'react'
import { DarkModeToggle } from './DarkModeToggle'
import { Person } from './Icons'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLoginContext } from '../hooks/useLoginContext'
import { LoginContext } from '../context/LoginContext'
import { SweetAlertConfirm } from '../utils'
import { activeLink, activeLinkMobile, inactiveLink, inactiveLinkMobile } from '../utils/styles/NavbarStyles'

export const Navbar = (): JSX.Element => {
  const [showNavbar, setShowNavbar] = useState(false)

  const { user, setUser } = useLoginContext(LoginContext)
  const navigate = useNavigate()

  const handleLogout = async (): Promise<void> => {
    const response = await SweetAlertConfirm({
      title: 'Are you sure?',
      text: 'You wont be able to revert this',
      icon: 'warning',
      confirmButtonText: 'Confirm',
      titleFire: 'Loggedout',
      bodyFire: 'you have been loggedout',
      iconFire: 'success'

    })

    if (response.isConfirmed) {
      localStorage.removeItem('user')
      setUser(null)
      setShowNavbar(false)
      navigate('/')
    }
  }

  return (

<nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        <Link to='/' className="self-center text-2xl font-semibold whitespace-nowrap text-dark dark:text-white">Blog</Link>
    {
      (user === null)
        ? (
        <>
            <NavLink to='/login' className={({ isActive }) => isActive ? activeLinkMobile : inactiveLinkMobile} >Login</NavLink>
        </>
          )
        : (
        <button onClick={() => { setShowNavbar(!showNavbar) }} data-collapse-toggle="navbar-default" type="button" className="inline-flex border-4  shadow-inner items-center p-2 w-[100px] h-10 justify-center text-sm text-gray-600 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" >
            <Person/>
        </button>

          )
    }

        <div className={`${showNavbar ? ' w-full md:block md:w-auto relative ' : ' hidden w-full md:block md:w-auto'}`} id="navbar-default">
        <ul className="font-medium  flex flex-col gap-3  items-center p-4 md:p-0 mt-4  absolute -top-1 right-0  w-[200px] md:w-auto md:relative border-2  rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ">
        <DarkModeToggle/>
          <li className='w-full text-center'>
            <NavLink to='/' className={({ isActive }) => isActive ? activeLink : inactiveLink} >Home</NavLink>
          </li>

          {
            user === null
              ? (
                <>
                  <li className='w-full text-center'>
                    <NavLink to='/login' className={({ isActive }) => isActive ? activeLink : inactiveLink} >Login</NavLink>
                  </li>
                </>

                )
              : (
                <>
                  <li className='w-full text-center'>
                    <NavLink to='/myblogs' className={({ isActive }) => isActive ? activeLink : inactiveLink} >My Blogs</NavLink>
                  </li>
                  <li className='w-full text-center'>
                    <button onClick={() => {
                      void handleLogout()
                    }} className={`${inactiveLink} border-none  bg-gray-200`} type="button">Logout</button>
                  </li>
            </>
                )
          }
        </ul>
      </div>

  </div>
</nav>

  )
}
