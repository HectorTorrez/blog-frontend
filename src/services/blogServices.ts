import { type LoginCredentials, type Blog, type LoginWithToken, type BlogFormValues } from '../types/blogsTypes'

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

export const createBlog = async (blog: BlogFormValues) => {
  if (token != null) {
    const response = await fetch(`${BASE_URL}/api/blogs`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blog)

    })
    console.log(response)
    return await response.json()
  }
}
