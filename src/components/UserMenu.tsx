import { NavLink } from 'react-router-dom'
import { Button } from './Button'

import {
  activeLink,
  inactiveLink
} from '../utils/styles/NavbarStyles'

import { LoginContext } from '../context/LoginContext'
import { useContext } from 'react'

interface UserMenuProps {
  setShowNavbar: (value: boolean) => void
  showNavbar: boolean
  handleLogout: () => Promise<void>
}

export const UserMenu = ({
  setShowNavbar,
  showNavbar,
  handleLogout
}: UserMenuProps): JSX.Element => {

  const { user } = useContext(LoginContext)

  return (
    <div>
      <Button
        onClick={() => {
          setShowNavbar(!showNavbar)
        }}
        type="button"
        className="inline-flex border-2  shadow-inner items-center  w-[100px] h-[34px] justify-center text-sm text-gray-600 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
       <img className='object-cover h-full w-[30px] rounded-full' src={user?.imageProfile.secure_url} alt="image profile" />
      </Button>
      <div
        className={`${
          showNavbar
            ? ' w-full md:block md:w-auto relative '
            : ' hidden w-full  md:w-auto'
        }`}
        id="navbar-default"
      >
        <ul className="font-medium flex flex-col gap-3  items-center p-4  mt-4  absolute -top-1 right-0  w-[200px] border-2  rounded-lg bg-gray-50  dark:bg-gray-800  dark:border-gray-700 ">
        {user === null
          ? (
              <>
                <li className="w-full text-center">
                  <NavLink
                    to="/auth"
                    className={({ isActive }) =>
                      isActive ? activeLink : inactiveLink
                    }
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )
          : (
              <>
                <li className="w-full text-center">
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive ? activeLink : inactiveLink
                    }
                  >
                    My Profile
                  </NavLink>
                </li>
                <li className="w-full text-center ">
                  <Button
                    onClick={() => {
                      void handleLogout()
                    }}
                    type="button"
                    className={inactiveLink}
                  >
                    Logout
                  </Button>
                </li>
                </>
            )
        }
        </ul>
      </div>
    </div>
  )
}
