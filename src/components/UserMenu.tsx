import { NavLink } from 'react-router-dom'
import { Button } from './Button'
import { Person } from './Icons'
import { type User } from '../types/blogsTypes'
import {
  activeLink,
  inactiveLink
} from '../utils/styles/NavbarStyles'

interface UserMenuProps {
  setShowNavbar: (value: boolean) => void
  showNavbar: boolean
  user: User
  handleLogout: () => Promise<void>
}

export const UserMenu = ({
  setShowNavbar,
  showNavbar,
  user,
  handleLogout
}: UserMenuProps): JSX.Element => {
  return (
    <div>
      <Button
        onClick={() => {
          setShowNavbar(!showNavbar)
        }}
        type="button"
        className="inline-flex border-4  shadow-inner items-center p-2 w-[100px] h-10 justify-center text-sm text-gray-600 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <Person />
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
                    to="/login"
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
                    to="/myblogs"
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
