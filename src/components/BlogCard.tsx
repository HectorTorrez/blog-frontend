import { useContext } from 'react'
import { LoginContext } from '../context/LoginContext'
import { type Blog } from '../types/blogsTypes'
import { firstLetterUpperCase } from '../utils/firstLetterUpperCase'
import { Delete, RightArrow } from './Icons'
import { Link } from 'react-router-dom'
import { deleteBlog } from '../services/blogServices'

interface BlogCardProps {
  blog: Blog
  user?: string
}

export const BlogCard = ({ blog, user: BlogUser }: BlogCardProps): JSX.Element => {
  const { title, author, blogText, id } = blog
  const { user } = useContext(LoginContext)

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteBlog(id)
    } catch (error) {
      console.log(error)
    }
  }

  const result = user?.username !== undefined && BlogUser !== undefined ? user.username === BlogUser : false

  return (

    <section className=" bg-purple-50  border mx-2 border-purple-400 rounded-lg shadow sm:w-screen md:max-w-sm dark:bg-gray-800 dark:border-gray-700 max-h-[250px] ">
        <header className='text-red-600 flex justify-end mx-3 mt-3'>
          <button onClick={() => { void handleDelete(id) }}>
          {
            result ? <Delete/> : null
          }
          </button>
        </header>
        <div className="p-5 pt-0 min-w-[236px]">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden h-[50px]">{blogText}</p>
            <p className="mb-3 font-bold text-gray-500 dark:text-gray-400">{firstLetterUpperCase(author)}</p>

            <Link to={`/blogs/${id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-transparent rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <RightArrow/>
            </Link>
        </div>
    </section>

  )
}
