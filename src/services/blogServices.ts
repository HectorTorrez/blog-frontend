import { type Blog } from '../types/blogsTypes'

const BASE_URL = 'http://localhost:3003'

export const getBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(`${BASE_URL}/api/blogs`)
  return await response.json()
}

export const getBlog = async (id: string): Promise<Blog> => {
  const response = await fetch(`${BASE_URL}/api/blogs/${id}`)
  return await response.json()
}
