import { type LoginCredentials, type Blog, type LoginWithToken, type createUserCredentials, type BlogFormValues } from '../types/blogsTypes'

const BASE_URL = 'http://localhost:3003'

let token: string | null = null

export const setToken = (newToken: string): void => {
  token = `bearer ${newToken}`
}

export const getBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(`${BASE_URL}/api/blogs`)
  return await response.json()
}

export const getBlog = async (id: string): Promise<Blog> => {
  const response = await fetch(`${BASE_URL}/api/blogs/${id}`)
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

export const createUser = async (credentials: createUserCredentials): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

export const createBlog = async (blog: BlogFormValues): Promise<any> => {
  if (token != null) {
    const response = await fetch(`${BASE_URL}/api/blogs`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blog)

    })
    return await response.json()
  }
}
