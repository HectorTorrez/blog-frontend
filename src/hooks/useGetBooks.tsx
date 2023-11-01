import { useContext, useEffect, useState } from 'react'
import { getBlogs, setToken } from '../services/blogServices'
import { LoginContext } from '../context/LoginContext'
import { type Blog } from '../types/blogsTypes'

interface useGetBooksProps {
  blogs: Blog[]
}

export const useGetBooks = (): useGetBooksProps => {
  const [blogs, setBlogs] = useState<Blog[]>([])

  const { changeUser } = useContext(LoginContext)

  const fetchData = async (): Promise<void> => {
    try {
      const data = await getBlogs()
      setBlogs(data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    void fetchData()
    const token = localStorage.getItem('user')
    if (JSON.parse(token as string) !== null) {
      const user = JSON.parse(token as string).token
      setToken(user.token)
    }
  }, [])
  setTimeout(() => {
    localStorage.removeItem('user')
    changeUser(null)
  }, 3600000)
  return {
    blogs
  }
}
