import { Input } from "../components/Input"
import { useContext, useState, useEffect } from 'react';
import { Navbar } from "../components/Navbar";
import { Email, Lock, Spinner } from "../components/Icons";
import { Button } from "../components/Button";
import { LoginContext } from "../context/LoginContext";
import { updateUser } from "../services";
import { Alert } from "../components/Alert";
import { SweetAlertConfirm } from "../utils";
import { useNavigate } from "react-router-dom";

export const MyProfile = () => {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [image, setImage] = useState('')
    const [imageProfile, setImageProfile] = useState<File | null>(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)





    const {user, changeUser} = useContext(LoginContext)
    const navigate = useNavigate()



    useEffect(() => {
        if(user !== null){
            setName(user.name || '')
            setUsername(user.username || '')
            setPassword(user.password || '')
            setImage(user.imageProfile?.secure_url || '')
        }
    }, [])

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        if (
            name.length === 0 ||
            username.length === 0 ||
            password.length === 0 ||
            confirmPassword.length === 0 
          ) {
            setError('all fields are required')
            setLoading(false)
            return
          }

          
      const formData = new FormData()
      formData.append('name', name)
      formData.append('username', username)
      formData.append('password', password)
      if (imageProfile !== null) {
        formData.append('imageProfile', imageProfile)
      }
      if (image === null) {
        setError('the image is required')
        setLoading(false)
        return
      } else {
        setError('')
      }
      if (password !== confirmPassword) {
        setError('the password is not the same')
        setLoading(false)
        return
      }

      try {
        if(user === null) return
        await updateUser(formData, user.id)
      } catch (error: any) {
        throw new Error(error)
      } finally {
        setName('')
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        setImageProfile(null)
        setImage('')
        setError('')
        const response = await SweetAlertConfirm({
            title: 'After that you will be logged out',
            text: 'You wont be able to revert this',
            icon: 'warning',
            confirmButtonText: 'Confirm',
            titleFire: 'Loggedout',
            bodyFire: 'you have been loggedout',
            iconFire: 'success',
            showCancelButton: false,
        })
        if (response.isConfirmed) {
            changeUser(null)
            setLoading(false)
            navigate('/')
          }


      }
    }

  return (
    <section>
        <Navbar/>
        <form onSubmit={(e) => {
            handleUpdate(e)
        }} className=" flex flex-col m-auto items-center dark:bg-gray-900 h-screen gap-5">
            <header className="mt-5">
                <p className="font-bold text-6xl text-blue-600">Profile</p>
            </header>
            <article className="flex flex-col gap-3 max-w-screen-xl">
                {
                    error.length > 0 && (
                        <Alert text={error} className="bg-red-600  border py-1 min-w-[200px] rounded-[8px] shadow-[0px 0px 5px -3px #111]"/>
                    )
                }
                <Input
                    type="text"
                    id="name"
                    placeholder="Name"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    icon={<Email />}
                    inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                />
                <section>
                    <article className="flex justify-center mb-3 mt-3">
                        <img className="w-[80px] rounded-full h-[80px] object-cover" src={image} alt="" style={{backgroundImage: 'image.jpg'}} />
                    </article>
                    <Input
                        type="file"
                        id="imageProfile"
                        placeholder="Image Profile"
                        label="Image Profile"
                        onChange={(e) => {
                            const { files } = e.target
                            if (files === null) return
                            setImage(URL.createObjectURL(files[0]))
                            setImageProfile(files[0])
                        }}
                        labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white  "
                        inputClassName="file:text-gray-900 dark:text-gray-900 file:bg-gray-50 file:px-4 file:py-1 text-white file:dark:bg-gray-700 file:dark:text-white  file:border file:rounded-lg file:dark:text-white file:border-gray-300 file:mt-4"
                    />
                </section>
                <Input
                    type="text"
                    id="username"
                    placeholder="Username"
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    icon={<Email />}
                    inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                />
                <Input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<Lock />}
                    inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                />
                    <Input
                    type="password"
                    id="confirmPassword"
                    placeholder="••••••••"
                    label="Confirm Passowrd"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    icon={<Lock />}
                    inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                />
                <Button
                    type="submit"
                    className=" w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                    {loading ? <Spinner/> : 'Update'}
                </Button>
            </article>

        </form>

    </section>
  )
}