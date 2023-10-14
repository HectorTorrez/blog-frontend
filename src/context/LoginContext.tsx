import { createContext, type ReactNode, useState } from 'react'
import { type LoginWithToken } from '../types/blogsTypes'

interface LoginContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
  setUser: (user: LoginWithToken | null) => void
  user: LoginWithToken | null
}

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  setUser: () => {},
  user: null
})

export const LoginProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<LoginWithToken | null>(null)
  console.log(user)

  return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, setUser, user }}>
            {children}
        </LoginContext.Provider>
  )
}
