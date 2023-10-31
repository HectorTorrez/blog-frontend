import { LoginCredentials, LoginWithToken, User } from "../types/blogsTypes"

const BASE_URL = 'http://localhost:3003'

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/api/users`)
  return await response.json()
}

export const login = async (credentials: LoginCredentials): Promise<LoginWithToken> => {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    return await response.json()
  }
  
  export const createUser = async (credentials: FormData): Promise<User> => {
    const response = await fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      body: credentials
    })
    return await response.json()
  }

  export const updateUser = async(credentials: FormData, id: string) => {
    const response = await fetch(`${BASE_URL}/api/users/${id}`, {
      method: 'PATCH',
      body: credentials
    })
    return await response.json()
  }