import { Input } from "../components/Input"
import { useContext, useState, useEffect } from 'react';
import { Navbar } from "../components/Navbar";
import { Email, Lock } from "../components/Icons";
import { Button } from "../components/Button";
import { LoginContext } from "../context/LoginContext";

export const MyProfile = () => {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [imageProfile, setImageProfile] = useState('')

    const {user} = useContext(LoginContext)



    useEffect(() => {
        if(user !== null){
            setName(user.name)
            setUsername(user.username)
            setPassword(user.password)
            setImageProfile(user.imageProfile.secure_url)
        }
    }, [])
//TODO PREVIE IMAGE PROFILE WITH THE FILE
    // const url = URL.createObjectURL(user?.imageProfile)
    // console.log(url)

  return (
    <section>
        <Navbar/>
        <form className="max-w-screen-xl flex flex-col items-center dark:bg-gray-900 h-screen gap-12">

            <header className="mt-10">
                <p className="font-bold text-6xl text-blue-600">Profile</p>
            </header>
            <article className="flex flex-col gap-3">
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
                        <img className="w-[80px] rounded-full h-[80px] object-cover" src={imageProfile} alt="" style={{backgroundImage: 'image.jpg'}} />
                    </article>
                    <Input
                        type="file"
                        id="imageProfile"
                        placeholder="Image Profile"
                        label="Image Profile"
                        onChange={(e) => {
                            const { files } = e.target
                            if (files === null) return
                            // setImage(files[0])
                        }}
                        labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white  "
                        inputClassName="file:text-gray-900 dark:text-gray-900 file:bg-gray-50 file:px-4 file:py-1 text-white file:dark:bg-gray-700 file:text-white file:outline-none file:border file:rounded-lg file:dark:text-white file:border-gray-300 file:mt-4"
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
                    placeholder="Password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<Lock />}
                    inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                />
            </article>

            <article>
                <Button
                    type="submit"
                    className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    onClick={() => {
                        console.log('save')
                    }}
                >
                    Save
                </Button>
            </article>
        </form>

    </section>
  )
}