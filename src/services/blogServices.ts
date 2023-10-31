import { type Blog,  type BlogFormValues, type User } from '../types/blogsTypes'

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

export const deleteBlog = async (id: string): Promise<number> => {
  const response = await fetch(`${BASE_URL}/api/blogs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.status
}
