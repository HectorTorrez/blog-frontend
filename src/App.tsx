import { useEffect, useState } from 'react'
import { BlogCard } from './components/BlogCard'
import { Navbar } from './components/Navbar'
import { getBlogs } from './services/blogServices'
import { type Blog } from './types/blogsTypes'
import { Link } from 'react-router-dom'

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
    <div className='flex justify-end w-[90%] m-auto max-w-screen-lg mt-[10px]'>
      <Link to='/create-blog'className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Create a Blog</Link>
    </div>
      <main className='max-w-screen-xl flex justify-center flex-wrap gap-10 items-center  mx-auto mt-10'>
        {blogs?.map((blog) => {
          return <BlogCard key={blog.id} blog={blog}/>
        })}
      </main>
    </section>
  )
}
