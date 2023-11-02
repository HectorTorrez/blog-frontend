import { useEffect, useState } from 'react';

interface useRegisterValidationProps {
    password: string
    confirmPassword: string
    name: string
    username: string
    image?: File | null

}

export const useRegisterValidation = ({password, confirmPassword, name ,username, image, }: useRegisterValidationProps) => {
    const [errorName, setErrorName] = useState('')
    const [errorUsername, setErrorUsername] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
    const [errorImage, setErrorImage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setErrorName('')
        setErrorUsername('')
        setErrorPassword('')
        setErrorImage('')
        setErrorConfirmPassword('')
        

        if(name.length < 6){
            setErrorName('Name must be at least 6 characters')
            setLoading(false)
            return
        }
        if(image === null){
            setErrorImage('Image is required')
            setLoading(false)
            return
        }
        if(username.length < 6){
            setErrorUsername('Username must be at least 6 characters')
            setLoading(false)
            return
        }
        if(password.length < 6){
            setErrorPassword('Password must be at least 6 characters')
            setLoading(false)
            return
        }
        if (password !== confirmPassword) {
            setErrorConfirmPassword('Passwords do not match')
            setLoading(false)
            return
        } 
    }, [password, confirmPassword, name, username, image])

    
    return {
        errorName,
        errorUsername,
        errorImage,
        errorPassword,
        errorConfirmPassword,
        loading,
        setLoading,
        error,
        setError
    }
};