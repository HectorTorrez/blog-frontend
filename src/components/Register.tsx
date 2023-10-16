import { Link, useNavigate } from 'react-router-dom'
import { Email, Lock, User } from './Icons'
import { Navbar } from './Navbar'
import { useState } from 'react'
import { createUser } from '../services/blogServices'

export const Register = (): JSX.Element => {
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const navigate = useNavigate()

  const hanndleChange = (e: EventTarget & HTMLInputElement): void => {
    const { name, value } = e
    setUserCredentials({
      ...userCredentials,
      [name]: value
    })
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      if (userCredentials.password !== userCredentials.confirmPassword) { console.error('password arent the same') }
      const response = await createUser({ name: userCredentials.name, username: userCredentials.username, password: userCredentials.password })
      console.log(response)

      // TODO navigate when response its true and create type for this response
      if (response) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
        <Navbar/>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">

        <div className="w-full bg-white mb-[150px] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create and account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                           <User/>
                        </div>
                        <input type="text" onChange={(e) => { hanndleChange(e.target) }} value={userCredentials.name} id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Antonio"/>
                    </div>
                </label>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                           <Email/>
                        </div>
                        <input type="text" onChange={(e) => { hanndleChange(e.target) }} value={userCredentials.username} id="username" name='username' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username"/>
                    </div>
                </label>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                           <Lock/>
                        </div>
                        <input type="password" onChange={(e) => { hanndleChange(e.target) }} value={userCredentials.password} id="password" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••"/>
                    </div>
                </label>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm your Password
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                           <Lock/>
                        </div>
                        <input type="password" onChange={(e) => { hanndleChange(e.target) }} value={userCredentials.confirmPassword} id="confirmPassword" name='confirmPassword' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••"/>
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
                        Already have an account? <Link to='/login' className="font-medium text-gray-600 hover:underline dark:text-gray-500">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
  )
}
