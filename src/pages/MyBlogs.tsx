import { useEffect, useState } from 'react'
import { getBlogs, setToken } from '../services/blogServices'

import { type Blog } from '../types/blogsTypes'
import { BlogCard } from '../components/BlogCard'
import { Navbar } from '../components/Navbar'

export const MyBlogs = (): JSX.Element => {
  const [blogs, setBlogs] = useState<Blog[]>([])

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
  return (
    <section>
        <Navbar/>
        {
            blogs.map(item => {
              return <BlogCard key={item.id} blog={item}/>
            })
        }
    </section>
  )
}
