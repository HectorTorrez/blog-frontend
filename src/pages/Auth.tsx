import { useCallback, useContext, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Alert } from '../components/Alert'
import { createUser, login, setToken } from '../services/blogServices'
import { LoginContext } from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'
import { Email, Lock, Photo } from '../components/Icons'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
export const Auth = (): JSX.Element => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const [variant, setVariant] = useState('login')

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    )
  }, [])
  const { setUser } = useContext(LoginContext)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const getUser = await login({ username, password })
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
  }, [navigate, password, setUser, username])

  const handleRegister = useCallback(async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('username', username)
    formData.append('password', password)
    if (image !== null) {
      formData.append('imageProfile', image)
    }
    if (image === null) { setError('the image is required'); return } else {
      setError('')
    }
    if (password !== confirmPassword) { setError('the password is not the same'); return }

    try {
      const response = await createUser(formData)
      if ((response?.id) != null) {
        setVariant('login')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setName('')
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      setImage(null)
      setError('')
    }
  }, [name, password, username, confirmPassword, navigate, handleLogin])

  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 ">
        <div className="w-full bg-white mb-[150px] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {error?.length > 0 ? <Alert text={error} type="error" /> : null}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {variant === 'login' ? 'Login' : 'Register'}
            </h1>
            <form
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
                        type='text'
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                        placeholder="name"
                        icon={<Email/>}
                        />
                    <Input
                        id='imageProfile'
                        label='Image Profile'
                        type='file'
                        onChange={(e) => {
                          const { files } = e.target
                          if (files === null) return
                          setImage(files[0])
                        }}
                        icon={<Photo/>}

                    />
                        </>

                )}
            <Input
                id="username"
                label="Username"
                type='text'
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
                placeholder="username"
                icon={<Email/>}
            />
            <Input id='password' label='Password' type='password' onChange={(e) => {
              setPassword(e.target.value)
            }}
            value={password}
            placeholder='••••••••'
            icon={<Lock/>}
            />
            {variant === 'register' && (
                <Input
                    id="confirmPassword"
                    label="Confirm Password"
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                    }}
                    placeholder="••••••••"
                    icon={<Lock/>}
                />

            )}
            <Button
                type='submit'
                className='w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
            >
                {variant === 'login' ? 'Login' : 'Register'}
            </Button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <span
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