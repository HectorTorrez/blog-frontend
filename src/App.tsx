import { useContext } from 'react'
import { BlogCard } from './components/BlogCard'
import { Navbar } from './components/Navbar'
import { Link } from 'react-router-dom'
import { LoginContext } from './context/LoginContext'
import { useGetBooks } from './hooks/useGetBooks'

export const App = (): JSX.Element => {
  const { user } = useContext(LoginContext)

  const { blogs } = useGetBooks()

  return (
    <section className='dark:bg-gray-900 min-h-screen'>
      <Navbar/>
    <div className='flex justify-end w-[90%] m-auto max-w-screen-lg mt-[10px]'>
      {
        user !== null
          ? (
      <Link to='/create-blog'className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Create a Blog</Link>

            )
          : null
      }
    </div>
      <main className='max-w-screen-xl flex justify-center flex-wrap gap-10 items-center  mx-auto mt-10'>
        {blogs?.map((blog) => {
          return <BlogCard key={blog.id} blog={blog}/>
        })}
      </main>
    </section>
  )
}
