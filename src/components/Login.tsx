import { Link, useNavigate } from 'react-router-dom'
import { Email, Lock } from './Icons'
import { Navbar } from './Navbar'
import { login, setToken } from '../services/blogServices'
import { useState, useContext } from 'react'
import { LoginContext } from '../context/LoginContext'
import { Alert } from './Alert'

export const Login = (): JSX.Element => {
  const { setUser } = useContext(LoginContext)
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleChange = (e: EventTarget & HTMLInputElement): void => {
    const { name, value } = e
    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      const getUser = await login({ username: credentials.username, password: credentials.password })
      if (getUser.error !== null) {
        setError(getUser.error)
      }
      if (getUser.token.length > 0) {
        setUser(getUser)
        setToken(getUser.token)
      }
      if (getUser.token?.length > 0) {
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
<section className="bg-gray-50 dark:bg-gray-900 ">
    <Navbar/>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 ">
        <div className="w-full bg-white mb-[150px] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      {
        (error?.length > 0) ? <Alert text={error} type='error'/> : null
      }
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Login
                </h1>
                <form onSubmit={(e) => { void handleLogin(e) }} className="space-y-4 md:space-y-6" action="#">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                           <Email/>
                        </div>
                        <input type="text" onChange={(e) => { handleChange(e.target) }} value={credentials.username} id="username" name='username' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username"/>
                    </div>
                </label>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                           <Lock/>
                        </div>
                        <input type="password" onChange={(e) => { handleChange(e.target) }} value={credentials.password} id="password" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••"/>
                    </div>
                </label>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                        </div>
                    </div>
                    <button type="submit" className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Create an account</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?  <Link to='/register' className="font-medium text-gray-600 hover:underline dark:text-gray-500">Sign up</Link>
                    </p>
                </form>
            </div>
        A</div>
    </div>
  </section>

  )
}
