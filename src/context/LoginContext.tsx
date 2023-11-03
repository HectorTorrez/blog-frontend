import { createContext, type ReactNode, useState, useEffect } from 'react'
import { type LoginWithToken } from '../types/blogsTypes'

interface LoginContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
  user: LoginWithToken | null
  changeUser: (newState: LoginWithToken | null) => void
}

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  changeUser: () => {}
})

export const LoginProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<LoginWithToken | null>(
    () => {
      const user = localStorage.getItem('user')
      if (user !== null) {
        return JSON.parse(user)
      }
      return null
    }
  )

  const changeUser = (newState: LoginWithToken | null): void => {
    setUser(newState)
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user, changeUser])

  return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, changeUser, user }}>
            {children}
        </LoginContext.Provider>
  )
}
