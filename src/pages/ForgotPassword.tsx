import { Email, Lock } from '../components/Icons'
import { Input } from '../components/Input'
import { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { Button } from '../components/Button'
import { useRegisterValidation } from '../hooks/useFormValidation'
import { ProgressBar } from '../components/ProgressBar'
import { getUser, updateUser } from '../services'
import { Alert } from '../components/Alert'
import { type UserForResetPassword } from '../types/blogsTypes'
import { useNavigate } from 'react-router-dom'

export const ForgotPassword = (): JSX.Element => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [variant, setVariant] = useState<'getUser' | 'resetPassword'>('getUser')

  const [user, setUser] = useState<UserForResetPassword | null>(null)

  const navigate = useNavigate()

  const {
    errorConfirmPassword,
    errorPassword,
    errorUsername,
    error,
    setError
  } = useRegisterValidation({ password, confirmPassword, username })

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        if (progress <= 90) {
          setProgress((prevProgress) => prevProgress + 10)
        } else {
          clearInterval(interval)
        }
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [progress, loading])

  const findUser = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await getUser(username)
      setUser(response)
      if (response.error?.length > 0) {
        setVariant('getUser')
        setError(response.error)
        setLoading(false)
        return
      }

      setError('')
      setVariant('resetPassword')
      setLoading(false)
    } catch (error: any) {
      console.error(error)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    setProgress(0)
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match')
        setLoading(false)
        return
      }

      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)
      const response = await updateUser(formData, user?.id as string)
      if (response.id?.length > 0) {
        navigate('/auth')
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[calc(100vh-67px)] lg:py-0 ">
        <div className="w-full relative  bg-white  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
          {loading ? <ProgressBar progress={progress} /> : null}
          <h3 className="text-4xl mt-4 text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Forgot Password
          </h3>
          <p className="block mb-2 text-center text-sm font-medium text-gray-400 dark:text-white">
            No worries. We will help you
          </p>
          <div className="p-6  space-y-4 md:space-y-6 sm:p-">
            {error?.length > 0
              ? (
              <Alert
                text={error}
                className="dark:bg-transparent text-red-600 dark:text-red-600 border border-red-400   px-10 py-2 rounded-lg flex justify-center"
              />
                )
              : null}
            <form
              onSubmit={(e) => {
                void (variant === 'getUser' ? findUser(e) : handleUpdatePassword(e))
              }}
              className="space-y-4 md:space-y-6"
            >
              <>
                <Input
                  id="username"
                  label="Username"
                  type="text"
                  dataCy="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                  placeholder="username"
                  icon={<Email />}
                  inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                />
                {errorUsername.length > 0
                  ? (
                  <Alert
                    text={errorUsername}
                    className="dark:bg-transparent text-red-600 dark:text-red-60"
                  />
                    )
                  : null}
              </>
              {variant === 'resetPassword' && (
                <>
                  <>
                    <Input
                      id="password"
                      label="Password"
                      type="password"
                      dataCy="password"
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                      value={password}
                      placeholder="••••••••"
                      icon={<Lock />}
                      inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    />
                    {errorPassword.length > 0
                      ? (
                      <Alert
                        text={errorPassword}
                        className="dark:bg-transparent text-red-600 dark:text-red-60"
                      />
                        )
                      : null}
                  </>
                  <>
                    <Input
                      id="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      dataCy="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value)
                      }}
                      placeholder="••••••••"
                      icon={<Lock />}
                      inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    />
                    {errorConfirmPassword.length > 0
                      ? (
                      <Alert
                        text={errorConfirmPassword}
                        className="dark:bg-transparent text-red-600 dark:text-red-60"
                      />
                        )
                      : null}
                  </>
                </>
              )}
              <Button
                type="submit"
                className={`${
                  loading && 'opacity-50 pointer-events-none'
                } w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800`}
              >
                Reset Password
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
