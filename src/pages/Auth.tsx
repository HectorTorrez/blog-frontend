import { useCallback, useContext, useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Alert } from '../components/Alert'
import { setToken } from '../services/blogServices'
import { LoginContext } from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'
import { Email, Lock, Photo } from '../components/Icons'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { ProgressBar } from '../components/ProgressBar'
import { createUser, login } from '../services'
import { useRegisterValidation } from '../hooks/useFormValidation'
import { saveImageToLocalStorage } from '../utils/saveImageToLocalstorage'
export const Auth = (): JSX.Element => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  // TODO FIX IMAGE IN LOCALSTORAGE
  const [image, setImage] = useState<File | null | string>(() => {
    const response = localStorage.getItem('image')
    if (response === null) return null
    return response
  })

  const [progress, setProgress] = useState<number>(0)
  const { changeUser } = useContext(LoginContext)

  const { loading, setLoading, errorName, errorUsername, errorPassword, errorConfirmPassword, errorImage, error, setError } = useRegisterValidation({ password, confirmPassword, name, username, image })

  const [variant, setVariant] = useState(() => {
    const auth = localStorage.getItem('auth')
    if (auth !== null) {
      return auth
    }
    return 'login'
  })

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    )
    setProgress(0)
    setError('')
  }, [])

  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('auth', variant)
  }, [toggleVariant, variant])

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      try {
        const getUser = await login({ username, password })
        if (getUser.error !== null) {
          setError(getUser.error)
        }
        if (getUser.token.length > 0) {
          changeUser(getUser)
          setToken(getUser.token)
        }
        if (getUser.token?.length > 0) {
          navigate('/')
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [navigate, password, changeUser, username]
  )

  const handleRegister = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault()
      if (errorName.length > 0 || errorUsername.length > 0 || errorPassword.length > 0 || errorConfirmPassword.length > 0 || errorImage.length > 0) {
        setError('please check the fields')
        return
      }
      setError('')
      setLoading(true)

      const formData = new FormData()
      formData.append('name', name)
      formData.append('username', username)
      formData.append('password', password)
      if (image !== null) {
        formData.append('imageProfile', image)
      }

      try {
        const response = await createUser(formData)
        if (response.error.length > 0) {
          setError(response.error)
          return
        }
        if (response?.id != null) {
          setVariant('login')
        }
      } catch (error: any) {
        throw new Error(error)
      } finally {
        setName('')
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        setImage(null)
        setLoading(false)
        setProgress(100)
      }
    },
    [name, password, username, confirmPassword, navigate, handleLogin]
  )

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

  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[calc(100vh-67px)] lg:py-0 ">
        <div className="w-full relative bg-white  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
          {loading ? <ProgressBar progress={progress} /> : null}
          <div className="p-6  space-y-4 md:space-y-6 sm:p-8">

            {error?.length > 0 ? <Alert text={error} className='dark:bg-transparent text-red-600 dark:text-red-600 border border-red-400   px-10 py-2 rounded-lg flex justify-center' /> : null}

            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {variant === 'login' ? 'Login' : 'Register'}
            </h1>
            <form
              data-cy="submit"
              onSubmit={(e) => {
                void (variant === 'login' ? handleLogin(e) : handleRegister(e))
              }}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              {variant === 'register' && (
                <>
                  <Input
                    id="name"
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                    dataCy="name"
                    placeholder="name"
                    icon={<Email />}
                    inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  />
                  {(errorName.length > 0) ? <Alert text={errorName} className='dark:bg-transparent text-red-600 dark:text-red-60' /> : null}
                  <Input
                    id="imageProfile"
                    label="Image Profile"
                    type="file"
                    dataCy="file"
                    onChange={(e) => {
                      const { files } = e.target
                      if (files === null) return
                      setImage(files[0])
                      saveImageToLocalStorage(files[0])
                    }}
                    icon={<Photo />}
                    inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  />
                  {(errorImage.length > 0) ? <Alert text={errorImage} className='dark:bg-transparent text-red-600 dark:text-red-60' /> : null}
                </>
              )}
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
              {(errorUsername.length > 0) && variant === 'register' ? <Alert text={errorUsername} className='dark:bg-transparent text-red-600 dark:text-red-60' /> : null}
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
              {(errorPassword.length > 0) && variant === 'register' ? <Alert text={errorPassword} className='dark:bg-transparent text-red-600 dark:text-red-60' /> : null}
              {variant === 'register' && (
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
              {(errorConfirmPassword.length > 0) ? <Alert text={errorConfirmPassword} className='dark:bg-transparent text-red-600 dark:text-red-60' /> : null}
              </>

              )}
              <Button
                type="submit"
                className={`${
                  loading && 'opacity-50 pointer-events-none'
                } w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800`}
              >
                {variant === 'login' ? 'Login' : 'Register'}
              </Button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <span
                  data-cy="toggleVariant"
                  onClick={toggleVariant}
                  className="font-medium text-gray-600 hover:underline dark:text-gray-500 cursor-pointer"
                >
                  {variant === 'login' ? 'Create an account' : 'Login'}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
