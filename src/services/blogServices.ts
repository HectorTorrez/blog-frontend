import { type LoginCredentials, type Blog, type LoginWithToken } from '../types/blogsTypes'

const BASE_URL = 'http://localhost:3003'

// let token: string | null = null

// export const setToken = (newToken: string): void => {
//   token = `Bearer ${newToken}`
// }

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

// export const createBlog = async (credentials: LoginCredentials) => {
//   if (token != null) {
//     const response = await fetch(`${BASE_URL}/api/blogs`, {
//       method: 'POST',
//       headers: {
//         Authorization: token
//       },
//       body: JSON.stringify(credentials)

//     })
//     console.log(response)
//     return await response.json()
//   }
// }
