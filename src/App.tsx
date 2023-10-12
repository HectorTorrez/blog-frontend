import { useEffect, useState } from 'react'
import { BlogCard } from './components/BlogCard'
import { Navbar } from './components/Navbar'
import { getBlogs } from './services/blogServices'
import { type Blog } from './types/blogsTypes'

export const App = (): JSX.Element => {
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
  }, [])

  return (
    <section className='dark:bg-black h-screen'>
      <Navbar/>

      <main className='max-w-screen-xl flex justify-center flex-wrap gap-10 items-center  mx-auto mt-10'>
        {blogs?.map((blog) => {
          return <BlogCard key={blog.id} blog={blog}/>
        })}
      </main>
    </section>
  )
}
